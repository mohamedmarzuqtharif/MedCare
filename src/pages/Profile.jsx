import React, { useEffect, useState } from 'react';
import { User, Mail, Phone, MapPin, UserPlus } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import EmergencyContacts from '../components/EmergencyContacts';

const Profile = ({ user }) => {
  //Translation
  const { t } = useTranslation();

  // State for editable user fields
  const [username, setUsername] = useState(user.name);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState(user.email || '');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [locationEnabled, setLocationEnabled] = useState(true);
  const [photoDataUrl, setPhotoDataUrl] = useState('');

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('profile') || '{}');
    if (stored && Object.keys(stored).length) {
      setUsername(stored.username || username);
      setFirstName(stored.firstName || '');
      setLastName(stored.lastName || '');
      setEmail(stored.email || email);
      setAge(stored.age || '');
      setGender(stored.gender || '');
      setLocationEnabled(stored.locationEnabled ?? true);
      setPhotoDataUrl(stored.photoDataUrl || '');
    }
  }, []);

  const handleSave = () => {
    const data = {
      username,
      firstName,
      lastName,
      email,
      age,
      gender,
      locationEnabled,
      photoDataUrl,
    };
    localStorage.setItem('profile', JSON.stringify(data));
    localStorage.setItem('userName', username);
    alert('Profile updated successfully');
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setPhotoDataUrl(String(reader.result));
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800">{t('profile.title')}</h2>

      {/* User Profile Card */}
      <div className="bg-white p-6 rounded-xl shadow-sm border">
        <h3 className="text-lg font-semibold mb-4 text-gray-700">{t('profile.your_profile')}</h3>
        <div className="flex items-center space-x-4 mb-6">
          <div className="h-16 w-16 bg-blue-100 rounded-full overflow-hidden flex items-center justify-center">
            {photoDataUrl ? (
              <img src={photoDataUrl} alt="Profile" className="h-full w-full object-cover" />
            ) : (
              <User className="h-8 w-8 text-blue-600" />
            )}
          </div>
          <div>
            <p className="font-bold text-xl text-gray-800">{username}</p>
            <p className="text-gray-500">{user.email}</p>
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600 mb-1">Profile Photo</label>
          <input type="file" accept="image/*" onChange={handlePhotoUpload} />
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">{t('profile.change_username')}</label>
            <input 
              type="text" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full md:w-1/2 border rounded-lg px-3 py-2"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">First Name</label>
              <input type="text" value={firstName} onChange={(e)=>setFirstName(e.target.value)} className="w-full border rounded-lg px-3 py-2" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Last Name</label>
              <input type="text" value={lastName} onChange={(e)=>setLastName(e.target.value)} className="w-full border rounded-lg px-3 py-2" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Email</label>
              <div className="relative">
                <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} className="w-full border rounded-lg pl-10 pr-3 py-2" />
                <Mail className="h-4 w-4 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Age</label>
              <input type="number" value={age} onChange={(e)=>setAge(e.target.value)} className="w-full border rounded-lg px-3 py-2" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Gender</label>
              <select value={gender} onChange={(e)=>setGender(e.target.value)} className="w-full border rounded-lg px-3 py-2">
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Location Sharing</label>
              <button onClick={()=>setLocationEnabled(!locationEnabled)} className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg border ${locationEnabled ? 'bg-emerald-50 border-emerald-300 text-emerald-700' : 'bg-gray-50 border-gray-300 text-gray-700'}`}>
                <MapPin className="h-4 w-4" /> {locationEnabled ? 'On' : 'Off'}
              </button>
            </div>
          </div>
          <div className="flex gap-3">
            <button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg">Save</button>
            <button onClick={handleSave} className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 px-4 rounded-lg">Update Profile</button>
          </div>
        </div>
      </div>

      {/* Emergency Contacts Card */}
      <div className="bg-white p-6 rounded-xl shadow-sm border">
        <EmergencyContacts />
      </div>

       {/* Additional Settings Card 
       <div className="bg-white p-6 rounded-xl shadow-sm border">
        <h3 className="text-lg font-semibold mb-4 text-gray-700">Additional Settings</h3>
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <label htmlFor="notifications" className="font-medium text-gray-700">Enable Email Notifications</label>
                <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                    <input type="checkbox" name="notifications" id="notifications" className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"/>
                    <label htmlFor="notifications" className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"></label>
                </div>
            </div>
             {/* You would add state and handlers for these settings 
        </div>
       </div>*/}
    </div>
  );
};

export default Profile;