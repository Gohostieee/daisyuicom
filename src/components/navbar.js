"use client"

import { useUserStore } from "@/utils/state/auth"
import { SignedIn, SignedOut, SignIn, SignInButton, SignUp, UserButton, UserProfile } from "@clerk/nextjs";
import { Dialog, DialogContent, DialogHeader, DialogTrigger, DialogTitle } from "./ui/dialog";

const SignInUpDialog = ({ trigger, content, title }) => {
    return (
        <Dialog>
            <DialogTrigger>{trigger}</DialogTrigger>
            <DialogContent className="bg-base-100 grid grid-cols-1 items-center justify-items-center shadow-2xl">
                <DialogHeader>
                    <DialogTitle>
                        {title}
                    </DialogTitle>
                </DialogHeader>
                {content}
            </DialogContent>
        </Dialog>
    )

}


export default function Navbar() {
    const user = useUserStore((state) => state.user);
    const btnClass = "underline hover:text-lg hover:bg-primary hover:text-primary-content px-4 py-1 capitalize transition-all"
    console.log(user)
    return (
        <div className="w-screen h-12  px-16 border-b border-primary shadow-2xl grid grid-cols-3 items-center ">
            <div className="border-r flex items-center h-full border-neutral';
            '">
                <span className="text-xl font-bold text-secondary px-3 py-1 underline">MDotCom</span>
            </div>
            <div className="justify-self-center w-full h-full flex items-center border-r border-neutral';
            '">
                <span className="text-2xl font-black text-primary px-3 py-1 underline mx-auto">DaisyUI</span>

            </div>
            <div className="col-3 justify-self-end">
                <SignedOut>
                    <div className="flex">
                        <SignInUpDialog trigger={<span className={btnClass}> Sign In</span>} content={<SignIn routing="hash" />} title={"Sign In"} />
                        <SignInUpDialog trigger={<span className={btnClass}> Sign Up</span>} content={<SignUp routing="hash" />} title={"Sign Up"} />
                    </div>
                </SignedOut>
                <SignedIn>
                    <div>
                        <UserButton showName={true} appearance={{
                            elements: {
                                userButtonBox: "bg-neutral px-4 py-1 transition-all hover:bg-secondary text-neutral-content hover:text-secondary-content"
                            }
                        }} />

                    </div>
                </SignedIn>
            </div>
        </div>
    )
}