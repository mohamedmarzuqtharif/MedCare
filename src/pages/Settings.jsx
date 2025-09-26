import React, { useEffect, useState } from 'react';
import { Sun, Moon, Globe, Bell, Shield } from 'lucide-react';
import LanguageSwitcher from '../components/LanguageSwitcher';

const Settings = () => {
  const [dark, setDark] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [shareAnalytics, setShareAnalytics] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('theme');
    const isDark = saved ? saved === 'dark' : false;
    setDark(isDark);
  }, []);

  const toggleTheme = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle('dark', next);
    localStorage.setItem('theme', next ? 'dark' : 'light');
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Settings</h2>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border dark:border-gray-700">
        <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">Appearance</h3>
        <button
          onClick={toggleTheme}
          className={`px-4 py-2 rounded-lg border ${dark ? 'bg-gray-900 text-yellow-300 border-gray-700' : 'bg-gray-50 text-gray-800 border-gray-300'}`}
        >
          {dark ? <Sun className="inline h-5 w-5 mr-2" /> : <Moon className="inline h-5 w-5 mr-2" />} 
          {dark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border dark:border-gray-700">
        <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">Language</h3>
        <div className="flex items-center gap-3">
          <Globe className="h-5 w-5 text-gray-600 dark:text-gray-300" />
          <LanguageSwitcher />
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border dark:border-gray-700">
        <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">Notifications</h3>
        <button onClick={()=>setNotifications(!notifications)} className={`px-4 py-2 rounded-lg border ${notifications?'bg-emerald-50 text-emerald-700 border-emerald-300':'bg-gray-50 text-gray-800 border-gray-300'}`}>
          <Bell className="inline h-5 w-5 mr-2" /> {notifications ? 'Enabled' : 'Disabled'}
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border dark:border-gray-700">
        <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">Privacy</h3>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">Control optional analytics sharing.</p>
        <button onClick={()=>setShareAnalytics(!shareAnalytics)} className={`px-4 py-2 rounded-lg border ${shareAnalytics?'bg-emerald-50 text-emerald-700 border-emerald-300':'bg-gray-50 text-gray-800 border-gray-300'}`}>
          <Shield className="inline h-5 w-5 mr-2" /> {shareAnalytics ? 'Share anonymized analytics: On' : 'Share anonymized analytics: Off'}
        </button>
      </div>
    </div>
  );
};

export default Settings;


