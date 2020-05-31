import React, { useContext } from "react";
import "../styles/Card.css";
import DropdownLinkMenu from "./DropdownLinkMenu";
import EntryContext from "../context/EntryContext";

const LinkCard = () => {
  const data = useContext(EntryContext);
  function stripUrl(url) {
    const pathArray = url.split("/");
    return pathArray[0] + "//" + pathArray[2];
  }
  return (
    <div className="card">
      <a href={data.url} target="_blank" rel="noopener noreferrer">
        <div className="imgArea">
          <img
            width={200}
            src={`http://logo.clearbit.com/${stripUrl(data.url)}`}
            alt={data.entry_title.charAt(0)}
          />
        </div>
        <div className="cardInfo">
          <div className="entryTitle">{data.entry_title}</div>
          <div className="secondary">{data.category ? data.category : <p> </p>}</div>
          {data.days < 0 ? (
            <div className="secondary date">Paused</div>
          ) : (
              <div className="secondary date">
                Next email goes out{" "}
                {data.days === "Tomorrow" ? "Tomorrow" : `in ${data.days} days`}
              </div>
            )}
        </div>
      </a>
      <DropdownLinkMenu />
    </div>
  );
};

export default LinkCard;
