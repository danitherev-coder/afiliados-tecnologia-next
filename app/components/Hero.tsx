'use client'

import React from 'react';
import { Sparkles, TrendingUp, Shield } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Hero: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-purple-900/20 py-16 lg:py-24 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              {t('hero.title')}
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            {t('hero.subtitle')}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mt-12">
            <div className="flex flex-col items-center text-center p-6">
              <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full mb-4">
                <Sparkles className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {t('hero.feature1.title')}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {t('hero.feature1.description')}
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-6">
              <div className="bg-indigo-100 dark:bg-indigo-900/30 p-3 rounded-full mb-4">
                <TrendingUp className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {t('hero.feature2.title')}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {t('hero.feature2.description')}
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-6">
              <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-full mb-4">
                <Shield className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {t('hero.feature3.title')}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {t('hero.feature3.description')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;