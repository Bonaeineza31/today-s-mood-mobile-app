import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authroutes.js";
import moodRoutes from "./routes/moodroutes.js";
import blogRoutes from "./routes/blogroute.js";
import userRoutes from "./routes/userroutes.js";
import adminRoutes from "./routes/adminroutes.js"; // invite superadmin

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("MoodSync Backend Running with ES6 ✅");
});

// Mount routes
app.use("/api/auth", authRoutes);
app.use("/api/moods", moodRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/users", userRoutes);   // superadmin user management
app.use("/api/admin", adminRoutes);  // invite admin/superadmin

app.listen(PORT, () => {
  console.log(`✅ Server running on http://192.168.1.226:${PORT}`);
});
