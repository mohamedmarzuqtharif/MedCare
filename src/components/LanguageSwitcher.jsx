import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="flex items-center space-x-2">
      <button 
        onClick={() => changeLanguage('en')}
        className={`px-3 py-1 text-sm rounded ${i18n.language === 'en' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
      >
        English
      </button>
      <button 
        onClick={() => changeLanguage('or')}
        className={`px-3 py-1 text-sm rounded ${i18n.language === 'or' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
      >
        ଓଡ଼ିଆ (Odia)
      </button>
    </div>
  );
};

export default LanguageSwitcher;