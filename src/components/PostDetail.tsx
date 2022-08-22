import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { usePostContext } from "../contexts/PostProvider";
import { Post } from "./interface/post";

interface IProps extends Post {
  id: string;
  showDetailModal: boolean;
  setShowDetailModal: (value: boolean) => void;
}
const PostDetail = ({
  id,
  title,
  description,
  url,
  status,
  showDetailModal,
  setShowDetailModal,
}: IProps) => {
  const [values, setValues] = useState<Post>({
    title: title,
    description: description,
    url: url,
    status: status,
  });

  const { updatePost } = usePostContext();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>
  ) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { title, description, url, status } = values;
    updatePost(id, title, description, url, status);
    setShowDetailModal(false);
  };

  return (
    <Modal show={showDetailModal} onHide={() => setShowDetailModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={(e) => handleSubmit(e)}>
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              name="title"
              value={values.title}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)}
              type="text"
              placeholder="title 1"
              autoFocus
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              name="description"
              value={values.description}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)}
              as="textarea"
              rows={3}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Status</Form.Label>
            <Form.Select
              name="status"
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleChange(e)}
            >
              <option value="TO LEARN">TO LEARN</option>
              <option value="LEARNING">LEARNING</option>
              <option value="LEARNED">LEARNED</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Url</Form.Label>
            <Form.Control
              name="url"
              value={values.url}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)}
              type="text"
              placeholder="https://www.youtube.com/"
            />
          </Form.Group>
          <div className="d-flex justify-content-end">
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default PostDetail;
