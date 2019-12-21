import React, { useEffect, useState, Button } from "react";
import { navigate } from "@reach/router";

function TodoList() {
  const [todo, setTodo] = useState([]);

  useEffect(() => {
    const requestTodo = async () => {
      const response = await fetch("/api/todo");
      const { data } = await response.json();
      setTodo(data);
    };
    requestTodo();
  }, []);

  const gotoAddTask = () => navigate('/add');
  let todoData = todo.map(task => <div>{task.attributes.body}</div>);

  return (
    <div>
        <button onClick={gotoAddTask}>Add new task</button>
        {todoData}
    </div>
  )
}

export default TodoList;