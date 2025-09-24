import React, { useState, useEffect } from 'react';
import {
  Heart,
  Shield,
  MapPin,
  Newspaper,
  Watch,
  Settings,
  BarChart3,
  MessageCircle,
  Phone,
  User,
  Lock,
  Mail,
  Menu,
  X,
  AlertTriangle,
  Stethoscope,
  Activity,
  Bell,
  ExternalLink,
} from 'lucide-react';

const MedCareApp = () => {
  const [currentView, setCurrentView] = useState('login');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [activeSection, setActiveSection] = useState('dashboard');
  const [region, setRegion] = useState('TN'); // retained for hospitals
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);
  const [assistantMessages, setAssistantMessages] = useState([
    { role: 'assistant', text: 'Hi! I\'m MedCare Assistant. Ask me about hospitals, vaccines, news, or type SOS.' },
  ]);
  const [assistantInput, setAssistantInput] = useState('');
  const [assistantTyping, setAssistantTyping] = useState(false);
  const [assistantProvider, setAssistantProvider] = useState('openai');
  const [assistantModel, setAssistantModel] = useState('gpt-4o-mini');
  const [assistantApiKey, setAssistantApiKey] = useState('');
  const [emergencyNumber] = useState('108');

  const getAssistantReply = (text) => {
    const lower = text.toLowerCase();
    if (lower.includes('sos')) {
      return 'To trigger SOS, press the big red SOS button on the dashboard. I will also notify your emergency contact (simulated).';
    }
    if (lower.includes('hospital')) {
      if (region === 'TN') {
        return 'Nearby (Tamil Nadu): Apollo Hospitals, Chennai; Government General Hospital, Chennai. Tap Hospitals → opens Google Maps for directions.';
      }
      return 'Nearby (Odisha): SUM Ultimate Medicare, Bhubaneswar; SCB Medical College, Cuttack. Tap Hospitals → opens Google Maps for directions.';
    }
    if (lower.includes('vaccine') || lower.includes('vaccination')) {
      if (region === 'TN') {
        return 'TN Vaccines: MR Booster due by Sept 30, 2025; COVID-19 Booster due by Oct 10, 2025.';
      }
      return 'Odisha Vaccines: DPT Booster due Sept 28, 2025; Influenza Shot due Oct 05, 2025.';
    }
    if (lower.includes('news')) {
      if (region === 'TN') {
        return 'TN News: Dengue prevention drive; new vaccination camps in rural districts.';
      }
      return 'Odisha News: Malaria cases decline; maternal health program outreach expanded.';
    }
    if (lower.includes('dark')) {
      return 'Use the Dark/Light toggle in the header to switch themes.';
    }
    return 'I can help with hospitals, vaccine schedules, news, SOS guidance, and theme. Try: "nearest hospitals" or "vaccine schedule".';
  };

  const callLLM = async (messages) => {
    try {
      if (assistantProvider === 'openai' && assistantApiKey) {
        const res = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${assistantApiKey}`,
          },
          body: JSON.stringify({
            model: assistantModel,
            messages: messages.map((m) => ({ role: m.role === 'assistant' ? 'assistant' : 'user', content: m.text })),
            temperature: 0.7,
          }),
        });
        if (!res.ok) throw new Error('API error');
        const data = await res.json();
        const content = data?.choices?.[0]?.message?.content || 'Sorry, I could not generate a response.';
        return content;
      }
    } catch (e) {
      return null;
    }
    return null;
  };

  const sendAssistantMessage = async () => {
    const text = assistantInput.trim();
    if (!text) return;
    const userMsg = { role: 'user', text };
    setAssistantMessages((msgs) => [...msgs, userMsg]);
    setAssistantInput('');
    setAssistantTyping(true);

    let content = null;
    if (assistantApiKey) {
      content = await callLLM([...assistantMessages, userMsg]);
    }
    if (!content) {
      content = getAssistantReply(text);
    }
    setAssistantMessages((msgs) => [...msgs, { role: 'assistant', text: content }]);
    setAssistantTyping(false);
  };

  // dark mode removed

  const handleLogin = (email, password) => {
    if (email && password) {
      setUser({ name: 'John Doe', email, role: 'user' });
      setIsAuthenticated(true);
      setCurrentView('dashboard');
    }
  };

  const handleSignup = (name, email, password) => {
    if (name && email && password) {
      setUser({ name, email, role: 'user' });
      setIsAuthenticated(true);
      setCurrentView('dashboard');
    }
  };

  const handleLogout = () => {
    setUser(null);
    setIsAuthenticated(false);
    setCurrentView('login');
    setActiveSection('dashboard');
  };

  const openWhatsAppBot = () => {
    window.open('https://wa.me/1234567890?text=Hello%20MedCare%20Bot', '_blank');
  };

  const openSMSBot = () => {
    window.open('sms:+1234567890?body=Hello%20MedCare%20Bot', '_blank');
  };

  const handleEmergencySOS = () => {
    alert('Emergency SOS Activated! Contacting nearest emergency services...');
  };

  const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [contact, setContact] = useState(''); // email or phone

    return (
      <div className="min-h-screen bg-[#F7F1EF] flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-10">
            <div className="flex items-center justify-center mb-2">
              <img src="/med_logo.jpg" alt="MedCare" className="h-12 w-12 mr-2" />
              <h1 className="text-4xl font-semibold text-gray-800">MedCare</h1>
            </div>
            <p className="text-sky-500 font-medium">AI Health care Assistant</p>
          </div>

          <div className="flex flex-col items-center mb-8">
            <div className="h-36 w-36 rounded-full bg-sky-800/90 flex items-center justify-center">
              <User className="h-20 w-20 text-white" />
            </div>
            <h2 className="mt-4 text-3xl font-bold tracking-wide text-sky-900">LOGIN</h2>
          </div>

          <div className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-sky-900 mb-2">USERNAME :</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full rounded-full bg-sky-200/70 px-5 py-3 outline-none focus:ring-2 focus:ring-sky-400"
                placeholder="Enter your username"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-sky-900 mb-2">LOGIN WITH EMAIL / PHONE NO :</label>
              <input
                type="text"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                className="w-full rounded-full bg-sky-200/70 px-5 py-3 outline-none focus:ring-2 focus:ring-sky-400"
                placeholder="Enter email or phone number"
              />
            </div>

            <div className="grid grid-cols-2 gap-6 pt-2">
              <button
                onClick={() => handleLogin(username || contact, 'x')}
                className="rounded-full bg-sky-300 hover:bg-sky-400 text-sky-900 font-semibold py-3"
              >
                SIGN IN
              </button>
              <button
                onClick={() => setCurrentView('signup')}
                className="rounded-full bg-sky-300 hover:bg-sky-400 text-sky-900 font-semibold py-3"
              >
                SIGN UP
              </button>
            </div>
          </div>

          <div className="mt-8">
            <div className="text-center text-gray-700 font-medium mb-3">OR</div>
            <button className="w-full flex items-center justify-center gap-3 rounded-full bg-sky-200/80 hover:bg-sky-300 text-sky-900 font-semibold py-3">
              <span className="bg-white rounded-full p-1">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="h-6 w-6"><path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,16.108,18.961,13,24,13c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.197,0-9.607-3.317-11.287-7.946l-6.54,5.036C9.5,39.556,16.227,44,24,44z"/><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.177-4.097,5.571c0,0,0,0,0,0l6.19,5.238C35.657,35.594,44,30,44,24C44,22.659,43.862,21.35,43.611,20.083z"/></svg>
              </span>
              Sign up with Google
            </button>
          </div>
        </div>
      </div>
    );
  };

  const SignupForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onSubmit = (e) => {
      e.preventDefault();
      handleSignup(name, email, password);
    };

    return (
      <div className="min-h-screen bg-[#F7F1EF] flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-10">
            <div className="flex items-center justify-center mb-2">
              <img src="/med_logo.jpg" alt="MedCare" className="h-12 w-12 mr-2" />
              <h1 className="text-4xl font-semibold text-gray-800">MedCare</h1>
            </div>
            <p className="text-sky-500 font-medium">AI Health care Assistant</p>
          </div>

          <div className="flex flex-col items-center mb-8">
            <div className="h-36 w-36 rounded-full bg-sky-800/90 flex items-center justify-center">
              <User className="h-20 w-20 text-white" />
            </div>
            <h2 className="mt-4 text-3xl font-bold tracking-wide text-sky-900">SIGN UP</h2>
          </div>

          <form onSubmit={onSubmit}>
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-sky-900 mb-2">FULL NAME :</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-full bg-sky-200/70 px-5 py-3 outline-none focus:ring-2 focus:ring-sky-400"
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-sky-900 mb-2">EMAIL :</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-full bg-sky-200/70 px-5 py-3 outline-none focus:ring-2 focus:ring-sky-400"
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-sky-900 mb-2">PASSWORD :</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-full bg-sky-200/70 px-5 py-3 outline-none focus:ring-2 focus:ring-sky-400"
                  placeholder="Enter your password"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-full bg-sky-300 hover:bg-sky-400 text-sky-900 font-semibold py-3"
              >
                SIGN UP
              </button>
            </div>
          </form>

          <div className="mt-8">
            <div className="text-center text-gray-700 font-medium mb-3">OR</div>
            <button className="w-full flex items-center justify-center gap-3 rounded-full bg-sky-200/80 hover:bg-sky-300 text-sky-900 font-semibold py-3">
              <span className="bg-white rounded-full p-1">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="h-6 w-6"><path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,16.108,18.961,13,24,13c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.197,0-9.607-3.317-11.287-7.946l-6.54,5.036C9.5,39.556,16.227,44,24,44z"/><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.177-4.097,5.571c0,0,0,0,0,0l6.19,5.238C35.657,35.594,44,30,44,24C44,22.659,43.862,21.35,43.611,20.083z"/></svg>
              </span>
              Sign up with Google
            </button>
          </div>

          <div className="mt-6 text-center">
            <button
              onClick={() => setCurrentView('login')}
              className="text-sky-600 hover:text-sky-700 font-medium"
            >
              Already have an account? Sign In
            </button>
          </div>
        </div>
      </div>
    );
  };

  const Sidebar = () => {
    const menuItems = [
      { id: 'dashboard', icon: BarChart3, label: 'Dashboard' },
      { id: 'vaccines', icon: Shield, label: 'Vaccine Schedule' },
      { id: 'hospitals', icon: MapPin, label: 'Nearby Hospitals' },
      { id: 'news', icon: Newspaper, label: 'Medical News' },
      { id: 'smartwatch', icon: Watch, label: 'Smart Watch Data' },
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
            Logout
          </button>
        </div>
      </div>
    );
  };

  const DashboardContent = () => {
    const [heartRate, setHeartRate] = useState(72);
    const [steps, setSteps] = useState(8542);
    const [sleepQuality, setSleepQuality] = useState('Good');
    const [consultations, setConsultations] = useState(1234);
    const [vaccines, setVaccines] = useState(856);
    const [alerts, setAlerts] = useState(42);
    const [activeUsers, setActiveUsers] = useState(2891);
    const [calories, setCalories] = useState(380); // kcal
    const [distanceKm, setDistanceKm] = useState(6.2);
    const [heartPoints, setHeartPoints] = useState(22);

    const stepGoal = 10000;
    const caloriesGoal = 500;
    const heartPointsGoal = 30;

    useEffect(() => {
      const interval = setInterval(() => {
        setHeartRate((hr) => Math.max(55, Math.min(120, hr + (Math.random() * 6 - 3))));
        setSteps((s) => s + Math.floor(Math.random() * 15));
        setSleepQuality((prev) => (Math.random() > 0.95 ? (prev === 'Good' ? 'Average' : 'Good') : prev));
        setConsultations((c) => c + (Math.random() > 0.8 ? 1 : 0));
        setVaccines((v) => v + (Math.random() > 0.85 ? 1 : 0));
        setAlerts((a) => Math.max(0, a + (Math.random() > 0.9 ? (Math.random() > 0.5 ? 1 : -1) : 0)));
        setActiveUsers((u) => Math.max(0, u + Math.floor(Math.random() * 5 - 2)));
        setCalories((cals) => Math.min(caloriesGoal + 150, cals + Math.floor(Math.random() * 10)));
        setDistanceKm((d) => Math.min(20, parseFloat((d + Math.random() * 0.05).toFixed(2))));
        setHeartPoints((p) => Math.min(60, p + (Math.random() > 0.6 ? 1 : 0)));
      }, 2000);
      return () => clearInterval(interval);
    }, []);

    const ProgressRing = ({ value, goal, color, label }) => {
      const pct = Math.max(0, Math.min(100, Math.round((value / goal) * 100)));
      const style = {
        background: `conic-gradient(${color} ${pct * 3.6}deg, #e5e7eb 0deg)`
      };
      return (
        <div className="flex flex-col items-center">
          <div className="h-28 w-28 rounded-full grid place-items-center" style={style}>
            <div className="h-20 w-20 rounded-full bg-white grid place-items-center">
              <div className="text-center">
                <div className="text-lg font-bold">{pct}%</div>
                <div className="text-[10px] text-gray-500">{label}</div>
              </div>
            </div>
          </div>
        </div>
      );
    };

    const LocalVaccineCamps = () => {
      const [location, setLocation] = useState('Chennai');
      const data = {
        Chennai: [
          { name: 'COVID-19 Booster', venue: 'Primary Health Center, Adyar', date: '2025-10-08' },
          { name: 'Influenza Shot', venue: 'Urban Health Center, T Nagar', date: '2025-10-12' },
          { name: 'MR Booster (Children)', venue: 'Govt School, Velachery', date: '2025-10-15' },
        ],
        Bhubaneswar: [
          { name: 'DPT Booster', venue: 'Capital Hospital, Unit 6', date: '2025-10-06' },
          { name: 'Polio (OPV) Drive', venue: 'Community Center, Saheed Nagar', date: '2025-10-10' },
          { name: 'Influenza Shot', venue: 'UPHC, Nayapalli', date: '2025-10-14' },
        ],
      };

      const list = data[location] || [];
      return (
        <div className="p-4 border rounded-lg">
          <div className="flex items-center justify-between mb-3">
            <div className="text-sm text-gray-600">Showing upcoming camps</div>
            <select value={location} onChange={(e) => setLocation(e.target.value)} className="border rounded px-2 py-1 text-sm">
              <option>Chennai</option>
              <option>Bhubaneswar</option>
            </select>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {list.map((c) => (
              <div key={`${c.name}-${c.venue}`} className="bg-green-50 border border-green-200 rounded-lg p-3">
                <div className="font-semibold text-green-800">{c.name}</div>
                <div className="text-sm text-green-700">{c.venue}</div>
                <div className="text-xs text-green-700">{c.date}</div>
              </div>
            ))}
          </div>
        </div>
      );
    };

    // Vaccine schedule records (persisted locally)
    const [vaccineRecords, setVaccineRecords] = useState(() => {
      const raw = localStorage.getItem('vaccineRecords');
      return raw
        ? JSON.parse(raw)
        : [
            { id: 'v1', name: 'COVID-19 Booster', dueDate: '2025-10-10', notes: '', contact: '', status: 'pending' },
            { id: 'v2', name: 'Influenza (Flu) Shot', dueDate: '2025-10-05', notes: '', contact: '', status: 'pending' },
          ];
    });

    useEffect(() => {
      localStorage.setItem('vaccineRecords', JSON.stringify(vaccineRecords));
    }, [vaccineRecords]);

    const [newVac, setNewVac] = useState({ name: '', dueDate: '', notes: '', contact: '' });

    const addVaccine = () => {
      if (!newVac.name || !newVac.dueDate) return;
      setVaccineRecords((list) => [
        ...list,
        { id: `v_${Date.now()}`, name: newVac.name, dueDate: newVac.dueDate, notes: newVac.notes || '', contact: newVac.contact || '', status: 'pending' },
      ]);
      setNewVac({ name: '', dueDate: '', notes: '', contact: '' });
    };

    const updateVaccine = (id, patch) => {
      setVaccineRecords((list) => list.map((r) => (r.id === id ? { ...r, ...patch } : r)));
    };

    const removeVaccine = (id) => {
      setVaccineRecords((list) => list.filter((r) => r.id !== id));
    };

    const openWhatsAppReminder = (record) => {
      const message = `Reminder: ${record.name} is scheduled on ${record.dueDate}. Notes: ${record.notes || 'N/A'}`;
      const phone = record.contact?.replace(/[^\d+]/g, '') || '';
      const link = phone
        ? `https://wa.me/${encodeURIComponent(phone)}?text=${encodeURIComponent(message)}`
        : `https://wa.me/?text=${encodeURIComponent(message)}`;
      window.open(link, '_blank');
    };

    const openSMSReminder = (record) => {
      const message = `Reminder: ${record.name} on ${record.dueDate}. ${record.notes || ''}`;
      const phone = record.contact?.replace(/[^\d+]/g, '') || '';
      const link = `sms:${encodeURIComponent(phone)}?body=${encodeURIComponent(message)}`;
      window.open(link, '_blank');
    };

    const renderContent = () => {
      switch (activeSection) {
        case 'dashboard':
          return (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-800">Health Dashboard</h2>

              {/* Centered SOS with WhatsApp and SMS below */}
              <div className="flex flex-col items-center gap-6">
                <button
                  onClick={handleEmergencySOS}
                  className="relative h-56 w-56 rounded-full bg-red-600 text-white shadow-2xl hover:scale-[1.03] transition-transform duration-200"
                  title="Medical SOS"
                >
                  <span className="absolute inset-0 rounded-full" style={{
                    boxShadow: '0 0 0 6px rgba(255,255,255,0.6), inset 0 10px 30px rgba(0,0,0,0.25)'
                  }} />
                  <span className="absolute -inset-1 rounded-full border-8 border-red-800/40 pointer-events-none"></span>
                  <div className="relative z-10 text-center select-none">
                    <div className="text-white/90 text-lg font-extrabold tracking-wide">EMERGENCY</div>
                    <div className="mt-2 flex items-center justify-center gap-2">
                      <AlertTriangle className="h-8 w-8 text-white" />
                      <span className="text-2xl font-black tracking-widest">EMERGENCY</span>
                    </div>
                    <div className="mt-1 text-xs text-white/80">Press in Emergency</div>
                  </div>
                </button>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full md:w-2/3">
                  <button
                    onClick={openWhatsAppBot}
                    className="bg-green-600 hover:bg-green-700 text-white rounded-xl px-6 py-4 font-semibold flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="h-5 w-5" /> Open WhatsApp Bot
                  </button>
                  <button
                    onClick={openSMSBot}
                    className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-6 py-4 font-semibold flex items-center justify-center gap-2"
                  >
                    <Phone className="h-5 w-5" /> Open SMS Bot
                  </button>
                </div>

                {/* Metrics moved here (below bots) */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
                  <div className="bg-blue-50 p-6 rounded-xl">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-blue-600 text-sm font-medium">Total Consultations</p>
                        <p className="text-3xl font-bold text-blue-700 transition-all">{consultations.toLocaleString()}</p>
                      </div>
                      <Stethoscope className="h-12 w-12 text-blue-500" />
                    </div>
                  </div>
                  <div className="bg-green-50 p-6 rounded-xl">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-green-600 text-sm font-medium">Vaccines Given</p>
                        <p className="text-3xl font-bold text-green-700 transition-all">{vaccines.toLocaleString()}</p>
                      </div>
                      <Shield className="h-12 w-12 text-green-500" />
                    </div>
                  </div>
                  <div className="bg-purple-50 p-6 rounded-xl">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-purple-600 text-sm font-medium">Health Alerts</p>
                        <p className="text-3xl font-bold text-purple-700 transition-all">{alerts}</p>
                      </div>
                      <Bell className="h-12 w-12 text-purple-500" />
                    </div>
                  </div>
                  <div className="bg-orange-50 p-6 rounded-xl">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-orange-600 text-sm font-medium">Active Users</p>
                        <p className="text-3xl font-bold text-orange-700 transition-all">{activeUsers.toLocaleString()}</p>
                      </div>
                      <Activity className="h-12 w-12 text-orange-500" />
                    </div>
                  </div>
                </div>

                {/* Medical News entry */}
                <div className="w-full md:w-2/3">
                  <div className="card">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <Newspaper className="h-5 w-5 text-gray-700" />
                        <h3 className="font-semibold">Medical News</h3>
                      </div>
                    </div>
                    <button
                      onClick={() => setActiveSection('news')}
                      className="w-full px-4 py-3 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold"
                    >
                      View All India Medical News
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        case 'vaccines':
          return (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-800">Vaccine Schedule & Reminders</h2>
              <div className="bg-white p-6 rounded-xl shadow-sm border space-y-6">
                {/* Local vaccine camps */}
                <div>
                  <h3 className="font-semibold mb-3">Local Area Vaccine Camps</h3>
                  <LocalVaccineCamps />
                </div>
                <div>
                  <h3 className="font-semibold mb-3">Add Vaccine</h3>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                    <input value={newVac.name} onChange={(e) => setNewVac({ ...newVac, name: e.target.value })} className="border rounded-lg px-3 py-2" placeholder="Vaccine name" />
                    <input value={newVac.dueDate} onChange={(e) => setNewVac({ ...newVac, dueDate: e.target.value })} type="date" className="border rounded-lg px-3 py-2" />
                    <input value={newVac.contact} onChange={(e) => setNewVac({ ...newVac, contact: e.target.value })} className="border rounded-lg px-3 py-2" placeholder="Phone (optional)" />
                    <input value={newVac.notes} onChange={(e) => setNewVac({ ...newVac, notes: e.target.value })} className="border rounded-lg px-3 py-2 md:col-span-1" placeholder="Notes (optional)" />
                  </div>
                  <div className="mt-3">
                    <button onClick={addVaccine} className="btn-primary">Add Record</button>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">Your Vaccines</h3>
                  <div className="space-y-3">
                    {vaccineRecords.map((r) => (
                      <div key={r.id} className="p-4 border rounded-lg flex flex-col md:flex-row md:items-center md:justify-between gap-3 bg-blue-50">
                        <div className="flex items-center gap-3">
                          <Shield className="h-6 w-6 text-blue-600" />
                          <div>
                            <div className="font-semibold">{r.name}</div>
                            <div className="text-sm text-gray-600">Due: 
                              <input
                                value={r.dueDate}
                                onChange={(e) => updateVaccine(r.id, { dueDate: e.target.value })}
                                type="date"
                                className="ml-2 border rounded px-2 py-1 text-sm"
                              />
                            </div>
                            <div className="text-xs text-gray-500">Notes: 
                              <input
                                value={r.notes}
                                onChange={(e) => updateVaccine(r.id, { notes: e.target.value })}
                                placeholder="Optional"
                                className="ml-2 border rounded px-2 py-1 text-xs"
                              />
                            </div>
                            <div className="text-xs text-gray-500">Contact: 
                              <input
                                value={r.contact}
                                onChange={(e) => updateVaccine(r.id, { contact: e.target.value })}
                                placeholder="Phone for SMS/WA"
                                className="ml-2 border rounded px-2 py-1 text-xs"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button onClick={() => updateVaccine(r.id, { status: r.status === 'done' ? 'pending' : 'done' })} className={`px-3 py-2 rounded-lg text-sm ${r.status === 'done' ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-200 text-gray-800'}`}>{r.status === 'done' ? 'Completed' : 'Mark Done'}</button>
                          <button onClick={() => openWhatsAppReminder(r)} className="px-3 py-2 rounded-lg text-sm bg-green-600 hover:bg-green-700 text-white">WhatsApp</button>
                          <button onClick={() => openSMSReminder(r)} className="px-3 py-2 rounded-lg text-sm bg-blue-600 hover:bg-blue-700 text-white">SMS</button>
                          <button onClick={() => removeVaccine(r.id)} className="px-3 py-2 rounded-lg text-sm bg-red-100 text-red-700">Remove</button>
                        </div>
                      </div>
                    ))}
                    {vaccineRecords.length === 0 && (
                      <div className="text-sm text-gray-500">No vaccine records yet. Add one above.</div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        case 'hospitals':
          return (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-800">Nearby Hospitals</h2>
              <div className="bg-white p-6 rounded-xl shadow-sm border">
                <div className="space-y-4">
                  {(
                    region === 'TN'
                      ? [
                          { name: 'Apollo Hospitals, Chennai', sub: '24/7 Emergency • Greams Road', q: 'Apollo Hospitals Chennai' },
                          { name: 'Government General Hospital, Chennai', sub: 'Academic • Park Town', q: 'Rajiv Gandhi Government General Hospital Chennai' },
                        ]
                      : [
                          { name: 'SUM Ultimate Medicare, Bhubaneswar', sub: '24/7 Emergency • K8 Kalinga Nagar', q: 'SUM Ultimate Medicare Bhubaneswar' },
                          { name: 'SCB Medical College, Cuttack', sub: 'Tertiary Care • Mangalabag', q: 'SCB Medical College Cuttack' },
                        ]
                  ).map((h) => (
                    <a
                      key={h.name}
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(h.q)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                    >
                      <div>
                        <h3 className="font-semibold">{h.name}</h3>
                        <p className="text-gray-600">{h.sub}</p>
                      </div>
                      <MapPin className="h-8 w-8 text-blue-600" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          );
        case 'news':
          return (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-800">India - Medical News</h2>
              <div className="bg-white p-6 rounded-xl shadow-sm border">
                <div className="space-y-4">
                  {[
                    { t: 'AIIMS launches new telemedicine initiative', s: 'Remote consultations expand access across India.', u: 'https://www.aiims.edu/en.html' },
                    { t: 'ICMR updates national immunization guidelines', s: 'Revisions to booster timelines and coverage.', u: 'https://www.icmr.gov.in/' },
                    { t: 'National campaign on non-communicable diseases', s: 'Focus on diabetes, hypertension, and lifestyle.', u: 'https://www.nhp.gov.in/' },
                    { t: 'Govt boosts primary healthcare infrastructure', s: 'New health and wellness centres announced.', u: 'https://www.mohfw.gov.in/' },
                  ].map((n) => (
                    <article key={n.t} className="p-4 border rounded-lg">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold mb-1">{n.t}</h3>
                          <p className="text-gray-600 text-sm">{n.s}</p>
                          <span className="text-xs text-gray-500">Updated today</span>
                        </div>
                        <a
                          href={n.u}
                          target="_blank"
                          rel="noreferrer"
                          className="ml-3 text-blue-600 hover:text-blue-700 flex items-center gap-1"
                          title="Open original source"
                        >
                          <ExternalLink className="h-5 w-5" />
                        </a>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          );
        case 'smartwatch':
          return (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-800">Google Fit Overview</h2>
              <div className="bg-white p-6 rounded-xl shadow-sm border">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="p-4 rounded-xl border">
                    <h3 className="font-semibold mb-4">Daily Goals</h3>
                    <div className="flex items-center justify-around">
                      <ProgressRing value={steps} goal={stepGoal} color="#34d399" label="Steps" />
                      <ProgressRing value={heartPoints} goal={heartPointsGoal} color="#60a5fa" label="Heart Pts" />
                      <ProgressRing value={calories} goal={caloriesGoal} color="#f59e0b" label="Calories" />
                    </div>
                  </div>
                  <div className="p-4 rounded-xl border">
                    <h3 className="font-semibold mb-2">Activity</h3>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div className="bg-blue-50 rounded-lg p-3">
                        <div className="text-blue-700 font-semibold">Steps</div>
                        <div className="text-2xl font-bold text-blue-700">{steps.toLocaleString()}</div>
                        <div className="text-xs text-blue-700">Goal {stepGoal.toLocaleString()}</div>
                      </div>
                      <div className="bg-amber-50 rounded-lg p-3">
                        <div className="text-amber-700 font-semibold">Calories</div>
                        <div className="text-2xl font-bold text-amber-700">{calories}</div>
                        <div className="text-xs text-amber-700">kcal</div>
                      </div>
                      <div className="bg-emerald-50 rounded-lg p-3">
                        <div className="text-emerald-700 font-semibold">Distance</div>
                        <div className="text-2xl font-bold text-emerald-700">{distanceKm} km</div>
                        <div className="text-xs text-emerald-700">Today</div>
                      </div>
                      <div className="bg-rose-50 rounded-lg p-3">
                        <div className="text-rose-700 font-semibold">Heart Rate</div>
                        <div className="text-2xl font-bold text-rose-700">{Math.round(heartRate)} BPM</div>
                        <div className="text-xs text-rose-700">Resting ~68</div>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 rounded-xl border">
                    <h3 className="font-semibold mb-2">Sleep</h3>
                    <div className="flex items-center gap-3">
                      <div className="h-16 w-16 rounded-full bg-purple-100 grid place-items-center">
                        <span className="text-purple-700 font-bold text-lg">{sleepQuality === 'Good' ? '7.5' : '6.0'}</span>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">Last night</div>
                        <div className="text-xl font-semibold text-purple-700">{sleepQuality} Sleep</div>
                        <div className="text-xs text-gray-500">Target 8h</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        
        default:
          return <div>Select a section from the sidebar</div>;
      }
    };

    return (
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden">
              <Menu className="h-6 w-6" />
            </button>
            <div className="flex-1" />
            <div className="flex items-center space-x-3">
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
              <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
                <User className="h-4 w-4 text-blue-600" />
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto bg-gray-50">
          <div className="p-6">{renderContent()}</div>
        </main>
      </div>
    );
  };

  if (!isAuthenticated) {
    return currentView === 'login' ? <LoginForm /> : <SignupForm />;
  }

  return (
    <div className="h-screen bg-gray-100 flex">
      <Sidebar />
      <DashboardContent />
      {/* AI Assistant - bottom right */}
      <div className="fixed bottom-6 right-6 z-50">
        {isAssistantOpen && (
          <div className="mb-3 w-80 h-96 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-xl flex flex-col">
            <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
              <span className="font-semibold text-gray-800 dark:text-gray-100">MedCare Assistant</span>
              <button className="text-gray-500 hover:text-gray-700" onClick={() => setIsAssistantOpen(false)}>
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="px-3 py-2 flex items-center gap-2 border-b border-gray-200 dark:border-gray-700">
              <select value={assistantProvider} onChange={(e) => setAssistantProvider(e.target.value)} className="text-xs border border-gray-300 dark:border-gray-600 rounded px-2 py-1 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-100">
                <option value="openai">OpenAI</option>
                <option value="local">Offline (rules-based)</option>
              </select>
              <input value={assistantModel} onChange={(e) => setAssistantModel(e.target.value)} className="flex-1 text-xs border border-gray-300 dark:border-gray-600 rounded px-2 py-1 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-100" placeholder="Model (e.g., gpt-4o-mini)" />
            </div>
            <div className="px-3 py-2 flex items-center gap-2 border-b border-gray-200 dark:border-gray-700">
              <input value={assistantApiKey} onChange={(e) => setAssistantApiKey(e.target.value)} type="password" className="w-full text-xs border border-gray-300 dark:border-gray-600 rounded px-2 py-1 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-100" placeholder="OpenAI API Key (optional)" />
            </div>
            <div className="flex-1 p-3 space-y-2 overflow-y-auto text-sm text-gray-700 dark:text-gray-200">
              {assistantMessages.map((m, idx) => (
                <div key={idx} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`${m.role === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100'} rounded-lg p-2 max-w-[85%]`}>
                    {m.text}
                  </div>
                </div>
              ))}
              {assistantTyping && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded-lg p-2 text-xs">Assistant is typing...</div>
                </div>
              )}
            </div>
            <div className="p-2 border-t border-gray-200 dark:border-gray-700 flex items-center gap-2">
              <input
                value={assistantInput}
                onChange={(e) => setAssistantInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') sendAssistantMessage(); }}
                className="flex-1 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm"
                placeholder="Type a message..."
              />
              <button onClick={sendAssistantMessage} className="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm">Send</button>
            </div>
          </div>
        )}
        <button onClick={() => setIsAssistantOpen((v) => !v)} className="h-14 w-14 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-xl flex items-center justify-center" title="MedicalBot">
          <Stethoscope className="h-6 w-6" />
        </button>
      </div>
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default MedCareApp;


