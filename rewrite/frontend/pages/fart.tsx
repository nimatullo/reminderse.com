import { useEffect, useState } from "react";
import { entryService } from "../service/entry.service";

export default function Fart() {
	const [farts, setFarts] = useState("");
	useEffect(() => {
		entryService.getLink("375e026d-1d55-48b6-86ff-3ad8ba0fce28")
			.then((entry) => {
				setFarts(entry.entry_title);
			})
		}, [])

		return (
			<p>{farts}</p>
		)
}