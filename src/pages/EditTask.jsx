import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TasksContext from "../contexts/TasksContext";
import EmployeesContext from "../contexts/EmployeesContext";
import { updateDoc, doc } from "firebase/firestore";
import { Button, Input, Select } from "../components/shared";

const initialState = {
  title: "",
  description: "",
  dueDate: "",
};

const EditTask = () => {
  const [state, setState] = useState(initialState);
  const { tasksCollectionRef, tasks, setTasks } = useContext(TasksContext);
  const { employees } = useContext(EmployeesContext);
  const [showNotification, setShowNotification] = useState(false);

  const { title, description, dueDate } = state;

  const navigate = useNavigate();
  const params = useParams();

  let task = tasks.filter((item) => {
    if (item.id == params.id) {
      return item;
    }
  })[0];

  useEffect(() => {
    if (task) {
      setState(task);
    }
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
        setShowNotification(true);
        return updatedTasks;
      });
    } catch (error) {
      console.error(error);
    }

    setTimeout(() => navigate("/tasks"), 2000);
  };

  const [visible, setVisible] = useState(true);
  const removeElement = () => {
    setVisible((prev) => !prev);
  };

  return (
    <>
      <h2>Edit task</h2>
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
          <Select
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
          </Select>
          <Input
            label="Due Date"
            type="date"
            value={dueDate}
            name="dueDate"
            id="dueDate"
            onChange={handleInputChange}
            required
          />
          <Select
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
          </Select>
          <div style={{ display: "flex" }}>
            <Button
              style={{ background: "dodgerblue" }}
              className="btn btn-save"
              type="submit"
              onClick={removeElement}
            >
              Save
            </Button>

            <Button
              onClick={() => navigate("/tasks")}
              style={{ background: "firebrick" }}
              className="btn btn-save"
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
      {showNotification && (
        <div className="notification">
          <p>Edited successfully!</p>
          <Button onClick={() => setShowNotification(false)}>x</Button>
        </div>
      )}
    </>
  );
};

export default EditTask;
