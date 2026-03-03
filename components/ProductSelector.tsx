import React, { useState, useRef, useEffect } from 'react';
import { Language, locales } from '../locales';

interface ProductSelectorProps {
  allProducts: string[];
  selectedProducts: string[];
  onChange: (selected: string[]) => void;
  language: Language;
}

/**
 * A dropdown component with checkboxes for selecting which products to display.
 * It allows users to toggle individual products, clear the entire selection,
 * and closes automatically when clicking outside the component.
 * @param {ProductSelectorProps} props The component props.
 * @param {string[]} props.allProducts The list of all available products.
 * @param {string[]} props.selectedProducts The list of currently selected products.
 * @param {(selected: string[]) => void} props.onChange Callback function invoked when the selection changes.
 * @param {Language} props.language The current language for localization.
 * @returns {JSX.Element} The rendered product selector component.
 */
export const ProductSelector: React.FC<ProductSelectorProps> = ({
  allProducts,
  selectedProducts,
  onChange,
  language,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const handleToggle = (product: string) => {
    const currentIndex = selectedProducts.indexOf(product);
    const newSelected = [...selectedProducts];

    if (currentIndex === -1) {
      newSelected.push(product);
    } else {
      newSelected.splice(currentIndex, 1);
    }
    onChange(newSelected);
  };

  const handleSelectAll = () => {
    onChange([...allProducts]);
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
          className="inline-flex justify-between items-center w-full rounded-xl border-2 border-gray-300 dark:border-gray-500 shadow-lg px-6 py-4 bg-white dark:bg-gray-700 text-xl font-bold text-[#4A1E1E] dark:text-[#EAEAEA] hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-4 focus:ring-indigo-500/50 transition-all duration-200"
          id="options-menu"
          aria-haspopup="true"
          aria-expanded={isOpen}
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="truncate">{locales.selectProducts[language]} ({selectedProducts.length})</span>
          <svg className="-mr-1 ml-3 h-6 w-6 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 01-1.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>

      {isOpen && (
        <div
          className="origin-top-right absolute right-0 mt-2 w-full rounded-md shadow-lg bg-white dark:bg-gray-700 ring-1 ring-black ring-opacity-5 focus:outline-none z-40"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="options-menu"
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
            {allProducts.map((product) => (
              <label
                key={product}
                className="flex items-center px-4 py-2 text-base text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer"
              >
                <input
                  type="checkbox"
                  className="h-5 w-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  checked={selectedProducts.includes(product)}
                  onChange={() => handleToggle(product)}
                />
                <span className="ml-3 whitespace-pre-line">{product}</span>
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};