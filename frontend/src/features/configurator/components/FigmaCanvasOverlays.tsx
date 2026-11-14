import React from 'react';
import type { PaintColor } from '../types';

interface FigmaCanvasOverlaysProps {
  theme: 'light' | 'dark';
  exteriorColor: PaintColor;
  viewModeLabel?: string;
  stepName?: string;
}

export const FigmaCanvasOverlays: React.FC<FigmaCanvasOverlaysProps> = ({
  theme,
  exteriorColor,
  viewModeLabel = 'EXTERIOR VIEW',
}) => {
  const isLight = theme === 'light';

  return (
    <div className="absolute inset-0 pointer-events-none p-6 md:p-8 flex flex-col justify-between select-none z-10">
      {/* Top Bar Overlays */}
      <div className="flex items-start justify-between w-full">
        {/* Top-Left: Car Model Branding */}
        <div className="flex flex-col">
          <span
            className={`text-[10px] md:text-[11px] font-bold uppercase tracking-[0.24em] mb-1 ${
              isLight ? 'text-neutral-500' : 'text-neutral-400'
            }`}
            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
          >
            LAMBORGHINI / V12 HPEV
          </span>
          <h1
            className={`text-3xl md:text-5xl font-black uppercase tracking-[0.06em] leading-none mb-1.5 ${
              isLight ? 'text-[#111111]' : 'text-[#ffffff]'
            }`}
            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
          >
            REVUELTO
          </h1>
          <p
            className={`text-xs md:text-sm font-normal tracking-wide ${
              isLight ? 'text-neutral-500' : 'text-neutral-400'
            }`}
          >
            Your vision. Every detail.
          </p>
        </div>

        {/* Top-Right: View Type & Selected Color Highlight */}
        <div className="flex flex-col items-end text-right">
          <span
            className={`text-[10px] md:text-[11px] font-semibold uppercase tracking-[0.22em] mb-3 ${
              isLight ? 'text-neutral-500' : 'text-neutral-400'
            }`}
            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
          >
            {viewModeLabel}
          </span>
          <div className="w-9 h-[3px] bg-amber-400 mb-1.5" />
          <span
            className={`text-sm md:text-base font-extrabold uppercase tracking-[0.14em] ${
              isLight ? 'text-[#111111]' : 'text-[#ffffff]'
            }`}
            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
          >
            {exteriorColor.name}
          </span>
          <span
            className={`text-[11px] font-medium tracking-wide ${
              isLight ? 'text-neutral-500' : 'text-neutral-400'
            }`}
          >
            {exteriorColor.finish === 'matt' ? 'Matt finish' : 'Gloss / metallic'}
          </span>
        </div>
      </div>
    </div>
  );
};
