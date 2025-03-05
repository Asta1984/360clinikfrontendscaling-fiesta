// src/pages/PatientDashboard.tsx
import React, { useEffect } from 'react';
import axios from 'axios';
import AppointmentCard, { Appointment } from '../components/AppointmentCard';
import { useAppointmentStore } from '../store/appointmentStore';
import { useAuthStore } from '../store/authStore';

const PatientDashboard: React.FC = () => {
  const { appointments, setAppointments, cancelAppointment } = useAppointmentStore();
  const { token } = useAuthStore();

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await axios.get('/api/v1/appointments/patient', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAppointments(res.data.appointments);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };

    fetchAppointments();
  }, [setAppointments, token]);

  const handleCancel = async (appointmentId: string) => {
    try {
      await cancelAppointment(appointmentId, token);
    } catch (error) {
      console.error('Error cancelling appointment:', error);
    }
  };

  return (
    <div className="patient-dashboard">
      <h2>My Appointments</h2>
      {appointments.length === 0 ? (
        <p>No appointments found.</p>
      ) : (
        appointments.map((appointment: Appointment) => (
          <AppointmentCard key={appointment.id} appointment={appointment} onCancel={handleCancel} />
        ))
      )}
    </div>
  );
};

export default PatientDashboard;
