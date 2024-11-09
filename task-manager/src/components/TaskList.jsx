/* eslint-disable no-unused-vars */
import React from 'react';
import { useTaskContext } from '../context/TaskContext';
import { CheckCircle2, Clock, Circle, Trash2, Edit2, AlertCircle } from 'lucide-react';

const TaskList = () => {
  const { tasks, deleteTask, updateTask, loading, error } = useTaskContext();

  // Function to get the appropriate status icon
  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="w-5 h-5 text-green-500" />;
      case 'in-progress':
        return <Clock className="w-5 h-5 text-blue-500" />;
      default:
        return <Circle className="w-5 h-5 text-yellow-500" />;
    }
  };

  // Function to get the appropriate priority color class
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-green-100 text-green-800';
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-20 bg-gray-100 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center gap-2 text-red-600">
          <AlertCircle className="w-5 h-5" />
          <p>{error}</p>
        </div>
      </div>
    );
  }

  // Main content
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Tasks</h2>
      {tasks.length === 0 ? (
        <p className="text-gray-500 text-center py-4">No tasks found. Create one to get started!</p>
      ) : (
        <div className="space-y-4">
          {tasks.map((task) => (
            <div
              key={task._id}
              className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <button
                    onClick={() =>
                      updateTask(task._id, {
                        ...task,
                        status: task.status === 'completed' ? 'pending' : 'completed',
                      })
                    }
                    className="mt-1"
                  >
                    {getStatusIcon(task.status)}
                  </button>
                  <div>
                    <h3 className="font-semibold text-gray-800">{task.title}</h3>
                    <p className="text-gray-600 text-sm mt-1">{task.description}</p>
                    <div className="flex gap-2 mt-2">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${getPriorityColor(
                          task.priority
                        )}`}
                      >
                        {task.priority}
                      </span>
                      {task.dueDate && (
                        <span className="text-xs text-gray-500 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {new Date(task.dueDate).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => deleteTask(task._id)}
                    className="text-red-500 hover:text-red-700 transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                  <button className="text-blue-500 hover:text-blue-700 transition-colors">
                    <Edit2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskList;
