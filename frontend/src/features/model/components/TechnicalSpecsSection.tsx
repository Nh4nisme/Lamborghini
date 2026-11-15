import React, { useState, useRef, useEffect } from 'react';
import type { CarModelData, ModelSpec } from '../data';
import { ArrowUpRight } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface TechnicalSpecsSectionProps {
  carData: CarModelData;
  onOpenEnquiry: () => void;
}

export const TechnicalSpecsSection: React.FC<TechnicalSpecsSectionProps> = ({ carData, onOpenEnquiry }) => {
  const [useVerifiedValues] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const tableRef = useRef<HTMLTableElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  const verifiedMap: Record<string, { value: string; unit: string; context: string }> = {
    Powertrain: {
      value: 'V8 Twin-Turbo HPEV Hybrid',
      unit: 'Mid-Rear Transverse',
      context: 'Combustion V8 + 3 Axial Flux E-Motors',
    },
    'Combined power': {
      value: '920 (677)',
      unit: 'CV (kW)',
      context: 'Maximum combined system output',
    },
    Acceleration: {
      value: '2.7',
      unit: 's',
      context: '0-100 km/h (0-62 mph) with Launch Control',
    },
    'Top speed': {
      value: '> 343',
      unit: 'km/h',
      context: '213 mph top speed manufacturer reference',
    },
    Displacement: {
      value: '3,995',
      unit: 'cm³',
      context: '4.0-liter hot-V twin-turbo dry sump V8',
    },
    'Engine speed': {
      value: '10,000',
      unit: 'rpm',
      context: 'Flat-plane crankshaft record redline',
    },
  };

  const allSpecs: ModelSpec[] = carData.specifications;
  const displayedSpecs = allSpecs;

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate header
      if (headerRef.current) {
        gsap.from(headerRef.current.children, {
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 80%',
            end: 'bottom 60%',
            toggleActions: 'play none none reverse',
          },
          opacity: 0,
          y: 30,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
        });
      }

      // Animate table rows with stagger
      if (tableRef.current) {
        const rows = tableRef.current.querySelectorAll('tbody tr');
        gsap.from(rows, {
          scrollTrigger: {
            trigger: tableRef.current,
            start: 'top 75%',
            end: 'bottom 60%',
            toggleActions: 'play none none reverse',
          },
          opacity: 0,
          x: -30,
          duration: 0.6,
          stagger: 0.08,
          ease: 'power2.out',
        });
      }

      // Animate footer
      if (footerRef.current) {
        gsap.from(footerRef.current, {
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
          opacity: 0,
          y: 20,
          duration: 0.7,
          ease: 'power2.out',
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [displayedSpecs, useVerifiedValues]);

  return (
    <section ref={sectionRef} id="specs" className="relative w-full bg-lambo-bold-black py-20 border-b border-[#1c1810]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        {/* Section Number - Top Right */}
        <div className="flex justify-end mb-8">
          <span className="text-[11px] font-mono tracking-[0.3em] text-[#8e826b] uppercase">
            10
          </span>
        </div>
        
        {/* Main Box with Gold Border matching screenshot */}
        <div className="border border-[#383020] bg-[#0c0c0c] p-6 sm:p-10">
          {/* Header Row: Title & Enquire Button */}
          <div ref={headerRef} className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#242017]">
            <div>
              <h3
                className="text-2xl sm:text-4xl font-black uppercase text-white tracking-wide mb-1 font-barlow"
              >
                TECHNICAL SPECIFICATIONS
              </h3>
              <p className="text-xs text-[#737373]">
                Reusable data role / replace every cell with verified model information.
              </p>
            </div>

            {/* Enquire Button */}
            <div className="flex items-center gap-3">
              {/* <button
                onClick={() => setUseVerifiedValues(!useVerifiedValues)}
                className="flex items-center gap-1.5 px-3 py-2 text-xs text-lambo-primary border border-lambo-primary/30 hover:border-lambo-primary bg-lambo-primary/5 transition-colors cursor-pointer"
                title="Toggle between template placeholders and real supercar specifications"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{useVerifiedValues ? 'Showing Verified' : 'Fill Real Data'}</span>
              </button> */}

              <button
                onClick={onOpenEnquiry}
                className="flex items-center gap-2 px-5 py-2.5 text-xs font-bold uppercase tracking-[0.16em] text-white border border-[#4d3f23] hover:border-lambo-primary bg-black/60 hover:bg-lambo-primary/10 transition-colors cursor-pointer font-barlow"
              >
                <span>ENQUIRE ABOUT THIS MODEL</span>
                <ArrowUpRight className="w-4 h-4 text-lambo-primary" />
              </button>
            </div>
          </div>

          {/* Table Container */}
          <div className="overflow-x-auto mt-6">
            <table ref={tableRef} className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-[#292215] text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.2em] text-[#8e826b]">
                  <th className="py-3 px-4 font-semibold">PARAMETER</th>
                  <th className="py-3 px-4 font-semibold">VALUE</th>
                  <th className="py-3 px-4 font-semibold">UNIT</th>
                  <th className="py-3 px-4 font-semibold">CONTEXT</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1c1810]">
                {displayedSpecs.map((spec, idx) => {
                  const verified = verifiedMap[spec.parameter];
                  const val = useVerifiedValues && verified ? verified.value : spec.value;
                  const unit = useVerifiedValues && verified ? verified.unit : spec.unit;
                  const ctx = useVerifiedValues && verified ? verified.context : spec.context;

                  return (
                    <tr
                      key={idx}
                      className="hover:bg-[#14120e] transition-colors font-sans text-xs sm:text-[13px]"
                    >
                      <td className="py-3.5 px-4 font-medium text-white">{spec.parameter}</td>
                      <td className="py-3.5 px-4 text-lambo-primary font-mono font-medium">{val}</td>
                      <td className="py-3.5 px-4 text-[#999999]">{unit}</td>
                      <td className="py-3.5 px-4 text-[#737373]">{ctx}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Footnote matching screenshot */}
          <div ref={footerRef} className="mt-8 pt-4 border-t border-[#242017]">
            <p className="text-[11px] text-[#666666] leading-relaxed">
              Manufacturer figures shown for reference. Confirm local specifications. No price, battery, torque or electric range claims are made.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechnicalSpecsSection;
