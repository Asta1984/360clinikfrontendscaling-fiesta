import { Check } from 'lucide-react';
import { Button } from '../ui/button';

interface ProfileCardProps {
  firstName: string;
  lastName: string;
  email: string;
  dateofbirth: string;
  contact: string;
}

export function ProfileCard({
  firstName,
  lastName,
  email,
  dateofbirth,
  contact,

}: ProfileCardProps) {
  return (

    <div className="w-[400px] rounded-3xl overflow-hidden bg-gradient-to-br from-transparent via-zinc-200 to-transparent p-6 shadow-xl border-primary border-r-4">
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div className="flex items-center gap-2">
          <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden">
            <img
              src="https://cdn.pixabay.com/photo/2018/11/13/21/43/avatar-3814049_1280.png"
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-semibold">{firstName} {lastName}</h2>
            </div>
            <div className="text-sm text-primary">{email}</div>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="flex justify-items-start text-sm text-gray-500 mb-1">First Name</label>
            <input
              type="text"
              value={firstName}
              className="w-full px-3 py-2 rounded-lg bg-white/50 border border-gray-200"
              placeholder="First name"
            />
          </div>
          <div>
            <label className="flex justify-items-start text-sm text-gray-500 mb-1">Last Name</label>
            <input
              type="text"
              value={lastName}
              className="w-full px-3 py-2 rounded-lg bg-white/50 border border-gray-200"
              placeholder="Last name"
            />
          </div>
        </div>

        <div>
          <label className="flex justify-items-start text-sm text-gray-500 mb-1">Email</label>
          <div className="relative">
            <input
              type="email"
              value={email}
              className="w-full px-3 py-2 rounded-lg bg-white/50 border border-gray-200"
            />
          </div>
        </div>

        <div>
          <label className="flex justify-items-start text-sm text-gray-500 mb-1">Location</label>
          <button className="w-full px-3 py-2 rounded-lg bg-white/50 border border-gray-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span>{contact}</span>
            </div>
          </button>
        </div>

        <div>
          <label className="flex justify-items-start text-sm text-gray-500 mb-1">D.O.B</label>
          <div className="flex gap-2">
            <div className="flex-1 px-3 py-2 rounded-lg bg-gray-100 text-gray-500">
              {dateofbirth}
            </div>
            <button className="p-2 rounded-lg bg-white/50 border border-gray-200">
              <Check size={16} className="text-blue-500" />
            </button>
          </div>
        </div>
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