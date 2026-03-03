import React, { useState, useRef, useEffect } from 'react';
import { Language, locales } from '../locales';

interface StoreSelectorProps {
  allStores: string[];
  selectedStores: string[];
  onChange: (selected: string[]) => void;
  language: Language;
}

/**
 * A dropdown component with checkboxes for selecting which stores to display.
 * @param {StoreSelectorProps} props The component props.
 * @returns {JSX.Element} The rendered store selector component.
 */
export const StoreSelector: React.FC<StoreSelectorProps> = ({
  allStores,
  selectedStores,
  onChange,
  language,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const handleToggle = (store: string) => {
    const currentIndex = selectedStores.indexOf(store);
    const newSelected = [...selectedStores];

    if (currentIndex === -1) {
      newSelected.push(store);
    } else {
      newSelected.splice(currentIndex, 1);
    }
    onChange(newSelected);
  };

  const handleSelectAll = () => {
    onChange([...allStores]);
  };
  
  const handleClear = () => {
    onChange([]);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef]);


  return (
    <div className="relative inline-block text-left w-full" ref={wrapperRef}>
      <div>
        <button
          type="button"
          className="inline-flex justify-between items-center w-full rounded-xl border-2 border-gray-300 dark:border-gray-500 shadow-lg px-4 sm:px-6 py-3 sm:py-4 bg-white dark:bg-gray-700 text-sm sm:text-base md:text-xl font-bold text-[#4A1E1E] dark:text-[#EAEAEA] hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-4 focus:ring-indigo-500/50 transition-all duration-200"
          id="store-options-menu"
          aria-haspopup="true"
          aria-expanded={isOpen}
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="truncate">{locales.selectStores[language]} ({selectedStores.length})</span>
          <svg className="-mr-1 ml-3 h-6 w-6 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 01-1.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>

      {isOpen && (
        <div
          className="origin-top-left absolute left-0 mt-2 w-full rounded-md shadow-lg bg-white dark:bg-gray-700 ring-1 ring-black ring-opacity-5 focus:outline-none z-40"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="store-options-menu"
        >
          <div className="py-1 max-h-72 overflow-y-auto" role="none">
            <button
                onClick={handleSelectAll}
                className="w-full text-left px-4 py-2 text-base text-indigo-600 dark:text-indigo-400 hover:bg-gray-100 dark:hover:bg-gray-600 font-medium"
                role="menuitem"
              >
                {locales.selectAll[language]}
              </button>
            <button
                onClick={handleClear}
                className="w-full text-left px-4 py-2 text-base text-indigo-600 dark:text-indigo-400 hover:bg-gray-100 dark:hover:bg-gray-600 font-medium"
                role="menuitem"
              >
                {locales.clearSelection[language]}
              </button>
              <div className="border-t border-gray-200 dark:border-gray-600 my-1"></div>
            {allStores.map((store) => (
              <label
                key={store}
                className="flex items-center px-4 py-2 text-base text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer"
              >
                <input
                  type="checkbox"
                  className="h-5 w-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  checked={selectedStores.includes(store)}
                  onChange={() => handleToggle(store)}
                />
                <span className="ml-3 truncate">{store}</span>
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
