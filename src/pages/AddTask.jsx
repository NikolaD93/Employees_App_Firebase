import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import TasksContext from "../contexts/TasksContext";
import EmployeesContext from "../contexts/EmployeesContext";
import { addDoc } from "firebase/firestore";
import { Input, Button } from "../common";

const initialState = {
  title: "",
  description: "",
  assignee: "",
  dueDate: "",
  status: "",
};

const AddTask = () => {
  const [state, setState] = useState(initialState);
  const { tasksCollectionRef } = useContext(TasksContext);
  const { employees } = useContext(EmployeesContext);

  const { title, description, assignee, dueDate, status } = state;
  const [showNotification, setShowNotification] = useState(false);

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(tasksCollectionRef, state);
      setShowNotification(true);
    } catch (error) {
      console.error(error);
    }

    setTimeout(() => navigate("/tasks"), 2000);
  };

  return (
    <>
      <h2>Add a task</h2>
      <div className="form-wrapper">
        <form onSubmit={handleSubmit}>
          <Input
            label="Title"
            type="text"
            value={title}
            name="title"
            id="title"
            onChange={handleInputChange}
            placeholder="Enter title.."
            required
          />
          <Input
            label="Description"
            type="text"
            value={description}
            name="description"
            id="description"
            onChange={handleInputChange}
            placeholder="Enter description.."
            required
          />
          <select
            name="assignee"
            id="assignee"
            onChange={handleInputChange}
            required
            defaultValue=""
          >
            <option value="" disabled>
              Please select...
            </option>
            {employees.map((employee) => (
              <option key={employee.id} value={employee.id}>
                {employee.name}
              </option>
            ))}
          </select>
          <Input
            label="Due Date"
            type="date"
            value={dueDate}
            name="dueDate"
            id="dueDate"
            onChange={handleInputChange}
            required
          />
          <select
            name="status"
            id="status"
            required
            defaultValue=""
            onChange={handleInputChange}
          >
            <option value="" disabled>
              Please select...
            </option>
            <option value="todo">Todo</option>
            <option value="completed">Completed</option>
            <option value="inProgress">In Progress</option>
          </select>
          <Button style={{ width: "100%" }} className="btn-save" type="submit">
            Save
          </Button>
        </form>
      </div>
      {showNotification && ( 
        <div className="notification">
          <p>New task added!</p>
          <Button onClick={() => setShowNotification(false)}>x</Button>
        </div>
      )}
    </>
  );
};

export default AddTask;
