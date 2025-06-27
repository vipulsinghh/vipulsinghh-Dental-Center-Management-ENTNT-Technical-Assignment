import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const USERS = [
  { id: '1', role: 'Admin', email: 'admin@doctorsclinic.com', password: 'admin123' },
  { id: '2', role: 'Patient', email: 'john@doctorsclinic.com', password: 'patient123', patientId: 'p1' }
];

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  });

  const login = (email, password) => {
    const found = USERS.find(u => u.email === email && u.password === password);
    if (found) {
      setUser(found);
      localStorage.setItem('user', JSON.stringify(found));
      return { success: true, role: found.role };
    }
    return { success: false };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
