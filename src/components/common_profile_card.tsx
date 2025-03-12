import { ProfileCard } from "./HOC/profile_card";

interface ProfileStructureProps {
  role: 'doctor' | 'patient'; // Define the role prop
}

export default function ProfileStructure({ role }: ProfileStructureProps) {
  return (
    <div className="mx-10 flex p-4">
      <ProfileCard
        role={role} 
        firstName="John"
        lastName="Doe"
        email="john@example.com"
        dateofbirth="1990-01-01"
        contact="+1234567890"
        speciality="Cardiology"
        location="New York"
        experience="10 years"
      />
    </div>
  );
}