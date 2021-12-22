import Navbar from "../components/Navbar";
import Image from "next/image"
import EntryCard from "../components/EntryCard";
import { useEffect, useState } from "react";
import { entryService } from "../service/entry.service";
import { Entry } from "../models/Entry";
import Router from "next/router";

export default function Dashboard() {
	const [linkEntries, setLinkEntries] = useState<Entry[]>([]);
	
	useEffect(()=> {
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

	return (
		<>
			<Navbar />
			<div className="p-4 lg:p-10">
				<h1 className="my-4 text-4xl font-bold">Links</h1>
				<div className="dashboard">
					{linkEntries.map((entry) => (
						<EntryCard key={entry.id} {...entry} />
					))}
					<EntryCard title="Nikolas's Nude Photos" category="Self Help" content="https://imgur.com" dateOfNextSend="1" />
					<EntryCard title="How to go pro in valorant" category="Gaming" content="https://youtube.com" dateOfNextSend="2" />
				</div>
			</div>
		</>
	)
}