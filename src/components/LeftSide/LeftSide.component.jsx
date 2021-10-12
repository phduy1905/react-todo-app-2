import React from "react";
import { EditingForm } from "..";
import "./LeftSide.styles.css";
import { useAppContext } from "../../context/app_context";

export const LeftSide = () => {
  const { addTodo } = useAppContext();

  return (
    <div className="left">
      <h2 className="title">New Task</h2>
      <EditingForm onAdd={addTodo} btn="Add" />
    </div>
  );
};
