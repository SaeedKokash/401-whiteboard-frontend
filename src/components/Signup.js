import React from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Stack } from "react-bootstrap";
import Alert from "react-bootstrap/Alert";
import { useState } from "react";

export default function Signup() {

  const [isPassword, setisPassword] = useState(false);
  // const [isValid, setisValid] = useState(false);


  const handleSignup = async (e) => {
    e.preventDefault();
    if (e.target.password.value === e.target.confirmPassword.value) {
      const data = {
        userName: e.target.userName.value,
        email: e.target.email.value,
        password: e.target.password.value,
      };

      await axios
        .post(`${process.env.REACT_APP_HEROKU_URL}/signup`, data)
        .then((res) => {
          console.log(res)
          window.location.href = '/signin'; })
        .catch((error) => console.log(error));

    } else {
      setisPassword(true)
      console.log('password dont match')
    }
    
  };

  return (
    <div>
      <h2>Sign Up</h2>

      <Form onSubmit={handleSignup}>
        <Stack gap={2} className="col-md-4 mx-auto">

          <Form.Group className="mb-3" id="title">
            <Form.Label>Username</Form.Label>
            <Form.Control type="text" placeholder="username" id="userName" autoComplete="username"/>
          </Form.Group>

          <Form.Group className="mb-3" id="content">
            <Form.Label>Email</Form.Label>
            <Form.Control type="text" placeholder="email" id="email" autoComplete="username"/>
          </Form.Group>

          <Form.Group className="mb-3" id="content">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="password" id="password" autoComplete="new-password"/>
          </Form.Group>

          <Form.Group className="mb-3" id="content">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control type="password" placeholder="confirm password" id="confirmPassword" autoComplete="new-password"/>
          </Form.Group>

          { isPassword &&
            <Alert key="strong" variant="danger">
            The password entered does not match! Please try again.
            </Alert>}

          <Button variant="outline-dark" type="submit">
            Sign Up
          </Button>

          <p>Already Registered? <a href="/signin">Sign in</a></p>
          
        </Stack>
      </Form>
    </div>
  );
}
