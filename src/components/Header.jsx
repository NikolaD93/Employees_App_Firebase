import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Header.css";

const Header = () => {
  const [activeTab, setActiveTab] = useState("Employees");
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/") {
      setActiveTab("Employees");
    } else if (location.pathname === "/addemployee") {
      setActiveTab("AddEmployee");
    }
  }, [location]);

  return (
    <div className="header">
      <p className="logo">CRUD App</p>
      <div className="header-right">
        <ul>
          <Link style={{ textDecoration: "none" }} to="/">
            <li
              className={`${activeTab === "Employees" ? "active" : ""}`}
              onClick={() => setActiveTab("Employees")}
            >
              Employees
            </li>
          </Link>
          <Link style={{ textDecoration: "none" }} to="/addemployee">
            <li
              className={`${activeTab === "AddEmployee" ? "active" : ""}`}
              onClick={() => setActiveTab("AddEmployee")}
            >
              Add employee
            </li>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default Header;
