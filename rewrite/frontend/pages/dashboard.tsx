import Navbar from "../components/Navbar";
import Image from "next/image"
import EntryLinkCard from "../components/EntryLinkCard";
import { useEffect, useState } from "react";
import { entryService } from "../service/entry.service";
import { Entry } from "../models/Entry";
import Router from "next/router";
import EntryTextCard from "../components/EntryTextCard";
import { EntryProvider } from "../context/entry.context";

export default function Dashboard() {
	const [linkEntries, setLinkEntries] = useState<Entry[]>([]);
	const [textEntries, setTextEntries] = useState<Entry[]>([]);

	useEffect(() => {
		entryService.getLinkEntries()
			.then((data) => {
				setLinkEntries(entryService.mapToEntry(data.entries));
			})
			.catch((error) => {
				if (error.response.status === 401) {
					localStorage.removeItem("user");
					Router.push("/login");
				}
			})
	}, []);

	useEffect(() => {
		entryService.getTextEntries()
			.then((data) => {
				console.log(data);

				setTextEntries(entryService.mapToEntry(data.entries));
			})
			.catch((error) => {
				if (error.response.status === 401) {
					localStorage.removeItem("user");
					Router.push("/login");
				}
			})
	}, []);

	return (
		<>
			<Navbar />
			<div className="p-4 lg:p-10">
				<h1 className="my-4 text-4xl font-bold">Links</h1>
				<div className="dashboard">
					{linkEntries.map((entry) => (
						<EntryProvider key={entry.id} initialEntry={entry}>
							<EntryLinkCard/>
						</EntryProvider>
					))}
				</div>
				<h1 className="my-4 text-4xl font-bold">Texts</h1>
				<div className="dashboard grid-cols-1">
					{textEntries.map((entry) => (
						<EntryProvider key={entry.id} initialEntry={entry}>
							<EntryTextCard />
						</EntryProvider>
					))}
				</div>
			</div>
		</>
	)
}