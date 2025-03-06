import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatedNavigationTabs } from './components/ui/animated-navigation-tabs';
import Home from './pages/Home';
import { Foooter } from './components/Foooter';
import DashboardLayout from "./layouts/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import DoctorDashboard from "./pages/DoctorDashboard";
import PatientDashboard from "./pages/PatientDashboard";
import Appointments from "./pages/Appointments";
import Availability from "./pages/Availability";
import Locations from "./pages/Locations";
import Settings from "./pages/Settings";
import { useAuthStore } from './store/authStore';
import AppointmentBooking from './pages/AppointmentBooking';
import DoctorProfile from './pages/Profile';
import DoctorSearch from './pages/DoctorSearch';
import SigninButton from './components/signin';
import SignupButton from './components/Signup';

const navigationItems = [
  { id: 1, title: 'Home', path: '/' },
  { id: 2, title: 'Dashboard', path: '/dashboard' },
];

function App() {
  const { user } = useAuthStore();

  return (
    <>
       <SigninButton/>
       <SignupButton/>
    </>
 
  );
}

export default App;