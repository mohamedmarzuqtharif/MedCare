import React, { useMemo, useState } from 'react';
import { MapPin, Search } from 'lucide-react';

const NearbyHospitals = () => {
  const [region, setRegion] = useState('Odisha'); // Default to Odisha
  const [q, setQ] = useState('');

  const hospitalsByRegion = {
    'Tamil Nadu': [
      { name: 'Apollo Hospitals, Chennai', sub: '24/7 Emergency • Greams Road', q: 'Apollo Hospitals Chennai' },
      { name: 'Government General Hospital, Chennai', sub: 'Academic • Park Town', q: 'Rajiv Gandhi Government General Hospital Chennai' },
    ],
    'Odisha': [
      { name: 'SUM Ultimate Medicare, Bhubaneswar', sub: '24/7 Emergency • K8 Kalinga Nagar', q: 'SUM Ultimate Medicare Bhubaneswar' },
      { name: 'SCB Medical College, Cuttack', sub: 'Tertiary Care • Mangalabag', q: 'SCB Medical College Cuttack' },
    ],
    'Maharashtra': [
      { name: 'Tata Memorial Hospital, Mumbai', sub: 'Cancer Care • Parel', q: 'Tata Memorial Hospital Mumbai' },
      { name: 'KEM Hospital, Mumbai', sub: 'Municipal • Parel', q: 'KEM Hospital Mumbai' },
    ],
    'Delhi': [
      { name: 'AIIMS, New Delhi', sub: 'Tertiary Care • Ansari Nagar', q: 'AIIMS New Delhi' },
      { name: 'Safdarjung Hospital', sub: 'Multi-speciality • Ring Road', q: 'Safdarjung Hospital New Delhi' },
    ],
    'Karnataka': [
      { name: 'NIMHANS, Bengaluru', sub: 'Neuro • Hosur Road', q: 'NIMHANS Bengaluru' },
      { name: 'Manipal Hospital, Bengaluru', sub: 'Private • HAL Old Airport Rd', q: 'Manipal Hospital HAL Airport Road Bengaluru' },
    ],
    'West Bengal': [
      { name: 'Apollo Gleneagles, Kolkata', sub: 'Private • EM Bypass', q: 'Apollo Gleneagles Kolkata' },
      { name: 'S.S.K.M Hospital, Kolkata', sub: 'Govt • AJC Bose Rd', q: 'SSKM Hospital Kolkata' },
    ]
  };

  const hospitals = hospitalsByRegion[region] || [];
  const filtered = useMemo(() => hospitals.filter(h => (h.name + ' ' + h.sub).toLowerCase().includes(q.toLowerCase())), [hospitals, q]);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Nearby Hospitals</h2>
      <div className="bg-white p-6 rounded-xl shadow-sm border">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">State/Region</label>
            <select value={region} onChange={(e)=>setRegion(e.target.value)} className="w-full border rounded-lg px-3 py-2">
              {Object.keys(hospitalsByRegion).map((r)=> (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </div>
          <div className="md:col-span-2 relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
            <input value={q} onChange={(e)=>setQ(e.target.value)} className="w-full border rounded-lg pl-10 pr-3 py-2" placeholder="Search hospitals by name or area" />
            <Search className="h-4 w-4 text-gray-500 absolute right-3 top-9" />
          </div>
        </div>
        <div className="space-y-4">
          {filtered.map((h) => (
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
          {filtered.length === 0 && (
            <div className="text-sm text-gray-600">No results. Try another term or change state.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NearbyHospitals;