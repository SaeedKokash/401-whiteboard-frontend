import React, { useEffect } from "react";
import AddPostForm from "./Add-post-form";
import AddCommentForm from "./Add-comment-form";
import EditModal from "./EditModal";

import { usePost } from "../context/PostContext";
import { useAuth } from "../context/AuthContext";

import { FaTrash } from 'react-icons/fa';
import {
  VStack,
  HStack,
  StackDivider,
  Button,
  Heading,
  Text,
  Flex,
  Wrap,
  Box,
  Badge,
  SimpleGrid,
  IconButton,
  Spacer,
} from "@chakra-ui/react";

function Post() {
  const { posts, getAllPosts, handlePostDelete, handleCommentDelete } = usePost();
  const { userData } = useAuth();

  const userName = userData.user.username.charAt(0).toUpperCase() + userData.user.username.slice(1);

  useEffect(() => {
    getAllPosts();
  }, []);

  return (
    <Flex direction="column" justify="center" alignItems="center">

      <Heading mb="1em">Welcome to our Application {userName}</Heading>
      <Text>Feel free to post some jokes and enjoy your time!</Text>
      <Text>Don't forget to visit us and laugh from time to time!</Text>

      <AddPostForm />

      <Wrap spacing={6} justify="center">

        {posts &&
          posts.map((value, idx) => {
            return (
              <SimpleGrid key={idx} minChildWidth='550px'>
                <Box borderWidth="1px" borderRadius="lg" overflow="hidden"  boxShadow="md">
                  <Box p="6">
                    <Box display="flex" alignItems="baseline">
                      <Badge borderRadius="full" px="2" colorScheme="teal">New</Badge>
                      <Box
                        color="gray.500"
                        fontWeight="semibold"
                        letterSpacing="wide"
                        fontSize="lg"
                        // textTransform="uppercase"
                        ml="2"
                        >
                        {value.creator.charAt(0).toUpperCase() + value.creator.slice(1)}
                      </Box>
                    </Box>

                    <Box mt="1" fontWeight="semibold" as="h4" lineHeight="tight" noOfLines={2}>
                      {value.postTitle}
                    </Box>

                    <Box display="flex" mt="2" alignItems="center">
                        {value.postContent}
                    </Box>
  
                    <Box m="5">
                      {userData.user.role === "admin" || userData.user.userId === value.userID ? (
                        <HStack justify="center" divider={<StackDivider borderColor="gray.200" />}>
                          <EditModal post={value} getAllPosts={getAllPosts} />
                          <Button leftIcon={<FaTrash />} colorScheme="red" type="submit" onClick={() => handlePostDelete(value.id)}>Delete Post</Button>
                        </HStack>
                      ) : null}
                    </Box>

                    <AddCommentForm postID={value.id} getAllPosts={getAllPosts} />

                    <Box key={idx} p="2" m="2" borderWidth="1px" borderRadius="lg" overflow="hidden" w="100%" boxShadow="md">
                        {value.Comments.length > 0 ? (
                          <VStack divider={<StackDivider borderColor="gray.200" />} alignItems='stretch'>
                        {value.Comments && value.Comments.map((item, idx) => {
                          return (
                              <HStack spacing={4} key={idx}>
                                <Text fontWeight="semibold" >{item.creator.charAt(0).toUpperCase() + item.creator.slice(1)}</Text>
                                <Text>{item.comment}</Text>
                                <Spacer/>
                                {userData.user.role === "admin" || userData.user.userId === item.userID ? (
                                  <IconButton 
                                  icon={<FaTrash />}
                                  isRound='true'
                                  onClick={() => handleCommentDelete(item.id)}
                                  boxShadow="md"
                                    />
                                    ) : null}
                              </HStack>
                            );
                          })}
                          </VStack>) : <Text>No comments yet!</Text>}
                        </Box>
                  </Box>
                </Box>
              </SimpleGrid>
          );
        })}
      </Wrap>
    </Flex>
  );
}

export default Post;
