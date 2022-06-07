import { useRouter } from "next/router";
import React, { useState } from "react";
import { entryService } from "../service/entry.service";
import DropdownMenu from "./DropdownMenu";

const EntryTextCard = ({ text }) => {
  const router = useRouter();
  const [date, setDate] = useState(text.date_of_next_send);
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <>
      <div className="main-card rounded-box shadow-sm hover:shadow-md cursor-pointer">
        <div className="clickable" onClick={() => setIsOpen(true)}>
          <div className="entryTitle text-center my-2">{text.title}</div>
          <div className="cardInfo">
            <div>{text.content}</div>
            <div className="secondary">
              {text.category ? text.category : <p></p>}
            </div>
            <div className="secondary date">
              {entryService.formatDate(date)}
            </div>
          </div>
        </div>
        <DropdownMenu entry={text} date={date} setDate={setDate} />
      </div>
      <input
        type="checkbox"
        id="my-modal-2"
        checked={isOpen}
        className="modal-toggle"
      />
      <div className="modal">
        <div className="modal-box">
          <h1 className="text-2xl text-bold">{text.title}</h1>
          <div className="divider" />
          <p>{text.content}</p>
          <div className="modal-action">
            <label
              htmlFor="my-modal-2"
              className="btn btn-primary"
              onClick={() => router.push(`/text/${text.id}`)}
            >
              Edit
            </label>
            <label
              htmlFor="my-modal-2"
              className="btn"
              onClick={() => setIsOpen(false)}
            >
              Close
            </label>
          </div>
        </div>
      </div>
    </>
  );
};

export default EntryTextCard;
