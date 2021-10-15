import React, { useState } from "react";
import { Button } from "..";
import "./EditingForm.styles.css";
import { v4 as uuidv4 } from "uuid";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useAppContext } from "../../context/app_context";

export const EditingForm = ({ onAdd, onUpdate, btn, data }) => {
  const { closeEditing } = useAppContext();

  const [state, setState] = useState({
    title: data?.title || "",
    desc: data?.desc || "",
    dueDate: data?.dueDate || new Date(),
    priority: data?.priority || "normal",
    id: data?.id || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState({
      ...state,
      [name]: value,
    });
  };

  const handleDateChange = (date) => {
    setState({
      ...state,
      dueDate: date,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let { title, desc, dueDate, priority, id } = state;

    if (onAdd) {
      const newTodo = {
        title,
        desc,
        dueDate,
        priority,
        id: uuidv4(),
      };
      onAdd(newTodo);

      setState({
        title: "",
        desc: "",
        dueDate: new Date(),
        priority: "normal",
        id: "",
      });
    }

    if (onUpdate) {
      const newTodo = {
        title,
        desc,
        dueDate: dueDate.getTime(),
        priority,
        id,
      };

      onUpdate(newTodo);
      closeEditing();
    }
  };

  return (
    <form className="editing-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <input
          type="text"
          placeholder="Add new task..."
          className="form-input"
          name="title"
          value={state.title}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="desc">Description</label>
        <textarea
          name="desc"
          id="desc"
          className="desc"
          value={state.desc}
          onChange={handleChange}
        ></textarea>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="due-date">Due Date</label>
          <DatePicker
            selected={state.dueDate}
            onChange={(date) => handleDateChange(date)}
            dateFormat="dd/MM/yyyy"
            minDate={new Date()}
          />
        </div>

        <div className="form-group">
          <label htmlFor="priority">Priority</label>
          <select
            name="priority"
            id="priority"
            className="priority"
            value={state.priority}
            onChange={handleChange}
          >
            <option value="low">Low</option>
            <option value="normal">Normal</option>
            <option value="high">High</option>
          </select>
        </div>
      </div>

      <Button color="green">{btn}</Button>
    </form>
  );
};
