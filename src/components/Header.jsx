import React, { useEffect, useState } from 'react';
import { Menu, Bell, Phone, User, AlertTriangle, Moon, Sun, Settings } from 'lucide-react';
import LanguageSwitcher from './LanguageSwitcher';
import SOSEmergency from './SOSEmergency';

const Header = ({ setSidebarOpen, user, setActiveSection }) => {
  const emergencyNumber = '108'; // You can manage this state elsewhere if needed
  const [showSOSModal, setShowSOSModal] = useState(false);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('theme');
    const isDark = saved ? saved === 'dark' : false;
    setDark(isDark);
    document.documentElement.classList.toggle('dark', isDark);
  }, []);

  const toggleTheme = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle('dark', next);
    localStorage.setItem('theme', next ? 'dark' : 'light');
  };

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Hamburger Menu for mobile */}
        <button onClick={() => setSidebarOpen(true)} className="lg:hidden">
          <Menu className="h-6 w-6 text-gray-700" />
        </button>

        {/* This div is a spacer to push the right-side icons to the end */}
        <div className="flex-1" />

        {/* Right-side Icons */}
        <div className="flex items-center space-x-3">
            <LanguageSwitcher />
          <button
            onClick={toggleTheme}
            title={dark ? 'Switch to light mode' : 'Switch to dark mode'}
            className="h-9 w-9 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 grid place-items-center"
          >
            {dark ? <Sun className="h-5 w-5 text-yellow-400" /> : <Moon className="h-5 w-5 text-gray-700" />}
          </button>
          <button
            onClick={() => alert('Common Health Alert: Heat advisory in effect. Stay hydrated and avoid peak sun hours.')}
            title="Notifications"
            className="h-9 w-9 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 grid place-items-center"
          >
            <Bell className="h-5 w-5 text-gray-700 dark:text-gray-200" />
          </button>
          <button
            onClick={() => setActiveSection('settings')}
            title="Settings"
            className="h-9 w-9 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 grid place-items-center"
          >
            <Settings className="h-5 w-5 text-gray-700 dark:text-gray-200" />
          </button>
          
          <button
            onClick={() => setShowSOSModal(true)}
            title="SOS Emergency"
            className="h-9 w-9 rounded-full bg-red-100 hover:bg-red-200 grid place-items-center animate-pulse"
          >
            <AlertTriangle className="h-5 w-5 text-red-700" />
          </button>
          
          <button
            onClick={() => window.open(`tel:${emergencyNumber}`, '_self')}
            title="Direct Emergency Call"
            className="h-9 w-9 rounded-full bg-orange-100 hover:bg-orange-200 grid place-items-center"
          >
            <Phone className="h-5 w-5 text-orange-700" />
          </button>
          
          <button 
            onClick={() => setActiveSection('profile')} // This line handles the navigation
            title={user?.email || 'User Profile'}
            className="h-9 w-9 rounded-full bg-blue-100 hover:bg-blue-200 grid place-items-center overflow-hidden"
            >
            {(() => { try { const p = JSON.parse(localStorage.getItem('profile')||'{}'); return p.photoDataUrl ? <img src={p.photoDataUrl} alt="avatar" className="h-9 w-9 object-cover"/> : <User className="h-5 w-5 text-blue-600"/> } catch { return <User className="h-5 w-5 text-blue-600"/> } })()}
          </button>
        </div>
      </div>
      
      {/* SOS Emergency Modal */}
      <SOSEmergency 
        isOpen={showSOSModal} 
        onClose={() => setShowSOSModal(false)} 
      />
    </header>
  );
};

export default Header;