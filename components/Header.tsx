import React, { useState } from 'react';
import { Logo } from './Logo';

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-brand-cream border-b-4 border-brand-orange sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo Area */}
          <div className="flex-shrink-0 flex items-center cursor-pointer" onClick={() => window.location.reload()}>
            <Logo />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <a href="#" className="text-brand-deepPurple hover:text-brand-darkOrange px-3 py-2 rounded-md text-sm font-bold transition-colors">হোম</a>
            <a href="#features" className="text-brand-deepPurple hover:text-brand-darkOrange px-3 py-2 rounded-md text-sm font-bold transition-colors">ফিচারস</a>
            <a href="#history" className="text-brand-deepPurple hover:text-brand-darkOrange px-3 py-2 rounded-md text-sm font-bold transition-colors">পূর্ববর্তী সমাধান</a>
            <a href="#contact" className="text-brand-deepPurple hover:text-brand-darkOrange px-3 py-2 rounded-md text-sm font-bold transition-colors">যোগাযোগ</a>
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-brand-deepPurple hover:text-white hover:bg-brand-orange focus:outline-none transition-colors"
            >
              <span className="sr-only">Open main menu</span>
              {!isMenuOpen ? (
                <svg className="block h-8 w-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-8 w-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-brand-cream border-t border-brand-orange">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-brand-deepPurple hover:text-white hover:bg-brand-orange">হোম</a>
            <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-brand-deepPurple hover:text-white hover:bg-brand-orange">ফিচারস</a>
            <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-brand-deepPurple hover:text-white hover:bg-brand-orange">পূর্ববর্তী সমাধান</a>
            <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-brand-deepPurple hover:text-white hover:bg-brand-orange">যোগাযোগ</a>
          </div>
        </div>
      )}
    </header>
  );
};