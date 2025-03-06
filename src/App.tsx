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

const navigationItems = [
  { id: 1, title: 'Home', path: '/' },
  { id: 2, title: 'Dashboard', path: '/dashboard' },
];

function App() {
  const { user } = useAuthStore();

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <AnimatedNavigationTabs items={navigationItems} />
        <main className="flex-1">
          <Routes>
            {/* Home Route */}
            <Route path="/" element={<Home />} />

            {/* Dashboard Routes */}
            <Route path="dashboard" element={<DashboardLayout />}>
              {/* Conditional Dashboard Home */}
              <Route index element={<Dashboard />} />

              {/* Doctor-specific Routes */}
              <Route path="doctor" element={<DoctorDashboard />}>
                <Route path="appointments" element={<Appointments />} />
                <Route path="availability" element={<Availability />} />
                <Route path="locations" element={<Locations />} />
                <Route path="settings" element={<Settings />} />
              </Route>

              {/* Patient-specific Route */}
              <Route path="patient" element={<PatientDashboard />} />
              <Route path="booking" element={<AppointmentBooking />} />
              <Route path="doctorprofile" element={<DoctorProfile />} />
              <Route path="doctorsearch" element={<DoctorSearch />} />
            </Route>
          </Routes>
        </main>
      </div>
      <Foooter />
    </Router>
  );
}

export default App;