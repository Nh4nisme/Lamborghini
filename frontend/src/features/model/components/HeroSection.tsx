import React, { useState, useRef, useEffect } from 'react';
import { ArrowUpRight, ChevronDown, Volume2, VolumeX } from 'lucide-react';
import type { CarModelData } from '../data';

// Lamborghini Shield Logo SVG Component
const LamborghiniLogo = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path 
      d="M12 2L2 7V12L12 17L22 12V7L12 2Z" 
      stroke="currentColor" 
      strokeWidth="1.5" 
      strokeLinecap="round" 
      strokeLinejoin="round"
      fill="none"
    />
    <path 
      d="M2 12L12 17L22 12" 
      stroke="currentColor" 
      strokeWidth="1.5" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <path 
      d="M12 22V17" 
      stroke="currentColor" 
      strokeWidth="1.5" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <path 
      d="M12 7L7 9.5V14.5L12 17L17 14.5V9.5L12 7Z" 
      stroke="currentColor" 
      strokeWidth="1.5" 
      strokeLinecap="round" 
      strokeLinejoin="round"
      fill="none"
    />
  </svg>
);

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
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    // Auto-play video on mount
    if (videoRef.current) {
      videoRef.current.play().catch(err => {
        console.log('Video autoplay prevented:', err);
      });
    }
  }, []);

  const handleMuteToggle = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const scrollToExplore = () => {
    const el = document.getElementById('overview');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative h-screen w-full overflow-hidden -mt-14 flex items-center">
      {/* Hero Background - Video hoặc Image thuần nền giống HomePage */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {carData.name === 'REVUELTO' ? (
          // Video background cho Revuelto (chạy tự động, tắt tiếng, lặp vô tận)
          <>
            <video
              ref={videoRef}
              autoPlay
              muted={isMuted}
              loop
              playsInline
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 min-w-full min-h-full w-auto h-auto object-cover scale-105"
            >
              <source src="/Images/model-detail/revuelto/hero-video.mp4" type="video/mp4" />
            </video>
            
            {/* Mute/Unmute Button */}
            <button
              onClick={handleMuteToggle}
              className="absolute bottom-20 right-6 sm:right-10 z-20 p-3 bg-black/80 border border-[#d4af37]/50 hover:bg-[#d4af37]/20 transition-colors backdrop-blur-sm cursor-pointer"
              aria-label={isMuted ? 'Unmute video' : 'Mute video'}
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
            <div className="absolute inset-0 bg-gradient-to-r from-[#070707] via-[#070707]/60 to-transparent pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#070707] via-transparent to-[#070707]/60 pointer-events-none" />
          </>
        )}
      </div>

      {/* Content Container - Bottom Aligned like Image 2 */}
      <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 w-full h-full flex flex-col justify-end pb-8 sm:pb-12">
        {/* Campaign Role & Headline Overlay */}
        <div className="max-w-2xl mb-8 sm:mb-12">
          {/* Tag with Logo */}
          <div className="flex items-center gap-3 mb-4">
            <LamborghiniLogo className="w-5 h-5 text-[#d4af37]" />
            <span className="text-[11px] sm:text-xs font-semibold tracking-[0.22em] text-[#d4af37] uppercase">
              {carData.name} / CAMPAIGN ROLE
            </span>
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
        <div className="flex items-center justify-between text-[11px] sm:text-xs uppercase tracking-[0.2em] font-medium text-[#c4b595]">
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
