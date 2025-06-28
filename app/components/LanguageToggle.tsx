'use client'

import React from 'react';
import { Globe } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const LanguageToggle: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="relative">
      <button
        onClick={() => setLanguage(language === 'es' ? 'en' : 'es')}
        className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
        title={language === 'es' ? 'Switch to English' : 'Cambiar a Español'}
      >
        <Globe className="h-4 w-4 text-gray-600 dark:text-gray-300" />
        <span className="text-sm font-medium text-gray-700 dark:text-gray-200 uppercase">
          {language}
        </span>
      </button>
    </div>
  );
};

export default LanguageToggle;