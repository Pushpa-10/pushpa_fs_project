export default function Task({ task, toggleComplete, deleteTask }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "rgba(255, 255, 255, 0.85)",
        color: "#1f2937",
        padding: "12px 15px",
        borderRadius: "10px",
        marginBottom: "12px",
        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
        transition: "transform 0.2s ease",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
    >
      {/* Left section: checkbox + text */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => toggleComplete(task._id, !task.completed)} // ✅ flip value
          style={{
            width: "18px",
            height: "18px",
            cursor: "pointer",
            accentColor: "#22c55e",
          }}
        />
        <span
          style={{
            textDecoration: task.completed ? "line-through" : "none",
            color: task.completed ? "#6b7280" : "#111827",
            fontSize: "16px",
            fontWeight: task.completed ? "normal" : "500",
          }}
        >
          {task.title}
        </span>
      </div>

      {/* Right section: delete button */}
      <button
        onClick={() => deleteTask(task._id)}
        style={{
          background: "none",
          border: "none",
          color: "#ef4444",
          fontSize: "18px",
          cursor: "pointer",
          transition: "transform 0.2s ease",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.3)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
      >
        🗑️
      </button>
    </div>
  );
}
