import React, { useState } from "react";
import TextField from "../components/TextField";
import "../styles/AddPage.css";
import Button from "../components/Button";

const AddPage = () => {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState();

  return (
    <div className="container">
      <div className="add-page">
        <h1>Add Item</h1>
        <TextField
          label="Entry Title"
          placeholder="Title"
          type="text"
          value={title}
        />
        <TextField
          label="URL"
          placeholder="https://..."
          type="text"
          value={url}
        />
        <TextField
          label="Category (optional)"
          placeholder="Category"
          type="text"
          value={category}
        />
        <Button label="Add Entry" />
      </div>
    </div>
  );
};

export default AddPage;
