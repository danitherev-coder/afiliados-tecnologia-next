'use client'

import React from 'react';
import Link from 'next/link';
import { ExternalLink, Eye } from 'lucide-react';
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

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { t } = useLanguage();

  const handleBuyClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.open(product.affiliateLink, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-gray-700 group">
      {/* Image */}
      <div className="relative overflow-hidden rounded-t-xl">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {product.featured && (
          <div className="absolute top-3 left-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-2 py-1 rounded-full text-xs font-medium">
            {t('product.featured')}
          </div>
        )}
        {product.price && (
          <div className="absolute top-3 right-3 bg-white dark:bg-gray-800 bg-opacity-90 backdrop-blur-sm text-gray-900 dark:text-white px-2 py-1 rounded-full text-sm font-semibold">
            {product.price}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="mb-2">
          <span className="inline-block bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-1 rounded-full text-xs font-medium">
            {product.category}
          </span>
        </div>
        
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
          {product.name}
        </h3>
        
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
          {product.description}
        </p>

        {/* Actions */}
        <div className="flex space-x-2">
          <Link
            href={`/producto/${product.slug}`}
            className="flex-1 flex items-center justify-center px-3 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 rounded-lg transition-colors duration-200 text-sm font-medium"
          >
            <Eye className="h-4 w-4 mr-2" />
            {t('product.viewMore')}
          </Link>
          
          <button
            onClick={handleBuyClick}
            className="flex-1 flex items-center justify-center px-3 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-lg transition-all duration-200 text-sm font-medium"
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            {t('product.buy')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;