import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const navItems = [
  { label: 'Dashboard', path: '/admin', icon: '⭐' },
  { label: 'Patients', path: '/patients', icon: '👥' },
  { label: 'Appointments', path: '/calendar', icon: '📅' },
];

const Sidebar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <aside className="w-64 bg-sidebar text-white flex flex-col h-screen min-h-screen shadow-xl fixed left-0 top-0 z-30 md:relative md:w-64">
      <div className="h-20 flex items-center justify-center text-2xl font-bold border-b border-sidebarLight">
        <span role="img" aria-label="tooth" className="mr-2">🦷</span> Doctor's Clinic
      </div>
      <nav className="flex-1 py-4 flex flex-col justify-between">
        <div>
          {navItems.map(item => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-6 py-3 rounded-l-full mb-2 transition-colors text-base font-medium ${isActive ? 'bg-primary text-white' : 'hover:bg-sidebarLight'}`
              }
            >
              <span className="text-xl">{item.icon}</span>
              {item.label}
            </NavLink>
          ))}
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-6 py-3 rounded-l-full mb-2 transition-colors text-base font-medium hover:bg-sidebarLight w-full text-left"
          >
            <span className="text-xl" role="img" aria-label="logout">🚪</span>
            Logout
          </button>
        </div>
        <div className="p-4 border-t border-sidebarLight flex items-center bg-sidebarLight/50 mt-auto">
          <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="avatar" className="w-10 h-10 rounded-full mr-3 border-2 border-primary object-cover" />
          <div>
            <div className="font-semibold">Dr. Rivera</div>
            <div className="text-xs text-blue-200">Admin</div>
          </div>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
