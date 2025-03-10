import { ProfileCard } from '../components/profile_card'
import { Appointment_Calendar } from '../components/appointment_calender'
import Searchbar from '@/components/search_bar';
import Appointment_accordian from '@/components/appointment_sec';
import DocProfileCard from '@/components/doctor_profile_card';

export default function Dashboard() {

  return (
    <>
    <div className='mt-20 md:p-12 md:overflow-hidden md:mt-10'>
      <div className='border rounded-3xl border-primary border-r-8'>
          <h1 className='font-bold p-10 text-4xl'>Welcome, Sienna</h1>
        <div className='grid md:grid-cols-2 '>
        <div className=" mx-10 flex p-4">
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

    <div className=' p-10 '>
    <div className='border bg-gradient-to-br from-transparent via-zinc-200 to-transparent p-6 shadow-xl  rounded-3xl border-primary border-t-8'>
      <h3 className='text-3xl mt-10 font-bold flex justify-center p-4'>Todays' Appointments</h3>
      <Appointment_accordian/>
    </div>
    </div>

    <div className='p-10 '>
    <div className='md:flex border bg-gradient-to-br from-transparent via-zinc-200 to-transparent p-6 shadow-xl md:justify-center rounded-3xl border-primary border-l-8'>
    <h3 className='text-2xl mt-5 p-2 font-bold md:w-1/2'>Book Appointments</h3>
    <div className=' border bg-gradient-to-br from-transparent via-zinc-200 to-transparent p-6 shadow-xl  rounded-3xl border-primary  md:w-1/2 border-t-8'>
    <Searchbar/>
    </div>
    <div className='flex p-10'>
    <DocProfileCard/>
    </div>
    </div>
    </div>
    </>
  )
}
