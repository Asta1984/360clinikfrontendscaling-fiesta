// src/pages/DoctorProfile.tsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

interface DoctorProfileData {
  id: string;
  firstName: string;
  lastName: string;
  specialty: string;
  experience: number;
  location: { city: string; state: string };
  availabilitySlots: { day: string; startTime: string; endTime: string }[];
}

const DoctorProfile: React.FC = () => {
  const { doctorId } = useParams<{ doctorId: string }>();
  const [profile, setProfile] = useState<DoctorProfileData | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`/api/v1/doctors/profile/${doctorId}`);
        setProfile(res.data);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchProfile();
  }, [doctorId]);

  if (!profile) return <p>Loading...</p>;

  return (
    <div className="doctor-profile">
      <h2>
        Dr. {profile.firstName} {profile.lastName}
      </h2>
      <p>Specialty: {profile.specialty}</p>
      <p>Experience: {profile.experience} years</p>
      <p>
        Location: {profile.location.city}, {profile.location.state}
      </p>
      <h3>Availability</h3>
      <ul>
        {profile.availabilitySlots.map((slot, index) => (
          <li key={index}>
            {slot.day}: {slot.startTime} - {slot.endTime}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DoctorProfile;
