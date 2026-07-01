const express = require("express");
require("dotenv").config();

const sequelize = require("./config/db");
const Mess = require("./models/Mess"); // Model import (sync ke liye)
const messRoutes = require("./routes/messRoutes");

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use("/messes", messRoutes);

// Home Route (Optional)
app.get("/", (req, res) => {
  res.send("🚀 MessMate Backend is Running");
});

const PORT = process.env.PORT || 4000;

// Database Connection + Model Sync + Server Start
sequelize
  .authenticate()
  .then(() => {
    console.log("✅ PostgreSQL connected successfully");
    return sequelize.sync({ alter: true });
  })
  .then(() => {
    console.log("✅ Models synced successfully");

    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Database Error:", err.message);
  });
