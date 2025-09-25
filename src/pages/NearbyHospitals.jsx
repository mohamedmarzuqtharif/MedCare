import React, { useState } from 'react';
import { MapPin } from 'lucide-react';

const NearbyHospitals = () => {
  const [region, setRegion] = useState('Odisha'); // Default to Odisha

  const hospitalsByRegion = {
    'Tamil Nadu': [
      { name: 'Apollo Hospitals, Chennai', sub: '24/7 Emergency • Greams Road', q: 'Apollo Hospitals Chennai' },
      { name: 'Government General Hospital, Chennai', sub: 'Academic • Park Town', q: 'Rajiv Gandhi Government General Hospital Chennai' },
    ],
    'Odisha': [
      { name: 'SUM Ultimate Medicare, Bhubaneswar', sub: '24/7 Emergency • K8 Kalinga Nagar', q: 'SUM Ultimate Medicare Bhubaneswar' },
      { name: 'SCB Medical College, Cuttack', sub: 'Tertiary Care • Mangalabag', q: 'SCB Medical College Cuttack' },
    ]
  };

  const hospitals = hospitalsByRegion[region] || [];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Nearby Hospitals</h2>
      <div className="bg-white p-6 rounded-xl shadow-sm border">
        {/* Add a region selector here later if needed */}
        <div className="space-y-4">
          {hospitals.map((h) => (
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
};

export default NearbyHospitals;