import React, { useState, useEffect, useRef } from 'react';
import { type CarModelData, getModelFolder } from '../data';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { AnimatedSection } from '../../../components/AnimatedSection';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface DetailGallerySectionProps {
  carData: CarModelData;
}

export const DetailGallerySection: React.FC<DetailGallerySectionProps> = ({ carData }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const modelFolder = getModelFolder(carData.name);
  
  const sectionRef = useRef<HTMLElement>(null);
  const galleryBoxRef = useRef<HTMLDivElement>(null);
  const mainImageRef = useRef<HTMLDivElement>(null);
  const thumbnailsRef = useRef<HTMLDivElement>(null);
  const rearViewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const galleryBox = galleryBoxRef.current;
    const mainImage = mainImageRef.current;
    const thumbnails = thumbnailsRef.current;
    const rearView = rearViewRef.current;

    if (!section || !galleryBox || !mainImage || !thumbnails || !rearView) return;

    const ctx = gsap.context(() => {
      // Gallery box fade and slide up
      gsap.from(galleryBox, {
        scrollTrigger: {
          trigger: galleryBox,
          start: 'top 85%',
          end: 'top 50%',
          scrub: 1,
        },
        y: 80,
        opacity: 0,
        scale: 0.95,
      });

      // Main image parallax effect
      gsap.from(mainImage.querySelector('img, video'), {
        scrollTrigger: {
          trigger: mainImage,
          start: 'top 80%',
          end: 'bottom 20%',
          scrub: 1.5,
        },
        scale: 1.15,
        y: -30,
      });

      // Thumbnails stagger animation
      const thumbItems = thumbnails.querySelectorAll('button');
      gsap.from(thumbItems, {
        scrollTrigger: {
          trigger: thumbnails,
          start: 'top 85%',
          end: 'top 60%',
          scrub: 1,
        },
        y: 40,
        opacity: 0,
        stagger: 0.1,
      });

      // Rear view parallax zoom
      gsap.from(rearView.querySelector('img'), {
        scrollTrigger: {
          trigger: rearView,
          start: 'top 90%',
          end: 'bottom 30%',
          scrub: 2,
        },
        scale: 1.2,
        y: -50,
      });

      // Rear view container fade
      gsap.from(rearView, {
        scrollTrigger: {
          trigger: rearView,
          start: 'top 85%',
          end: 'top 55%',
          scrub: 1,
        },
        opacity: 0,
        y: 60,
      });
    }, section);

    return () => ctx.revert();
  }, []);

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
    <section ref={sectionRef} id="gallery" className="relative w-full bg-[#070707] py-20 border-b border-[#1c1810]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        {/* Section Number - Top Right */}
        <AnimatedSection animation="fadeUp">
          <div className="flex justify-end mb-8">
            <span className="text-[11px] font-mono tracking-[0.3em] text-[#8e826b] uppercase">
              06
            </span>
          </div>
        </AnimatedSection>

        {/* Tag */}
        <AnimatedSection animation="fadeUp" delay={0.1}>
          <div className="text-[11px] sm:text-xs font-semibold tracking-[0.24em] text-[#d4af37] uppercase mb-4">
            06 / IN DETAIL
          </div>
        </AnimatedSection>

        {/* Gallery Container Box with subtle gold border */}
        <div ref={galleryBoxRef} className="border border-[#383020] bg-[#0c0c0c] p-4 sm:p-8">
          {/* Top Bar inside Box: Title & Counter */}
          <div className="flex items-center justify-between pb-6 mb-6 border-b border-[#242017]">
            <h3
              className="text-2xl sm:text-4xl font-black uppercase text-white tracking-wide"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              {carData.name} / IN DETAIL
            </h3>
            <span className="font-mono text-xs sm:text-sm tracking-widest text-[#d4af37]">
              0{activeIndex + 1} / 0{items.length}
            </span>
          </div>

          {/* Main Featured Display with Left / Right Arrows */}
          <div ref={mainImageRef} className="relative aspect-[16/9] sm:aspect-[21/9] overflow-hidden bg-black mb-6 group">
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
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/60 hover:bg-[#d4af37] text-white hover:text-black flex items-center justify-center transition-colors cursor-pointer border border-[#3d3320] z-20"
              aria-label="Previous gallery image"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Right arrow */}
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/60 hover:bg-[#d4af37] text-white hover:text-black flex items-center justify-center transition-colors cursor-pointer border border-[#3d3320] z-20"
              aria-label="Next gallery image"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Active item label badge */}
            <div className="absolute bottom-3 left-4 text-xs font-bold uppercase tracking-widest text-[#d4af37] bg-black/70 px-3 py-1 border border-[#3d3320] z-20">
              {currentItem.title} — {currentItem.subtitle}
            </div>
          </div>

          {/* Row of Thumbnail Selector Cards */}
          <div ref={thumbnailsRef} className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 mb-6">
            {items.map((item, idx) => (
              <button
                key={item.id}
                onClick={() => setActiveIndex(idx)}
                className={`relative aspect-[16/9] overflow-hidden border transition-all cursor-pointer group text-left ${activeIndex === idx
                    ? 'border-[#d4af37] ring-1 ring-[#d4af37]'
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
                  <span className="text-[#d4af37] font-mono text-[9px]">{item.badge}</span>
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

        {/* Large Cinematic Rear View Presentation */}
        <div ref={rearViewRef} className="mt-12">
          <div className="relative border border-[#2b2518] overflow-hidden bg-black group">
            <img
              src={`/Images/model-detail/${modelFolder}/exterior.webp`}
              alt="Lamborghini Supercar Rear Proportions Original Concept Image"
              className="w-full h-auto object-cover filter brightness-95 group-hover:scale-101 transition-transform duration-700"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
          </div>
          <div className="mt-3">
            <p className="text-[11px] text-[#737373] tracking-wide">
              06 / 06 — rear proportions / original concept image
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DetailGallerySection;
