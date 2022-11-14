import React from "react";
import { IconButton, useColorMode, VStack, HStack, Heading, Button, Spacer, Flex } from "@chakra-ui/react";
import { BsSun, BsMoon } from "react-icons/bs";

import { useAuth } from "../context/AuthContext";

export default function Header() {
  const { userData, handleLogout } = useAuth();

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
        
      {userData.isAuth ? (
        <VStack alignItems="center" alignSelf="flex-end">

          <Heading
            as="h2"
            size="xl"
            noOfLines={1}
            // bgGradient="linear(to-r, purple.500, purple.300, blue.500)"
            // bgClip="text"
          >
            Welcome {userData.user.username.charAt(0).toUpperCase() + userData.user.username.slice(1)}
          </Heading>

          <Button boxShadow="lg" onClick={handleLogout}>Logout</Button>
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
