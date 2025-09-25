import React, { useState } from 'react';
import LoginForm from './auth/LoginForm';
import SignupForm from './auth/SignupForm';
import DashboardLayout from './components/DashboardLayout';

const App = () => {
  const [currentView, setCurrentView] = useState('login');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  const handleLogin = (email, password) => {
    // Replace with your actual API call later
    if (email && password) {
      setUser({ name: 'John Doe', email });
      setIsAuthenticated(true);
    }
  };

  const handleSignup = (name, email, password) => {
    // Replace with your actual API call later
    if (name && email && password) {
      setUser({ name, email });
      setIsAuthenticated(true);
    }
  };

  const handleLogout = () => {
    setUser(null);
    setIsAuthenticated(false);
    setCurrentView('login');
  };
  
  if (!isAuthenticated) {
    return currentView === 'login' ? (
      <LoginForm handleLogin={handleLogin} setCurrentView={setCurrentView} />
    ) : (
      <SignupForm handleSignup={handleSignup} setCurrentView={setCurrentView} />
    );
  }

  return <DashboardLayout user={user} handleLogout={handleLogout} />;
};

export default App;