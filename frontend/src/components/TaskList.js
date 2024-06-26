import React from "react";
import Task from "./Task";

function TaskList({ tasks, onUpdateTask, onDeleteTask }) {
  return (
    <div className="task-list">
      <h2>Tasks</h2>
      {tasks.length === 0 ? (
        <p>No tasks found. Add a new task to get started!</p>
      ) : (
        tasks.map((task) => (
          <Task
            key={task._id}
            task={task}
            onUpdateTask={onUpdateTask}
            onDeleteTask={onDeleteTask}
          />
        ))
      )}
    </div>
  );
}

export default TaskList;
