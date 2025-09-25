import React from 'react';
import { ExternalLink } from 'lucide-react';

const MedicalNews = () => {
  const newsArticles = [
    { t: 'AIIMS launches new telemedicine initiative', s: 'Remote consultations expand access across India.', u: 'https://www.aiims.edu/en.html' },
    { t: 'ICMR updates national immunization guidelines', s: 'Revisions to booster timelines and coverage.', u: 'https://www.icmr.gov.in/' },
    { t: 'National campaign on non-communicable diseases', s: 'Focus on diabetes, hypertension, and lifestyle.', u: 'https://www.nhp.gov.in/' },
    { t: 'Govt boosts primary healthcare infrastructure', s: 'New health and wellness centres announced.', u: 'https://www.mohfw.gov.in/' },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">India - Medical News</h2>
      <div className="bg-white p-6 rounded-xl shadow-sm border">
        <div className="space-y-4">
          {newsArticles.map((n) => (
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
};

export default MedicalNews;