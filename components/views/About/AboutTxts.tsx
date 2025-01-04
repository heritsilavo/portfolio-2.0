"use client";
import { getReadedBooks } from "@/utils/livres";
import Image from "next/image";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import gsap from "gsap";
import { RefObject, useCallback, useContext, useEffect, useRef } from "react";
import { MainRefContext } from "@/components/MainComponent/MainComponent";

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
      const getScrollAmmount = () => {
        return containerRef.current?.getBoundingClientRect().height;
      };

      const gsapAnimation = gsap.to(containerRef.current, {
        yPercent: -(100 - (100 / NB_SECTION)),
        ease: "none",
      });

      ScrollTrigger.create({
        scroller: mainScrollableRef?.current,
        trigger: triggerRef.current,
        animation: gsapAnimation,
        scrub: 1,
        start: "top top",
        end: `+=${getScrollAmmount()}`,
        anticipatePin: 1,
        pin: true,
        invalidateOnRefresh: true,
      });
    },
    [mainScrollableRef, triggerRef]
  );

  useEffect(
    function () {
      initAnimations();
    },
    [initAnimations]
  );

  return (
    <div
      ref={triggerRef}
      className="overflow-y-hidden relative bg-background w-1/2 h-[100dvh] z-10 p-0"
    >
      <div ref={containerRef} className={`h-[${100 * NB_SECTION}vh]`}>
        <div className="h-[100dvh] flex flex-col items-center justify-center space-y-4">
          <h1 className="text-foreground text-2xl font-bold lg:text-xl 2xl:text-2xl my-3 lg:my-0">
            Mieux me connaitre
          </h1>

          <p className="text-foreground text-md lg:text-sm 2xl:text-lg w-[90%] lg:w-[80%] mx-auto text-justify">
            &nbsp;&nbsp;&nbsp;&nbsp; Développeur Frontend passionné diplômé de
            l'ENI à Fianarantsoa, Madagascar, je suis spécialisé en{" "}
            <span className="font-bold">Next.js</span>,{" "}
            <span className="font-bold">Typescrypt</span>, etc. Je crée des
            interfaces innovantes, optimisées et interactives, tout en cherchant
            à dépasser les attentes des utilisateurs.
          </p>

          <p className="text-foreground text-md lg:text-sm 2xl:text-lg w-[90%] lg:w-[80%] mx-auto text-justify">
            &nbsp;&nbsp;&nbsp;&nbsp; La musique 🎵 joue un rôle clé dans mon
            processus créatif, et en dehors du codage, je me ressource en jouant
            de la guitare 🎸 et en lisant des livres 📚, ce qui enrichit ma
            créativité et mon approche du développement web.
          </p>
        </div>

        <div className="h-[100dvh] flex flex-col items-center justify-center space-y-4">
          <h1 className="text-foreground text-2xl font-bold lg:text-xl 2xl:text-2xl">
            Mes compétences
          </h1>

          <div className="w-[90%] lg:w-[80%] relative flex flex-wrap justify-between gap-y-4 mt-14 mb-5">
            
          </div>
        </div>

        <div className="h-[100dvh] flex flex-col items-center justify-center space-y-4">
          <h1 className="text-foreground text-2xl font-bold lg:text-xl 2xl:text-2xl">
            Quels genre de livre je lis ?
          </h1>

          <div className="w-[90%] lg:w-[80%] relative flex flex-wrap justify-between gap-y-4 mt-14 mb-5">
            {getReadedBooks().map((book, index) => (
              <Image
                key={index}
                width={150}
                height={0}
                className="w-[150px] lg:w-[100px] xl:w-[120px] 2xl:w-[170px] object-cover rounded-sm cursor-pointer"
                style={{
                  boxShadow:
                    "0 4px 6px rgba(0, 0, 0, 0.2), 0 1px 3px rgba(0, 0, 0, 0.1)",
                }}
                alt={book.title}
                src={book.imgUrl}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
