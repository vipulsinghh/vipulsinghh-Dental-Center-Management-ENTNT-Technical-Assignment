import React, { useState } from 'react';
import Sidebar from '../components/sidebar/Sidebar';
import Topbar from '../components/topbar/Topbar';
import { initializeMockData } from '../utils/mockData';

const handleResetDemo = () => {
  localStorage.clear();
  initializeMockData();
  window.location.reload();
};

const DashboardLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen w-full bg-gray-50">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 flex flex-col min-w-0 w-full">
        <Topbar onSidebarToggle={() => setSidebarOpen((v) => !v)} />
        <div className="flex justify-end p-2 w-full">
          <button onClick={handleResetDemo} className="bg-pink-500 text-white px-3 py-1 rounded text-xs shadow hover:bg-pink-600 transition">Reset Demo Data</button>
        </div>
        <main className="flex-1 p-0 sm:p-2 md:p-4 overflow-y-auto w-full min-w-0 flex flex-col">
          <div className="flex-1 w-full h-full flex flex-col">
            <div className="flex-1 w-full h-full flex flex-col justify-stretch items-stretch">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
