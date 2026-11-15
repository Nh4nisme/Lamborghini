import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import type { ShowroomStudy } from '../data';

interface LocationCardProps {
  showroom: ShowroomStudy;
  isSelected: boolean;
  onSelect: (showroom: ShowroomStudy) => void;
  onScheduleVisit: (showroom: ShowroomStudy) => void;
  onViewDetails: (showroom: ShowroomStudy) => void;
}

/**
 * LocationCard - Thiết kế Dealership chuẩn Lamborghini Color Palette
 * 4 Blocks cấu trúc xen kẽ với theme colors:
 * 1. Showroom Info (bg-lambo-tertiary)
 * 2. Services (bg-lambo-bold-black với border lambo-pressed)
 * 3. Booking Info (bg-lambo-tertiary)
 * 4. Action Buttons (bg-lambo-bold-black với border lambo-pressed)
 */
export const LocationCard: React.FC<LocationCardProps> = ({
  showroom,
  isSelected,
  onSelect,
  onScheduleVisit,
  onViewDetails,
}) => {
  return (
    <div
      onClick={() => onSelect(showroom)}
      className={`min-h-[320px] flex flex-col transition-all duration-300 cursor-pointer overflow-hidden ${
        isSelected
          ? 'border-2 border-lambo-primary ring-2 ring-lambo-primary/30'
          : 'border border-lambo-pressed'
      }`}
    >
      {/* Block 1: Showroom Info - Background lambo-tertiary */}
      <div className="bg-lambo-tertiary px-5 py-5">
        {/* Label */}
        <div className="text-[10px] font-bold tracking-[0.22em] text-lambo-primary uppercase mb-3 font-barlow">
          {isSelected ? 'SELECTED / OFFICIAL SHOWROOM' : 'OFFICIAL SHOWROOM'}
        </div>

        {/* Title */}
        <h3 className="text-lg font-extrabold uppercase text-white tracking-wide mb-3 leading-tight font-barlow">
          {showroom.name}
        </h3>

        {/* Contact Info Grid */}
        <div className="space-y-2 text-xs text-[#bbb]">
          <div className="flex items-start gap-2">
            <span className="text-lambo-primary shrink-0">📍</span>
            <span>{showroom.address}</span>
          </div>
          {showroom.phone && (
            <div className="flex items-center gap-2">
              <span className="text-lambo-primary shrink-0">📞</span>
              <span>{showroom.phone}</span>
            </div>
          )}
          <div className="flex items-center gap-2">
            <span className="text-lambo-primary shrink-0">🕐</span>
            <span>{showroom.hours}</span>
          </div>
        </div>
      </div>

      {/* Block 2: Services - Background lambo-bold-black */}
      <div className="bg-lambo-bold-black px-5 py-3 border-y border-lambo-pressed">
        <div className="text-[9px] font-bold tracking-[0.2em] text-[#8e826b] uppercase mb-1.5 font-barlow">
          SERVICES AVAILABLE
        </div>
        <div className="text-[11px] text-lambo-primary font-medium tracking-wide">
          {showroom.services}
        </div>
      </div>

      {/* Block 3: Booking Information - Background lambo-tertiary */}
      <div className="bg-lambo-tertiary px-5 pt-3.5 pb-12">
        <div className="text-[9px] font-bold tracking-[0.2em] text-[#8e826b] uppercase mb-2 font-barlow">
          BOOKING INFORMATION
        </div>
        <div className="space-y-1 text-xs text-[#999]">
          <div>
            <span className="text-lambo-primary font-semibold">3</span> specialists available
          </div>
          <div>
            Earliest: <span className="text-white font-medium">Mon 25 November</span>
          </div>
          <div>
            Showroom capacity:{' '}
            <span className="text-lambo-primary font-semibold">35/38</span>
          </div>
        </div>
      </div>

      {/* Block 4: Action Buttons - Background lambo-bold-black */}
      <div className="bg-lambo-bold-black px-5 py-4 border-t border-lambo-pressed">
        <div className="flex gap-3">
          {/* Primary Button: SCHEDULE VISIT */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onScheduleVisit(showroom);
            }}
            className="flex-1 py-2.5 px-4 text-[11px] font-bold uppercase tracking-[0.16em] text-lambo-bold-black bg-lambo-primary hover:bg-lambo-hover active:bg-lambo-pressed transition-all duration-200 flex items-center justify-center gap-1.5 font-barlow"
          >
            <span>SCHEDULE VISIT</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>

          {/* Secondary Button: VIEW DETAILS */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onViewDetails(showroom);
            }}
            className="flex-1 py-2.5 px-4 text-[11px] font-bold uppercase tracking-[0.16em] text-lambo-secondary border border-lambo-pressed hover:border-lambo-primary hover:bg-lambo-primary/10 transition-all duration-200 flex items-center justify-center gap-1.5 font-barlow"
          >
            <span>VIEW DETAILS</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
