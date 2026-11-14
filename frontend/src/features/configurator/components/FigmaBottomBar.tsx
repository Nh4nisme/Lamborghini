import React from 'react';
import type { CarConfiguration } from '../types';
import { CARBON_LOWER_OPTIONS } from '../data/lamborghiniData';
import type { ConfigStep } from './FigmaHeader';
import { Download, ArrowRight, RotateCcw } from 'lucide-react';

interface FigmaBottomBarProps {
  config: CarConfiguration;
  currentStep: ConfigStep;
  onNextStep: () => void;
  onSave: () => void;
  onReset: () => void;
  theme: 'light' | 'dark';
}

export const FigmaBottomBar: React.FC<FigmaBottomBarProps> = ({
  config,
  currentStep,
  onNextStep,
  onSave,
  onReset,
  theme,
}) => {
  const isLight = theme === 'light';

  // Get next step CTA label
  const getCtaLabel = (): string => {
    switch (currentStep) {
      case '01 EXTERIOR':
        return 'CONTINUE TO INTERIOR';
      case '02 INTERIOR':
        return 'CONTINUE TO OPTIONS';
      case '03 OPTIONS':
        return 'CONTINUE TO SUMMARY';
      case '04 SUMMARY':
        return 'CONFIRM & REQUEST QUOTE';
      default:
        return 'CONTINUE';
    }
  };

  const trimName =
    CARBON_LOWER_OPTIONS.find((c) => c.id === config.carbonLower)?.name || 'Nero / gloss black';

  return (
    <footer
      className={`h-20 w-full border-t flex items-center justify-between px-6 md:px-8 select-none z-30 transition-colors duration-200 ${
        isLight
          ? 'bg-[#ffffff] border-[#e5e7eb] text-[#111111]'
          : 'bg-lambo-bold-black border-[#1e2126] text-[#ffffff]'
      }`}
    >
      {/* Zone 1: Model Title & Disclaimer */}
      <div className="flex flex-col min-w-0 pr-4">
        <span
          className={`text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em] font-barlow ${
            isLight ? 'text-neutral-500' : 'text-neutral-400'
          }`}
        >
          YOUR CONFIGURATION
        </span>
        <span
          className="text-base md:text-xl font-black uppercase tracking-[0.1em] leading-none my-0.5 font-barlow"
        >
          REVUELTO
        </span>
        <span
          className={`hidden sm:inline text-[10px] truncate max-w-[280px] lg:max-w-md ${
            isLight ? 'text-neutral-400' : 'text-neutral-500'
          }`}
        >
          Illustrative vehicle preview. Colors and equipment may vary by market.
        </span>
      </div>

      {/* Zone 2: Fast Specification Summary Pills */}
      <div className="hidden xl:flex items-center gap-8 text-xs font-semibold">
        <div className="flex flex-col">
          <span
            className="text-[10px] font-bold uppercase tracking-[0.18em] text-neutral-400 font-barlow"
          >
            PAINT
          </span>
          <span className="font-medium truncate max-w-[140px]">{config.exteriorColor.name}</span>
        </div>

        <div className="flex flex-col">
          <span
            className="text-[10px] font-bold uppercase tracking-[0.18em] text-neutral-400 font-barlow"
          >
            WHEELS
          </span>
          <span className="font-medium truncate max-w-[150px]">{config.rim.name}</span>
        </div>

        <div className="flex flex-col">
          <span
            className="text-[10px] font-bold uppercase tracking-[0.18em] text-neutral-400 font-barlow"
          >
            TRIM
          </span>
          <span className="font-medium truncate max-w-[140px]">{trimName}</span>
        </div>
      </div>

      {/* Zone 3: Actions - SAVE, Next Step Primary CTA, RESET */}
      <div className="flex flex-col items-end gap-1 shrink-0">
        <div className="flex items-center gap-3">
          {/* SAVE Button */}
          <button
            onClick={onSave}
            className={`flex items-center gap-2 px-4 md:px-5 py-2.5 text-xs font-bold uppercase tracking-[0.16em] border transition-all cursor-pointer ${
              isLight
                ? 'border-neutral-300 text-neutral-800 hover:border-black hover:bg-neutral-50'
                : 'border-white/20 text-neutral-200 hover:border-white hover:bg-white/5'
            }`}
          >
            <Download className="w-3.5 h-3.5" />
            <span>SAVE</span>
          </button>

          {/* Primary Action Button (Yellow solid CTA) */}
          <button
            onClick={onNextStep}
            className="flex items-center gap-2 px-5 md:px-6 py-2.5 text-xs font-extrabold uppercase tracking-[0.16em] bg-lambo-primary hover:bg-lambo-hover active:bg-lambo-pressed text-black shadow-md transition-all cursor-pointer active:scale-[0.98] font-barlow"
          >
            <span>{getCtaLabel()}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Reset Configuration Link */}
        <button
          onClick={onReset}
          className={`flex items-center gap-1 text-[10px] font-bold uppercase tracking-[0.14em] transition-colors cursor-pointer mr-1 ${
            isLight ? 'text-neutral-500 hover:text-black' : 'text-neutral-400 hover:text-white'
          } font-barlow`}
        >
          <span>RESET CONFIGURATION</span>
          <RotateCcw className="w-3 h-3" />
        </button>
      </div>
    </footer>
  );
};
