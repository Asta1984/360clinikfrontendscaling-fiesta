import { FullScreenCalendar } from "../ui/fullscreen-calendar"
import  { useEffect } from 'react';
import { useAppointmentStore } from '../../stores/appointmentStore';
import { parseISO } from 'date-fns';


function Appointment_Calendar() {
  const { appointments, fetchAppointments, loading } = useAppointmentStore();

  useEffect(() => {
    // Fetch appointments when component mounts
    // Assuming we're fetching for a doctor - adjust based on your needs
    fetchAppointments('doctor');
  }, [fetchAppointments]);

  // Transform appointments into calendar data format
  const calendarData = appointments.map(appointment => {
    const appointmentDate = parseISO(appointment.date);
    
    // Create event object from appointment
    const event = {
      id: parseInt(appointment._id, 16), // Convert string ID to number
      name: appointment.doctorId.toString().includes('firstName') 
        ? `Appointment with Dr. ${(appointment.doctorId as any).firstName} ${(appointment.doctorId as any).lastName}`
        : `Appointment with ${(appointment.patientId as any).firstName} ${(appointment.patientId as any).lastName}`,
      time: `${appointment.startTime} - ${appointment.endTime}`,
      datetime: appointment.date
    };

    return {
      day: appointmentDate,
      events: [event]
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
    <div className='sm:mb-5 md:-mt-12 md:-mx-16 '>
    <div className="flex h-screen flex-col scale-75">
    <div className="min-h-screen">
      <FullScreenCalendar data={calendarData} />
    </div>
    </div>
    </div>

  );
}


export { Appointment_Calendar }