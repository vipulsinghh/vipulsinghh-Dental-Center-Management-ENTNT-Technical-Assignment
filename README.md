# Doctor's Clinic – Dental Center Management Dashboard

A modern, responsive web application for managing a dental clinic. Built with React, Vite, TailwindCSS, and Context API, this dashboard is designed for both doctors (admins) and patients, providing a seamless experience for appointment management, patient records, and clinic analytics.

## Features

- **Role-based login:** Separate panels for Admin (Doctor) and Patient
- **Patient management:** Add, edit, view, and delete patient records (Admin only)
- **Appointment management:** Schedule, edit, and track appointments with file uploads
- **Dashboard KPIs:** View upcoming appointments, pending/completed treatments, revenue, and top patients
- **Interactive calendar:** Visualize and manage appointments by date
- **Responsive design:** Works beautifully on desktop, tablet, and mobile
- **Local data:** All data is stored in the browser (no backend required)
- **Demo data:** Easily reset to sample data for testing

## Getting Started

1. **Install dependencies:**
   ```sh
   npm install
   ```
2. **Start the development server:**
   ```sh
   npm run dev
   ```
3. **Open in your browser:**
   Visit [http://localhost:5173](http://localhost:5173)

## Demo Credentials

- **Admin:**  
  Email: `admin@doctorsclinic.com`  
  Password: `admin123`
- **Patient:**  
  Email: `john@doctorsclinic.com`  
  Password: `patient123`

## Tech Stack
- React (Vite)
- TailwindCSS
- Context API
- LocalStorage (for data persistence)

## Folder Structure
```
src/
  components/      # Sidebar, Topbar, etc.
  context/         # Context providers for auth, patients, incidents
  layout/          # Dashboard layout
  pages/           # Dashboard, Login, Patients, Calendar, etc.
  utils/           # Mock data and helpers
public/
  # Static assets
```


