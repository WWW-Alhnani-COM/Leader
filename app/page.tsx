"use client";

import { useEffect, useRef, useState } from "react";
import BackgroundCanvas from "@/components/BackgroundCanvas";
import ScrollOverlay from "@/components/ScrollOverlay";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import VisionSection from "@/components/VisionSection";
import CTASection from "@/components/CTASection";
import { useFramePreloader } from "@/hooks/useScrollAnimation";

const SCENE_FRAMES = [23, 52, 80, 109];
const SCENE_TRANSITION_MS = 440;
const WHEEL_GESTURE_LOCK_MS = 650;

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "عصير ليدر",
  description: "أول منتج عصائر يمني بنكهة الأصالة وجودة العالم.",
  brand: { "@type": "Brand", name: "ليدر" },
  manufacturer: { "@type": "Organization", name: "شركة رويان للاستثمار" },
  countryOfOrigin: { "@type": "Country", name: "اليمن" },
  category: "مشروبات - عصائر",
};

export default function Home() {
  const { images } = useFramePreloader();
  const scrollSectionRef = useRef<HTMLDivElement>(null);
  const [frame, setFrame] = useState(0);
  const [isVideoActive, setIsVideoActive] = useState(false);

  useEffect(() => {
    let currentFrame = 0;
    let currentScene = -1;
    let isLocked = false;
    let isAnimating = false;
    let animationId: number | null = null;
    let wheelReleaseTimer: number | null = null;
    let wheelGestureCaptured = false;
    let touchStartY: number | null = null;
    let touchGestureCaptured = false;

    const getSection = () => scrollSectionRef.current;

    const scrollToSection = (position: "start" | "before" | "after") => {
      const section = getSection();
      if (!section) return;

      const top = section.getBoundingClientRect().top + window.scrollY;
      const target =
        position === "before"
          ? Math.max(0, top - 2)
          : position === "after"
            ? top + section.offsetHeight + 1
            : top;

      window.scrollTo({ top: target, behavior: "instant" });
    };

    const animateToFrame = (targetFrame: number) => {
      if (animationId !== null) cancelAnimationFrame(animationId);

      const startFrame = currentFrame;
      const distance = targetFrame - startFrame;

      if (distance === 0) {
        setFrame(targetFrame);
        return;
      }

      isAnimating = true;
      const startedAt = performance.now();

      const drawNextFrame = (now: number) => {
        const progress = Math.min((now - startedAt) / SCENE_TRANSITION_MS, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const nextFrame = Math.round(startFrame + distance * eased);

        if (nextFrame !== currentFrame) {
          currentFrame = nextFrame;
          setFrame(nextFrame);
        }

        if (progress < 1) {
          animationId = requestAnimationFrame(drawNextFrame);
        } else {
          currentFrame = targetFrame;
          setFrame(targetFrame);
          animationId = null;
          isAnimating = false;
        }
      };

      animationId = requestAnimationFrame(drawNextFrame);
    };

    const enterAtScene = (sceneIndex: number) => {
      isLocked = true;
      currentScene = sceneIndex;
      setIsVideoActive(true);
      scrollToSection("start");
      animateToFrame(SCENE_FRAMES[sceneIndex]);
    };

    const leaveStory = (direction: "before" | "after") => {
      isLocked = false;
      currentScene = direction === "before" ? -1 : SCENE_FRAMES.length;
      setIsVideoActive(false);
      if (direction === "before") {
        currentFrame = 0;
        setFrame(0);
      }
      scrollToSection(direction);
    };

    const handleDirection = (delta: number) => {
      const section = getSection();
      if (!section || delta === 0 || isAnimating) return;

      const rect = section.getBoundingClientRect();

      if (delta > 0) {
        if (isLocked) {
          if (currentScene < SCENE_FRAMES.length - 1) {
            currentScene += 1;
            animateToFrame(SCENE_FRAMES[currentScene]);
          } else {
            leaveStory("after");
          }
          return;
        }

        // Capture the first downward gesture as the entrance to scene one.
        if (rect.top <= window.innerHeight * 1.15 && rect.bottom > 0) {
          enterAtScene(0);
        }
        return;
      }

      if (isLocked) {
        if (currentScene > 0) {
          currentScene -= 1;
          animateToFrame(SCENE_FRAMES[currentScene]);
        } else {
          leaveStory("before");
        }
        return;
      }

      // Re-enter from the content below at scene four when scrolling upward.
      if (rect.top < 0 && rect.bottom >= -window.innerHeight * 0.25) {
        enterAtScene(SCENE_FRAMES.length - 1);
      }
    };

    const onWheel = (event: WheelEvent) => {
      if (event.deltaY === 0) return;

      // Consume the remaining wheel events belonging to the same physical turn.
      if (wheelGestureCaptured) {
        event.preventDefault();
        return;
      }

      const section = getSection();
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const approachingFromAbove =
        event.deltaY > 0 && rect.top <= window.innerHeight * 1.15 && rect.bottom > 0;
      const approachingFromBelow =
        event.deltaY < 0 &&
        rect.top < 0 &&
        rect.bottom >= -window.innerHeight * 0.25;

      if (!isLocked && !approachingFromAbove && !approachingFromBelow) return;

      event.preventDefault();
      wheelGestureCaptured = true;
      wheelReleaseTimer = window.setTimeout(() => {
        wheelGestureCaptured = false;
        wheelReleaseTimer = null;
      }, WHEEL_GESTURE_LOCK_MS);

      handleDirection(event.deltaY);
    };

    const onTouchStart = (event: TouchEvent) => {
      touchStartY = event.touches[0]?.clientY ?? null;
      touchGestureCaptured = false;
    };

    const onTouchMove = (event: TouchEvent) => {
      if (touchStartY === null) return;

      const section = getSection();
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const nearStory =
        isLocked ||
        (rect.top <= window.innerHeight * 1.15 && rect.bottom > 0) ||
        (rect.top < 0 && rect.bottom >= -window.innerHeight * 0.25);

      if (nearStory) {
        event.preventDefault();
        touchGestureCaptured = true;
      }
    };

    const onTouchEnd = (event: TouchEvent) => {
      if (touchStartY === null) return;

      const endY = event.changedTouches[0]?.clientY;
      const distance = endY === undefined ? 0 : touchStartY - endY;
      touchStartY = null;

      if (!touchGestureCaptured || Math.abs(distance) < 45) {
        touchGestureCaptured = false;
        return;
      }

      touchGestureCaptured = false;
      handleDirection(distance);
    };

    const onTouchCancel = () => {
      touchStartY = null;
      touchGestureCaptured = false;
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    window.addEventListener("touchcancel", onTouchCancel, { passive: true });

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("touchcancel", onTouchCancel);

      if (animationId !== null) cancelAnimationFrame(animationId);
      if (wheelReleaseTimer !== null) window.clearTimeout(wheelReleaseTimer);
    };
  }, []);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div id="top" />

      {/* The frame sequence is visible only while the scroll story is active. */}
      <div
        className="fixed inset-0 z-0 transition-opacity duration-300"
        style={{
          opacity: isVideoActive ? 1 : 0,
          pointerEvents: "none",
        }}
      >
        <BackgroundCanvas images={images} frame={frame} />
      </div>

      <Navigation />
      <main className="relative">
        <div className="relative z-10">
          <HeroSection />
        </div>

        {/* One wheel turn or one swipe advances exactly one scene. */}
        <div
          ref={scrollSectionRef}
          className="relative h-screen z-10"
          aria-label="مشاهد ليدر التفاعلية"
        >
          <div className="sticky top-0 h-screen flex items-center justify-center pointer-events-none">
            <ScrollOverlay frame={frame} isVisible={isVideoActive} />
          </div>
        </div>

        <div className="relative z-20">
          <FeaturesSection />
          <VisionSection />
          <CTASection />
        </div>

        <div className="h-48 md:h-64 lg:h-80" />
      </main>
    </>
  );
}
