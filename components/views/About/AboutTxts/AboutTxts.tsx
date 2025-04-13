"use client";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import gsap from "gsap";
import { RefObject, useCallback, useContext, useEffect, useRef } from "react";
import { MainRefContext } from "@/components/MainComponent/MainComponent";
import TxtSections1 from "./TxtSections/TxtSection1";
import TxtSections2 from "./TxtSections/TxtSection2";
import TxtSections3 from "./TxtSections/TxtSection3";

gsap.registerPlugin(ScrollTrigger);

type AboutTxtsProps = {
  triggerRef: RefObject<HTMLDivElement>;
};

const NB_SECTION = 3;

export default function AboutTxts({ triggerRef }: AboutTxtsProps) {
  const mainScrollableRef = useContext(MainRefContext);
  const containerRef = useRef<HTMLDivElement>(null);

  const initAnimations = useCallback(
    function () {
      if (!!mainScrollableRef?.current) {
        console.log("HELLLLLLLLLLLLLOOOOOOOOOOOOOOOOOO");
        
        const getScrollAmmount = () => {
          return containerRef.current?.getBoundingClientRect().height;
        };

        const gsapAnimation = gsap.to(containerRef.current, {
          yPercent: -(100 - 100 / NB_SECTION),
          ease: "none",
        });


        ScrollTrigger.create({
          scroller: mainScrollableRef?.current,
          trigger: triggerRef.current,
          animation: gsapAnimation,
          scrub: 1,
          start: "top top",
          end: `+=${getScrollAmmount()}`,
          pin: true,
          anticipatePin: 3,
          invalidateOnRefresh: true
        });
      }

    },
    [mainScrollableRef, triggerRef, containerRef]
  );

  useEffect(
    function () {
      initAnimations();
    },
    [initAnimations]
  );

  return (
    <div
      className="overflow-y-hidden relative bg-background w-1/2 h-[100dvh] z-10 p-0"
    >
      <div ref={containerRef} style={{ height: `${100 * NB_SECTION}vh`, willChange: "position" }}>
        <TxtSections1 />
        <TxtSections2 />
        <TxtSections3 />
      </div>
    </div>
  );
}
