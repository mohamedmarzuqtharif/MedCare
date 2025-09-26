import React from 'react';
import {
  User,
  X,
  BarChart3,
  Shield,
  MapPin,
  Newspaper,
  Watch,
  Settings as SettingsIcon,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';



const Sidebar = ({ sidebarOpen, setSidebarOpen, activeSection, setActiveSection, handleLogout }) => {

      //Translation
  const { t } = useTranslation();
  
  const menuItems = [
    { id: 'dashboard', icon: BarChart3, label: t('sidebar.dashboard') },
    { id: 'vaccines', icon: Shield, label: t('sidebar.vaccine_schedule') },
    { id: 'hospitals', icon: MapPin, label: t('sidebar.nearby_hospitals') },
    { id: 'news', icon: Newspaper, label: t('sidebar.medical_news') },
    { id: 'smartwatch', icon: Watch, label: t('sidebar.smart_watch') },
    { id: 'settings', icon: SettingsIcon, label: 'Settings' },
  ];



  return (
    <div
      className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0 lg:static lg:inset-0`}
    >
      <div className="flex items-center justify-between h-16 px-4 border-b">
        <div className="flex items-center">
          <img src="/med_logo.jpg" alt="MedCare" className="h-8 w-8 mr-2" />
          <span className="text-xl font-bold text-gray-800">MedCare</span>
        </div>
        <button onClick={() => setSidebarOpen(false)} className="lg:hidden">
          <X className="h-6 w-6" />
        </button>
      </div>
      <nav className="mt-8 px-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.id}>
                <button
                  onClick={() => {
                    setActiveSection(item.id);
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center px-4 py-3 rounded-lg transition-colors ${
                    activeSection === item.id
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="h-5 w-5 mr-3" />
                  {item.label}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
      <div className="absolute bottom-4 left-4 right-4">
        <button
          onClick={handleLogout}
          className="w-full flex items-center px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <User className="h-5 w-5 mr-3" />
          {t('sidebar.logout')}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;