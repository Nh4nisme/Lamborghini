import React, { useState } from 'react';
import { ArrowUpRight, Flame } from 'lucide-react';
import type { CarModelData } from '../data';

interface PowertrainSectionProps {
  carData: CarModelData;
  onOpenSpecsModal?: () => void;
}

export const PowertrainSection: React.FC<PowertrainSectionProps> = ({ carData }) => {
  const [showArchitectureDetails, setShowArchitectureDetails] = useState(false);

  return (
    <section id="powertrain" className="relative w-full bg-[#070707] py-20 border-b border-[#1c1810]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Powertrain Engine Image with Gold Accent Frame */}
          <div className="lg:col-span-7">
            <div className="relative border border-[#2b2518] overflow-hidden group bg-[#0e0e0e]">
              <img
                src={carData.powertrain.image}
                alt="Lamborghini Powertrain Engine"
                className="w-full h-auto object-cover filter brightness-95 group-hover:scale-102 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-3 left-4 text-[10px] uppercase tracking-widest text-[#948972] font-mono">
                ENGINE ARCHITECTURE / 4.0L V8 TWIN-TURBO + 3 ELECTRIC MOTORS
              </div>
            </div>
          </div>

          {/* Right Column: Headline, Story, and Action */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            {/* Tag */}
            <div className="text-[11px] sm:text-xs font-semibold tracking-[0.24em] text-[#d4af37] uppercase mb-3">
              01 / POWERTRAIN
            </div>

            {/* Headline */}
            <h3
              className="text-3xl sm:text-4xl md:text-5xl font-black uppercase text-white tracking-tight leading-tight mb-5"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              {carData.powertrain.headline}
            </h3>

            {/* Story */}
            <p className="text-sm sm:text-base text-[#a3a3a3] font-normal leading-relaxed mb-8">
              {carData.powertrain.story}
            </p>

            {/* Explore Powertrain Link / Button */}
            <div>
              <button
                onClick={() => setShowArchitectureDetails(!showArchitectureDetails)}
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[#d4af37] hover:text-[#f3cd60] transition-colors cursor-pointer group"
                style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
              >
                <span>EXPLORE POWERTRAIN</span>
                <ArrowUpRight className="w-4 h-4 text-[#d4af37] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </div>

            {/* Interactive Architecture Breakdown Drawer */}
            {showArchitectureDetails && (
              <div className="mt-6 p-4 border border-[#3d331f] bg-[#111111] animate-fadeIn text-xs text-[#b8b8b8] space-y-3">
                <div className="flex items-center gap-2 text-[#d4af37] font-semibold tracking-wider uppercase text-[11px]">
                  <Flame className="w-3.5 h-3.5" />
                  <span>Verified Hybrid Telemetry</span>
                </div>
                <div className="grid grid-cols-2 gap-2 pt-1 border-t border-[#222]">
                  <div>
                    <span className="text-[#777] block text-[10px] uppercase">Combustion:</span>
                    <span className="text-white font-mono">800 CV @ 9,000-9,750 RPM</span>
                  </div>
                  <div>
                    <span className="text-[#777] block text-[10px] uppercase">Electric E-Axle:</span>
                    <span className="text-white font-mono">150 kW (3x Axial Flux)</span>
                  </div>
                  <div>
                    <span className="text-[#777] block text-[10px] uppercase">Torque:</span>
                    <span className="text-white font-mono">730 Nm @ 4,000-7,000 RPM</span>
                  </div>
                  <div>
                    <span className="text-[#777] block text-[10px] uppercase">Battery:</span>
                    <span className="text-white font-mono">3.8 kWh Lithium-Ion</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Engineering Headline Cards Row (LDVI 2.0 & SPACEFRAME) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16 pt-12 border-t border-[#1c1810]">
          {/* Card 1: LDVI 2.0 */}
          <div className="border border-[#383020] bg-[#0c0c0c] p-6 sm:p-8 hover:border-[#d4af37] transition-all duration-300 group">
            <div className="text-[10px] sm:text-[11px] font-semibold tracking-[0.24em] text-[#8e826b] uppercase mb-3 group-hover:text-[#d4af37] transition-colors">
              LDVI 2.0
            </div>
            <h4
              className="text-2xl sm:text-3xl font-black uppercase text-white tracking-wide mb-3"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              {carData.engineering.ldvi.headline}
            </h4>
            <p className="text-xs sm:text-sm text-[#888888] leading-relaxed">
              {carData.engineering.ldvi.description}
            </p>
          </div>

          {/* Card 2: SPACEFRAME */}
          <div className="border border-[#383020] bg-[#0c0c0c] p-6 sm:p-8 hover:border-[#d4af37] transition-all duration-300 group">
            <div className="text-[10px] sm:text-[11px] font-semibold tracking-[0.24em] text-[#8e826b] uppercase mb-3 group-hover:text-[#d4af37] transition-colors">
              SPACEFRAME
            </div>
            <h4
              className="text-2xl sm:text-3xl font-black uppercase text-white tracking-wide mb-3"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              {carData.engineering.spaceframe.headline}
            </h4>
            <p className="text-xs sm:text-sm text-[#888888] leading-relaxed">
              {carData.engineering.spaceframe.description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PowertrainSection;
