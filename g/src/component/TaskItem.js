import React,{useState} from "react";

const TaskItem = (props) => {
    // Use state to keep track of the task's completion status
  const [isCompleted, setIsCompleted] = useState(props.completed);

  // Define a function to toggle the completion status
  function toggleCompleted() {
    setIsCompleted(!isCompleted);
    props.onComplete(props.id,!isCompleted);
  }

  // Define a function to handle editing the task
  function handleEdit() {
    // Prompt the user for a new task description
    const newDescription = prompt("Edit the task:", props.description);
    // If the user entered something, update the task
    if (newDescription) {
      props.onEdit(props.id, newDescription);
    }
  }

  // Define a function to handle deleting the task
  function handleDelete() {
    // Confirm with the user before deleting
    if (window.confirm("Are you sure you want to delete this task?")) {
      props.onDelete(props.id);
    }
  }

  // Return the JSX code for rendering the task
  return (
    <li className={`task ${isCompleted ? "completed" : ""}`}>
      <div className="checkbox">
        <input
          type="checkbox"
          checked={isCompleted}
          onChange={toggleCompleted}
        />
        <label>{props.description}</label>
        <p>due date :{props.dueDate}</p>
      </div>
      <div className="buttons">
        <button className="edit" onClick={handleEdit}>
          Edit
        </button>
        <button className="delete" onClick={handleDelete}>
          Delete
        </button>
      </div>
    </li>
  );
}

export default TaskItem