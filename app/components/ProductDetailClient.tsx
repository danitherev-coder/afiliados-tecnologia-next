'use client'

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, ExternalLink, Tag, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

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

interface ProductDetailClientProps {
  product: Product;
}

const ProductDetailClient: React.FC<ProductDetailClientProps> = ({ product }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { t } = useLanguage();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleBuyClick = () => {
    window.open(product.affiliateLink, '_blank', 'noopener,noreferrer');
  };

  const nextImage = () => {
    if (product.images.length > 1) {
      setCurrentImageIndex((prev) => 
        prev === product.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (product.images.length > 1) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? product.images.length - 1 : prev - 1
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400 mb-8">
          <Link href="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            {t('nav.home')}
          </Link>
          <span>/</span>
          <span className="text-gray-900 dark:text-white">{product.name}</span>
        </nav>

        {/* Back Button */}
        <Link
          href="/"
          className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 mb-8 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          {t('nav.backToProducts')}
        </Link>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden transition-colors duration-200">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
            {/* Image Gallery */}
            <div className="space-y-4">
              <div className="relative aspect-square rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-700">
                <img
                  src={product.images[currentImageIndex]}
                  alt={`${product.name} - Imagen ${currentImageIndex + 1}`}
                  className="w-full h-full object-cover"
                />
                
                {product.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white dark:bg-gray-800 bg-opacity-90 hover:bg-opacity-100 rounded-full p-2 transition-all duration-200"
                    >
                      <ChevronLeft className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white dark:bg-gray-800 bg-opacity-90 hover:bg-opacity-100 rounded-full p-2 transition-all duration-200"
                    >
                      <ChevronRight className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                    </button>
                  </>
                )}
              </div>

              {/* Thumbnail Gallery */}
              {product.images.length > 1 && (
                <div className="flex space-x-2 overflow-x-auto pb-2">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                        index === currentImageIndex
                          ? 'border-blue-500 ring-2 ring-blue-200 dark:ring-blue-800'
                          : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${product.name} - Miniatura ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <div className="flex items-center space-x-2 mb-3">
                  <span className="inline-flex items-center bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 px-3 py-1 rounded-full text-sm font-medium">
                    <Tag className="h-3 w-3 mr-1" />
                    {product.category}
                  </span>
                  {product.featured && (
                    <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {t('product.featured')}
                    </span>
                  )}
                </div>
                
                <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                  {product.name}
                </h1>
                
                {product.price && (
                  <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-6">
                    {product.price}
                  </div>
                )}
              </div>

              <div className="prose prose-gray dark:prose-invert max-w-none">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  {t('product.description')}
                </h2>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Call to Action */}
              <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
                <button
                  onClick={handleBuyClick}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-200 flex items-center justify-center space-x-2 text-lg"
                >
                  <ExternalLink className="h-5 w-5" />
                  <span>{t('product.buyNow')}</span>
                </button>
                
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center mt-3">
                  {t('product.redirectMessage')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailClient;