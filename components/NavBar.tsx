"use client"
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import gsap from 'gsap';

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  useEffect(() => {
    gsap.to("._nav", { opacity: 1 })
  }, [isMenuOpen])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="w-full bg-background shadow-lg">
      <div className="_nav opacity-0 mx-4 sm:mx-6 lg:mx-5 xl:mx-8 2xl:mx-20 px-0 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className='text-[16px] sm:text-[18px] md:text-[20px] lg:text-[24px] 2xl:text-[36px] italic'>
            <Link href="/" className="text-accent font-bold">
              Heritsilavo
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-600 hover:text-accent focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex text-[16px] sm:text-[18px] md:text-sm xl:text-md 2xl:text-xl space-x-8 lg:space-x-10 2xl:space-x-16 text-gray-600 font-medium">
            <Link href="/" className="hover:text-accent transition-colors duration-300">
              Accueil
            </Link>
            <Link href="/" className="hover:text-accent transition-colors duration-300">
              Services
            </Link>
            <Link href="/" className="hover:text-accent transition-colors duration-300">
              Compétences
            </Link>
            <Link href="/" className="hover:text-accent transition-colors duration-300">
              Projets
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className=" _nav opacity-0  md:hidden absolute top-20 left-0 w-full bg-background shadow-lg z-20">
          <div className="flex flex-col items-center space-y-4 py-4">
            <Link href="/" className="text-[16px] sm:text-[18px] text-gray-600 hover:text-accent transition-colors duration-300">
              Accueil
            </Link>
            <Link href="/" className="text-[16px] sm:text-[18px] text-gray-600 hover:text-accent transition-colors duration-300">
              Services
            </Link>
            <Link href="/" className="text-[16px] sm:text-[18px] text-gray-600 hover:text-accent transition-colors duration-300">
              Compétences
            </Link>
            <Link href="/" className="text-[16px] sm:text-[18px] text-gray-600 hover:text-accent transition-colors duration-300">
              Projets
            </Link>
          </div>
        </div>
      )}
    </nav>
  );

};

export default NavBar;