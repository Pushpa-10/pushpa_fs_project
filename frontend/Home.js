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
    const res = await axios.get("/api/tasks"); // adjust your endpoint
    setTasks(res.data);
  };

  const toggleComplete = (id, newCompleted) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task._id === id ? { ...task, completed: newCompleted } : task
      )
    );
    // Optionally, also update backend:
    axios.put(`/api/tasks/${id}`, { completed: newCompleted }).catch(console.error);
  };

  const deleteTask = async (id) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task._id !== id));
    await axios.delete(`/api/tasks/${id}`).catch(console.error);
  };

  const addTask = async () => {
    if (!newTask.trim()) return;
    const res = await axios.post("/api/tasks", { title: newTask, completed: false });
    setTasks([res.data, ...tasks]);
    setNewTask("");
  };

  return (
    <div style={{ maxWidth: "500px", margin: "50px auto" }}>
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add new task"
          style={{ flex: 1, padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
        />
        <button onClick={addTask} style={{ padding: "10px 15px", borderRadius: "5px", cursor: "pointer" }}>
          Add
        </button>
      </div>

      {tasks.map((task) => (
        <Task
          key={task._id}
          task={task}
          toggleComplete={toggleComplete}
          deleteTask={deleteTask}
        />
      ))}
    </div>
  );
}