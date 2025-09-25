import React, { useState } from 'react';
import { User } from 'lucide-react';

const SignupForm = ({ handleSignup, setCurrentView }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    handleSignup(name, email, password);
  };

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
          <h2 className="mt-4 text-3xl font-bold tracking-wide text-sky-900">SIGN UP</h2>
        </div>
        <form onSubmit={onSubmit}>
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-sky-900 mb-2">FULL NAME :</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-full bg-sky-200/70 px-5 py-3 outline-none focus:ring-2 focus:ring-sky-400"
                placeholder="Enter your full name"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-sky-900 mb-2">EMAIL :</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-full bg-sky-200/70 px-5 py-3 outline-none focus:ring-2 focus:ring-sky-400"
                placeholder="Enter your email"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-sky-900 mb-2">PASSWORD :</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-full bg-sky-200/70 px-5 py-3 outline-none focus:ring-2 focus:ring-sky-400"
                placeholder="Enter your password"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-full bg-sky-300 hover:bg-sky-400 text-sky-900 font-semibold py-3"
            >
              SIGN UP
            </button>
          </div>
        </form>
        <div className="mt-6 text-center">
          <button
            onClick={() => setCurrentView('login')}
            className="text-sky-600 hover:text-sky-700 font-medium"
          >
            Already have an account? Sign In
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;