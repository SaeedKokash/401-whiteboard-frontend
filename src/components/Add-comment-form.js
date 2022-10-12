import axios from "axios";
import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import { useAuth } from "../context/AuthContext";

function AddCommentForm(props) {
  const { userData } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userID = userData.user.userId;
    const newComment = {
      comment: e.target.comment.value,
    };
    await axios
      .post(
        `${process.env.REACT_APP_HEROKU_URL}/comment/${props.postID}/${userID}`,
        newComment
      )
      .then(() => {
        props.getAllPosts();
        e.target.comment.value = "";
      });
  };

  return (
    <Form onSubmit={handleSubmit} className="commentForm">
      <Form.Group className="mb-3" id="comment">
        <Form.Label>Write Comment Here</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          placeholder="Enter Comment"
          name="comment"
          required
        />
      </Form.Group>

      <Button variant="success" type="submit">
        Add Comment
      </Button>
    </Form>
  );
}

export default AddCommentForm;
