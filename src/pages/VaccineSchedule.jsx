import React, { useState, useEffect } from 'react';
import { Shield } from 'lucide-react';
import { useTranslation } from 'react-i18next';

// This sub-component can stay inside this file or be moved to its own file
const LocalVaccineCamps = () => {
     //Translation
  const { t } = useTranslation();
  const [location, setLocation] = useState('Bhubaneswar'); // Default to Bhubaneswar
  const data = {
    Chennai: [
      { name: t('content_data.vaccines.covid_booster'), venue: t('content_data.venues.adyar_phc'), date: '2025-10-08' },
      { name: t('content_data.vaccines.influenza_shot'), venue: t('content_data.venues.t_nagar_uhc'), date: '2025-10-12' },
    ],
    Bhubaneswar: [
      { name: t('content_data.vaccines.dpt_booster'), venue: t('content_data.venues.capital_hospital'), date: '2025-10-06' },
      { name: t('content_data.vaccines.polio_drive'), venue: t('content_data.venues.saheed_nagar_cc'), date: '2025-10-10' },
    ],
  };
 
  const list = data[location] || [];
  return (
    <div className="p-4 border rounded-lg">
      <div className="flex items-center justify-between mb-3">
        <div className="text-sm text-gray-600">{t('vaccine_schedule.showing_camps')}</div>
        <select value={location} onChange={(e) => setLocation(e.target.value)} className="border rounded px-2 py-1 text-sm">
          <option>Bhubaneswar</option>
          <option>Chennai</option>
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


const VaccineSchedule = () => {
       //Translation
  const { t } = useTranslation();
  const [vaccineRecords, setVaccineRecords] = useState(() => {
    const raw = localStorage.getItem('vaccineRecords');
    return raw ? JSON.parse(raw) : [
      { id: 'v1', name: t('content_data.vaccines.dpt_booster'), dueDate: '2025-09-28', notes: t('content_data.notes.for_child'), contact: '', status: 'pending' },
      { id: 'v2', name: t('content_data.vaccines.influenza_flu_shot'), dueDate: '2025-10-05', notes: '', contact: '', status: 'pending' },
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
      { id: `v_${Date.now()}`, ...newVac, status: 'pending' },
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
    const message = `${t('vaccine_schedule.reminder_prefix')} ${record.name} ${t('vaccine_schedule.scheduled_on')} ${record.dueDate}. ${t('vaccine_schedule.notes_label')} ${record.notes || t('vaccine_schedule.not_applicable')}`;
    const phone = record.contact?.replace(/[^\d+]/g, '') || '';
    const link = phone
      ? `https://wa.me/${encodeURIComponent(phone)}?text=${encodeURIComponent(message)}`
      : `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(link, '_blank');
  };

  const openSMSReminder = (record) => {
    const message = `${t('vaccine_schedule.reminder_prefix')} ${record.name} ${t('vaccine_schedule.scheduled_on')} ${record.dueDate}. ${record.notes || ''}`;
    const phone = record.contact?.replace(/[^\d+]/g, '') || '';
    const link = `sms:${encodeURIComponent(phone)}?body=${encodeURIComponent(message)}`;
    window.open(link, '_blank');
  };
  
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">{t('vaccine_schedule.title')}</h2>
      <div className="bg-white p-6 rounded-xl shadow-sm border space-y-6">
        <div>
          <h3 className="font-semibold mb-3">{t('vaccine_schedule.local_camps_title')}</h3>
          <LocalVaccineCamps />
        </div>
        <div>
          <h3 className="font-semibold mb-3">{t('vaccine_schedule.add_vaccine_title')}</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            <input value={newVac.name} onChange={(e) => setNewVac({ ...newVac, name: e.target.value })} className="border rounded-lg px-3 py-2" placeholder={t('vaccine_schedule.vaccine_name_placeholder')} />
            <input value={newVac.dueDate} onChange={(e) => setNewVac({ ...newVac, dueDate: e.target.value })} type="date" className="border rounded-lg px-3 py-2" />
            <input value={newVac.contact} onChange={(e) => setNewVac({ ...newVac, contact: e.target.value })} className="border rounded-lg px-3 py-2" placeholder={t('vaccine_schedule.phone_placeholder')} />
            <input value={newVac.notes} onChange={(e) => setNewVac({ ...newVac, notes: e.target.value })} className="border rounded-lg px-3 py-2" placeholder={t('vaccine_schedule.notes_placeholder')} />
          </div>
          <div className="mt-3">
            <button onClick={addVaccine} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg">{t('vaccine_schedule.add_record_button')}</button>
          </div>
        </div>
        <div>
          <h3 className="font-semibold mb-3">{t('vaccine_schedule.your_records_title')}</h3>
          <div className="space-y-3">
            {vaccineRecords.length > 0 ? vaccineRecords.map((r) => (
              <div key={r.id} className="p-4 border rounded-lg flex flex-col md:flex-row md:items-center md:justify-between gap-3 bg-blue-50">
                <div className="flex-1">
                  <div className="font-semibold">{r.name}</div>
                  <div className="text-sm text-gray-600">{t('vaccine_schedule.due_date')}{r.dueDate}</div>
                  {r.notes && <div className="text-xs text-gray-500">{t('vaccine_schedule.notes_label')} {r.notes}</div>}
                  {r.contact && <div className="text-xs text-gray-500">{t('vaccine_schedule.contact_label')} {r.contact}</div>}
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  <button onClick={() => updateVaccine(r.id, { status: r.status === 'done' ? 'pending' : 'done' })} className={`px-3 py-2 rounded-lg text-sm ${r.status === 'done' ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-200 text-gray-800'}`}>{r.status === 'done' ? t('vaccine_schedule.status_completed') : t('vaccine_schedule.mark_as_done')}</button>
                  <button onClick={() => openWhatsAppReminder(r)} className="px-3 py-2 rounded-lg text-sm bg-green-600 hover:bg-green-700 text-white">{t('vaccine_schedule.whatsapp_button')}</button>
                  <button onClick={() => openSMSReminder(r)} className="px-3 py-2 rounded-lg text-sm bg-blue-600 hover:bg-blue-700 text-white">{t('vaccine_schedule.sms_button')}</button>
                  <button onClick={() => removeVaccine(r.id)} className="px-3 py-2 rounded-lg text-sm bg-red-100 text-red-700">{t('vaccine_schedule.remove_button')}</button>
                </div>
              </div>
            )) : (
              <div className="text-sm text-gray-500">{t('vaccine_schedule.no_records')}</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VaccineSchedule;