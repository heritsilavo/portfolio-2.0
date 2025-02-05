"use client";
import React, { useRef, useState, useEffect, useCallback } from "react";
import "./ProjectWrapper.css";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import { useMainRef } from "@/components/MainComponent/MainComponent";

gsap.registerPlugin(ScrollTrigger);

type ProjetsWrapperProps = {
  className?: string;
  children: React.ReactNode;
};

export default function ProjetsWrapper({
  className,
  children,
}: ProjetsWrapperProps) {
  const listenerRef = useRef<HTMLDivElement | null>(null);
  const lightRef = useRef<HTMLDivElement | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const scrollerRef = useMainRef();
  const greenBgRef = useRef<HTMLDivElement | null>(null);

  const initAnimationns = useCallback(() => {
    if (lightRef.current) {
      gsap.set(lightRef.current, {
        xPercent: -50,
        yPercent: -50,
      });
    }
    //71b3a3
    gsap.set(greenBgRef.current, {
      background: "#40b3a2",
    });

    gsap.to(greenBgRef.current, {
      background: "#136055",
      scrollTrigger: {
        scroller: scrollerRef?.current,
        trigger: greenBgRef?.current,
        start: "top 70%",
        end: "bottom 50%",
        toggleActions: "play none none reverse",
        scrub: true,
      }
    });
  }, [scrollerRef]);

  useEffect(
    function () {
      initAnimationns();
    },
    [initAnimationns]
  );

  // Handle mouse movement
  useEffect(() => {
    if (!listenerRef.current || !isHovered) return;

    const element = listenerRef.current;

    function handleMouseMove(event: MouseEvent) {
      if (!lightRef.current) return;

      // Get the rect of the container
      const rect = element.getBoundingClientRect();

      // Calculate position relative to the container
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      gsap.to(lightRef.current, {
        x,
        y,
        duration: 0.2,
        ease: "power2.out",
      });
    }

    element.addEventListener("mousemove", handleMouseMove);

    // Cleanup
    return () => {
      element.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isHovered]);

  return (
    <section
      id="project_view"
      ref={listenerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative ${className || ""}`}
    >
      <div ref={greenBgRef} className="project-green-background">
        <div
          ref={lightRef}
          className={`project-green-background-light ${
            isHovered ? "active" : ""
          }`}
        >
          <Image fill src="/light.svg" alt="light effect" priority />
        </div>
      </div>
      {children}
    </section>
  );
}
