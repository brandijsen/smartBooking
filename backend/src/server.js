import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { getPool } from "./config/db.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("✅ SmartBooking API running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  try {
    const pool = await getPool();
    await pool.query("SELECT 1");
    console.log("✅ Connected to MySQL successfully!");
  } catch (err) {
    console.error("❌ Database connection failed:", err.message);
  }
  console.log(`🚀 Server running on port ${PORT}`);
});




import authRoutes from "./routes/auth.routes.js";
app.use("/api/auth", authRoutes);

import adminRoutes from "./routes/admin.routes.js";
app.use("/api/admin", adminRoutes);


import userRoutes from "./routes/user.routes.js";
app.use("/api/users", userRoutes);