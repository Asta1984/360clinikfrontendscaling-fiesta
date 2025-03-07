import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import { Foooter } from './components/Foooter';
import SignupButton from './pages/Signup';
import SigninButton from './pages/Signin';
import Navbar from './components/Navbar';


export default function App() {
  return (
    <Router>
      <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Signup" element={<SignupButton />} />
            <Route path="/Signin" element={<SigninButton />} />
          </Routes>
      <Foooter />
    </Router>
  );
}
