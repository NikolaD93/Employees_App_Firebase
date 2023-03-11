import React, { useState, useEffect, useContext } from "react";
import EmployeesContext from "../contexts/EmployeesContext";
import { Link } from "react-router-dom";
import { db } from "../config/firebase";
import { deleteDoc, doc } from "firebase/firestore";

const Employees = () => {
  const { employees, setEmployees } = useContext(EmployeesContext);

  const deleteEmployee = async (id) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      const employeeDoc = doc(db, "employees", id);
      await deleteDoc(employeeDoc);
    }
    // window.location.reload(true);
  };

 

  return (
    <>
      <h1>Employees</h1>
      <div className="table-wrapper">
        <Link className="btn btn-add" to={"/addemployee"}>Add New Employee</Link>
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
            {employees.map((employee, index) => {
              return (
                <tr key={employee.id}>
                  <th scope="row">{index + 1}</th>
                  <td>{employee.name}</td>
                  <td>{employee.email}</td>
                  <td>{employee.phone}</td>
                  <td>{employee.dob}</td>
                  <td>${employee.salary}</td>
                  <td>
                    <Link to={`editemployee/${employee.id}`}>
                      <button className="btn btn-edit">Edit</button>
                    </Link>
                    <button
                      onClick={() => deleteEmployee(employee.id)}
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

export default Employees;
