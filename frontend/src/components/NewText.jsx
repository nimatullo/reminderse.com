import React, { useState } from "react";
import TextArea from "./TextArea";
import TextField from "./TextField";
import Button from "./Button";
import Axios from "axios";

const NewText = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [showAddedConfirmation, setShowAddedConfirmation] = useState(false);
  function handleSubmit() {
    const data = {
      entry_title: title,
      text_content: content,
      category: category,
    };
    Axios.post("/api/text/add", data).then((res) => {
      setTitle("");
      setContent("");
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
      <h1>Add Text</h1>
      <TextField
        label="Entry Title"
        placeholder="Title"
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <TextArea
        label="Text Content"
        value={content}
        placeholder="Contents for this entry"
        onChange={(e) => setContent(e.target.value)}
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

export default NewText;
