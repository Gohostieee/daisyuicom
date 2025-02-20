import { create } from 'zustand'


export const useThemeStore = create((set) => ({
    currentTheme: "retro",
    changeTheme: async (newTheme) => set({ currentTheme: newTheme })
}))
