import React, { useState } from "react";
import { Modal, Button, Form} from "react-bootstrap";
import axios from "axios";
import cookies from "react-cookies";

function EditModal(props) {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleEdit = async (e, id) => {
        e.preventDefault();

        // this is the post id
        // console.log(id) 
        
        const updatedPost = {
          postTitle: e.target.editTitle.value,
          postContent: e.target.editContent.value,
        };
        console.log(updatedPost);
        console.log(id);
        await axios.put(`${process.env.REACT_APP_HEROKU_URL}/post/${id}`, updatedPost, {
            headers: {
              Authorization: `Bearer ${cookies.load("token")}`,
            },
          }
        );
        props.getAllPosts();
        handleClose();
      };
    
        return (
            <div>
                <Button variant="primary" onClick={handleShow}>Edit Post</Button> 

                <Modal show={show} onHide={handleClose} >
                          <Modal.Header closeButton>
                            <Modal.Title>Edit Post</Modal.Title>
                          </Modal.Header>

                          <Modal.Body >
                            <Form onSubmit={(e) => handleEdit(e, props.post.id)}>
                              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1" >
                                <Form.Label>Post Title</Form.Label>
                                <Form.Control type="text" autoFocus defaultValue={props.post.postTitle} name="editTitle" required/>
                              </Form.Group>

                              <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                <Form.Label>Post Content</Form.Label>
                                <Form.Control as="textarea" rows={5} defaultValue={props.post.postContent} name="editContent" required/>
                              </Form.Group>

                              <Modal.Footer>
                                <Button variant="secondary" onClick={handleClose}>Close</Button>
                                <Button variant="primary" type="submit" >Save Changes</Button>
                              </Modal.Footer>
                            </Form>
                            
                          </Modal.Body>
                  </Modal>
            </div>
        )

}

export default EditModal;