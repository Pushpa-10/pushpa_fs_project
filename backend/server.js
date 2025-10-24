const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// ✅ Import your task routes
const taskRoutes = require("./routes/tasks");

// ✅ Use the task routes
app.use("/api/tasks", taskRoutes);

// MongoDB connection
if (!process.env.MONGO_URI) {
  console.error("Error: MONGO_URI is not defined in your .env file");
  process.exit(1);
}

const connectDB = async () => {
  try {
    // ⚡ Removed deprecated useUnifiedTopology
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
    });
    console.log("MongoDB connected successfully");
  } catch (err) {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  }
};

connectDB();

// Test route
app.get("/", (req, res) => {
  res.send("Backend is running");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
