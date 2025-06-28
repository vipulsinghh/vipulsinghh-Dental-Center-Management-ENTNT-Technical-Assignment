// src/utils/mockData.js

const INITIAL_DATA = {
  users: [
    { id: '1', role: 'Admin', email: 'admin@entnt.in', password: 'admin123' },
    { id: '2', role: 'Patient', email: 'john@entnt.in', password: 'patient123', patientId: 'p1' },
    { id: '3', role: 'Patient', email: 'jane@entnt.in', password: 'patient123', patientId: 'p2' },
    { id: '4', role: 'Patient', email: 'mike@entnt.in', password: 'patient123', patientId: 'p3' },
    { id: '5', role: 'Patient', email: 'mary@entnt.in', password: 'patient123', patientId: 'p4' },
    { id: '6', role: 'Patient', email: 'robert@entnt.in', password: 'patient123', patientId: 'p5' }
  ],
  patients: [
    {
      id: 'p1', name: 'John Doe', dob: '1990-05-10', contact: '1234567890', healthInfo: 'No allergies'
    },
    {
      id: 'p2', name: 'Jane Smith', dob: '1985-08-22', contact: '9876543210', healthInfo: 'Diabetic'
    },
    {
      id: 'p3', name: 'Mike Brown', dob: '1992-03-15', contact: '5551234567', healthInfo: 'Asthma'
    },
    {
      id: 'p4', name: 'Mary Johnson', dob: '1988-12-01', contact: '4449876543', healthInfo: 'Hypertension'
    },
    {
      id: 'p5', name: 'Robert Lee', dob: '1995-07-19', contact: '3332221111', healthInfo: 'No known issues'
    }
  ],
  incidents: [
    // John Doe (p1) - past, today, future
    { id: 'i1', patientId: 'p1', title: 'Tooth Extraction', description: 'Lower right molar', comments: 'Healing well', appointmentDate: '2025-06-10T10:00:00', cost: 150, status: 'Completed', files: [{ name: 'invoice1.pdf', url: 'base64string' }] },
    { id: 'i2', patientId: 'p1', title: 'Routine Checkup', description: 'Annual checkup', comments: 'All good', appointmentDate: '2025-06-28T09:00:00', cost: 50, status: 'Completed', files: [] },
    { id: 'i3', patientId: 'p1', title: 'Whitening', description: 'Teeth whitening', comments: 'Scheduled', appointmentDate: '2025-07-10T11:00:00', cost: 120, status: 'Scheduled', files: [] },
    // Jane Smith (p2)
    { id: 'i4', patientId: 'p2', title: 'Cavity Filling', description: 'Upper left', comments: 'Patient requested white filling', appointmentDate: '2025-06-15T14:00:00', cost: 90, status: 'Completed', files: [{ name: 'xray-jane.png', url: 'base64string' }] },
    { id: 'i5', patientId: 'p2', title: 'Braces Adjustment', description: 'Monthly adjustment', comments: 'Mild discomfort', appointmentDate: '2025-07-05T10:30:00', cost: 80, status: 'Scheduled', files: [] },
    // Mike Brown (p3)
    { id: 'i6', patientId: 'p3', title: 'Wisdom Tooth Consult', description: 'Consultation', comments: 'Surgery recommended', appointmentDate: '2025-06-20T16:00:00', cost: 60, status: 'Completed', files: [] },
    { id: 'i7', patientId: 'p3', title: 'Wisdom Tooth Surgery', description: 'Surgical extraction', comments: 'Upcoming', appointmentDate: '2025-07-15T13:00:00', cost: 300, status: 'Scheduled', files: [] },
    // Mary Johnson (p4)
    { id: 'i8', patientId: 'p4', title: 'Implant Follow-up', description: 'Check healing', comments: 'Healing well', appointmentDate: '2025-06-25T12:00:00', cost: 0, status: 'Completed', files: [] },
    { id: 'i9', patientId: 'p4', title: 'Implant Placement', description: 'Dental implant', comments: 'Procedure successful', appointmentDate: '2025-07-20T09:30:00', cost: 800, status: 'Scheduled', files: [{ name: 'implant-mary.pdf', url: 'base64string' }] },
    // Robert Lee (p5)
    { id: 'i10', patientId: 'p5', title: 'Deep Cleaning', description: 'Full mouth', comments: 'Patient satisfied', appointmentDate: '2025-06-18T15:00:00', cost: 200, status: 'Completed', files: [] },
    { id: 'i11', patientId: 'p5', title: 'Crown Placement', description: 'Upper right', comments: 'Temporary crown', appointmentDate: '2025-07-25T10:00:00', cost: 400, status: 'Scheduled', files: [] }
  ]
};

export function initializeMockData() {
  if (!localStorage.getItem('users')) {
    localStorage.setItem('users', JSON.stringify(INITIAL_DATA.users));
  }
  if (!localStorage.getItem('patients')) {
    localStorage.setItem('patients', JSON.stringify(INITIAL_DATA.patients));
  }
  if (!localStorage.getItem('incidents')) {
    localStorage.setItem('incidents', JSON.stringify(INITIAL_DATA.incidents));
  }
}

export function getMockData(key) {
  return JSON.parse(localStorage.getItem(key)) || [];
}

export function setMockData(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
