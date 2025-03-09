import { ProfileCard } from '../components/profile_card'
import { Appointment_Calendar } from '../components/appointment_calender'

export default function Dashboard() {


  return (
    <>
    <div className='md:p-12 md:overflow-hidden '>
      <div className='border rounded-3xl border-accent border-r-8'>
          <h1 className='font-OnlinePrivileges p-10 text-4xl'>Welcome, Sienna</h1>
        <div className='grid md:grid-cols-2 '>
        <div className="min-h-screen flex p-4 ">
          <ProfileCard
            firstName="Sienna"
            lastName="Hewitt"
            email="siennahewitt@gmail.com"
            location ="United States"
            dateofbirth='23-09-2001'
          />
        </div>
        <div className='sm:mb-5 md:-mt-12 md:-mx-16 '>
          <Appointment_Calendar/>
        </div>
      </div>
     </div>
    </div>
    </>
  )
}
