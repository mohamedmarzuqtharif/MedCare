import React, { useEffect, useRef, useState } from 'react';
import Sidebar from './Sidebar'; // Assuming Sidebar.jsx is in the same folder

// Import your page components
import Dashboard from '../pages/Dashboard';
import Header from './Header';
import VaccineSchedule from '../pages/VaccineSchedule';
import NearbyHospitals from '../pages/NearbyHospitals';
import MedicalNews from '../pages/MedicalNews';
import Smartwatch from '../pages/Smartwatch';
import Profile from '../pages/Profile';
import Assistant from '../components/Assistant';
import Settings from '../pages/Settings';
import { BarChart3, Shield, MapPin, Newspaper, Watch, User as UserIcon, Cog } from 'lucide-react';
import Footer from './Footer';
// Import other pages as needed

const DashboardLayout = ({ user, handleLogout }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('dashboard');
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);

  useEffect(() => {
    const handleTouchStart = (e) => {
      const t = e.touches[0];
      touchStartX.current = t.clientX;
      touchStartY.current = t.clientY;
    };
    const handleTouchEnd = (e) => {
      const t = e.changedTouches[0];
      const dx = t.clientX - touchStartX.current;
      const dy = Math.abs(t.clientY - touchStartY.current);
      // From very left edge, horizontal swipe right opens sidebar
      if (touchStartX.current < 24 && dx > 60 && dy < 40) {
        setSidebarOpen(true);
      }
    };
    document.addEventListener('touchstart', handleTouchStart, { passive: true });
    document.addEventListener('touchend', handleTouchEnd, { passive: true });
    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <Dashboard />;
      case 'vaccines':
        return <VaccineSchedule />;
      case 'hospitals':
        return <NearbyHospitals />;
      case 'news':
        return <MedicalNews />;
      case 'smartwatch':
        return <Smartwatch />;
      case 'profile':
        return <Profile user={user} />;
      case 'settings':
        return <Settings />;
      // Add cases for other sections like 'smartwatch'
      default:
        return <div>Select a section</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <Sidebar 
        sidebarOpen={sidebarOpen} 
        setSidebarOpen={setSidebarOpen} 
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        handleLogout={handleLogout}
      />
      <div className="flex-1 flex flex-col overflow-hidden theme-medical">
        {/* You can add your main header here if you have one */}
        <Header setSidebarOpen={setSidebarOpen} user={user} setActiveSection={setActiveSection} />
        <main className="flex-1 overflow-y-auto bg-gray-50 pb-16 sm:pb-0">
          <div className="p-6">{renderContent()}</div>
        </main>

        {/* Sticky Bottom Mobile Nav */}
        <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t shadow-sm">
          <div className="grid grid-cols-5 text-xs">
            <button onClick={() => setActiveSection('dashboard')} className={`py-3 flex flex-col items-center ${activeSection === 'dashboard' ? 'text-blue-600' : 'text-gray-600'}`}>
              <BarChart3 className="h-5 w-5" />
              <span>Home</span>
            </button>
            <button onClick={() => setActiveSection('vaccines')} className={`py-3 flex flex-col items-center ${activeSection === 'vaccines' ? 'text-blue-600' : 'text-gray-600'}`}>
              <Shield className="h-5 w-5" />
              <span>Vaccines</span>
            </button>
            <button onClick={() => setActiveSection('hospitals')} className={`py-3 flex flex-col items-center ${activeSection === 'hospitals' ? 'text-blue-600' : 'text-gray-600'}`}>
              <MapPin className="h-5 w-5" />
              <span>Hospitals</span>
            </button>
            <button onClick={() => setActiveSection('smartwatch')} className={`py-3 flex flex-col items-center ${activeSection === 'smartwatch' ? 'text-blue-600' : 'text-gray-600'}`}>
              <Watch className="h-5 w-5" />
              <span>Watch</span>
            </button>
            <button onClick={() => setActiveSection('settings')} className={`py-3 flex flex-col items-center ${activeSection === 'settings' ? 'text-blue-600' : 'text-gray-600'}`}>
              <Cog className="h-5 w-5" />
              <span>Settings</span>
            </button>
          </div>
        </nav>

        {/* You can also move the AI Assistant logic here */}
        <Assistant />
        <Footer />
      </div>
    </div>
  );
};

export default DashboardLayout;
