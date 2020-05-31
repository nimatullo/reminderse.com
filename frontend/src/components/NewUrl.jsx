import React, { useState } from "react";
import TextField from "../components/TextField";
import Button from "../components/Button";
import Axios from "axios";
import { API_ROOT_URL } from "../constants";

const NewUrl = () => {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [category, setCategory] = useState();
  const [showAddedConfirmation, setShowAddedConfirmation] = useState(false);

  function handleSubmit() {
    const data = {
      entry_title: title,
      url: url,
      category: category,
    };
    Axios.post(`${API_ROOT_URL}/api/link/add`, data, { withCredentials: true }).then((res) => {
      setTitle("");
      setUrl("");
      setCategory("");
    });
    setShowAddedConfirmation(true);
    setTimeout(() => {
      setShowAddedConfirmation(false);
    }, 2000);
  }
  return (
    <>
      {showAddedConfirmation ? (
        <div className="notif">
          <p>Entry added.</p>
        </div>
      ) : null}
      <h1>Add Link</h1>
      <TextField
        label="Entry Title"
        placeholder="Title"
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <TextField
        label="URL"
        placeholder="https://..."
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <TextField
        label="Category (optional)"
        placeholder="Category"
        type="text"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      <Button onClick={handleSubmit} label="Add Entry" />
    </>
  );
};

export default NewUrl;
