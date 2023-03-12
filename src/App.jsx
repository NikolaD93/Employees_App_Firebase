import React from "react";
import { Routes, Route } from "react-router-dom";
import {
  Employees,
  AddEmployee,
  EditEmployee,
  Tasks,
  AddTask,
  EditTask,
  TopEmployees,
} from "./pages";
import { Header, Footer } from "./components";
import { EmployeesProvider, TasksProvider } from "./contexts";

const App = () => {
  return (
    <EmployeesProvider>
      <TasksProvider>
        <Header />
        <Routes>
          <Route path="/" element={<Employees />} />
          <Route path="/addemployee" element={<AddEmployee />} />
          <Route path="/editemployee/:id" element={<EditEmployee />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/addtask" element={<AddTask />} />
          <Route path="/:id" element={<EditTask />} />
          <Route path="/topemployees" element={<TopEmployees />} />
        </Routes>
        <Footer />
      </TasksProvider>
    </EmployeesProvider>
  );
};

export default App;
