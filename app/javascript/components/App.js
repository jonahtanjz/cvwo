import React from "react";
import { Router } from "@reach/router";
import TodoList from "./TodoList";
import AddTask from "./AddTask";


function App() {
  return (
    <Router>
      <TodoList path="/" />
      <AddTask path="/add" />
    </Router>
  );
}

export default App;