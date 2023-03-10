import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./AddEmployee.css";
import { db } from "../config/firebase";
import { getDocs } from "firebase/firestore";

const initialState = {
  name: "",
  email: "",
  phone: "",
  dob: "",
  salary: "",
};

const AddEmployee = () => {
  const [state, setState] = useState(initialState);
  const [data, setData] = useState({});

  const { name, email, phone, dob, salary } = state;

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      alert("Please enter a name!");
    } else {
      fireDb.child("employee").push(state, (err) => {
        if (err) {
          console.log(err);
        }
      });
      setTimeout(() => navigate("/"), 500);
    }
  };

  return (
    <>
      <h2>Add an employee</h2>
      <div className="form-wrapper">
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter full name.."
            value={name}
            autoComplete="off"
            onChange={handleInputChange}
          />
          <label htmlFor="name">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter email.."
            value={email}
            autoComplete="off"
            onChange={handleInputChange}
          />
          <label htmlFor="phone">Phone</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            placeholder="123-456-789"
            pattern="[0-9]{3}-[0-9]{3}-[0-9]{3}"
            required
            value={phone}
            autoComplete="off"
            onChange={handleInputChange}
          />
          <label htmlFor="dob">Date of Birth</label>
          <input
            type="date"
            id="dob"
            name="dob"
            value={dob}
            onChange={handleInputChange}
          />
          <label htmlFor="salary">Salary (Monthly)</label>
          <input
            type="number"
            id="salary"
            name="salary"
            placeholder="ex: 10 000"
            value={salary}
            autoComplete="off"
            onChange={handleInputChange}
          />
          <button className="btn" type="submit">
            Save
          </button>
        </form>
      </div>
    </>
  );
};

export default AddEmployee;
