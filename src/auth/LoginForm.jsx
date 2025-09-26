import React, { useState } from 'react';
import { User, Mail, Phone as PhoneIcon, Lock, Repeat, ChevronLeft } from 'lucide-react';

const LoginForm = ({ handleLogin, setCurrentView }) => {
  const [username, setUsername] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [phoneInput, setPhoneInput] = useState('');
  const [stage, setStage] = useState('collect'); // collect | otp | forgot
  const [otp, setOtp] = useState('');
  const [otpVerified, setOtpVerified] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [message, setMessage] = useState('');

  const isEmail = (val) => /@/.test(val);
  const isPhone = (val) => /^\+?\d{10,15}$/.test(val.replace(/\D/g, ''));

  const sendOtp = () => {
    const contact = emailInput || phoneInput;
    if (!contact || (!isEmail(contact) && !isPhone(contact))) {
      setMessage('Please enter a valid email or phone number');
      return;
    }
    setStage('otp');
    setOtp('');
    setOtpVerified(false);
    setMessage(isEmail(contact)
      ? `OTP has been sent to ${contact}. Check your inbox.`
      : `OTP has been sent via SMS to ${contact}.`);
  };

  const verifyOtp = () => {
    if (/^\d{4}$/.test(otp.trim())) {
      setOtpVerified(true);
      setMessage('OTP verified. You can now sign in.');
      return;
    }
    setOtpVerified(false);
    setMessage('Enter a valid 4-digit OTP.');
  };

  const resendOtp = () => {
    setOtp('');
    sendOtp();
  };

  const handleForgotSubmit = (e) => {
    e.preventDefault();
    if (!forgotEmail || !isEmail(forgotEmail)) {
      setMessage('Enter a valid email to receive reset link');
      return;
    }
    setMessage(`Password reset link sent to ${forgotEmail}. Check your inbox.`);
  };

  return (
    <div className="min-h-screen bg-[#F7F1EF] dark:bg-gray-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 sm:p-8">
        <div className="text-center mb-10">
          <div className="flex items-center justify-center mb-2">
            <img src="/med_logo.jpg" alt="MedCare" className="h-12 w-12 mr-2" />
            <h1 className="text-4xl font-semibold text-gray-800 dark:text-gray-100">MedCare</h1>
          </div>
          <p className="text-sky-500 font-medium">AI Health care Assistant</p>
        </div>
        <div className="flex flex-col items-center mb-8">
          <div className="h-28 w-28 sm:h-36 sm:w-36 rounded-full bg-sky-800/90 flex items-center justify-center">
            <User className="h-20 w-20 text-white" />
          </div>
          <h2 className="mt-4 text-3xl font-bold tracking-wide text-sky-900 dark:text-sky-200">LOGIN</h2>
        </div>
        {stage === 'collect' && (
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-sky-900 dark:text-sky-100 mb-2">USERNAME :</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full rounded-full bg-sky-200/70 px-5 py-3 outline-none focus:ring-2 focus:ring-sky-400"
                placeholder="Enter your username"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-sky-900 dark:text-sky-100 mb-2">EMAIL ID :</label>
              <div className="relative">
                <input
                  type="email"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  className="w-full rounded-full bg-sky-200/70 px-12 py-3 outline-none focus:ring-2 focus:ring-sky-400"
                  placeholder="Enter email"
                />
                <span className="absolute inset-y-0 left-4 flex items-center text-sky-700">
                  <Mail className="h-5 w-5" />
                </span>
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-sky-900 dark:text-sky-100 mb-2">PHONE NO :</label>
              <div className="relative">
                <input
                  type="tel"
                  value={phoneInput}
                  onChange={(e) => setPhoneInput(e.target.value)}
                  className="w-full rounded-full bg-sky-200/70 px-12 py-3 outline-none focus:ring-2 focus:ring-sky-400"
                  placeholder="Enter phone number"
                />
                <span className="absolute inset-y-0 left-4 flex items-center text-sky-700">
                  <PhoneIcon className="h-5 w-5" />
                </span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6 pt-2">
              <button
                onClick={sendOtp}
                className="rounded-full bg-sky-300 hover:bg-sky-400 text-sky-900 font-semibold py-3"
              >
                Proceed
              </button>
              <button
                onClick={() => setCurrentView('signup')}
                className="rounded-full bg-sky-300 hover:bg-sky-400 text-sky-900 font-semibold py-3"
              >
                SIGN UP
              </button>
            </div>
            <div className="text-center">
              <button onClick={() => setStage('forgot')} className="text-sky-700 hover:underline font-medium">Forgot Password?</button>
            </div>
          </div>
        )}

        {stage === 'otp' && (
          <div className="space-y-5">
            <button onClick={() => setStage('collect')} className="flex items-center gap-2 text-sm text-sky-700 hover:underline">
              <ChevronLeft className="h-4 w-4" /> Back
            </button>
            <label className="block text-sm font-semibold text-sky-900 dark:text-sky-100">Enter 4-digit OTP sent to {emailInput || phoneInput}</label>
            <div className="relative">
              <input
                type="text"
                inputMode="numeric"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full rounded-full bg-sky-200/70 px-12 py-3 outline-none focus:ring-2 focus:ring-sky-400 tracking-widest text-center"
                placeholder="----"
                maxLength={4}
              />
              <span className="absolute inset-y-0 left-4 flex items-center text-sky-700">
                <Lock className="h-5 w-5" />
              </span>
            </div>
            <div className="grid grid-cols-2 gap-6 pt-2">
              <button
                onClick={verifyOtp}
                className="rounded-full bg-emerald-300 hover:bg-emerald-400 text-emerald-900 font-semibold py-3"
              >
                Verify OTP
              </button>
              <button
                onClick={resendOtp}
                className="rounded-full bg-sky-200 hover:bg-sky-300 text-sky-900 font-semibold py-3 flex items-center justify-center gap-2"
                title="Resend"
              >
                <Repeat className="h-4 w-4" /> Resend OTP
              </button>
            </div>
            <button
              disabled={!otpVerified}
              onClick={() => { const contactVal = emailInput || phoneInput; localStorage.setItem('userName', username || contactVal); handleLogin(username || contactVal, 'otp_verified'); }}
              className={`mt-3 w-full rounded-full font-semibold py-3 ${otpVerified ? 'bg-sky-300 hover:bg-sky-400 text-sky-900' : 'bg-gray-200 text-gray-500 cursor-not-allowed'}`}
            >
              SIGN IN
            </button>
          </div>
        )}

        {stage === 'forgot' && (
          <div className="space-y-5">
            <button onClick={() => setStage('collect')} className="flex items-center gap-2 text-sm text-sky-700 hover:underline">
              <ChevronLeft className="h-4 w-4" /> Back
            </button>
            <label className="block text-sm font-semibold text-sky-900 dark:text-sky-100">Enter your email to reset password</label>
            <div className="relative">
              <input
                type="email"
                value={forgotEmail}
                onChange={(e) => setForgotEmail(e.target.value)}
                className="w-full rounded-full bg-sky-200/70 px-12 py-3 outline-none focus:ring-2 focus:ring-sky-400"
                placeholder="email@example.com"
              />
              <span className="absolute inset-y-0 left-4 flex items-center text-sky-700">
                <Mail className="h-5 w-5" />
              </span>
            </div>
            <button onClick={handleForgotSubmit} className="w-full rounded-full bg-sky-300 hover:bg-sky-400 text-sky-900 font-semibold py-3">Send Reset Link</button>
          </div>
        )}
        <div className="mt-8">
          <div className="text-center text-gray-700 font-medium mb-3">OR</div>
          <button className="w-full flex items-center justify-center gap-3 rounded-full bg-sky-200/80 hover:bg-sky-300 text-sky-900 font-semibold py-3">
            <span className="bg-white rounded-full p-1">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="h-6 w-6"><path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,16.108,18.961,13,24,13c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.197,0-9.607-3.317-11.287-7.946l-6.54,5.036C9.5,39.556,16.227,44,24,44z"/><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.177-4.097,5.571c0,0,0,0,0,0l6.19,5.238C35.657,35.594,44,30,44,24C44,22.659,43.862,21.35,43.611,20.083z"/></svg>
            </span>
            Sign in with Google
          </button>
        </div>

        {!!message && (
          <div className="mt-4 text-center text-sm text-sky-800 dark:text-sky-200">{message}</div>
        )}
      </div>
    </div>
  );
};

export default LoginForm;