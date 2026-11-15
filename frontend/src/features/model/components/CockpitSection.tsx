import React, { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import type { CarModelData } from '../data';
import { AnimatedSection } from '../../../components/AnimatedSection';

interface CockpitSectionProps {
  carData: CarModelData;
}

export const CockpitSection: React.FC<CockpitSectionProps> = ({ carData }) => {
  const [activeDrivingMode, setActiveDrivingMode] = useState<'CITTA' | 'STRADA' | 'SPORT' | 'CORSA'>('CORSA');
  const [showModeInfo, setShowModeInfo] = useState(false);

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

  return (
    <section id="cockpit" className="relative w-full bg-lambo-bold-black py-20 border-b border-[#1c1810]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        {/* Section Number - Top Left */}
        <AnimatedSection animation="fadeUp">
          <div className="flex justify-start mb-8">
            <span className="text-[11px] font-mono tracking-[0.3em] text-[#8e826b] uppercase">
              04
            </span>
          </div>
        </AnimatedSection>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Heading, Story, and Actions */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            {/* Tag */}
            <AnimatedSection animation="fadeUp" delay={0.1}>
              <div className="text-[11px] sm:text-xs font-semibold tracking-[0.24em] text-lambo-primary uppercase mb-4">
                05 / INTERIOR & TECHNOLOGY
              </div>
            </AnimatedSection>

            {/* Headline */}
            <AnimatedSection animation="fadeUp" delay={0.2}>
              <h2
                className="text-3xl sm:text-5xl md:text-6xl font-black uppercase text-white tracking-tight leading-[0.95] mb-6 font-barlow"
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
                  className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-lambo-primary hover:text-[#f3cd60] transition-colors cursor-pointer group font-barlow"
                >
                  <span>DISCOVER THE COCKPIT</span>
                  <ArrowUpRight className="w-4 h-4 text-lambo-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </button>
              </div>
            </AnimatedSection>

            {/* Interactive HMI Mode Selector */}
            {showModeInfo && (
              <AnimatedSection animation="fadeUp" delay={0.1}>
                <div className="mt-6 p-4 border border-[#3d331f] bg-[#111111]">
                  <div className="text-[10px] uppercase font-semibold text-[#888] tracking-widest mb-3">
                    Steering Wheel Anima Mode Selector:
                  </div>
                  <div className="grid grid-cols-4 gap-2 mb-3">
                    {(['CITTA', 'STRADA', 'SPORT', 'CORSA'] as const).map((mode) => (
                      <button
                        key={mode}
                        onClick={() => setActiveDrivingMode(mode)}
                        className={`py-1.5 px-2 text-[11px] font-bold tracking-wider uppercase border transition-all cursor-pointer ${
                          activeDrivingMode === mode
                            ? 'border-lambo-primary bg-lambo-primary/20 text-lambo-primary'
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
              </AnimatedSection>
            )}
          </div>

          {/* Right Column: Driver Cockpit Interior Image */}
          <AnimatedSection animation="fadeLeft" delay={0.2} className="lg:col-span-7">
            <div className="relative border border-[#262016] overflow-hidden bg-[#0a0a0a] group">
              <img
                src={carData.interior.image}
                alt="Lamborghini Interior Cockpit"
                className="w-full h-auto object-cover filter brightness-95"
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
