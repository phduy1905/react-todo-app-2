import React, { useEffect, useRef, useState } from "react";
import { Button, TodoItem } from "..";
import "./RightSide.styles.css";
import { useAppContext } from "../../context/app_context";

export const RightSide = () => {
  let { todos, clearTodos, isBulkOpen, searchTodo, filtered_todos } =
    useAppContext();

  const [displayTodos, setDisplayTodos] = useState([]);

  const searchEl = useRef(null);

  const handleClearTodos = () => {
    clearTodos();
  };

  const handleSearchChange = (e) => {
    searchTodo(e.target.value);
  };

  useEffect(() => {
    if (searchEl.current.value.length >= 1) {
      setDisplayTodos(filtered_todos);
    } else {
      setDisplayTodos(todos);
    }
  }, [searchEl, searchTodo]);

  return (
    <div className="right">
      <h2 className="title">To Do List</h2>
      <input
        type="text"
        className="search"
        placeholder="Search..."
        onChange={handleSearchChange}
        ref={searchEl}
      />
      {todos.length < 1 && (
        <div className="empty">You have no task to be done</div>
      )}
      <div className="todo-list">
        {displayTodos.map((todo) => {
          return <TodoItem key={todo.id} todo={todo} />;
        })}
      </div>

      {isBulkOpen && todos.length >= 1 && (
        <div className="bulk-action">
          <span>Bulk Action: </span>
          <div className="btn-container">
            <Button color="blue">Done</Button>
            <Button color="red" onClick={handleClearTodos}>
              Remove
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
