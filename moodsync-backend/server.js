// server.js
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// TEST endpoint
app.get("/", (req, res) => {
  res.send("MoodSync Backend is running 🚀");
});

// Mount routes
const authRoutes = require("./routes/auth.routes");
app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
