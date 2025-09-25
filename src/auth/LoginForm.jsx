import React, { useState } from 'react';
import { User } from 'lucide-react';

const LoginForm = ({ handleLogin, setCurrentView }) => {
  const [username, setUsername] = useState('');
  const [contact, setContact] = useState(''); // email or phone

  return (
    <div className="min-h-screen bg-[#F7F1EF] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-10">
          <div className="flex items-center justify-center mb-2">
            <img src="/med_logo.jpg" alt="MedCare" className="h-12 w-12 mr-2" />
            <h1 className="text-4xl font-semibold text-gray-800">MedCare</h1>
          </div>
          <p className="text-sky-500 font-medium">AI Health care Assistant</p>
        </div>
        <div className="flex flex-col items-center mb-8">
          <div className="h-36 w-36 rounded-full bg-sky-800/90 flex items-center justify-center">
            <User className="h-20 w-20 text-white" />
          </div>
          <h2 className="mt-4 text-3xl font-bold tracking-wide text-sky-900">LOGIN</h2>
        </div>
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-sky-900 mb-2">USERNAME :</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full rounded-full bg-sky-200/70 px-5 py-3 outline-none focus:ring-2 focus:ring-sky-400"
              placeholder="Enter your username"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-sky-900 mb-2">LOGIN WITH EMAIL / PHONE NO :</label>
            <input
              type="text"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              className="w-full rounded-full bg-sky-200/70 px-5 py-3 outline-none focus:ring-2 focus:ring-sky-400"
              placeholder="Enter email or phone number"
            />
          </div>
          <div className="grid grid-cols-2 gap-6 pt-2">
            <button
              onClick={() => handleLogin(username || contact, 'dummy_password')}
              className="rounded-full bg-sky-300 hover:bg-sky-400 text-sky-900 font-semibold py-3"
            >
              SIGN IN
            </button>
            <button
              onClick={() => setCurrentView('signup')}
              className="rounded-full bg-sky-300 hover:bg-sky-400 text-sky-900 font-semibold py-3"
            >
              SIGN UP
            </button>
          </div>
        </div>
        <div className="mt-8">
          <div className="text-center text-gray-700 font-medium mb-3">OR</div>
          <button className="w-full flex items-center justify-center gap-3 rounded-full bg-sky-200/80 hover:bg-sky-300 text-sky-900 font-semibold py-3">
            <span className="bg-white rounded-full p-1">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="h-6 w-6"><path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,16.108,18.961,13,24,13c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.197,0-9.607-3.317-11.287-7.946l-6.54,5.036C9.5,39.556,16.227,44,24,44z"/><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.177-4.097,5.571c0,0,0,0,0,0l6.19,5.238C35.657,35.594,44,30,44,24C44,22.659,43.862,21.35,43.611,20.083z"/></svg>
            </span>
            Sign in with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;