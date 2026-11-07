import React, { useState } from 'react';
import { defaultSupercarData } from '../data';
import { ToggleLeft, ToggleRight, Sparkles } from 'lucide-react';

export const OverviewSection: React.FC = () => {
  const [showVerifiedSpecs, setShowVerifiedSpecs] = useState(false);

  const stats = defaultSupercarData.stats;

  const powerDisplay = showVerifiedSpecs
    ? `${stats.combinedPower.value} ${stats.combinedPower.unit}`
    : '[Value] [Unit]';

  const accelDisplay = showVerifiedSpecs
    ? `${stats.acceleration.value} ${stats.acceleration.unit}`
    : '[Value] [Unit]';

  const speedDisplay = showVerifiedSpecs
    ? `${stats.topSpeed.value} ${stats.topSpeed.unit}`
    : '[Value] [Unit]';

  const rpmDisplay = showVerifiedSpecs
    ? `${stats.engineSpeed.value} ${stats.engineSpeed.unit}`
    : '[Value] [Unit]';

  return (
    <section id="overview" className="relative w-full bg-[#070707] py-20 border-b border-[#1c1810]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        {/* Header Tag */}
        <div className="flex items-center justify-between mb-3">
          <span className="text-[11px] sm:text-xs font-semibold tracking-[0.24em] text-[#d4af37] uppercase">
            OVERVIEW / [MODEL NAME]
          </span>

          {/* Toggle between template mode and verified data */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowVerifiedSpecs(!showVerifiedSpecs)}
              className="flex items-center gap-1.5 text-[11px] text-[#9e947d] hover:text-[#d4af37] transition-colors cursor-pointer"
              title="Toggle verified hypercar telemetry vs template tags"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
              <span className="hidden sm:inline">
                {showVerifiedSpecs ? 'Showing Verified Specs' : 'Preview Live Telemetry'}
              </span>
              {showVerifiedSpecs ? (
                <ToggleRight className="w-4 h-4 text-[#d4af37]" />
              ) : (
                <ToggleLeft className="w-4 h-4 text-[#888]" />
              )}
            </button>
          </div>
        </div>

        {/* Large Proposition Headline */}
        <h2
          className="text-3xl sm:text-5xl md:text-6xl font-black uppercase text-white tracking-tight mb-5"
          style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
        >
          [MODEL PROPOSITION]
        </h2>

        {/* Introduction text */}
        <p className="text-sm sm:text-base text-[#a3a3a3] max-w-4xl font-normal leading-relaxed mb-12">
          [INTRODUCTION – architecture, design intent and model context. Replace concept imagery and
          all facts before publishing.]
        </p>

        {/* 4 Key Stat Cards in a Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {/* Stat 1: MAXIMUM COMBINED POWER */}
          <div className="border border-[#383020] bg-[#0d0d0d]/90 p-5 sm:p-6 transition-all duration-300 hover:border-[#d4af37]/70 group">
            <span className="block text-[10px] sm:text-[11px] tracking-[0.22em] uppercase font-semibold text-[#8a7f68] mb-3 group-hover:text-[#d4af37] transition-colors">
              MAXIMUM COMBINED POWER
            </span>
            <div
              className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-wide mb-2"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              {powerDisplay}
            </div>
            <p className="text-[11px] text-[#6b6b6b] leading-tight">
              {showVerifiedSpecs ? '4.0L V8 twin-turbo + 3 electric motors' : 'Replace with verified model data.'}
            </p>
          </div>

          {/* Stat 2: 0-100 KM/H */}
          <div className="border border-[#383020] bg-[#0d0d0d]/90 p-5 sm:p-6 transition-all duration-300 hover:border-[#d4af37]/70 group">
            <span className="block text-[10px] sm:text-[11px] tracking-[0.22em] uppercase font-semibold text-[#8a7f68] mb-3 group-hover:text-[#d4af37] transition-colors">
              0-100 KM/H
            </span>
            <div
              className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-wide mb-2"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              {accelDisplay}
            </div>
            <p className="text-[11px] text-[#6b6b6b] leading-tight">
              {showVerifiedSpecs ? 'Electric launch control with e-torque vectoring' : 'Replace with verified model data.'}
            </p>
          </div>

          {/* Stat 3: TOP SPEED */}
          <div className="border border-[#383020] bg-[#0d0d0d]/90 p-5 sm:p-6 transition-all duration-300 hover:border-[#d4af37]/70 group">
            <span className="block text-[10px] sm:text-[11px] tracking-[0.22em] uppercase font-semibold text-[#8a7f68] mb-3 group-hover:text-[#d4af37] transition-colors">
              TOP SPEED
            </span>
            <div
              className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-wide mb-2"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              {speedDisplay}
            </div>
            <p className="text-[11px] text-[#6b6b6b] leading-tight">
              {showVerifiedSpecs ? 'Aerodynamic low-drag high downforce trim' : 'Replace with verified model data.'}
            </p>
          </div>

          {/* Stat 4: ENGINE SPEED */}
          <div className="border border-[#383020] bg-[#0d0d0d]/90 p-5 sm:p-6 transition-all duration-300 hover:border-[#d4af37]/70 group">
            <span className="block text-[10px] sm:text-[11px] tracking-[0.22em] uppercase font-semibold text-[#8a7f68] mb-3 group-hover:text-[#d4af37] transition-colors">
              ENGINE SPEED
            </span>
            <div
              className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-wide mb-2"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              {rpmDisplay}
            </div>
            <p className="text-[11px] text-[#6b6b6b] leading-tight">
              {showVerifiedSpecs ? 'Flat-plane crankshaft record 10,000 RPM redline' : 'Replace with verified model data.'}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OverviewSection;
