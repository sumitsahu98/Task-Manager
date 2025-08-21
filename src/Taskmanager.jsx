import { useState } from "react";
import "./Taskmanager.css";

function TodoList() {
  const loadTasks = () => {
    const savedTasks = localStorage.getItem("list");
    return savedTasks ? JSON.parse(savedTasks) : [];
  };

  const saveTasks = (tasks) => {
    localStorage.setItem("list", JSON.stringify(tasks));
  };

  const [list, setList] = useState(loadTasks());
  const [input, setInput] = useState("");
  const [editInput, setEditInput] = useState("");
  const [editId, setEditId] = useState(null);
  const [filter, setFilter] = useState("all");

  const addToDo = () => {
    if (input.trim() === "") return;
    const newList = [...list, { id: Date.now(), text: input, completed: false }];
    setList(newList);
    saveTasks(newList);
    setInput("");
  };

  const removeTask = (id) => {
    const newList = list.filter((task) => task.id !== id);
    setList(newList);
    saveTasks(newList);
  };

  const editTask = (id, text) => {
    setEditId(id);
    setEditInput(text);
  };

  const saveEdit = (id) => {
    const newList = list.map((task) =>
      task.id === id ? { ...task, text: editInput } : task
    );
    setList(newList);
    saveTasks(newList);
    setEditId(null);
    setEditInput("");
  };

  const toggleComplete = (id) => {
    const newList = list.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setList(newList);
    saveTasks(newList);
  };

  const filteredTasks = list.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "pending") return !task.completed;
    return true;
  });

  return (
    // Your JSX remains the same
    <div className="todo-container">
      <h1 className="todo-title">✅ To-Do List</h1>

      <div className="todo-input-section">
        <input
          type="text"
          placeholder="Enter task..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="todo-input"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              addToDo(); // same function as your Add Task button
            }
          }}
        />
        <button onClick={addToDo} className="add-btn">
          Add Task
        </button>
      </div>

      {/* //Filter buttons  */}
      <div className="filter-buttons">
        <button
          className={filter === "all" ? "active" : ""}
          onClick={() => setFilter("all")}
        >
          All
        </button>
        <button
          className={filter === "completed" ? "active" : ""}
          onClick={() => setFilter("completed")}
        >
          Completed
        </button>
        <button
          className={filter === "pending" ? "active" : ""}
          onClick={() => setFilter("pending")}
        >
          Pending
        </button>
      </div>

      <h2 className="task-list-title">📌 Tasks</h2>
      <ul className="task-list">
        {filteredTasks.map((task) => (
          <li
            key={task.id}
            className={`task-item ${task.completed ? "completed" : ""}`}
          >
            {editId === task.id ? (
              <>
                <input
                  type="text"
                  value={editInput}
                  onChange={(e) => setEditInput(e.target.value)}
                  className="edit-input"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      saveEdit(editId); // same function as your Add Task button
                    }
                  }}
                />
                <button onClick={() => saveEdit(editId)} className="save-btn">
                  Save
                </button>
              </>
            ) : (
              <>
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleComplete(task.id)}
                  className="task-checkbox"
                />
                <span className="task-text">{task.text}</span>
                <button
                  onClick={() => editTask(task.id, task.text)}
                  className="edit-btn"
                >
                  Edit
                </button>
                <button
                  onClick={() => removeTask(task.id)}
                  className="remove-btn"
                >
                  ❌ Remove
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;