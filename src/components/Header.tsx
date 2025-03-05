// src/components/Header.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

const Header: React.FC = () => {
  const { user, clearUser } = useAuthStore();

  return (
    <header>
      <nav>
        <Link to="/">Home</Link>
        {user ? (
          <>
            {user.role === 'doctor' ? (
              <Link to="/doctor/dashboard">Dashboard</Link>
            ) : (
              <Link to="/patient/dashboard">Dashboard</Link>
            )}
            <button onClick={() => clearUser()}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link> | <Link to="/signup">Signup</Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
