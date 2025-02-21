import { useAuth } from '@clerk/nextjs'
import { create } from 'zustand'


export const useUserStore = create((set) => ({
    userData: {},
    refreshUserData: async (userData) => set({ userData: userData }),
    updateUserData: (updateFields) => set((state) => {
        return {
            userData: {
                ...state.userData,
                ...updateFields
            }
        }
    })
}))
