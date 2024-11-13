import AcceuilIllustration from '@/components/AcceuilIllustration'
import './css/Accueil.css'
import React from 'react'
import NavBar from '@/components/NavBar'
import AccTextes from '@/components/AccTextes'

const Accueil = () => {
  return <section className='w-full h-dvh flex flex-col'>
    <NavBar></NavBar>


    <div className="w-full flex-1 bg-background flex flex-col lg:flex-row 2xl:px-10">
      <div className="bg-background p-5 md:p-8 lg:p-12 xl:p-16 2xl:p-20 w-full lg:w-[60%] flex flex-col  justify-center">
        <AccTextes></AccTextes>
      </div>

      <div className="flex-1 w-full lg:w-1/2 relative bg-background flex items-center justify-center p-4 md:p-6 md:mt-6 lg:mt-0 lg:p-8 xl:p-10 2xl:p-12">
        <AcceuilIllustration className='w-full h-full max-w-[600px] xl:max-w-[800px] 2xl:max-w-[1000px]'></AcceuilIllustration>
      </div>
    </div>
  </section>
}

export default Accueil