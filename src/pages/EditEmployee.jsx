import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import EmployeesContext from "../contexts/EmployeesContext";
import { updateDoc, doc } from "firebase/firestore";
import { Button } from "../common";

const initialState = {
  name: "",
  email: "",
  phone: "",
  dob: "",
  salary: "",
};

const EditEmployee = () => {
  const [state, setState] = useState(initialState);
  const { employeesCollectionRef, employees, setEmployees } =
    useContext(EmployeesContext);

  const { name, email, phone, dob, salary } = state;

  const navigate = useNavigate();
  const params = useParams();

  let employee = employees.filter((item) => {
    if (item.id == params.id) {
      return item;
    }
  })[0];

  useEffect(() => {
    setState(employee);
  }, [employee]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateDoc(doc(employeesCollectionRef, params.id), state);
      setEmployees((prevState) => {
        const updatedEmployees = [...prevState];
        const index = updatedEmployees.findIndex(
          (employee) => employee.id === params.id
        );
        updatedEmployees[index] = state;
        return updatedEmployees;
      });
    } catch (error) {
      console.error(error);
    }

    setTimeout(() => navigate("/"), 500);
  };

  return (
    <>
      <h2>Edit employee</h2>
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
          <div style={{display:"flex"}}>
            <Button
              style={{ background: "dodgerblue" }}
              className="btn btn-save"
              type="submit"
            >
              Save
            </Button>

            <Button
              onClick={() => navigate("/")}
              style={{ background: "firebrick" }}
              className="btn btn-save"
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditEmployee;
