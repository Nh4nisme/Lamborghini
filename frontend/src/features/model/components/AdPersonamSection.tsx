import React, { useState, useEffect, useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { type CarModelData, getModelFolder } from '../data';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface AdPersonamSectionProps {
  carData: CarModelData;
  onOpenConfigurator: () => void;
}

export const AdPersonamSection: React.FC<AdPersonamSectionProps> = ({ carData, onOpenConfigurator }) => {
  const modelFolder = getModelFolder(carData.name);
  const [activeStitchColor, setActiveStitchColor] = useState<'giallo' | 'rosso' | 'bianco' | 'verde'>('giallo');
  
  const sectionRef = useRef<HTMLElement>(null);
  const sectionNumberRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const tagRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const pickerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  const stitchColors = {
    giallo: { name: 'Giallo Taurus', hex: '#d4af37' },
    rosso: { name: 'Rosso Alala', hex: '#dc2626' },
    bianco: { name: 'Bianco Leda', hex: '#f4f4f5' },
    verde: { name: 'Verde Faunus', hex: '#22c55e' },
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section number fade in from top
      gsap.from(sectionNumberRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
        opacity: 0,
        y: -20,
        duration: 0.8,
        ease: 'power2.out',
      });

      // Craftsman image scale + fade
      gsap.from(imageRef.current, {
        scrollTrigger: {
          trigger: imageRef.current,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
        opacity: 0,
        scale: 0.95,
        duration: 1.2,
        ease: 'power3.out',
      });

      // Right column stagger
      const rightElements = [
        tagRef.current,
        headlineRef.current,
        descriptionRef.current,
        pickerRef.current,
        buttonRef.current,
      ];

      gsap.from(rightElements, {
        scrollTrigger: {
          trigger: tagRef.current,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
        opacity: 0,
        x: 30,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power2.out',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="ad-personam" className="relative w-full bg-[#070707] py-20 border-b border-[#1c1810]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        {/* Section Number - Top Right */}
        <div ref={sectionNumberRef} className="flex justify-end mb-8">
          <span className="text-[11px] font-mono tracking-[0.3em] text-[#8e826b] uppercase">
            09
          </span>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Artisan Craftsman Photo */}
          <div ref={imageRef} className="lg:col-span-6">
            <div className="relative border border-[#2b2518] overflow-hidden bg-[#0c0c0c] group">
              <img
                src={`/Images/model-detail/${modelFolder}/craftman.svg`}
                alt="Lamborghini Ad Personam Italian Artisan Leather Craftsmanship"
                className="w-full h-auto object-cover filter brightness-95 group-hover:scale-102 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-3 left-4 text-[10px] uppercase tracking-widest text-[#948972] font-mono">
                SANT&apos;AGATA BOLOGNESE / ATELIER AD PERSONAM
              </div>
            </div>
          </div>

          {/* Right Column: Heading, Story, and Action */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            {/* Tag */}
            <div ref={tagRef} className="text-[11px] sm:text-xs font-semibold tracking-[0.24em] text-[#d4af37] uppercase mb-4">
              09 / AD PERSONAM
            </div>

            {/* Headline */}
            <h2
              ref={headlineRef}
              className="text-3xl sm:text-5xl md:text-6xl font-black uppercase text-white tracking-tight leading-[0.95] mb-6"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              MAKE IT<br />UNMISTAKABLY YOURS.
            </h2>

            {/* Description */}
            <p ref={descriptionRef} className="text-sm sm:text-base text-[#a3a3a3] font-normal leading-relaxed mb-8">
              Explore the relationship between color, material and personal expression. Your showroom
              can guide a conversation about the finishes and details of your next configuration.
            </p>

            {/* Material & Stitch Color Preview Picker */}
            <div ref={pickerRef} className="p-4 border border-[#2e2617] bg-[#0d0d0d] mb-8">
              <div className="flex items-center justify-between mb-3 text-xs uppercase tracking-wider text-[#999]">
                <span className="font-semibold text-[#d4af37]">Atelier Stitch Color:</span>
                <span className="font-mono text-white text-[11px]">
                  {stitchColors[activeStitchColor].name}
                </span>
              </div>

              {/* Stitch color dots */}
              <div className="flex items-center gap-3">
                {(Object.keys(stitchColors) as (keyof typeof stitchColors)[]).map((key) => (
                  <button
                    key={key}
                    onClick={() => setActiveStitchColor(key)}
                    className={`w-7 h-7 rounded-full border-2 transition-all cursor-pointer flex items-center justify-center ${
                      activeStitchColor === key
                        ? 'border-white scale-110 ring-2 ring-[#d4af37]'
                        : 'border-[#444] opacity-80 hover:opacity-100'
                    }`}
                    style={{ backgroundColor: stitchColors[key].hex }}
                    aria-label={`Select stitch color ${stitchColors[key].name}`}
                  />
                ))}
              </div>
            </div>

            {/* Explore Personalization Action Button */}
            <div ref={buttonRef}>
              <button
                onClick={onOpenConfigurator}
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[#d4af37] hover:text-[#f3cd60] transition-colors cursor-pointer group"
                style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
              >
                <span>EXPLORE PERSONALIZATION</span>
                <ArrowUpRight className="w-4 h-4 text-[#d4af37] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdPersonamSection;
