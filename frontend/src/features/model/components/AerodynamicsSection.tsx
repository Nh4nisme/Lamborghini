import React, { useRef, useEffect } from 'react';
import type { CarModelData } from '../data';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface AerodynamicsSectionProps {
  carData: CarModelData;
}

export const AerodynamicsSection: React.FC<AerodynamicsSectionProps> = ({ carData }) => {
  const aeroData = carData.aerodynamics;
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const storyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Animate headline
      if (headlineRef.current) {
        gsap.from(headlineRef.current, {
          y: 50,
          opacity: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headlineRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        });
      }

      // Animate image with scale
      if (imageRef.current) {
        gsap.from(imageRef.current, {
          scale: 0.95,
          opacity: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: imageRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        });
      }

      // Animate story text
      if (storyRef.current) {
        gsap.from(storyRef.current, {
          y: 30,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: storyRef.current,
            start: 'top 90%',
            toggleActions: 'play none none reverse',
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [carData.name]);

  return (
    <section ref={sectionRef} id="aerodynamics" className="relative w-full bg-lambo-bold-black py-12 border-b border-[#1c1810]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        {/* Section Number - Top Right */}
        <div className="flex justify-end mb-8">
          <span className="text-[11px] font-mono tracking-[0.3em] text-[#8e826b] uppercase">
            03
          </span>
        </div>
        
        {/* Tag */}
        <div className="text-[11px] sm:text-xs font-semibold tracking-[0.24em] text-lambo-primary uppercase mb-3">
          {aeroData.tag}
        </div>

        {/* Headline */}
        <h2
          ref={headlineRef}
          className="text-3xl sm:text-5xl md:text-6xl font-black uppercase text-white tracking-tight leading-tight mb-8 font-barlow"
        >
          {aeroData.headline}
        </h2>

        {/* Panoramic Landscape Exterior Side Profile Image */}
        <div ref={imageRef} className="relative border border-[#262016] overflow-hidden bg-[#0a0a0a] group">
          <img
            src={carData.aerodynamics.image}
            alt="Lamborghini Aerodynamic Exploration"
            className="w-full h-auto object-cover filter brightness-95"
            loading="lazy"
          />
        </div>

        {/* Caption below image */}
        <div className="mt-4 mb-6">
          <p className="text-[11px] text-[#737373] tracking-wide">
            Original concept study / exterior – static aerodynamic exploration
          </p>
        </div>

        {/* Exterior Story */}
        <div ref={storyRef} className="mt-8">
          <p className="text-sm sm:text-base text-[#a3a3a3] max-w-4xl font-normal leading-relaxed">
            {aeroData.story}
          </p>
        </div>
      </div>
    </section>
  );
};

export default AerodynamicsSection;
