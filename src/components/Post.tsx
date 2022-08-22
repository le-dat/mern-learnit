import React, { useState } from "react";
import { Badge, Button, Card, Col, Row, Stack } from "react-bootstrap";
import { MdClose } from "react-icons/md";
import { BsPlayBtn, BsPencil } from "react-icons/bs";
import { RiDeleteBinLine } from "react-icons/ri";
import { Post as PostIProps } from "./interface/post";
import PostDetail from "./PostDetail";

interface IProps extends PostIProps {
  id: string;
  handleDeletePost: (id: string) => any;
}
const Post = ({ id, status, title, description, url, handleDeletePost }: IProps) => {
  const [showDetailModal, setShowDetailModal] = useState<boolean>(false);

  const handleShowDetail = (id: string) => {
    console.log(id);
    setShowDetailModal(true);
  };

  return (
    <>
      <Card
        className="shadow mb-4 relative"
        border={status === "LEARNED" ? "success" : status === "LEARNING" ? "warning" : "danger"}
      >
        <Stack
          direction="horizontal"
          gap={3}
          style={{
            position: "absolute",
            top: ".3rem",
            right: ".3rem",
            padding: ".7rem",
            cursor: "pointer",
          }}
        >
          <Button variant="secondary" href={url} target="_blank">
            <BsPlayBtn size="1.2rem" />
          </Button>
          <BsPencil size="1.2rem" onClick={() => handleShowDetail(id)} />
          <RiDeleteBinLine id={id} onClick={() => handleDeletePost(id)} size="1.3rem" />
        </Stack>

        <Card.Body>
          <Card.Title>
            <Row>
              <Col>
                <p>{title}</p>
                <Badge
                  pill
                  bg={
                    status === "LEARNED" ? "success" : status === "LEARNING" ? "warning" : "danger"
                  }
                >
                  {status}
                </Badge>
              </Col>
              <Col className="text-right">{/* <ActionButtons url={url} _id={_id} /> */}</Col>
            </Row>
          </Card.Title>
          <Card.Text>{description}</Card.Text>
        </Card.Body>
      </Card>

      {showDetailModal && (
        <PostDetail
          id={id}
          description={description}
          title={title}
          status={status}
          url={url}
          showDetailModal={showDetailModal}
          setShowDetailModal={setShowDetailModal}
        />
      )}
    </>
  );
};

export default Post;
