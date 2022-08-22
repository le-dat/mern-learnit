import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthProvider";

interface IProps {
  children: JSX.Element;
  path?: string;
}
const PrivateRouter = ({ children, path = "/login" }: IProps) => {
  const { currentUser } = useAuthContext();
  if (currentUser == null) return <Navigate to={path} />;
  return children;
};

export default PrivateRouter;
