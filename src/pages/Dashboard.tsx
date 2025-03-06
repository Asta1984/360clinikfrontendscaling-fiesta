import { useAuthStore } from '../store/authStore';
import Signup from './Auth/Signup';
import DoctorDashboard from './DoctorDashboard';
import PatientDashboard from './PatientDashboard';
import Login from './Auth/Login';

export default function Dashboard() {
  const { user } = useAuthStore();

  if (!user) {
    return <div><Signup/><Login/></div>; // Handle unauthenticated state
  }

  return (
    <div>
      {user.role === 'doctor' ? <DoctorDashboard /> : <PatientDashboard />}
    </div>
  );
}