import React, { useState } from 'react';
import { ArrowUpRight, ChevronDown, Volume2, VolumeX } from 'lucide-react';
import type { CarModelData } from '../data';

interface HeroSectionProps {
  carData: CarModelData;
  onOpenConfigurator: () => void;
  onOpenEnquiry: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  carData,
  onOpenConfigurator,
  onOpenEnquiry,
}) => {
  const [isMuted, setIsMuted] = useState(false); // Mặc định BẬT âm thanh
  
  const scrollToExplore = () => {
    const el = document.getElementById('overview');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative w-full min-h-[90vh] sm:min-h-screen bg-[#070707] flex items-center overflow-hidden pt-28">
      {/* Hero Background - YouTube Video hoặc Image */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {carData.name === 'REVUELTO' ? (
          // YouTube Video cho Revuelto
          <>
            <iframe
              className="absolute top-0 left-0 w-full h-full object-cover scale-150"
              src={`https://www.youtube.com/embed/OfmNVANmalA?autoplay=1&loop=1&playlist=OfmNVANmalA&controls=0&showinfo=0&mute=${isMuted ? 1 : 0}&enablejsapi=1`}
              title="Lamborghini Revuelto"
              allow="autoplay; encrypted-media"
              allowFullScreen
            />
            
            {/* Mute/Unmute Button */}
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="absolute top-24 right-8 z-20 p-3 bg-black/60 border border-[#d4af37]/50 hover:bg-[#d4af37]/20 transition-colors"
              aria-label={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? (
                <VolumeX className="w-5 h-5 text-white" />
              ) : (
                <Volume2 className="w-5 h-5 text-[#d4af37]" />
              )}
            </button>
          </>
        ) : (
          // Fallback: Image cho các model khác
          <div className="relative w-full h-full flex justify-end">
            <div className="relative w-full lg:w-3/5 h-full">
              <img
                src={carData.heroImage}
                alt={`${carData.name} Supercar Model Showcase`}
                className="w-full h-full object-cover object-left filter brightness-95"
                loading="eager"
              />
              {/* Smooth gradient blend into dark left panel */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#070707] via-[#070707]/60 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#070707] via-transparent to-[#070707]/60" />
            </div>
          </div>
        )}
        
        {/* Dark overlay for video */}
        {carData.name === 'REVUELTO' && (
          <>
            <div className="absolute inset-0 bg-gradient-to-r from-[#070707] via-[#070707]/60 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#070707] via-transparent to-[#070707]/60" />
          </>
        )}
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-[1440px] w-full mx-auto px-4 sm:px-6 lg:px-10 py-16 flex flex-col justify-between min-h-[75vh]">
        {/* Campaign Role & Headline Overlay */}
        <div className="max-w-2xl mt-10 sm:mt-16">
          {/* Tag */}
          <div className="inline-block text-[11px] sm:text-xs font-semibold tracking-[0.22em] text-[#d4af37] uppercase mb-4">
            TEMPLATE / CAMPAIGN ROLE
          </div>

          {/* Large Headline */}
          <h1
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase text-white tracking-tight leading-[0.95] mb-8"
            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
          >
            {carData.heroHeadline}
          </h1>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-4">
            {/* CONFIGURE */}
            <button
              onClick={onOpenConfigurator}
              className="flex items-center gap-2 px-7 py-3 text-xs sm:text-sm font-bold uppercase tracking-[0.18em] text-black bg-[#d4af37] hover:bg-[#e6be43] transition-all cursor-pointer shadow-lg shadow-[#d4af37]/10"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              CONFIGURE
              <ArrowUpRight className="w-4 h-4" />
            </button>

            {/* ENQUIRE */}
            <button
              onClick={onOpenEnquiry}
              className="flex items-center gap-2 px-7 py-3 text-xs sm:text-sm font-bold uppercase tracking-[0.18em] text-white border border-[#4d3f23] hover:border-[#d4af37] bg-black/40 backdrop-blur-xs hover:bg-[#d4af37]/10 transition-all cursor-pointer"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              ENQUIRE
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Bottom Hero Indicators: 01 / 05 & Scroll To Explore */}
        <div className="flex items-center justify-between pt-16 border-t border-transparent text-[11px] sm:text-xs uppercase tracking-[0.2em] font-medium text-[#c4b595]">
          {/* Index Counter */}
          <div className="font-mono text-sm tracking-widest text-[#e8c872]">
            01 / 05
          </div>

          {/* Scroll cue */}
          <button
            onClick={scrollToExplore}
            className="flex items-center gap-1.5 hover:text-[#e8c872] transition-colors cursor-pointer group"
          >
            <span>SCROLL TO EXPLORE</span>
            <ChevronDown className="w-4 h-4 text-[#d4af37] group-hover:translate-y-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
