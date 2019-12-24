import React from "react";
import { navigate } from "@reach/router";
import { Formik, Field, Form } from "formik";

function EditTask() {

  const taskId = window.location.pathname.slice(6);
  
  let taskBody = "";

  fetch('/api/todo/' + taskId)
      .then(response => response.json())
      .then(data => taskBody = data.data.attributes.body);

  const handleSubmit = attributes => {
    const requestTasks = async () => {
      // We get the CSRF token generated by Rails to send it
      // as a header in the request to create a new post.
      // This is needed because with this token, Rails is going to
      // recognize the request as a valid request
      console.log(attributes);
      const csrfToken = document.querySelector("meta[name=csrf-token]").content;
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
    <div>
      <h2>Edit task</h2>
      <Formik
        initialValues={{
            body: "",
        }}
        onSubmit={handleSubmit}
        render={() => (
          <Form>
            <Field type="text" name="body" placeholder={taskBody} />

            <button type="submit">Change</button>
            <button type="button" onClick={() => window.history.back()}>Go back</button>
          </Form>
        )}
      />
    </div>
  );
}

export default EditTask;