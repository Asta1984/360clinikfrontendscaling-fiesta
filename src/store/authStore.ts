// src/store/authStore.ts
import create from 'zustand';

export interface AuthState {
  user: { id: string; email: string; role: 'doctor' | 'patient' } | null;
  token: string | null;
  setUser: (user: AuthState['user'], token: string) => void;
  clearUser: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  setUser: (user, token) => set({ user, token }),
  clearUser: () => set({ user: null, token: null }),
}));
