import React, { useState, useEffect } from "react";
import "../styles/AddPage.css";
import NewUrl from "../components/NewUrl";
import NewText from "../components/NewText";
import Button from "../components/Button";

const AddPage = () => {
  const [isUrlTabActive, setIsUrlTabActive] = useState(true);

  return (
    <div className="container">
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
