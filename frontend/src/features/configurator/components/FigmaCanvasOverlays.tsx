import React from 'react';
import type { PaintColor } from '../types';

interface FigmaCanvasOverlaysProps {
  theme: 'light' | 'dark';
  exteriorColor: PaintColor;
  modelTitle?: string;
  viewModeLabel?: string;
  stepName?: string;
}

export const FigmaCanvasOverlays: React.FC<FigmaCanvasOverlaysProps> = ({
  theme,
  exteriorColor,
  modelTitle = 'REVUELTO',
  viewModeLabel = 'EXTERIOR VIEW',
}) => {
  const isLight = theme === 'light';

  return (
    <div className="absolute inset-0 pointer-events-none px-6 pt-6 pb-20 md:px-12 md:pt-9 md:pb-24 flex flex-col justify-between select-none z-10">
      <div className="flex flex-col gap-4 w-full">
        {/* Studio Context Row */}
        <div
          className={`flex items-center justify-between text-xs font-semibold uppercase tracking-[0.96px] leading-4 ${
            isLight ? 'text-neutral-500' : 'text-[#9ea39b]'
          }`}
        >
          <span>LAMBORGHINI / V12 HPEV</span>
          <span>{viewModeLabel}</span>
        </div>

        {/* Model Identity + Selected Paint */}
        <div className="flex items-end justify-between w-full gap-4">
          <div className="flex flex-col gap-1">
            <h1
              className={`text-5xl md:text-[72px] lg:text-[80px] font-bold uppercase tracking-[-0.8px] leading-none font-barlow ${
                isLight ? 'text-[#171817]' : 'text-[#f5f5f1]'
              }`}
            >
              {modelTitle}
            </h1>
            <p
              className={`text-sm font-medium tracking-[0.14px] leading-5 ${
                isLight ? 'text-neutral-500' : 'text-[#9ea39b]'
              }`}
            >
              Your vision. Every detail.
            </p>
          </div>

          {/* Top-Right: Paint Identification */}
          <div className="flex flex-col items-end text-right gap-1 pb-1.5">
            <div className="w-8 h-[3px] bg-[#eac500]" />
            <span
              className={`text-sm font-medium uppercase tracking-[0.14px] leading-5 ${
                isLight ? 'text-[#171817]' : 'text-[#f5f5f1]'
              }`}
            >
              {exteriorColor.name}
            </span>
            <span
              className={`text-xs leading-4 ${
                isLight ? 'text-neutral-500' : 'text-[#9ea39b]'
              }`}
            >
              {exteriorColor.finish === 'matt' ? 'Matt finish' : 'Gloss / metallic'}
            </span>
          </div>
        </div>
      </div>

      {/* Subtle Stage Horizon Line above Camera Controls */}
      <div
        className={`w-full h-px ${
          isLight ? 'bg-neutral-300' : 'bg-[#343831]'
        }`}
      />
    </div>
  );
};
