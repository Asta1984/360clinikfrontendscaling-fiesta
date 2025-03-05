// src/components/AppointmentCard.tsx
import React from 'react';

export interface Appointment {
  id: string;
  date: string;
  startTime: string;
  endTime: string;
  doctorName: string;
  status: string;
}

interface AppointmentCardProps {
  appointment: Appointment;
  onCancel?: (appointmentId: string) => void;
}

const AppointmentCard: React.FC<AppointmentCardProps> = ({ appointment, onCancel }) => {
  return (
    <div className="appointment-card">
      <h3>Appointment with Dr. {appointment.doctorName}</h3>
      <p>Date: {new Date(appointment.date).toLocaleDateString()}</p>
      <p>Time: {appointment.startTime} - {appointment.endTime}</p>
      <p>Status: {appointment.status}</p>
      {onCancel && appointment.status === 'Scheduled' && (
        <button onClick={() => onCancel(appointment.id)}>Cancel Appointment</button>
      )}
    </div>
  );
};

export default AppointmentCard;
