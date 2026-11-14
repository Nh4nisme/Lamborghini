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
 * LocationCard - Chuẩn thiết kế tối giản Lamborghini Dealership
 * Thiết kế nguyên bản theo đúng hình UI thiết kế:
 * - Nền xám than đậm (#232323), phẳng, không chia block rườm rà
 * - Viền vàng gold nổi bật khi được chọn (border-2 border-lambo-primary)
 * - Typography Barlow Condensed chuẩn nhận diện thương hiệu
 * - Nút bấm viền vàng gold sang trọng: REQUEST APPOINTMENT (khi chọn) hoặc VIEW DETAILS
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
      className={`p-5 sm:p-6 transition-all duration-200 cursor-pointer flex flex-col justify-between gap-3.5 bg-[#232323] ${
        isSelected
          ? 'border-2 border-lambo-primary shadow-xl shadow-black/70'
          : 'border border-transparent hover:border-[#3a3a3a]'
      }`}
    >
      <div className="space-y-2.5">
        {/* 1. Category / Sub-tag */}
        <div className="text-[10px] sm:text-[11px] font-bold tracking-[0.22em] text-lambo-primary uppercase font-barlow">
          {isSelected ? 'SELECTED / SAMPLE LOCATION' : 'SAMPLE LOCATION'}
        </div>

        {/* 2. Showroom Title */}
        <h3 className="font-barlow text-2xl sm:text-[26px] font-black uppercase text-[#F3EFE6] tracking-wide leading-tight">
          {showroom.name}
        </h3>

        {/* 3. Address / Description (Clean plain text, không emoji) */}
        <p className="text-xs text-[#a09d96] leading-relaxed font-light">
          {showroom.address || showroom.description || 'Showroom address — to be confirmed. This is a placeholder location, not an official dealership listing.'}
        </p>

        {/* 4. Services line */}
        <div className="text-xs text-lambo-primary font-medium tracking-wide">
          {showroom.services || 'Sales consultation · Personalization · Service enquiry'}
        </div>
      </div>

      {/* 5. Action Button (Bám sát thiết kế: nút nền đen, viền vàng, chữ vàng, kích thước vừa vặn) */}
      <div className="pt-1.5">
        {isSelected ? (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onScheduleVisit(showroom);
            }}
            className="w-fit py-2 px-5 bg-black border border-lambo-primary text-lambo-primary hover:bg-lambo-primary hover:text-black transition-colors font-barlow text-xs font-bold uppercase tracking-[0.18em] flex items-center gap-2 cursor-pointer"
          >
            <span>REQUEST APPOINTMENT</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        ) : (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onViewDetails(showroom);
            }}
            className="w-fit py-2 px-5 bg-black border border-lambo-primary text-lambo-primary hover:bg-lambo-primary hover:text-black transition-colors font-barlow text-xs font-bold uppercase tracking-[0.18em] flex items-center gap-2 cursor-pointer"
          >
            <span>VIEW DETAILS</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </div>
  );
};
