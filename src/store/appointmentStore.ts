// src/store/appointmentStore.ts
import {create} from 'zustand';
import axios from 'axios';
import { Appointment } from '../components/AppointmentCard';

interface AppointmentStore {
  appointments: Appointment[];
  setAppointments: (appointments: Appointment[]) => void;
  cancelAppointment: (appointmentId: string, token: string) => Promise<void>;
}

export const useAppointmentStore = create<AppointmentStore>((set, get) => ({
  appointments: [],
  setAppointments: (appointments: Appointment[]) => set({ appointments }),
  cancelAppointment: async (appointmentId: string, token: string) => {
    try {
      const res = await axios.put(
        `/api/v1/appointments/cancel/${appointmentId}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (res.status === 200) {
        set({ appointments: get().appointments.filter((apt) => apt.id !== appointmentId) });
      }
    } catch (err) {
      console.error('Failed to cancel appointment:', err);
      throw err;
    }
  },
}));

export type { Appointment };
