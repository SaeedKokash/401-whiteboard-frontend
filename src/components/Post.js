import React, { useEffect, useState } from "react";
import axios from "axios";
import AddPostForm from "./Add-post-form";
import AddCommentForm from "./Add-comment-form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import cookies from "react-cookies";
import Alert from "react-bootstrap/Alert";
import EditModal from "./EditModal";

function Post() {
  const [posts, setPosts] = useState([]);
  const [alert, setAlert] = useState(false);

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
    await axios.delete(`${process.env.REACT_APP_HEROKU_URL}/post/${id}`, {
      headers: {
        Authorization: `Bearer ${cookies.load("token")}`,
      },
    });
    getAllPosts();
    setAlert(true);
  };

  const handleCommentDelete = async (id) => {
    await axios.delete(`${process.env.REACT_APP_HEROKU_URL}/comment/${id}`, {
      headers: {
        Authorization: `Bearer ${cookies.load("token")}`,
      },
    });
    getAllPosts();
  };


  useEffect(() => {
    getAllPosts();
  }, []);

  return (
    <div>
      {alert && (
        <Alert key="strong" variant="success" onClose={() => setAlert(false)} dismissible>
          Post has been deleted successfully!
        </Alert>
      )}

      <AddPostForm getAllPosts={getAllPosts} />

      <div className="cards">
        {posts &&
          posts.map((value, idx) => {
            return (
              <div key={idx}>

                <Card  className="eachCard" style={{ width: "18rem" }}>
                  <Card.Body>
                    <Card.Title>{value.postTitle}</Card.Title>
                    <Card.Text>{value.postContent}</Card.Text>

                    {cookies.load("role") === "admin" ? (
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
