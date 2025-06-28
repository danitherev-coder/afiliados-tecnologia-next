'use client'

import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'es' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  es: {
    // Header
    'search.placeholder': 'Buscar productos...',
    'categories.all': 'Todas',
    'categories.laptops': 'Laptops',
    'categories.smartphones': 'Smartphones',
    'categories.audio': 'Audio',
    'categories.tablets': 'Tablets',
    'categories.wearables': 'Wearables',
    'categories.accessories': 'Accesorios',
    'categories.components': 'Componentes PC',
    
    // Hero
    'hero.title': 'InnovaByte',
    'hero.subtitle': 'Tu guía confiable en tecnología actual. Descubre, compara y compra con confianza.',
    'hero.feature1.title': 'Productos Curados',
    'hero.feature1.description': 'Seleccionamos solo los mejores productos tecnológicos del mercado',
    'hero.feature2.title': 'Últimas Tendencias',
    'hero.feature2.description': 'Mantente al día con las innovaciones más recientes en tecnología',
    'hero.feature3.title': 'Compra Segura',
    'hero.feature3.description': 'Enlaces directos a tiendas oficiales para garantizar tu seguridad',
    
    // Product Card
    'product.featured': 'Destacado',
    'product.viewMore': 'Ver más',
    'product.buy': 'Comprar',
    'product.seeMore': 'Ver más productos',
    
    // Navigation
    'nav.home': 'Inicio',
    'nav.products': 'Productos',
    'nav.categories': 'Categorías',
    'nav.contact': 'Contacto',
    'nav.back': 'Volver al inicio',
    'nav.backToProducts': 'Volver a productos',
    
    // Search
    'search.results': 'Resultados para',
    'search.productsFound': 'productos encontrados',
    'search.noResults': 'No se encontraron productos para',
    'search.tryOtherTerms': 'Intenta con otros términos de búsqueda',
    'search.viewAllResults': 'Ver todos los resultados para',
    'search.viewAllProducts': 'Ver todos los productos',
    
    // Product Detail
    'product.description': 'Descripción',
    'product.buyNow': 'Comprar ahora',
    'product.redirectMessage': 'Serás redirigido a la tienda oficial del producto',
    
    // Pagination
    'pagination.previous': 'Anterior',
    'pagination.next': 'Siguiente',
    
    // Filters
    'filters.title': 'Filtros',
    'sort.relevance': 'Más relevantes',
    'sort.priceLow': 'Menor precio',
    'sort.priceHigh': 'Mayor precio',
    'sort.newest': 'Más nuevos',
    'sort.bestseller': 'Más vendidos',
    
    // Footer
    'footer.description': 'Tu guía confiable en tecnología actual. Descubre, compara y compra con confianza los mejores productos tecnológicos del mercado.',
    'footer.quickLinks': 'Enlaces Rápidos',
    'footer.contact': 'Contacto',
    'footer.copyright': 'Todos los derechos reservados.',
    'footer.affiliate': 'Los enlaces de productos pueden generar comisiones de afiliados que nos ayudan a mantener este sitio.',
  },
  en: {
    // Header
    'search.placeholder': 'Search products...',
    'categories.all': 'All',
    'categories.laptops': 'Laptops',
    'categories.smartphones': 'Smartphones',
    'categories.audio': 'Audio',
    'categories.tablets': 'Tablets',
    'categories.wearables': 'Wearables',
    'categories.accessories': 'Accessories',
    'categories.components': 'PC Components',
    
    // Hero
    'hero.title': 'InnovaByte',
    'hero.subtitle': 'Your trusted guide in current technology. Discover, compare and buy with confidence.',
    'hero.feature1.title': 'Curated Products',
    'hero.feature1.description': 'We select only the best tech products on the market',
    'hero.feature2.title': 'Latest Trends',
    'hero.feature2.description': 'Stay up to date with the latest innovations in technology',
    'hero.feature3.title': 'Secure Shopping',
    'hero.feature3.description': 'Direct links to official stores to guarantee your security',
    
    // Product Card
    'product.featured': 'Featured',
    'product.viewMore': 'View more',
    'product.buy': 'Buy',
    'product.seeMore': 'See more products',
    
    // Navigation
    'nav.home': 'Home',
    'nav.products': 'Products',
    'nav.categories': 'Categories',
    'nav.contact': 'Contact',
    'nav.back': 'Back to home',
    'nav.backToProducts': 'Back to products',
    
    // Search
    'search.results': 'Results for',
    'search.productsFound': 'products found',
    'search.noResults': 'No products found for',
    'search.tryOtherTerms': 'Try other search terms',
    'search.viewAllResults': 'View all results for',
    'search.viewAllProducts': 'View all products',
    
    // Product Detail
    'product.description': 'Description',
    'product.buyNow': 'Buy now',
    'product.redirectMessage': 'You will be redirected to the official product store',
    
    // Pagination
    'pagination.previous': 'Previous',
    'pagination.next': 'Next',
    
    // Filters
    'filters.title': 'Filters',
    'sort.relevance': 'Most relevant',
    'sort.priceLow': 'Lowest price',
    'sort.priceHigh': 'Highest price',
    'sort.newest': 'Newest',
    'sort.bestseller': 'Best sellers',
    
    // Footer
    'footer.description': 'Your trusted guide in current technology. Discover, compare and buy with confidence the best tech products on the market.',
    'footer.quickLinks': 'Quick Links',
    'footer.contact': 'Contact',
    'footer.copyright': 'All rights reserved.',
    'footer.affiliate': 'Product links may generate affiliate commissions that help us maintain this site.',
  }
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('es');

  useEffect(() => {
    const saved = localStorage.getItem('language');
    if (saved) {
      setLanguage(saved as Language);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('language', language);
    document.documentElement.lang = language;
  }, [language]);

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};