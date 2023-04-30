import React,{useState} from "react";

const TaskItem = (props) => {
  const [isCompleted, setIsCompleted] = useState(props.completed);

  function toggleCompleted() {
    setIsCompleted(!isCompleted);
    props.onComplete(props.id,!isCompleted);
  }

  function handleEdit() {
    const newDescription = prompt("Edit the task:", props.description);
    if (newDescription) {
      props.onEdit(props.id, newDescription);
    }
  }

  function handleDelete() {
    if (window.confirm("Are you sure you want to delete this task?")) {
      props.onDelete(props.id);
    }
  }

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