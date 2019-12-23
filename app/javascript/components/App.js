import React from "react";
import { Router } from "@reach/router";
import TodoList from "./TodoList";
import AddTask from "./AddTask";
import DeleteTask from "./DeleteTask";
import DoneTask from "./DoneTask";
import EditTask from "./EditTask";



function App() {
  return (
    <Router>
      <TodoList path="/" />
      <AddTask path="/add" />
      <DeleteTask path="/delete/:id" />
      <DoneTask path="/done/:id" />
      <EditTask path="/edit/:id" />

    </Router>
  );
}

export default App;