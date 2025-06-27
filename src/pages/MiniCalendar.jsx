import React, { useState } from 'react';
import { useIncidents } from '../context/IncidentsContext';
import { usePatients } from '../context/PatientsContext';
import { addMonths, startOfMonth, endOfMonth, eachDayOfInterval, format, isSameDay, parseISO } from 'date-fns';

const getMonthDays = (date) => {
  const start = startOfMonth(date);
  const end = endOfMonth(date);
  return eachDayOfInterval({ start, end });
};

const MiniCalendar = () => {
  const { incidents } = useIncidents();
  const { patients } = usePatients();
  const [monthOffset, setMonthOffset] = useState(0);
  const [selectedDay, setSelectedDay] = useState(null);
  const current = addMonths(new Date(), monthOffset);
  const days = getMonthDays(current);

  const getIncidentsForDay = (day) =>
    incidents.filter(i => isSameDay(parseISO(i.appointmentDate), day));

  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <button
          className="px-2 py-1 text-xs bg-gray-200 rounded hover:bg-gray-300"
          onClick={() => setMonthOffset(m => m - 1)}
          disabled={monthOffset === 0}
        >
          Prev
        </button>
        <div className="font-bold text-sm">{format(current, 'MMMM yyyy')}</div>
        <button
          className="px-2 py-1 text-xs bg-gray-200 rounded hover:bg-gray-300"
          onClick={() => setMonthOffset(m => m + 1)}
          disabled={monthOffset === 3}
        >
          Next
        </button>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center text-xs mb-2">
        {['S','M','T','W','T','F','S'].map(d => (
          <div key={d} className="font-bold">{d}</div>
        ))}
        {days.map(day => {
          const incs = getIncidentsForDay(day);
          return (
            <div
              key={day}
              className={`py-1 rounded cursor-pointer ${selectedDay && isSameDay(day, selectedDay) ? 'bg-blue-200' : 'hover:bg-blue-100'} ${incs.length ? 'border border-blue-400' : ''}`}
              onClick={() => setSelectedDay(day)}
            >
              <div>{format(day, 'd')}</div>
              {incs.length > 0 && <div className="text-blue-600 font-bold">{incs.length}</div>}
            </div>
          );
        })}
      </div>
      {selectedDay && (
        <div className="bg-white/80 rounded-xl shadow p-2 mt-2">
          <div className="font-semibold mb-1 text-xs">Appointments on {format(selectedDay, 'PPP')}</div>
          <ul>
            {getIncidentsForDay(selectedDay).length === 0 && <li className="text-xs">No appointments.</li>}
            {getIncidentsForDay(selectedDay).map(inc => {
              const patient = patients.find(p => p.id === inc.patientId);
              return (
                <li key={inc.id} className="mb-1 text-xs">
                  <b>{inc.title}</b> for <span className="text-blue-600">{patient?.name || 'Unknown'}</span> at {format(parseISO(inc.appointmentDate), 'p')}<br/>
                  <span className="text-gray-500">{inc.status} | ${inc.cost}</span>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default MiniCalendar;
