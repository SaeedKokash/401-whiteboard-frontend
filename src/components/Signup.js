import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Stack } from "react-bootstrap";
import Alert from "react-bootstrap/Alert";

import { useAuth } from '../context/AuthContext';

export default function Signup() {

  const { isPassword, handleSignup } = useAuth();

  return (
    <div>
      <h2>Sign Up</h2>

      <Form onSubmit={handleSignup}>
        <Stack gap={2} className="col-md-4 mx-auto">

          <Form.Group className="mb-3" id="title">
            <Form.Label>Username</Form.Label>
            <Form.Control type="text" placeholder="username" id="userName" autoComplete="username" required/>
          </Form.Group>

          <Form.Group className="mb-3" id="content">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="email" id="email" autoComplete="email" required />
          </Form.Group>

          <Form.Group className="mb-3" id="content">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="password" id="password" autoComplete="new-password" required/>
          </Form.Group>

          <Form.Group className="mb-3" id="content">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control type="password" placeholder="confirm password" id="confirmPassword" autoComplete="new-password" required/>
          </Form.Group>

          <Form.Group className="mb-3" id="content">
            <Form.Label>Select Role</Form.Label>
            <Form.Select name="role">
                <option value="user">User</option>
                <option value="admin">Admin</option>
            </Form.Select>
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
