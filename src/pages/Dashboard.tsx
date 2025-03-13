import { motion } from "framer-motion";
import ProfileStucture from "@/components/common_profile_card";
import { Appointment_Calendar } from '../components/HOC/appointment_calender';
import SearchComponent from "@/components/HOC/search_bar";
import Update_Avail from '@/components/HOC/doc_availability';
import { Button } from '@/components/ui/button';
import Update_Status from "@/components/update_status";
import { useLocation } from "react-router-dom"; 
import AppointmentNotification from "@/components/ui/appointment_notification.tsx";

export default function Dashboard() {
  const location = useLocation();
  const role = location.state?.role || 'patient';  

  return (
    <>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 120, damping: 20 }}
        viewport={{ once: true, margin: "-100px" }}
        className='mt-20 md:p-12 md:overflow-hidden md:mt-10'
      >
        <div className='border rounded-3xl border-primary border-r-8'>
          <h1 className='font-bold p-10 text-4xl'>Welcome, Sienna</h1>
          <div className='grid md:grid-cols-2 '>
            <ProfileStucture role ={role}/>
            <Appointment_Calendar/>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 120, damping: 20 }}
        viewport={{ once: true, margin: "-100px" }}
        className='p-10'
      >
        <AppointmentNotification role = {role}/>
      </motion.div>

 {/* Book Appointments Section - Only for Patients */}
      {role === 'patient' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 120, damping: 20 }}
          viewport={{ once: true, margin: "-100px" }}
          className='p-10'
        >
          <div className='md:flex border bg-gradient-to-br from-transparent via-zinc-200 to-transparent p-6 shadow-xl md:justify-center rounded-3xl border-primary border-l-8'>
            <h3 className='text-2xl mt-5 p-2 font-bold md:w-1/2'>Book Appointments</h3>
            <SearchComponent/>
          </div>
        </motion.div>
      )}

      {/* Update Availability Section - Only for Doctors */}
      {role === 'doctor' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 120, damping: 20 }}
          viewport={{ once: true, margin: "-100px" }}
          className='p-10'
        >
          <div className='grid w-full border border-primary border-r-8 rounded-3xl justify-center space-y-5'>
            <h1 className='font-bold text-2xl p-1 mt-5'>Update Availability</h1>
            <Update_Avail/>
            <Update_Status/>
            <div className='flex justify-center p-4'>
              <Button variant={'default'} >Save</Button>
            </div>
          </div>
        </motion.div>
      )}
    </>
  )
}