import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TasksContext from "../contexts/TasksContext";
import { addDoc } from "firebase/firestore";

const initialState = {
  title: "",
  description: "",
  assignee: "",
  dueDate: "",
  status: "",
};

const AddTask = () => {
  const [state, setState] = useState(initialState);
  const { tasksCollectionRef, tasks, setTasks } = useContext(TasksContext);

  const { title, description, assignee, dueDate, status } = state;

  const navigate = useNavigate();

  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setState({ ...state, [name]: value });
  // };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "status") {
      const selectedIndex = e.target.selectedIndex;
      const selectedStatus = e.target.options[selectedIndex].value;
      setState({ ...state, [name]: selectedStatus });
    } else {
      setState({ ...state, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(tasksCollectionRef, state);
    } catch (error) {
      console.error(error);
    }

    setTimeout(() => navigate("/tasks"), 500);
  };

  return (
    <>
      <h2>Add a task</h2>
      <div className="form-wrapper">
        <form onSubmit={handleSubmit}>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Enter title.."
            value={title}
            autoComplete="off"
            onChange={handleInputChange}
          />
          <label htmlFor="description">Description</label>
          <input
            type="description"
            id="description"
            name="description"
            placeholder="Enter description.."
            value={description}
            autoComplete="off"
            onChange={handleInputChange}
          />
          <label htmlFor="assignee">Assignee</label>
          <input
            type="text"
            id="assignee"
            name="assignee"
            required
            value={assignee}
            autoComplete="off"
            onChange={handleInputChange}
          />
          <label htmlFor="dueDate">Due date</label>
          <input
            type="date"
            id="dueDate"
            name="dueDate"
            value={dueDate}
            onChange={handleInputChange}
          />
          <label htmlFor="status">Status</label>
          <select name="status" id="status" onChange={handleInputChange}>
            <option value="completed">Completed</option>
            <option value="todo">Todo</option>
          </select>
          <button style={{ width: "100%" }} className="btn-save" type="submit">
            Save
          </button>
        </form>
      </div>
    </>
  );
};

export default AddTask;

