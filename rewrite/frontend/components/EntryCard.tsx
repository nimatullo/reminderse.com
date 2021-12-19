import React from "react"
import Image from "next/image"
import { Entry } from "../models/Entry"
import DropdownLinkMenu from "./DropdownLinkMenu"

export default function EntryCard(entry: Entry) {
	return (
		<>
		<div style={{ "border": "1px solid #eee" }} className="rounded-box row-span-3 shadow-sm compact side bg-base-100 border hover:shadow-md transition">
			<figure>
				<Image src="/reminderse.png" height="100%" width="100%" alt="Reminderse" />
			</figure>
			<a target="_blank" href={entry.content}>
				<div style={{ "textAlign": "center" }} className="card-body bg-primary-content">
					<div className="font-bold text-lg">{entry.title}</div>
					<div>{entry.category}</div>
					<div style={{ "color": "#616060" }} className="text-gray">{entry.dateOfNextSend} days</div>
				</div>
			</a>
			<DropdownLinkMenu/>
		</div>
		</>
	)
}