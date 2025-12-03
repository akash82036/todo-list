import { useEffect, useState } from 'react'
import './App.css'
import { FaTrash } from "react-icons/fa";

function App() {
  const [task, setTask] = useState("");
  const [filter, setFilter] = useState("all");

  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem("todos");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTask = () => {
    if (!task.trim()) return;
    setTodos([...todos, { text: task, completed: false }]);
    setTask("");
  };

  const deleteTask = (index) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  const toggleComplete = (index) => {
    const updated = [...todos];
    updated[index].completed = !updated[index].completed;
    setTodos(updated);
  };

  const filteredTodos = todos.filter((t) => {
    if (filter === "completed") return t.completed;
    if (filter === "incomplete") return !t.completed;
    return true;
  });

  const clear = () => setTodos([]);

  return (
    <div>
      <h1 className="header">Stay focused.</h1>

      <div className="controls">

        <div className="row-1">
          <input
            className="task-input"
            value={task}
            placeholder="Add a task."
            onChange={(e) => setTask(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addTask()}
          />
          <button className="add-btn" onClick={addTask}>Let's Go!</button>
        </div>

        <div className="row-2">
          <button
            className={`seg-btn ${filter === "all" ? "active" : ""}`}
            onClick={() => setFilter("all")}
          >
            All
          </button>

          <button
            className={`seg-btn ${filter === "completed" ? "active" : ""}`}
            onClick={() => setFilter("completed")}
          >
            Completed
          </button>

          <button
            className={`seg-btn ${filter === "incomplete" ? "active" : ""}`}
            onClick={() => setFilter("incomplete")}
          >
            Incomplete
          </button>

          <button className="seg-btn clear-seg" onClick={clear}>Clear</button>
        </div>

      </div>

      <ul className="todo-list">
        {filteredTodos.map((item, index) => (
          <li
            key={index}
            className={`todo-item ${item.completed ? "completed" : ""}`}
            onClick={() => toggleComplete(index)}
          >
            <span className="todo-text">{item.text}</span>

            <button
              className="icon-btn"
              onClick={(e) => {
                e.stopPropagation();
                deleteTask(index);
              }}
            >
              <FaTrash />
            </button>

          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
