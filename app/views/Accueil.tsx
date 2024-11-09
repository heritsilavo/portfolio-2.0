import AcceuilIllustration from '@/components/AcceuilIllustration'
import './css/Accueil.css'
import React from 'react'
import NavBar from '@/components/NavBar'

const Accueil = () => {
  return <section className='w-full h-dvh flex flex-col'>
    <NavBar></NavBar>

    <div className="w-full flex-1 bg-background flex">
      <div className="ml-12 h-full bg-background p-12 w-[55%]">
        <span className='text-7xl font-semibold block mt-[160px]'>Bonjour, Je suis Heritsilavo</span>
        <span className='text-6xl text-accent font-bold block mt-[30px]'>Dévéloppeur frontend</span>
        <span className='text-3xl block mt-[30px]'>"Construisons votre avenir numérique ligne par ligne"</span>
        <span className='text-xl block mt-[30px] max-w-[60%]'>Passionné par le développement frontend , je transforme des concepts créatifs en expériences web fluides et intuitives. Spécialisé en React(Next.js), TypeScript et animations, je m'engage à créer des interfaces modernes pour donner vie à vos projets web les plus ambitieux.</span>
        <div className='mt-[30px]'>
          <button className='px-10 border-accent border-4 bg-accent p-4 rounded-[5px] text-background font-bold text-[20px]'>Telecharger CV</button>
          <button className='px-10 ml-10 border-accent border-4 p-4 rounded-[5px] text-accent font-bold text-[20px]'>Me Contacter</button>
        </div>
      </div>

      <div className="flex-1 bg-background flex flex-col items-center">
        <AcceuilIllustration className='mt-[160px] w-[746px] h-[556px]'></AcceuilIllustration>
      </div>
    </div>
  </section>
}

export default Accueil