import { FullScreenCalendar } from "../ui/fullscreen-calendar";
import { useEffect } from "react";
import { useAppointmentStore } from "../../stores/appointmentStore";
import { parseISO } from "date-fns";

interface AppointmentCalendarProps {
  role: "doctor" | "patient";
}

function Appointment_Calendar({ role }: AppointmentCalendarProps) {
  const { appointments, fetchAppointments, loading } = useAppointmentStore();

  useEffect(() => {
    // Fetch appointments for the provided role when the component mounts.
    fetchAppointments(role);
  }, [fetchAppointments, role]);

  // Transform appointments into calendar data format.
  const calendarData = appointments.map((appointment) => {
    const appointmentDate = parseISO(appointment.date);

    // Determine event name based on role.
    let eventName: string;
    if (role === "patient") {
      // For patients, doctorId is an object with doctor details.
      if (typeof appointment.doctorId === "object") {
        eventName = `Appointment with Dr. ${appointment.doctorId.firstName} ${appointment.doctorId.lastName}`;
      } else {
        eventName = "Appointment with Doctor";
      }
    } else {
      // For doctors, patientId is an object with patient details.
      if (typeof appointment.patientId === "object") {
        eventName = `Appointment with ${appointment.patientId.firstName} ${appointment.patientId.lastName}`;
      } else {
        eventName = "Appointment with Patient";
      }
    }

    const event = {
      id: parseInt(appointment._id, 16), // Convert string ID to number.
      name: eventName,
      time: `${appointment.startTime} - ${appointment.endTime}`,
      datetime: appointment.date,
    };

    return {
      day: appointmentDate,
      events: [event],
    };
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p>Loading appointments...</p>
      </div>
    );
  }

  return (
    <div className="sm:mb-5 md:-mt-12 md:-mx-16">
      <div className="flex h-screen flex-col scale-75">
        <div className="min-h-screen">
          <FullScreenCalendar data={calendarData} />
        </div>
      </div>
    </div>
  );
}

export { Appointment_Calendar };
