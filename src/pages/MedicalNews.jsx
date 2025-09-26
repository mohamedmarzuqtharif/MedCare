import React, { useMemo, useState } from 'react';
import { ExternalLink, Search } from 'lucide-react';

const MedicalNews = () => {
  const [q, setQ] = useState('');
  const newsArticles = [
    { t: 'AIIMS launches new telemedicine initiative', s: 'Remote consultations expand access across India.', u: 'https://www.aiims.edu/en.html' },
    { t: 'ICMR updates national immunization guidelines', s: 'Revisions to booster timelines and coverage.', u: 'https://www.icmr.gov.in/' },
    { t: 'National Health Authority eSanjeevani crosses milestone', s: 'Telemedicine service records millions of consultations.', u: 'https://esanjeevani.in/' },
    { t: 'National campaign on non-communicable diseases', s: 'Focus on diabetes, hypertension, and lifestyle.', u: 'https://www.nhp.gov.in/' },
    { t: 'Govt boosts primary healthcare infrastructure', s: 'New health and wellness centres announced.', u: 'https://www.mohfw.gov.in/' },
    { t: 'WHO SEARO updates on disease surveillance', s: 'Regional health alerts and guidance for India.', u: 'https://www.who.int/india' },
    { t: 'CDSCO approvals for essential medicines', s: 'Drug approvals and safety alerts.', u: 'https://cdsco.gov.in/opencms/opencms/en/' },
    { t: 'Ayushman Bharat-PMJAY updates', s: 'Insurance coverage expansion and empanelments.', u: 'https://pmjay.gov.in/' },
  ];

  const filtered = useMemo(() =>
    newsArticles.filter(n => (n.t + ' ' + n.s).toLowerCase().includes(q.toLowerCase())),
  [q]);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">India - Medical News</h2>
      <div className="bg-white p-6 rounded-xl shadow-sm border">
        <div className="mb-4 relative">
          <input
            type="text"
            value={q}
            onChange={(e)=>setQ(e.target.value)}
            placeholder="Search India medical news"
            className="w-full border rounded-lg pl-10 pr-3 py-2"
          />
          <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
        </div>
        <div className="space-y-4">
          {filtered.map((n) => (
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
          {filtered.length === 0 && (
            <div className="text-sm text-gray-600">No results. Try another term.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MedicalNews;