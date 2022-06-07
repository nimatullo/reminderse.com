import React, { useContext, useState } from "react";
import { EntryContextImpl } from "../context/entry.context";
import { entryService } from "../service/entry.service";
import DropdownMenu from "./DropdownMenu";

const EntryLinkCard = ({ link }) => {
  function stripUrl(url: string) {
    const pathArray = url.split("/");
    return pathArray[0] + "//" + pathArray[2];
  }

  const [date, setDate] = useState(link.date_of_next_send);

  return (
    <div className="main-card rounded-box shadow-sm hover:shadow-md">
      <DropdownMenu entry={link} setDate={setDate} date={date} />
      <a href={link.content} target="_blank" rel="noopener noreferrer">
        <div className="imgArea">
          <img
            className="text-secondary"
            width={200}
            src={`https://logo.clearbit.com/${stripUrl(link.content)}`}
            alt={link.title.charAt(0)}
          />
        </div>
        <div className="cardInfo bg-primary-content">
          <div className="entryTitle">{link.title}</div>
          <div className="secondary">
            {link.category ? link.category : <p> </p>}
          </div>
          <div className="secondary date">{entryService.formatDate(date)}</div>
        </div>
      </a>
    </div>
  );
};

export default EntryLinkCard;
