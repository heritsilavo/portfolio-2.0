"use client";
import { useGSAP } from "@gsap/react";
import { useCallback, useEffect, useRef, useState } from "react";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import gsap from "gsap";
import ScrollToPlugin from "gsap/dist/ScrollToPlugin";

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(ScrollToPlugin);

export default function StickAndScroll() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [boxes, setBoxes] = useState<number[]>([]);
  const [scrollSpace, setScrollSpace] = useState(0);
  const touchStartY = useRef<number | null>(null);

  const fillBoxes = () => {
    const temp = [];
    for (let index = 1; index <= 10; index++) {
      temp.push(index);
      setBoxes(temp);
    }
  };

  // Rediriger le scroll vers le parent
  useEffect(() => {
    const container = containerRef.current;
    const scroller = scrollerRef.current;
    
    const redirectScroll = (e: WheelEvent) => {
      e.preventDefault();
      if (scroller) {
        scroller.scrollTop += e.deltaY;
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
    };

    const redirectTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      if (scroller && touchStartY.current !== null) {
        const deltaY = touchStartY.current - e.touches[0].clientY;
        scroller.scrollTop += deltaY;
        touchStartY.current = e.touches[0].clientY;
      }
    };

    if (container && scroller) {
      container.addEventListener('wheel', redirectScroll, { passive: false });
      container.addEventListener('touchstart', handleTouchStart, { passive: true });
      container.addEventListener('touchmove', redirectTouchMove, { passive: false });
    }

    return () => {
      if (container) {
        container.removeEventListener('wheel', redirectScroll);
        container.removeEventListener('touchstart', handleTouchStart);
        container.removeEventListener('touchmove', redirectTouchMove);
      }
    };
  }, []);

  useEffect(() => {
    fillBoxes();
  }, []);

  useGSAP(() => {
    const containerHeight: number = parseFloat(
      containerRef.current?.getBoundingClientRect().height.toFixed(2) || "0"
    );
    const scrollerHeight: number = parseFloat(
      scrollerRef.current?.getBoundingClientRect().height.toFixed(2) || "0"
    );
    const startValue = (scrollerHeight - containerHeight) / 2;
    const endValue = containerHeight * boxes.length;
    
    setScrollSpace((endValue - containerHeight));
    
    console.log(endValue);
    
    const targetScrollPosition = containerHeight * (boxes.length - 1);
    const gsapTween = gsap.to(containerRef.current, {
      scrollTo: {
        y: targetScrollPosition,
        autoKill: true,
      },
    });

    ScrollTrigger.create({
      trigger: containerRef.current,
      scroller: scrollerRef.current,
      start: `top ${startValue}px`,
      end: `${endValue}px bottom`,
      markers: true,
      pin: true,
      animation: gsapTween,
      scrub: 1,
    });
  }, [boxes]);

  return (
    <div
      ref={scrollerRef}
      className="w-full bg-blue-950 h-[100dvh] overflow-auto"
    >
      <div className="bg-gray-500 bg-opacity-50 w-full h-[100dvh] text-slate-300 text-5xl flex items-center justify-center">
        Space before
      </div>
      <div className="w-full h-[100dvh] flex items-center justify-center">
        <div
          id="container"
          ref={containerRef}
          className="border-2 relative scrollbar-hide w-[90%] h-[70%] overflow-x-auto"
          style={{ overscrollBehavior: 'none' }}
        >
          {boxes.map((index) => (
            <div
              className="bg-gray-500 bg-opacity-50 w-[80%] h-[100%] text-slate-300 text-5xl flex items-center justify-center"
              key={index}
            >
              {index}
            </div>
          ))}
        </div>
      </div>
      <div style={{height: scrollSpace}} className={`w-full`}></div>
      <div className="bg-gray-500 bg-opacity-50 w-full h-[100dvh] text-slate-300 text-5xl flex items-center justify-center">
        Space after
      </div>
    </div>
  );
}