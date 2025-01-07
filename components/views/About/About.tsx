"use client";
import { useRef } from "react";
import AboutImg from "./AboutImg";
import AboutTxts from "./AboutTxts";

export default function About() {
  const aboutContainerRef = useRef<HTMLDivElement>(null);
  return (
    <>
      <div className="lg:w-0 lg:h-0 lg:overflow-hidden lg:scale-0">
        <AboutImg />
      </div>
      
      <div
        ref={aboutContainerRef}
        className="w-[100vw] lg:h-[100dvh] hidden lg:flex"
      >
        <AboutImg />
        <AboutTxts triggerRef={aboutContainerRef} />
      </div>
    </>
  );
}
