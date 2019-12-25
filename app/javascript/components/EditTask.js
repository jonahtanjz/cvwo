import React from "react";
import { navigate } from "@reach/router";
import { Formik, Field, Form } from "formik";

function EditTask() {

  const taskId = window.location.pathname.slice(6);
  
  let taskBody = "";
  let taskTag = "";

  const handleSubmit = attributes => {
    const requestTasks = async () => {
      // We get the CSRF token generated by Rails to send it
      // as a header in the request to create a new post.
      // This is needed because with this token, Rails is going to
      // recognize the request as a valid request
      const csrfToken = document.querySelector("meta[name=csrf-token]").content;
      
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

  fetch('/api/todo/' + taskId)
      .then(response => response.json())
      .then(data => {
        taskBody = data.data.attributes.body;
        taskTag = data.data.attributes.tag;      
      });

    return ( 
      <div>
        <h2>Edit task</h2>
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
            <input type="text" name="body" onChange={props.handleChange} placeholder={taskBody} />
            <br />
            <label>Tag:</label>
            <input type="text" name="tag" onChange={props.handleChange} placeholder={taskTag} />
            <br />
            <button type="submit">Change</button>
            <button type="button" onClick={() => window.history.back()}>Go back</button>

            {props.errors.name && <div id="feedback">{props.errors.name}</div>}
          </form>
          )}
        </Formik>
      </div>
    );

}

export default EditTask;