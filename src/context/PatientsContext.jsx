// src/context/PatientsContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { getMockData, setMockData } from '../utils/mockData';

const PatientsContext = createContext();

export const PatientsProvider = ({ children }) => {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    setPatients(getMockData('patients'));
  }, []);

  const addPatient = (patient) => {
    const updated = [...patients, patient];
    setPatients(updated);
    setMockData('patients', updated);
  };

  const updatePatient = (id, updatedPatient) => {
    const updated = patients.map(p => p.id === id ? { ...p, ...updatedPatient } : p);
    setPatients(updated);
    setMockData('patients', updated);
  };

  const deletePatient = (id) => {
    const updated = patients.filter(p => p.id !== id);
    setPatients(updated);
    setMockData('patients', updated);
  };

  return (
    <PatientsContext.Provider value={{ patients, addPatient, updatePatient, deletePatient }}>
      {children}
    </PatientsContext.Provider>
  );
};

export const usePatients = () => useContext(PatientsContext);
