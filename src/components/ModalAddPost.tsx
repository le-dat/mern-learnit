import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { usePostContext } from "../contexts/PostProvider";

interface PostIProps {
  title: string;
  description: string;
  status: string;
  url: string;
}
interface IProps {
  showModal: boolean;
  setShowModal: (value: boolean) => void;
}
const ModalAddPost = ({ showModal, setShowModal }: IProps) => {
  const [values, setValues] = useState<PostIProps>({
    title: "",
    description: "",
    url: "",
    status: "TO LEARN",
  });

  const { addPost } = usePostContext();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { title, description, url, status } = values;
    addPost(title, description, url, status);
    setShowModal(false);
  };

  return (
    <>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>What do you want to learn</Modal.Title>
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
    </>
  );
};

export default ModalAddPost;
