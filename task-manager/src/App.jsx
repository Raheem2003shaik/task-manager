/* eslint-disable no-unused-vars */
import React from 'react';
import { PlusCircle, Calendar, CheckCircle2, Circle, Clock, AlertCircle } from 'lucide-react';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import { TaskProvider } from './context/TaskContext';

function App() {
  return (
    <TaskProvider>
      <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100">
        <div className="container mx-auto px-4 py-8">
          <header className="mb-8">
            <h1 className="text-4xl font-bold text-indigo-900 mb-2 flex items-center gap-2">
              <CheckCircle2 className="w-8 h-8" />
              Task Manager
            </h1>
            <p className="text-indigo-700">Organize your tasks efficiently</p>
          </header>
          
          <div className="grid lg:grid-cols-12 gap-8">
            <div className="lg:col-span-4">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <TaskForm />
              </div>
              
              <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">Quick Stats</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Circle className="text-yellow-500" />
                      <span>Pending</span>
                    </div>
                    <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm">
                      3
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Clock className="text-blue-500" />
                      <span>In Progress</span>
                    </div>
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                      2
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="text-green-500" />
                      <span>Completed</span>
                    </div>
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                      5
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-8">
              <TaskList />
            </div>
          </div>
        </div>
      </div>
    </TaskProvider>
  );
}

export default App;
