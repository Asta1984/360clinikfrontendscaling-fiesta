// src/pages/DoctorDashboard.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuthStore } from '../store/authStore';

interface AvailabilitySlot {
  day: string;
  startTime: string;
  endTime: string;
  consultationLocations: string[];
}

const DoctorDashboard: React.FC = () => {
  const { token } = useAuthStore();
  const [availability, setAvailability] = useState<AvailabilitySlot[]>([]);
  const [newSlot, setNewSlot] = useState<AvailabilitySlot>({
    day: 'Monday',
    startTime: '',
    endTime: '',
    consultationLocations: [''],
  });
  const [appointments, setAppointments] = useState<any[]>([]);

  const fetchAppointments = async () => {
    try {
      const res = await axios.get('/api/v1/appointments/doctor', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAppointments(res.data.appointments);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };

  const updateAvailability = async () => {
    try {
      const res = await axios.put(
        '/api/v1/appointments/doctor/availability',
        { availabilitySlots: [newSlot] },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setAvailability(res.data.availabilitySlots);
    } catch (error) {
      console.error('Error updating availability:', error);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  return (
    <div className="doctor-dashboard">
      <h2>Doctor Dashboard</h2>
      <section>
        <h3>Set Availability</h3>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            updateAvailability();
          }}
        >
          <label>
            Day:
            <select
              value={newSlot.day}
              onChange={(e) =>
                setNewSlot((prev) => ({ ...prev, day: e.target.value }))
              }
            >
              {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
                <option key={day} value={day}>{day}</option>
              ))}
            </select>
          </label>
          <label>
            Start Time:
            <input
              type="time"
              value={newSlot.startTime}
              onChange={(e) =>
                setNewSlot((prev) => ({ ...prev, startTime: e.target.value }))
              }
              required
            />
          </label>
          <label>
            End Time:
            <input
              type="time"
              value={newSlot.endTime}
              onChange={(e) =>
                setNewSlot((prev) => ({ ...prev, endTime: e.target.value }))
              }
              required
            />
          </label>
          <label>
            Consultation Locations (comma separated):
            <input
              type="text"
              onChange={(e) =>
                setNewSlot((prev) => ({
                  ...prev,
                  consultationLocations: e.target.value.split(',').map(s => s.trim()),
                }))
              }
              required
            />
          </label>
          <button type="submit">Update Availability</button>
        </form>
        {availability && availability.length > 0 && (
          <div>
            <h4>Current Availability</h4>
            <ul>
              {availability.map((slot, i) => (
                <li key={i}>
                  {slot.day}: {slot.startTime} - {slot.endTime} at {slot.consultationLocations.join(', ')}
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>
      <section>
        <h3>Upcoming Appointments</h3>
        <ul>
          {appointments.map((apt, i) => (
            <li key={i}>
              {apt.date} from {apt.startTime} to {apt.endTime} with Patient ID: {apt.patientId}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default DoctorDashboard;
