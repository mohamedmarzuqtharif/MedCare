import React from 'react';
import { Menu, Bell, Phone, User } from 'lucide-react';
import LanguageSwitcher from './LanguageSwitcher';

const Header = ({ setSidebarOpen, user, setActiveSection }) => {
  const emergencyNumber = '108'; // You can manage this state elsewhere if needed

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
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
            onClick={() => alert('Common Health Alert: Heat advisory in effect. Stay hydrated and avoid peak sun hours.')}
            title="Notifications"
            className="h-9 w-9 rounded-full bg-gray-100 hover:bg-gray-200 grid place-items-center"
          >
            <Bell className="h-5 w-5 text-gray-700" />
          </button>
          
          <button
            onClick={() => window.open(`tel:${emergencyNumber}`, '_self')}
            title="Medical Emergency Contact"
            className="h-9 w-9 rounded-full bg-red-100 hover:bg-red-200 grid place-items-center"
          >
            <Phone className="h-5 w-5 text-red-700" />
          </button>
          
          <button 
            onClick={() => setActiveSection('profile')} // This line handles the navigation
            title={user?.email || 'User Profile'}
            className="h-9 w-9 rounded-full bg-blue-100 hover:bg-blue-200 grid place-items-center"
            >
            <User className="h-5 w-5 text-blue-600" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;