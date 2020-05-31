import React, { useContext } from "react";
import "../styles/Card.css";
import useModal from "../hooks/useDialog";
import Dialog from "../components/Dialog";
import DropdownTextMenu from "./DropdownTextMenu";
import EntryContext from "../context/EntryContext";
import Button from "../components/Button";
import { useHistory } from "react-router-dom";
import Axios from "axios";
import { API_ROOT_URL } from "../constants";


const TextCard = () => {
  const data = useContext(EntryContext);
  const { open, toggle } = useModal();
  const content = <div>{data.text_content}</div>;
  const history = useHistory();
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
        content={
          <div>
            <p>{content}</p>
            <br />
            {data.days < 0 ? (
              <div className="secondary date">Paused</div>
            ) : (
                <div className="secondary date">
                  Next email goes out{" "}
                  {data.days === "Tomorrow" ? "tomorrow" : `in ${data.days} days`}
                </div>
              )}
            <br />
            <div className="unsubscribe-dialog">
              <Button
                label="Edit"
                onClick={() => history.push(`/edit/text/${data.id}`)}
              />
              <Button
                onClick={() => {
                  Axios.delete(`${API_ROOT_URL}/api/text/${data.id}`, { withCredentials: true });
                  window.location.reload(false);
                }}
                className="negative-button"
                label="Delete Entry"
              />
            </div>
          </div>
        }
        headerTitle={
          <div>
            <h2>{data.entry_title}</h2>
            {data.category ? <h3>Category: {data.category}</h3> : null}
          </div>
        }
      />
    </>
  );
};

export default TextCard;
