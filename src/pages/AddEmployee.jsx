import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import EmployeesContext from "../contexts/EmployeesContext";
import { addDoc } from "firebase/firestore";
import { Button, Input } from "../components/shared";
import { BsArrowLeftCircleFill } from "react-icons/bs";

const initialState = {
  name: "",
  email: "",
  phone: "",
  dob: "",
  salary: "",
};

const AddEmployee = () => {
  const [state, setState] = useState(initialState);
  const { employeesCollectionRef } = useContext(EmployeesContext);
  const [showNotification, setShowNotification] = useState(false);

  const { name, email, phone, dob, salary } = state;

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(employeesCollectionRef, state);
      setShowNotification(true);
    } catch (error) {
      console.error(error);
    }

    setTimeout(() => navigate("/"), 2000);
  };

  const [visible, setVisible] = useState(true);
  const removeElement = () => {
    setVisible((prev) => !prev);
  };

  return (
    <>
      <div className="title-wrapper">
        <Link to="/" className="back-btn">
          <BsArrowLeftCircleFill />
        </Link>
        <h2>Add an employee</h2>
      </div>
      <div className="form-wrapper">
        <form onSubmit={handleSubmit}>
          <Input
            label="Name"
            type="text"
            value={name}
            name="name"
            id="name"
            onChange={handleInputChange}
            placeholder="Enter full name.."
            required
          />
          <Input
            label="Email"
            type="email"
            value={email}
            name="email"
            id="email"
            onChange={handleInputChange}
            placeholder="Enter email.."
            required
          />
          <Input
            label="Phone Number"
            type="number"
            value={phone}
            name="phone"
            id="phone"
            onChange={handleInputChange}
            placeholder="Enter phone num.."
            required
          />
          <Input
            label="Date of Birth"
            type="date"
            value={dob}
            name="dob"
            id="dob"
            onChange={handleInputChange}
            required
          />
          <Input
            label="Salary (monthly)"
            type="number"
            value={salary}
            name="salary"
            id="salary"
            onChange={handleInputChange}
            placeholder="Enter salary.."
            required
          />
          <Button
            onClick={removeElement}
            style={{ width: "100%" }}
            className="btn-save"
            type="submit"
          >
            Save
          </Button>
        </form>
      </div>
      {showNotification && (
        <div className="notification">
          <p>New employee added!</p>
          <Button onClick={() => setShowNotification(false)}>x</Button>
        </div>
      )}
    </>
  );
};

export default AddEmployee;
