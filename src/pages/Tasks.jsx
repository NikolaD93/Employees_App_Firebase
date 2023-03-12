import React, { useState, useEffect, useContext } from "react";
import TasksContext from "../contexts/TasksContext";
import { Link } from "react-router-dom";
import { db } from "../db/Firebase";
import { deleteDoc, doc } from "firebase/firestore";
import { Button } from "../common";

const Tasks = () => {
  const { tasks, setTasks } = useContext(TasksContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [tasksPerPage] = useState(5);

  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = tasks.slice(indexOfFirstTask, indexOfLastTask);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const deleteTask = async (id) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      const taskDoc = doc(db, "tasks", id);
      await deleteDoc(taskDoc);
    }
  };

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
          <Link className="btn btn-add" to={"/addtask"}>
            Add New Task
          </Link>
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
                    <td>{task.assignee}</td>
                    <td>{task.dueDate}</td>
                    <td>{task.status}</td>
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
    </>
  );
};

export default Tasks;
