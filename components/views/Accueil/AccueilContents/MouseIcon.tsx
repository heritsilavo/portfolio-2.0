"use client";
import React, { useEffect, useRef, useCallback, useMemo } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useMainRef } from "../../../MainComponent/MainComponent";

type MouseIconProps = {
  className?: string;
  color?: string;
};

const MouseIcon: React.FC<MouseIconProps> = ({
  className = "",
  color = "#40B3A2",
}) => {
  const outlineRef = useRef<SVGPathElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const scrollerRef = useMainRef();

  // Memoize timeline creation to prevent unnecessary recreation
  const timelines = useMemo(
    () => ({
      main: gsap.timeline({ paused: true }),
      arrow: gsap.timeline({ repeat: -1, paused: true }),
    }),
    []
  );

  const initAnimations = useCallback(() => {
    if (!outlineRef.current || !svgRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    const strokeLength = outlineRef.current.getTotalLength();

    // Main outline animation
    timelines.main
      .set(svgRef.current, { opacity: 1 })
      .set(outlineRef.current, {
        strokeDasharray: strokeLength,
        strokeDashoffset: strokeLength,
      })
      .to(outlineRef.current, {
        strokeDashoffset: 0,
        duration: 2,
      });

    // Bouncing arrow animation
    timelines.arrow
      .to("#arrow", {
        y: -10,
        duration: 0.5,
        scaleY: 0.5,
        ease: "bounce.in",
      })
      .to("#arrow", {
        y: 0,
        duration: 0.5,
        scaleY: 1,
        ease: "power1.in",
      });

    // Create scroll trigger
    ScrollTrigger.create({
      trigger: svgRef.current,
      scroller: scrollerRef?.current,
      start: "top 80%",
      end: "bottom top",
      onEnter: () => {
        gsap.to(outlineRef.current, {
          strokeDashoffset: strokeLength,
          duration: 0.5,
        });
        gsap.to(["#arrow"], {
          scale: 0,
          duration: 0.5,
          onComplete: () => {
            gsap.set(svgRef.current, { scale: 0 });
          },
        });
      },
      onLeaveBack: () => {
        gsap.set(svgRef.current, { scale: 1 });
        gsap.to(outlineRef.current, {
          strokeDashoffset: 0,
          duration: 0.3,
        });
        gsap.to(["#arrow"], {
          scale: 1,
          duration: 0.3,
        });
      },
      onRefresh: () => {},
    });

    // Start animations
    timelines.main.play();
    timelines.arrow.play();
  }, [timelines, scrollerRef]);

  const handleMouseInteraction = useCallback((isEntering: boolean) => {
    if (!outlineRef.current) return;

    const strokeLength = outlineRef.current.getTotalLength();

    gsap.to(outlineRef.current, {
      strokeDashoffset: isEntering ? strokeLength : 0,
      duration: 0.5,
    });

    gsap.to("#arrow", {
      scale: isEntering ? 0 : 1,
      duration: 0.5,
    });
  }, []);

  useEffect(() => {
    initAnimations();

    return () => {
      // Clean up timelines
      Object.values(timelines).forEach((timeline) => timeline.kill());
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [initAnimations, timelines]);

  return (
    <svg
      ref={svgRef}
      id="mouse-svg"
      className={`${className} opacity-0 cursor-pointer`}
      viewBox="0 0 41 63"
      fill="none"
      onMouseEnter={() => handleMouseInteraction(true)}
      onMouseLeave={() => handleMouseInteraction(false)}
    >
      <g id="mouse">
        <path
          fill={color}
          id="arrow"
          d="M17.118 48.9021V46.0795L19.3345 48.2415V35.2098C19.6755 34.0087 21.1532 34.0087 21.4942 35.2098L21.6079 48.2415L23.654 46.0795L23.5971 48.9021L20.4144 52.205L17.118 48.9021Z"
        />
        <path
          ref={outlineRef}
          stroke={color}
          id="outline"
          d="M20.4712 2C8.0813 2.48043 2.96619 12.5094 2.11367 18.9352L2 30.6457V42.5364C2.62518 49.5627 8.19497 59.8319 20.6418 60.3123C32.785 59.8319 38.2189 49.5627 38.8288 42.5364V30.6457L38.7179 18.9352C37.8862 12.5094 32.559 2.48043 20.4712 2ZM20.4712 2L20.4144 12.2092M20.4144 12.2092C17.9288 12.3535 17.0617 13.5217 16.8907 15.4521V25.3009C16.9135 27.3981 17.9705 28.6039 20.3008 29.0242C22.0058 29.2044 23.8726 27.4117 23.995 25.3009V15.332C23.8281 13.4016 22.8394 12.3535 20.4144 12.2092Z"
          strokeWidth="4"
        />
      </g>
    </svg>
  );
};

export default React.memo(MouseIcon);
