"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Task from "../components/Task";

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/tasks");
      setTasks(res.data);
    } catch (err) {
      console.error("Error fetching tasks:", err.message);
    }
  };

  const addTask = async () => {
    if (!newTask.trim()) return;
    try {
      await axios.post("http://localhost:5000/api/tasks", { title: newTask });
      setNewTask("");
      fetchTasks();
    } catch (err) {
      console.error("Error adding task:", err.message);
    }
  };

  const toggleComplete = async (id, completed) => {
    try {
      await axios.put(`http://localhost:5000/api/tasks/${id}`, { completed });
      fetchTasks();
    } catch (err) {
      console.error("Error updating task:", err.message);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${id}`);
      fetchTasks();
    } catch (err) {
      console.error("Error deleting task:", err.message);
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4 py-10 relative"
      style={{
        backgroundImage: "url('/images/7UnWhF.jpg')", // ✅ Use local image from public folder
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed", // keeps background static while scrolling
      }}
    >
      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-black/40 z-0 pointer-events-none"></div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center text-center text-white">
        <h1 className="text-5xl font-extrabold mb-8 drop-shadow-lg">
          Dream. Believe. Achieve. 🚀
        </h1>

        {/* Frosted glass container */}
        <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-2xl max-w-md w-full">
          <h1 className="text-3xl font-bold mb-6 text-yellow-300">
            Task Manager
          </h1>

          {/* Input & Add button */}
          <div className="flex mb-6">
            <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              className="flex-grow p-3 rounded-l-xl focus:outline-none text-black"
              placeholder="Add a new task..."
            />
            <button
              onClick={addTask}
              className="bg-yellow-400 text-black font-semibold px-6 rounded-r-xl hover:bg-yellow-500 transition duration-200"
            >
              Add
            </button>
          </div>

          {/* Task list */}
          <div className="text-left">
            {tasks.length === 0 ? (
              <p className="text-gray-200 text-center">
                Your motivational background shines even without tasks! ✨
              </p>
            ) : (
              tasks.map((task) => (
                <Task
                  key={task._id}
                  task={task}
                  toggleComplete={toggleComplete}
                  deleteTask={deleteTask}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
