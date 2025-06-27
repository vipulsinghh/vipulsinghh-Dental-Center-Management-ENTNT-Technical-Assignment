import React from 'react';

const AdminDashboard = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 via-white to-blue-200 relative overflow-hidden p-0 sm:p-8">
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-blue-300 rounded-full opacity-30 blur-3xl animate-pulse z-0" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-blue-400 rounded-full opacity-20 blur-3xl animate-pulse z-0" />
      <div className="flex flex-col items-center w-full z-10">
        <div className="flex flex-col items-center mb-6">
          <span className="text-5xl mb-2 animate-bounce">🦷</span>
          <h1 className="text-4xl font-extrabold text-blue-700 drop-shadow mb-1 tracking-tight">Doctor's Clinic</h1>
          <p className="text-blue-500 text-lg font-medium mb-2">Admin Dashboard</p>
        </div>
        <div className="bg-white/90 p-10 rounded-3xl shadow-2xl w-full max-w-2xl border border-blue-100 backdrop-blur-md flex flex-col items-center">
          <h2 className="text-2xl font-bold mb-6 text-center text-blue-700 tracking-wide">Welcome, Dentist!</h2>
          <p className="text-blue-600 text-lg mb-4 text-center">KPIs, upcoming appointments, and management panels will appear here.</p>
          {/* Add more dashboard content here as needed */}
        </div>
        <div className="mt-8 text-center text-blue-400 text-xs opacity-80">
          &copy; {new Date().getFullYear()} Doctor's Clinic. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
