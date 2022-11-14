import React from "react";
import { VStack, Text } from "@chakra-ui/react";

export default function Footer() {
  return (
    <VStack  w="100%" h="3em" mt="10" bgGradient="linear(to-r, purple.500, purple.300, blue.500)" justifyContent="center">
      <Text>Stress Relief Whiteboard App Created by &copy;Saeed Kokash</Text>
    </VStack>
  );
}
