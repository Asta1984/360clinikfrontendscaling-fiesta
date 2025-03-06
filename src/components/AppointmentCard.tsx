import { Appointment } from '../store/appointmentStore';

interface AppointmentCardProps {
  appointment: Appointment;
  onCancel: () => void;
}

export default function AppointmentCard({ appointment, onCancel }: AppointmentCardProps) {
  return (
    <div className="p-4 border rounded-lg shadow-sm">
      <h3 className="font-semibold">{appointment.patientName}</h3>
      <p>{appointment.date}</p>
      <p>{appointment.time}</p>
      <button
        onClick={onCancel}
        className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
      >
        Cancel
      </button>
    </div>
  );
}