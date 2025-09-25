import React from 'react';

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

export default ProgressRing;