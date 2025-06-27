import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { usePatients } from '../../context/PatientsContext';
import { useIncidents } from '../../context/IncidentsContext';
import { useAuth } from '../../context/AuthContext';

function toBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

const defaultIncident = {
  title: '',
  description: '',
  comments: '',
  appointmentDate: '',
  cost: '',
  status: 'Scheduled',
  files: []
};

const PatientProfile = () => {
  const { id } = useParams();
  const { patients } = usePatients();
  const { user } = useAuth();
  const { incidents, addIncident, updateIncident, deleteIncident } = useIncidents();
  const patient = patients.find(p => p.id === id);
  const patientIncidents = incidents.filter(i => i.patientId === id);

  // Incident form state
  const [form, setForm] = useState(defaultIncident);
  const [editingId, setEditingId] = useState(null);
  const [uploading, setUploading] = useState(false);

  if (!patient) return <div className="p-4">Patient not found.</div>;

  const handleInput = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const handleFile = async e => {
    setUploading(true);
    const files = Array.from(e.target.files);
    const fileObjs = await Promise.all(files.map(async file => ({
      name: file.name,
      url: await toBase64(file)
    })));
    setForm(f => ({ ...f, files: [...(f.files || []), ...fileObjs] }));
    setUploading(false);
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!form.title || !form.appointmentDate) return;
    const incidentData = {
      ...form,
      id: editingId || 'i' + Date.now(),
      patientId: id,
      cost: Number(form.cost) || 0
    };
    if (editingId) {
      updateIncident(editingId, incidentData);
    } else {
      addIncident(incidentData);
    }
    setForm(defaultIncident);
    setEditingId(null);
  };

  const handleEdit = inc => {
    setForm({ ...inc, cost: inc.cost || '' });
    setEditingId(inc.id);
  };

  const handleDelete = incId => {
    if (window.confirm('Delete this appointment?')) deleteIncident(incId);
  };

  const handleRemoveFile = idx => {
    setForm(f => ({ ...f, files: f.files.filter((_, i) => i !== idx) }));
  };

  return (
    <div className="p-4 max-w-3xl mx-auto w-full">
      <h2 className="text-xl font-bold mb-2">{patient.name} - Profile</h2>
      <div className="mb-4 bg-white/80 rounded-xl shadow p-4">
        <div><b>DOB:</b> {patient.dob}</div>
        <div><b>Contact:</b> {patient.contact}</div>
        <div><b>Health Info:</b> {patient.healthInfo}</div>
      </div>
      {user?.role === 'Admin' && (
        <form onSubmit={handleSubmit} className="mb-6 bg-white/80 rounded-xl shadow p-4 flex flex-col gap-2">
          <h3 className="font-semibold mb-2">{editingId ? 'Edit' : 'Add'} Appointment / Incident</h3>
          <div className="flex flex-col sm:flex-row gap-2">
            <input name="title" value={form.title} onChange={handleInput} placeholder="Title" className="input input-bordered flex-1" required />
            <input name="appointmentDate" value={form.appointmentDate} onChange={handleInput} type="datetime-local" className="input input-bordered flex-1" required />
          </div>
          <textarea name="description" value={form.description} onChange={handleInput} placeholder="Description" className="input input-bordered" />
          <textarea name="comments" value={form.comments} onChange={handleInput} placeholder="Comments" className="input input-bordered" />
          <div className="flex flex-col sm:flex-row gap-2">
            <input name="cost" value={form.cost} onChange={handleInput} type="number" placeholder="Cost" className="input input-bordered flex-1" />
            <select name="status" value={form.status} onChange={handleInput} className="input input-bordered flex-1">
              <option>Scheduled</option>
              <option>Pending</option>
              <option>Completed</option>
              <option>Cancelled</option>
            </select>
          </div>
          <div>
            <label className="block mb-1">Files:</label>
            <input type="file" multiple onChange={handleFile} className="mb-2" disabled={uploading} />
            <div className="flex flex-wrap gap-2">
              {form.files && form.files.map((f, idx) => (
                <div key={idx} className="bg-gray-100 px-2 py-1 rounded flex items-center gap-1 text-xs">
                  <a href={f.url} target="_blank" rel="noopener noreferrer">{f.name}</a>
                  <button type="button" onClick={() => handleRemoveFile(idx)} className="text-red-500 ml-1">✕</button>
                </div>
              ))}
            </div>
          </div>
          <div className="flex gap-2 mt-2">
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">{editingId ? 'Update' : 'Add'}</button>
            {editingId && <button type="button" onClick={() => { setForm(defaultIncident); setEditingId(null); }} className="bg-gray-300 px-4 py-2 rounded">Cancel</button>}
          </div>
        </form>
      )}
      <h3 className="text-lg font-semibold mb-2">Appointments & Treatments</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white/80 rounded-xl shadow">
          <thead>
            <tr>
              <th className="px-2 py-1">Date</th>
              <th className="px-2 py-1">Title</th>
              <th className="px-2 py-1">Status</th>
              <th className="px-2 py-1">Cost</th>
              <th className="px-2 py-1">Files</th>
              {user?.role === 'Admin' && <th className="px-2 py-1">Actions</th>}
            </tr>
          </thead>
          <tbody>
            {patientIncidents.length === 0 && (
              <tr><td colSpan={user?.role === 'Admin' ? 6 : 5} className="text-center py-2">No appointments found.</td></tr>
            )}
            {patientIncidents.map(inc => (
              <tr key={inc.id} className="border-t">
                <td className="px-2 py-1">{new Date(inc.appointmentDate).toLocaleString()}</td>
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
                {user?.role === 'Admin' && (
                  <td className="px-2 py-1 flex gap-2">
                    <button onClick={() => handleEdit(inc)} className="text-blue-600 underline text-xs">Edit</button>
                    <button onClick={() => handleDelete(inc.id)} className="text-red-600 underline text-xs">Delete</button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PatientProfile;
