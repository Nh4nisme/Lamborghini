import React from 'react';
import type { CarConfiguration } from '../types';
import { CARBON_LOWER_OPTIONS } from '../data/lamborghiniData';
import type { ConfigStep } from './FigmaHeader';
import { Download, ArrowUpRight, RotateCcw } from 'lucide-react';

interface FigmaBottomBarProps {
  modelTitle?: string;
  config: CarConfiguration;
  currentStep: ConfigStep;
  onNextStep: () => void;
  onSave: () => void;
  onReset: () => void;
  theme: 'light' | 'dark';
}

export const FigmaBottomBar: React.FC<FigmaBottomBarProps> = ({
  modelTitle = 'REVUELTO',
  config,
  currentStep,
  onNextStep,
  onSave,
  onReset,
  theme,
}) => {
  const isLight = theme === 'light';

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
      className={`w-full border-t flex flex-col gap-3 px-5 lg:px-8 py-4 lg:py-5 select-none z-30 transition-colors duration-200 ${
        isLight
          ? 'bg-[#ffffff] border-[#e5e7eb] text-[#171817]'
          : 'bg-[#101110] border-[#343831] text-[#f5f5f1]'
      }`}
    >
      {/* Row 1: Configuration Summary + Primary Actions */}
      <div className="flex items-center justify-between gap-6 w-full">
        {/* Summary Columns */}
        <div className="flex items-center gap-8 xl:gap-14 min-w-0">
          <div className="flex flex-col gap-0.5 min-w-0">
            <span
              className={`text-xs font-semibold uppercase tracking-[0.96px] leading-4 ${
                isLight ? 'text-neutral-500' : 'text-[#9ea39b]'
              }`}
            >
              YOUR CONFIGURATION
            </span>
            <span className="text-xl lg:text-[26px] font-semibold uppercase leading-8 font-barlow truncate">
              {modelTitle}
            </span>
          </div>

          <div className="hidden xl:flex flex-col gap-1 min-w-[140px]">
            <span
              className={`text-xs font-semibold uppercase tracking-[0.96px] leading-4 ${
                isLight ? 'text-neutral-500' : 'text-[#9ea39b]'
              }`}
            >
              PAINT
            </span>
            <span className="text-base font-normal leading-6 truncate max-w-[180px]">
              {config.exteriorColor.name}
            </span>
          </div>

          <div className="hidden xl:flex flex-col gap-1 min-w-[140px]">
            <span
              className={`text-xs font-semibold uppercase tracking-[0.96px] leading-4 ${
                isLight ? 'text-neutral-500' : 'text-[#9ea39b]'
              }`}
            >
              WHEELS
            </span>
            <span className="text-base font-normal leading-6 truncate max-w-[180px]">
              {config.rim.name}
            </span>
          </div>

          <div className="hidden xl:flex flex-col gap-1 min-w-[140px]">
            <span
              className={`text-xs font-semibold uppercase tracking-[0.96px] leading-4 ${
                isLight ? 'text-neutral-500' : 'text-[#9ea39b]'
              }`}
            >
              TRIM
            </span>
            <span className="text-base font-normal leading-6 truncate max-w-[180px]">
              {trimName}
            </span>
          </div>
        </div>

        {/* Actions: SAVE + Primary Yellow CTA */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onSave}
            className={`h-11 lg:h-12 px-5 lg:px-6 flex items-center justify-center gap-2.5 text-sm font-semibold uppercase tracking-[0.56px] border transition-colors cursor-pointer ${
              isLight
                ? 'bg-white border-neutral-300 text-[#171817] hover:border-black hover:bg-neutral-50'
                : 'bg-[#101110] border-[#343831] text-[#f5f5f1] hover:border-[#9ea39b] hover:bg-[#191b19]'
            }`}
          >
            <Download className="w-4 h-4" />
            <span>SAVE</span>
          </button>

          <button
            type="button"
            onClick={onNextStep}
            className="h-11 lg:h-12 px-5 lg:px-6 flex items-center justify-center gap-2.5 text-sm font-semibold uppercase tracking-[0.56px] bg-[#eac500] hover:bg-[#f2cf1a] active:bg-[#d8a016] border border-[#d8a016] text-[#171817] transition-colors cursor-pointer"
          >
            <span>{getCtaLabel()}</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Row 2: Disclaimer + Reset Configuration */}
      <div
        className={`flex items-center justify-between gap-4 text-xs leading-4 ${
          isLight ? 'text-neutral-500' : 'text-[#9ea39b]'
        }`}
      >
        <span className="truncate">
          Illustrative vehicle preview. Colors and equipment may vary by market.
        </span>

        <button
          type="button"
          onClick={onReset}
          className={`flex items-center gap-1.5 font-semibold uppercase tracking-[0.96px] transition-colors cursor-pointer shrink-0 ${
            isLight ? 'text-neutral-600 hover:text-black' : 'text-[#9ea39b] hover:text-[#f5f5f1]'
          }`}
        >
          <span>RESET CONFIGURATION</span>
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      </div>
    </footer>
  );
};
