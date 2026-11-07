import React, { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import type { CarModelData } from '../data';

interface CockpitSectionProps {
  carData: CarModelData;
}

export const CockpitSection: React.FC<CockpitSectionProps> = () => {
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
    <section id="cockpit" className="relative w-full bg-[#070707] py-20 border-b border-[#1c1810]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Heading, Story, and Actions */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            {/* Tag */}
            <div className="text-[11px] sm:text-xs font-semibold tracking-[0.24em] text-[#d4af37] uppercase mb-4">
              04 / INTERIOR & TECHNOLOGY
            </div>

            {/* Headline */}
            <h2
              className="text-3xl sm:text-5xl md:text-6xl font-black uppercase text-white tracking-tight leading-[0.95] mb-6"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              {carData.interior.headline}
            </h2>

            {/* Story */}
            <p className="text-sm sm:text-base text-[#a3a3a3] font-normal leading-relaxed mb-8">
              {carData.interior.story}
            </p>

            {/* Discover Cockpit Link */}
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

            {/* Interactive HMI Mode Selector */}
            {showModeInfo && (
              <div className="mt-6 p-4 border border-[#3d331f] bg-[#111111] animate-fadeIn">
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
          <div className="lg:col-span-7">
            <div className="relative border border-[#262016] overflow-hidden bg-[#0a0a0a] group">
              <img
                src={carData.interior.image}
                alt="Lamborghini Interior Cockpit"
                className="w-full h-auto object-cover filter brightness-95 group-hover:scale-102 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-3 right-4 text-[10px] uppercase tracking-widest text-[#948972] font-mono">
                HMI 12.3&quot; CLUSTER + 8.4&quot; CENTRAL DISPLAY
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CockpitSection;
