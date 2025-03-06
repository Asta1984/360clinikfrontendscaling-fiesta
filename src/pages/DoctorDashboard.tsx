import { Outlet, Link } from 'react-router-dom';

export default function DoctorDashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Doctor Dashboard</h1>

      {/* Navigation Tabs */}
      <nav className="flex space-x-4">
        <Link to="appointments" className="text-sm font-medium">Appointments</Link>
        <Link to="availability" className="text-sm font-medium">Availability</Link>
        <Link to="locations" className="text-sm font-medium">Locations</Link>
        <Link to="settings" className="text-sm font-medium">Settings</Link>
      </nav>

      {/* Nested Routes */}
      <Outlet />
    </div>
  );
}