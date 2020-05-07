import React from "react";
const Button = ({ label, color, onClick }) => {
  return (
    <button onClick={onClick} style={{ color: { color } }} className="button">
      {label}
    </button>
  );
};

export default Button;
