import { createContext, useState, useEffect } from "react";
import { db } from "../config/firebase";
import { collection, onSnapshot } from "firebase/firestore";

const EmployeesContext = createContext();

export const EmployeesProvider = ({ children }) => {
  const [employees, setEmployees] = useState([]);

  const employeesCollectionRef = collection(db, "employees");

  useEffect(() => {
    const unsubscribe = onSnapshot(employeesCollectionRef, (snapshot) => {
      const filteredData = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setEmployees(filteredData);
    });

    return () => unsubscribe();
  }, []);

  return (
    <EmployeesContext.Provider
      value={{ employeesCollectionRef, employees, setEmployees }}
    >
      {children}
    </EmployeesContext.Provider>
  );
};

export default EmployeesContext;
