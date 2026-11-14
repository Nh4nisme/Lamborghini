import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export type FigmaCameraAngle = 'FRONT' | 'SIDE' | 'REAR' | 'DETAIL';

interface FigmaCameraBarProps {
  activeAngle: FigmaCameraAngle;
  onSelectAngle: (angle: FigmaCameraAngle) => void;
  theme: 'light' | 'dark';
}

const ANGLES: FigmaCameraAngle[] = ['FRONT', 'SIDE', 'REAR', 'DETAIL'];

export const FigmaCameraBar: React.FC<FigmaCameraBarProps> = ({
  activeAngle,
  onSelectAngle,
  theme,
}) => {
  const isLight = theme === 'light';

  const handlePrev = () => {
    const currentIndex = ANGLES.indexOf(activeAngle);
    const prevIndex = (currentIndex - 1 + ANGLES.length) % ANGLES.length;
    onSelectAngle(ANGLES[prevIndex]);
  };

  const handleNext = () => {
    const currentIndex = ANGLES.indexOf(activeAngle);
    const nextIndex = (currentIndex + 1) % ANGLES.length;
    onSelectAngle(ANGLES[nextIndex]);
  };

  return (
    <div className="absolute bottom-6 left-0 right-0 flex items-center justify-between px-6 md:px-10 z-20 pointer-events-none select-none">
      {/* Prev Arrow */}
      <button
        onClick={handlePrev}
        aria-label="Previous view angle"
        className={`w-9 h-9 flex items-center justify-center border transition-all cursor-pointer pointer-events-auto ${
          isLight
            ? 'bg-white/90 hover:bg-white text-neutral-700 hover:text-black border-neutral-300 shadow-sm'
            : 'bg-[#121316]/80 hover:bg-[#1a1b20] text-neutral-300 hover:text-white border-white/10'
        }`}
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      {/* Center Camera Angle Tabs */}
      <div
        className={`flex items-center gap-6 sm:gap-8 px-6 py-2 pointer-events-auto border-b ${
          isLight ? 'border-neutral-300' : 'border-neutral-800'
        }`}
      >
        {ANGLES.map((angle) => {
          const isActive = activeAngle === angle;
          return (
            <button
              key={angle}
              onClick={() => onSelectAngle(angle)}
              className={`pb-1 text-xs font-bold uppercase tracking-[0.2em] transition-all cursor-pointer relative ${
                isActive
                  ? isLight
                    ? 'text-black'
                    : 'text-white'
                  : isLight
                  ? 'text-neutral-400 hover:text-neutral-700'
                  : 'text-neutral-500 hover:text-neutral-300'
              }`}
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              {angle}
              {isActive && (
                <span className="absolute bottom-[-1px] left-0 right-0 h-[2.5px] bg-amber-400" />
              )}
            </button>
          );
        })}
      </div>

      {/* Next Arrow */}
      <button
        onClick={handleNext}
        aria-label="Next view angle"
        className={`w-9 h-9 flex items-center justify-center border transition-all cursor-pointer pointer-events-auto ${
          isLight
            ? 'bg-white/90 hover:bg-white text-neutral-700 hover:text-black border-neutral-300 shadow-sm'
            : 'bg-[#121316]/80 hover:bg-[#1a1b20] text-neutral-300 hover:text-white border-white/10'
        }`}
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
};
