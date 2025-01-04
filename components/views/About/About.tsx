"use client"
import { useRef } from "react";
import AboutImg from "./AboutImg";
import AboutTxts from "./AboutTxts";
import MobileDeviceAbout from "./Mobile/MobileAbout";

export default function About() {
  const aboutContainerRef = useRef<HTMLDivElement>(null)
  return <>
    <MobileDeviceAbout className="w-[100vw] lg:hidden"></MobileDeviceAbout>

    <div ref={aboutContainerRef} className="w-[100vw] lg:h-[100dvh] hidden lg:flex">
      <AboutImg />
      <AboutTxts triggerRef={aboutContainerRef}/>
    </div>
  </>;
}
