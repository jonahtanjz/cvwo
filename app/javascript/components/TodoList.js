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
  const gotoDelete = id => navigate('/delete/' + id);
  const gotoDone = id => navigate('/done/' + id);
  const gotoEdit = id => navigate('/edit/' + id);

  let todoData = todo.map(task => 
                            <div>
                              <span class={task.attributes.status}>{task.attributes.body}</span>
                              <button onClick={() => gotoDone(task.id)}>Done</button>
                              <button onClick={() => gotoEdit(task.id)}>Edit</button>
                              <button onClick={() => gotoDelete(task.id)}>Delete</button>
                            </div>);

  return (
    <div>
        <button onClick={gotoAddTask}>Add new task</button>
        {todoData}
    </div>
  )
}

export default TodoList;