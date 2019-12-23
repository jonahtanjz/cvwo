import React from "react";
import { Router } from "@reach/router";
import TodoList from "./TodoList";
import AddTask from "./AddTask";
import DeleteTask from "./DeleteTask";
import DoneTask from "./DoneTask";
import UndoTask from "./UndoTask";
import EditTask from "./EditTask";



function App() {
  return (
    <Router>
      <TodoList path="/" />
      <AddTask path="/add" />
      <DeleteTask path="/delete/:id" />
      <DoneTask path="/done/:id" />
      <UndoTask path="/undo/:id" />
      <EditTask path="/edit/:id" />
    </Router>
  );
}

export default App;