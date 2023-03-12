import React, { useState, useContext, useEffect } from "react";
import EmployeesContext from "../contexts/EmployeesContext";
import { Link } from "react-router-dom";
import { Button } from "../components/shared";
import { db } from "../db/Firebase";
import { deleteDoc, doc } from "firebase/firestore";

const Employees = () => {
  const { employees } = useContext(EmployeesContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [employeesPerPage] = useState(5);
  const [showNotification, setShowNotification] = useState(false);

  const indexOfLastEmployee = currentPage * employeesPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
  const currentEmployees = employees.slice(
    indexOfFirstEmployee,
    indexOfLastEmployee
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const deleteEmployee = async (id) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      const employeeDoc = doc(db, "employees", id);
      await deleteDoc(employeeDoc);
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

  const [visible, setVisible] = useState(true);
  const removeElement = () => {
    setVisible((prev) => !prev);
  };

  return (
    <>
      <h1>Employees</h1>
      {employees.length === 0 ? (
        <div className="empty">
          <h3>There are no employees...</h3>
          <Link
            style={{ margin: "auto" }}
            className="btn btn-add"
            to={"/addemployee"}
          >
            Click here to add one
          </Link>
        </div>
      ) : (
        <div className="table-wrapper">
          <Link className="btn btn-add" to={"/addemployee"}>
            Add New Employee
          </Link>
          <table className="styled-table">
            <thead>
              <tr>
                <th>No.</th>
                <th>Full name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Date of birth</th>
                <th>Salary</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentEmployees.map((employee, index) => {
                return (
                  <tr key={employee.id}>
                    <th scope="row">
                      {index + 1 + employeesPerPage * (currentPage - 1)}
                    </th>
                    <td>{employee.name}</td>
                    <td>{employee.email}</td>
                    <td>{employee.phone}</td>
                    <td>{employee.dob}</td>
                    <td>${employee.salary}</td>

                    <td>
                      <Link to={`editemployee/${employee.id}`}>
                        <Button
                          onClick={removeElement}
                          className="btn btn-edit"
                        >
                          Edit
                        </Button>
                      </Link>
                      <Button
                        onClick={() => deleteEmployee(employee.id)}
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
              {employeesPerPage < employees.length &&
                Array(Math.ceil(employees.length / employeesPerPage))
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

export default Employees;
