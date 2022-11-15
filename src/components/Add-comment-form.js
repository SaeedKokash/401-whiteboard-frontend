import axios from "axios";
import React from "react";
import Form from "react-bootstrap/Form";

import { useAuth } from "../context/AuthContext";

import {
  Button,
  FormControl,
  FormLabel,
  useToast,
  VStack,
  Textarea,
} from "@chakra-ui/react";

function AddCommentForm(props) {
  const { userData } = useAuth();

  const toast = useToast();

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
        toast({
          title: 'Comment has been deleted successfully!',
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
