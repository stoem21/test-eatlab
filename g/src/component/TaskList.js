import React from "react";
import TaskItem from "./TaskItem";
import { useState,useEffect } from "react";

function TaskList() {
const [tasks, setTasks] = useState(JSON.parse(localStorage.getItem("tasks") || '[]'));
const [err, setErr] = useState('');
const [sort,setSort] = useState('');
const [show,setShow] = useState('');

useEffect(() => {
  // console.log(tasks)
  localStorage.setItem("tasks",JSON.stringify(tasks));
}, [tasks]);


// Define a function to add a new task
function addTask(event) {
  // Prevent the default form submission behavior
  console.log(event)
  event.preventDefault();
  // Get the input element from the form
  const input = event.target.elements.newTask;
  const dateInput = event.target.elements.dueDate;
  // Get the value of the input element
  const description = input.value.trim();
  const dueDate = dateInput.value.trim();
  // If the input is not empty, create a new task object
  if (description && dueDate) {
    const newTask = {
      id: Date.now(), // Use current timestamp as id
      description: description,
      dueDate: dueDate,
      completed: false,
    };
    console.log(newTask)
    // Update the state with the new task
    setTasks([...tasks, newTask]);
    // localStorage.setItem('tasks',[...tasks, newTask])
    // console.log([...tasks, newTask])
    // Clear the input field
    input.value = "";
    setErr('')
  } else {
    setErr('Please fill Description and Due date')
  }
}

// Define a function to edit an existing task
  function editTask(id, newDescription) {
    // Create a copy of the tasks array
    const updatedTasks = [...tasks];
    // Find the index of the task with the given id
    const index = updatedTasks.findIndex((task) => task.id === id);
    // Update the description of the task at that index
    updatedTasks[index].description = newDescription;
    // Update the state with the modified tasks array
    setTasks(updatedTasks);
  }

  function completedTask(id, isCompleted) {
    // Create a copy of the tasks array
    const updatedTasks = [...tasks];
    // Find the index of the task with the given id
    const index = updatedTasks.findIndex((task) => task.id === id);
    // Update the description of the task at that index
    updatedTasks[index].completed = isCompleted;
    // Update the state with the modified tasks array
    setTasks(updatedTasks);
  }

  // Define a function to delete an existing task
  function deleteTask(id) {
    // Filter out the task with the given id from the tasks array
    const remainingTasks = tasks.filter((task) => task.id !== id);
    // Update the state with the remaining tasks
    setTasks(remainingTasks);
  }

// Define a function to delete all completed tasks
  function deleteCompleted() {
    // Confirm with the user before deleting
    if (window.confirm("Are you sure you want to delete all completed tasks?")) {
      // Filter out the tasks that are completed from the tasks array
      const remainingTasks = tasks.filter((task) => !task.completed);
      // Update the state with the remaining tasks
      setTasks(remainingTasks);
    }
  }

  function filterTasks(status) {
    const filteredTasks = [...tasks];
    switch (show) {
      case "all":
        // Do nothing, return all tasks
        break;
      case "active":
        // Return only the tasks that are not completed
        return filteredTasks.filter((task) => !task.completed);
      case "completed":
        // Return only the tasks that are completed
        return filteredTasks.filter((task) => task.completed);
      default:
        break;
    }

    switch (sort) {
      case "dueDate":
        filteredTasks.sort((a, b) => a.dueDate - b.dueDate); // Compare by due
        break;
        case "completed":
          filteredTasks.sort((a, b) => b.completed -a.completed); // Compare by completion status
          break;
        case "description":
          filteredTasks.sort((a, b) => a.description.localeCompare(b.description)); // Compare by description alphabetically
          break;
        default:
          break;
      }
    return filteredTasks;
  }

  // Get the number of active tasks
  // const activeTasks = tasks.filter((task) => !task.completed).length;

  // Return the JSX code for rendering the task list
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
        {/* <p>{activeTasks} tasks remaining</p> */}
        <button onClick={deleteCompleted}>Delete all completed</button>
      </div>
    </div>
  );
}

export default TaskList