import React, { useState, useEffect } from "react";
import "../styles/AddPage.css";
import NewUrl from "../components/NewUrl";
import NewText from "../components/NewText";
import Button from "../components/Button";
import Axios from "axios";

const AddPage = () => {
  const [isUrlTabActive, setIsUrlTabActive] = useState(true);
  const [isEmailConfirmed, setIsEmailConfirmed] = useState(true);

  useEffect(() => {
    Axios.get("/api/confirmed").then((res) =>
      setIsEmailConfirmed(res.data.isConfirmed)
    );
  }, []);

  return (
    <div className="container">
      {!isEmailConfirmed ? (
        <div className="email-msg">
          <p>
            You have not yet confirmed your email. You may continue adding
            entries but you won't receive reminders for these entries.
          </p>
          <div className="msg-actions">
            <Button
              className="resend-email"
              label="Resend confirmation email"
              onClick={() => {
                Axios.get("/api/send-email-confirmation");
              }}
            />
            <Button label="Close" onClick={() => setIsEmailConfirmed(true)} />
          </div>
        </div>
      ) : null}

      <div className="page-tabs">
        <div className="url-tab">
          <Button
            label="Add URL"
            className={isUrlTabActive ? "active" : ""}
            onClick={() => setIsUrlTabActive(true)}
          />
        </div>
        <div className="text-tab">
          <Button
            className={isUrlTabActive ? "" : "active"}
            label="Add Text"
            onClick={() => setIsUrlTabActive(false)}
          />
        </div>
      </div>
      <div className="add-page">
        {isUrlTabActive ? <NewUrl /> : <NewText />}
      </div>
    </div>
  );
};

export default AddPage;
