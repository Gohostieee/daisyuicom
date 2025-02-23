"use client"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import UploadTheme from "@/components/UploadTheme";


import { useEffect, useState } from "react";
import { getThemes } from "@/utils/db/actions";
import Theme from "@/components/Theme";

export default function Home() {
	const [themes, setThemes] = useState([])
	const [count, refreshThemes] = useState(0)

	useEffect(() => {
		(async () => {
			setThemes(await getThemes())
		})()
	}, [count])




	function filterThemes(value) {
		let newThemes;
		switch (value) {
			case "az":
				newThemes = [...themes.sort((a, b) => a.title.localeCompare(b.title))]
				break;
			case "liked":
				newThemes = [...themes.sort((a, b) => b?.likes || 0 - a?.likes || 0)]
				break;
			default:
				newThemes = [...themes.sort((a, b) => b.order || 0 - a.order || 0)]
		}
		console.log(newThemes)
		setThemes(newThemes)
	}

	return (

		<div className="flex flex-col min-h-screen p-8 pb-20 sm:p-20 w-screen">
			<UploadTheme refreshThemes={refreshThemes} />
			<div className="divider">

			</div>
			<div className="flex flex-col items-start">
				<ToggleGroup variant="outline" type="single" className="mb-4" defaultValue="default">
					<ToggleGroupItem onClick={() => { filterThemes("az") }} value="default" className="data-[state=on]:text-secondary-content"> Default</ToggleGroupItem>
					<ToggleGroupItem onClick={() => { filterThemes("az") }} value="az" className="data-[state=on]:text-secondary-content"> A - Z</ToggleGroupItem>
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
