'use client'

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Search, Menu, X, Cpu } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import LanguageToggle from './LanguageToggle';
import ThemeToggle from './ThemeToggle';
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

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { t } = useLanguage();

  const categories = [
    { key: 'categories.all', value: 'Todas' },
    { key: 'categories.laptops', value: 'Laptops' },
    { key: 'categories.smartphones', value: 'Smartphones' },
    { key: 'categories.audio', value: 'Audio' },
    { key: 'categories.tablets', value: 'Tablets' },
    { key: 'categories.wearables', value: 'Wearables' },
    { key: 'categories.accessories', value: 'Accesorios' },
    { key: 'categories.components', value: 'Componentes PC' }
  ];

  // Búsqueda en tiempo real
  useEffect(() => {
    if (searchQuery.trim()) {
      const filtered = productsData.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5);

      setSearchResults(filtered);
      setShowResults(true);
    } else {
      setSearchResults([]);
      setShowResults(false);
    }
  }, [searchQuery]);

  // Cerrar resultados al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/buscar?q=${encodeURIComponent(searchQuery.trim())}`);
      setShowResults(false);
      setSearchQuery('');
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleCategoryClick = (category: string) => {
    if (category === 'Todas') {
      router.push('/');
    } else {
      router.push(`/categoria/${category.toLowerCase().replace(/\s+/g, '-')}`);
    }
    setIsMenuOpen(false);
  };

  const handleResultClick = () => {
    setShowResults(false);
    setSearchQuery('');
  };

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-2 rounded-lg">
              <Cpu className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900 dark:text-white">InnovaByte</span>
          </Link>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8" ref={searchRef}>
            <form onSubmit={handleSearchSubmit} className="relative w-full">
              <div className="relative flex">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <Search className="h-5 w-5" />
                </div>
                <input
                  id="search-input"
                  name="search"
                  type="text"
                  placeholder={t('search.placeholder')}
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="w-full pl-10 pr-12 py-2 border border-gray-300 dark:border-gray-600 rounded-l-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-r-lg transition-colors duration-200 flex items-center justify-center"
                >
                  <Search className="h-4 w-4" />
                </button>
              </div>

              {/* Search Results Dropdown */}
              {showResults && searchResults.length > 0 && (
                <div className="absolute top-full left-0 right-0 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg mt-1 max-h-80 overflow-y-auto z-50">
                  {searchResults.map((product) => (
                    <Link
                      key={product.id}
                      href={`/producto/${product.slug}`}
                      onClick={handleResultClick}
                      className="w-full flex items-center p-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-left"
                    >
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-12 h-12 object-cover rounded-lg mr-3"
                      />
                      <div className="flex-1">
                        <h4 className="text-sm font-medium text-gray-900 dark:text-white line-clamp-1">
                          {product.name}
                        </h4>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{product.category}</p>
                        {product.price && (
                          <p className="text-sm font-semibold text-blue-600 dark:text-blue-400">{product.price}</p>
                        )}
                      </div>
                    </Link>
                  ))}
                  {searchQuery.trim() && (
                    <Link
                      href={`/buscar?q=${encodeURIComponent(searchQuery.trim())}`}
                      onClick={handleResultClick}
                      className="w-full p-3 text-left text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors border-t border-gray-100 dark:border-gray-600"
                    >
                      {t('search.viewAllResults')} "{searchQuery}"
                    </Link>
                  )}
                </div>
              )}
            </form>
          </div>

          {/* Controls */}
          <div className="flex items-center space-x-3">
            <div className="hidden md:flex items-center space-x-2">
              <LanguageToggle />
              <ThemeToggle />
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden pb-3" ref={searchRef}>
          <form onSubmit={handleSearchSubmit} className="relative">
            <div className="relative flex">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <Search className="h-5 w-5" />
              </div>
              <input
                id="search-input-mobile"
                name="search"
                type="text"
                placeholder={t('search.placeholder')}
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-full pl-10 pr-12 py-2 border border-gray-300 dark:border-gray-600 rounded-l-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-r-lg transition-colors duration-200 flex items-center justify-center"
              >
                <Search className="h-4 w-4" />
              </button>
            </div>
          </form>
        </div>

        {/* Mobile Controls */}
        {isMenuOpen && (
          <div className="md:hidden pb-4 border-t border-gray-200 dark:border-gray-700 pt-4">
            <div className="flex items-center justify-center space-x-4 mb-4">
              <LanguageToggle />
              <ThemeToggle />
            </div>
          </div>
        )}

        {/* Categories Navigation */}
        <nav className={`${isMenuOpen ? 'block' : 'hidden'} md:block pb-4 md:pb-2`}>
          <div className="flex flex-wrap gap-2 md:gap-4">
            {categories.map((category) => (
              <button
                key={category.key}
                onClick={() => handleCategoryClick(category.value)}
                className="px-3 py-1 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-full transition-colors duration-200"
              >
                {t(category.key)}
              </button>
            ))}
          </div>
        </nav>
      </div>      
    </header>
  );
};

export default Header;