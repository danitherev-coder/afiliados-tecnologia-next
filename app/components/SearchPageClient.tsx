'use client'

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Filter, ChevronDown, Search } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import ProductCard from './ProductCard';
import productsData from '../data/products.json';

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

type SortOption = 'relevance' | 'price-low' | 'price-high' | 'newest' | 'bestseller';

const SearchPageClient: React.FC = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<SortOption>('relevance');
  const [showFilters, setShowFilters] = useState(false);
  const { t } = useLanguage();
  const productsPerPage = 20;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (query.trim()) {
      const searchResults = productsData.filter(product =>
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase())
      );
      setProducts(searchResults);
      setFilteredProducts(searchResults);
    } else {
      setProducts([]);
      setFilteredProducts([]);
    }
    setCurrentPage(1);
  }, [query]);

  useEffect(() => {
    let sorted = [...products];
    
    switch (sortBy) {
      case 'price-low':
        sorted.sort((a, b) => {
          const priceA = parseFloat(a.price?.replace(/[$,]/g, '') || '0');
          const priceB = parseFloat(b.price?.replace(/[$,]/g, '') || '0');
          return priceA - priceB;
        });
        break;
      case 'price-high':
        sorted.sort((a, b) => {
          const priceA = parseFloat(a.price?.replace(/[$,]/g, '') || '0');
          const priceB = parseFloat(b.price?.replace(/[$,]/g, '') || '0');
          return priceB - priceA;
        });
        break;
      case 'newest':
        sorted.sort((a, b) => b.id - a.id);
        break;
      case 'bestseller':
        sorted.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
      default:
        break;
    }
    
    setFilteredProducts(sorted);
    setCurrentPage(1);
  }, [sortBy, products]);

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const sortOptions = [
    { value: 'relevance', label: t('sort.relevance') },
    { value: 'price-low', label: t('sort.priceLow') },
    { value: 'price-high', label: t('sort.priceHigh') },
    { value: 'newest', label: t('sort.newest') },
    { value: 'bestseller', label: t('sort.bestseller') }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400 mb-8">
          <Link href="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            {t('nav.home')}
          </Link>
          <span>/</span>
          <span className="text-gray-900 dark:text-white">Búsqueda</span>
        </nav>

        {/* Back Button */}
        <Link
          href="/"
          className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 mb-8 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          {t('nav.back')}
        </Link>

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <div className="flex items-center mb-2">
              <Search className="h-6 w-6 text-gray-400 mr-2" />
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                {t('search.results')} "{query}"
              </h1>
            </div>
            <p className="text-gray-600 dark:text-gray-300">
              {filteredProducts.length} {t('search.productsFound')}
            </p>
          </div>

          {/* Filters and Sort */}
          {filteredProducts.length > 0 && (
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-gray-700 dark:text-gray-200"
              >
                <Filter className="h-4 w-4 mr-2" />
                {t('filters.title')}
              </button>

              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="appearance-none bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 pr-8 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white"
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
              </div>
            </div>
          )}
        </div>

        {/* Products Grid */}
        {currentProducts.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
              {currentProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center space-x-2">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`px-3 py-2 rounded-lg ${
                    currentPage === 1
                      ? 'text-gray-400 dark:text-gray-600 cursor-not-allowed'
                      : 'text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20'
                  }`}
                >
                  {t('pagination.previous')}
                </button>

                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }

                  return (
                    <button
                      key={pageNum}
                      onClick={() => handlePageChange(pageNum)}
                      className={`px-3 py-2 rounded-lg ${
                        currentPage === pageNum
                          ? 'bg-blue-600 text-white'
                          : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`px-3 py-2 rounded-lg ${
                    currentPage === totalPages
                      ? 'text-gray-400 dark:text-gray-600 cursor-not-allowed'
                      : 'text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20'
                  }`}
                >
                  {t('pagination.next')}
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <Search className="h-16 w-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
            <p className="text-gray-500 dark:text-gray-400 text-lg mb-2">
              {t('search.noResults')} "{query}"
            </p>
            <p className="text-gray-400 dark:text-gray-500 mb-6">
              {t('search.tryOtherTerms')}
            </p>
            <Link
              href="/"
              className="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              {t('search.viewAllProducts')}
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPageClient;