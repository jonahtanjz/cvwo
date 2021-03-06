/*
This page is to change the status of a task to 'done'
*/

import React, { useEffect, useState} from "react";
import { navigate } from "@reach/router";
import { Formik, Field, Form } from "formik";
import './main.css';

function EditTask(props) {
  let [taskBody, setTaskBody] = useState([]);
  let [taskTag, setTaskTag] = useState([]);
  const taskId = props.id;
  
  // Get the current value of the task description and tag,
  // and subsequently set the state of taskBody and taskTag
  // to the current values respectively
  useEffect(() => {
    const requestTask = async () => {
      const response = await fetch("/api/todo/" + taskId);
      const { data } = await response.json();
      setTaskBody(data.attributes.body);
      setTaskTag(data.attributes.tag);
    };
    requestTask();
  }, []);

  // On submission, a PATCH request will be sent
  const handleSubmit = attributes => {
    const requestTasks = async () => {
      // We get the CSRF token generated by Rails to send it
      // as a header in the request to create a new post.
      // This is needed because with this token, Rails is going to
      // recognize the request as a valid request
      const csrfToken = document.querySelector("meta[name=csrf-token]").content;
      
      // If either or both description and tag fields are blank, 
      // their attributes will be set to their current value
      // respectively
      if (attributes.body == "" && attributes.tag == "") {
        attributes.body = taskBody;
        attributes.tag = taskTag;
      } else if (attributes.body == "") {
        attributes.body = taskBody;
      } else if (attributes.tag == "") {
        attributes.tag = taskTag;
      }

      const response = await fetch("/api/todo/" + taskId, {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/vnd.api+json",
          "X-CSRF-Token": csrfToken
        },
        body: JSON.stringify({ 
            data: {id: taskId, type: "todos", attributes}
         })
      });
      if (response.status === 200) {
        window.history.back();
      }
    };
    requestTasks();
  };

    return ( 
      <div class="edit-task-container">
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous" />
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js" integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6" crossorigin="anonymous"></script>
        <h2 class="edit-task-header">Edit task</h2>
        <Formik
          initialValues={{
              body: "",
              tag: ""
          }}
          onSubmit={handleSubmit}
          >
          {(props) => (
            <form onSubmit={props.handleSubmit}>

            <p>*Leave blank to keep current value</p>
            <label>Description:</label>
            <input class="form-control" type="text" name="body" onChange={props.handleChange} placeholder={taskBody} />
            <br />
            <label>Tag:</label>
            <input class="form-control" type="text" name="tag" onChange={props.handleChange} placeholder={taskTag} />
            <br />
            <div class="edit-task-button">
              <button class="btn btn-outline-primary" type="submit">Change</button>
              <button class="btn btn-outline-secondary" type="button" onClick={() => window.history.back()}>Go back</button>
            </div>
            {props.errors.name && <div id="feedback">{props.errors.name}</div>}
          </form>
          )}
        </Formik>
      </div>
    );

}

export default EditTask;