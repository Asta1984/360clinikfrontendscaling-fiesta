import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatedNavigationTabs } from './components/ui/animated-navigation-tabs';
import Home from './pages/Home';
import { Foooter } from './components/Foooter';
import DashboardLayout from "./layouts/DashboardLayout"
import Dashboard from "./pages/DoctorDashboard"
import Appointments from "./pages/DoctorAppointments"
import Availability from "./pages/DoctorAvailability"
import Locations from "./pages/Locations"
import Settings from "./pages/Settings"

const navigationItems = [
  { id: 1, title: 'Home', path: '/' },
  { id: 2, title: 'Doctor', path: '/DoctorDashboard' },
  { id: 3, title: 'Patient', path: '/PatientDashboard' },
];

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <AnimatedNavigationTabs items={navigationItems} />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="DoctorDashboard" element={<DashboardLayout />}>
            <Route path="DoctorDashboard" element={<Dashboard />} />
            <Route path="DoctorDashboard/appointments" element={<Appointments />} />
            <Route path="DoctorDashboard/availability" element={<Availability />} />
            <Route path="DoctorDashboard/locations" element={<Locations />} />
            <Route path="DoctorDashboard/settings" element={<Settings />} />
            </Route>
          </Routes>
        </main>
      </div>
      <Foooter/>
    </Router>
  );
}

export default App;