import { ProfileCard } from "./HOC/profile_card";

interface ProfileStructureProps {
  role: 'doctor' | 'patient'; 
}

export default function ProfileStructure({ role }: ProfileStructureProps) {
  return (
    <div className="flex p-4">
      <ProfileCard
        role={role} 
      />
    </div>
  );
}