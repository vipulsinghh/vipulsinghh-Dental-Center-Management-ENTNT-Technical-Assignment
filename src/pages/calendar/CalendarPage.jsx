import React, { useState } from 'react';
import { useIncidents } from '../../context/IncidentsContext';
import { usePatients } from '../../context/PatientsContext';
import { addMonths, startOfMonth, endOfMonth, eachDayOfInterval, format, isSameDay, parseISO } from 'date-fns';

const getMonthDays = (date) => {
  const start = startOfMonth(date);
  const end = endOfMonth(date);
  return eachDayOfInterval({ start, end });
};

const CalendarPage = () => {
  const { incidents } = useIncidents();
  const { patients } = usePatients();
  const [monthOffset, setMonthOffset] = useState(-1); // start at past 1 month
  const [selectedDay, setSelectedDay] = useState(null);
  const current = addMonths(new Date(), monthOffset);
  const days = getMonthDays(current);

  const getIncidentsForDay = (day) =>
    incidents.filter(i => isSameDay(parseISO(i.appointmentDate), day));

  return (
    <div className="p-4 max-w-5xl mx-auto w-full">
      <h2 className="text-2xl font-bold mb-4">Calendar</h2>
      <div className="flex justify-between items-center mb-2">
        <button
          className="px-2 py-1 text-xs bg-gray-200 rounded hover:bg-gray-300"
          onClick={() => setMonthOffset(m => m - 1)}
          disabled={monthOffset === -1}
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
      <div className="grid grid-cols-7 gap-2 mb-6">
        {['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map(d => (
          <div key={d} className="text-center font-semibold">{d}</div>
        ))}
        {days.map(day => {
          const incs = getIncidentsForDay(day);
          return (
            <div
              key={day}
              className={`rounded-lg p-2 min-h-[60px] border cursor-pointer ${selectedDay && isSameDay(day, selectedDay) ? 'bg-blue-200' : 'bg-white/80'} ${incs.length ? 'border-blue-400' : 'border-gray-200'}`}
              onClick={() => setSelectedDay(day)}
            >
              <div className="text-xs text-gray-500">{format(day, 'd')}</div>
              {incs.length > 0 && (
                <div className="mt-1 text-xs text-blue-700 font-bold">{incs.length} appt</div>
              )}
            </div>
          );
        })}
      </div>
      {selectedDay && (
        <div className="bg-white/80 rounded-xl shadow p-4">
          <h3 className="font-semibold mb-2">Appointments on {format(selectedDay, 'PPP')}</h3>
          <ul>
            {getIncidentsForDay(selectedDay).length === 0 && <li>No appointments.</li>}
            {getIncidentsForDay(selectedDay).map(inc => {
              const patient = patients.find(p => p.id === inc.patientId);
              return (
                <li key={inc.id} className="mb-2">
                  <b>{inc.title}</b> for <span className="text-blue-600">{patient?.name || 'Unknown'}</span> at {format(parseISO(inc.appointmentDate), 'p')}<br/>
                  <span className="text-xs text-gray-500">{inc.status} | ${inc.cost}</span>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CalendarPage;
