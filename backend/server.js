const express = require("express");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 5000;
const connectDB = require("./config/db");
const dotenv = require("dotenv");
const taskRoutes = require("./routes");
const path = require("path");

dotenv.config();
// MongoDB connection
connectDB();

app.use(cors()); // Enable CORS for all origins
app.use(express.json());

// app.get("/", (req, res) => {
//   res.send("Hello from the Task Management API!");
// });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.use("/api", taskRoutes);

// --------------------------deployment------------------------------//

const __dirname1 = __dirname;

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname1, "../frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname1, "../frontend/build/index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("HEY! API is running..");
  });
}
// --------------------------deployment------------------------------//
