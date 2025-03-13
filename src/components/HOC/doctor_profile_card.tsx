import React, { useState } from 'react';
import { MapPin, Stethoscope, Phone, Mail, Calendar } from 'lucide-react';
import {useAuthStore} from "../../stores/authStore";

interface Doctor {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  specialty: string;
  location: {
    city: string;
    state: string;
  };
}

interface AppointmentData {
  doctorId: string;
  date: string;
  startTime: string;
  endTime: string;
  consultationLocation: string;
}

export default function DoctorCard({ doctor }: { doctor: Doctor }) {
  const [showBooking, setShowBooking] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [appointmentData, setAppointmentData] = useState<AppointmentData>({
    doctorId: doctor._id,
    date: '',
    startTime: '',
    endTime: '',
    consultationLocation: 'Online'
  });
  const token = useAuthStore((state) => state.token);
  

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setAppointmentData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch('https://three60clinicanimated-eureka.onrender.com/api/v1/appointments/book', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(appointmentData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to book appointment');
      }

      setSuccess('Appointment booked successfully!');
      setShowBooking(false);
      setAppointmentData({
        doctorId: doctor._id,
        date: '',
        startTime: '',
        endTime: '',
        consultationLocation: 'Online'
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to book appointment');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-xl font-semibold text-gray-900">
            Dr. {doctor.firstName} {doctor.lastName}
          </h3>
          <div className="flex items-center gap-2 text-gray-600 mt-2">
            <Stethoscope className="w-4 h-4" />
            <span>{doctor.specialty}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600 mt-1">
            <MapPin className="w-4 h-4" />
            <span>{doctor.location.city}, {doctor.location.state}</span>
          </div>
        </div>
        <div className="space-y-2">
          <a
            href={`tel:${doctor.phone}`}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
          >
            <Phone className="w-4 h-4" />
            <span>{doctor.phone}</span>
          </a>
          <a
            href={`mailto:${doctor.email}`}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
          >
            <Mail className="w-4 h-4" />
            <span>{doctor.email}</span>
          </a>
        </div>
      </div>

      <div className="mt-4 border-t pt-4">
        <button
          onClick={() => setShowBooking(!showBooking)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Calendar className="w-4 h-4" />
          Book Appointment
        </button>

        {showBooking && (
          <form onSubmit={handleSubmit} className="mt-4 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date
                </label>
                <input
                  type="date"
                  name="date"
                  value={appointmentData.date}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Start Time
                </label>
                <input
                  type="time"
                  name="startTime"
                  value={appointmentData.startTime}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  End Time
                </label>
                <input
                  type="time"
                  name="endTime"
                  value={appointmentData.endTime}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Consultation Type
                </label>
                <select
                  name="consultationLocation"
                  value={appointmentData.consultationLocation}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="Online">Online</option>
                  <option value="In-Person">In-Person</option>
                </select>
              </div>
            </div>

            {error && (
              <div className="text-red-600 text-sm">{error}</div>
            )}
            {success && (
              <div className="text-green-600 text-sm">{success}</div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-400"
            >
              {isLoading ? 'Booking...' : 'Confirm Booking'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}