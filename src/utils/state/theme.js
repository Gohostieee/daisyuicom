import { create } from 'zustand'


export const useThemeStore = create((set) => ({
    currentTheme: "cyberpunk",
    changeTheme: async (newTheme) => set({ currentTheme: newTheme })
}))
