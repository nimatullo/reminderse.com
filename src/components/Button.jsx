import React from "react";
const Button = ({ label, color, onClick, className, isLoading }) => {
  return (
    <button
      disabled={isLoading}
      onClick={onClick}
      style={{ color: { color } }}
      className={`button ${className}`}
    >
      {isLoading ? "Loading..." : label}
    </button>
  );
};

export default Button;
