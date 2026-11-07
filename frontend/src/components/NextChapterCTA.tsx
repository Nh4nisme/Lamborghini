import React from 'react';
import { ArrowUpRight } from 'lucide-react';

interface NextChapterCTAProps {
  onOpenConfigurator: () => void;
  onOpenEnquiry: () => void;
}

export const NextChapterCTA: React.FC<NextChapterCTAProps> = ({
  onOpenConfigurator,
  onOpenEnquiry,
}) => {
  return (
    <section className="relative w-full bg-[#141414] py-20 border-b border-[#242424]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="max-w-3xl">
          {/* Eyebrow */}
          <div className="text-[10px] sm:text-[11px] font-semibold tracking-[0.24em] text-[#8e826b] uppercase mb-3">
            BEYOND THE EXPECTED
          </div>

          {/* Headline */}
          <h2
            className="text-4xl sm:text-6xl font-black uppercase text-white tracking-tight leading-tight mb-4"
            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
          >
            YOUR NEXT CHAPTER.
          </h2>

          {/* Subtitle */}
          <p className="text-sm sm:text-base text-[#9a9a9a] font-normal leading-relaxed mb-8">
            Explore your configuration, or start a conversation with a showroom.
          </p>

          {/* Two Action Buttons */}
          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={onOpenConfigurator}
              className="flex items-center gap-2 px-7 py-3 text-xs sm:text-sm font-bold uppercase tracking-[0.18em] text-black bg-[#d4af37] hover:bg-[#ecc74a] transition-all cursor-pointer shadow-lg shadow-[#d4af37]/10"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              START CONFIGURATION
              <ArrowUpRight className="w-4 h-4" />
            </button>

            <button
              onClick={onOpenEnquiry}
              className="flex items-center gap-2 px-7 py-3 text-xs sm:text-sm font-bold uppercase tracking-[0.18em] text-white border border-[#3b3425] hover:border-[#d4af37] bg-black/60 hover:bg-[#d4af37]/10 transition-all cursor-pointer"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              FIND A SHOWROOM
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NextChapterCTA;
