import React, { useState } from 'react';
import './TodoList.css';

function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');
  const [priority, setPriority] = useState('High');

  const handleAddTask = (e) => {
    e.preventDefault();
    if (input.trim() !== '') {
      setTasks([
        ...tasks,
        { text: input.trim(), priority }
      ]);
      setInput('');
      setPriority('High');
    }
  };

  const handleDeleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const getPriorityClass = (priority) => {
    switch(priority) {
      case 'High': return 'priority-high';
      case 'Medium': return 'priority-medium';
      case 'Less': return 'priority-less';
      default: return '';
    }
  };

  return (
    <div className="todo-container">
      <h2>To-do List</h2>
      <form onSubmit={handleAddTask} className="todo-form">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add a new task..."
          className="todo-input"
        />
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="todo-priority-select"
        >
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Less">Less</option>
        </select>
        <button type="submit" className="todo-add-btn">Add</button>
      </form>
      <ul className="todo-list">
        {tasks.map((task, idx) => (
          <li key={idx} className={`todo-item ${getPriorityClass(task.priority)}`}>
            <span>
              {task.text} <span className={`priority-label ${getPriorityClass(task.priority)}`}>[{task.priority}]</span>
            </span>
            <button onClick={() => handleDeleteTask(idx)} className="todo-delete-btn">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
