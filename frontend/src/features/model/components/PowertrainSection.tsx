import React, { useState } from 'react';
import { ArrowUpRight, Flame } from 'lucide-react';
import { type CarModelData, getModelFolder } from '../data';

interface PowertrainSectionProps {
  carData: CarModelData;
  onOpenSpecsModal?: () => void;
}

export const PowertrainSection: React.FC<PowertrainSectionProps> = ({ carData }) => {
  const [showArchitectureDetails, setShowArchitectureDetails] = useState(false);
  const modelFolder = getModelFolder(carData.name);

  // Danh sách 2 Technology Cards lấy từ API (carData.engineering.technologyCards)
  const techCards = (
    carData.engineering.technologyCards && carData.engineering.technologyCards.length > 0
      ? carData.engineering.technologyCards
      : [
          {
            title: carData.engineering.ldvi?.title || 'TECHNOLOGY',
            description: carData.engineering.ldvi?.description || '',
            tag: '02 / TECHNOLOGY',
          },
          {
            title: carData.engineering.spaceframe?.title || 'STRUCTURE',
            description: carData.engineering.spaceframe?.description || '',
            tag: '03 / STRUCTURE',
          },
        ]
  ).filter(card => card.title && card.description);

  return (
    <section id="powertrain" className="relative w-full bg-lambo-bold-black py-20 border-b border-[#1c1810]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        {/* Section Number - Top Right */}
        <div className="flex justify-end mb-8">
          <span className="text-[11px] font-mono tracking-[0.3em] text-[#8e826b] uppercase">
            02
          </span>
        </div>
        
        {/* Phần 1: Video/Image Powertrain (Trái) + Content Powertrain (Phải) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Cột trái: Video Powertrain */}
          <div className="lg:col-span-7">
            <div className="relative border border-lambo-primary overflow-hidden group bg-lambo-dark">
              <video
                key={modelFolder}
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-auto object-cover filter brightness-95"
              >
                <source src={`/Images/model-detail/${modelFolder}/powertrain.mp4`} type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-3 left-4 text-[10px] uppercase tracking-widest text-lambo-secondary font-mono">
                ENGINE ARCHITECTURE / {carData.tagline || (carData.name === 'REVUELTO' ? '6.5L V12 NATURALLY ASPIRATED + 3 ELECTRIC MOTORS' : '4.0L V8 TWIN-TURBO + 3 ELECTRIC MOTORS')}
              </div>
            </div>
          </div>

          {/* Cột phải: Headline, Story và Action từ API */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            {/* Tag */}
            <div className="text-[11px] sm:text-xs font-semibold tracking-[0.24em] text-lambo-primary uppercase mb-3">
              01 / POWERTRAIN
            </div>

            {/* Headline */}
            <h3
              className="text-3xl sm:text-4xl md:text-5xl font-black uppercase text-white tracking-tight leading-tight mb-5 font-barlow"
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
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-lambo-primary hover:text-lambo-primary-light transition-colors cursor-pointer group font-barlow"
              >
                <span>EXPLORE POWERTRAIN</span>
                <ArrowUpRight className="w-4 h-4 text-lambo-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </div>

            {/* Interactive Architecture Breakdown Drawer */}
            {showArchitectureDetails && (
              <div className="mt-6 p-4 border border-lambo-primary bg-lambo-dark animate-fadeIn text-xs text-[#b8b8b8] space-y-3">
                <div className="flex items-center gap-2 text-lambo-primary font-semibold tracking-wider uppercase text-[11px]">
                  <Flame className="w-3.5 h-3.5" />
                  <span>Verified Hybrid Telemetry</span>
                </div>
                <div className="grid grid-cols-2 gap-2 pt-1 border-t border-[#222]">
                  <div>
                    <span className="text-[#777] block text-[10px] uppercase">Power:</span>
                    <span className="text-white font-mono">{carData.stats.combinedPower.value} {carData.stats.combinedPower.unit}</span>
                  </div>
                  <div>
                    <span className="text-[#777] block text-[10px] uppercase">Engine Speed:</span>
                    <span className="text-white font-mono">{carData.stats.engineSpeed.value} {carData.stats.engineSpeed.unit}</span>
                  </div>
                  <div>
                    <span className="text-[#777] block text-[10px] uppercase">0-100 km/h:</span>
                    <span className="text-white font-mono">{carData.stats.acceleration.value} {carData.stats.acceleration.unit}</span>
                  </div>
                  <div>
                    <span className="text-[#777] block text-[10px] uppercase">Top Speed:</span>
                    <span className="text-white font-mono">{carData.stats.topSpeed.value} {carData.stats.topSpeed.unit}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Phần 2: 2 Technology Cards lấy động từ API (ví dụ LDVI + SPACEFRAME cho :id = 2) */}
        {techCards.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
            {techCards.map((card, idx) => (
              <div
                key={card.title || idx}
                className="group relative border border-[#2b2518] bg-[#0e0e0e] overflow-hidden hover:border-[#3d331f] transition-all duration-500 animate-fadeIn"
              >
                <div className="p-6 sm:p-8">
                  {/* Tag */}
                  <div className="text-[10px] font-semibold tracking-[0.24em] text-lambo-primary uppercase mb-4">
                    {card.tag || (idx === 0 ? '02 / TECHNOLOGY' : '03 / STRUCTURE')}
                  </div>

                  {/* Title từ API (ví dụ: LDVI 2.0 / SPACEFRAME / MONOFUSELAGE / CHASSIS) */}
                  <h4
                    className="text-2xl sm:text-3xl font-black uppercase text-white tracking-tight leading-tight mb-4 font-barlow"
                  >
                    {card.title}
                  </h4>

                  {/* Description từ API */}
                  <p className="text-sm text-[#a3a3a3] font-normal leading-relaxed">
                    {card.description}
                  </p>

                  {/* Hover Accent Line */}
                  <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#D8A016] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default PowertrainSection;
