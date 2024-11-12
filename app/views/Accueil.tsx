import AcceuilIllustration from '@/components/AcceuilIllustration'
import './css/Accueil.css'
import React from 'react'
import NavBar from '@/components/NavBar'
import { Download, Mail } from 'lucide-react';

const Accueil = () => {
  return <section className='w-full h-dvh flex flex-col'>
    <NavBar></NavBar>


    <div className="w-full flex-1 bg-background flex flex-col lg:flex-row 2xl:px-10">
      <div className="bg-background p-5 md:p-8 lg:p-12 xl:p-16 2xl:p-20 w-full lg:w-[60%] flex flex-col  justify-center">
        <span className='text-3xl sm:text-4xl xl:text-5xl 2xl:text-7xl font-semibold  block text-center lg:text-left'>
          Bonjour, Je suis Heritsilavo
        </span>
        
        <span className='text-2xl sm:text-3xl xl:text-4xl 2xl:text-6xl text-accent font-bold block mt-4 md:mt-6 lg:mt-3 xl:mt-4 2xl:mt-7 text-center lg:text-left'>
          Dévéloppeur frontend
        </span>
        
        <span className='text-lg md:text-lg lg:text-xl 2xl:text-3xl block mt-4 md:mt-6 lg:mt-3 xl:mt-4 2xl:mt-6 text-center lg:text-left'>
          "Construisons votre avenir numérique ligne par ligne"
        </span>
        
        <span className='text-sm md:text-base lg:text-sm 2xl:text-xl block mt-4 md:mt-6 lg:mt-4 xl:mt-6 2xl:mt-7 max-w-[100%] sm:max-w-[80%] lg:max-w-[90%] xl:max-w-[80%] 2xl:max-w-[70%] text-center lg:text-left mx-auto lg:mx-0'>
          Passionné par le développement frontend, je transforme des concepts créatifs en expériences web fluides et intuitives. Spécialisé en React(Next.js), TypeScript et animations, je m'engage à créer des interfaces modernes pour donner vie à vos projets web les plus ambitieux.
        </span>

        <div className="flex flex-col sm:flex-row sm:justify-center lg:justify-start gap-4 md:gap-6 mt-8 lg:mt-6 w-full sm:max-w-[80%] lg:max-w-[100%] mx-auto">
          <button
            className="flex items-center justify-center gap-2 
              lg:px-3 py-3 lg:py-2 w-full sm:w-1/2 md:w-[40%] lg:w-auto
              bg-accent text-background font-bold rounded-lg 
              border-2 border-accent transition-all duration-300
              text-sm md:text-base lg:text-sm 2xl:text-xl"
          >
            <Download className="w-4 h-4 md:w-5 md:h-5 2xl:w-7 2xl:h-7" />
            <span>Télécharger CV</span>
          </button>

          <button
            className="flex items-center justify-center gap-2 
              lg:px-3 py-3 lg:py-2 2xl:px-4 2xl:py-3 w-full sm:w-1/2 md:w-[40%] lg:w-auto
              bg-transparent text-accent font-bold rounded-lg 
              border-2 border-accent transition-all duration-300
              text-sm md:text-base lg:text-sm  2xl:text-xl"
          >
            <Mail className="w-4 h-4 md:w-5 md:h-5 2xl:w-7 2xl:h-7" />
            <span>Me Contacter</span>
          </button>
        </div>
      </div>

      <div className="flex-1 w-full lg:w-1/2 relative bg-background flex items-center justify-center p-4 md:p-6 md:mt-6 lg:mt-0 lg:p-8 xl:p-10 2xl:p-12">
        <AcceuilIllustration className='w-full h-full max-w-[600px] xl:max-w-[800px] 2xl:max-w-[1000px]'></AcceuilIllustration>
      </div>
    </div>
  </section>
}

export default Accueil