import axios from "axios";
import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function AddCommentForm(props) {

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newComment = {
            comment: e.target.comment.value,
        };
        await axios.post(`${process.env.REACT_APP_HEROKU_URL}/comment/${props.postID}`, newComment).then( () => {
            props.getAllPosts();
        });
    }


  return (

    <Form onSubmit={handleSubmit}>

      <Form.Group className="mb-3" id="comment">
        <Form.Label>Write Comment Here</Form.Label>
        <Form.Control as="textarea" rows={3} placeholder="Enter Comment" name="comment"/>
      </Form.Group>

      <Button variant="primary" type="submit">
        Add Comment
      </Button>

    </Form>
  );
}

export default AddCommentForm;
