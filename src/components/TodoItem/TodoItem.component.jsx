import React, { useState } from "react";
import { Button, EditingForm } from "..";
import "./TodoItem.styles.css";
import { useAppContext } from "../../context/app_context";

export const TodoItem = ({ todo }) => {
  const { removeTodo, openBulk, closeBulk, updateTodo } = useAppContext();

  const [isEditing, setIsEditing] = useState(false);

  const toggleEditing = () => {
    setIsEditing((prev) => !prev);
  };

  const handleRemove = () => {
    removeTodo(id);
  };

  const handleBulkOpen = (e) => {
    if (e.target.checked) {
      openBulk();
    } else {
      closeBulk();
    }
  };

  const handleUpdate = (id, title, desc, dueDate, priority) => {
    updateTodo(id, title, desc, dueDate, priority);
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
      {isEditing && (
        <div className="item-footer">
          <EditingForm btn="Update" data={todo} onUpdate={handleUpdate} />
        </div>
      )}
    </div>
  );
};
