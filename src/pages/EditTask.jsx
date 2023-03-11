import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TasksContext from "../contexts/TasksContext";
import { updateDoc, doc } from "firebase/firestore";

const initialState = {
  title: "",
  description: "",
  assignee: "",
  dueDate: "",
  status: "",
};

const EditTask = () => {
  const [state, setState] = useState(initialState);
  const { tasksCollectionRef, tasks, setTasks } = useContext(TasksContext);

  const { title, description, assignee, dueDate, status } = state;

  const navigate = useNavigate();
  const params = useParams();

  let task = tasks.filter((item) => {
    if (item.id == params.id) {
      return item;
    }
  })[0];

  useEffect(() => {
    setState(task);
  }, [task]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateDoc(doc(tasksCollectionRef, params.id), state);
      setTasks((prevState) => {
        const updatedTasks = [...prevState];
        const index = updatedTasks.findIndex((task) => task.id === params.id);
        updatedTasks[index] = state;
        return updatedTasks;
      });
    } catch (error) {
      console.error(error);
    }

    setTimeout(() => navigate("/tasks"), 500);
  };

  return (
    <>
      <h2>Edit task</h2>
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
          {/* <select
            id="status"
            name="status"
            value={status}
            onChange={handleInputChange}
          /> */}
          <select name="status" id="status" onChange={handleInputChange}>
            <option value={status}>Completed</option>
            {/* <option value={status}>Todo</option> */}
          </select>
          <div style={{ display: "flex" }}>
            <button
              style={{ background: "dodgerblue" }}
              className="btn btn-save"
              type="submit"
            >
              Save
            </button>

            <button
              onClick={() => navigate("/tasks")}
              style={{ background: "firebrick" }}
              className="btn btn-save"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditTask;
