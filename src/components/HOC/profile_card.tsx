import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import axiosInstance from "../../lib/hooks/axiosInstance";
import {useAuthStore} from "../../stores/authStore";

interface ProfileCardProps {
  role: "doctor" | "patient";
}

interface BaseProfileData {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  contactNumber: string;
  profilePicture: string | null;
}

interface PatientProfile extends BaseProfileData {
  dateOfBirth: string;
}

interface DoctorProfile extends BaseProfileData {
  specialty: string;
  experience: number;
  location: {
    city: string;
    state: string;
  };
}

type ProfileData = PatientProfile | DoctorProfile;

export function ProfileCard({ role }: ProfileCardProps) {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const token = useAuthStore((state) => state.token);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!token) {
        setError("No authentication token found.");
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      const endpoint =
        role === "doctor"
          ? "https://three60clinicanimated-eureka.onrender.com/api/v1/doctors/profile"
          : "https://three60clinicanimated-eureka.onrender.com/api/v1/patients/profile";

      try {
        const { data } = await axiosInstance.get(endpoint, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProfile(data);
      } catch (err) {
        setError("Failed to fetch profile data.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [role, token]);

  if (loading) return <p className="text-center">Loading profile...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!profile) return null;

  const isDoctor = 'specialty' in profile;
  const location = isDoctor 
    ? `${profile.location.city}, ${profile.location.state}`
    : '';

  return (
    <div className="w-[400px] rounded-3xl overflow-hidden bg-gradient-to-br from-transparent via-zinc-200 to-transparent p-6 shadow-xl border-primary border-r-4">
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div className="flex items-center gap-2">
          <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden">
            <img
              src={profile.profilePicture || "https://cdn.pixabay.com/photo/2018/11/13/21/43/avatar-3814049_1280.png"}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h2 className="text-lg font-semibold">
              {profile.firstName} {profile.lastName}
            </h2>
            <div className="text-sm text-primary">{profile.email}</div>
          </div>
        </div>
      </div>

      {/* Profile Details */}
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-gray-500">First Name</label>
            <input
              type="text"
              value={profile.firstName}
              className="w-full px-3 py-2 rounded-lg bg-white/50 border border-gray-200"
              readOnly
            />
          </div>
          <div>
            <label className="text-sm text-gray-500">Last Name</label>
            <input
              type="text"
              value={profile.lastName}
              className="w-full px-3 py-2 rounded-lg bg-white/50 border border-gray-200"
              readOnly
            />
          </div>
        </div>

        <div>
          <label className="text-sm text-gray-500">Email</label>
          <input
            type="email"
            value={profile.email}
            className="w-full px-3 py-2 rounded-lg bg-white/50 border border-gray-200"
            readOnly
          />
        </div>

        <div>
          <label className="text-sm text-gray-500">Contact</label>
          <input
            type="text"
            value={profile.contactNumber}
            className="w-full px-3 py-2 rounded-lg bg-white/50 border border-gray-200"
            readOnly
          />
        </div>

        {/* Date of Birth - only for patients */}
        {!isDoctor && (
          <div>
            <label className="text-sm text-gray-500">Date of Birth</label>
            <input
              type="text"
              value={new Date((profile as PatientProfile).dateOfBirth).toLocaleDateString()}
              className="w-full px-3 py-2 rounded-lg bg-white/50 border border-gray-200"
              readOnly
            />
          </div>
        )}

        {/* Speciality - only for doctors */}
        {isDoctor && (
          <div>
            <label className="text-sm text-gray-500">Specialty</label>
            <input
              type="text"
              value={(profile as DoctorProfile).specialty}
              className="w-full px-3 py-2 rounded-lg bg-white/50 border border-gray-200"
              readOnly
            />
          </div>
        )}

        {/* Location - only for doctors */}
        {isDoctor && (
          <div>
            <label className="text-sm text-gray-500">Location</label>
            <input
              type="text"
              value={location}
              className="w-full px-3 py-2 rounded-lg bg-white/50 border border-gray-200"
              readOnly
            />
          </div>
        )}

        {/* Experience - only for doctors */}
        {isDoctor && (
          <div>
            <label className="text-sm text-gray-500">Experience (Years)</label>
            <input
              type="text"
              value={(profile as DoctorProfile).experience}
              className="w-full px-3 py-2 rounded-lg bg-white/50 border border-gray-200"
              readOnly
            />
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="flex justify-end mt-6">
        <Button className="gap-2 text-secondary hover:text-accent">
          <span>Save</span>
        </Button>
      </div>
    </div>
  );
}