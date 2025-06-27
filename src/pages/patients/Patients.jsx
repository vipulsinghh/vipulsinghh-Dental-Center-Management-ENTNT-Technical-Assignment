import React, { useState } from 'react';
import { usePatients } from '../../context/PatientsContext';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const defaultPatient = {
  name: '',
  dob: '',
  contact: '',
  healthInfo: ''
};

const Patients = () => {
  const { patients, addPatient, updatePatient, deletePatient } = usePatients();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState(defaultPatient);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  if (!user || user.role !== 'Admin') return <div className="p-4">Access denied.</div>;

  const handleInput = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!form.name || !form.dob || !form.contact) return;
    const patientData = {
      ...form,
      id: editingId || 'p' + Date.now()
    };
    if (editingId) {
      updatePatient(editingId, patientData);
    } else {
      addPatient(patientData);
    }
    setForm(defaultPatient);
    setEditingId(null);
    setShowForm(false);
  };

  const handleEdit = p => {
    setForm({ ...p });
    setEditingId(p.id);
    setShowForm(true);
  };

  const handleDelete = id => {
    if (window.confirm('Delete this patient?')) deletePatient(id);
  };

  return (
    <div className="p-4 max-w-4xl mx-auto w-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Patients</h2>
        <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={() => { setShowForm(true); setForm(defaultPatient); setEditingId(null); }}>Add Patient</button>
      </div>
      {showForm && (
        <form onSubmit={handleSubmit} className="mb-6 bg-white/80 rounded-xl shadow p-4 flex flex-col gap-2">
          <h3 className="font-semibold mb-2">{editingId ? 'Edit' : 'Add'} Patient</h3>
          <div className="flex flex-col sm:flex-row gap-2">
            <input name="name" value={form.name} onChange={handleInput} placeholder="Full Name" className="input input-bordered flex-1" required />
            <input name="dob" value={form.dob} onChange={handleInput} type="date" className="input input-bordered flex-1" required />
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <input name="contact" value={form.contact} onChange={handleInput} placeholder="Contact" className="input input-bordered flex-1" required />
            <input name="healthInfo" value={form.healthInfo} onChange={handleInput} placeholder="Health Info" className="input input-bordered flex-1" />
          </div>
          <div className="flex gap-2 mt-2">
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">{editingId ? 'Update' : 'Add'}</button>
            <button type="button" onClick={() => { setShowForm(false); setEditingId(null); setForm(defaultPatient); }} className="bg-gray-300 px-4 py-2 rounded">Cancel</button>
          </div>
        </form>
      )}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white/80 rounded-xl shadow">
          <thead>
            <tr>
              <th className="px-2 py-1">Name</th>
              <th className="px-2 py-1">DOB</th>
              <th className="px-2 py-1">Contact</th>
              <th className="px-2 py-1">Health Info</th>
              <th className="px-2 py-1">Actions</th>
            </tr>
          </thead>
          <tbody>
            {patients.length === 0 && (
              <tr><td colSpan={5} className="text-center py-2">No patients found.</td></tr>
            )}
            {patients.map(p => (
              <tr key={p.id} className="border-t hover:bg-blue-50 cursor-pointer" onClick={e => { if (e.target.tagName !== 'BUTTON') navigate(`/patients/${p.id}`); }}>
                <td className="px-2 py-1">{p.name}</td>
                <td className="px-2 py-1">{p.dob}</td>
                <td className="px-2 py-1">{p.contact}</td>
                <td className="px-2 py-1">{p.healthInfo}</td>
                <td className="px-2 py-1 flex gap-2">
                  <button onClick={e => { e.stopPropagation(); handleEdit(p); }} className="text-blue-600 underline text-xs">Edit</button>
                  <button onClick={e => { e.stopPropagation(); handleDelete(p.id); }} className="text-red-600 underline text-xs">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Patients;
