import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { CarConfiguration } from '../types';
import { calculatePriceBreakdown, formatCurrency, generateConfigCode } from '../utils/pricing';
import { playUiClick } from '../audio/engineAudio';
import { X, Check, Copy, Printer, MapPin, Zap, Gauge, Award, Phone } from 'lucide-react';

interface SummaryModalProps {
  config: CarConfiguration;
  isOpen: boolean;
  onClose: () => void;
}

export const SummaryModal: React.FC<SummaryModalProps> = ({
  config,
  isOpen,
  onClose,
}) => {
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  if (!isOpen) return null;

  const breakdown = calculatePriceBreakdown(config);
  const configCode = generateConfigCode(config);

  const copyConfigCode = () => {
    navigator.clipboard.writeText(configCode);
    setCopied(true);
    playUiClick();
    setTimeout(() => setCopied(false), 2000);
  };

  const printSpecSheet = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 select-none overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-[#0d0f14] border border-white/15 rounded-2xl shadow-2xl overflow-hidden my-8 text-white">
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-black/40">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-7 h-7 rounded border border-amber-500/40 bg-amber-500/10 text-amber-400">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                <polygon points="12,2 22,6 20,18 12,22 4,18 2,6" fill="none" stroke="currentColor" strokeWidth="1.5" />
                <path d="M12 5 L14 10 L18 11 L14 13 L15 17 L12 14 L9 17 L10 13 L6 11 L10 10 Z" />
              </svg>
            </div>
            <div>
              <div className="text-[10px] tracking-widest text-neutral-400 uppercase font-semibold">
                Automobili Lamborghini S.p.A.
              </div>
              <div className="font-display text-lg font-bold text-white tracking-wider">
                {config.language === 'VIE' ? 'Báº£n Äáº·t Cáº¥u HĂ¬nh SiĂªu Xe Revuelto' : 'Official Configuration Sheet Â· Revuelto HPEV'}
              </div>
            </div>
          </div>

          <button
            onClick={() => {
              onClose();
              playUiClick();
            }}
            className="p-1.5 rounded-lg border border-white/10 text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 flex flex-col gap-6 max-h-[75vh] overflow-y-auto">
          {/* Top Banner: Powertrain & Performance Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-xl bg-gradient-to-r from-amber-500/10 via-black/40 to-amber-500/5 border border-amber-500/20">
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5 text-xs text-neutral-400">
                <Gauge className="w-3.5 h-3.5 text-amber-400" />
                <span>CĂ´ng Suáº¥t Tá»‘i Äa</span>
              </div>
              <div className="font-display text-xl font-bold text-white mt-1">1015 CV</div>
              <div className="text-[10px] text-neutral-400">6.5L V12 + 3 e-Motors</div>
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-1.5 text-xs text-neutral-400">
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                <span>TÄƒng Tá»‘c 0-100 km/h</span>
              </div>
              <div className="font-display text-xl font-bold text-amber-400 mt-1">2.5s</div>
              <div className="text-[10px] text-neutral-400">Launch Control Corsa</div>
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-1.5 text-xs text-neutral-400">
                <Award className="w-3.5 h-3.5 text-amber-400" />
                <span>Tá»‘c Äá»™ Tá»‘i Äa</span>
              </div>
              <div className="font-display text-xl font-bold text-white mt-1">&gt; 350 km/h</div>
              <div className="text-[10px] text-neutral-400">217 mph aero mode</div>
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-1.5 text-xs text-neutral-400">
                <Award className="w-3.5 h-3.5 text-amber-400" />
                <span>Há»™p Sá»‘</span>
              </div>
              <div className="font-display text-lg font-bold text-white mt-1">8-Speed DCT</div>
              <div className="text-[10px] text-neutral-400">Ly há»£p kĂ©p truyá»n Ä‘á»™ng</div>
            </div>
          </div>

          {/* Configuration Code Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-lg bg-black/40 border border-white/10">
            <div>
              <div className="text-[10px] uppercase tracking-wider text-neutral-400">
                {config.language === 'VIE' ? 'MĂ£ Cáº¥u HĂ¬nh Äá»™c Quyá»n (Lamborghini Code)' : 'Lamborghini Configuration Code'}
              </div>
              <div className="font-mono text-sm md:text-base font-bold text-amber-400 mt-0.5">
                {configCode}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={copyConfigCode}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded border border-white/15 bg-white/5 hover:bg-white/10 text-xs text-neutral-200 transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? (config.language === 'VIE' ? 'ÄĂ£ Sao ChĂ©p' : 'Copied!') : (config.language === 'VIE' ? 'Sao ChĂ©p MĂ£' : 'Copy Code')}</span>
              </button>

              <button
                onClick={printSpecSheet}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded border border-white/15 bg-white/5 hover:bg-white/10 text-xs text-neutral-200 transition-colors"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>{config.language === 'VIE' ? 'In Báº£ng Cáº¥u HĂ¬nh' : 'Print Sheet'}</span>
              </button>
            </div>
          </div>

          {/* Itemized Options Breakdown */}
          <div className="flex flex-col gap-2">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-400 border-b border-white/10 pb-1.5">
              {config.language === 'VIE' ? 'Chi Tiáº¿t Trang Bá»‹ TĂ¹y Chá»n' : 'Selected Specifications & Options'}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
              {/* Exterior Color */}
              <div className="flex items-center justify-between p-2.5 rounded bg-white/5 border border-white/5">
                <div className="flex items-center gap-2.5">
                  <div
                    className="w-4 h-4 rounded-full border border-white/40"
                    style={{ backgroundColor: config.exteriorColor.hex }}
                  />
                  <div>
                    <div className="font-semibold text-white">{config.exteriorColor.name}</div>
                    <div className="text-[10px] text-neutral-400 uppercase">{config.exteriorColor.finish} Â· {config.exteriorColor.category}</div>
                  </div>
                </div>
                <div className="font-mono text-amber-400">
                  {breakdown.exteriorColorPrice === 0 ? 'Standard' : formatCurrency(breakdown.exteriorColorPrice, config.currency, config.language)}
                </div>
              </div>

              {/* Rims */}
              <div className="flex items-center justify-between p-2.5 rounded bg-white/5 border border-white/5">
                <div>
                  <div className="font-semibold text-white">{config.rim.name}</div>
                  <div className="text-[10px] text-neutral-400">{config.rim.size} Â· {config.rim.finish}</div>
                </div>
                <div className="font-mono text-amber-400">
                  {formatCurrency(breakdown.rimPrice, config.currency, config.language)}
                </div>
              </div>

              {/* Calipers */}
              <div className="flex items-center justify-between p-2.5 rounded bg-white/5 border border-white/5">
                <div className="flex items-center gap-2.5">
                  <div className="w-3.5 h-3.5 rounded border border-white/30" style={{ backgroundColor: config.caliper.hex }} />
                  <div>
                    <div className="font-semibold text-white">Carbon Ceramic Calipers</div>
                    <div className="text-[10px] text-neutral-400">{config.caliper.name}</div>
                  </div>
                </div>
                <div className="font-mono text-amber-400">
                  {breakdown.caliperPrice === 0 ? 'Standard' : formatCurrency(breakdown.caliperPrice, config.currency, config.language)}
                </div>
              </div>

              {/* Carbon Lower */}
              <div className="flex items-center justify-between p-2.5 rounded bg-white/5 border border-white/5">
                <div>
                  <div className="font-semibold text-white">Lower Aerodynamic Package</div>
                  <div className="text-[10px] text-neutral-400">{config.carbonLower.replace('_', ' ').toUpperCase()}</div>
                </div>
                <div className="font-mono text-amber-400">
                  {breakdown.carbonLowerPrice === 0 ? 'Included' : formatCurrency(breakdown.carbonLowerPrice, config.currency, config.language)}
                </div>
              </div>

              {/* Carbon Upper */}
              <div className="flex items-center justify-between p-2.5 rounded bg-white/5 border border-white/5">
                <div>
                  <div className="font-semibold text-white">Upper Carbon Roof & Mirrors</div>
                  <div className="text-[10px] text-neutral-400">{config.carbonUpper.replace('_', ' ').toUpperCase()}</div>
                </div>
                <div className="font-mono text-amber-400">
                  {breakdown.carbonUpperPrice === 0 ? 'Included' : formatCurrency(breakdown.carbonUpperPrice, config.currency, config.language)}
                </div>
              </div>

              {/* Exhaust */}
              <div className="flex items-center justify-between p-2.5 rounded bg-white/5 border border-white/5">
                <div>
                  <div className="font-semibold text-white">Exhaust Tailpipes</div>
                  <div className="text-[10px] text-neutral-400">{config.exhaust.replace('_', ' ').toUpperCase()}</div>
                </div>
                <div className="font-mono text-amber-400">
                  {breakdown.exhaustPrice === 0 ? 'Standard' : formatCurrency(breakdown.exhaustPrice, config.currency, config.language)}
                </div>
              </div>

              {/* Interior Trim */}
              <div className="flex items-center justify-between p-2.5 rounded bg-white/5 border border-white/5">
                <div>
                  <div className="font-semibold text-white">Cockpit Leather & Stitching</div>
                  <div className="text-[10px] text-neutral-400">{config.interiorTrim.name}</div>
                </div>
                <div className="font-mono text-amber-400">
                  {breakdown.interiorTrimPrice === 0 ? 'Standard' : formatCurrency(breakdown.interiorTrimPrice, config.currency, config.language)}
                </div>
              </div>

              {/* Carbon Interior */}
              <div className="flex items-center justify-between p-2.5 rounded bg-white/5 border border-white/5">
                <div>
                  <div className="font-semibold text-white">Carbon Steering Wheel & Corsa Dash</div>
                  <div className="text-[10px] text-neutral-400">{config.carbonInterior ? 'F1 Shift LEDs Equipped' : 'Standard'}</div>
                </div>
                <div className="font-mono text-amber-400">
                  {breakdown.carbonInteriorPrice === 0 ? 'No' : formatCurrency(breakdown.carbonInteriorPrice, config.currency, config.language)}
                </div>
              </div>
            </div>
          </div>

          {/* Pricing Total Summary Box */}
          <div className="p-4 rounded-xl bg-black/60 border border-white/10 flex flex-col gap-2">
            <div className="flex items-center justify-between text-xs text-neutral-400">
              <span>{config.language === 'VIE' ? 'GiĂ¡ TiĂªu Chuáº©n Xe (Base MSRP)' : 'Base Vehicle MSRP'}</span>
              <span className="font-mono text-neutral-200">
                {formatCurrency(breakdown.basePrice, config.currency, config.language)}
              </span>
            </div>

            <div className="flex items-center justify-between text-xs text-neutral-400">
              <span>{config.language === 'VIE' ? 'Tá»•ng Trang Bá»‹ TĂ¹y Chá»n (Options Total)' : 'Custom Equipment & Options'}</span>
              <span className="font-mono text-amber-400">
                +{formatCurrency(breakdown.totalPrice - breakdown.basePrice, config.currency, config.language)}
              </span>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-white/10 text-sm md:text-base font-bold">
              <span className="text-white uppercase tracking-wider">
                {config.language === 'VIE' ? 'Tá»•ng GiĂ¡ Trá»‹ Dá»± Kiáº¿n (Total MSRP)' : 'Total Estimated Price'}
              </span>
              <span className="font-mono text-amber-400 text-lg md:text-xl">
                {formatCurrency(breakdown.totalPrice, config.currency, config.language)}
              </span>
            </div>
          </div>

          {/* Authorized Dealership Info (Vietnam / Global) */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-xl bg-white/5 border border-white/10 text-xs">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <div className="font-semibold text-white">
                  {config.currency === 'VND' || config.language === 'VIE'
                    ? 'Äáº¡i LĂ½ á»¦y Quyá»n ChĂ­nh Thá»©c Lamborghini Vietnam'
                    : 'Official Lamborghini Authorized Dealership'}
                </div>
                <div className="text-neutral-400 mt-0.5">
                  {config.currency === 'VND' || config.language === 'VIE'
                    ? 'Showroom Lamborghini Ho Chi Minh City Â· Q.7, TP. Há»“ ChĂ­ Minh / Showroom Lamborghini Hanoi Â· Q. HoĂ n Kiáº¿m, HĂ  Ná»™i'
                    : 'Via Modena 12, Sant\'Agata Bolognese (BO), Italy / Global Concierge Network'}
                </div>
              </div>
            </div>

            <button onClick={() => { onClose(); navigate("/showroom"); }} className="flex items-center gap-2 px-3 py-2 rounded border border-amber-400/40 text-amber-400 font-semibold text-xs tracking-wider uppercase whitespace-nowrap hover:bg-amber-400/10 transition-colors cursor-pointer"><MapPin className="w-3.5 h-3.5" /><span>Xem Showroom</span></button>

            <a
              href="tel:+842838221888"
              className="flex items-center gap-2 px-3 py-2 rounded bg-amber-400 text-black font-semibold text-xs tracking-wider uppercase whitespace-nowrap hover:bg-amber-300 transition-colors shadow"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>{config.language === 'VIE' ? 'LiĂªn Há»‡ Äáº·t Xe' : 'Contact Dealer'}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

