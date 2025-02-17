import { useAuth } from '@clerk/nextjs'
import { create } from 'zustand'


export const useUserStore = create((set) => ({
    currentUser: null,
    refreshUser: async () => set({ currentUser: useAuth() })
}))
