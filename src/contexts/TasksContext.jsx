import { createContext, useState, useEffect } from "react";
import { db } from "../db/Firebase";
import { collection, onSnapshot } from "firebase/firestore";

const TasksContext = createContext();

export const TasksProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);

  const tasksCollectionRef = collection(db, "tasks");

  useEffect(() => {
    const unsubscribe = onSnapshot(tasksCollectionRef, (snapshot) => {
      const filteredData = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setTasks(filteredData);
    });
    return unsubscribe;
  }, []);

  return (
    <TasksContext.Provider
      value={{ tasksCollectionRef, tasks, setTasks }}
    >
      {children}
    </TasksContext.Provider>
  );
};

export default TasksContext;
