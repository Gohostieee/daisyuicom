import { create } from 'zustand'


export const useThemeStore = create((set) => ({
    currentTheme: "nord",
    changeTheme: async (newTheme) => set({ currentTheme: newTheme })
}))
