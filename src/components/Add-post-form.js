import axios from "axios";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Stack } from "react-bootstrap";
import cookies from "react-cookies";
import Alert from "react-bootstrap/Alert";


function AddPostForm(props) {

  const [alert, setAlert] = useState(false);


    const handleSubmit = async (e) => {
        e.preventDefault();
        const newPost = {
            postTitle: e.target.title.value,
            postContent: e.target.content.value
        };
        await axios.post(`${process.env.REACT_APP_HEROKU_URL}/post`, newPost, {
            headers: {
              Authorization: `Bearer ${cookies.load('token')}`,
            }
        }).then( () => {
            props.getAllPosts();
            setAlert(true);
        });
    }


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

      {alert && (
          <Alert key="strong" variant='success' onClose={() => setAlert(false)} dismissible>
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
