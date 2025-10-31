import React from 'react';
import { ProductStatus } from '../types';
import { Language, statusTranslations } from '../locales';

interface StatusPillProps {
  status: ProductStatus;
  language: Language;
}

export const StatusPill: React.FC<StatusPillProps> = ({ status, language }) => {
  const getStatusClasses = () => {
    switch (status) {
      case ProductStatus.SoldOut:
        return 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-500/30';
      case ProductStatus.InStock:
        return 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-500/30';
      case ProductStatus.BeforeSale:
        return 'bg-slate-100 text-slate-800 border-slate-200 dark:bg-slate-700/50 dark:text-slate-300 dark:border-slate-500/30';
      default:
        // Fallback for any unexpected status, e.g., if data source provides a new status not yet handled.
        return 'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-300 dark:border-yellow-500/30';
    }
  };

  const baseClasses = 'w-24 md:w-28 text-center py-1.5 px-2 md:py-2 md:px-3 rounded-full text-sm md:text-base font-bold shadow-sm transition-transform transform hover:scale-105 border';

  return (
    <div className={`${baseClasses} ${getStatusClasses()} transition-colors duration-300`}>
      {statusTranslations[status]?.[language] || status}
    </div>
  );
};