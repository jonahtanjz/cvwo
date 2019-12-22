import React from "react";
import { Router } from "@reach/router";
import TodoList from "./TodoList";
import AddTask from "./AddTask";
import DeleteTask from "./DeleteTask";



function App() {
  return (
    <Router>
      <TodoList path="/" />
      <AddTask path="/add" />
      <DeleteTask path="/delete/:id" />

    </Router>
  );
}

export default App;