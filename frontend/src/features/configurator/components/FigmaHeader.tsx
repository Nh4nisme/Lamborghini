import React from 'react';
import { Sun, Moon, Volume2, VolumeX } from 'lucide-react';

export type ConfigStep = '01 EXTERIOR' | '02 INTERIOR' | '03 OPTIONS' | '04 SUMMARY';

interface FigmaHeaderProps {
  modelTitle?: string;
  currentStep: ConfigStep;
  onSelectStep: (step: ConfigStep) => void;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
  isAudioMuted: boolean;
  onToggleAudio: () => void;
  onExit: () => void;
}

export const FigmaHeader: React.FC<FigmaHeaderProps> = ({
  modelTitle = 'REVUELTO',
  currentStep,
  onSelectStep,
  theme,
  onToggleTheme,
  isAudioMuted,
  onToggleAudio,
  onExit,
}) => {
  const isLight = theme === 'light';
  const steps: ConfigStep[] = ['01 EXTERIOR', '02 INTERIOR', '03 OPTIONS', '04 SUMMARY'];

  return (
    <header
      className={`h-16 w-full flex items-center justify-between gap-4 px-5 lg:px-8 border-b transition-colors duration-200 select-none z-30 ${
        isLight
          ? 'bg-[#ffffff] border-[#e5e7eb] text-[#111111]'
          : 'bg-[#191b19] border-[#343831] text-[#f5f5f1]'
      }`}
    >
      {/* Brand & Configurator Wordmark */}
      <div className="flex items-center shrink-0 whitespace-nowrap">
        <div
          className={`text-xl lg:text-[26px] font-semibold uppercase tracking-[0.04em] leading-8 font-barlow ${
            isLight ? 'text-[#171817]' : 'text-[#f7de9f]'
          }`}
        >
          {modelTitle} <span className={isLight ? 'text-neutral-400 font-light' : 'text-[#9ea39b]/60 font-light'}>/</span> CONFIGURATOR
        </div>
      </div>

      {/* Center 4 Stepper Tabs */}
      <nav className="hidden md:flex items-center gap-6 lg:gap-10 text-[13px] lg:text-sm font-semibold uppercase tracking-[0.04em] whitespace-nowrap">
        {steps.map((step) => {
          const isActive = currentStep === step;
          return (
            <button
              key={step}
              type="button"
              onClick={() => onSelectStep(step)}
              className={`py-5 transition-colors cursor-pointer ${
                isActive
                  ? isLight
                    ? 'text-[#171817] underline underline-offset-4 decoration-2'
                    : 'text-[#f7de9f] underline underline-offset-4 decoration-1'
                  : isLight
                  ? 'text-neutral-500 hover:text-[#171817]'
                  : 'text-[#9ea39b] hover:text-[#f5f5f1]'
              }`}
            >
              {step}
            </button>
          );
        })}
      </nav>

      {/* Right Controls: Audio, Theme & Exit Button */}
      <div className="flex items-center gap-2.5 shrink-0">
        <button
          type="button"
          onClick={onToggleAudio}
          title={isAudioMuted ? 'Bật âm thanh động cơ V12' : 'Tắt âm thanh'}
          aria-label="Toggle V12 Engine Sound"
          className={`w-10 h-10 flex items-center justify-center border transition-colors cursor-pointer ${
            isLight
              ? 'border-neutral-300 text-neutral-600 hover:text-black hover:bg-neutral-100'
              : 'bg-[#191b19] border-[#343831] text-[#9ea39b] hover:text-[#f5f5f1] hover:border-[#555b50]'
          }`}
        >
          {isAudioMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-[#eac500]" />}
        </button>

        <button
          type="button"
          onClick={onToggleTheme}
          title={isLight ? 'Chuyển sang Dark Studio' : 'Chuyển sang Light Studio'}
          aria-label="Toggle Theme"
          className={`w-10 h-10 flex items-center justify-center border transition-colors cursor-pointer ${
            isLight
              ? 'border-neutral-300 text-neutral-600 hover:text-black hover:bg-neutral-100'
              : 'bg-[#191b19] border-[#343831] text-[#9ea39b] hover:text-[#f5f5f1] hover:border-[#555b50]'
          }`}
        >
          {isLight ? <Moon className="w-4 h-4 text-neutral-700" /> : <Sun className="w-4 h-4 text-[#eac500]" />}
        </button>

        <button
          type="button"
          onClick={onExit}
          className={`h-10 px-4 text-[13px] lg:text-sm font-semibold uppercase tracking-[0.04em] border transition-colors cursor-pointer font-barlow ${
            isLight
              ? 'border-neutral-800 text-neutral-900 hover:bg-black hover:text-white'
              : 'bg-[#191b19] border-[#d8a016] text-[#9ea39b] hover:text-[#f7de9f] hover:border-[#eac500]'
          }`}
        >
          EXIT CONFIGURATOR
        </button>
      </div>
    </header>
  );
};
