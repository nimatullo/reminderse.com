import React, { useContext } from "react";
import { Entry } from "../models/Entry";
import DropdownLinkMenu from "./DropdownLinkMenu";

const EntryLinkCard = (entry: Entry) => {
  function stripUrl(url: string) {
    const pathArray = url.split("/");
    return pathArray[0] + "//" + pathArray[2];
  }
  return (
    <div className="main-card rounded-box shadow-sm hover:shadow-md">
      <a href={entry.content} target="_blank" rel="noopener noreferrer">
        <div className="imgArea">
          <img
            className="text-secondary"
            width={200}
            src={`https://logo.clearbit.com/${stripUrl(entry.content)}`}
            alt={entry.title.charAt(0)}
          />
        </div>
        <div className="cardInfo bg-primary-content">
          <div className="entryTitle">{entry.title}</div>
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
      </a>
      <DropdownLinkMenu />
    </div>
  );
};

export default EntryLinkCard;