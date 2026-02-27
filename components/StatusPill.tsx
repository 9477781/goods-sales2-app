import React from 'react';
import { ProductStatus } from '../types';
import { Language, statusTranslations } from '../locales';

interface StatusPillProps {
  status: ProductStatus;
  language: Language;
}

export const StatusPill: React.FC<StatusPillProps> = ({ status, language }) => {
  const text = statusTranslations[status]?.[language] || status;

  if (status === ProductStatus.SoldOut) {
    return (
      <div className="inline-block transform -rotate-6 border-[3px] border-[#A82424] text-[#A82424] dark:border-[#D14F4F] dark:text-[#D14F4F] px-4 py-1 text-base md:text-2xl font-black tracking-widest uppercase opacity-90 select-none shadow-sm rounded-sm" style={{ textShadow: "1px 1px 0px rgba(168, 36, 36, 0.2)"}}>
        SOLD OUT
      </div>
    );
  }

  if (status === ProductStatus.InStock) {
    return (
      <span className="text-[#4A1E1E] dark:text-[#D4A3A3] text-sm md:text-lg font-serif font-black tracking-widest uppercase">
        {text}
      </span>
    );
  }

  return (
    <span className="text-[#692020] dark:text-[#A04040] text-sm md:text-lg font-serif font-bold tracking-widest uppercase opacity-70">
      {text}
    </span>
  );
};
