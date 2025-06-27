import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import PatientDashboard from './pages/PatientDashboard';
import Patients from './pages/patients/Patients';
import PatientProfile from './pages/patients/PatientProfile';
import CalendarPage from './pages/calendar/CalendarPage';
import DashboardLayout from './layout/DashboardLayout';
import IncidentsList from './pages/IncidentsList';
import './App.css';

const PrivateRoute = ({ children, role }) => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" />;
  if (role && user.role !== role) return <Navigate to="/login" />;
  return children;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/admin"
            element={
              <PrivateRoute role="Admin">
                <DashboardLayout>
                  <Dashboard />
                </DashboardLayout>
              </PrivateRoute>
            }
          />
          <Route
            path="/patient"
            element={
              <PrivateRoute role="Patient">
                <PatientDashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/patients"
            element={
              <PrivateRoute role="Admin">
                <DashboardLayout>
                  <Patients />
                </DashboardLayout>
              </PrivateRoute>
            }
          />
          <Route
            path="/patients/:id"
            element={
              <PrivateRoute>
                <DashboardLayout>
                  <PatientProfile />
                </DashboardLayout>
              </PrivateRoute>
            }
          />
          <Route
            path="/calendar"
            element={
              <PrivateRoute role="Admin">
                <DashboardLayout>
                  <CalendarPage />
                </DashboardLayout>
              </PrivateRoute>
            }
          />
          <Route
            path="/incidents"
            element={
              <PrivateRoute role="Admin">
                <DashboardLayout>
                  <IncidentsList />
                </DashboardLayout>
              </PrivateRoute>
            }
          />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
