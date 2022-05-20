import React, { useContext } from "react";
import { EntryContextImpl } from "../context/entry.context";
import { entryService } from "../service/entry.service";
import DropdownMenu from "./DropdownMenu";

const EntryLinkCard = () => {
  const entryProvider = useContext(EntryContextImpl);
  function stripUrl(url: string) {
    const pathArray = url.split("/");
    return pathArray[0] + "//" + pathArray[2];
  }
  return (
    <div className="main-card rounded-box shadow-sm hover:shadow-md">
      <DropdownMenu />
      <a
        href={entryProvider.entry.content}
        target="_blank"
        rel="noopener noreferrer"
      >
        <div className="imgArea">
          <img
            className="text-secondary"
            width={200}
            src={`https://logo.clearbit.com/${stripUrl(
              entryProvider.entry.content
            )}`}
            alt={entryProvider.entry.title.charAt(0)}
          />
        </div>
        <div className="cardInfo bg-primary-content">
          <div className="entryTitle">{entryProvider.entry.title}</div>
          <div className="secondary">
            {entryProvider.entry.category ? (
              entryProvider.entry.category
            ) : (
              <p> </p>
            )}
          </div>
          <div className="secondary date">
            {entryService.formatDate(entryProvider.entry.date_of_next_send)}
          </div>
        </div>
      </a>
    </div>
  );
};

export default EntryLinkCard;
