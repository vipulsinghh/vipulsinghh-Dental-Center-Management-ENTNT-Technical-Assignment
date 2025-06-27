// src/context/IncidentsContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { getMockData, setMockData } from '../utils/mockData';

const IncidentsContext = createContext();

export const IncidentsProvider = ({ children }) => {
  const [incidents, setIncidents] = useState([]);

  useEffect(() => {
    setIncidents(getMockData('incidents'));
  }, []);

  const addIncident = (incident) => {
    const updated = [...incidents, incident];
    setIncidents(updated);
    setMockData('incidents', updated);
  };

  const updateIncident = (id, updatedIncident) => {
    const updated = incidents.map(i => i.id === id ? { ...i, ...updatedIncident } : i);
    setIncidents(updated);
    setMockData('incidents', updated);
  };

  const deleteIncident = (id) => {
    const updated = incidents.filter(i => i.id !== id);
    setIncidents(updated);
    setMockData('incidents', updated);
  };

  return (
    <IncidentsContext.Provider value={{ incidents, addIncident, updateIncident, deleteIncident }}>
      {children}
    </IncidentsContext.Provider>
  );
};

export const useIncidents = () => useContext(IncidentsContext);
