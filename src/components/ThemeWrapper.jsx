"use client"
import { useThemeStore } from "@/utils/state/theme"

export default function ThemeWrapper({ children }) {

    const theme = useThemeStore((state) => state.currentTheme)
    console.log(theme, "theme")
    return (
        <body data-theme={theme} id="body">
            {children}
        </body>
    )
}