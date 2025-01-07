import AcceuilIllustration from '@/components/AcceuilIllustration'
import React from 'react'
import AccTextes from '@/components/AccTextes'
import MouseIcon from '@/components/MouseIcon'

const Accueil = () => {
  return <section className='w-full min-h-[100dvh] lg:min-h-[calc(100dvh-80px)] lg:h-[calc(100dvh-80px)] flex flex-col'>
    <div className="w-full flex-1 bg-background flex flex-col relative lg:flex-row lg:px-10 xl:px-15 2xl:px-20">
      <div className="bg-background px-5 md:px-8 lg:px-12 xl:px-16 2xl:px-20 w-full lg:w-[60%] flex flex-col  justify-center">
        <AccTextes></AccTextes>
      </div>

      <div className="flex-1 w-full lg:w-1/2 relative bg-background flex items-center justify-center px-4 md:px-6 mt-4 md:mt-6 lg:mt-0 lg:px-8 xl:px-10 2xl:px-12 max-lg:pb-4">
        <AcceuilIllustration className='w-full h-full max-w-[600px] xl:max-w-[800px] 2xl:max-w-[1000px]'></AcceuilIllustration>
      </div>

      <div className='max-lg:hidden flex items-center justify-center absolute left-1/2 bottom-10 transform -translate-x-1/2'>
        <MouseIcon className="w-[36px] h-[36px] xl:w-[50px] xl:h-[50px] 2xl:w-[60px] 2xl:h-[60px]" />
      </div>

    </div>
  </section>
}

export default Accueil