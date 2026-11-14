import React from 'react';
import { Sun, Moon, Volume2, VolumeX, Shield } from 'lucide-react';

export type ConfigStep = '01 EXTERIOR' | '02 INTERIOR' | '03 OPTIONS' | '04 SUMMARY';

interface FigmaHeaderProps {
  currentStep: ConfigStep;
  onSelectStep: (step: ConfigStep) => void;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
  isAudioMuted: boolean;
  onToggleAudio: () => void;
  onExit: () => void;
}

export const FigmaHeader: React.FC<FigmaHeaderProps> = ({
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
      className={`h-16 w-full flex items-center justify-between px-6 border-b transition-colors duration-200 select-none z-30 ${
        isLight
          ? 'bg-[#ffffff] border-[#e5e7eb] text-[#111111]'
          : 'bg-[#0a0b0d] border-[#1e2126] text-[#ffffff]'
      }`}
    >
      {/* Brand & Configurator Wordmark */}
      <div className="flex items-center gap-3">
        <div className="w-5 h-5 flex items-center justify-center text-amber-500">
          <Shield className="w-5 h-5 fill-amber-500/20 stroke-amber-500 stroke-[1.8]" />
        </div>
        <div
          className="text-lg font-extrabold uppercase tracking-[0.16em]"
          style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
        >
          REVUELTO <span className={isLight ? 'text-neutral-400 font-light' : 'text-neutral-600 font-light'}>/</span> CONFIGURATOR
        </div>
      </div>

      {/* Center 4 Stepper Tabs */}
      <nav className="hidden md:flex items-center gap-8 lg:gap-12 text-xs font-bold uppercase tracking-[0.16em]">
        {steps.map((step) => {
          const isActive = currentStep === step;
          return (
            <button
              key={step}
              onClick={() => onSelectStep(step)}
              className={`relative py-5 transition-all cursor-pointer font-bold ${
                isActive
                  ? isLight
                    ? 'text-black border-b-2 border-black'
                    : 'text-amber-400 border-b-2 border-amber-400'
                  : isLight
                  ? 'text-neutral-500 hover:text-black border-b-2 border-transparent'
                  : 'text-neutral-400 hover:text-white border-b-2 border-transparent'
              }`}
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              {step}
            </button>
          );
        })}
      </nav>

      {/* Right Controls: Theme Toggle, V12 Engine Sound & Exit Button */}
      <div className="flex items-center gap-3">
        {/* V12 Sound Engine Toggle */}
        <button
          onClick={onToggleAudio}
          title={isAudioMuted ? 'Bật âm thanh động cơ V12' : 'Tắt âm thanh'}
          aria-label="Toggle V12 Engine Sound"
          className={`p-2 rounded border transition-colors cursor-pointer ${
            isLight
              ? 'border-neutral-200 text-neutral-600 hover:text-black hover:bg-neutral-100'
              : 'border-white/10 text-neutral-300 hover:text-white hover:bg-white/5'
          }`}
        >
          {isAudioMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-amber-400" />}
        </button>

        {/* Light / Dark Mode Toggle */}
        <button
          onClick={onToggleTheme}
          title={isLight ? 'Chuyển sang Dark Theme' : 'Chuyển sang Light Theme'}
          aria-label="Toggle Theme"
          className={`p-2 rounded border transition-colors cursor-pointer ${
            isLight
              ? 'border-neutral-200 text-neutral-600 hover:text-black hover:bg-neutral-100'
              : 'border-white/10 text-neutral-300 hover:text-white hover:bg-white/5'
          }`}
        >
          {isLight ? <Moon className="w-4 h-4 text-neutral-700" /> : <Sun className="w-4 h-4 text-amber-400" />}
        </button>

        {/* Exit Configurator Button */}
        <button
          onClick={onExit}
          className={`px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] border transition-all cursor-pointer ${
            isLight
              ? 'border-neutral-800 text-neutral-900 hover:bg-black hover:text-white'
              : 'border-[#3a2c14] text-neutral-200 hover:border-amber-400 hover:text-amber-400'
          }`}
          style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
        >
          EXIT CONFIGURATOR
        </button>
      </div>
    </header>
  );
};
