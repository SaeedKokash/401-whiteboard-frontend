import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Stack } from "react-bootstrap";
import Alert from "react-bootstrap/Alert";

import { useAuth } from '../context/AuthContext';

export default function Signin() {

  const { isNotLogged, handleSignin } = useAuth();

  return (
    <div>
            
      <h2>Sign In</h2>

      <Form onSubmit={handleSignin}>
        <Stack gap={2} className="col-md-4 mx-auto">
          <Form.Group className="mb-3" id="title">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="username"
              id="userName"
              autoComplete="userName"
            />
          </Form.Group>

          <Form.Group className="mb-3" id="content">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="password"
              id="password"
              autoComplete="current-password"
            />
          </Form.Group>

          {isNotLogged && (
              <Alert key="strong" variant="danger">
                You Are Not Authorized
              </Alert>
            )}

          <Button variant="outline-dark" type="submit">
            Sign In
          </Button>
        </Stack>
        <p>Don't have an account? <a href="/signup">Sign up now</a></p>
      </Form>

    </div>
  );
}
