import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { AlertTriangle, Phone, MapPin, X, CheckCircle, XCircle } from 'lucide-react';

const SOSEmergency = ({ isOpen, onClose }) => {
  const { t } = useTranslation();
  const [countdown, setCountdown] = useState(5);
  const [isActive, setIsActive] = useState(false);
  const [location, setLocation] = useState(null);
  const [emergencyContacts, setEmergencyContacts] = useState([]);
  const [isCalling, setIsCalling] = useState(false);
  const [userResponded, setUserResponded] = useState(false);
  const intervalRef = useRef(null);

  // Load emergency contacts from localStorage
  useEffect(() => {
    const savedContacts = localStorage.getItem('emergencyContacts');
    if (savedContacts) {
      setEmergencyContacts(JSON.parse(savedContacts));
    }
  }, []);

  // Get user's location
  useEffect(() => {
    if (isOpen && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy
          });
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    }
  }, [isOpen]);

  // Start countdown when component opens
  useEffect(() => {
    if (isOpen && !isActive) {
      setIsActive(true);
      setCountdown(5);
      setUserResponded(false);
    }
  }, [isOpen, isActive]);

  // Countdown timer
  useEffect(() => {
    if (isActive && countdown > 0) {
      intervalRef.current = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            setIsActive(false);
            handleEmergencyCall();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isActive, countdown]);

  const handleUserResponse = (response) => {
    setUserResponded(true);
    setIsActive(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    
    if (response) {
      // User confirmed emergency
      handleEmergencyCall();
    } else {
      // User cancelled
      onClose();
    }
  };

  const handleEmergencyCall = async () => {
    setIsCalling(true);
    
    try {
      // Call emergency number 108
      window.open('tel:108', '_self');
      
      // Send location and emergency info to contacts
      await sendEmergencyNotifications();
      
      // Store emergency record
      storeEmergencyRecord();
      
    } catch (error) {
      console.error('Error during emergency call:', error);
    }
  };

  const sendEmergencyNotifications = async () => {
    const emergencyMessage = `🚨 EMERGENCY ALERT 🚨
    
User: ${localStorage.getItem('userName') || 'Unknown'}
Time: ${new Date().toLocaleString()}
Location: ${location ? `${location.latitude}, ${location.longitude}` : 'Location unavailable'}

Emergency services have been contacted. Please check on this person immediately.

Google Maps: ${location ? `https://www.google.com/maps?q=${location.latitude},${location.longitude}` : 'Location unavailable'}`;

    // Send to emergency contacts
    emergencyContacts.forEach(contact => {
      if (contact.phone) {
        // Send SMS
        const smsUrl = `sms:${contact.phone}?body=${encodeURIComponent(emergencyMessage)}`;
        window.open(smsUrl, '_blank');
      }
    });
  };

  const storeEmergencyRecord = () => {
    const emergencyRecord = {
      id: Date.now(),
      timestamp: new Date().toISOString(),
      location: location,
      contactsNotified: emergencyContacts.length,
      status: 'active'
    };

    const existingRecords = JSON.parse(localStorage.getItem('emergencyRecords') || '[]');
    existingRecords.push(emergencyRecord);
    localStorage.setItem('emergencyRecords', JSON.stringify(existingRecords));
  };

  const getLocationString = () => {
    if (!location) return t('sos.location_unavailable');
    return `${location.latitude.toFixed(6)}, ${location.longitude.toFixed(6)}`;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-2xl">
        <div className="text-center">
          <div className="mb-4">
            <AlertTriangle className="h-16 w-16 text-red-600 mx-auto animate-pulse" />
          </div>
          
          <h2 className="text-2xl font-bold text-red-600 mb-2">
            {t('sos.emergency_alert')}
          </h2>
          
          {!userResponded && isActive && (
            <div className="mb-6">
              <div className="text-4xl font-bold text-red-600 mb-2">
                {countdown}
              </div>
              <p className="text-gray-600 mb-4">
                {t('sos.countdown_message')}
              </p>
              <div className="flex gap-3 justify-center">
                <button
                  onClick={() => handleUserResponse(true)}
                  className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg flex items-center gap-2"
                >
                  <CheckCircle className="h-5 w-5" />
                  {t('sos.yes_emergency')}
                </button>
                <button
                  onClick={() => handleUserResponse(false)}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg flex items-center gap-2"
                >
                  <XCircle className="h-5 w-5" />
                  {t('sos.no_cancel')}
                </button>
              </div>
            </div>
          )}

          {userResponded && (
            <div className="mb-6">
              <p className="text-lg text-gray-700 mb-4">
                {t('sos.processing_emergency')}
              </p>
            </div>
          )}

          {isCalling && (
            <div className="mb-6">
              <div className="flex items-center justify-center gap-2 text-red-600 mb-2">
                <Phone className="h-6 w-6 animate-pulse" />
                <span className="font-semibold">{t('sos.calling_emergency')}</span>
              </div>
              <p className="text-sm text-gray-600">
                {t('sos.emergency_number')}: 108
              </p>
            </div>
          )}

          <div className="space-y-3 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span>{t('sos.location')}: {getLocationString()}</span>
            </div>
            
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              <span>{t('sos.contacts_notified')}: {emergencyContacts.length}</span>
            </div>
          </div>

          <div className="mt-6 flex gap-3 justify-center">
            <button
              onClick={onClose}
              className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
            >
              <X className="h-4 w-4" />
              {t('sos.close')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SOSEmergency;
