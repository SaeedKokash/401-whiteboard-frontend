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
  Select,
  FormHelperText,
  Input,
  Button,
  Flex,
} from "@chakra-ui/react";

import { useSelector, useDispatch } from 'react-redux';
import { signUp } from "../actions/authActions";


export default function Signup() {

  const error = useSelector(state => state.auth.error);

  const dispatch = useDispatch();

  return (
    <Flex
      direction={{ base: "column", md: "row" }}
      justify="center"
      align="center"
      w="100%"
      h="100vh"
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
        spacing={50}
        mb="5em"
        >

        <Heading>Sign Up</Heading>

        <Form onSubmit={(e) => signUp( dispatch, e)}>

            <FormControl pb="2em" borderColor="blue.500" isRequired>
            <FormLabel>Username</FormLabel>
            <Input type="text" placeholder="username" id="userName" autoComplete="userName" />
            <FormHelperText textAlign="left">Choose a unique username.</FormHelperText>
            </FormControl>

            <FormControl  pb="2em" borderColor="blue.500" isRequired>
            <FormLabel>Email</FormLabel>
            <Input type="email" placeholder="email" id="email" autoComplete="email" />
            <FormHelperText textAlign="left">We'll never share your email.</FormHelperText>
            </FormControl>

            <FormControl pb="2em" borderColor="blue.500" isRequired>
            <FormLabel>Password</FormLabel>
            <Input type="password" placeholder="password" id="password" autoComplete="new-password" />
            </FormControl>

            <FormControl pb="2em" borderColor="blue.500" isRequired>
            <FormLabel>Confirm Password</FormLabel>
            <Input type="password" placeholder="confirm password" id="confirmPassword" autoComplete="new-password" />
            </FormControl>

            <FormControl pb="2em" borderColor="blue.500">
              <FormLabel>Select Role</FormLabel>
              <Select name="role">
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
              </Select>
            </FormControl>

            { error &&
              <Alert status='error' variant='left-accent' mb="1em">
                <AlertIcon /> 
                {error}
              </Alert>}

            <Button colorScheme="blue" type="submit" mb="1rem">
              Sign Up
            </Button>

            <Text>Already Registered? <Link color='blue.500' href="/signin">Sign in</Link></Text>
            
        </Form>
      </VStack>
    </Flex>

  );
}
