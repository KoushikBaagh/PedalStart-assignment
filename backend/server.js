const express = require("express");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 5000;
const connectDB = require("./config/db");
const dotenv = require("dotenv");
const taskRoutes = require("./routes");

dotenv.config();
// MongoDB connection
connectDB();

app.use(cors()); // Enable CORS for all origins
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello from the Task Management API!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.use("/api", taskRoutes);
