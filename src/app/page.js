"use client"
import { Button } from "@/components/ui/button";
import UploadTheme from "@/components/UploadTheme";
import { getThemes } from "@/utils/db/actions";
import { useEffect, useState } from "react";

export default function Home() {
	const [themes, setThemes] = useState([])

	useEffect(() => {
		(async () => {
			setThemes(await getThemes())
		})()
	}, [])
	return (

		<div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 w-screen">
			<UploadTheme />
			<div className="flex flex-wrap gap-4 w-3/4">
				{
					themes.map(theme => (<>
						<div className="bg-base-200 w-64 min-h-16 border-base-300 border p-2 shadow-2xl">
							<div className="flex justify-between items-end">
								<div>
									<p className="text-2xl text-primary font-black">
										{theme.title}
									</p>
									<p className="ml-2 text-sm text-accent font-medium">
										By {theme.username}
									</p>
								</div>
								<Button className="text-sm">
									<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-copy"><rect width="14" height="14" x="8" y="8" rx="2" ry="2" /><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" /></svg>
								</Button>
								<Button className="text-sm">
									Preview
								</Button>
							</div>
							<div className="divider my-0" />
							<p>
								{theme.description}
							</p>
						</div>

					</>))
				}
			</div>
		</div>

	);
}
