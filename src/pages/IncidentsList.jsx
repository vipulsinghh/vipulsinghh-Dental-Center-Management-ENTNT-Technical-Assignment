import React from 'react';
import { useIncidents } from '../context/IncidentsContext';
import { usePatients } from '../context/PatientsContext';
import { format, parseISO } from 'date-fns';

const IncidentsList = () => {
  const { incidents } = useIncidents();
  const { patients } = usePatients();

  return (
    <div className="p-4 max-w-5xl mx-auto w-full">
      <h2 className="text-2xl font-bold mb-4">All Appointments / Incidents</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white/80 rounded-xl shadow">
          <thead>
            <tr>
              <th className="px-2 py-1">Date</th>
              <th className="px-2 py-1">Patient</th>
              <th className="px-2 py-1">Title</th>
              <th className="px-2 py-1">Status</th>
              <th className="px-2 py-1">Cost</th>
              <th className="px-2 py-1">Files</th>
            </tr>
          </thead>
          <tbody>
            {incidents.length === 0 && (
              <tr><td colSpan={6} className="text-center py-2">No incidents found.</td></tr>
            )}
            {incidents.map(inc => {
              const patient = patients.find(p => p.id === inc.patientId);
              return (
                <tr key={inc.id} className="border-t">
                  <td className="px-2 py-1">{format(parseISO(inc.appointmentDate), 'PPP p')}</td>
                  <td className="px-2 py-1">{patient?.name || 'Unknown'}</td>
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
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default IncidentsList;
