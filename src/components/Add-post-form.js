import axios from "axios";
import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Stack } from "react-bootstrap";

function AddPostForm(props) {

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newPost = {
            postTitle: e.target.title.value,
            postContent: e.target.content.value
        };
        await axios.post(`${process.env.REACT_APP_HEROKU_URL}/post`, newPost).then( () => {
            props.getAllPosts();
        });


    }


  return (
    <div>
        <h1>Enter Your Post Items Here!</h1>
    <Form onSubmit={handleSubmit}>
    <Stack gap={2} className="col-md-4 mx-auto">

      <Form.Group className="mb-3" id="title">
        <Form.Label>Post Title</Form.Label>
        <Form.Control type="text" placeholder="Enter Title" id="title"/>
      </Form.Group>

      <Form.Group className="mb-3" id="content">
        <Form.Label>Post content</Form.Label>
        <Form.Control type="text" as="textarea" rows={3} placeholder="Enter Post Contents" id="content"/>
      </Form.Group>

      <Button variant="outline-dark" type="submit">
        Submit
      </Button>
      </Stack>
      
    </Form>
        
    </div>
  );
}

export default AddPostForm;
