import React from "react";
const Button = ({ label, color, onClick, className }) => {
  return (
    <button
      onClick={onClick}
      style={{ color: { color } }}
      className={`button ${className}`}
    >
      {label}
    </button>
  );
};

export default Button;
