import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Stack } from "react-bootstrap";
import base64 from "base-64";
import axios from "axios";
import Alert from "react-bootstrap/Alert";
import { useState } from "react";
import cookies from 'react-cookies';


export default function Signin(props) {

  const [isNotLogged, setIsNotLogged] = useState(false);

  const handleSignin = async (e) => {
    e.preventDefault();
    const user = {
      userName: e.target.userName.value,
      password: e.target.password.value,
    };

    const encoded = base64.encode(`${user.userName}:${user.password}`);
    await axios
      .post(`${process.env.REACT_APP_HEROKU_URL}/signin`, {},
        {
          headers: {
            Authorization: `Basic ${encoded}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data.user) 
        cookies.save('token', res.data.token);
        cookies.save('userName', res.data.user.username);
        cookies.save('userId', res.data.user.id);
        cookies.save('email', res.data.user.email);
        cookies.save('role', res.data.user.role);
        props.checkAuth();
        window.location.href = '/post'
        
    })
      .catch((error) => 
      setIsNotLogged(true)
    );
  };

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
