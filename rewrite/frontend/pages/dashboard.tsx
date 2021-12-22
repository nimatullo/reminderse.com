import Navbar from "../components/Navbar";
import Image from "next/image"
import EntryLinkCard from "../components/EntryLinkCard";
import { useEffect, useState } from "react";
import { entryService } from "../service/entry.service";
import { Entry } from "../models/Entry";
import Router from "next/router";
import EntryTextCard from "../components/EntryTextCard";

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
						<EntryLinkCard key={entry.id} {...entry} />
					))}
					<EntryLinkCard title="Nikolas's Nude Photos" category="Self Help" content="https://imgur.com" dateOfNextSend="1" />
					<EntryLinkCard title="How to go pro in valorant" category="Gaming" content="https://youtube.com" dateOfNextSend="2" />
				</div>
				<h1 className="my-4 text-4xl font-bold">Texts</h1>
				<div className="dashboard grid-cols-1">
					{textEntries.map((entry) => (
						<EntryTextCard key={entry.id} {...entry} />
					))}
					<EntryTextCard
						title="Nikolas Kinalis Quotes"
						category="Self Help"
						content="With great cock, comes great cum. I'm not saying I'm a great cock, but I'm saying I'm a great cum."
						dateOfNextSend="1"
					/>
				</div>
			</div>
		</>
	)
}