import { create } from 'zustand';
import axiosInstance from '../lib/hooks/axiosInstance'; 

// Define interfaces for Doctor and Patient details.
interface Doctor {
  _id: string;
  firstName: string;
  lastName: string;
  specialty: string;
}

interface Patient {
  _id: string;
  firstName: string;
  lastName: string;
}

// Common appointment properties.
interface AppointmentBase {
  _id: string;
  date: string;
  startTime: string;
  endTime: string;
  consultationLocation: string;
  status: string;
  paymentStatus: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

// For Patient response: doctor details come as an object; patientId is a string.
export interface PatientAppointment extends AppointmentBase {
  doctorId: Doctor;
  patientId: string;
}

// For Doctor response: patient details come as an object; doctorId is a string.
export interface DoctorAppointment extends AppointmentBase {
  doctorId: string;
  patientId: Patient;
}

// Union type for an appointment.
export type Appointment = PatientAppointment | DoctorAppointment;

// API response structure.
interface AppointmentResponse {
  appointments: Appointment[];
  count: number;
}

// Zustand store interface.
interface AppointmentStore {
  appointments: Appointment[];
  loading: boolean;
  error: string | null;
  fetchAppointments: (role: 'doctor' | 'patient') => Promise<void>;
  clearAppointments: () => void;
}

// Create the Zustand store.
export const useAppointmentStore = create<AppointmentStore>((set) => ({
  appointments: [],
  loading: false,
  error: null,

  // Fetch appointments based on role.
  fetchAppointments: async (role: 'doctor' | 'patient') => {
    set({ loading: true, error: null });
    try {
      // Determine endpoint based on role.
      const endpoint =
        role === 'doctor' ? '/appointments/doctor' : '/appointments/patient';

      // The axiosInstance automatically attaches the Authorization header.
      const { data } = await axiosInstance.get<AppointmentResponse>(endpoint);

      // Save the fetched appointments in the global store.
      set({ appointments: data.appointments, loading: false });
    } catch (error: any) {
      set({
        error: error.response?.data?.message || error.message,
        loading: false,
      });
    }
  },

  // Clear appointments if needed.
  clearAppointments: () => set({ appointments: [] }),
}));
