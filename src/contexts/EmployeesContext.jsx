import { createContext, useState, useEffect } from "react";
import { db } from "../config/firebase";
import { getDocs, collection } from "firebase/firestore";

const EmployeesContext = createContext();

export const EmployeesProvider = ({ children }) => {
  const [employees, setEmployees] = useState([]);

  const employeesCollectionRef = collection(db, "employees");

  const getEmployees = async () => {
    try {
      const data = await getDocs(employeesCollectionRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setEmployees(filteredData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getEmployees();
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
