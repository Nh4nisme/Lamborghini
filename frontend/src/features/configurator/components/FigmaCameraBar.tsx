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
    <div className="absolute bottom-7 left-0 right-0 flex items-center justify-between px-6 md:px-12 z-20 pointer-events-none select-none">
      {/* Prev Arrow */}
      <button
        type="button"
        onClick={handlePrev}
        aria-label="Previous view angle"
        className={`w-10 h-10 flex items-center justify-center border transition-colors cursor-pointer pointer-events-auto ${
          isLight
            ? 'bg-white/95 hover:bg-white text-neutral-700 hover:text-black border-neutral-300'
            : 'bg-[#101110] hover:bg-[#191b19] text-[#9ea39b] hover:text-[#f5f5f1] border-[#343831]'
        }`}
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      {/* Center Camera Angle Tabs */}
      <div
        className={`flex items-center gap-2 px-2 pointer-events-auto backdrop-blur-sm ${
          isLight ? 'bg-white/85' : 'bg-[#101110]/80'
        }`}
      >
        {ANGLES.map((angle) => {
          const isActive = activeAngle === angle;
          return (
            <button
              key={angle}
              type="button"
              onClick={() => onSelectAngle(angle)}
              className={`px-4 py-3 text-xs font-semibold uppercase tracking-[0.96px] leading-4 transition-colors cursor-pointer ${
                isActive
                  ? isLight
                    ? 'text-[#171817] border-b-2 border-[#eac500]'
                    : 'text-[#f5f5f1] border-b-2 border-[#eac500]'
                  : isLight
                  ? 'text-neutral-500 hover:text-neutral-800 border-b border-neutral-300'
                  : 'text-[#9ea39b] hover:text-[#f5f5f1] border-b border-[#343831]'
              }`}
            >
              {angle}
            </button>
          );
        })}
      </div>

      {/* Next Arrow */}
      <button
        type="button"
        onClick={handleNext}
        aria-label="Next view angle"
        className={`w-10 h-10 flex items-center justify-center border transition-colors cursor-pointer pointer-events-auto ${
          isLight
            ? 'bg-white/95 hover:bg-white text-neutral-700 hover:text-black border-neutral-300'
            : 'bg-[#101110] hover:bg-[#191b19] text-[#9ea39b] hover:text-[#f5f5f1] border-[#343831]'
        }`}
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
};
