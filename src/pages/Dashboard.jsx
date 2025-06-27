import React from 'react';
import { useIncidents } from '../context/IncidentsContext';
import { usePatients } from '../context/PatientsContext';
import { format, parseISO, isAfter } from 'date-fns';
import MiniCalendar from './MiniCalendar';

const Dashboard = () => {
  const { incidents } = useIncidents();
  const { patients } = usePatients();

  const now = new Date();
  const upcoming = incidents.filter(i => isAfter(parseISO(i.appointmentDate), now)).sort((a, b) => new Date(a.appointmentDate) - new Date(b.appointmentDate));
  const next10 = upcoming.slice(0, 10);
  const pending = incidents.filter(i => i.status === 'Pending' || i.status === 'Scheduled');
  const completed = incidents.filter(i => i.status === 'Completed');
  const revenue = incidents.reduce((sum, i) => sum + (i.status === 'Completed' ? (i.cost || 0) : 0), 0);

  const patientStats = patients.map(p => {
    const patientIncidents = incidents.filter(i => i.patientId === p.id);
    return {
      ...p,
      total: patientIncidents.length,
      completed: patientIncidents.filter(i => i.status === 'Completed').length
    };
  }).sort((a, b) => b.total - a.total).slice(0, 5);

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-gradient-to-br from-blue-100 via-white to-blue-200 relative overflow-hidden p-0 sm:p-8">
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-blue-300 rounded-full opacity-30 blur-3xl animate-pulse z-0" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-blue-400 rounded-full opacity-20 blur-3xl animate-pulse z-0" />
      <div className="flex flex-col items-center w-full z-10">
        <div className="flex flex-col items-center mb-2">
          <p className="text-blue-500 text-lg font-medium mb-2">Dashboard</p>
        </div>
        <div className="bg-white/90 p-6 md:p-10 rounded-3xl shadow-2xl w-full max-w-5xl border border-blue-100 backdrop-blur-md flex flex-col items-center mt-0 md:-mt-10">
          <div className="space-y-6 w-full">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="card flex flex-col items-center">
                <div className="bg-blue-100 text-blue-600 rounded-full w-12 h-12 flex items-center justify-center text-2xl mb-2">📅</div>
                <div className="text-lg font-semibold">Upcoming Appointments</div>
                <div className="text-2xl font-bold">{upcoming.length}</div>
              </div>
              <div className="card flex flex-col items-center">
                <div className="bg-yellow-100 text-yellow-700 rounded-full w-12 h-12 flex items-center justify-center text-2xl mb-2">⏳</div>
                <div className="text-lg font-semibold">Pending Treatments</div>
                <div className="text-2xl font-bold">{pending.length}</div>
              </div>
              <div className="card flex flex-col items-center">
                <div className="bg-green-100 text-green-700 rounded-full w-12 h-12 flex items-center justify-center text-2xl mb-2">💲</div>
                <div className="text-lg font-semibold">Revenue</div>
                <div className="text-2xl font-bold">${revenue}</div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="card col-span-2">
                <div className="font-semibold mb-4">Next 10 Appointments</div>
                <ul>
                  {next10.length === 0 && <li>No upcoming appointments.</li>}
                  {next10.map(inc => {
                    const patient = patients.find(p => p.id === inc.patientId);
                    return (
                      <li key={inc.id} className="flex justify-between mb-2">
                        <span>{format(parseISO(inc.appointmentDate), 'PPP p')} - {patient?.name || 'Unknown'}</span>
                        <span className={`px-2 py-1 rounded text-xs ${inc.status === 'Completed' ? 'bg-green-100 text-green-700' : inc.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-blue-100 text-blue-700'}`}>{inc.status}</span>
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div className="card">
                <div className="font-semibold mb-4">This Month</div>
                <MiniCalendar />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="card">
                <div className="font-semibold mb-4">Top Patients</div>
                <table className="w-full text-sm">
                  <thead>
                    <tr>
                      <th className="text-left">Name</th>
                      <th>Appointments</th>
                      <th>Completed</th>
                    </tr>
                  </thead>
                  <tbody>
                    {patientStats.length === 0 && <tr><td colSpan={3}>No data</td></tr>}
                    {patientStats.map(p => (
                      <tr key={p.id}>
                        <td>{p.name}</td>
                        <td className="text-center">{p.total}</td>
                        <td className="text-center">{p.completed}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 text-center text-blue-400 text-xs opacity-80">
          &copy; {new Date().getFullYear()} Doctor's Clinic. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
