import React, { useState } from 'react';
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
// Import other pages as needed

const DashboardLayout = ({ user, handleLogout }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('dashboard');

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
        return <Profile user={user}/>
      // Add cases for other sections like 'smartwatch'
      default:
        return <div>Select a section</div>;
    }
  };

  return (
    <div className="h-screen bg-gray-100 flex">
      <Sidebar 
        sidebarOpen={sidebarOpen} 
        setSidebarOpen={setSidebarOpen} 
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        handleLogout={handleLogout}

      />
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* You can add your main header here if you have one */}
        <Header setSidebarOpen={setSidebarOpen} user={user} setActiveSection={setActiveSection} />
        <main className="flex-1 overflow-y-auto bg-gray-50">
          <div className="p-6">{renderContent()}</div>
        </main>
      </div>
       {/* You can also move the AI Assistant logic here */}
       <Assistant />
    </div>
  );
};

export default DashboardLayout;