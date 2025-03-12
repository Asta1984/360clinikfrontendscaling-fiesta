import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import { Foooter } from './components/HOC/Foooter';
import SignupButton from './pages/Signup';
import SigninButton from './pages/Signin';
import Navbar from './components/HOC/Navbar';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from "./lib/protectedroute"; 


export default function App() {
  return (
    <Router>
      <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Signup" element={<SignupButton />} />
            <Route path="/Signin" element={<SigninButton />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/Dashboard" element={<Dashboard />} />
            </Route>
          </Routes>
      <Foooter />
    </Router>
  );
}
