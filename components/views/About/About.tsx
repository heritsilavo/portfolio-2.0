"use client";
import { useRef } from "react";
import AboutImg from "./AboutImg/AboutImg";
import AboutTxts from "./AboutTxts/AboutTxts";
import AboutTxtsMobile from "./AboutTxtsMobile/AboutTxtsMobile";

export default function About() {
  const aboutContainerRef = useRef<HTMLDivElement>(null);
  const mobileAboutContainerRef = useRef<HTMLDivElement>(null);
  return (
    <>
      <section
        id="about_view"
        ref={mobileAboutContainerRef}
        className="lg:w-0 lg:h-0 lg:overflow-hidden lg:scale-0 mb-0 overflow-hidden"
      >
        <AboutImg />
        <AboutTxtsMobile />
      </section>

      <section
        ref={aboutContainerRef}
        className="w-[100vw] lg:h-[100dvh] hidden lg:flex"
      >
        <AboutImg />
        <AboutTxts triggerRef={aboutContainerRef} />
      </section>
    </>
  );
}
