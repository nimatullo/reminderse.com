import React from "react";

const TextArea = ({ label, value, placeholder, onChange }) => {
  return (
    <div className="textFieldContainer">
      {label && <label>{label}</label>}
      <textarea
        rows={5}
        value={value}
        className="textField textarea"
        placeholder={placeholder}
        onChange={onChange}
      ></textarea>
    </div>
  );
};

export default TextArea;
