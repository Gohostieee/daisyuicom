import { likeTheme } from "@/utils/db/actions";
import { useUserStore } from "@/utils/state/auth";
import { useThemeStore } from "@/utils/state/theme";
import { SignedIn, SignedOut, useUser } from "@clerk/nextjs";
import { useToast } from "@/hooks/use-toast";
import { setThemePreview } from "@/utils/colors";
import { Button } from "@/components/ui/button";

export default function Theme({ theme, index, themes, setThemes }) {
    const userData = useUserStore((state) => state.userData)
    const updateUserData = useUserStore((state) => state.updateUserData)
    const changeTheme = useThemeStore((state) => state.changeTheme)
    const { toast } = useToast()

    async function copyTheme(theme) {
        await navigator.clipboard.writeText(theme.theme)
        toast({
            title: "Copied theme!",
            description: `${theme.title} has been copied to the clipboard`
        })
    }

    async function onClick(themeID, index) {
        toast({
            title: "Copied theme!1",
            description: `${theme.title} ${userData} ${userData?.likes} has been copied to the clipboard`
        })
        const oldLikes = themes[index].likes
        const increment = userData?.likes?.includes(themeID) ? -1 : 1

        if (increment > 0) {
            userData.likes = [...userData?.likes || ...[], themeID]
            const addedLikes = [...userData.likes]
            updateUserData({
                likes: addedLikes
            })
        } else {
            const removedLikes = userData.likes.filter(like => like != themeID)
            updateUserData({
                likes: removedLikes
            })
        }
        setThemes(themes => {
            const newThemes = [...themes]
            newThemes[index].likes += increment;
            return newThemes
        })
        const res = await likeTheme(themeID)
        if (!res.error && increment != res.increment) {

            if (res.increment > 0) {
                userData.likes = [...userData.likes || ...[], themeID]
        
                const addedLikes = [...userData.likes]
                updateUserData({
                    likes: addedLikes
                })
            } else {
                const removedLikes = userData.likes.filter(like => like != themeID)
                updateUserData({
                    likes: removedLikes
                })
            }

            setThemes(themes => {
                const newThemes = [...themes]
                newThemes[index].likes = oldLikes + res.increment;
                return newThemes
            })

        }
    }
    return (
        <div className="bg-base-200 sm:min-w-64 min-w-full min-h-16 h-fit border-base-300 border p-2 shadow-2xl">
            <div className="flex justify-between items-end gap-4">
                <div>
                    <p className="text-2xl text-primary font-black">
                        {theme.title}
                    </p>
                    <p className="ml-2 text-sm font-medium">
                        By {theme.username}
                    </p>
                </div>
                <div className="flex gap-2 items-end">
                    <Button className="text-sm " onClick={() => copyTheme(theme)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-copy"><rect width="14" height="14" x="8" y="8" rx="2" ry="2" /><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" /></svg>
                    </Button>
                    <Button onClick={() => setThemePreview(theme.theme, changeTheme)} className="text-sm ">
                        Preview
                    </Button>
                </div>
            </div>
            <div className="divider my-0" />
            <p>
                {theme.description}
            </p>
            <SignedIn>
                {
                    userData?.likes?.includes(theme.id)
                        ? (
                            <Button onClick={() => onClick(theme.id, index)} className="mt-3 text-lg font-medium text-primary-content ">
                                {theme.likes}
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-heart"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" /></svg>
                            </Button>
                        ) : (
                            <Button onClick={() => onClick(theme.id, index)} className="mt-3 text-lg font-medium text-base-100-content hover:text-accent-content " variant="outline">
                                {theme.likes}
                                <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-heart-crack"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" /><path d="m12 13-1-1 2-2-3-3 2-2" /></svg>
                            </Button>
                        )
                }
            </SignedIn>
            <SignedOut>
                <Button className="mt-3 text-lg font-medium text-base-100-content hover:text-accent-content " disabled variant="outline">
                    {theme.likes}
                    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-heart-crack"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" /><path d="m12 13-1-1 2-2-3-3 2-2" /></svg>
                </Button>
            </SignedOut>
        </div>
    )
}
