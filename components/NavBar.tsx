"use client"
import React, { useState } from 'react';

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="w-full bg-background shadow-lg">
      <div className="mx-14 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className='text-[24px] md:text-[32px] italic'>
            <a href="/" className="text-accent font-bold">
              Heritsilavo
            </a>
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
          <div className="hidden md:flex text-base lg:text-xl space-x-8 lg:space-x-24 text-gray-600 font-medium">
            <a href="/" className="hover:text-accent transition-colors duration-300">
              Accueil
            </a>
            <a href="/" className="hover:text-accent transition-colors duration-300">
              Services
            </a>
            <a href="/" className="hover:text-accent transition-colors duration-300">
              Compétences
            </a>
            <a href="/" className="hover:text-accent transition-colors duration-300">
              Projets
            </a>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-background shadow-lg z-20">
          <div className="flex flex-col items-center space-y-4 py-4">
            <a href="/" className="text-gray-600 hover:text-accent transition-colors duration-300">
              Accueil
            </a>
            <a href="/" className="text-gray-600 hover:text-accent transition-colors duration-300">
              Services
            </a>
            <a href="/" className="text-gray-600 hover:text-accent transition-colors duration-300">
              Compétences
            </a>
            <a href="/" className="text-gray-600 hover:text-accent transition-colors duration-300">
              Projets
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;