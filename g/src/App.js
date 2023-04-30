import logo from './logo.svg';
import './App.css';
import React, { useState } from "react";
import TaskList from './component/TaskList';

function App() {
  // const Tasks1 = localStorage.getItem('tasks') ? localStorage.getItem('tasks'):[]
  return (
    <div className="App">
      <TaskList />,
    </div>
  );
}

export default App;
// Define some sample tasks for testing

  // Render the TaskList component with the sample tasks
  // ReactDOM.render(
  //   <TaskList tasks={SAMPLE_TASKS} />,
  //   document.getElementById("root")
  // );