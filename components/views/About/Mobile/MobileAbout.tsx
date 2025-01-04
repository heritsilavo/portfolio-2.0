"use client";

import { useCallback, useEffect, useRef } from "react";
import AboutImg from "../AboutImg";
import { useMainRef } from "@/components/MainComponent/MainComponent";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import smoothscroll from "smoothscroll-polyfill";

gsap.registerPlugin(ScrollTrigger);

type MobileDeviceAboutProps = {
  className?: string;
};

export default function MobileDeviceAbout({
  className,
}: MobileDeviceAboutProps) {
  

  return (
    <div className={`${className}`}>
        <AboutImg />
    </div>
  );
}
