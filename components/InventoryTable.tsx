import React, { useState, useEffect, useRef } from 'react';
import { InventoryData } from '../types';
import { StatusPill } from './StatusPill';
import { Language, locales } from '../locales';
import { ProductSelector } from './ProductSelector';
import useMediaQuery from '../hooks/useMediaQuery';

interface InventoryTableProps {
  data: InventoryData;
  language: Language;
}

export const InventoryTable: React.FC<InventoryTableProps> = ({ data, language }) => {
  const { products: allProducts, stores } = data;
  const isMobile = useMediaQuery('(max-width: 767px)');
  const isMobileRef = useRef(isMobile);
  isMobileRef.current = isMobile;

  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const prevProductsKey = useRef<string | null>(null);

  useEffect(() => {
    const newProductsKey = JSON.stringify([...allProducts].sort());
    if (newProductsKey !== prevProductsKey.current) {
      if (isMobileRef.current) {
        setSelectedProducts(allProducts.slice(0, 1));
      } else {
        setSelectedProducts(allProducts);
      }
      prevProductsKey.current = newProductsKey;
    }
  }, [allProducts]);

  const productsToDisplay = selectedProducts;

  return (
    <div className="flex flex-col animate-fade-in items-center w-full">
      <div className="mb-6 w-full max-w-sm self-center">
        <ProductSelector
          allProducts={allProducts}
          selectedProducts={selectedProducts}
          onChange={setSelectedProducts}
          language={language}
        />
      </div>

      {/* Main Vintage Border Container */}
      <div className="w-full max-w-[95vw] lg:max-w-7xl relative mx-auto p-1.5 md:p-2 border-[1.5px] border-[#692020] dark:border-[#A04040] bg-[#F7F2E6] dark:bg-[#1A1211] shadow-[4px_4px_12px_rgba(0,0,0,0.1)]">
        <div className="border-[3px] border-[#692020] dark:border-[#A04040] p-4 md:p-8 relative">
          
          {/* Corner Decorations */}
          <div className="absolute top-1 left-1 w-3 h-3 border-t-2 border-l-2 border-[#692020] dark:border-[#A04040]" />
          <div className="absolute top-1 right-1 w-3 h-3 border-t-2 border-r-2 border-[#692020] dark:border-[#A04040]" />
          <div className="absolute bottom-1 left-1 w-3 h-3 border-b-2 border-l-2 border-[#692020] dark:border-[#A04040]" />
          <div className="absolute bottom-1 right-1 w-3 h-3 border-b-2 border-r-2 border-[#692020] dark:border-[#A04040]" />

          {/* Heading Section inside the box */}
          <div className="text-center mb-8">
            <div className="inline-block border-y border-[#692020] dark:border-[#A04040] px-4 py-1 mb-6">
              <span className="text-xs md:text-sm font-bold tracking-widest text-[#692020] dark:text-[#C58B8B]">
                - TAVERN COLLAB MERCH INVENTORY -
              </span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black tracking-wider text-[#4A1E1E] dark:text-[#EAEAEA] mb-2 uppercase drop-shadow-sm font-serif">
              GOODS LIST
            </h2>
          </div>

          {/* Table Container */}
          <div className="w-full overflow-hidden">
            <div className="overflow-x-auto pb-6">
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
                  {stores.map((store) => (
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
                  {productsToDisplay.length === 0 && stores.length > 0 && (
                    <tr>
                      <td colSpan={1 + allProducts.length} className="text-center py-16 text-[#692020] dark:text-[#A04040] font-serif italic text-lg tracking-wider">
                        表示する商品を選択してください。
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