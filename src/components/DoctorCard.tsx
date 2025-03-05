// src/components/DoctorCard.tsx
import React from 'react';
import { Link } from 'react-router-dom';

export interface Doctor {
  id: string;
  firstName: string;
  lastName: string;
  specialty: string;
  experience: number;
  location: { city: string; state: string };
  availabilitySlots: { day: string; startTime: string; endTime: string }[];
}

interface Props {
  doctor: Doctor;
}

const DoctorCard: React.FC<Props> = ({ doctor }) => {
  return (
    <div className="doctor-card">
      <h3>
        {doctor.firstName} {doctor.lastName}
      </h3>
      <p>Specialty: {doctor.specialty}</p>
      <p>
        Experience: {doctor.experience} years | Location: {doctor.location.city},{' '}
        {doctor.location.state}
      </p>
      <Link to={`/doctor/${doctor.id}`}>View Profile</Link>
    </div>
  );
};

export default DoctorCard;
