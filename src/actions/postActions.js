import axios from "axios";

import {
  requestPosts,
  getPostsSuccess,
  getPostsFailure,
  requestAddPost,
  addPostSuccess,
  addPostFailure,
  requestDeletePost,
  deletePostSuccess,
  deletePostFailure,
  requestDeleteComment,
  deleteCommentSuccess,
  deleteCommentFailure,
  addAlert,
  deleteAlert,
//   closeAlert,
} from "../features/postSlicer";

// import { useToast } from "@chakra-ui/react";

export const getAllPosts = async (dispatch) => {
  if (!localStorage.getItem("token")) {
    dispatch(getPostsFailure("You are not logged in!"));
    return;
  } else {
    const token = localStorage.getItem("token");

    try {
      dispatch(requestPosts());
      const allPosts = await axios.get(`${process.env.REACT_APP_HEROKU_URL}/post`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      dispatch(getPostsSuccess(allPosts.data.post));
    } catch (error) {
      dispatch(getPostsFailure(error.message));
    }
  }
};

export const handlePostDelete = async (id, dispatch) => {
    if (!localStorage.getItem("token")) {
        dispatch(deletePostFailure("You are not logged in!"));
        return;
    } else {
        const token = localStorage.getItem("token");
        const userID = localStorage.getItem("userId");
    
        try {
        dispatch(requestDeletePost());
        await axios.delete(`${process.env.REACT_APP_HEROKU_URL}/post/${id}/${userID}`, {
            headers: {
            Authorization: `Bearer ${token}`,
            },
        });
        dispatch(deletePostSuccess(id));
        dispatch(deleteAlert());
        // toast({
        //     title: 'Post has been deleted successfully!',
        //     status: 'success',
        //     duration: 3000,
        //     isClosable: true,
        //   });
        } catch (error) {
        dispatch(deletePostFailure(error.message));
        }
    }
};

export const handleCommentDelete = async (id, dispatch) => {
    if (!localStorage.getItem("token")) {
        dispatch(deleteCommentFailure("You are not logged in!"));
        return;
    } else {
        const token = localStorage.getItem("token");
    
        try {
        dispatch(requestDeleteComment());
        await axios.delete(`${process.env.REACT_APP_HEROKU_URL}/comment/${id}`, {
            headers: {
            Authorization: `Bearer ${token}`,
            },
        });
        dispatch(deleteCommentSuccess(id));
        // toast({
        //     title: 'Comment has been deleted successfully!',
        //     status: 'success',
        //     duration: 3000,
        //     isClosable: true,
        //   });
        } catch (error) {
        dispatch(deleteCommentFailure(error.message));
        }
    }
};

export const handleAddPost = async (payload, dispatch) => {
    payload.preventDefault();

    if (!localStorage.getItem("token")) {
        dispatch(addPostFailure("You are not logged in!"));
        return;
    } else {
        const token = localStorage.getItem("token");

        const newPostData = {
            postTitle: payload.target.title.value,
            postContent: payload.target.content.value,
            userID: localStorage.getItem("userId"),
            creator: localStorage.getItem("username")
        };
    
        try {
        dispatch(requestAddPost());
        const newPost = await axios.post(`${process.env.REACT_APP_HEROKU_URL}/post`, newPostData, {
            headers: {
            Authorization: `Bearer ${token}`,
            },
        }).then( () => {


            dispatch(addPostSuccess(newPost.data.post));
            dispatch(addAlert());
            // reset form
            payload.target.title.value = "";
            payload.target.content.value = "";
            payload.target.reset();
            // toast({
                //     title: 'Post has been added successfully!',
                //     status: 'success',
                //     duration: 3000,
                //     isClosable: true,
                //   });
        });
        } catch (error) {
        dispatch(addPostFailure(error.message));
        }
    }
};



