const express = require("express");
const router = express.Router();
const Task = require("./models/Task");

// GET all tasks
router.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST a new task
router.post("/tasks", async (req, res) => {
  const task = new Task({
    title: req.body.title,
    description: req.body.description,
    dueDate: req.body.dueDate,
  });

  try {
    const newTask = await task.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// GET a single task by ID
router.get("/tasks/:id", async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.json(task);
  } catch (error) {
    if (error.kind === "ObjectId") {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(500).json({ message: error.message });
  }
});

// UPDATE a task
router.patch("/tasks/:id", async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    const updates = Object.keys(req.body);
    const allowedUpdates = ["title", "description", "dueDate", "status"];
    const isValidOperation = updates.every((update) =>
      allowedUpdates.includes(update)
    );

    if (!isValidOperation) {
      return res.status(400).json({ message: "Invalid updates" });
    }

    updates.forEach((update) => (task[update] = req.body[update]));
    await task.save();

    res.json(task);
  } catch (error) {
    if (error.kind === "ObjectId") {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(400).json({ message: error.message });
  }
});

// DELETE a task
router.delete("/tasks/:id", async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    if (error.kind === "ObjectId") {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
