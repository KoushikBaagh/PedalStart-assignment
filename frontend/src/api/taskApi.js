// const API_BASE_URL = "http://localhost:5000/api";
const API_BASE_URL = "https://task-management-atf9.onrender.com/api";

export const fetchTasks = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/tasks`);
    if (!response.ok) {
      throw new Error("Failed to fetch tasks");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw error;
  }
};

export const addTask = async (task) => {
  try {
    const response = await fetch(`${API_BASE_URL}/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    });
    if (!response.ok) {
      throw new Error("Failed to add task");
    }
    return await response.json();
  } catch (error) {
    console.error("Error adding task:", error);
    throw error;
  }
};

export const updateTask = async (id, updates) => {
  try {
    // console.log(
    //   "Updating task with id:",
    //   id,
    //   "Updates:",
    //   JSON.stringify(updates, null, 2)
    // ); // Pretty-print JSON for easier inspection
    const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updates),
    });
    if (!response.ok) {
      const errorText = await response.text();
      console.error("Failed to update task:", response.status, errorText);
      throw new Error("Failed to update task");
    }
    return await response.json();
  } catch (error) {
    console.error("Error updating task:", error);
    throw error;
  }
};

export const deleteTask = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Failed to delete task");
    }
    return await response.json();
  } catch (error) {
    console.error("Error deleting task:", error);
    throw error;
  }
};
