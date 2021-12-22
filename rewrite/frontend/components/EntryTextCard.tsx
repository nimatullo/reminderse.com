import React, { useContext } from "react";
import { Entry } from "../models/Entry";
import DropdownLinkMenu from "./DropdownLinkMenu";

const EntryTextCard = (entry: Entry) => {
	const [isOpen, setIsOpen] = React.useState(false);
	return (
		<>
			<div className="main-card rounded-box shadow-sm hover:shadow-md" onClick={()=>setIsOpen(true)}>
				<div className="entryTitle text-center my-2">{entry.title}</div>
				<div className="cardInfo">
					<div>
						{entry.content}
					</div>
					<div className="secondary">{entry.category ? entry.category : <p> </p>}</div>
					{Number(entry.dateOfNextSend) < 0 ? (
						<div className="secondary">Paused</div>
					) : (
						<div className="secondary date">
							Next email goes out{" "}
							{entry.dateOfNextSend === "Tomorrow" ? "Tomorrow" : `in ${entry.dateOfNextSend} days`}
						</div>
					)}
				</div>
				<DropdownLinkMenu />
			</div>
			<input type="checkbox" id="my-modal-2" checked={isOpen} className="modal-toggle"/>
				<div className="modal">
					<div className="modal-box">
						<h1 className="text-2xl text-bold">{entry.title}</h1>
						<div className="divider"/>
						<p>{entry.content}</p>
						<div className="modal-action">
							<label htmlFor="my-modal-2" className="btn btn-primary" onClick={()=>setIsOpen(false)}>Edit</label>
							<label htmlFor="my-modal-2" className="btn" onClick={()=>setIsOpen(false)}>Close</label>
						</div>
					</div>
				</div>
			</>
			);
};

			export default EntryTextCard;
