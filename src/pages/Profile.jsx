import React, { useState } from 'react';
import { User, Mail, Phone, Trash2, UserPlus } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Profile = ({ user }) => {
  // State for editable user fields
  const [username, setUsername] = useState(user.name);
  
  // State for emergency contacts
  const [contacts, setContacts] = useState([
    { id: 1, name: 'Jane Doe', phone: '123-456-7890' },
    { id: 2, name: 'Local Clinic', phone: '098-765-4321' },
  ]);
  const [newContact, setNewContact] = useState({ name: '', phone: '' });

  const handleAddContact = () => {
    if (newContact.name && newContact.phone) {
      setContacts([...contacts, { id: Date.now(), ...newContact }]);
      setNewContact({ name: '', phone: '' }); // Clear inputs
    }
  };

  const handleRemoveContact = (id) => {
    setContacts(contacts.filter(contact => contact.id !== id));
  };
  //Translation
  const { t } = useTranslation();
  
  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800">{t('profile.title')}</h2>

      {/* User Profile Card */}
      <div className="bg-white p-6 rounded-xl shadow-sm border">
        <h3 className="text-lg font-semibold mb-4 text-gray-700">{t('profile.your_profile')}</h3>
        <div className="flex items-center space-x-4 mb-6">
          <div className="h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center">
            <User className="h-8 w-8 text-blue-600" />
          </div>
          <div>
            <p className="font-bold text-xl text-gray-800">{username}</p>
            <p className="text-gray-500">{user.email}</p>
          </div>
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
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg">
            {t('profile.save_changes')}
          </button>
        </div>
      </div>

      {/* Emergency Contacts Card */}
      <div className="bg-white p-6 rounded-xl shadow-sm border">
        <h3 className="text-lg font-semibold mb-4 text-gray-700">{t('profile.emergency_contacts')}</h3>
        <div className="space-y-3 mb-6">
          {contacts.map(contact => (
            <div key={contact.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <UserPlus className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="font-semibold">{contact.name}</p>
                  <p className="text-sm text-gray-600">{contact.phone}</p>
                </div>
              </div>
              <button onClick={() => handleRemoveContact(contact.id)} className="text-red-500 hover:text-red-700">
                <Trash2 className="h-5 w-5" />
              </button>
            </div>
          ))}
        </div>
        <div>
          <h4 className="font-semibold text-gray-600 mb-2">{t('profile.add_new_contact')}</h4>
          <div className="flex flex-col md:flex-row gap-3">
            <input 
              type="text" 
              placeholder={t('profile.contact_name')}
              value={newContact.name}
              onChange={(e) => setNewContact({...newContact, name: e.target.value})}
              className="flex-1 border rounded-lg px-3 py-2" 
            />
            <input 
              type="text" 
              placeholder={t('profile.phone_number')}
              value={newContact.phone}
              onChange={(e) => setNewContact({...newContact, phone: e.target.value})}
              className="flex-1 border rounded-lg px-3 py-2" 
            />
            <button onClick={handleAddContact} className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg">
              {t('profile.add_contact')}
            </button>
          </div>
        </div>
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