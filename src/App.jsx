import React from "react";
import { Routes, Route } from "react-router-dom";
import { Employees, AddEmployee, EditEmployee, Tasks, AddTask, EditTask } from "./pages";
import Header from "./components/Header";
import { EmployeesProvider } from "./contexts/EmployeesContext";
import { TasksProvider } from "./contexts/TasksContext";

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
        </Routes>
      </TasksProvider>
    </EmployeesProvider>
  );
};

export default App;
