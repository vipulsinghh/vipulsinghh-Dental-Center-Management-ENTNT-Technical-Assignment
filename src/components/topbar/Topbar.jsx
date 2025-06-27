import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Topbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="h-16 flex items-center justify-between px-2 sm:px-4 md:px-8 bg-white shadow border-b w-full min-w-0">
      <div />
      <div className="flex items-center gap-2 sm:gap-4">
        <span className="bg-primary/10 text-primary px-2 sm:px-3 py-1 rounded-full text-xs font-semibold">{user?.role === 'Admin' ? 'Admin' : 'Patient'}</span>
        <button className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gray-200 flex items-center justify-center border border-gray-300">
          <span role="img" aria-label="user">👤</span>
        </button>
        <button
          className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-red-100 text-red-600"
          onClick={handleLogout}
        >
          <span role="img" aria-label="logout">🚪</span>
        </button>
      </div>
    </header>
  );
};

export default Topbar;
