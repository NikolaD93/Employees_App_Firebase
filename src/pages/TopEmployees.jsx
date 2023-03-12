import React, { useContext } from "react";
import { Link } from "react-router-dom";
import TasksContext from "../contexts/TasksContext";
import EmployeesContext from "../contexts/EmployeesContext";

const TopEmployees = () => {
  const { tasks } = useContext(TasksContext);
  const { employees } = useContext(EmployeesContext);

  const taskCountByEmployee = employees.reduce((acc, employee) => {
    const taskCount = tasks.filter(
      (task) => task.assignee === employee.id && task.status === "completed"
    ).length;
    return { ...acc, [employee.id]: taskCount };
  }, {});

  const sortedEmployees = employees
    .filter((employee) => taskCountByEmployee[employee.id] > 0)
    .sort((a, b) => taskCountByEmployee[b.id] - taskCountByEmployee[a.id]);

  return (
    <>
      <h1>Top Employees</h1>
      {sortedEmployees.length === 0 ? (
        <div className="empty">
          <h3>No employee has completed any task yet...</h3>
          <p>😞</p>
        </div>
      ) : (
        <div className="table-wrapper">
          <table className="styled-table">
            <thead>
              <tr>
                <th>No.</th>
                <th>Employee Name</th>
                <th>Tasks Completed</th>
              </tr>
            </thead>
            <tbody>
              {sortedEmployees.slice(0, 5).map((employee, index) => (
                <tr key={employee.id}>
                  <th scope="row">{index + 1}</th>
                  <td>{employee.name}</td>
                  <td>{taskCountByEmployee[employee.id]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default TopEmployees;
