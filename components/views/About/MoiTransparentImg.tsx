"use client";
import { MOI_TRANSPARENT_IMG_HREF } from "@/constants/moi-transparent-img";
import gsap from "gsap";
import { useCallback, useEffect, useRef } from "react";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import { useMainRef } from "@/components/MainComponent/MainComponent";

gsap.registerPlugin(ScrollTrigger);

export default function MoiTransparentImg({
  className,
}: {
  className?: string;
}) {
  const photoRef = useRef<SVGRectElement>(null);
  const mainScrollerRef = useMainRef();
  const svgRef = useRef<SVGSVGElement>(null);
  const courtRef = useRef<SVGPathElement>(null);
  const longRef = useRef<SVGPathElement>(null);

  const initAnimation = useCallback(
    function () {
      gsap.set(photoRef.current, {
        yPercent: 50,
        opacity: 0,
      });
      
      ScrollTrigger.create({
        scroller: mainScrollerRef?.current,
        trigger: svgRef.current,
        start: "top 75%",
        toggleActions: "play none replay reverse",
        onEnter: () => {
          gsap.to(photoRef.current, {
            yPercent: 0,
            opacity: 1,
            duration: 1,
          });
        },
      });

      // gsap.set(courtRef.current, {
      //     strokeDashoffset: courtRef.current?.getTotalLength()
      // })
    },
    [photoRef, mainScrollerRef]
  );

  useEffect(
    function () {
      initAnimation();
    },
    [initAnimation]
  );

  return (
    <svg ref={svgRef} className={className} viewBox="0 0 400 397" fill="none">
      <g id="IMG" filter="url(#filter0_d_75_110)">
        <rect
          id="cercle"
          x="15.9224"
          y="15.674"
          width="364.769"
          height="359.077"
          rx="179.538"
          fill="url(#paint0_radial_75_110)"
        />
        <path
          ref={courtRef}
          id="court"
          d="M188.298 0.214881C147.453 2.10647 108.21 16.4264 75.9806 41.1998C43.7516 65.9732 20.1245 99.9797 8.35762 138.53L14.3304 140.296C25.7259 102.963 48.6072 70.03 79.8189 46.0386C111.031 22.0471 149.035 8.17922 188.591 6.34733L188.298 0.214881Z"
          fill="white"
        />
        <path
          ref={longRef}
          id="long"
          d="M62.4701 336.415C81.9247 354.364 104.869 368.251 129.92 377.239C154.971 386.228 181.611 390.132 208.235 388.717C234.86 387.302 260.918 380.597 284.84 369.006C308.763 357.414 330.054 341.176 347.433 321.27C364.811 301.364 377.917 278.201 385.961 253.177C394.004 228.152 396.82 201.784 394.237 175.661C391.655 149.537 383.727 124.198 370.933 101.17C358.139 78.1416 340.742 57.9009 319.791 41.6667L315.933 46.4907C336.223 62.2126 353.071 81.8143 365.461 104.116C377.852 126.417 385.529 150.956 388.03 176.255C390.531 201.554 387.805 227.09 380.015 251.325C372.225 275.559 359.533 297.991 342.703 317.269C325.873 336.547 305.253 352.272 282.086 363.497C258.919 374.723 233.683 381.216 207.899 382.587C182.115 383.957 156.316 380.176 132.055 371.471C107.795 362.767 85.5754 349.318 66.7348 331.936L62.4701 336.415Z"
          fill="white"
        />
        <g
          id="moi-transparent"
          filter="url(#filter1_d_75_110)"
          clipPath="url(#circleClip)"
        >
          <rect
            ref={photoRef}
            x="15.9224"
            y="15.674"
            width="364.769"
            height="359.077"
            rx="179.538"
            fill="url(#pattern0_75_110)"
            shapeRendering="crispEdges"
          />
        </g>
      </g>
      <defs>
        <clipPath id="circleClip">
          <circle cx="198.307" cy="195.212" r="179.538" />
        </clipPath>
        <filter
          id="filter0_d_75_110"
          x="-4"
          y="0"
          width="403.166"
          height="397"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_75_110"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_75_110"
            result="shape"
          />
        </filter>
        <filter
          id="filter1_d_75_110"
          x="11.6447"
          y="13.6893"
          width="372.769"
          height="367.077"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_75_110"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_75_110"
            result="shape"
          />
        </filter>
        <pattern
          id="pattern0_75_110"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use
            href="#image0_75_110"
            transform="matrix(0.00361011 0 0 0.00366733 0 -0.00975944)"
          />
        </pattern>
        <radialGradient
          id="paint0_radial_75_110"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(198.307 195.212) scale(182.384 179.538)"
        >
          <stop stopColor="#51C6B4" />
          <stop offset="1" stopColor="#CCF3ED" />
        </radialGradient>
        <image
          id="image0_75_110"
          data-name="moi-transparent.png"
          width="277"
          height="278"
          href={MOI_TRANSPARENT_IMG_HREF}
        />
      </defs>
    </svg>
  );
}
