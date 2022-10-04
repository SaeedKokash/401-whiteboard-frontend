import { createContext, useContext, useState } from "react";
import axios from "axios";
import cookies from "react-cookies";

export const PostContext = createContext();

export const usePost = () => useContext(PostContext);

const PostContextProvider = (props) => {
  const [posts, setPosts] = useState([]);
  const [addAlert, setAddAlert] = useState(false);
  const [deleteAlert, setDeleteAlert] = useState(false);


  const getAllPosts = async () => {
    const allPosts = await axios.get(
      `${process.env.REACT_APP_HEROKU_URL}/post`, {
        headers: {
          Authorization: `Bearer ${cookies.load("token")}`,
        },
      }
    );
    setPosts(allPosts.data.post);
  };

  const handlePostDelete = async (id) => {
    const userID = cookies.load('userId');

    console.log(userID);
    await axios.delete(`${process.env.REACT_APP_HEROKU_URL}/post/${id}/${userID}`, {
      headers: {
        Authorization: `Bearer ${cookies.load("token")}`,
      },
    });
    getAllPosts();
    setDeleteAlert(true);
  };

  const handleCommentDelete = async (id) => {
    await axios.delete(`${process.env.REACT_APP_HEROKU_URL}/comment/${id}`, {
      headers: {
        Authorization: `Bearer ${cookies.load("token")}`,
      },
    });
    getAllPosts();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
        postTitle: e.target.title.value,
        postContent: e.target.content.value,
        userID: cookies.load('userId'),
        creator: cookies.load('userName')
    };
    await axios.post(`${process.env.REACT_APP_HEROKU_URL}/post`, newPost, {
        headers: {
          Authorization: `Bearer ${cookies.load('token')}`,
        }
    }).then( () => {
        getAllPosts();
        setAddAlert(true);
    });
}

  const value = {posts, addAlert, setAddAlert, deleteAlert, setDeleteAlert, getAllPosts, handlePostDelete, handleCommentDelete, handleSubmit};

  return (
    <PostContext.Provider value={value}>
        {props.children}
    </PostContext.Provider>
  );
};

export default PostContextProvider;
