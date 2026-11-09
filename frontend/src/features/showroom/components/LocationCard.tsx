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
 * LocationCard - Thiết kế theo Dealership.svg
 * Cấu trúc 4 blocks với màu nền xen kẽ:
 * 1. Showroom Info (bg #282928)
 * 2. Services (bg #040404 với border vàng)
 * 3. Booking Info (bg #282928)
 * 4. Action Buttons (bg #040404 với border vàng)
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
      className={`transition-all duration-300 cursor-pointer overflow-hidden ${
        isSelected
          ? 'border-2 border-[#D8A016] ring-2 ring-[#D8A016]/30'
          : 'border border-[#9F6B08]'
      }`}
    >
      {/* Block 1: Showroom Info - Background #282928 */}
      <div className="bg-[#282928] px-5 py-5">
        {/* Label */}
        <div className="text-[10px] font-bold tracking-[0.22em] text-[#D8A016] uppercase mb-3">
          {isSelected ? 'SELECTED / OFFICIAL SHOWROOM' : 'OFFICIAL SHOWROOM'}
        </div>

        {/* Title */}
        <h3
          className="text-lg font-extrabold uppercase text-white tracking-wide mb-3 leading-tight"
          style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
        >
          {showroom.name}
        </h3>

        {/* Contact Info Grid */}
        <div className="space-y-2 text-xs text-[#bbb]">
          <div className="flex items-start gap-2">
            <span className="text-[#D8A016] shrink-0">📍</span>
            <span>{showroom.address}</span>
          </div>
          {showroom.phone && (
            <div className="flex items-center gap-2">
              <span className="text-[#D8A016] shrink-0">📞</span>
              <span>{showroom.phone}</span>
            </div>
          )}
          <div className="flex items-center gap-2">
            <span className="text-[#D8A016] shrink-0">🕐</span>
            <span>{showroom.hours}</span>
          </div>
        </div>
      </div>

      {/* Block 2: Services - Background #040404 với border */}
      <div className="bg-[#040404] px-5 py-3 border-y border-[#9F6B08]">
        <div className="text-[9px] font-bold tracking-[0.2em] text-[#8e826b] uppercase mb-1.5">
          SERVICES AVAILABLE
        </div>
        <div className="text-[11px] text-[#D8A016] font-medium tracking-wide">
          {showroom.services}
        </div>
      </div>

      {/* Block 3: Booking Information - Background #282928 */}
      <div className="bg-[#282928] px-5 pt-3.5 pb-6">
        <div className="text-[9px] font-bold tracking-[0.2em] text-[#8e826b] uppercase mb-2">
          BOOKING INFORMATION
        </div>
        <div className="space-y-1 text-xs text-[#999]">
          <div>
            <span className="text-[#D8A016] font-semibold">3</span> specialists available
          </div>
          <div>
            Earliest: <span className="text-white font-medium">Mon 25 November</span>
          </div>
          <div>
            Showroom capacity:{' '}
            <span className="text-[#D8A016] font-semibold">35/38</span>
          </div>
        </div>
      </div>

      {/* Block 4: Action Buttons - Background #040404 với border */}
      <div className="bg-[#040404] px-5 py-4 border-t border-[#9F6B08]">
        <div className="flex gap-3">
          {/* Primary Button: SCHEDULE VISIT */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onScheduleVisit(showroom);
            }}
            className="flex-1 py-2.5 px-4 text-[11px] font-bold uppercase tracking-[0.16em] text-[#040404] bg-[#D8A016] hover:bg-[#F9CE5C] active:bg-[#9F6B08] transition-all duration-200 flex items-center justify-center gap-1.5"
            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
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
            className="flex-1 py-2.5 px-4 text-[11px] font-bold uppercase tracking-[0.16em] text-[#F7DE9F] border border-[#9F6B08] hover:border-[#D8A016] hover:bg-[#D8A016]/10 transition-all duration-200 flex items-center justify-center gap-1.5"
            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
          >
            <span>VIEW DETAILS</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
