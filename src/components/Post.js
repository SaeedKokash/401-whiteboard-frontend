import React, { useEffect } from "react";
import AddPostForm from "./Add-post-form";
import AddCommentForm from "./Add-comment-form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Alert from "react-bootstrap/Alert";
import EditModal from "./EditModal";

import { usePost } from "../context/PostContext";
import { useAuth } from "../context/AuthContext";

function Post() {
  
  const { deleteAlert, setDeleteAlert, posts, getAllPosts, handlePostDelete, handleCommentDelete } = usePost();
  const { user } = useAuth();

  const userName = user.username.charAt(0).toUpperCase() + user.username.slice(1)
  
  useEffect(() => {
    getAllPosts();
  },[]);

  return (
    <div>
      {deleteAlert && (
        <Alert key="strong" variant="success" onClose={() => setDeleteAlert(false)} dismissible>
          Post has been deleted successfully!
        </Alert>
      )}
      <div className="welcome-msg">
      <h3>Welcome to our Application {userName}</h3>
      <br></br>
      <p>Feel free to post some jokes and enjoy your time!</p>
      <p>Don't forget to visit us and laugh from time to time! </p>

      </div>


      <AddPostForm />

      <div className="body">
        {posts &&
          posts.map((value, idx) => {
            // console.log(value)
            // console.log(cookies.load("userId"))
            return (
              <div key={idx}>

                <Card  className="eachCard" style={{ width: "18rem" }}>
                  <Card.Body className="post-body">
                    <Card.Title className="creator">{value.creator.charAt(0).toUpperCase() + value.creator.slice(1)}</Card.Title>
                    <Card.Title className="title">{value.postTitle}</Card.Title>
                    <Card.Text>{value.postContent}</Card.Text>

                    {/* if the role is admin or the user is the owner  */}
                    {user.role === "admin" || (user.userId == value.userID) ? (
                      
                      <div className="postBtn">
                        <EditModal post={value} getAllPosts={getAllPosts}/>
                        <Button variant="danger" onClick={() => handlePostDelete(value.id)}>Delete Post</Button>
                      </div>
                    ) : null}

                  </Card.Body>

                  <AddCommentForm postID={value.id} getAllPosts={getAllPosts} />

                  {value.Comments &&
                    value.Comments.map((item, idx) => {
                      // console.log(item)
                      return (
                        <div key={idx}>
                          <Card className="commentCard" style={{ width: "18rem" }}>
                            <Card.Body>
                              <Card.Title className="commentCreator">{item.creator.charAt(0).toUpperCase() + item.creator.slice(1)}</Card.Title>
                              <Card.Text className="comment">{item.comment}</Card.Text>
                              
                              {user.role === "admin" ? (
                                 <Button variant="danger" onClick={() => handleCommentDelete(item.id)}>Delete Comment</Button>
                              ) : null}

                            </Card.Body>
                          </Card>
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
