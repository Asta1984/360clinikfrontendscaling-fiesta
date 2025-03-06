import { useEffect } from 'react';
import { useAppointmentStore } from '../store/appointmentStore';
import { useAuthStore } from '../store/authStore';
import AppointmentCard from '../components/AppointmentCard';
import axios from 'axios';
export default function Appointments() {
  const { appointments, setAppointments, cancelAppointment } = useAppointmentStore();
  const { token } = useAuthStore();

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await axios.get('/api/v1/appointments', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAppointments(res.data);
      } catch (err) {
        console.error('Failed to fetch appointments:', err);
      }
    };

    if (token) {
      fetchAppointments();
    }
  }, [token, setAppointments]);

  const handleCancel = async (appointmentId: string) => {
    if (token) {
      try {
        await cancelAppointment(appointmentId, token);
      } catch (err) {
        console.error('Failed to cancel appointment:', err);
      }
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Appointments</h2>
      {appointments.length === 0 ? (
        <p>No appointments found.</p>
      ) : (
        appointments.map((appointment) => (
          <AppointmentCard
            key={appointment.id}
            appointment={appointment}
            onCancel={() => handleCancel(appointment.id)}
          />
        ))
      )}
    </div>
  );
}