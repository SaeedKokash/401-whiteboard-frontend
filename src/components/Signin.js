import React from "react";
import Form from "react-bootstrap/Form";

import {
  VStack,
  Text,
  Heading,
  Alert,
  AlertIcon,
  Link,
  FormControl,
  FormLabel,
  Input,
  Button,
  Flex,
} from "@chakra-ui/react";

import { useSelector, useDispatch } from 'react-redux';
import { login } from "../actions/authActions";

export default function Signin() {

  const dispatch = useDispatch();
  const error = useSelector(state => state.auth.error);

  return (
    <Flex
      direction={{ base: "column", md: "row" }}
      justify="center"
      align="center"
      w="100%"
      h="70vh"
    >

    <VStack 
    borderColor="blue.500"
    borderRadius="lg"
    borderWidth="2px"
    textAlign="center"
    p="5em"
    m="2em"
    w={{base: '90vw', sm:'80vw', lg:'50vw', xl:'40vw'}}
    alignItems='stretch'
    spacing={100}
    mb="5em"

    >
      <Heading>Sign In</Heading>

      <Form onSubmit={(e) => login( dispatch, e)} >
        <FormControl pb="2em" borderColor="blue.500" isRequired>
          <FormLabel requiredIndicator>Username</FormLabel>
          <Input type="text" placeholder="username" id="userName" autoComplete="userName" />
          </FormControl>

          <FormControl pb="3em" borderColor="blue.500" isRequired>
          <FormLabel requiredIndicator>Password</FormLabel>
          <Input type="password" placeholder="password" id="password" autoComplete="current-password" />
        </FormControl>

        {/* {isNotLogged && (
          <Alert status='error' variant='left-accent' mb="1em">
            <AlertIcon />
            You Are Not Authorized
          </Alert>  
        )} */}

        {error && (
          <Alert status='error' variant='left-accent' mb="1em">
            <AlertIcon />
            {error}
          </Alert>
        )}
        
        <Button colorScheme="blue" type="submit" mb="1rem">
          Sign In
        </Button>
        <Text >
          Don't have an account? <Link color='blue.500' href="/signup">Sign up now</Link>
        </Text>
      </Form>
    </VStack>
    </Flex>
  );
}
