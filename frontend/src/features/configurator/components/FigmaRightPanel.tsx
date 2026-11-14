import React, { useState } from 'react';
import type {
  CarConfiguration,
  PaintColor,
} from '../types';
import {
  PAINT_COLORS,
  RIMS,
  CARBON_LOWER_OPTIONS,
  INTERIOR_TRIMS,
} from '../data/lamborghiniData';
import type { ConfigStep } from './FigmaHeader';
import { Check, ChevronDown, Power, Eye, MapPin } from 'lucide-react';
import { startV12Engine, stopV12Engine, revV12Engine } from '../audio/engineAudio';
import { formatCurrency, calculatePriceBreakdown } from '../utils/pricing';

interface FigmaRightPanelProps {
  currentStep: ConfigStep;
  config: CarConfiguration;
  onUpdateConfig: (partial: Partial<CarConfiguration>) => void;
  onSelectColor: (color: PaintColor) => void;
  theme: 'light' | 'dark';
}

type PaintFinishFilter = 'METALLIC' | 'SOLID' | 'MATT';

export const FigmaRightPanel: React.FC<FigmaRightPanelProps> = ({
  currentStep,
  config,
  onUpdateConfig,
  onSelectColor,
  theme,
}) => {
  const isLight = theme === 'light';
  const [paintFilter, setPaintFilter] = useState<PaintFinishFilter>('METALLIC');
  const [isWheelsOpen, setIsWheelsOpen] = useState(false);
  const [isTrimOpen, setIsTrimOpen] = useState(false);
  const [selectedShowroom, setSelectedShowroom] = useState('bologna');

  // The 8 prominent colors matching the Figma design grid
  const figmaColors = PAINT_COLORS.slice(0, 8);

  const filterTabs: PaintFinishFilter[] = ['METALLIC', 'SOLID', 'MATT'];

  const showrooms = [
    { id: 'bologna', name: 'Sant\'Agata Bolognese', city: 'Bologna, Italy' },
    { id: 'milan', name: 'Via Monte Napoleone', city: 'Milano, Italy' },
    { id: 'tokyo', name: 'Roppongi Minato-ku', city: 'Tokyo, Japan' },
    { id: 'london', name: 'Old Bond Street', city: 'London, UK' },
    { id: 'vietnam', name: 'Hanoi / Ho Chi Minh City', city: 'Vietnam' },
  ];

  const breakdown = calculatePriceBreakdown(config);

  return (
    <aside
      className={`w-full lg:w-[380px] xl:w-[420px] shrink-0 border-l flex flex-col justify-between overflow-y-auto z-20 select-none transition-colors duration-200 ${
        isLight
          ? 'bg-[#ffffff] border-[#e5e7eb] text-[#111111]'
          : 'bg-[#0e0f12] border-[#1e2126] text-[#ffffff]'
      }`}
    >
      <div className="p-6 md:p-8 space-y-6">
        {/* =========================================================================
            STEP 01: EXTERIOR
            ========================================================================= */}
        {currentStep === '01 EXTERIOR' && (
          <div className="space-y-6">
            {/* Header / Breadcrumb */}
            <div>
              <div className="flex items-center justify-between text-xs font-mono uppercase tracking-[0.18em] mb-1">
                <span className={isLight ? 'text-neutral-500 font-semibold' : 'text-neutral-400 font-semibold'}>
                  01 / EXTERIOR
                </span>
                <span className={isLight ? 'text-neutral-400' : 'text-neutral-500'}>
                  1 OF 4
                </span>
              </div>
              <h2
                className="text-3xl font-black uppercase tracking-[0.08em] leading-tight"
                style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
              >
                MAKE IT YOURS.
              </h2>
            </div>

            {/* Section: Exterior Paint */}
            <div className="space-y-3.5 pt-2">
              <div className="flex items-center justify-between">
                <span
                  className="text-sm font-extrabold uppercase tracking-[0.16em]"
                  style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                >
                  EXTERIOR PAINT
                </span>
                <span className="text-[11px] font-mono text-neutral-400">
                  08 COLORS
                </span>
              </div>

              {/* Sub-tabs: Metallic, Solid, Matt */}
              <div
                className={`flex items-center gap-6 border-b text-xs font-bold uppercase tracking-[0.14em] pb-1 ${
                  isLight ? 'border-neutral-200' : 'border-neutral-800'
                }`}
                style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
              >
                {filterTabs.map((tab) => {
                  const isActive = paintFilter === tab;
                  return (
                    <button
                      key={tab}
                      onClick={() => setPaintFilter(tab)}
                      className={`pb-1 transition-colors cursor-pointer relative ${
                        isActive
                          ? isLight
                            ? 'text-black'
                            : 'text-amber-400'
                          : isLight
                          ? 'text-neutral-400 hover:text-black'
                          : 'text-neutral-500 hover:text-neutral-300'
                      }`}
                    >
                      {tab}
                      {isActive && (
                        <span className="absolute bottom-[-1px] left-0 right-0 h-[2px] bg-amber-400" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* 4x2 Swatches Grid */}
              <div className="grid grid-cols-4 gap-3 pt-1">
                {figmaColors.map((color) => {
                  const isSelected = config.exteriorColor.id === color.id;
                  return (
                    <button
                      key={color.id}
                      onClick={() => onSelectColor(color)}
                      aria-label={color.name}
                      title={`${color.name} - ${color.finish}`}
                      className={`relative aspect-square w-full rounded-none transition-all cursor-pointer flex items-center justify-center p-0.5 ${
                        isSelected
                          ? 'ring-2 ring-amber-400 ring-offset-2 ring-offset-black scale-[1.02]'
                          : isLight
                          ? 'border border-neutral-300 hover:border-neutral-500'
                          : 'border border-neutral-800 hover:border-neutral-600'
                      }`}
                      style={{ backgroundColor: color.hex }}
                    >
                      {isSelected && (
                        <Check className="w-4 h-4 text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)] stroke-[2.5]" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Selected Color Name & Details */}
              <div className="pt-1">
                <div
                  className="text-base font-extrabold uppercase tracking-[0.14em]"
                  style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                >
                  {config.exteriorColor.name}
                </div>
                <div className="text-xs text-neutral-400">
                  {config.exteriorColor.finish === 'matt'
                    ? 'Matt paint / satin finish'
                    : 'Metallic paint / gloss finish'}
                </div>
              </div>
            </div>

            {/* Section: Wheels Dropdown */}
            <div className="space-y-1.5 pt-2">
              <label
                className="block text-[11px] font-bold uppercase tracking-[0.16em] text-neutral-400"
                style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
              >
                WHEELS
              </label>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => {
                    setIsWheelsOpen(!isWheelsOpen);
                    setIsTrimOpen(false);
                  }}
                  className={`w-full h-11 px-4 flex items-center justify-between text-xs font-semibold tracking-wide border cursor-pointer transition-colors ${
                    isLight
                      ? 'bg-neutral-50 border-neutral-300 text-neutral-900 hover:border-neutral-400'
                      : 'bg-[#14151a] border-neutral-800 text-white hover:border-neutral-700'
                  }`}
                >
                  <span>{config.rim.name}</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${isWheelsOpen ? 'rotate-180' : ''}`} />
                </button>

                {isWheelsOpen && (
                  <div
                    className={`absolute top-full left-0 right-0 mt-1 border shadow-xl z-30 overflow-hidden ${
                      isLight ? 'bg-white border-neutral-300' : 'bg-[#16171d] border-neutral-700'
                    }`}
                  >
                    {RIMS.map((rim) => (
                      <button
                        key={rim.id}
                        onClick={() => {
                          onUpdateConfig({ rim });
                          setIsWheelsOpen(false);
                        }}
                        className={`w-full px-4 py-2.5 text-xs text-left font-medium transition-colors cursor-pointer flex items-center justify-between ${
                          config.rim.id === rim.id
                            ? 'bg-amber-400 text-black font-bold'
                            : isLight
                            ? 'hover:bg-neutral-100 text-neutral-800'
                            : 'hover:bg-white/5 text-neutral-200'
                        }`}
                      >
                        <span>{rim.name}</span>
                        {config.rim.id === rim.id && <Check className="w-3.5 h-3.5" />}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Section: Exterior Trim Dropdown */}
            <div className="space-y-1.5 pt-1">
              <label
                className="block text-[11px] font-bold uppercase tracking-[0.16em] text-neutral-400"
                style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
              >
                EXTERIOR TRIM
              </label>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => {
                    setIsTrimOpen(!isTrimOpen);
                    setIsWheelsOpen(false);
                  }}
                  className={`w-full h-11 px-4 flex items-center justify-between text-xs font-semibold tracking-wide border cursor-pointer transition-colors ${
                    isLight
                      ? 'bg-neutral-50 border-neutral-300 text-neutral-900 hover:border-neutral-400'
                      : 'bg-[#14151a] border-neutral-800 text-white hover:border-neutral-700'
                  }`}
                >
                  <span>{CARBON_LOWER_OPTIONS.find((c) => c.id === config.carbonLower)?.name || 'Nero / gloss black'}</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${isTrimOpen ? 'rotate-180' : ''}`} />
                </button>

                {isTrimOpen && (
                  <div
                    className={`absolute top-full left-0 right-0 mt-1 border shadow-xl z-30 overflow-hidden ${
                      isLight ? 'bg-white border-neutral-300' : 'bg-[#16171d] border-neutral-700'
                    }`}
                  >
                    {CARBON_LOWER_OPTIONS.map((trim) => (
                      <button
                        key={trim.id}
                        onClick={() => {
                          onUpdateConfig({ carbonLower: trim.id });
                          setIsTrimOpen(false);
                        }}
                        className={`w-full px-4 py-2.5 text-xs text-left font-medium transition-colors cursor-pointer flex items-center justify-between ${
                          config.carbonLower === trim.id
                            ? 'bg-amber-400 text-black font-bold'
                            : isLight
                            ? 'hover:bg-neutral-100 text-neutral-800'
                            : 'hover:bg-white/5 text-neutral-200'
                        }`}
                      >
                        <span>{trim.name}</span>
                        {config.carbonLower === trim.id && <Check className="w-3.5 h-3.5" />}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Guide / Callout Notice */}
            <div className="pt-3">
              <div
                className={`p-3.5 border-l-2 border-amber-400 text-xs leading-relaxed ${
                  isLight ? 'bg-amber-50/50 text-neutral-600' : 'bg-amber-400/5 text-neutral-300'
                }`}
              >
                Continue to the interior to choose materials, colors and stitching.
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            STEP 02: INTERIOR
            ========================================================================= */}
        {currentStep === '02 INTERIOR' && (
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between text-xs font-mono uppercase tracking-[0.18em] mb-1">
                <span className={isLight ? 'text-neutral-500 font-semibold' : 'text-neutral-400 font-semibold'}>
                  02 / INTERIOR
                </span>
                <span className={isLight ? 'text-neutral-400' : 'text-neutral-500'}>
                  2 OF 4
                </span>
              </div>
              <h2
                className="text-3xl font-black uppercase tracking-[0.08em] leading-tight"
                style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
              >
                CRAFTED FOR DRIVERS.
              </h2>
            </div>

            {/* Interior Trims List */}
            <div className="space-y-3">
              <span
                className="text-sm font-extrabold uppercase tracking-[0.16em] block"
                style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
              >
                UPHOLSTERY & SEATS
              </span>
              <div className="space-y-2">
                {INTERIOR_TRIMS.map((trim) => {
                  const isSelected = config.interiorTrim.id === trim.id;
                  return (
                    <button
                      key={trim.id}
                      onClick={() => onUpdateConfig({ interiorTrim: trim })}
                      className={`w-full p-3 text-left border transition-all cursor-pointer flex items-center justify-between ${
                        isSelected
                          ? 'border-amber-400 bg-amber-400/10'
                          : isLight
                          ? 'border-neutral-200 hover:border-neutral-400 bg-neutral-50'
                          : 'border-neutral-800 hover:border-neutral-700 bg-[#14151a]'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex -space-x-1">
                          <span
                            className="w-4 h-4 rounded-full border border-black/20"
                            style={{ backgroundColor: trim.primaryLeatherHex }}
                          />
                          <span
                            className="w-4 h-4 rounded-full border border-black/20"
                            style={{ backgroundColor: trim.secondaryLeatherHex }}
                          />
                        </div>
                        <div>
                          <div className="text-xs font-bold">{trim.name}</div>
                          <div className="text-[11px] text-neutral-400">
                            {formatCurrency(trim.priceUSD, config.currency, config.language)}
                          </div>
                        </div>
                      </div>
                      {isSelected && <Check className="w-4 h-4 text-amber-400" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Scissor Doors Toggle */}
            <div className="pt-2">
              <button
                onClick={() => onUpdateConfig({ doorsOpen: !config.doorsOpen })}
                className={`w-full py-3 px-4 border text-xs font-bold uppercase tracking-[0.16em] flex items-center justify-center gap-2 cursor-pointer transition-colors ${
                  config.doorsOpen
                    ? 'bg-amber-400 text-black border-amber-400 font-extrabold'
                    : isLight
                    ? 'border-neutral-300 text-neutral-800 hover:bg-neutral-100'
                    : 'border-neutral-700 text-neutral-200 hover:bg-white/5'
                }`}
                style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
              >
                <span>{config.doorsOpen ? 'CLOSE SCISSOR DOORS' : 'OPEN SCISSOR DOORS'}</span>
              </button>
            </div>
          </div>
        )}

        {/* =========================================================================
            STEP 03: OPTIONS (Specs & Telemetry from TenDuAn)
            ========================================================================= */}
        {currentStep === '03 OPTIONS' && (
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between text-xs font-mono uppercase tracking-[0.18em] mb-1">
                <span className={isLight ? 'text-neutral-500 font-semibold' : 'text-neutral-400 font-semibold'}>
                  03 / OPTIONS
                </span>
                <span className={isLight ? 'text-neutral-400' : 'text-neutral-500'}>
                  3 OF 4
                </span>
              </div>
              <h2
                className="text-3xl font-black uppercase tracking-[0.08em] leading-tight"
                style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
              >
                PERFORMANCE & TECH.
              </h2>
            </div>

            {/* Powertrain & Telemetry Highlights (From TenDuAn) */}
            <div className="grid grid-cols-2 gap-2.5">
              <div className={`p-3 border ${isLight ? 'bg-neutral-50 border-neutral-200' : 'bg-[#14151a] border-neutral-800'}`}>
                <div className="text-xl font-black text-amber-400 leading-none">1015 CV</div>
                <div className="text-[10px] font-mono text-neutral-400 mt-1 uppercase">Combined Power</div>
              </div>
              <div className={`p-3 border ${isLight ? 'bg-neutral-50 border-neutral-200' : 'bg-[#14151a] border-neutral-800'}`}>
                <div className="text-xl font-black text-amber-400 leading-none">2.5 s</div>
                <div className="text-[10px] font-mono text-neutral-400 mt-1 uppercase">0-100 KM/H</div>
              </div>
              <div className={`p-3 border ${isLight ? 'bg-neutral-50 border-neutral-200' : 'bg-[#14151a] border-neutral-800'}`}>
                <div className="text-xl font-black text-amber-400 leading-none">&gt;350 KM/H</div>
                <div className="text-[10px] font-mono text-neutral-400 mt-1 uppercase">Top Speed</div>
              </div>
              <div className={`p-3 border ${isLight ? 'bg-neutral-50 border-neutral-200' : 'bg-[#14151a] border-neutral-800'}`}>
                <div className="text-xl font-black text-amber-400 leading-none">10,000 RPM</div>
                <div className="text-[10px] font-mono text-neutral-400 mt-1 uppercase">Engine Redline</div>
              </div>
            </div>

            {/* V12 Sound Engine Controls */}
            <div className="space-y-2 pt-1">
              <span
                className="text-sm font-extrabold uppercase tracking-[0.16em] block"
                style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
              >
                V12 ACOUSTIC SIMULATOR
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    if (config.engineStarted) {
                      stopV12Engine();
                      onUpdateConfig({ engineStarted: false });
                    } else {
                      startV12Engine(() => onUpdateConfig({ engineStarted: true }));
                      onUpdateConfig({ engineStarted: true });
                    }
                  }}
                  className={`flex-1 py-2.5 px-3 border text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer ${
                    config.engineStarted
                      ? 'bg-amber-400 text-black border-amber-400 font-extrabold'
                      : isLight
                      ? 'border-neutral-300 text-neutral-800 hover:bg-neutral-100'
                      : 'border-neutral-700 text-neutral-200 hover:bg-white/5'
                  }`}
                  style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                >
                  <Power className="w-3.5 h-3.5" />
                  <span>{config.engineStarted ? 'STOP V12' : 'IGNITION V12'}</span>
                </button>

                {config.engineStarted && (
                  <button
                    onClick={() => revV12Engine()}
                    className="px-4 py-2.5 bg-red-600 hover:bg-red-500 text-white font-bold text-xs uppercase tracking-wider cursor-pointer"
                    style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                  >
                    REV 7800
                  </button>
                )}
              </div>
            </div>

            {/* Headlights Toggle */}
            <div className="pt-1">
              <button
                onClick={() => onUpdateConfig({ lightsOn: !config.lightsOn })}
                className={`w-full py-2.5 px-4 border text-xs font-bold uppercase tracking-[0.16em] flex items-center justify-center gap-2 cursor-pointer transition-colors ${
                  config.lightsOn
                    ? 'bg-neutral-800 text-white border-neutral-700'
                    : isLight
                    ? 'border-neutral-300 text-neutral-800'
                    : 'border-neutral-700 text-neutral-300'
                }`}
                style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
              >
                <Eye className="w-3.5 h-3.5 text-amber-400" />
                <span>{config.lightsOn ? 'HEADLIGHTS ACTIVE (ON)' : 'HEADLIGHTS OFF'}</span>
              </button>
            </div>
          </div>
        )}

        {/* =========================================================================
            STEP 04: SUMMARY (Showroom from TenDuAn)
            ========================================================================= */}
        {currentStep === '04 SUMMARY' && (
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between text-xs font-mono uppercase tracking-[0.18em] mb-1">
                <span className={isLight ? 'text-neutral-500 font-semibold' : 'text-neutral-400 font-semibold'}>
                  04 / SUMMARY
                </span>
                <span className={isLight ? 'text-neutral-400' : 'text-neutral-500'}>
                  4 OF 4
                </span>
              </div>
              <h2
                className="text-3xl font-black uppercase tracking-[0.08em] leading-tight"
                style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
              >
                YOUR SPECIFICATION.
              </h2>
            </div>

            {/* Build Spec Rows */}
            <div className={`p-4 border space-y-2.5 text-xs ${isLight ? 'bg-neutral-50 border-neutral-200' : 'bg-[#14151a] border-neutral-800'}`}>
              <div className="flex justify-between">
                <span className="text-neutral-400">Exterior Paint</span>
                <span className="font-bold">{config.exteriorColor.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">Wheels</span>
                <span className="font-bold">{config.rim.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">Exterior Trim</span>
                <span className="font-bold">{CARBON_LOWER_OPTIONS.find((c) => c.id === config.carbonLower)?.name || 'Nero / gloss black'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">Interior</span>
                <span className="font-bold">{config.interiorTrim.name}</span>
              </div>
              <div className="pt-2 border-t border-white/10 flex justify-between text-sm">
                <span className="font-bold">Total Estimated</span>
                <span className="font-bold font-mono text-amber-400">
                  {formatCurrency(breakdown.totalPrice, config.currency, config.language, true)}
                </span>
              </div>
            </div>

            {/* Select Dealership (From TenDuAn) */}
            <div className="space-y-2">
              <span
                className="text-sm font-extrabold uppercase tracking-[0.16em] flex items-center gap-1.5"
                style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
              >
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                <span>SELECT SHOWROOM ADVISOR</span>
              </span>
              <div className="space-y-1.5">
                {showrooms.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setSelectedShowroom(s.id)}
                    className={`w-full p-2.5 text-left border text-xs flex items-center justify-between cursor-pointer transition-colors ${
                      selectedShowroom === s.id
                        ? 'border-amber-400 bg-amber-400/10 font-bold'
                        : isLight
                        ? 'border-neutral-200 hover:border-neutral-400 bg-white'
                        : 'border-neutral-800 hover:border-neutral-700 bg-[#121318]'
                    }`}
                  >
                    <div>
                      <div>{s.name}</div>
                      <div className="text-[10px] text-neutral-400">{s.city}</div>
                    </div>
                    {selectedShowroom === s.id && <Check className="w-4 h-4 text-amber-400" />}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};

