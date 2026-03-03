import React, { useState, useEffect, useRef } from 'react';
import { InventoryData } from '../types';
import { StatusPill } from './StatusPill';
import { Language, locales } from '../locales';
import { ProductSelector } from './ProductSelector';
import useMediaQuery from '../hooks/useMediaQuery';

import { StoreSelector } from './StoreSelector';

interface InventoryTableProps {
  data: InventoryData;
  language: Language;
}

export const InventoryTable: React.FC<InventoryTableProps> = ({ data, language }) => {
  const { products: allProducts, stores: allStoresData } = data;
  const isMobile = useMediaQuery('(max-width: 767px)');
  const isMobileRef = useRef(isMobile);
  isMobileRef.current = isMobile;

  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [selectedStores, setSelectedStores] = useState<string[]>([]);
  const prevDataKey = useRef<string | null>(null);

  useEffect(() => {
    const newDataKey = JSON.stringify({
      products: [...allProducts].sort(),
      stores: allStoresData.map(s => s.name).sort()
    });

    if (newDataKey !== prevDataKey.current) {
      // Products init
      if (isMobileRef.current) {
        setSelectedProducts(allProducts.slice(0, 1));
      } else {
        setSelectedProducts(allProducts);
      }
      
      // Stores init: all selected by default
      setSelectedStores(allStoresData.map(s => s.name));
      
      prevDataKey.current = newDataKey;
    }
  }, [allProducts, allStoresData]);

  const productsToDisplay = selectedProducts;
  const storesToDisplay = allStoresData.filter(store => selectedStores.includes(store.name));

  return (
    <div className="flex flex-col animate-fade-in items-center w-full">
      <div className="mb-8 w-full flex flex-col md:flex-row justify-center items-center gap-4 md:gap-8 px-4">
        <div className="w-full max-w-xs md:max-w-sm">
          <StoreSelector
            allStores={allStoresData.map(s => s.name)}
            selectedStores={selectedStores}
            onChange={setSelectedStores}
            language={language}
          />
        </div>
        <div className="w-full max-w-xs md:max-w-sm">
          <ProductSelector
            allProducts={allProducts}
            selectedProducts={selectedProducts}
            onChange={setSelectedProducts}
            language={language}
          />
        </div>
      </div>

      {/* Modern Vintage Border Container */}
      <div className="w-full max-w-[95vw] lg:max-w-7xl relative mx-auto p-1.5 md:p-2 border-[1.5px] border-[#692020] dark:border-[#A04040] bg-[#F7F2E6] dark:bg-[#1A1211] shadow-[4px_4px_12px_rgba(0,0,0,0.1)] mb-12">
        <div className="border-[3px] border-[#692020] dark:border-[#A04040] p-4 md:p-8 relative">
          
          {/* Corner Decorations */}
          <div className="absolute top-1 left-1 w-3 h-3 border-t-2 border-l-2 border-[#692020] dark:border-[#A04040]" />
          <div className="absolute top-1 right-1 w-3 h-3 border-t-2 border-r-2 border-[#692020] dark:border-[#A04040]" />
          <div className="absolute bottom-1 left-1 w-3 h-3 border-b-2 border-l-2 border-[#692020] dark:border-[#A04040]" />
          <div className="absolute bottom-1 right-1 w-3 h-3 border-b-2 border-r-2 border-[#692020] dark:border-[#A04040]" />

          {/* Heading Section */}
          <div className="text-center mb-10 md:mb-14">
            <div className="inline-block border-y border-[#692020] dark:border-[#A04040] px-4 py-1 mb-4 md:mb-6">
              <span className="text-[10px] md:text-sm font-bold tracking-[0.2em] text-[#692020] dark:text-[#C58B8B]">
                - TAVERN COLLAB MERCH INVENTORY -
              </span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black tracking-wider text-[#4A1E1E] dark:text-[#EAEAEA] mb-2 uppercase drop-shadow-sm font-serif underline decoration-[#692020]/20 underline-offset-8">
              GOODS LIST
            </h2>
          </div>

          <div className="w-full overflow-hidden">
            {/* Mobile Card-style Layout (visible on small screens) */}
            <div className="md:hidden space-y-10">
              {storesToDisplay.map((store) => (
                <div key={store.name} className="animate-fade-in bg-white dark:bg-[#1A1211] rounded-[2.5rem] shadow-sm border border-[#692020]/5 overflow-hidden transition-all duration-300">
                  <div className="p-8">
                    <div className="text-center mb-6">
                      <h3 className="text-2xl font-black text-[#4A1E1E] dark:text-[#EAEAEA] tracking-wide font-serif inline-flex items-center">
                        {store.name}
                        <svg className="w-5 h-5 ml-2 text-gray-300 dark:text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                        </svg>
                      </h3>
                    </div>
                    
                    {/* Item List with Side-by-Side Good Name and Status */}
                    <div className="border-t border-gray-100 dark:border-gray-800 pt-6 space-y-6">
                      {productsToDisplay.map((product) => (
                        <div key={`${store.name}-${product}`} className="flex justify-between items-center group">
                          <span className="text-sm font-bold text-[#4A1E1E] dark:text-[#EAEAEA] max-w-[65%] leading-snug font-serif whitespace-pre-wrap uppercase tracking-tight">
                            {product}
                          </span>
                          <div className="flex-shrink-0 scale-90 sm:scale-100 origin-right transition-transform group-hover:scale-105">
                            <StatusPill status={store.status[product]} language={language} />
                          </div>
                        </div>
                      ))}
                      {productsToDisplay.length === 0 && (
                        <p className="text-center py-4 italic text-[#692020]/30 text-sm">表示する商品を選択してください</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              {storesToDisplay.length === 0 && (
                <div className="text-center py-16 text-[#692020] dark:text-[#A04040] font-serif italic text-lg tracking-wider bg-white/50 rounded-[40px] border border-dashed border-[#692020]/20">
                  表示する店名を選択してください。
                </div>
              )}
            </div>

            {/* Desktop Table (hidden md:block) */}
            <div className="hidden md:block overflow-x-auto pb-6">
              <table className="min-w-full text-left border-collapse">
                <thead>
                  <tr className="border-y-[2px] border-[#692020] dark:border-[#A04040] relative">
                    <th scope="col" className="py-4 px-4 font-serif font-black text-sm md:text-lg text-[#4A1E1E] dark:text-[#D4A3A3] uppercase tracking-widest min-w-[10rem] md:min-w-[14rem] sticky left-0 z-30 bg-[#F7F2E6] dark:bg-[#1A1211]">
                      {locales.storeName[language]}
                    </th>
                    {productsToDisplay.map((product) => (
                      <th key={product} scope="col" className="py-4 px-4 font-serif font-black text-sm md:text-lg text-[#4A1E1E] dark:text-[#D4A3A3] uppercase tracking-widest min-w-[8rem] whitespace-pre-line text-center">
                        {product}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y-[1.5px] divide-[#692020] dark:divide-[#A04040]">
                  {storesToDisplay.map((store) => (
                    <tr key={store.name} className="group relative hover:bg-[#F0E6D2] dark:hover:bg-[#2C1F1D] transition-colors duration-400">
                      <td className="py-6 px-4 font-serif font-bold text-[#4A1E1E] dark:text-[#EAEAEA] sticky left-0 z-20 bg-[#F7F2E6] dark:bg-[#1A1211] group-hover:bg-[#F0E6D2] dark:group-hover:bg-[#2C1F1D] min-w-[10rem] md:min-w-[14rem] max-w-[16rem] text-sm md:text-lg tracking-wide transition-colors duration-400">
                        {store.name}
                      </td>
                      {productsToDisplay.map((product) => (
                        <td key={`${store.name}-${product}`} className="py-6 px-4 text-center align-middle relative">
                          <StatusPill status={store.status[product]} language={language} />
                        </td>
                      ))}
                    </tr>
                  ))}
                  {(productsToDisplay.length === 0 || storesToDisplay.length === 0) && allStoresData.length > 0 && (
                    <tr>
                      <td colSpan={1 + productsToDisplay.length} className="text-center py-16 text-[#692020] dark:text-[#A04040] font-serif italic text-lg tracking-wider">
                        表示する項目を選択してください。
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};