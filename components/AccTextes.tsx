"use client"
import gsap from "gsap";
import { Download, Mail } from "lucide-react";
import { useEffect, useRef } from "react";



export default function AccTextes() {
    const tlRef = useRef<GSAPTimeline | null>(null);

    const randomValue = (val: number) => ((Math.random() > 0.5) ? val : (-1 * val));

    useEffect(() => {
        tlRef.current = gsap.timeline()
        tlRef.current
            .set("._animated", { opacity: 1 })
            .set("._hello_txt", { y: () => randomValue(20), opacity: 0 })
            .set("._metier_txt", { y: () => randomValue(20), opacity: 0 })
            .set('#_slogan', { opacity: 0 })
            .set('#_desc', { opacity: 0 })
            .set("._btn", { opacity: 0, scale:0.5, transformOrigin:"center center" })
            .to("._hello_txt", { duration: 1, opacity: 1, y: 0, stagger: 0.2 })
            .to("._metier_txt", { duration: 1, opacity: 1, y: 0, stagger: 0.2 }, "<")
            .to("#_slogan", { opacity: 1 }, "<30%")
            .to("#_desc", { opacity: 1 }, "<30%")
            .to("._btn", { opacity: 1, scale:1, stagger:0.3, ease:"elastic.out(1,0.75)" })


        return () => {
            tlRef.current?.kill()
        }
    }, [])


    return <>
        <span className=' _animated opacity-0 text-3xl sm:text-4xl xl:text-5xl 2xl:text-7xl font-semibold  block text-center lg:text-left'>
            {wrapWordsInSpan({ text: "Bonjour, Je suis Heritsilavo", spanClass: " _hello_txt" })}
        </span>

        <span className=' _animated opacity-0 text-2xl sm:text-3xl xl:text-4xl 2xl:text-6xl text-accent font-bold block mt-4 md:mt-6 lg:mt-3 xl:mt-4 2xl:mt-7 text-center lg:text-left'>
            {wrapWordsInSpan({ text: "Dévéloppeur frontend", spanClass: " _metier_txt" })}
        </span>

        <span id="_slogan" className=' _animated opacity-0 text-lg md:text-lg lg:text-xl 2xl:text-3xl block mt-4 md:mt-6 lg:mt-3 xl:mt-4 2xl:mt-6 text-center lg:text-left'>
            "Construisons votre avenir numérique ligne par ligne"
        </span>

        <span id="_desc" className=' _animated opacity-0 text-sm md:text-base lg:text-sm 2xl:text-xl block mt-4 md:mt-6 lg:mt-4 xl:mt-6 2xl:mt-7 max-w-[100%] sm:max-w-[80%] lg:max-w-[90%] xl:max-w-[80%] 2xl:max-w-[70%] text-center lg:text-left mx-auto lg:mx-0'>
            Passionné par le développement frontend, je transforme des concepts créatifs en expériences web fluides et intuitives. Spécialisé en React(Next.js), TypeScript et animations, je m'engage à créer des interfaces modernes pour donner vie à vos projets web les plus ambitieux.
        </span>

        <div className=" _animated opacity-0 flex flex-col sm:flex-row sm:justify-center lg:justify-start gap-4 md:gap-6 mt-8 lg:mt-6 w-full sm:max-w-[80%] lg:max-w-[100%] mx-auto">
            <button
                className="_btn flex items-center justify-center gap-2 
              lg:px-3 py-3 lg:py-2 w-full sm:w-1/2 md:w-[40%] lg:w-auto
              bg-accent text-background font-bold rounded-lg 
              border-2 border-accent transition-all duration-300
              text-sm md:text-base lg:text-sm 2xl:text-xl"
            >
                <Download className="w-4 h-4 md:w-5 md:h-5 2xl:w-7 2xl:h-7" />
                <span>Télécharger CV</span>
            </button>

            <button
                className="_btn flex items-center justify-center gap-2 
              lg:px-3 py-3 lg:py-2 2xl:px-4 2xl:py-3 w-full sm:w-1/2 md:w-[40%] lg:w-auto
              bg-transparent text-accent font-bold rounded-lg 
              border-2 border-accent transition-all duration-300
              text-sm md:text-base lg:text-sm  2xl:text-xl"
            >
                <Mail className="w-4 h-4 md:w-5 md:h-5 2xl:w-7 2xl:h-7" />
                <span>Me Contacter</span>
            </button>
        </div>
    </>
}


const wrapWordsInSpan = function ({ text, spanClass }: { text: string, spanClass: string }) {
    const spanList = text.split(" ").map(word => (<span className={"inline-block " + spanClass} key={(Math.random() * Math.random()) * (Math.random() * Math.random())} >{word}</span>))
    const result: (JSX.Element | string)[] = [];
    spanList.forEach(spanElem => {
        result.push(spanElem)
        result.push(" ");
    });
    return result;
}