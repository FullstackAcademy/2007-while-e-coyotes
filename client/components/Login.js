import React from "react";
import { Form, Field, ErrorMessage } from "formik";

export default class Login extends React.Component {
  render() {
    return (
      <div>
        <Form>
          <Field type="text" name="username" placeholder="username" />
          <ErrorMessage name="username" />
          <Field type="text" name="password" placeholder="password" />
          <ErrorMessage name="password" />
          <button type="submit"> Submit </button>
        </Form>
      </div>
    );
  }
}
