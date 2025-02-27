"use client"
import { Button } from "@/components/ui/button";
import { ClerkProvider, SignedIn, SignedOut, SignIn, SignUp } from "@clerk/nextjs";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "./ui/tooltip"
import { DialogHeader, DialogTitle, Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { DialogDescription } from "@radix-ui/react-dialog";
import { Form, useForm } from "react-hook-form";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";
import { TabsContent } from "@radix-ui/react-tabs";
import { useEffect, useState } from "react";
import ThemePreview from "./ThemePreview";
import { uploadTheme } from "@/utils/db/actions";
import { Loader2 } from "lucide-react";


const v4PlaceHolder = `"primary": "#00a4ff",          
"secondary": "#4e00ff",          
"accent": "#00a100",          
"neutral": "#1b2218",          
"base-100": "#fffdfd",          
"info": "#008dff",          
"success": "#89d800",
"warning": "#b15000",          
"error": "#ff1c70",
`
const v5PlaceHolder = `name: "abyss";
default: false;
prefersdark: false;
color-scheme: "dark";
--color-base-100: oklch(20% 0.08 209);
--color-base-200: oklch(15% 0.08 209);
--color-base-300: oklch(10% 0.08 209);
--color-base-content: oklch(90% 0.076 70.697);
--color-primary: oklch(92% 0.2653 125);
--color-primary-content: oklch(50% 0.2653 125);
--color-secondary: oklch(83.27% 0.0764 298.3);
--color-secondary-content: oklch(43.27% 0.0764 298.3);
--color-accent: oklch(43% 0 0);
--color-accent-content: oklch(98% 0 0);
--color-neutral: oklch(30% 0.08 209);
--color-neutral-content: oklch(90% 0.076 70.697);
--color-info: oklch(74% 0.16 232.661);
--color-info-content: oklch(29% 0.066 243.157);
--color-success: oklch(79% 0.209 151.711);
--color-success-content: oklch(26% 0.065 152.934);
--color-warning: oklch(84.8% 0.1962 84.62);
--color-warning-content: oklch(44.8% 0.1962 84.62);
--color-error: oklch(65% 0.1985 24.22);
--color-error-content: oklch(27% 0.1985 24.22);
--radius-selector: 2rem;
--radius-field: 0.25rem;
--radius-box: 0.5rem;
--size-selector: 0.25rem;
--size-field: 0.25rem;
--border: 1px;
--depth: 1;
--noise: 0;
`


export default function UploadTheme({ refreshThemes }) {
    const {
        register,
        handleSubmit,
        formState: { errors },
        getValues,
        reset
    } = useForm()
    const [css, setCss] = useState("")
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")


    const onSubmit = (data) => {
        setLoading(true)
        uploadTheme(data)
            .then(res => {
                setLoading(false)
                if (res.error) {
                    setError("Error uploading your theme!")
                    console.error(res.message)
                } else {
                    setOpen(false)
                    setError("")
                    refreshThemes(count => count + 1)
                    reset()
                }
            })
    }

    return (
        <div>
            <SignedIn>
                <Dialog onOpenChange={setOpen} open={open}>
                    <DialogTrigger asChild>
                        <Button className="text-primary-content">
                            Upload Theme
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="text-base-100-content bg-base-100">
                        <DialogHeader>
                            <DialogTitle>
                                Upload Theme
                            </DialogTitle>
                            <DialogDescription>
                                Upload a new theme for everyone to see!
                            </DialogDescription>
                        </DialogHeader>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            {
                                error != "" && (
                                    <div role="alert" className="alert alert-error">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-6 w-6 shrink-0 stroke-current"
                                            fill="none"
                                            viewBox="0 0 24 24">
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <span>{error}</span>
                                    </div>
                                )
                            }
                            <div>
                                <Label htmlFor="title">
                                    Title
                                </Label>
                                <Input id="title" placeholder="Enter your title" {...register("title", { required: true })} />
                            </div>
                            <div>
                                <Label htmlFor="description">
                                    Description
                                </Label>
                                <Textarea id="description" placeholder="Enter your description" {...register("description")} />
                            </div>
                            <div>
                                <Label htmlFor="theme">
                                    Theme
                                </Label>
                                <Tabs defaultValue="v4">
                                    <TabsList>
                                        <TabsTrigger value="v4">V4 Themes</TabsTrigger>
                                        <TabsTrigger value="v5">V5 Themes</TabsTrigger>
                                    </TabsList>
                                    <TabsContent value="v4">
                                        <p className="text-sm ml-2 mb-2">Export your theme from the <a className="link font-medium" href="https://daisyui.com/theme-generator/" target="_blank">V4 theme generator</a></p>
                                        <Textarea id="theme" className="h-64" placeholder={v4PlaceHolder} {...register("theme", { required: true })} />
                                        <ThemePreview mode="v4" trigger={<Button className="mt-2 text-xs" >Preview</Button>} css={() => getValues().theme} />
                                    </TabsContent>
                                    <TabsContent value="v5">
                                        <p className="text-sm ml-2 mb-2">Export your theme from the <a className="link font-medium" href="https://v5.daisyui.com/theme-generator//" target="_blank">V5 theme generator</a></p>
                                        <Textarea onChange={e => setCss(e.target.value)} id="theme" className="h-64" placeholder={v5PlaceHolder} {...register("theme", { required: true })} />
                                        <ThemePreview mode="v5" trigger={<Button className="mt-2 text-xs">Preview</Button>} css={() => getValues().theme} />
                                    </TabsContent>
                                </Tabs>
                            </div>
                            {
                                !loading ?
                                    <Button type="submit" className="mt-2 w-full text-primary-content">
                                        Submit
                                    </Button> :
                                    <Button disabled className="mt-2 w-full text-primary-content">
                                        <Loader2 className="animate-spin" />
                                        Please wait
                                    </Button>
                            }
                        </form>
                    </DialogContent>
                </Dialog>
            </SignedIn>
            <SignedOut>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger >
                            <p className="opacity-75 bg-primary py-2 px-4 rounded-md text-sm font-medium text-primary-content">
                                Upload Theme
                            </p>
                        </TooltipTrigger>
                        <TooltipContent className="font-medium text-primary-content">
                            You are not logged in!
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </SignedOut>
        </div >
    )
}