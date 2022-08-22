import React, { useRef, useState } from "react";
import { Alert, Button, Form, Spinner } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

import { Landing } from "../assets";
import { useAuthContext } from "../contexts/AuthProvider";

const Login = () => {
  const nameRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const { login } = useAuthContext();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const nameRefValue = nameRef.current?.value || "";
    const passwordRefValue = passwordRef.current?.value || "";

    // if (nameRefValue === "" && passwordRefValue === "") {
    //   return setError("Missing username or password");
    // }
    setLoading(true);
    setError("");
    try {
      const data = await login(nameRefValue, passwordRefValue);
      if (data?.success) {
        navigate("/");
      }
    } catch (err: any) {
      setError(err.response.data?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styled}>
      <div style={{ width: "20rem" }} className="m-auto pt-5">
        <h1 className="text-center">Login</h1>
        {error !== "" && (
          <Alert variant="warning" className="text-center">
            {error}
          </Alert>
        )}
        <Form onSubmit={(e) => handleSubmit(e)}>
          <Form.Group className="mb-2">
            <Form.Label>Name</Form.Label>
            <Form.Control ref={nameRef} type="text" placeholder="Enter name" required />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Password</Form.Label>
            <Form.Control ref={passwordRef} type="password" placeholder="Password" required />
          </Form.Group>

          <Button variant="primary" type="submit" className="w-100 mt-2">
            {loading ? <Spinner animation="border" /> : "Submit"}
          </Button>
          <div className="text-end w-100 d-block mt-2 ">
            Don't have an account ?
            <Link to="/register" className="text-primary">
              Register
            </Link>
          </div>
        </Form>
      </div>
    </div>
  );
};

const styled = {
  background: `url(${Landing}) no-repeat center`,
  backgroundSize: "cover",
  height: "100vh",
  color: "#333",
};
export default Login;
