import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-800 border-t dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
          <span className="inline-block h-3 w-3 rounded-full bg-health-green" />
          <span>MedCare • Caring for your health</span>
        </div>
        <div className="text-xs text-gray-500 mt-2 sm:mt-0">© {new Date().getFullYear()} MedCare</div>
      </div>
    </footer>
  );
};

export default Footer;


