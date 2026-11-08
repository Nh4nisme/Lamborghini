import React, { useState, useRef, useEffect } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { CarModelData } from '../data';
import { AnimatedSection } from '../../../components/AnimatedSection';

gsap.registerPlugin(ScrollTrigger);

interface CockpitSectionProps {
  carData: CarModelData;
}

export const CockpitSection: React.FC<CockpitSectionProps> = ({ carData }) => {
  const [activeDrivingMode, setActiveDrivingMode] = useState<'CITTA' | 'STRADA' | 'SPORT' | 'CORSA'>('CORSA');
  const [showModeInfo, setShowModeInfo] = useState(false);
  
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const modeButtonsRef = useRef<HTMLDivElement>(null);

  const drivingModes = {
    CITTA: {
      desc: 'Zero-emission full electric drive designed for urban stealth and smooth maneuvering.',
      color: '#4ade80',
    },
    STRADA: {
      desc: 'Comfort-oriented touring mode delivering sublime ride compliance and dynamic e-torque stability.',
      color: '#60a5fa',
    },
    SPORT: {
      desc: 'Enhanced throttle sensitivity, rear-biased torque split, and visceral acoustic valves open.',
      color: '#f97316',
    },
    CORSA: {
      desc: 'Track-ready maximum output, flat-shift gear engagement, active aero downforce, and 10,000 RPM telemetry.',
      color: '#ef4444',
    },
  };

  // GSAP Scroll Animations
  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Parallax effect on the image
      if (imageRef.current && imageContainerRef.current) {
        gsap.to(imageRef.current, {
          y: 80,
          ease: 'none',
          scrollTrigger: {
            trigger: imageContainerRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.5,
          },
        });

        // Subtle zoom effect on scroll
        gsap.fromTo(
          imageRef.current,
          { scale: 1.1 },
          {
            scale: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: imageContainerRef.current,
              start: 'top 80%',
              end: 'top 20%',
              scrub: 1,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Animate mode buttons when shown
  useEffect(() => {
    if (showModeInfo && modeButtonsRef.current) {
      const buttons = modeButtonsRef.current.querySelectorAll('button');
      
      gsap.fromTo(
        buttons,
        {
          opacity: 0,
          y: 10,
          scale: 0.95,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.4,
          stagger: 0.08,
          ease: 'back.out(1.7)',
        }
      );
    }
  }, [showModeInfo]);

  return (
    <section ref={sectionRef} id="cockpit" className="relative w-full bg-[#070707] py-20 border-b border-[#1c1810]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        {/* Section Number - Top Right */}
        <AnimatedSection animation="fadeUp">
          <div className="flex justify-end mb-8">
            <span className="text-[11px] font-mono tracking-[0.3em] text-[#8e826b] uppercase">
              05
            </span>
          </div>
        </AnimatedSection>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Heading, Story, and Actions */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            {/* Tag */}
            <AnimatedSection animation="fadeUp" delay={0.1}>
              <div className="text-[11px] sm:text-xs font-semibold tracking-[0.24em] text-[#d4af37] uppercase mb-4">
                05 / INTERIOR & TECHNOLOGY
              </div>
            </AnimatedSection>

            {/* Headline */}
            <AnimatedSection animation="fadeUp" delay={0.2}>
              <h2
                className="text-3xl sm:text-5xl md:text-6xl font-black uppercase text-white tracking-tight leading-[0.95] mb-6"
                style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
              >
                {carData.interior.headline}
              </h2>
            </AnimatedSection>

            {/* Story */}
            <AnimatedSection animation="fadeUp" delay={0.3}>
              <p className="text-sm sm:text-base text-[#a3a3a3] font-normal leading-relaxed mb-8">
                {carData.interior.story}
              </p>
            </AnimatedSection>

            {/* Discover Cockpit Link */}
            <AnimatedSection animation="fadeUp" delay={0.4}>
              <div>
                <button
                  onClick={() => setShowModeInfo(!showModeInfo)}
                  className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[#d4af37] hover:text-[#f3cd60] transition-colors cursor-pointer group"
                  style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                >
                  <span>DISCOVER THE COCKPIT</span>
                  <ArrowUpRight className="w-4 h-4 text-[#d4af37] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </button>
              </div>
            </AnimatedSection>

            {/* Interactive HMI Mode Selector */}
            {showModeInfo && (
              <div className="mt-6 p-4 border border-[#3d331f] bg-[#111111] animate-fadeIn">
                <div className="text-[10px] uppercase font-semibold text-[#888] tracking-widest mb-3">
                  Steering Wheel Anima Mode Selector:
                </div>
                <div ref={modeButtonsRef} className="grid grid-cols-4 gap-2 mb-3">
                  {(['CITTA', 'STRADA', 'SPORT', 'CORSA'] as const).map((mode) => (
                    <button
                      key={mode}
                      onClick={() => setActiveDrivingMode(mode)}
                      className={`py-1.5 px-2 text-[11px] font-bold tracking-wider uppercase border transition-all cursor-pointer ${
                        activeDrivingMode === mode
                          ? 'border-[#d4af37] bg-[#d4af37]/20 text-[#d4af37]'
                          : 'border-[#2a2418] text-[#777] hover:border-[#666]'
                      }`}
                    >
                      {mode}
                    </button>
                  ))}
                </div>
                <p className="text-xs text-[#ccc] leading-relaxed">
                  <span className="font-semibold text-white">{activeDrivingMode}:</span>{' '}
                  {drivingModes[activeDrivingMode].desc}
                </p>
              </div>
            )}
          </div>

          {/* Right Column: Driver Cockpit Interior Image */}
          <AnimatedSection animation="fadeLeft" delay={0.2} className="lg:col-span-7">
            <div 
              ref={imageContainerRef}
              className="relative border border-[#262016] overflow-hidden bg-[#0a0a0a] group"
            >
              <img
                ref={imageRef}
                src={carData.interior.image}
                alt="Lamborghini Interior Cockpit"
                className="w-full h-auto object-cover filter brightness-95 will-change-transform"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-3 right-4 text-[10px] uppercase tracking-widest text-[#948972] font-mono">
                HMI 12.3&quot; CLUSTER + 8.4&quot; CENTRAL DISPLAY
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default CockpitSection;
