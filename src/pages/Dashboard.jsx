import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  AlertTriangle,
  MessageCircle,
  Phone,
  Stethoscope,
  Shield,
  Bell,
  Activity,
  BarChart3, LineChart, PieChart
} from 'lucide-react';
import SOSEmergency from '../components/SOSEmergency';

const Dashboard = ({ setActiveSection }) => {
  // Mock data and handlers specific to the dashboard
  const consultations = 1234;
  const vaccines = 856;
  const alerts = 42;
  const activeUsers = 2891;
  const [showSOSModal, setShowSOSModal] = useState(false);
  const [showConsultationsModal, setShowConsultationsModal] = useState(false);
  const [liveData, setLiveData] = useState([]);

  useEffect(() => {
    if (!showConsultationsModal) return;
    const interval = setInterval(() => {
      setLiveData((prev) => {
        const next = [...prev, { t: Date.now(), v: Math.floor(1000 + Math.random()*200) }];
        return next.slice(-20);
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [showConsultationsModal]);

  const chartPoints = useMemo(()=> liveData.map((p)=>p.v), [liveData]);

  //Translation 
  const { t } = useTranslation();

  const handleEmergencySOS = () => {
    setShowSOSModal(true);
  };

  const openWhatsAppBot = () => {
    window.open('https://wa.me/15551414694?text=Hello%20MedCare%20Bot', '_blank');
  };

  const openSMSBot = () => {
    // window.open('sms:?body=Hello%20MedCare%20Bot', '_blank');
    window.alert("Opening SMS bot!");
  };

  return (
    <>
    <div className="space-y-6">
<h2 className="text-2xl font-bold text-gray-800">{t('dashboard.title')}</h2>
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
            <div className="text-white/90 text-lg font-extrabold tracking-wide">{t('dashboard.emergency')}</div>
            <div className="mt-2 flex items-center justify-center gap-2">
              <AlertTriangle className="h-8 w-8 text-white" />
            <div className="mt-1 text-xs text-lg font-extrabold text-white/90">{t('dashboard.sos')}</div>
            </div>
            <div className="mt-1 text-xs text-white/80">{t('dashboard.alert')}</div>
          </div>
        </button>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 w-full md:w-2/3">
          <button
            onClick={openWhatsAppBot}
            className="bg-green-600 hover:bg-green-700 text-white rounded-xl px-6 py-4 font-semibold flex items-center justify-center gap-2"
          >
            <MessageCircle className="h-5 w-5" /> {t('dashboard.whatsapp')}
          </button>
          <button
            onClick={openSMSBot}
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-6 py-4 font-semibold flex items-center justify-center gap-2"
          >
            <Phone className="h-5 w-5" /> {t('dashboard.sms')}
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 w-full">
          {/* Metric Cards */}
          <div className="bg-blue-50 p-6 rounded-xl cursor-pointer" onClick={()=>setShowConsultationsModal(true)}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-600 text-sm font-medium">{t('dashboard.consultations')}</p>
                <p className="text-3xl font-bold text-blue-700">{consultations.toLocaleString()}</p>
              </div>
              <Stethoscope className="h-12 w-12 text-blue-500" />
            </div>
          </div>
          <div className="bg-green-50 p-6 rounded-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-600 text-sm font-medium">{t('dashboard.vaccines_scheduled')}</p>
                <p className="text-3xl font-bold text-green-700">{vaccines.toLocaleString()}</p>
              </div>
              <Shield className="h-12 w-12 text-green-500" />
            </div>
          </div>
          <div className="bg-purple-50 p-6 rounded-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-600 text-sm font-medium">{t('dashboard.health_alerts')}</p>
                <p className="text-3xl font-bold text-purple-700">{alerts}</p>
              </div>
              <Bell className="h-12 w-12 text-purple-500" />
            </div>
          </div>
          <div className="bg-orange-50 p-6 rounded-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-600 text-sm font-medium">{t('dashboard.active_users')}</p>
                <p className="text-3xl font-bold text-orange-700">{activeUsers.toLocaleString()}</p>
              </div>
              <Activity className="h-12 w-12 text-orange-500" />
            </div>
          </div>
        </div>
        <div className="w-full md:w-2/3">
          <div className="bg-white rounded-xl p-4 border">
            <h3 className="font-semibold mb-3 text-gray-800">Dashboard Visualizations</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button onClick={()=>alert('Show consultations chart')} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 font-medium">
                <BarChart3 className="h-5 w-5" /> {t('dashboard.consultations')}
              </button>
              <button onClick={()=>alert('Show vaccines chart')} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-green-50 hover:bg-green-100 text-green-700 font-medium">
                <LineChart className="h-5 w-5" /> {t('dashboard.vaccines_scheduled')}
              </button>
              <button onClick={()=>alert('Show health alerts chart')} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-purple-50 hover:bg-purple-100 text-purple-700 font-medium">
                <PieChart className="h-5 w-5" /> {t('dashboard.health_alerts')}
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* SOS Emergency Modal */}
      <SOSEmergency 
        isOpen={showSOSModal} 
        onClose={() => setShowSOSModal(false)} 
      />
    </div>

    {showConsultationsModal && (
      <div className="fixed inset-0 bg-black/50 z-50 grid place-items-center">
        <div className="bg-white rounded-xl p-6 w-[90%] max-w-2xl shadow-2xl">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Live Total Consultations</h3>
            <button onClick={()=>setShowConsultationsModal(false)} className="px-3 py-1 rounded-md bg-gray-100 hover:bg-gray-200">Close</button>
          </div>
          <div className="h-48 w-full bg-gray-50 border rounded-lg p-3 flex items-end gap-1 overflow-hidden">
            {chartPoints.map((v, idx) => (
              <div key={idx} className="bg-blue-500/70" style={{ width: `${100/Math.max(chartPoints.length,1)}%`, height: `${Math.min(100, (v/1500)*100)}%` }} />
            ))}
          </div>
          <p className="mt-3 text-sm text-gray-500">Updates every second. This is a simple live bar sparkline.</p>
        </div>
      </div>
    )}
  </>
  );
};

export default Dashboard;