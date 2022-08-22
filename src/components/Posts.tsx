import React, { useEffect, useState } from "react";
import { Badge, Card, Col, Container, Row } from "react-bootstrap";
import { usePostContext } from "../contexts/PostProvider";
import Post from "./Post";
import PostDetail from "./PostDetail";

const CardPosts = () => {
  const { posts, getPosts, deletePost } = usePostContext();

  useEffect(() => {
    getPosts();
  }, []);

  const handleDeletePost = (id: string) => {
    deletePost(id);
  };

  return (
    <>
      <Container className="mt-4">
        <Row xs={1} md={2} lg={3}>
          {posts.map((post) => (
            <Col key={post._id}>
              <Post
                id={post._id}
                handleDeletePost={handleDeletePost}
                title={post.title}
                description={post.description}
                status={post.status}
                url={post.url}
              />
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default CardPosts;
