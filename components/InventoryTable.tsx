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

/**
 * Renders a table displaying the inventory status of products across different stores.
 * It includes a product selector to filter columns and features a responsive design
 * with sticky headers and columns for better usability.
 * @param {InventoryTableProps} props The component props.
 * @param {InventoryData} props.data The inventory data to display.
 * @param {Language} props.language The current language for localization.
 * @returns {JSX.Element} The rendered inventory table component.
 */
export const InventoryTable: React.FC<InventoryTableProps> = ({ data, language }) => {
  const { products: allProducts, stores } = data;
  const isMobile = useMediaQuery('(max-width: 767px)');
  const isMobileRef = useRef(isMobile);
  isMobileRef.current = isMobile;

  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const prevProductsKey = useRef<string | null>(null);

  // This effect synchronizes the selected products state when the `allProducts` prop changes.
  // - It runs only when the list of available products from the data source actually changes.
  // - On initial load, it sets a default selection: the first product for mobile, and all products for desktop.
  // - This logic avoids resetting the user's manual selections during viewport resizes or data polling
  //   (unless the product list itself is updated).
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
    <>
      {/* Product selector is now always visible, with constrained width on desktop */}
      <div className="mb-4 md:max-w-md">
        <ProductSelector
          allProducts={allProducts}
          selectedProducts={selectedProducts}
          onChange={setSelectedProducts}
          language={language}
        />
      </div>

      <div className="w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg overflow-hidden transition-colors duration-300">
          <div className="overflow-x-auto overflow-y-auto pb-3 max-h-[calc(100vh-22rem)]"> {/* Adjusted height for selector */}
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-900 sticky top-0 z-20">
                      <tr>
                          <th scope="col" className="py-3 px-3 md:py-4 md:px-4 text-left text-sm md:text-base font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider sticky left-0 z-30 bg-gray-50 dark:bg-gray-900 transition-colors duration-300 min-w-[8rem] md:min-w-[12rem]">
                              {locales.storeName[language]}
                          </th>
                          {productsToDisplay.map((product) => (
                              <th key={product} scope="col" className="py-3 px-2 md:py-4 md:px-4 text-center text-base md:text-lg font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider min-w-[8rem] md:min-w-[10rem] whitespace-pre-line">
                                  {product}
                              </th>
                          ))}
                      </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                      {stores.map((store) => (
                          <tr key={store.name} className="group">
                              <td className="py-3 px-3 md:py-4 md:px-4 text-base md:text-lg font-medium text-gray-900 dark:text-gray-100 sticky left-0 z-10 bg-white dark:bg-gray-800 group-hover:bg-gray-50 dark:group-hover:bg-gray-700/50 transition-colors duration-200 min-w-[8rem] md:min-w-[12rem]">
                                  <div className="md:whitespace-nowrap">{store.name}</div>
                              </td>
                              {productsToDisplay.map((product) => (
                                  <td key={`${store.name}-${product}`} className="py-2 px-2 md:py-3 md:px-4 group-hover:bg-gray-50 dark:group-hover:bg-gray-700/50 transition-colors duration-200">
                                      <div className="flex justify-center">
                                        <StatusPill status={store.status[product]} language={language} />
                                      </div>
                                  </td>
                              ))}
                          </tr>
                      ))}
                      {productsToDisplay.length === 0 && stores.length > 0 && (
                          <tr>
                            <td colSpan={1 + allProducts.length} className="text-center py-8 text-gray-500 dark:text-gray-400">
                              表示する商品を選択してください。
                            </td>
                          </tr>
                      )}
                  </tbody>
              </table>
          </div>
      </div>
    </>
  );
};