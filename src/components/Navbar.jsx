import React, { useState, useEffect } from 'react';
import { Search, ChevronDown, Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setIsOpen(false);
    };
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Update active section based on scroll position
      const sectionIds = ['hero', 'why', 'product', 'pricing', 'footer'];
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 100) {
            setActiveSection(sectionIds[i]);
            break;
          }
        }
      }
    };
    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  // Smooth scroll to section with navbar offset
  const scrollTo = (e, sectionId) => {
    e.preventDefault();
    setIsOpen(false);
    const el = document.getElementById(sectionId);
    if (el) {
      const navbarHeight = 72;
      const top = el.getBoundingClientRect().top + window.scrollY - navbarHeight;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  const navLinks = [
    { label: 'Home',       sectionId: 'hero'    },
    { label: 'Why Veyrox', sectionId: 'why'     },
    { label: 'Services',   sectionId: 'product' },
    { label: 'Pricing',    sectionId: 'pricing' },
    { label: 'Contact',    sectionId: 'footer'  },
  ];

  return (
    <>
      <nav className={`
        sticky top-0 z-50 w-full transition-all duration-300
        ${scrolled 
          ? 'bg-[#060605]/90 backdrop-blur-xl border-b border-white/5 shadow-lg shadow-black/20' 
          : 'bg-transparent border-b border-white/5'
        }
      `}>
        <div className="max-w-[1400px] mx-auto flex items-center justify-between px-5 md:px-8 py-4">
          
          {/* Logo */}
          <a href="#" onClick={(e) => scrollTo(e, 'hero')} className="flex items-center gap-2.5 cursor-pointer flex-shrink-0">
            <div className="relative flex items-center justify-center w-8 h-8">
              <div className="absolute w-3.5 h-3.5 bg-[#FFB000] rotate-45 -translate-x-1.5 -translate-y-1.5"></div>
              <div className="absolute w-3.5 h-3.5 bg-[#FF7700] rotate-45 translate-x-0.5 translate-y-0.5"></div>
            </div>
            <span className="text-lg font-bold tracking-[0.2em] uppercase text-white">Veyrox</span>
          </a>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => {
              const isActive = activeSection === link.sectionId;
              return (
                <a
                  key={link.label}
                  href={`#${link.sectionId}`}
                  onClick={(e) => scrollTo(e, link.sectionId)}
                  className={`text-sm transition-colors duration-200 relative group ${
                    isActive ? 'text-[#FFD985]' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {link.label}
                  <span
                    className="absolute -bottom-1 left-0 h-[1px] bg-[#FFB000] transition-all duration-300"
                    style={{ width: isActive ? '100%' : '0%' }}
                  />
                  {!isActive && (
                    <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#FFB000] transition-all duration-300 group-hover:w-full" />
                  )}
                </a>
              );
            })}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-3 md:gap-5">
            <div className="hidden sm:flex items-center gap-1 cursor-pointer text-sm text-gray-300 hover:text-white transition-colors">
            <button className='bg-[#FF7700] hover:bg-[#FF7700] cursor-pointer text-black font-medium py-2 px-4 rounded-full'>Sign In</button>
            </div>
            
            {/* CTA Button — hidden on mobile */}
            <button className="hidden md:block relative group rounded-full p-[1px] overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-[#FFB000] to-[#FF7700] opacity-70 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative px-5 py-2 bg-[#060605] rounded-full text-sm font-medium transition-all group-hover:bg-[#060605]/80">
                Request Access
              </div>
            </button>

            {/* Search — hidden on mobile */}
            <button className="hidden md:flex text-gray-400 hover:text-white transition-colors">
              <Search size={18} />
            </button>

            {/* Hamburger / Close — visible on mobile only */}
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="lg:hidden w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-300 hover:text-white hover:bg-white/10 transition-all"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </nav>

      {/* ======================== */}
      {/* Mobile Menu Overlay      */}
      {/* ======================== */}
      <div className={`
        fixed inset-0 z-40 lg:hidden transition-all duration-400
        ${isOpen ? 'visible' : 'invisible'}
      `}>
        {/* Backdrop */}
        <div 
          className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
          onClick={() => setIsOpen(false)}
        ></div>

        {/* Slide-in Panel */}
        <div className={`
          absolute top-0 right-0 w-[85%] max-w-[360px] h-full
          bg-[#0a0a09]/95 backdrop-blur-2xl border-l border-white/5
          flex flex-col p-6 pt-20
          transition-transform duration-300 ease-out
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}
        `}>
          {/* Mobile Nav Links */}
          <div className="flex flex-col gap-1">
            {navLinks.map((link, i) => {
              const isActive = activeSection === link.sectionId;
              return (
                <a
                  key={link.label}
                  href={`#${link.sectionId}`}
                  onClick={(e) => scrollTo(e, link.sectionId)}
                  className={`text-lg py-3 px-4 rounded-xl transition-all duration-200 flex items-center gap-3 ${
                    isActive
                      ? 'text-[#FFD985] bg-[rgba(255,176,0,0.08)] border border-[rgba(255,176,0,0.2)]'
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
                  style={{ animationDelay: `${i * 50}ms` }}
                >
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FFB000] flex-shrink-0"
                      style={{ boxShadow: '0 0 6px #FFB000' }} />
                  )}
                  {link.label}
                </a>
              );
            })}
          </div>

          {/* Divider */}
          <div className="h-px bg-white/10 my-6"></div>

          {/* Mobile Language + Search */}
          <div className="flex items-center gap-4 px-4 mb-6">
            <div className="flex items-center gap-1 cursor-pointer text-sm text-gray-300">
              En <ChevronDown size={14} />
            </div>
            <button className="text-gray-400 hover:text-white transition-colors">
              <Search size={18} />
            </button>
          </div>

          {/* Mobile CTA */}
          <button className="relative group rounded-full p-[1px] overflow-hidden mx-4">
            <div className="absolute inset-0 bg-gradient-to-r from-[#FFB000] to-[#FF7700] opacity-80"></div>
            <div className="relative w-full py-3 bg-[#060605] rounded-full text-sm font-medium text-center transition-all">
              Request Access
            </div>
          </button>
        </div>
      </div>
    </>
  );
};

export default Navbar;