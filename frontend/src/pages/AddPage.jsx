import React, { useState } from "react";
import TextField from "../components/TextField";
import "../styles/AddPage.css";
import Button from "../components/Button";
import Axios from "axios";

const AddPage = () => {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState();

  function handleSubmit() {
    const data = {
      entry_title: title,
      url: url,
      category: category,
    };
    Axios.post("/api/link/add", data).then((res) => console.log(res));
  }

  return (
    <div className="container">
      <div className="add-page">
        <h1>Add Item</h1>
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
      </div>
    </div>
  );
};

export default AddPage;
