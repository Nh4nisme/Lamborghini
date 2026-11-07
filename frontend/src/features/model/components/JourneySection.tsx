import React from 'react';
import { ArrowUpRight, Compass } from 'lucide-react';

interface JourneySectionProps {
  onOpenEnquiry: () => void;
  onOpenConfigurator: () => void;
}

export const JourneySection: React.FC<JourneySectionProps> = ({
  onOpenEnquiry,
  onOpenConfigurator,
}) => {
  return (
    <section id="journey" className="relative w-full bg-[#070707] py-20 border-b border-[#1c1810]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        {/* Section Title */}
        <h2
          className="text-3xl sm:text-5xl font-black uppercase text-white tracking-tight mb-10"
          style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
        >
          THE JOURNEY CONTINUES.
        </h2>

        {/* Two Cards Grid matching screenshot */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 1: REVUELTO & URUS */}
          <div className="border border-[#383020] bg-[#0c0c0c] p-6 sm:p-10 flex flex-col justify-between hover:border-[#d4af37] transition-all duration-300 group">
            <div>
              {/* Compass / Steering Icon in small gold circle */}
              <div className="w-9 h-9 rounded-full border border-[#d4af37]/60 flex items-center justify-center text-[#d4af37] mb-6 group-hover:scale-110 transition-transform">
                <Compass className="w-4 h-4" />
              </div>

              <h3
                className="text-2xl sm:text-3xl font-black uppercase text-white tracking-wide mb-3"
                style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
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
                className="inline-flex items-center gap-2 px-6 py-3 text-xs font-bold uppercase tracking-[0.18em] text-white border border-[#4d3f23] hover:border-[#d4af37] bg-black/80 hover:bg-[#d4af37]/10 transition-all cursor-pointer"
                style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
              >
                <span>EXPLORE MODELS</span>
                <ArrowUpRight className="w-4 h-4 text-[#d4af37]" />
              </button>
            </div>
          </div>

          {/* Card 2: PRE-OWNED */}
          <div className="border border-[#383020] bg-[#0c0c0c] p-6 sm:p-10 flex flex-col justify-between hover:border-[#d4af37] transition-all duration-300 group">
            <div>
              {/* Compass / Shield Icon */}
              <div className="w-9 h-9 rounded-full border border-[#d4af37]/60 flex items-center justify-center text-[#d4af37] mb-6 group-hover:scale-110 transition-transform">
                <Compass className="w-4 h-4" />
              </div>

              <h3
                className="text-2xl sm:text-3xl font-black uppercase text-white tracking-wide mb-3"
                style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
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
                className="inline-flex items-center gap-2 px-6 py-3 text-xs font-bold uppercase tracking-[0.18em] text-white border border-[#4d3f23] hover:border-[#d4af37] bg-black/80 hover:bg-[#d4af37]/10 transition-all cursor-pointer"
                style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
              >
                <span>EXPLORE PRE-OWNED</span>
                <ArrowUpRight className="w-4 h-4 text-[#d4af37]" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JourneySection;
