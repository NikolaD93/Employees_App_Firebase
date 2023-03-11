import React, { useState, useEffect, useContext } from "react";
import TasksContext from "../contexts/TasksContext";
import { Link } from "react-router-dom";
import { db } from "../config/firebase";
import { deleteDoc, doc } from "firebase/firestore";

const Tasks = () => {
  const { tasks, setTasks } = useContext(TasksContext);

  const deleteTask = async (id) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      const taskDoc = doc(db, "tasks", id);
      await deleteDoc(taskDoc);
    }
  };

  return (
    <>
      <h1>Tasks</h1>
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
            {tasks.map((task, index) => {
              return (
                <tr key={task.id}>
                  <th scope="row">{index + 1}</th>
                  <td>{task.title}</td>
                  <td>{task.description}</td>
                  <td>{task.assignee}</td>
                  <td>{task.dueDate}</td>
                  <td>{`${task.finished ? "Completed" : "Todo"}`}</td>
                  <td>
                    <Link to={`/${task.id}`}>
                      <button className="btn btn-edit">Edit</button>
                    </Link>
                    <button
                      onClick={() => deleteTask(task.id)}
                      className="btn btn-delete"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Tasks;
