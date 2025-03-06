import SignupButton from '@/components/Signup';
import { useAuthStore } from '../store/authStore';
import DoctorDashboard from './DoctorDashboard';
import PatientDashboard from './PatientDashboard';
import SigninButton from '@/components/Signin';


export default function Dashboard() {
  const { user } = useAuthStore();

  if (!user) {
    return <div><SignupButton/><SigninButton/></div>; // Handle unauthenticated state
  }

  return (
    <div>
      {user.role === 'doctor' ? <DoctorDashboard /> : <PatientDashboard />}
    </div>
  );
}