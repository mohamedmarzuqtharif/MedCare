import React, { useState } from 'react';
import ProgressRing from '../components/ProgressRing';

const Smartwatch = () => {
  // State for the smartwatch data (originally in your main component)
  const [heartRate] = useState(72);
  const [steps] = useState(8542);
  const [sleepQuality] = useState('Good');
  const [calories] = useState(380);
  const [distanceKm] = useState(6.2);
  const [heartPoints] = useState(22);

  const stepGoal = 10000;
  const caloriesGoal = 500;
  const heartPointsGoal = 30;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Google Fit Overview</h2>
      <div className="bg-white p-6 rounded-xl shadow-sm border">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 rounded-xl border">
            <h3 className="font-semibold mb-4">Daily Goals</h3>
            <div className="flex items-center justify-around flex-wrap gap-4">
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
                <span className="text-purple-700 font-bold text-lg">{sleepQuality === 'Good' ? '7.5h' : '6.0h'}</span>
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
};

export default Smartwatch;