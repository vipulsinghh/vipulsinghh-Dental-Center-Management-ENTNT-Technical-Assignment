import React from 'react';
import { useAuth } from '../context/AuthContext';
import { usePatients } from '../context/PatientsContext';
import { useIncidents } from '../context/IncidentsContext';
import { format, parseISO, isAfter } from 'date-fns';

const PatientDashboard = () => {
  const { user } = useAuth();
  const { patients } = usePatients();
  const { incidents } = useIncidents();

  // Find the patient record for the logged-in user
  const patient = patients.find(p => p.id === user?.patientId);
  if (!patient) return <div className="p-4">Patient record not found.</div>;

  // Filter incidents for this patient
  const patientIncidents = incidents.filter(i => i.patientId === patient.id);
  const now = new Date();
  const upcoming = patientIncidents.filter(i => isAfter(parseISO(i.appointmentDate), now)).sort((a, b) => new Date(a.appointmentDate) - new Date(b.appointmentDate));
  const history = patientIncidents.filter(i => !isAfter(parseISO(i.appointmentDate), now)).sort((a, b) => new Date(b.appointmentDate) - new Date(a.appointmentDate));

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 via-white to-blue-200 relative overflow-hidden p-0 sm:p-8">
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-blue-300 rounded-full opacity-30 blur-3xl animate-pulse z-0" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-blue-400 rounded-full opacity-20 blur-3xl animate-pulse z-0" />
      <div className="flex flex-col items-center w-full z-10">
        <div className="flex flex-col items-center mb-6">
          <span className="text-5xl mb-2 animate-bounce">🦷</span>
          <h1 className="text-4xl font-extrabold text-blue-700 drop-shadow mb-1 tracking-tight">Doctor's Clinic</h1>
          <p className="text-blue-500 text-lg font-medium mb-2">Patient Dashboard</p>
        </div>
        <div className="bg-white/90 p-10 rounded-3xl shadow-2xl w-full max-w-2xl border border-blue-100 backdrop-blur-md flex flex-col items-center">
          <h1 className="text-3xl sm:text-2xl xs:text-xl font-bold mb-4 text-center">Welcome, {patient.name}</h1>
          <div className="mb-2">
            <div className="font-semibold">Contact:</div>
            <div>{patient.contact}</div>
            <div className="font-semibold mt-2">Health Info:</div>
            <div>{patient.healthInfo}</div>
          </div>
          <h2 className="text-xl font-semibold mt-4 mb-2">Upcoming Appointments</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm mb-4">
              <thead>
                <tr>
                  <th className="px-2 py-1">Date</th>
                  <th className="px-2 py-1">Title</th>
                  <th className="px-2 py-1">Status</th>
                  <th className="px-2 py-1">Cost</th>
                </tr>
              </thead>
              <tbody>
                {upcoming.length === 0 && <tr><td colSpan={4} className="text-center py-2">No upcoming appointments.</td></tr>}
                {upcoming.map(inc => (
                  <tr key={inc.id} className="border-t">
                    <td className="px-2 py-1">{format(parseISO(inc.appointmentDate), 'PPP p')}</td>
                    <td className="px-2 py-1">{inc.title}</td>
                    <td className="px-2 py-1">{inc.status}</td>
                    <td className="px-2 py-1">${inc.cost}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <h2 className="text-xl font-semibold mt-4 mb-2">Appointment History</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr>
                  <th className="px-2 py-1">Date</th>
                  <th className="px-2 py-1">Title</th>
                  <th className="px-2 py-1">Status</th>
                  <th className="px-2 py-1">Cost</th>
                  <th className="px-2 py-1">Files</th>
                </tr>
              </thead>
              <tbody>
                {history.length === 0 && <tr><td colSpan={5} className="text-center py-2">No history found.</td></tr>}
                {history.map(inc => (
                  <tr key={inc.id} className="border-t">
                    <td className="px-2 py-1">{format(parseISO(inc.appointmentDate), 'PPP p')}</td>
                    <td className="px-2 py-1">{inc.title}</td>
                    <td className="px-2 py-1">{inc.status}</td>
                    <td className="px-2 py-1">${inc.cost}</td>
                    <td className="px-2 py-1">
                      {inc.files && inc.files.length > 0 ? (
                        <ul className="space-y-1">
                          {inc.files.map(f => (
                            <li key={f.name}>
                              <a href={f.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline text-xs">{f.name}</a>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <span className="text-xs text-gray-400">No files</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="mt-8 text-center text-blue-400 text-xs opacity-80">
          &copy; {new Date().getFullYear()} entnt.in. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;
