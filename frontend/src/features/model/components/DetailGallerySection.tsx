import React, { useState } from 'react';
import { type CarModelData, getModelFolder } from '../data';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface DetailGallerySectionProps {
  carData: CarModelData;
}

export const DetailGallerySection: React.FC<DetailGallerySectionProps> = ({ carData }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const modelFolder = getModelFolder(carData.name);

  // Gallery items từ thư mục public/Images/model-detail/{modelFolder}
  const items = [
    {
      id: 'exterior',
      title: 'EXTERIOR',
      subtitle: `${carData.name} Aerodynamic Design`,
      image: `/Images/model-detail/${modelFolder}/exterior.webp`,
      badge: '01 / 03'
    },
    {
      id: 'interior',
      title: 'INTERIOR',
      subtitle: 'Driver Focused Cockpit',
      image: `/Images/model-detail/${modelFolder}/interior.webp`,
      badge: '02 / 03'
    },
    {
      id: 'powertrain',
      title: 'POWERTRAIN',
      subtitle: 'Powertrain & Dynamics',
      image: `/Images/model-detail/${modelFolder}/powertrain.mp4`,
      badge: '03 / 03'
    }
  ];

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % items.length);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  const currentItem = items[activeIndex];

  return (
    <section id="gallery" className="relative w-full bg-lambo-bold-black py-12 border-b border-[#1c1810]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        {/* Section Number - Top Right */}
        <div className="flex justify-end mb-8">
          <span className="text-[11px] font-mono tracking-[0.3em] text-[#8e826b] uppercase">
            06
          </span>
        </div>

        {/* Tag */}
        <div className="text-[11px] sm:text-xs font-semibold tracking-[0.24em] text-lambo-primary uppercase mb-4">
          06 / IN DETAIL
        </div>

        {/* Gallery Container Box with subtle gold border */}
        <div className="border border-[#383020] bg-[#0c0c0c] p-4 sm:p-8">
          {/* Top Bar inside Box: Title & Counter */}
          <div className="flex items-center justify-between pb-6 mb-6 border-b border-[#242017]">
            <h3
              className="text-2xl sm:text-4xl font-black uppercase text-white tracking-wide font-barlow"
            >
              {carData.name} / IN DETAIL
            </h3>
            <span className="font-mono text-xs sm:text-sm tracking-widest text-lambo-primary">
              0{activeIndex + 1} / 0{items.length}
            </span>
          </div>

          {/* Main Featured Display with Left / Right Arrows */}
          <div className="relative aspect-[16/9] sm:aspect-[21/9] overflow-hidden bg-black mb-6 group">
            {currentItem.image.endsWith('.mp4') ? (
              <video
                key={currentItem.image}
                src={currentItem.image}
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover filter brightness-95"
              />
            ) : (
              <img
                src={currentItem.image}
                alt={currentItem.title}
                className="w-full h-full object-cover filter brightness-95 transition-all duration-500"
                loading="lazy"
              />
            )}

            {/* Left arrow */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/60 hover:bg-lambo-primary text-white hover:text-black flex items-center justify-center transition-colors cursor-pointer border border-[#3d3320] z-20"
              aria-label="Previous gallery image"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Right arrow */}
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/60 hover:bg-lambo-primary text-white hover:text-black flex items-center justify-center transition-colors cursor-pointer border border-[#3d3320] z-20"
              aria-label="Next gallery image"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Active item label badge */}
            <div className="absolute bottom-3 left-4 text-xs font-bold uppercase tracking-widest text-lambo-primary bg-black/70 px-3 py-1 border border-[#3d3320] z-20">
              {currentItem.title} — {currentItem.subtitle}
            </div>
          </div>

          {/* Row of Thumbnail Selector Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 mb-6">
            {items.map((item, idx) => (
              <button
                key={item.id}
                onClick={() => setActiveIndex(idx)}
                className={`relative aspect-[16/9] overflow-hidden border transition-all cursor-pointer group text-left ${activeIndex === idx
                    ? 'border-lambo-primary ring-1 ring-lambo-primary'
                    : 'border-[#2e2619] opacity-70 hover:opacity-100 hover:border-[#8e7a46]'
                  }`}
              >
                {item.image.endsWith('.mp4') ? (
                  <video
                    src={item.image}
                    muted
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 pointer-events-none"
                  />
                ) : (
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none" />
                <div className="absolute bottom-1.5 left-2 right-2 flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-white pointer-events-none">
                  <span>{item.title}</span>
                  <span className="text-lambo-primary font-mono text-[9px]">{item.badge}</span>
                </div>
              </button>
            ))}
          </div>

          {/* Additional details caption */}
          <div className="pt-4 border-t border-[#242017]">
            <p className="text-[11px] text-[#737373] tracking-wide">
              Exterior concept / additional details: Exposed Engine, Rear, Side Air Intake, Headlight, Engine Bonnet, Rocker Cover, Carbon Rim, Front Splitter.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DetailGallerySection;
