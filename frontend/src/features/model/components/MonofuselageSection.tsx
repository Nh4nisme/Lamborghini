import React from 'react';
import type { CarModelData } from '../data';
import { Box, Shield } from 'lucide-react';

interface MonofuselageSectionProps {
  carData: CarModelData;
}

export const MonofuselageSection: React.FC<MonofuselageSectionProps> = ({ carData }) => {
  const spaceframeData = carData.engineering.spaceframe;

  return (
    <section id="monofuselage" className="relative w-full bg-[#070707] py-20 border-b border-[#1c1810]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        {/* Tag */}
        <div className="text-[11px] sm:text-xs font-semibold tracking-[0.24em] text-[#d4af37] uppercase mb-3 flex items-center gap-2">
          <Box className="w-4 h-4" />
          <span>STRUCTURE</span>
        </div>

        {/* Headline */}
        <h2
          className="text-3xl sm:text-5xl md:text-6xl font-black uppercase text-white tracking-tight leading-tight mb-8"
          style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
        >
          {spaceframeData.headline}
        </h2>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Left: Visual placeholder */}
          <div className="relative border border-[#262016] overflow-hidden bg-[#0a0a0a] aspect-[4/3]">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <Shield className="w-16 h-16 text-[#d4af37] mx-auto mb-4 opacity-30" />
                <p className="text-xs text-[#666] uppercase tracking-wider">
                  Chassis Structure Visualization
                </p>
              </div>
            </div>
          </div>

          {/* Right: Description */}
          <div>
            <p className="text-sm sm:text-base text-[#a3a3a3] font-normal leading-relaxed mb-6">
              {spaceframeData.description}
            </p>

            {/* Technical Highlights */}
            <div className="space-y-3 mt-8">
              <div className="flex items-start gap-3 p-4 border border-[#2b2518] bg-[#0d0d0d]">
                <Box className="w-5 h-5 text-[#d4af37] mt-0.5 shrink-0" />
                <div>
                  <h4 className="text-sm font-bold text-white uppercase tracking-wide mb-1">
                    Lightweight Design
                  </h4>
                  <p className="text-xs text-[#888]">
                    Carbon fiber and aerospace-grade materials for optimal strength-to-weight ratio
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 border border-[#2b2518] bg-[#0d0d0d]">
                <Shield className="w-5 h-5 text-[#d4af37] mt-0.5 shrink-0" />
                <div>
                  <h4 className="text-sm font-bold text-white uppercase tracking-wide mb-1">
                    Enhanced Safety
                  </h4>
                  <p className="text-xs text-[#888]">
                    Monocoque structure provides superior occupant protection and crash safety
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MonofuselageSection;
