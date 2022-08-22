import { useState } from "react";
import { Button, Container, Navbar } from "react-bootstrap";
import { BiLogIn } from "react-icons/bi";
import { IoAddOutline } from "react-icons/io5";
import { MdOutlineAccountCircle } from "react-icons/md";

import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthProvider";
import ModalAddPost from "./ModalAddPost";

const Header = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const { currentUser, logout } = useAuthContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <>
      <Navbar bg="success" expand="lg">
        <Container>
          <Navbar.Brand className="d-flex align-items-center gap-2">
            <MdOutlineAccountCircle size={"2rem"} />
            {currentUser?.name}
          </Navbar.Brand>

          <Button
            variant="info"
            className="d-flex align-items-center gap-1"
            onClick={() => setShowModal(true)}
          >
            <IoAddOutline />
            Add Post
          </Button>

          <Button
            variant="secondary"
            className="d-flex align-items-center gap-1"
            onClick={handleLogout}
          >
            <BiLogIn size={"1.5rem"} />
            Logout
          </Button>
        </Container>
      </Navbar>

      <ModalAddPost showModal={showModal} setShowModal={setShowModal} />
    </>
  );
};

export default Header;
