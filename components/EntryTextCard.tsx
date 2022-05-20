import { Router, useRouter } from "next/router";
import React, { useContext } from "react";
import { EntryContextImpl } from "../context/entry.context";
import { entryService } from "../service/entry.service";
import DropdownMenu from "./DropdownMenu";

const EntryTextCard = () => {
  const entryProvider = useContext(EntryContextImpl);
  const router = useRouter();
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <>
      <div className="main-card rounded-box shadow-sm hover:shadow-md cursor-pointer">
        <div className="clickable" onClick={() => setIsOpen(true)}>
          <div className="entryTitle text-center my-2">
            {entryProvider.entry.title}
          </div>
          <div className="cardInfo">
            <div>{entryProvider.entry.content}</div>
            <div className="secondary">
              {entryProvider.entry.category ? (
                entryProvider.entry.category
              ) : (
                <p></p>
              )}
            </div>
            <div className="secondary date">
              {entryService.formatDate(entryProvider.entry.date_of_next_send)}
            </div>
          </div>
        </div>
        <DropdownMenu />
      </div>
      <input
        type="checkbox"
        id="my-modal-2"
        checked={isOpen}
        className="modal-toggle"
      />
      <div className="modal">
        <div className="modal-box">
          <h1 className="text-2xl text-bold">{entryProvider.entry.title}</h1>
          <div className="divider" />
          <p>{entryProvider.entry.content}</p>
          <div className="modal-action">
            <label
              htmlFor="my-modal-2"
              className="btn btn-primary"
              onClick={() => router.push(`/text/${entryProvider.entry.id}`)}
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
