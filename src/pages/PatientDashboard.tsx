import { useAppointmentStore } from '../store/appointmentStore';
import { useAuthStore } from '../store/authStore';

export default function PatientDashboard() {
  const { appointments } = useAppointmentStore();
  const { user } = useAuthStore();

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Welcome, {user?.email}</h1>
      <h2 className="text-2xl font-bold">Your Appointments</h2>
      {appointments.length === 0 ? (
        <p>No appointments found.</p>
      ) : (
        appointments.map((appointment) => (
          <div key={appointment.id} className="p-4 border rounded-lg shadow-sm">
            <h3 className="font-semibold">{appointment.patientName}</h3>
            <p>{appointment.date}</p>
            <p>{appointment.time}</p>
          </div>
        ))
      )}
    </div>
  );
}