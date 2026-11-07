import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

interface SubNavigationProps {
  onOpenConfigurator?: () => void;
}

export function SubNavigation({ onOpenConfigurator }: SubNavigationProps) {
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['overview', 'powertrain', 'aerodynamics', 'sound', 'cockpit', 'dynamics', 'monofuselage', 'gallery', 'specs', 'adpersonam'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 200 && rect.bottom >= 200;
        }
        return false;
      });
      if (current) setActiveTab(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 130; // Increased offset for SubNav + MainNav
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="sticky top-14 left-0 right-0 z-40 bg-[#282928] border-b-2 border-[#9F6B08]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 h-16 flex items-center justify-between">
        <nav className="flex items-center gap-6 text-xs uppercase tracking-[0.2em] font-semibold font-barlow overflow-x-auto">
          <button
            onClick={() => scrollToSection('overview')}
            className={`transition-colors whitespace-nowrap ${
              activeTab === 'overview' ? 'text-[#D8A016]' : 'text-[#c4c4c4] hover:text-[#D8A016]'
            }`}
          >
            OVERVIEW
          </button>
          <button
            onClick={() => scrollToSection('powertrain')}
            className={`transition-colors whitespace-nowrap ${
              activeTab === 'powertrain' ? 'text-[#D8A016]' : 'text-[#c4c4c4] hover:text-[#D8A016]'
            }`}
          >
            POWERTRAIN
          </button>
          <button
            onClick={() => scrollToSection('aerodynamics')}
            className={`transition-colors whitespace-nowrap ${
              activeTab === 'aerodynamics' ? 'text-[#D8A016]' : 'text-[#c4c4c4] hover:text-[#D8A016]'
            }`}
          >
            AERO
          </button>
          <button
            onClick={() => scrollToSection('sound')}
            className={`transition-colors whitespace-nowrap ${
              activeTab === 'sound' ? 'text-[#D8A016]' : 'text-[#c4c4c4] hover:text-[#D8A016]'
            }`}
          >
            SOUND
          </button>
          <button
            onClick={() => scrollToSection('cockpit')}
            className={`transition-colors whitespace-nowrap ${
              activeTab === 'cockpit' ? 'text-[#D8A016]' : 'text-[#c4c4c4] hover:text-[#D8A016]'
            }`}
          >
            COCKPIT
          </button>
          <button
            onClick={() => scrollToSection('dynamics')}
            className={`transition-colors whitespace-nowrap ${
              activeTab === 'dynamics' ? 'text-[#D8A016]' : 'text-[#c4c4c4] hover:text-[#D8A016]'
            }`}
          >
            DYNAMICS
          </button>
          <button
            onClick={() => scrollToSection('gallery')}
            className={`transition-colors whitespace-nowrap ${
              activeTab === 'gallery' ? 'text-[#D8A016]' : 'text-[#c4c4c4] hover:text-[#D8A016]'
            }`}
          >
            GALLERY
          </button>
          <button
            onClick={() => scrollToSection('specs')}
            className={`transition-colors whitespace-nowrap ${
              activeTab === 'specs' ? 'text-[#D8A016]' : 'text-[#c4c4c4] hover:text-[#D8A016]'
            }`}
          >
            SPECS
          </button>
          <Link to="/showroom" className="text-[#c4c4c4] hover:text-[#D8A016] transition-colors whitespace-nowrap">
            DEALERSHIP
          </Link>
        </nav>

        <button 
          onClick={onOpenConfigurator}
          className="px-6 py-2.5 bg-[#D8A016] hover:bg-[#F9CE5C] active:bg-[#9F6B08] text-black font-barlow font-bold uppercase text-xs tracking-[0.2em] transition-all duration-300 whitespace-nowrap"
        >
          CONFIGURE
        </button>
      </div>
    </div>
  );
}
