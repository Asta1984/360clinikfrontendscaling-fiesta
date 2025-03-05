// src/pages/DoctorSearch.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DoctorCard, { Doctor } from '../components/DoctorCard';

const DoctorSearch: React.FC = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [specialty, setSpecialty] = useState('');
  const [location, setLocation] = useState('');
  const [name, setName] = useState('');

  const fetchDoctors = async () => {
    try {
      const res = await axios.get('/api/v1/patients/search-doctors', {
        params: { specialty, city: location, name },
      });
      setDoctors(res.data.doctors);
    } catch (error) {
      console.error('Error fetching doctors:', error);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchDoctors();
  };

  return (
    <div className="doctor-search">
      <h2>Search for Doctors</h2>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Specialty"
          value={specialty}
          onChange={(e) => setSpecialty(e.target.value)}
        />
        <input
          type="text"
          placeholder="Location (City)"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <input
          type="text"
          placeholder="Doctor's Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      <div className="doctor-results">
        {doctors.map((doctor) => (
          <DoctorCard key={doctor.id} doctor={doctor} />
        ))}
      </div>
    </div>
  );
};

export default DoctorSearch;
