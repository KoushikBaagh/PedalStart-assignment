import React, { useState } from "react";

function Task({ task, onUpdateTask, onDeleteTask }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(task);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedTask((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedTask = {
      title: editedTask.title,
      description: editedTask.description,
      dueDate: editedTask.dueDate,
      status: editedTask.status,
    };
    onUpdateTask(task._id, updatedTask);
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      onDeleteTask(task._id);
    }
  };

  if (isEditing) {
    return (
      <form onSubmit={handleSubmit} className="task editing">
        <input
          type="text"
          name="title"
          value={editedTask.title}
          onChange={handleInputChange}
          required
        />
        <textarea
          name="description"
          value={editedTask.description}
          onChange={handleInputChange}
          required
        />
        <input
          type="date"
          name="dueDate"
          value={editedTask.dueDate.split("T")[0]}
          onChange={handleInputChange}
          required
        />
        <button type="submit">Save</button>
        <button type="button" onClick={() => setIsEditing(false)}>
          Cancel
        </button>
      </form>
    );
  }

  return (
    <div className="task">
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <p>Due: {new Date(task.dueDate).toLocaleDateString()}</p>
      <p>Status: {task.completed ? "Completed" : "Pending"}</p>
      <button onClick={() => setIsEditing(true)}>Edit</button>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
}

export default Task;
