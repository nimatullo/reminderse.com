import React from "react"
import Image from "next/image"
import { Entry } from "../models/Entry"

export default function EntryCard({ title, content, dateOfNextSend }: Entry) {
	return (
		<div className="card row-span-3 shadow-lg compact side bg-base-100">
			<figure>
				<Image src="/reminderse.png" height="100%" width="100%" alt="Reminderse" />
			</figure>
			<div style={{"textAlign": "center"}} className="card-body bg-primary-content">
				<div className="font-bold text-lg">Entry Title</div>
				<div style={{"color": "#616060"}}>Content</div>
				<div style={{"color": "#616060"}} className="text-gray">3 days</div>
			</div>
		</div>
	)

}