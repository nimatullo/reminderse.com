import React, { useContext } from "react";
import "../styles/Card.css";
import useModal from "../hooks/useDialog";
import Dialog from "../components/Dialog";
import DropdownTextMenu from "./DropdownTextMenu";
import EntryContext from "../context/EntryContext";

const TextCard = () => {
  const data = useContext(EntryContext);
  const { open, toggle } = useModal();
  const content = <div>{data.text_content}</div>;
  return (
    <>
      <div className="card text">
        <div className="clickableArea" onClick={toggle}>
          <div className="entryTitle">
            {data.entry_title}

            <div
              className="secondary"
              style={{
                textAlign: "center",
                fontWeight: "normal",
                fontSize: "0.9rem",
              }}
            >
              {data.category}
            </div>
          </div>
          <div className="cardContent">{data.text_content}</div>
        </div>
        {data.days < 0 ? (
          <div className="secondary date">Paused</div>
        ) : (
          <div className="secondary date">
            Next email goes out{" "}
            {data.days === "Tomorrow" ? "tomorrow" : `in ${data.days} days`}
          </div>
        )}
        <DropdownTextMenu />
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
