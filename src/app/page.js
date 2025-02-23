"use client"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import UploadTheme from "@/components/UploadTheme";


import { useEffect, useState } from "react";
import { getThemes } from "@/utils/db/actions";
import Theme from "@/components/Theme";

export default function Home() {
	const [themes, setThemes] = useState([])


	useEffect(() => {
		(async () => {
			setThemes(await getThemes())
		})()
	}, [])




	function filterThemes(value) {
		let newThemes;
		switch (value) {
			case "new":
				newThemes = [...themes.sort((a, b) => a.order - b.order)]
				break;
			case "liked":
				newThemes = [...themes.sort((a, b) => b.likes - a.likes)]
				break;
			default:
				newThemes = [...themes]
		}
		console.log(newThemes)
		setThemes(newThemes)
	}

	return (

		<div className="flex flex-col min-h-screen p-8 pb-20 sm:p-20 w-screen">
			<UploadTheme />
			<div className="divider">

			</div>
			<div className="flex flex-col items-start">
				<ToggleGroup variant="outline" type="single" className="mb-4" defaultValue="new">
					<ToggleGroupItem onClick={() => { filterThemes("new") }} value="new" className="data-[state=on]:text-secondary-content">New Themes</ToggleGroupItem>
					<ToggleGroupItem onClick={() => { filterThemes("liked") }} value="liked" className="data-[state=on]:text-secondary-content">Most liked</ToggleGroupItem>
				</ToggleGroup>
				<div className="flex flex-wrap gap-4 shrink-0 basis-auto ">
					{
						themes.map((theme, index) => (
							<Theme key={`theme-${index}`} index={index} theme={theme} themes={themes} setThemes={setThemes} />
						))
					}
				</div>
			</div>

		</div>

	);
}
