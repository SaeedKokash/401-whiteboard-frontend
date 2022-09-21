import React, { useEffect, useState } from "react";
import axios from "axios";
import AddPostForm from "./Add-post-form";
import AddCommentForm from "./Add-comment-form";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import cookies from "react-cookies";

function Post() {
  const [posts, setPosts] = useState([]);
  console.log(posts);

  const getAllPosts = async () => {
    const allPosts = await axios.get(`${process.env.REACT_APP_HEROKU_URL}/post`, {
      headers: {
        Authorization: `Bearer ${cookies.load('token')}`,
        },
        });
    setPosts(allPosts.data.post);
  };

  const handleDelete = async (id) => {
    await axios.delete(`${process.env.REACT_APP_HEROKU_URL}/post/${id}`);
    getAllPosts();
  };

  useEffect(() => {
    getAllPosts();
  }, []);

  return (
    <div>
      <AddPostForm getAllPosts={getAllPosts} />
      <div className="cards">
      {posts &&
        posts.map((value, idx) => {
          return (
            <div key={idx} >


              <Card className="text-center bg-dark text-white" style={{ width: "18rem" }}>
                <Card.Body>
                  <Card.Title>{value.postTitle}</Card.Title>
                  <Card.Text>{value.postContent}</Card.Text>
                  <Button variant="primary" onClick={() => handleDelete(value.id)}>Delete Post</Button>
                </Card.Body>
                <AddCommentForm postID={value.id} getAllPosts={getAllPosts} />
              

              {value.Comments &&
                value.Comments.map((item, idx) => {
                  return (
                    <div key={idx}>
                      <p>Author: {item.creator} Comment: {item.comment}</p>
                    </div>
                  );
                })}
              </Card>
            </div>
          );
        })}
        
      </div>
    </div>
  );
}

export default Post;
