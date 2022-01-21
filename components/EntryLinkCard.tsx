import React, { useContext } from "react";
import { EntryContextImpl } from "../context/entry.context";
import DropdownMenu from "./DropdownMenu";
import Fade from "react-reveal/Fade";

const EntryLinkCard = () => {
  const entryProvider = useContext(EntryContextImpl);
  function stripUrl(url: string) {
    const pathArray = url.split("/");
    return pathArray[0] + "//" + pathArray[2];
  }
  return (
    <Fade>
      <div className="main-card rounded-box shadow-sm hover:shadow-md">
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
            {Number(entryProvider.entry.dateOfNextSend) < 0 ? (
              <div className="secondary date">Paused</div>
            ) : (
              <div className="secondary date">
                Next email goes out{" "}
                {entryProvider.entry.dateOfNextSend === "Tomorrow"
                  ? "Tomorrow"
                  : `in ${entryProvider.entry.dateOfNextSend} days`}
              </div>
            )}
          </div>
        </a>
        <DropdownMenu />
      </div>
    </Fade>
  );
};

export default EntryLinkCard;
