import React from 'react';
import type { CarModelData } from '../data';
import { AnimatedSection } from '../../../components/AnimatedSection';
import { useStaggerAnimation } from '../../../hooks/useScrollAnimation';

interface OverviewSectionProps {
  carData: CarModelData;
}

export const OverviewSection: React.FC<OverviewSectionProps> = ({ carData }) => {
  const stats = carData.stats;
  const statsRef = useStaggerAnimation<HTMLDivElement>('.stat-card', {
    start: 'top 85%',
    once: true,
  });

  return (
    <section id="overview" className="relative w-full bg-lambo-bold-black py-20 border-b border-[#1c1810]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        {/* Header Tag */}
        <AnimatedSection animation="fadeUp" className="flex items-center justify-between mb-3">
          <span className="text-[11px] sm:text-xs font-semibold tracking-[0.24em] text-lambo-primary uppercase">
            OVERVIEW / {carData.name}
          </span>
        </AnimatedSection>

        {/* Large Proposition Headline */}
        <AnimatedSection animation="fadeUp" delay={0.1}>
          <h2
            className="text-3xl sm:text-5xl md:text-6xl font-black uppercase text-white tracking-tight mb-5 font-barlow"
          >
            {carData.name}
          </h2>
        </AnimatedSection>

        {/* Introduction text */}
        <AnimatedSection animation="fadeUp" delay={0.2}>
          <p className="text-sm sm:text-base text-[#a3a3a3] max-w-4xl font-normal leading-relaxed mb-12">
            {carData.introduction}
          </p>
        </AnimatedSection>

        {/* 4 Key Stat Cards in a Grid */}
        <div ref={statsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {/* Stat 1: MAXIMUM COMBINED POWER */}
          <div className="stat-card border border-[#383020] bg-[#0d0d0d]/90 p-5 sm:p-6 transition-all duration-300 hover:border-lambo-primary/70 group">
            <span className="block text-[10px] sm:text-[11px] tracking-[0.22em] uppercase font-semibold text-[#8a7f68] mb-3 group-hover:text-lambo-primary transition-colors">
              MAXIMUM COMBINED POWER
            </span>
            <div
              className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-wide mb-2 font-barlow"
            >
              {stats.combinedPower.value} {stats.combinedPower.unit}
            </div>
            <p className="text-[11px] text-[#6b6b6b] leading-tight">
              {carData.tagline || 'Hybrid High Performance Powertrain'}
            </p>
          </div>

          {/* Stat 2: 0-100 KM/H */}
          <div className="stat-card border border-[#383020] bg-[#0d0d0d]/90 p-5 sm:p-6 transition-all duration-300 hover:border-lambo-primary/70 group">
            <span className="block text-[10px] sm:text-[11px] tracking-[0.22em] uppercase font-semibold text-[#8a7f68] mb-3 group-hover:text-lambo-primary transition-colors">
              0-100 KM/H
            </span>
            <div
              className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-wide mb-2 font-barlow"
            >
              {stats.acceleration.value} {stats.acceleration.unit}
            </div>
            <p className="text-[11px] text-[#6b6b6b] leading-tight">
              Electric launch control with e-torque vectoring
            </p>
          </div>

          {/* Stat 3: TOP SPEED */}
          <div className="stat-card border border-[#383020] bg-[#0d0d0d]/90 p-5 sm:p-6 transition-all duration-300 hover:border-lambo-primary/70 group">
            <span className="block text-[10px] sm:text-[11px] tracking-[0.22em] uppercase font-semibold text-[#8a7f68] mb-3 group-hover:text-lambo-primary transition-colors">
              TOP SPEED
            </span>
            <div
              className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-wide mb-2 font-barlow"
            >
              {stats.topSpeed.value} {stats.topSpeed.unit}
            </div>
            <p className="text-[11px] text-[#6b6b6b] leading-tight">
              Aerodynamic low-drag high downforce trim
            </p>
          </div>

          {/* Stat 4: ENGINE SPEED */}
          <div className="stat-card border border-[#383020] bg-[#0d0d0d]/90 p-5 sm:p-6 transition-all duration-300 hover:border-lambo-primary/70 group">
            <span className="block text-[10px] sm:text-[11px] tracking-[0.22em] uppercase font-semibold text-[#8a7f68] mb-3 group-hover:text-lambo-primary transition-colors">
              ENGINE SPEED
            </span>
            <div
              className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-wide mb-2 font-barlow"
            >
              {stats.engineSpeed.value} {stats.engineSpeed.unit}
            </div>
            <p className="text-[11px] text-[#6b6b6b] leading-tight">
              Flat-plane crankshaft record 10,000 RPM redline
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OverviewSection;
