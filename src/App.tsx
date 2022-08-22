import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PrivateRouter from "./pages/PrivateRouter";
import AuthProvider from "./contexts/AuthProvider";
import PostProvider from "./contexts/PostProvider";

const App = () => {
  return (
    <AuthProvider>
      <PostProvider>
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <PrivateRouter>
                  <Home />
                </PrivateRouter>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </BrowserRouter>
      </PostProvider>
    </AuthProvider>
  );
};

export default App;
