"use client";
import gsap from "gsap";
import { Download, Mail } from "lucide-react";
import { useEffect, useRef } from "react";
import { useMainRef, useStartAccAnimation } from "@/components/MainComponent/MainComponent";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function HeroSection() {
  const timelineRef = useRef<GSAPTimeline | null>(null);
  const heroContainerRef = useRef<HTMLDivElement>(null);
  const scrollAnimationRef = useRef<GSAPAnimation | null>(null);
  const mainRef = useMainRef();

  const startAnimation = useStartAccAnimation();

  const getRandomOffset = (val: number) => {
    const offset = Math.random() > 0.5 ? val : -val;
    return offset;
  };

  const splitText = ({
    text,
    className,
  }: {
    text: string;
    className: string;
  }) =>
    text
      .split(" ")
      .map((word, index) => (
        <span className={`inline-block ${className}`} key={`word-${index}`}>
          {word}
        </span>
      ))
      .reduce((acc: (JSX.Element | string)[], curr) => [...acc, curr, " "], []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Initial states
    gsap.set(".hero-animated", { opacity: 0 });
    gsap.set(".hero-button", {
      opacity: 0,
      scale: 0.8,
      transformOrigin: "center",
    });

    timelineRef.current = gsap.timeline({
      defaults: {
        ease: "power3.out",
        duration: 0.8,
      },
      delay: 0.1,
    });

    if (startAnimation) {
      timelineRef.current
        .set(".hero-animated", { opacity: 1 })
        .set([".hero-title", ".hero-subtitle"], {
          y: () => getRandomOffset(30),
          opacity: 0,
        })
        .set([".hero-slogan", ".hero-description"], {
          opacity: 0,
          y: 20,
        })
        .to(".hero-title", {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          ease: "back.out(1.2)",
        })
        .to(
          ".hero-subtitle",
          {
            y: 0,
            opacity: 1,
            stagger: 0.15,
            ease: "back.out(1.2)",
          },
          "<0.2"
        )
        .to(
          [".hero-slogan", ".hero-description"],
          {
            opacity: 1,
            y: 0,
            stagger: 0.2,
            ease: "power2.out",
          },
          "<0.3"
        )
        .to(
          ".hero-button",
          {
            opacity: 1,
            scale: 1,
            stagger: 0.2,
            ease: "elastic.out(1,0.3)",
            duration: 1.2,
          },
          "<0.4"
        );
    }

    if (!heroContainerRef.current || !mainRef?.current) return;

    // MATCH MEDIA avec scope amélioré
    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      // Création de l'animation de scroll
      scrollAnimationRef.current = gsap.to([".hero-title",
        ".hero-subtitle",
        ".hero-slogan",
        ".hero-description",
        ".hero-button"], {
        y: -50,
        opacity: 0,
        stagger: 0.08,
        ease: "power2.out",
        transformOrigin: "top center",
      });

      // Création du ScrollTrigger
      const trigger = ScrollTrigger.create({
        trigger: heroContainerRef.current,
        scroller: mainRef.current,
        start: "top 20%",
        end: "bottom 25%",
        animation: scrollAnimationRef.current,
        scrub: 1.5,
        //toggleActions: "play none reverse reverse",
        markers: false,
      });

      // Cleanup pour cette condition spécifique
      return () => {
        trigger?.kill();
        scrollAnimationRef.current?.kill();
      };
    });

    // Cleanup global
    return () => {
      timelineRef.current?.kill();
      scrollAnimationRef.current?.kill();
      mm.revert(); // Nettoyage de toutes les conditions matchMedia
    };
  }, [startAnimation, mainRef]);

  return (
    <div ref={heroContainerRef} className="hero-container">
      <h1 className="hero-animated opacity-0 text-4xl xl:text-5xl 2xl:text-7xl font-semibold text-center lg:text-left">
        {splitText({
          text: "Bonjour, Je suis Heritsilavo",
          className: "hero-title",
        })}
      </h1>

      <h2 className="hero-animated opacity-0 text-2xl sm:text-3xl xl:text-4xl 2xl:text-6xl text-accent font-bold mt-4 md:mt-6 lg:mt-3 xl:mt-4 2xl:mt-7 text-center lg:text-left">
        {splitText({
          text: "Développeur frontend",
          className: "hero-subtitle",
        })}
      </h2>

      <p className="hero-slogan hero-animated opacity-0 text-lg md:text-lg lg:text-xl 2xl:text-3xl mt-4 md:mt-6 lg:mt-3 xl:mt-4 2xl:mt-6 text-center lg:text-left">
        Construisons votre avenir numérique ligne par ligne
      </p>

      <p className="hero-description hero-animated opacity-0 text-sm md:text-base lg:text-sm 2xl:text-xl mt-4 md:mt-6 lg:mt-4 xl:mt-6 2xl:mt-7 max-w-[100%] sm:max-w-[80%] lg:max-w-[90%] xl:max-w-[80%] 2xl:max-w-[70%] text-center lg:text-left mx-auto lg:mx-0">
        Passionné par le développement frontend, je transforme des concepts
        créatifs en expériences web fluides et intuitives. Spécialisé en
        React(Next.js), TypeScript et animations, je m'engage à créer des
        interfaces modernes pour donner vie à vos projets web les plus
        ambitieux.
      </p>

      <div className="hero-animated flex flex-col sm:flex-row sm:justify-center lg:justify-start gap-4 md:gap-6 mt-8 lg:mt-6 w-full sm:max-w-[80%] lg:max-w-[100%] mx-auto">
        <button className="relative hero-button cursor-pointer opacity-0 lg:px-3 py-3 lg:py-2 w-full sm:w-1/2 md:w-[40%] lg:w-auto bg-accent text-background font-bold rounded-lg border-2 border-accent text-sm md:text-base lg:text-sm 2xl:text-xl">
          <a
            href="/cv/Heritsilavo_CV.pdf"
            download
            className="m-0 h-full w-full flex items-center justify-center gap-2"
          >
            <Download className="w-4 h-4 md:w-5 md:h-5 2xl:w-7 2xl:h-7" />
            <span>Télécharger CV</span>
          </a>
        </button>

        <button className="hero-button cursor-pointer opacity-0 flex items-center justify-center gap-2 lg:px-3 py-3 lg:py-2 2xl:px-4 2xl:py-3 w-full sm:w-1/2 md:w-[40%] lg:w-auto bg-transparent text-accent font-bold rounded-lg border-2 border-accent text-sm md:text-base lg:text-sm 2xl:text-xl">
          <a
            href="mailto:heritsilavo4835@gmail.com"
            className="m-0 h-full w-full flex items-center justify-center gap-2"
          >
            <Mail className="w-4 h-4 md:w-5 md:h-5 2xl:w-7 2xl:h-7" />
            <span>Me Contacter</span>
          </a>
        </button>
      </div>
    </div>
  );
}