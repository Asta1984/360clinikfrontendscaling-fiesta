import AppointmentNotification from "../ui/appointment_notification.tsx.tsx";


const dummyEvents = [
    {
      day: new Date("2025-03-03"),
      events: [
        {
          id: 1,
          name: "Q1 Planning Session",
          time: "10:00 AM",
          datetime: "2025-03-03T00:00",
        },
        {
          id: 2,
          name: "Team Sync",
          time: "2:00 PM",
          datetime: "2025-03-03T00:00",
        },
      ],
    },
    {
      day: new Date("2025-03-07"),
      events: [
        {
          id: 3,
          name: "Product Launch Review",
          time: "2:00 PM",
          datetime: "2025-01-07T00:00",
        },
        {
          id: 4,
          name: "Marketing Sync",
          time: "11:00 AM",
          datetime: "2025-01-07T00:00",
        },
        {
          id: 5,
          name: "Vendor Meeting",
          time: "4:30 PM",
          datetime: "2025-01-07T00:00",
        },
      ],
    },
    {
      day: new Date("2025-10-03"),
      events: [
        {
          id: 6,
          name: "Team Building Workshop",
          time: "11:00 AM",
          datetime: "2025-01-10T00:00",
        },
      ],
    },
  ]
  
export default function Appointment_accordian() {
    return(
      <>
      <div className='border bg-gradient-to-br from-transparent via-zinc-200 to-transparent p-6 shadow-xl  rounded-3xl border-primary border-t-8'>
        <h3 className='text-3xl mt-10 font-bold flex justify-center p-4'>Todays' Appointments</h3>
          {dummyEvents.map(dayGroup => (
          dayGroup.events.map(event => (
          <AppointmentNotification
          key={event.id}
          event={event}
          date={dayGroup.day}
          />
         ))
        ))}
      </div>
      </>
    )
}