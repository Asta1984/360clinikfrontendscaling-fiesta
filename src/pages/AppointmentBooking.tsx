// src/pages/AppointmentBooking.tsx
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuthStore } from '../store/authStore';

const AppointmentBooking: React.FC = () => {
  const { doctorId } = useParams<{ doctorId: string }>();
  const navigate = useNavigate();
  const { token } = useAuthStore();
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [location, setLocation] = useState('');

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(
        '/api/v1/appointments/book',
        {
          doctorId,
          date, // expect an ISO date string
          startTime,
          endTime,
          consultationLocation: location,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      navigate('/patient/dashboard');
    } catch (error) {
      console.error('Booking error:', error);
    }
  };

  return (
    <div className="appointment-booking">
      <h2>Book Appointment</h2>
      <form onSubmit={handleBooking}>
        <label>
          Date:
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </label>
        <label>
          Start Time:
          <input
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            required
          />
        </label>
        <label>
          End Time:
          <input
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            required
          />
        </label>
        <label>
          Consultation Location:
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </label>
        <button type="submit">Book Appointment</button>
      </form>
    </div>
  );
};

export default AppointmentBooking;
