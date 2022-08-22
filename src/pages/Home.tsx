import React from "react";
import { Navigate } from "react-router-dom";
import Header from "../components/Header";
import Posts from "../components/Posts";

const Home = () => {
  return (
    <div>
      <Header />
      <Posts />
    </div>
  );
};

export default Home;
