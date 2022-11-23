import axios from "axios";
import React from "react";
import Form from "react-bootstrap/Form";

import {
  Button,
  FormControl,
  FormLabel,
  useToast,
  VStack,
  Textarea,
} from "@chakra-ui/react";

import { useSelector } from "react-redux";
// import { useDispatch } from "react-redux";

// import { getAllPosts } from "../actions/postActions";

function AddCommentForm(props) {

  const { user } = useSelector(state => state.auth);
  // const dispatch = useDispatch();

  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userID = user.userId;
    const newComment = {
      comment: e.target.comment.value,
    };
    await axios
      .post(
        `${process.env.REACT_APP_HEROKU_URL}/comment/${props.postID}/${userID}`,
        newComment
      )
      .then(() => {
        // getAllPosts(dispatch);
        e.target.comment.value = "";
        toast({
          title: 'Comment has been added successfully!',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      });
  };

  return (
    
    <Form onSubmit={handleSubmit}>

      <VStack pb="2em">
      <FormControl borderColor="blue.500" isRequired>
          <FormLabel requiredIndicator >Write Comment Here</FormLabel>
          <Textarea rows={3} placeholder="Enter Comment" name="comment" />
        </FormControl>

      <Button variant="primary" type="submit" alignSelf="stretch">
        Add Comment
      </Button>

    </VStack>
    </Form>
  );
}

export default AddCommentForm;
