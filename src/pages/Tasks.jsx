import React, { useState, useContext, useEffect } from "react";
import TasksContext from "../contexts/TasksContext";
import EmployeesContext from "../contexts/EmployeesContext";
import "./Tasks.css";
import { Link } from "react-router-dom";
import { db } from "../db/Firebase";
import { deleteDoc, doc } from "firebase/firestore";
import { Button } from "../common";

const Tasks = () => {
  const { tasks } = useContext(TasksContext);
  const { employees } = useContext(EmployeesContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [tasksPerPage] = useState(5);
  const [statusFilter, setStatusFilter] = useState(null);
  const [showNotification, setShowNotification] = useState(false);

  const filterOptions = [
    { label: "All", value: null },
    { label: "Completed", value: "completed" },
    { label: "Todo", value: "todo" },
    { label: "In Progress", value: "inProgress" },
  ];

  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = tasks
    .filter((task) => (statusFilter ? task.status === statusFilter : true))
    .slice(indexOfFirstTask, indexOfLastTask);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const deleteTask = async (id) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      const taskDoc = doc(db, "tasks", id);
      await deleteDoc(taskDoc);
      setShowNotification(true);
    }
  };

  useEffect(() => {
    let notificationTimeout;
    if (showNotification) {
      notificationTimeout = setTimeout(() => {
        setShowNotification(false);
      }, 3000);
    }
    return () => clearTimeout(notificationTimeout);
  }, [showNotification]);

  return (
    <>
      <h1>Tasks</h1>
      {tasks.length === 0 ? (
        <div className="empty">
          <h3>There are no tasks...</h3>
          <Link
            style={{ margin: "auto" }}
            className="btn btn-add"
            to={"/addtask"}
          >
            Click here to add one
          </Link>
        </div>
      ) : (
        <div className="table-wrapper">
          <div className="filter-wrapper">
            <Link className="btn btn-add" to={"/addtask"}>
              Add New Task
            </Link>
            <div className="filter-buttons">
              {filterOptions.map((option) => (
                <Button
                  key={option.value}
                  onClick={() => setStatusFilter(option.value)}
                  className={statusFilter === option.value ? "active" : ""}
                >
                  {option.label}
                </Button>
              ))}
            </div>
          </div>
          <table className="styled-table">
            <thead>
              <tr>
                <th>No.</th>
                <th>Title</th>
                <th>Description</th>
                <th>Assignee</th>
                <th>Due date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentTasks.map((task, index) => {
                return (
                  <tr key={task.id}>
                    <th scope="row">
                      {index + 1 + tasksPerPage * (currentPage - 1)}
                    </th>
                    <td>{task.title}</td>
                    <td>{task.description}</td>
                    <td>
                      {employees.map((employee) => {
                        return task.assignee == employee.id
                          ? employee.name
                          : "";
                      })}
                    </td>
                    <td>{task.dueDate}</td>
                    <td>
                      <span
                        className={`${
                          task.status === "completed"
                            ? "status-completed"
                            : task.status === "todo"
                            ? "status-todo"
                            : "status-progress"
                        }`}
                      >
                        {task.status}
                      </span>
                    </td>
                    <td>
                      <Link to={`/${task.id}`}>
                        <Button className="btn btn-edit">Edit</Button>
                      </Link>
                      <Button
                        onClick={() => deleteTask(task.id)}
                        className="btn btn-delete"
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="pagination">
            <ul>
              {tasksPerPage < tasks.length &&
                Array(Math.ceil(tasks.length / tasksPerPage))
                  .fill()
                  .map((_, index) => (
                    <li
                      key={index}
                      className={
                        currentPage === index + 1
                          ? "active page-item"
                          : "page-item"
                      }
                    >
                      <a
                        href="#"
                        onClick={() => paginate(index + 1)}
                        className="page-link"
                      >
                        {index + 1}
                      </a>
                    </li>
                  ))}
            </ul>
          </div>
        </div>
      )}
      {showNotification && (
        <div className="notification">
          <p>Deleted successfully!</p>
          <Button onClick={() => setShowNotification(false)}>x</Button>
        </div>
      )}
    </>
  );
};

export default Tasks;
