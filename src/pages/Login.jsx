import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Login = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = e => {
    e.preventDefault();
    const res = login(email, password);
    if (res.success) {
      if (res.role === 'Admin') navigate('/admin');
      else navigate('/patient');
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-blue-200 relative overflow-hidden">
      {/* Decorative background shapes */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-blue-300 rounded-full opacity-30 blur-3xl animate-pulse z-0" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-blue-400 rounded-full opacity-20 blur-3xl animate-pulse z-0" />
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="flex flex-col items-center w-full z-10"
      >
        <div className="flex flex-col items-center mb-6">
          <span className="text-5xl mb-2 animate-bounce">🦷</span>
          <h1 className="text-4xl font-extrabold text-blue-700 drop-shadow mb-1 tracking-tight">Doctor's Clinic</h1>
          <p className="text-blue-500 text-lg font-medium mb-2">Dental Center Management</p>
        </div>
        <form onSubmit={handleSubmit} className="bg-white/90 p-10 rounded-3xl shadow-2xl w-full max-w-md border border-blue-100 backdrop-blur-md">
          <h2 className="text-2xl font-bold mb-6 text-center text-blue-700 tracking-wide">Sign in to your account</h2>
          {error && <div className="text-red-500 mb-4 text-center font-semibold animate-shake">{error}</div>}
          <div className="mb-5">
            <label className="block text-sm font-semibold text-blue-700 mb-1" htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full px-4 py-3 border-2 border-blue-200 rounded-xl focus:outline-none focus:border-blue-500 bg-blue-50 text-blue-900 text-base transition"
              required
              autoFocus
            />
          </div>
          <div className="mb-5">
            <label className="block text-sm font-semibold text-blue-700 mb-1" htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full px-4 py-3 border-2 border-blue-200 rounded-xl focus:outline-none focus:border-blue-500 bg-blue-50 text-blue-900 text-base transition"
              required
            />
          </div>
          <div className="flex items-center mb-6">
            <input
              type="checkbox"
              id="remember"
              checked={remember}
              onChange={e => setRemember(e.target.checked)}
              className="mr-2 accent-blue-600"
            />
            <label htmlFor="remember" className="text-sm text-blue-700">Remember me</label>
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-blue-400 text-white py-3 rounded-xl font-bold text-lg shadow-lg hover:from-blue-700 hover:to-blue-500 transition-all duration-200 mb-3 tracking-wide"
          >
            Login
          </button>
          <div className="text-xs text-blue-500 mt-4 text-center select-text">
            <span className="block mb-1">Demo Admin: <b>admin@doctorsclinic.com</b> / <b>admin123</b></span>
            <span>Demo Patient: <b>john@doctorsclinic.com</b> / <b>patient123</b></span>
          </div>
        </form>
        <div className="mt-8 text-center text-blue-400 text-xs opacity-80">
          &copy; {new Date().getFullYear()} Doctor's Clinic. All rights reserved.
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
