import React from "react";
import "../styles/Card.css";
import useModal from "../hooks/useDialog";
import Dialog from "../components/Dialog";

const TextCard = ({ data }) => {
  const { open, toggle } = useModal();
  const content = <div>{data.text_content}</div>;
  return (
    <>
      <div className="card long" onClick={toggle}>
        <div className="entryTitle">{data.entry_title}</div>
        <div className="cardContent">{data.text_content}</div>
        {data.days < 0 ? (
          <div className="secondary date">Paused</div>
        ) : (
          <div className="secondary date">{data.days}</div>
        )}
      </div>
      <Dialog
        open={open}
        hide={toggle}
        content={content}
        headerTitle={data.entry_title}
      />
    </>
  );
};

export default TextCard;
