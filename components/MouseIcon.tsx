"use client"
import gsap from "gsap";
import React, { useEffect, useRef } from "react";

type MouseIconProps = { className: string };

const MouseIcon: React.FC<MouseIconProps> = ({ className }) => {
    const outline = useRef<SVGPathElement | null>(null);

    useEffect(() => {
        if (outline.current) {
          const strokeLength = outline.current.getTotalLength();
      
          const timeline = gsap.timeline({
            delay: 1,
          });
      
          console.log(strokeLength, outline.current);
      
          timeline
            .set("#mouse-svg", { opacity: 1, duration: 0.5 })
            .set("#outline", {
              strokeDasharray: strokeLength,
              strokeDashoffset: strokeLength,
            })
            .to("#outline", { strokeDashoffset: 0, duration: 2 });
      
          // Add the bouncing arrow animation
          const arrowTimeline = gsap.timeline({ repeat: -1 });
      
          arrowTimeline
            .to("#arrow", {
              y: -10,
              duration: 0.5,
              ease: "bounce.in",
            })
            .to("#arrow", {
              y: 0,
              duration: 0.5,
              ease: "power1.in",
            });
      
          return () => {
            timeline.kill();
            arrowTimeline.kill();
          };
        }
      }, []);

    return (
        <svg
            id="mouse-svg"
            className={`${className} opacity-0`}
            viewBox="0 0 41 63"
            fill="none"
        >
            <g id="mouse">
                <path
                    fill="#40B3A2"
                    id="arrow"
                    d="M17.118 48.9021V46.0795L19.3345 48.2415V35.2098C19.6755 34.0087 21.1532 34.0087 21.4942 35.2098L21.6079 48.2415L23.654 46.0795L23.5971 48.9021L20.4144 52.205L17.118 48.9021Z"
                />
                <path
                    ref={outline}
                    stroke="#40B3A2"
                    id="outline"
                    d="M20.4712 2C8.0813 2.48043 2.96619 12.5094 2.11367 18.9352L2 30.6457V42.5364C2.62518 49.5627 8.19497 59.8319 20.6418 60.3123C32.785 59.8319 38.2189 49.5627 38.8288 42.5364V30.6457L38.7179 18.9352C37.8862 12.5094 32.559 2.48043 20.4712 2ZM20.4712 2L20.4144 12.2092M20.4144 12.2092C17.9288 12.3535 17.0617 13.5217 16.8907 15.4521V25.3009C16.9135 27.3981 17.9705 28.6039 20.3008 29.0242C22.0058 29.2044 23.8726 27.4117 23.995 25.3009V15.332C23.8281 13.4016 22.8394 12.3535 20.4144 12.2092Z"
                    strokeWidth="4"
                />
            </g>
        </svg>
    );
};

export default MouseIcon;