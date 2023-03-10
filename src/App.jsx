import React from "react";
import { Routes, Route } from "react-router-dom";
import { Employees, AddEmployee, ViewEmployee } from "./pages";
import Header from "./components/Header";

const App = () => {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Employees />} />
        <Route path="/addemployee" element={<AddEmployee />} />
        <Route path="/viewemployee/:id" element={<ViewEmployee />} />
      </Routes>
    </div>
  );
};

export default App;
