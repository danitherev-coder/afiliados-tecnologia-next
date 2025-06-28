'use client'

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import ProductCard from './ProductCard';

interface Product {
  id: number;
  name: string;
  slug: string;
  description: string;
  category: string;
  images: string[];
  affiliateLink: string;
  featured?: boolean;
  price?: string;
}

interface ProductSectionProps {
  category: string;
  products: Product[];
}

const ProductSection: React.FC<ProductSectionProps> = ({ category, products }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { t } = useLanguage();
  const productsToShow = 4;
  const maxProducts = Math.min(12, products.length);
  const visibleProducts = products.slice(0, maxProducts);

  const nextSlide = () => {
    if (currentIndex < visibleProducts.length - productsToShow) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const canGoNext = currentIndex < visibleProducts.length - productsToShow;
  const canGoPrev = currentIndex > 0;

  return (
    <section className="mb-16">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">{category}</h2>
        <Link
          href={`/categoria/${category.toLowerCase().replace(/\s+/g, '-')}`}
          className="flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors"
        >
          {t('product.seeMore')}
          <ArrowRight className="h-4 w-4 ml-2" />
        </Link>
      </div>

      <div className="relative">
        <div className="overflow-hidden">
          <div 
            className="flex transition-transform duration-300 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * (100 / productsToShow)}%)` }}
          >
            {visibleProducts.map((product) => (
              <div key={product.id} className="w-1/4 flex-shrink-0 px-3">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Buttons */}
        {visibleProducts.length > productsToShow && (
          <>
            <button
              onClick={prevSlide}
              disabled={!canGoPrev}
              className={`absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-white dark:bg-gray-800 rounded-full p-2 shadow-lg transition-all duration-200 ${
                canGoPrev 
                  ? 'hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200' 
                  : 'text-gray-300 dark:text-gray-600 cursor-not-allowed'
              }`}
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            
            <button
              onClick={nextSlide}
              disabled={!canGoNext}
              className={`absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 bg-white dark:bg-gray-800 rounded-full p-2 shadow-lg transition-all duration-200 ${
                canGoNext 
                  ? 'hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200' 
                  : 'text-gray-300 dark:text-gray-600 cursor-not-allowed'
              }`}
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </>
        )}
      </div>

      {/* Indicators */}
      {visibleProducts.length > productsToShow && (
        <div className="flex justify-center mt-6 space-x-2">
          {Array.from({ length: Math.ceil(visibleProducts.length / productsToShow) }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                Math.floor(currentIndex / productsToShow) === index
                  ? 'bg-blue-600 dark:bg-blue-400'
                  : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
              }`}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default ProductSection;