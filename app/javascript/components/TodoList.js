import React, { useEffect, useState } from "react";

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

  let todoData = todo.map(task => <div>{task.attributes.body}</div>);

  return (
    <div>
        <a href='/add'>Add new task</a>
        {todoData}
    </div>
  )
}

export default TodoList;