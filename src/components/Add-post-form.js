import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Stack } from "react-bootstrap";
import Alert from "react-bootstrap/Alert";

import { usePost } from "../context/PostContext";

function AddPostForm() {

  const { addAlert, setAddAlert, handleSubmit } = usePost();
    
  return (
    <div className="postForm">

        <h2>Enter Your Post Items Here!</h2>
    <Form onSubmit={handleSubmit}>
    <Stack gap={3} className="">

      <Form.Group id="title">
        <Form.Label>Post Title</Form.Label>
        <Form.Control type="text" placeholder="Enter Title" id="title" required/>
      </Form.Group>

      <Form.Group id="content">
        <Form.Label>Post content</Form.Label>
        <Form.Control type="text" as="textarea" rows={5} placeholder="Enter Post Contents" id="content" required />
      </Form.Group>

      {addAlert && (
          <Alert key="strong" variant='success' onClose={() => setAddAlert(false)} dismissible>
           Post has been Added successfully!
          </Alert>
                  )}

      <Button variant="outline-dark" type="submit">
        Submit
      </Button>
      </Stack>
      
    </Form>

    
        
    </div>
  );
}

export default AddPostForm;
