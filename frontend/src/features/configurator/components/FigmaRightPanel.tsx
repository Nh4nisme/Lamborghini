import React, { useState } from 'react';
import type {
  CarConfiguration,
  PaintColor,
  RimOption,
  InteriorTrim,
  CaliperOption,
} from '../types';
import {
  PAINT_COLORS,
  RIMS,
  CALIPERS,
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
  paintColors?: PaintColor[];
  rims?: RimOption[];
  interiorTrims?: InteriorTrim[];
  calipers?: CaliperOption[];
}

type PaintFinishFilter = 'METALLIC' | 'SOLID' | 'MATT';

/** Keeps the first option per id so list keys stay unique whatever the data source returns. */
function uniqueById<T extends { id: string }>(items: T[]): T[] {
  const seen = new Set<string>();
  return items.filter((item) => {
    if (seen.has(item.id)) return false;
    seen.add(item.id);
    return true;
  });
}

export const FigmaRightPanel: React.FC<FigmaRightPanelProps> = ({
  currentStep,
  config,
  onUpdateConfig,
  onSelectColor,
  theme,
  paintColors,
  rims,
  interiorTrims,
  calipers,
}) => {
  const isLight = theme === 'light';
  const [paintFilter, setPaintFilter] = useState<PaintFinishFilter>('METALLIC');
  const [isWheelsOpen, setIsWheelsOpen] = useState(false);
  const [isTrimOpen, setIsTrimOpen] = useState(false);
  const [selectedShowroom, setSelectedShowroom] = useState('bologna');

  const availablePaintColors = uniqueById(paintColors ?? PAINT_COLORS)
  const availableRims = uniqueById(rims ?? RIMS)
  const availableInteriorTrims = uniqueById(interiorTrims ?? INTERIOR_TRIMS)
  const availableCalipers = uniqueById(calipers ?? CALIPERS)
  
  const filteredPaintColors = availablePaintColors.filter((color) => {
    if (paintFilter === 'METALLIC') return color.finish === 'shiny'
    if (paintFilter === 'SOLID') return color.finish === 'pearl'
    if (paintFilter === 'MATT') return color.finish === 'matt'
    return true
  })

  const metallicCount = availablePaintColors.filter((c) => c.finish === 'shiny').length
  const solidCount = availablePaintColors.filter((c) => c.finish === 'pearl').length
  const mattCount = availablePaintColors.filter((c) => c.finish === 'matt').length

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
      className={`w-full lg:w-[400px] shrink-0 border-l flex flex-col justify-between overflow-y-auto z-20 select-none transition-colors duration-200 ${
        isLight
          ? 'bg-[#ffffff] border-[#e5e7eb] text-[#171817]'
          : 'bg-[#191b19] border-[#343831] text-[#f5f5f1]'
      }`}
    >
      <div className="p-6 lg:p-8 space-y-6">
        {/* =========================================================================
            STEP 01: EXTERIOR
            ========================================================================= */}
        {currentStep === '01 EXTERIOR' && (
          <div className="space-y-6">
            {/* Step Introduction */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs leading-4">
                <span className={`font-semibold uppercase tracking-[0.96px] ${isLight ? 'text-neutral-500' : 'text-[#9ea39b]'}`}>
                  01 / EXTERIOR
                </span>
                <span className={isLight ? 'text-neutral-400' : 'text-[#9ea39b]'}>
                  1 OF 4
                </span>
              </div>
              <h2
                className="text-4xl lg:text-[48px] font-bold uppercase leading-[1.08] font-barlow"
              >
                MAKE IT YOURS.
              </h2>
            </div>

            {/* Section: Exterior Paint */}
            <div className="space-y-4">
              <div className="flex items-baseline justify-between">
                <span
                  className="text-2xl lg:text-[28px] font-semibold uppercase leading-8 font-barlow"
                >
                  EXTERIOR PAINT
                </span>
                <span className={`text-xs ${isLight ? 'text-neutral-500' : 'text-[#9ea39b]'}`}>
                  {String(filteredPaintColors.length).padStart(2, '0')} COLORS
                </span>
              </div>

              <div
                className={`flex items-center gap-6 border-b text-xs font-semibold uppercase tracking-[0.96px] pb-3 ${
                  isLight ? 'border-neutral-200' : 'border-[#343831]'
                }`}
              >
                {filterTabs.map((tab) => {
                  const isActive = paintFilter === tab
                  const count = tab === 'METALLIC' ? metallicCount : tab === 'SOLID' ? solidCount : mattCount
                  return (
                    <button
                      key={tab}
                      type="button"
                      onClick={() => setPaintFilter(tab)}
                      className={`transition-colors cursor-pointer ${
                        isActive
                          ? isLight
                            ? 'text-[#171817]'
                            : 'text-[#f5f5f1]'
                          : isLight
                          ? 'text-neutral-400 hover:text-[#171817]'
                          : 'text-[#9ea39b] hover:text-[#f5f5f1]'
                      }`}
                    >
                      {tab}{count > 0 ? ` (${count})` : ''}
                    </button>
                  )
                })}
              </div>

              <div className="grid grid-cols-4 gap-x-4 gap-y-3">
                {filteredPaintColors.slice(0, 8).map((color) => {
                  const isSelected = config.exteriorColor.id === color.id
                  return (
                    <button
                      key={color.id}
                      type="button"
                      onClick={() => onSelectColor(color)}
                      aria-label={color.name}
                      title={`${color.name} - ${color.finish}`}
                      className={`relative h-[56px] w-full p-1 transition-colors cursor-pointer flex items-center justify-center ${
                        isSelected
                          ? 'border-2 border-[#eac500]'
                          : isLight
                          ? 'border border-neutral-300 hover:border-neutral-500'
                          : 'border border-[#343831] hover:border-[#6b7068]'
                      }`}
                    >
                      <span
                        className="block w-full h-full"
                        style={{ backgroundColor: color.hex }}
                      />
                      {isSelected && (
                        <span className="absolute inset-0 m-auto w-6 h-6 rounded-full bg-[#171817] flex items-center justify-center">
                          <Check className="w-3.5 h-3.5 text-[#f5f5f1] stroke-[2.5]" />
                        </span>
                      )}
                    </button>
                  )
                })}
              </div>

              {/* Selected Color Name & Details */}
              <div className="space-y-1">
                <div
                  className="text-2xl lg:text-[26px] font-semibold uppercase leading-8 font-barlow"
                >
                  {config.exteriorColor.name}
                </div>
                <div className={`text-sm leading-5 ${isLight ? 'text-neutral-500' : 'text-[#9ea39b]'}`}>
                  {config.exteriorColor.finish === 'matt'
                    ? 'Matt paint / satin finish'
                    : 'Metallic paint / gloss finish'}
                </div>
              </div>
            </div>

            <div className={`h-px w-full ${isLight ? 'bg-neutral-200' : 'bg-[#343831]'}`} />

            {/* Section: Wheels Dropdown */}
            <div className="space-y-2">
              <label
                className={`block text-xs font-semibold uppercase tracking-[0.96px] leading-4 ${
                  isLight ? 'text-neutral-500' : 'text-[#9ea39b]'
                }`}
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
                  className={`w-full h-12 px-4 flex items-center justify-between text-base font-normal border cursor-pointer transition-colors ${
                    isLight
                      ? 'bg-neutral-50 border-neutral-300 text-[#171817] hover:border-neutral-400'
                      : 'bg-[#191b19] border-[#343831] text-[#f5f5f1] hover:border-[#6b7068]'
                  }`}
                >
                  <span className="truncate pr-2">{config.rim.name}</span>
                  <ChevronDown className={`w-5 h-5 shrink-0 text-[#9ea39b] transition-transform ${isWheelsOpen ? 'rotate-180' : ''}`} />
                </button>

                {isWheelsOpen && (
                  <div
                    className={`absolute top-full left-0 right-0 mt-1 border shadow-xl z-30 overflow-hidden ${
                      isLight ? 'bg-white border-neutral-300' : 'bg-[#191b19] border-[#343831]'
                    }`}
                  >
                    {availableRims.map((rim) => (
                      <button
                        key={rim.id}
                        type="button"
                        onClick={() => {
                          onUpdateConfig({ rim });
                          setIsWheelsOpen(false);
                        }}
                        className={`w-full px-4 py-2.5 text-sm text-left font-medium transition-colors cursor-pointer flex items-center justify-between ${
                          config.rim.id === rim.id
                            ? 'bg-[#eac500] text-[#171817] font-semibold'
                            : isLight
                            ? 'hover:bg-neutral-100 text-neutral-800'
                            : 'hover:bg-white/5 text-[#f5f5f1]'
                        }`}
                      >
                        <span className="flex flex-col">
                          <span>{rim.name}</span>
                          <span className={`text-[11px] font-normal ${config.rim.id === rim.id ? 'opacity-75' : 'text-[#9ea39b]'}`}>
                            {rim.finish}
                          </span>
                        </span>
                        {config.rim.id === rim.id && <Check className="w-4 h-4" />}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Section: Exterior Trim Dropdown */}
            <div className="space-y-2">
              <label
                className={`block text-xs font-semibold uppercase tracking-[0.96px] leading-4 ${
                  isLight ? 'text-neutral-500' : 'text-[#9ea39b]'
                }`}
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
                  className={`w-full h-12 px-4 flex items-center justify-between text-base font-normal border cursor-pointer transition-colors ${
                    isLight
                      ? 'bg-neutral-50 border-neutral-300 text-[#171817] hover:border-neutral-400'
                      : 'bg-[#191b19] border-[#343831] text-[#f5f5f1] hover:border-[#6b7068]'
                  }`}
                >
                  <span className="truncate pr-2">{CARBON_LOWER_OPTIONS.find((c) => c.id === config.carbonLower)?.name || 'Nero / gloss black'}</span>
                  <ChevronDown className={`w-5 h-5 shrink-0 text-[#9ea39b] transition-transform ${isTrimOpen ? 'rotate-180' : ''}`} />
                </button>

                {isTrimOpen && (
                  <div
                    className={`absolute top-full left-0 right-0 mt-1 border shadow-xl z-30 overflow-hidden ${
                      isLight ? 'bg-white border-neutral-300' : 'bg-[#191b19] border-[#343831]'
                    }`}
                  >
                    {CARBON_LOWER_OPTIONS.map((trim) => (
                      <button
                        key={trim.id}
                        type="button"
                        onClick={() => {
                          onUpdateConfig({ carbonLower: trim.id });
                          setIsTrimOpen(false);
                        }}
                        className={`w-full px-4 py-2.5 text-sm text-left font-medium transition-colors cursor-pointer flex items-center justify-between ${
                          config.carbonLower === trim.id
                            ? 'bg-[#eac500] text-[#171817] font-semibold'
                            : isLight
                            ? 'hover:bg-neutral-100 text-neutral-800'
                            : 'hover:bg-white/5 text-[#f5f5f1]'
                        }`}
                      >
                        <span>{trim.name}</span>
                        {config.carbonLower === trim.id && <Check className="w-4 h-4" />}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Section: Brake Calipers */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className={`text-xs font-semibold uppercase tracking-[0.96px] leading-4 ${isLight ? 'text-neutral-500' : 'text-[#9ea39b]'}`}>
                  BRAKE CALIPERS
                </span>
                <span className={`text-xs ${isLight ? 'text-neutral-400' : 'text-[#9ea39b]'}`}>
                  {String(availableCalipers.length).padStart(2, '0')} OPTIONS
                </span>
              </div>
              <div className="grid grid-cols-8 gap-1.5">
                {availableCalipers.map((caliper) => {
                  const isSelected = config.caliper.id === caliper.id
                  return (
                    <button
                      key={caliper.id}
                      type="button"
                      onClick={() => onUpdateConfig({ caliper })}
                      aria-label={caliper.name}
                      aria-pressed={isSelected}
                      title={caliper.name}
                      className={`relative aspect-square w-full p-0.5 transition-colors cursor-pointer flex items-center justify-center ${
                        isSelected
                          ? 'border-2 border-[#eac500]'
                          : isLight
                          ? 'border border-neutral-300 hover:border-neutral-500'
                          : 'border border-[#343831] hover:border-[#6b7068]'
                      }`}
                    >
                      <span
                        className="block w-full h-full"
                        style={{ backgroundColor: caliper.hex }}
                      />
                      {isSelected && (
                        <span className="absolute inset-0 m-auto w-4 h-4 rounded-full bg-[#171817] flex items-center justify-center">
                          <Check className="w-2.5 h-2.5 text-[#f5f5f1] stroke-[2.5]" />
                        </span>
                      )}
                    </button>
                  )
                })}
              </div>
              <div className="flex items-baseline justify-between gap-3 text-xs pt-0.5">
                <span className="font-medium">{config.caliper.name}</span>
                <span className={`shrink-0 ${isLight ? 'text-neutral-500' : 'text-[#9ea39b]'}`}>
                  {formatCurrency(
                    config.currency === 'VND' ? config.caliper.priceVND : config.caliper.priceUSD,
                    config.currency,
                    config.language
                  )}
                </span>
              </div>
            </div>

            {/* Guide / Personalization Note (Unslop: quiet bar marker, no tinted box) */}
            <div className="flex items-start gap-3 pt-2">
              <div className="w-[3px] h-9 bg-[#eac500] shrink-0" />
              <p className={`text-sm leading-5 ${isLight ? 'text-neutral-600' : 'text-[#9ea39b]'}`}>
                Continue to the interior to choose materials, colors and stitching.
              </p>
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
                className="text-3xl font-black uppercase tracking-[0.08em] leading-tight font-barlow"
              >
                CRAFTED FOR DRIVERS.
              </h2>
            </div>

            <div className="space-y-3">
              <span
                className="text-sm font-extrabold uppercase tracking-[0.16em] block font-barlow"
              >
                UPHOLSTERY & SEATS
              </span>
              <div className="space-y-2">
                {availableInteriorTrims.map((trim) => {
                  const isSelected = config.interiorTrim.id === trim.id
                  return (
                    <button
                      key={trim.id}
                      onClick={() => onUpdateConfig({ interiorTrim: trim })}
                      className={`w-full p-3 text-left border transition-all cursor-pointer flex items-center justify-between ${
                        isSelected
                          ? 'border-lambo-primary bg-lambo-primary/10'
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
                            {formatCurrency(
                              config.currency === 'VND' ? trim.priceVND : trim.priceUSD,
                              config.currency,
                              config.language
                            )}
                          </div>
                        </div>
                      </div>
                      {isSelected && <Check className="w-4 h-4 text-lambo-primary" />}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Scissor Doors Toggle */}
            <div className="pt-2">
              <button
                onClick={() => onUpdateConfig({ doorsOpen: !config.doorsOpen })}
                className={`w-full py-3 px-4 border text-xs font-bold uppercase tracking-[0.16em] flex items-center justify-center gap-2 cursor-pointer transition-colors ${
                  config.doorsOpen
                    ? 'bg-lambo-primary text-lambo-bold-black border-lambo-primary font-extrabold'
                    : isLight
                    ? 'border-neutral-300 text-neutral-800 hover:bg-neutral-100'
                    : 'border-neutral-700 text-neutral-200 hover:bg-white/5'
                }`}
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
                className="text-3xl font-black uppercase tracking-[0.08em] leading-tight font-barlow"
              >
                PERFORMANCE & TECH.
              </h2>
            </div>

            {/* Powertrain & Telemetry Highlights (From TenDuAn) */}
            <div className="grid grid-cols-2 gap-2.5">
              <div className={`p-3 border ${isLight ? 'bg-neutral-50 border-neutral-200' : 'bg-[#14151a] border-neutral-800'}`}>
                <div className="text-xl font-black text-lambo-primary leading-none">1015 CV</div>
                <div className="text-[10px] font-mono text-neutral-400 mt-1 uppercase">Combined Power</div>
              </div>
              <div className={`p-3 border ${isLight ? 'bg-neutral-50 border-neutral-200' : 'bg-[#14151a] border-neutral-800'}`}>
                <div className="text-xl font-black text-lambo-primary leading-none">2.5 s</div>
                <div className="text-[10px] font-mono text-neutral-400 mt-1 uppercase">0-100 KM/H</div>
              </div>
              <div className={`p-3 border ${isLight ? 'bg-neutral-50 border-neutral-200' : 'bg-[#14151a] border-neutral-800'}`}>
                <div className="text-xl font-black text-lambo-primary leading-none">&gt;350 KM/H</div>
                <div className="text-[10px] font-mono text-neutral-400 mt-1 uppercase">Top Speed</div>
              </div>
              <div className={`p-3 border ${isLight ? 'bg-neutral-50 border-neutral-200' : 'bg-[#14151a] border-neutral-800'}`}>
                <div className="text-xl font-black text-lambo-primary leading-none">10,000 RPM</div>
                <div className="text-[10px] font-mono text-neutral-400 mt-1 uppercase">Engine Redline</div>
              </div>
            </div>

            {/* V12 Sound Engine Controls */}
            <div className="space-y-2 pt-1">
              <span
                className="text-sm font-extrabold uppercase tracking-[0.16em] block font-barlow"
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
                      ? 'bg-lambo-primary text-lambo-bold-black border-lambo-primary font-extrabold'
                      : isLight
                      ? 'border-neutral-300 text-neutral-800 hover:bg-neutral-100'
                      : 'border-neutral-700 text-neutral-200 hover:bg-white/5'
                  }`}
                >
                  <Power className="w-3.5 h-3.5" />
                  <span>{config.engineStarted ? 'STOP V12' : 'IGNITION V12'}</span>
                </button>

                {config.engineStarted && (
                  <button
                    onClick={() => revV12Engine()}
                    className="px-4 py-2.5 bg-red-600 hover:bg-red-500 text-white font-bold text-xs uppercase tracking-wider cursor-pointer font-barlow"
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
                } font-barlow`}
              >
                <Eye className="w-3.5 h-3.5 text-lambo-primary" />
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
                className="text-3xl font-black uppercase tracking-[0.08em] leading-tight font-barlow"
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
                <span className="text-neutral-400">Brake Calipers</span>
                <span className="font-bold">{config.caliper.name}</span>
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
                <span className="font-bold font-mono text-lambo-primary">
                  {formatCurrency(breakdown.totalPrice, config.currency, config.language, true)}
                </span>
              </div>
            </div>

            {/* Select Dealership (From TenDuAn) */}
            <div className="space-y-2">
              <span
                className="text-sm font-extrabold uppercase tracking-[0.16em] flex items-center gap-1.5 font-barlow"
              >
                <MapPin className="w-3.5 h-3.5 text-lambo-primary" />
                <span>SELECT SHOWROOM ADVISOR</span>
              </span>
              <div className="space-y-1.5">
                {showrooms.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setSelectedShowroom(s.id)}
                    className={`w-full p-2.5 text-left border text-xs flex items-center justify-between cursor-pointer transition-colors ${
                      selectedShowroom === s.id
                        ? 'border-lambo-primary bg-lambo-primary/10 font-bold'
                        : isLight
                        ? 'border-neutral-200 hover:border-neutral-400 bg-white'
                        : 'border-neutral-800 hover:border-neutral-700 bg-[#121318]'
                    }`}
                  >
                    <div>
                      <div>{s.name}</div>
                      <div className="text-[10px] text-neutral-400">{s.city}</div>
                    </div>
                    {selectedShowroom === s.id && <Check className="w-4 h-4 text-lambo-primary" />}
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

