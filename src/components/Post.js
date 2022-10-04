import React, { useEffect } from "react";
import AddPostForm from "./Add-post-form";
import AddCommentForm from "./Add-comment-form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import cookies from "react-cookies";
import Alert from "react-bootstrap/Alert";
import EditModal from "./EditModal";

import { usePost } from "../context/PostContext";

function Post() {
  
  const { deleteAlert, setDeleteAlert, posts, getAllPosts, handlePostDelete, handleCommentDelete } = usePost();
  
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

      <AddPostForm />

      <div className="cards">
        {posts &&
          posts.map((value, idx) => {
            console.log(value.userID)
            // console.log(cookies.load("userId"))
            return (
              <div key={idx}>

                <Card  className="eachCard" style={{ width: "18rem" }}>
                  <Card.Body>
                    <Card.Title>{value.postTitle}</Card.Title>
                    <Card.Text>{value.postContent}</Card.Text>

                    {/* if the role is admin or the user is the owner  */}
                    {cookies.load("role") === "admin" || (cookies.load('userId') == value.userID) ? (
                      
                      <div>
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
                              <Card.Title className="commentCreator">{item.creator}</Card.Title>
                              <Card.Text className="comment">{item.comment}</Card.Text>
                              
                              {cookies.load("role") === "admin" ? (
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
