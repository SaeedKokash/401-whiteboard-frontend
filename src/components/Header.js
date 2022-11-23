import React from "react";
import { IconButton, useColorMode, VStack, HStack, Heading, Button, Spacer, Flex } from "@chakra-ui/react";
import { BsSun, BsMoon } from "react-icons/bs";

import { useSelector, useDispatch } from 'react-redux';
import { logout } from "../actions/authActions";

export default function Header() {

  const dispatch = useDispatch();
  const isAuth = useSelector(state => state.auth.isAuth);
  const user = useSelector(state => state.auth.user);

  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Flex p="2em" mb="5em" h="15em" bgGradient="linear(to-r, purple.500, purple.300, blue.500)">
      
      <HStack w="100%" h="100%" >
        <Heading
          as="h1"
          size="2xl"
          noOfLines={1}         
          // bgGradient="linear(to-r, purple.500, purple.300, blue.500)"
          // bgClip="text"
        >
        Stress Relief Whiteboard App
        </Heading>

        <Spacer/>
        
      {isAuth ? (
        <VStack alignItems="center" alignSelf="flex-end">

          <Heading
            as="h2"
            size="xl"
            noOfLines={1}
            // bgGradient="linear(to-r, purple.500, purple.300, blue.500)"
            // bgClip="text"
          >
            Welcome {user.username.charAt(0).toUpperCase() + user.username.slice(1)}
          </Heading>

          <Button boxShadow="lg" onClick={() => logout(dispatch)}>Logout</Button>
        </VStack>
      ) : null}
      
      <IconButton
        variant="outline"
        colorScheme="black"
        aria-label="color theme"
        icon={colorMode === "light" ? <BsSun /> : <BsMoon />}
        onClick={toggleColorMode}
        alignSelf="flex-end"
        />
      </HStack>
      
    </Flex>
  );
}
