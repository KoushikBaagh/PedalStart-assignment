import React, { useState, useEffect } from "react";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import { fetchTasks, addTask, updateTask, deleteTask } from "./api/taskApi";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getTasks = async () => {
      try {
        const fetchedTasks = await fetchTasks();
        setTasks(fetchedTasks);
        setIsLoading(false);
      } catch (err) {
        setError("Failed to fetch tasks. Please try again later.");
        setIsLoading(false);
      }
    };

    getTasks();
  }, []);

  const handleAddTask = async (newTask) => {
    try {
      const addedTask = await addTask(newTask);
      setTasks((prevTasks) => [...prevTasks, addedTask]);
    } catch (err) {
      setError("Failed to add task. Please try again.");
    }
  };

  const handleUpdateTask = async (id, updates) => {
    try {
      const updatedTask = await updateTask(id, updates);
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task._id === id ? updatedTask : task))
      );
    } catch (err) {
      // Assuming err.response.data contains the server's error message
      const errorMessage =
        err.response?.data?.message ??
        "Failed to update task. Please try again.";
      setError(errorMessage);
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await deleteTask(id);
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== id));
    } catch (err) {
      setError("Failed to delete task. Please try again.");
    }
  };

  if (isLoading) return <div>Loading tasks...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="App">
      <header className="App-header">
        <h1>Task Management App By KOUSHIK</h1>
      </header>
      <main>
        <TaskForm onAddTask={handleAddTask} />
        <TaskList
          tasks={tasks}
          onUpdateTask={handleUpdateTask}
          onDeleteTask={handleDeleteTask}
        />
      </main>
    </div>
  );
}

export default App;
