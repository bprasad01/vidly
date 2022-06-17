import React, { Component } from "react";
import Form from "./common/form";
import Joi from "joi-browser";

class Login extends Form {
  state = {
    data: { username: "", password: "" },
    errors: {},
  };

  //define joi validation schema
  schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
  };

  doSubmit = () => {
    // call from server
    console.log("Submitted");
  };

  render() {
   
    return (
      <div>
        <h1>Login Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput( "username", "Username" )}
          {this.renderInput( "password", "Password", "password" )}
          {this.renderButton("Login")}
        </form>
      </div>
    );
  }
}

export default Login;