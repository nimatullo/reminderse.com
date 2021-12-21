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
				<div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
					{linkEntries.map((entry) => (
						<EntryCard key={entry.id} {...entry} />
					))}
					<EntryCard title="very hard!" content="very hard!" dateOfNextSend="2020-01-01" />
				</div>
			</div>
		</>
	)
}