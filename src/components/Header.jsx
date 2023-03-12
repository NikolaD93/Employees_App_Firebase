import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Header.css";

const Header = () => {
  const [activeTab, setActiveTab] = useState("Employees");
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/") {
      setActiveTab("Employees");
    } else if (location.pathname === "/tasks") {
      setActiveTab("Tasks");
    } else if (location.pathname === "/topemployees") {
      setActiveTab("TopEmployees");
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
          <Link style={{ textDecoration: "none" }} to="/tasks">
            <li
              className={`${activeTab === "Tasks" ? "active" : ""}`}
              onClick={() => setActiveTab("Tasks")}
            >
              Tasks
            </li>
          </Link>
          <Link style={{ textDecoration: "none" }} to="/topemployees">
            <li
              className={`${activeTab === "TopEmployees" ? "active" : ""}`}
              onClick={() => setActiveTab("TopEmployees")}
            >
              Top Employees
            </li>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default Header;
