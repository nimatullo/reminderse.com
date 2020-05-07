import React from "react";
import "../styles/Card.css";

const TextCard = ({ data }) => {
  return (
    <div className="card long">
      <div className="entryTitle">{data.entry_title}</div>
      <div className="cardContent">{data.text_content}</div>
      {data.days < 0 ? (
        <div className="secondary date">Paused</div>
      ) : (
        <div className="secondary date">{data.days}</div>
      )}
    </div>
  );
};

export default TextCard;
