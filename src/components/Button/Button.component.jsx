import React from "react";
import "./Button.styles.css";

export const Button = ({ children, color, onClick }) => {
  return (
    <button
      className="btn"
      style={{ backgroundColor: color }}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
