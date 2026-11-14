import React from 'react';
import type { PhuTung } from '../types';

interface PhuTungListSectionProps {
  danhSachPhuTung: PhuTung[];
  excludeNames?: string[]; // Loại trừ các tên đã hiển thị ở sections khác
}

export const PhuTungListSection: React.FC<PhuTungListSectionProps> = ({ 
  danhSachPhuTung, 
  excludeNames = ['Powertrain', 'Exterior', 'Interior', 'Engine Sound', 'LDVI', 'Driving Dynamics', 'Spaceframe', 'Monofuselage']
}) => {
  // Filter: Chỉ lấy phụ tùng CHƯA được hiển thị ở sections khác
  const remainingPhuTung = danhSachPhuTung.filter(pt => 
    !excludeNames.some(name => pt.tenPhuTung.toLowerCase().includes(name.toLowerCase()))
  );

  if (remainingPhuTung.length === 0) return null;

  return (
    <section className="relative w-full bg-lambo-bold-black py-20 border-b border-[#1c1810]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        {/* Header */}
        <div className="text-[11px] sm:text-xs font-semibold tracking-[0.24em] text-lambo-primary uppercase mb-3">
          ADDITIONAL FEATURES
        </div>

        <h2
          className="text-3xl sm:text-5xl md:text-6xl font-black uppercase text-white tracking-tight leading-tight mb-12 font-barlow"
        >
          MORE ABOUT THIS MODEL
        </h2>

        {/* Grid of remaining phụ tùng */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {remainingPhuTung.map((phuTung) => (
            <div 
              key={phuTung.maPhuTung}
              className="border border-[#383020] bg-[#0c0c0c] p-6 hover:border-lambo-primary transition-all duration-300 group"
            >
              {/* Title */}
              <h3 
                className="text-xl sm:text-2xl font-bold uppercase text-white tracking-wide mb-4 group-hover:text-lambo-primary transition-colors font-barlow"
              >
                {phuTung.tenPhuTung}
              </h3>

              {/* Description */}
              <p className="text-sm text-[#a3a3a3] leading-relaxed">
                {phuTung.moTa}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PhuTungListSection;
