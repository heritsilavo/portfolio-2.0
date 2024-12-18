"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

const boxes = [1, 2, 3, 4, 5, 6, 7];

export default function ScrollTriggerExample() {
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const boxContainerRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Ensure GSAP ScrollTrigger plugin is registered
    gsap.registerPlugin(ScrollTrigger);

    // Check if we're on the client side to avoid SSR issues
    timelineRef.current = gsap.timeline({
      scrollTrigger: {
        trigger: boxContainerRef.current,
        scroller: scrollerRef.current,
        toggleActions: "restart reverse play reverse",
        start: "top 80%",
        end: "bottom 25%",
        markers: true,
      },
    });

    timelineRef.current.from(".box", {
      scale: 0,
      opacity: 0,
      stagger: {
        each: 0.1, // Temps entre chaque animation
        from: "random", // Démarrer à partir d'un point aléatoire
        grid: "auto", // Utiliser la disposition automatique
      },
      duration: 1.5,
      ease: "elastic.out(1, 0.3)",
    });
  }, []);

  return (
    <main
      ref={scrollerRef}
      className="bg-accent w-full h-screen overflow-x-hidden overflow-y-auto relative"
    >
      <h1 className="w-full text-center text-4xl text-foreground font-bold mt-10">
        Scroll Trigger
      </h1>

      <div
        ref={boxContainerRef}
        className="boxContainer flex items-center justify-evenly mt-[1000px] w-[80%] mx-auto rounded-md border-background border-2 h-[200px] bg-[#b7b7b762]"
      >
        {boxes.map((boxNumber) => (
          <div
            className="box w-[120px] h-[120px] bg-foreground flex items-center justify-center rounded-md"
            key={boxNumber}
          >
            <span className="text-white text-xl">{boxNumber}</span>
          </div>
        ))}
      </div>

      <div className="h-[1000px]">
        {/* Added some height to create scroll space */}
      </div>
    </main>
  );
}
