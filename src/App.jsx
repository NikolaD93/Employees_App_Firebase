import React from "react";
import { Routes, Route } from "react-router-dom";
import { Employees, AddEmployee, EditEmployee, Tasks } from "./pages";
import Header from "./components/Header";
import { EmployeesProvider } from "./contexts/EmployeesContext";

const App = () => {
  return (
    <EmployeesProvider>
      <Header />
      <Routes>
        <Route path="/" element={<Employees />} />
        <Route path="/addemployee" element={<AddEmployee />} />
        <Route path="/editemployee/:id" element={<EditEmployee />} />
        <Route path="tasks" element={<Tasks/>}/>
      </Routes>
    </EmployeesProvider>
  );
};

export default App;
