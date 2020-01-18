/*
This page is homepage of the to-do list.
*/

import React, { useEffect, useState } from "react";
import { navigate } from "@reach/router";
import './main.css'

function TodoList(props) {
  let [todo, setTodo] = useState([]);
  let tags = [];
  let selectedTag = decodeURIComponent(props.tag);
  
  // Get all the tasks and set the todo state to it
  useEffect(() => {
    const requestTodo = async () => {
      const response = await fetch("/api/todo");
      const { data } = await response.json();
      setTodo(data);
    };
    requestTodo();
  }, []);

  // Get all the different tags of the tasks and
  // put it in the tags array. This function also
  // ensures there are no duplicates in the array
  function getTags() {
    todo.forEach(tag => {
      if (tags.indexOf(tag.attributes.tag) == -1) {
        tags.push(tag.attributes.tag);
      }
    });

    // If user visit a URL with a tag that
    // does not exists, they will be redirected 
    // to the View All tag.
    if ((selectedTag != "undefined") && (tags.indexOf(selectedTag) == -1) && (tags.length != 0)) {
      navigate('/');
    }
  }

  // Call the getTags function
  getTags();

  // Get the selected Tag value and navigate
  // to the URL with the Tag value as parameter.
  function gotoTag(event) {
      let url = encodeURIComponent(event.target.value);
      navigate("/" + url);
  }

  // Filter the todo state and only keep tasks
  // that matches the Tag selected
  function filterTag() {
    if (selectedTag != "undefined")
    {
      todo = todo.filter(item => item.attributes.tag == selectedTag);
    }
  }

  // Call the filterTag function
  filterTag();

  // Navigate to the respective pages when a button is clicked
  const gotoAddTask = () => navigate('/add');
  const gotoDelete = id => navigate('/delete/' + id);
  const gotoDone = id => navigate('/done/' + id);
  const gotoUndo = id => navigate('/undo/' + id);
  const gotoEdit = id => navigate('/edit/' + id);

  // Put each individual tag in tags array into a HTML dropdown option
  let categories = tags.map(item => 
                              <option value={item}>
                                {item}
                              </option>);

  // Add HTML elements, buttons to each of the individual task 
  let todoData = todo.map(task => 
                            <div class="task-container">
                              <span class={task.attributes.status}>{task.attributes.body}</span>
                              <div class="task-buttons">
                                {task.attributes.status == "done"
                                  ? <button class="btn btn-success" onClick={() => gotoUndo(task.id)}>Undo</button>
                                  : <button class="btn btn-outline-success" onClick={() => gotoDone(task.id)}>Done</button>
                                }
                                <button class="btn btn-outline-primary" onClick={() => gotoEdit(task.id)}>Edit</button>
                                <button class="btn btn-outline-danger" onClick={() => gotoDelete(task.id)}>Delete</button>
                              </div>
                            </div>);

  return (
    <div>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous" />
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js" integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6" crossorigin="anonymous"></script>
        <div class="new-task-container"><button class="btn btn-primary" onClick={gotoAddTask}>Add new task</button></div>
        <br />
        <div class="selector-container">
          <span>Tag:</span>
          <select onChange={gotoTag} value={selectedTag}>
            <option value="">View All</option>
            {categories}
          </select>
        </div>
        {todoData}
    </div>
  )
}

export default TodoList;