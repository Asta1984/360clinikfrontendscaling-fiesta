import { useEffect } from "react";
import { cn } from "../../lib/utils";
import { Check, X } from "lucide-react";
import { useAppointmentStore, Appointment } from "../../stores/appointmentStore";

interface AppointmentNotificationProps {
  role: "doctor" | "patient";
}

export default function AppointmentNotification({ role }: AppointmentNotificationProps) {
  const { appointments, loading, error, fetchAppointments } = useAppointmentStore();

  // Fetch appointments using the role passed from Dashboard.
  useEffect(() => {
    fetchAppointments(role);
  }, [fetchAppointments, role]);

  // Helper to extract a display name based on the role.
  const getDisplayName = (appointment: Appointment): string => {
    // For patient appointments, doctorId is an object.
    if (typeof appointment.doctorId === "object") {
      return `${appointment.doctorId.firstName} ${appointment.doctorId.lastName}`;
    }
    // For doctor appointments, patientId is an object.
    if (typeof appointment.patientId === "object") {
      return `${appointment.patientId.firstName} ${appointment.patientId.lastName}`;
    }
    return "Unknown";
  };

  // Helper to calculate relative time.
  const getRelativeTime = (datetime: string) => {
    const eventDate = new Date(datetime);
    const currentDate = new Date();
    const diffInSeconds = Math.floor((currentDate.getTime() - eventDate.getTime()) / 1000);
    if (diffInSeconds < 60) return "Just now";
    const minutes = Math.floor(diffInSeconds / 60);
    if (minutes < 60) return `${minutes} minutes ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} hours ago`;
    const days = Math.floor(hours / 24);
    return `${days} days ago`;
  };

  if (loading) return <p>Loading appointments...</p>;
  if (error) return <p>Error: {error}</p>;
  if (appointments.length === 0) return <p>No appointments found.</p>;

  return (
    <div className='border bg-gradient-to-br from-transparent via-zinc-200 to-transparent p-6 shadow-xl  rounded-3xl border-primary border-t-8'>
    <h3 className='text-3xl mt-10 font-bold flex justify-center p-4'>Appointments` Scheduled</h3>
    <div className="w-full max-w-xl mx-auto p-3">
      {appointments.map((appointment) => {
        const displayName = getDisplayName(appointment);
        const appointmentDate = new Date(appointment.date);
        const formattedDate = appointmentDate.toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        });

        return (
          <div
            key={appointment._id}
            className="relative bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-[0_1px_6px_0_rgba(0,0,0,0.02)] rounded-xl p-4 mb-4"
          >
            <div className="flex items-center gap-4">
              <div className="relative h-10 w-10 flex-shrink-0">
                <img
                  src={`https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}&background=random`}
                  alt={displayName}
                  sizes="40px"
                  className="rounded-full object-cover"
                />
                <div className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-green-500 ring-2 ring-white dark:ring-zinc-950" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                      {displayName}
                    </p>
                    <p className="text-[13px] text-zinc-500 dark:text-zinc-400 mt-0.5">
                      Scheduled for {formattedDate} at {appointment.startTime}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  className="rounded-lg flex items-center justify-center h-8 w-8 p-0 hover:bg-red-50 dark:hover:bg-red-950/50 text-zinc-400 hover:text-red-600 dark:text-zinc-500 dark:hover:text-red-400 transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  className={cn(
                    "rounded-lg flex items-center justify-center h-8 w-8 p-0",
                    "hover:bg-emerald-50 dark:hover:bg-emerald-950/50",
                    "text-zinc-400 hover:text-emerald-600",
                    "dark:text-zinc-500 dark:hover:text-emerald-400",
                    "transition-colors"
                  )}
                >
                  <Check className="h-4 w-4" />
                </button>
              </div>
            </div>
            <div className="mt-2 ml-14">
              <p className="text-[12px] text-zinc-400 dark:text-zinc-500">
                Created {getRelativeTime(appointment.createdAt)}
              </p>
            </div>
          </div>
        );
      })}
    </div>
    </div>
  );
}
