// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Login from './pages/Auth/Login';
import Signup from './pages/Auth/Signup';
import DoctorSearch from './pages/DoctorSearch';
import DoctorProfile from './pages/DoctorProfile';
import AppointmentBooking from './pages/AppointmentBooking';
import DoctorDashboard from './pages/DoctorDashboard';
import PatientDashboard from './pages/PatientDashboard';

const App: React.FC = () => {
  return (
    <Router>
      <Header />
      <Routes>
        {/* Auth Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Public Routes */}
        <Route path="/search" element={<DoctorSearch />} />
        <Route path="/doctor/:doctorId" element={<DoctorProfile />} />

        {/* Patient Portal */}
        <Route path="/patient/dashboard" element={<PatientDashboard />} />
        <Route path="/book/:doctorId" element={<AppointmentBooking />} />

        {/* Doctor Dashboard */}
        <Route path="/doctor/dashboard" element={<DoctorDashboard />} />

        {/* Default */}
        <Route path="/" element={<DoctorSearch />} />
      </Routes>
    </Router>
  );
};

export default App;
