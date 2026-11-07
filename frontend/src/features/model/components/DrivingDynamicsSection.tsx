import React from 'react';
import type { CarModelData } from '../data';
import { Gauge, Zap } from 'lucide-react';

interface DrivingDynamicsSectionProps {
  carData: CarModelData;
}

export const DrivingDynamicsSection: React.FC<DrivingDynamicsSectionProps> = ({ carData }) => {
  const ldviData = carData.engineering.ldvi;

  return (
    <section id="driving-dynamics" className="relative w-full bg-[#070707] py-20 border-b border-[#1c1810]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        {/* Tag */}
        <div className="text-[11px] sm:text-xs font-semibold tracking-[0.24em] text-[#d4af37] uppercase mb-3 flex items-center gap-2">
          <Gauge className="w-4 h-4" />
          <span>DRIVING DYNAMICS</span>
        </div>

        {/* Headline */}
        <h2
          className="text-3xl sm:text-5xl md:text-6xl font-black uppercase text-white tracking-tight leading-tight mb-8"
          style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
        >
          {ldviData.headline}
        </h2>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Left: Description */}
          <div>
            <p className="text-sm sm:text-base text-[#a3a3a3] font-normal leading-relaxed mb-6">
              {ldviData.description}
            </p>

            {/* Feature Highlights */}
            <div className="space-y-3 mt-8">
              <div className="flex items-start gap-3 p-4 border border-[#2b2518] bg-[#0d0d0d]">
                <Zap className="w-5 h-5 text-[#d4af37] mt-0.5 shrink-0" />
                <div>
                  <h4 className="text-sm font-bold text-white uppercase tracking-wide mb-1">
                    Integrated Control
                  </h4>
                  <p className="text-xs text-[#888]">
                    Real-time coordination of powertrain, steering, and traction systems
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 border border-[#2b2518] bg-[#0d0d0d]">
                <Gauge className="w-5 h-5 text-[#d4af37] mt-0.5 shrink-0" />
                <div>
                  <h4 className="text-sm font-bold text-white uppercase tracking-wide mb-1">
                    Predictive Logic
                  </h4>
                  <p className="text-xs text-[#888]">
                    Anticipates driver input and road conditions for optimal response
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Visual placeholder */}
          <div className="relative border border-[#262016] overflow-hidden bg-[#0a0a0a] aspect-[4/3]">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <Gauge className="w-16 h-16 text-[#d4af37] mx-auto mb-4 opacity-30" />
                <p className="text-xs text-[#666] uppercase tracking-wider">
                  Driving Dynamics Visualization
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DrivingDynamicsSection;
