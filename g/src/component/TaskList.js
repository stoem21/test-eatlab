import React from "react";
import TaskItem from "./TaskItem";
import { useState,useEffect } from "react";

function TaskList() {
const [tasks, setTasks] = useState(JSON.parse(localStorage.getItem("tasks") || '[]'));
const [err, setErr] = useState('');
const [sort,setSort] = useState('');
const [show,setShow] = useState('');

useEffect(() => {
  localStorage.setItem("tasks",JSON.stringify(tasks));
}, [tasks]);


function addTask(event) {
  event.preventDefault();
  const input = event.target.elements.newTask;
  const dateInput = event.target.elements.dueDate;
  const description = input.value.trim();
  const dueDate = dateInput.value.trim();
  if (description && dueDate) {
    const newTask = {
      id: Date.now(),
      description: description,
      dueDate: dueDate,
      completed: false,
    };
    setTasks([...tasks, newTask]);
    input.value = "";
    setErr('')
  } else {
    setErr('Please fill Description and Due date')
  }
}

  function editTask(id, newDescription) {
    const updatedTasks = [...tasks];
    const index = updatedTasks.findIndex((task) => task.id === id);
    updatedTasks[index].description = newDescription;
    setTasks(updatedTasks);
  }

  function completedTask(id, isCompleted) {
    const updatedTasks = [...tasks];
    const index = updatedTasks.findIndex((task) => task.id === id);
    updatedTasks[index].completed = isCompleted;
    setTasks(updatedTasks);
  }

  function deleteTask(id) {
    const remainingTasks = tasks.filter((task) => task.id !== id);
    setTasks(remainingTasks);
  }

  function deleteCompleted() {
    if (window.confirm("Are you sure you want to delete all completed tasks?")) {
      const remainingTasks = tasks.filter((task) => !task.completed);
      setTasks(remainingTasks);
    }
  }

  function filterTasks(status) {
    const filteredTasks = [...tasks];
    switch (show) {
      case "all":
        break;
      case "active":
        return filteredTasks.filter((task) => !task.completed);
      case "completed":
        return filteredTasks.filter((task) => task.completed);
      default:
        break;
    }

    switch (sort) {
      case "dueDate":
        filteredTasks.sort((a, b) => a.dueDate - b.dueDate);
        break;
        case "completed":
          filteredTasks.sort((a, b) => b.completed -a.completed);
          break;
        case "description":
          filteredTasks.sort((a, b) => a.description.localeCompare(b.description));
          break;
        default:
          break;
      }
    return filteredTasks;
  }

  return (
    <div className="task-list">
      <h1>Task List</h1>
      <form onSubmit={addTask}>
        <input type="text" name="newTask" placeholder="Enter a new task" />
        <input type="date" name="dueDate" />
        <button type="submit">Add</button>
      </form>
      {
        err && <div style={{color:'red'}}>{err}</div>
      }
      <div className="sort-filter">
        <label htmlFor="sort">Sort by:</label>
        <select id="sort" onChange={(e) => setSort(e.target.value)}>
          <option value="dueDate">Due date</option>
          <option value="completed">Completed</option>
          <option value="description">Description</option>
        </select>
        <label htmlFor="filter">Show:</label>
        <select id="filter" onChange={(e) => setShow(e.target.value)}>
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
        </select>
      </div>
      <ul>
        {filterTasks().map((task) => (
          <TaskItem
            key={task.id}
            id={task.id}
            description={task.description}
            dueDate = {task.dueDate}
            completed={task.completed}
            onEdit={editTask}
            onDelete={deleteTask}
            onComplete={completedTask}
          />
        ))}
      </ul>
      <div className="summary">
        <button onClick={deleteCompleted}>Delete all completed</button>
      </div>
    </div>
  );
}

export default TaskList