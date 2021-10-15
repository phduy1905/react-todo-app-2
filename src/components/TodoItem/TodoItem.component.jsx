import React, { useRef, useState } from "react";
import { Button, EditingForm } from "..";
import "./TodoItem.styles.css";
import { useAppContext } from "../../context/app_context";

export const TodoItem = ({ todo }) => {
  const {
    removeTodo,
    openBulk,
    closeBulk,
    updateTodo,
    toggleEditing,
    isEditingOpen,
    addToCheck,
    removeFromCheck,
  } = useAppContext();

  const checkbox = useRef(null);

  const handleRemove = () => {
    removeTodo(id);
  };

  const handleBulkOpen = (e) => {
    if (e.target.checked) {
      addToCheck(todo);
    } else {
      removeFromCheck(todo);
    }
  };

  const handleUpdate = (newTodo) => {
    updateTodo(newTodo);
  };

  const { title, id } = todo;

  return (
    <div className="item">
      <div className="item-header">
        <input
          type="checkbox"
          className="checkbox"
          defaultChecked={false}
          onChange={handleBulkOpen}
          ref={checkbox}
        />
        <h3 className="name">{title}</h3>
        <div className="btn-container">
          <Button color="blue" onClick={toggleEditing}>
            Detail
          </Button>
          <Button color="red" onClick={handleRemove}>
            Remove
          </Button>
        </div>
      </div>
      {isEditingOpen && (
        <div className="item-footer">
          <EditingForm btn="Update" data={todo} onUpdate={handleUpdate} />
        </div>
      )}
    </div>
  );
};
