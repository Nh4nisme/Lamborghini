import React, { useState } from 'react';
import type { CarModelData, Hotspot } from '../data';
import { Plus, X, Wind } from 'lucide-react';

interface AerodynamicsSectionProps {
  carData: CarModelData;
}

export const AerodynamicsSection: React.FC<AerodynamicsSectionProps> = ({ carData }) => {
  const [selectedHotspot, setSelectedHotspot] = useState<Hotspot | null>(null);
  const aeroData = carData.aerodynamics;

  return (
    <section id="aerodynamics" className="relative w-full bg-[#070707] py-20 border-b border-[#1c1810]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        {/* Section Number - Top Right */}
        <div className="flex justify-end mb-8">
          <span className="text-[11px] font-mono tracking-[0.3em] text-[#8e826b] uppercase">
            03
          </span>
        </div>
        
        {/* Tag */}
        <div className="text-[11px] sm:text-xs font-semibold tracking-[0.24em] text-[#d4af37] uppercase mb-3">
          {aeroData.tag}
        </div>

        {/* Headline */}
        <h2
          className="text-3xl sm:text-5xl md:text-6xl font-black uppercase text-white tracking-tight leading-tight mb-8"
          style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
        >
          {aeroData.headline}
        </h2>

        {/* Panoramic Landscape Exterior Side Profile Image */}
        <div className="relative border border-[#262016] overflow-hidden bg-[#0a0a0a] group">
          <img
            src={carData.aerodynamics.image}
            alt="Lamborghini Aerodynamic Exploration"
            className="w-full h-auto object-cover filter brightness-95"
            loading="lazy"
          />

          {/* Interactive Aerodynamic Hotspot Pins on the Image */}
          {aeroData.hotspots.map((spot) => (
            <button
              key={spot.id}
              onClick={() => setSelectedHotspot(selectedHotspot?.id === spot.id ? null : spot)}
              style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
              className={`absolute -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 z-20 ${
                selectedHotspot?.id === spot.id
                  ? 'bg-[#d4af37] text-black scale-125 ring-4 ring-[#d4af37]/40'
                  : 'bg-black/80 border border-[#d4af37] text-[#d4af37] hover:scale-110 hover:bg-[#d4af37] hover:text-black'
              }`}
              aria-label={`Inspect ${spot.name}`}
            >
              <span className="text-xs font-bold leading-none">+</span>
            </button>
          ))}

          {/* Active Hotspot Popover Tooltip */}
          {selectedHotspot && (
            <div
              className="absolute z-30 max-w-xs sm:max-w-sm bg-[#111111]/95 border border-[#d4af37] p-4 text-xs shadow-2xl backdrop-blur-md animate-fadeIn transition-all"
              style={{
                left: `${Math.min(75, Math.max(20, selectedHotspot.x))}%`,
                top: `${selectedHotspot.y > 50 ? selectedHotspot.y - 35 : selectedHotspot.y + 12}%`,
                transform: 'translateX(-50%)',
              }}
            >
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#292318]">
                <div className="flex items-center gap-1.5 text-[#d4af37] font-bold uppercase tracking-wider text-[11px]">
                  <Wind className="w-3.5 h-3.5" />
                  <span>{selectedHotspot.title}</span>
                </div>
                <button
                  onClick={() => setSelectedHotspot(null)}
                  className="text-[#888] hover:text-white"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
              <p className="text-[#cccccc] text-[11px] leading-relaxed">
                {selectedHotspot.description}
              </p>
            </div>
          )}
        </div>

        {/* Caption below image */}
        <div className="mt-4 mb-6">
          <p className="text-[11px] text-[#737373] tracking-wide">
            Original concept study / exterior – static aerodynamic exploration
          </p>
        </div>

        {/* Hotspot Toggle Buttons Bar matching the exact screenshot */}
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-2 pb-6 border-b border-[#1c1810]">
          {aeroData.hotspots.map((spot) => (
            <button
              key={spot.id}
              onClick={() => setSelectedHotspot(selectedHotspot?.id === spot.id ? null : spot)}
              className={`flex items-center gap-1.5 text-xs sm:text-sm uppercase tracking-[0.14em] font-medium transition-colors cursor-pointer ${
                selectedHotspot?.id === spot.id
                  ? 'text-[#d4af37] font-bold'
                  : 'text-[#9c937f] hover:text-[#d4af37]'
              }`}
            >
              <Plus className="w-3.5 h-3.5 text-[#d4af37]" />
              <span>{spot.name}</span>
            </button>
          ))}
        </div>

        {/* Exterior Story */}
        <div className="mt-8">
          <p className="text-sm sm:text-base text-[#a3a3a3] max-w-4xl font-normal leading-relaxed">
            {aeroData.story}
          </p>
        </div>
      </div>
    </section>
  );
};

export default AerodynamicsSection;
