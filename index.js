const express = require("express");
require("dotenv").config();
const sequelize = require("./config/db");
const messRoutes = require("./routes/messRoutes");

const app = express();
app.use(express.json());
app.use("/messes", messRoutes);

const PORT = process.env.PORT || 4000;

sequelize
  .authenticate()
  .then(() => {
    console.log("✅ PostgreSQL connected via Sequelize");
    return sequelize.sync(); // 👈 IMPORTANT
  })
  .then(() => {
    console.log("✅ Models synced");
    app.listen(PORT, () => {
      console.log(`Server is running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Database connection failed:", err.message);
  });
