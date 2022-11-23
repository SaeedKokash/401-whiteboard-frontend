import React from "react";
import Form from "react-bootstrap/Form";

import {
  Button,
  VStack,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Textarea,
} from "@chakra-ui/react";

import { handleAddPost } from "../actions/postActions";
import { useDispatch } from "react-redux"; 

function AddPostForm() {

  const dispatch = useDispatch();

  return (
    <VStack
      // bgColor="gray.100"
      borderColor="blue.500"
      borderRadius="lg"
      borderWidth="5px"
      textAlign="left"
      p="5em"
      m="2em"
      w={{ base: "90vw", sm: "80vw", lg: "50vw", xl: "40vw" }}
      alignItems="stretch"
      spacing={50}
      boxShadow="lg"
    >
      <Heading size="xl" noOfLines={1}>
        Share your joke with us!
      </Heading>

      <Form onSubmit={(e) => handleAddPost(e, dispatch)} >
        <FormControl pb="2em" borderColor="blue.500" isRequired>
          <FormLabel requiredIndicator>Post Title</FormLabel>
          <Input type="text" placeholder="Enter Title" id="title" />
        </FormControl>

        <FormControl pb="2em" borderColor="blue.500" isRequired>
          <FormLabel requiredIndicator>Post content</FormLabel>
          <Textarea rows={5} placeholder="Enter Post Contents" id="content" />
        </FormControl>

        <Button colorScheme="blue" type="submit">Submit</Button>
      </Form>
    </VStack>
  );
}

export default AddPostForm;
