/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

// Create the TaskContext
const TaskContext = createContext(undefined);

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get('http://localhost:5000/api/tasks');
      setTasks(response.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // create a task
  const createTask = async (task) => {
    try {
      setError(null);
      const response = await axios.post('http://localhost:5000/api/tasks', task);
      setTasks((prevTasks) => [response.data, ...prevTasks]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create task');
      throw err;
    }
  };

  // Update an existing task
  const updateTask = async (id, task) => {
    try {
      setError(null);
      const response = await axios.put(`http://localhost:5000/api/tasks/${id}`, task);
      setTasks((prevTasks) => prevTasks.map((t) => (t._id === id ? response.data : t)));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update task');
      throw err;
    }
  };

  // Delete a task
  const deleteTask = async (id) => {
    try {
      setError(null);
      await axios.delete(`http://localhost:5000/api/tasks/${id}`);
      setTasks((prevTasks) => prevTasks.filter((t) => t._id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete task');
      throw err;
    }
  };

  // Provide context values to children
  return (
    <TaskContext.Provider
      value={{
        tasks,
        error,
        loading,
        createTask,
        updateTask,
        deleteTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

// Custom hook to use the TaskContext
export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error('useTaskContext must be used within a TaskProvider');
  }
  return context;
};
