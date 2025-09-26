import React, { useEffect, useState } from 'react';
import ProgressRing from '../components/ProgressRing';

const Smartwatch = () => {
  // State for the smartwatch data (originally in your main component)
  const [enabled, setEnabled] = useState(true);
  const [heartRate, setHeartRate] = useState(72);
  const [steps, setSteps] = useState(8542);
  const [sleepQuality, setSleepQuality] = useState('Good');
  const [calories, setCalories] = useState(380);
  const [distanceKm, setDistanceKm] = useState(6.2);
  const [heartPoints, setHeartPoints] = useState(22);

  useEffect(() => {
    const saved = localStorage.getItem('smartwatchEnabled');
    if (saved !== null) setEnabled(saved === 'true');
  }, []);

  useEffect(() => {
    localStorage.setItem('smartwatchEnabled', String(enabled));
  }, [enabled]);

  const stepGoal = 10000;
  const caloriesGoal = 500;
  const heartPointsGoal = 30;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">Google Fit Overview</h2>
        <button
          onClick={() => setEnabled(!enabled)}
          className={`px-4 py-2 rounded-lg border ${enabled ? 'bg-emerald-50 border-emerald-300 text-emerald-700' : 'bg-gray-50 border-gray-300 text-gray-700'}`}
        >
          {enabled ? 'Disable Tracking' : 'Enable Tracking'}
        </button>
      </div>
      <div className="bg-white p-6 rounded-xl shadow-sm border">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 rounded-xl border">
            <h3 className="font-semibold mb-4">Daily Goals</h3>
            <div className="flex items-center justify-around flex-wrap gap-4">
              <ProgressRing value={enabled ? steps : 0} goal={stepGoal} color="#34d399" label="Steps" />
              <ProgressRing value={enabled ? heartPoints : 0} goal={heartPointsGoal} color="#60a5fa" label="Heart Pts" />
              <ProgressRing value={enabled ? calories : 0} goal={caloriesGoal} color="#f59e0b" label="Calories" />
            </div>
          </div>
          <div className="p-4 rounded-xl border">
            <h3 className="font-semibold mb-2">Activity</h3>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="bg-blue-50 rounded-lg p-3">
                <div className="text-blue-700 font-semibold">Steps</div>
                <div className="text-2xl font-bold text-blue-700">{(enabled ? steps : 0).toLocaleString()}</div>
                <div className="text-xs text-blue-700">Goal {stepGoal.toLocaleString()}</div>
              </div>
              <div className="bg-amber-50 rounded-lg p-3">
                <div className="text-amber-700 font-semibold">Calories</div>
                <div className="text-2xl font-bold text-amber-700">{enabled ? calories : 0}</div>
                <div className="text-xs text-amber-700">kcal</div>
              </div>
              <div className="bg-emerald-50 rounded-lg p-3">
                <div className="text-emerald-700 font-semibold">Distance</div>
                <div className="text-2xl font-bold text-emerald-700">{enabled ? distanceKm : 0} km</div>
                <div className="text-xs text-emerald-700">Today</div>
              </div>
              <div className="bg-rose-50 rounded-lg p-3">
                <div className="text-rose-700 font-semibold">Heart Rate</div>
                <div className="text-2xl font-bold text-rose-700">{Math.round(enabled ? heartRate : 0)} BPM</div>
                <div className="text-xs text-rose-700">Resting ~68</div>
              </div>
            </div>
          </div>
          <div className="p-4 rounded-xl border">
            <h3 className="font-semibold mb-2">Sleep</h3>
            <div className="flex items-center gap-3">
              <div className="h-16 w-16 rounded-full bg-purple-100 grid place-items-center">
                <span className="text-purple-700 font-bold text-lg">{enabled ? (sleepQuality === 'Good' ? '7.5h' : '6.0h') : '0.0h'}</span>
              </div>
              <div>
                <div className="text-sm text-gray-600">Last night</div>
                <div className="text-xl font-semibold text-purple-700">{enabled ? sleepQuality : 'Off'}</div>
                <div className="text-xs text-gray-500">Target 8h</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Smartwatch;