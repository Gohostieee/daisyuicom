"use client"

import { useUserStore } from "@/utils/state/auth"
import { SignedIn, SignedOut, SignIn, SignInButton, SignUp, UserButton, UserProfile } from "@clerk/nextjs";
import SignInUpDialog from "./ui/SignInUpDialog";




export default function Navbar() {
    const user = useUserStore((state) => state.user);
    const btnClass = "underline hover:text-lg hover:bg-primary hover:text-primary-content px-4 py-1 capitalize transition-all"
    return (
        <div className="w-screen h-12 sm:px-16 border-b border-primary shadow-2xl grid sm:grid-cols-3 grid-cols-2 items-center ">
            <div className="border-r flex items-center h-full border-neutral sm:block hidden ">
                <span className="text-xl font-bold text-secondary px-3 py-1 underline">MDotCom</span>
            </div>
            <div className="justify-self-center w-full h-full flex items-center border-r border-neutral">
                <span className="text-2xl font-black text-primary px-3 py-1 underline mx-auto">DaisyUI</span>
            </div>
            <div className="col-3 sm:justify-self-end justify-self-center">
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