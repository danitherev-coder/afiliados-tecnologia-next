'use client'

import React from 'react';
import { Cpu, Mail, Globe } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-white transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo and Description */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-2 rounded-lg">
                <Cpu className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold">InnovaByte</span>
            </div>
            <p className="text-gray-300 max-w-md">
              {t('footer.description')}
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">{t('footer.quickLinks')}</h3>
            <ul className="space-y-2 text-gray-300">
              <li><a href="/" className="hover:text-white transition-colors">{t('nav.home')}</a></li>
              <li><a href="#productos" className="hover:text-white transition-colors">{t('nav.products')}</a></li>
              <li><a href="#categorias" className="hover:text-white transition-colors">{t('nav.categories')}</a></li>
              <li><a href="#contacto" className="hover:text-white transition-colors">{t('nav.contact')}</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">{t('footer.contact')}</h3>
            <div className="space-y-3 text-gray-300">
              <div className="flex items-center space-x-2">
                <Mail className="h-5 w-5" />
                <span>info@innovabyte.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Globe className="h-5 w-5" />
                <span>www.innovabyte.com</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2025 InnovaByte. {t('footer.copyright')}</p>
          <p className="text-sm mt-2">
            {t('footer.affiliate')}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;