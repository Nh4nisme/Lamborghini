import React, { useEffect, useRef } from 'react';
import { ArrowUpRight, Compass } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { CarModelData } from '../data';

gsap.registerPlugin(ScrollTrigger);

interface JourneySectionProps {
  carData: CarModelData;
  onOpenEnquiry: () => void;
  onOpenConfigurator: () => void;
}

export const JourneySection: React.FC<JourneySectionProps> = ({
  onOpenEnquiry,
  onOpenConfigurator,
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const numberRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Animate section number
      gsap.from(numberRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          end: 'top 50%',
          toggleActions: 'play none none reverse',
        },
        opacity: 0,
        x: 20,
        duration: 0.6,
        ease: 'power2.out',
      });

      // Animate title
      gsap.from(titleRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          end: 'top 45%',
          toggleActions: 'play none none reverse',
        },
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: 'power3.out',
      });

      // Animate cards with stagger
      const cards = cardsRef.current?.querySelectorAll('.journey-card');
      if (cards) {
        gsap.from(cards, {
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 70%',
            end: 'top 40%',
            toggleActions: 'play none none reverse',
          },
          opacity: 0,
          y: 50,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power3.out',
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="journey" className="relative w-full bg-lambo-bold-black py-20 border-b border-[#1c1810]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        {/* Section Number - Top Right */}
        <div ref={numberRef} className="flex justify-end mb-8">
          <span className="text-[11px] font-mono tracking-[0.3em] text-[#8e826b] uppercase">
            11
          </span>
        </div>
        
        {/* Section Title */}
        <h2
          ref={titleRef}
          className="text-3xl sm:text-5xl font-black uppercase text-white tracking-tight mb-10 font-barlow"
        >
          THE JOURNEY CONTINUES.
        </h2>

        {/* Two Cards Grid matching screenshot */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 1: REVUELTO & URUS */}
          <div className="journey-card border border-[#383020] bg-[#0c0c0c] p-6 sm:p-10 flex flex-col justify-between hover:border-lambo-primary transition-all duration-300 group">
            <div>
              {/* Compass / Steering Icon in small gold circle */}
              <div className="w-9 h-9 rounded-full border border-lambo-primary/60 flex items-center justify-center text-lambo-primary mb-6 group-hover:scale-110 transition-transform">
                <Compass className="w-4 h-4" />
              </div>

              <h3
                className="text-2xl sm:text-3xl font-black uppercase text-white tracking-wide mb-3 font-barlow"
              >
                REVUELTO &amp; URUS
              </h3>

              <p className="text-sm text-[#8a8a8a] leading-relaxed mb-8">
                Discover other expressions of performance and design.
              </p>
            </div>

            <div>
              <button
                onClick={onOpenConfigurator}
                className="inline-flex items-center gap-2 px-6 py-3 text-xs font-bold uppercase tracking-[0.18em] text-white border border-[#4d3f23] hover:border-lambo-primary bg-black/80 hover:bg-lambo-primary/10 transition-all cursor-pointer font-barlow"
              >
                <span>EXPLORE MODELS</span>
                <ArrowUpRight className="w-4 h-4 text-lambo-primary" />
              </button>
            </div>
          </div>

          {/* Card 2: PRE-OWNED */}
          <div className="journey-card border border-[#383020] bg-[#0c0c0c] p-6 sm:p-10 flex flex-col justify-between hover:border-lambo-primary transition-all duration-300 group">
            <div>
              {/* Compass / Shield Icon */}
              <div className="w-9 h-9 rounded-full border border-lambo-primary/60 flex items-center justify-center text-lambo-primary mb-6 group-hover:scale-110 transition-transform">
                <Compass className="w-4 h-4" />
              </div>

              <h3
                className="text-2xl sm:text-3xl font-black uppercase text-white tracking-wide mb-3 font-barlow"
              >
                PRE-OWNED
              </h3>

              <p className="text-sm text-[#8a8a8a] leading-relaxed mb-8">
                Begin a conversation about pre-owned vehicles and local availability.
              </p>
            </div>

            <div>
              <button
                onClick={onOpenEnquiry}
                className="inline-flex items-center gap-2 px-6 py-3 text-xs font-bold uppercase tracking-[0.18em] text-white border border-[#4d3f23] hover:border-lambo-primary bg-black/80 hover:bg-lambo-primary/10 transition-all cursor-pointer font-barlow"
              >
                <span>EXPLORE PRE-OWNED</span>
                <ArrowUpRight className="w-4 h-4 text-lambo-primary" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JourneySection;
