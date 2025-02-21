"use client"
import { getUserData } from "@/utils/db/actions"
import { useUserStore } from "@/utils/state/auth"
import { useThemeStore } from "@/utils/state/theme"
import { useUser } from "@clerk/nextjs"
import { useEffect } from "react"

export default function ContextWrapper({ children }) {
    const { user } = useUser()
    const refreshUserData = useUserStore((state) => state.refreshUserData)
    const theme = useThemeStore((state) => state.currentTheme)

    useEffect(() => {
        if (user) {
            (async () => {
                const userData = await getUserData(user.id)
                refreshUserData(userData)
            })()

        }
    }, [user])
    return (
        <body data-theme={theme} id="body">
            {children}
        </body>
    )
}