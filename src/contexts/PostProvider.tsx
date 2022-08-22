import axios from "axios";
import React, { useContext, createContext, useState } from "react";
import setAuthToken from "../utils/setAuthToken";
import { API_URL } from "./constant";

interface Post {
  _id: string;
  title: string;
  description: string;
  url: string;
  status: string;
  user: { _id: string; name: string };
  createdAt: string;
  updatedAt: string;
}
interface PostContextIProps {
  addPost: (title: string, description: string, url: string, status: string) => Promise<any>;
  updatePost: (
    id: string,
    title: string,
    description: string,
    url: string,
    status: string
  ) => Promise<any>;
  getPosts: () => Promise<any>;
  deletePost: (id: string) => Promise<any>;
  posts: Array<Post> | [];
}
interface PostProviderIProps {
  children: React.ReactNode;
}
const PostContext = createContext({} as PostContextIProps);

export function usePostContext() {
  return useContext(PostContext);
}

const PostProvider = ({ children }: PostProviderIProps) => {
  const [posts, setPosts] = useState<Array<Post> | []>([]);

  const authorization = () => {
    if (localStorage["jwt"]) {
      setAuthToken(JSON.parse(localStorage["jwt"]));
    }
  };
  authorization();

  const addPost = async (title: string, description: string, url: string, status: string) => {
    try {
      const { data } = await axios.post(`${API_URL}/post/create`, {
        title,
        description,
        url,
        status,
      });

      if (data.success) {
        setPosts([...posts, data.newPost]);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getPosts = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/post`);
      console.log(data);
      if (data.success) {
        setPosts(data.posts);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const deletePost = async (id: string) => {
    try {
      const { data } = await axios.delete(`${API_URL}/post/${id}`);
      console.log(data);
      setPosts(posts.filter((post) => post._id !== id));
      // getPosts();
    } catch (err) {
      console.log(err);
    }
  };

  const updatePost = async (
    id: string,
    title: string,
    description: string,
    url: string,
    status: string
  ) => {
    try {
      const { data } = await axios.put(`${API_URL}/post/${id}`, {
        title,
        description,
        url,
        status,
      });
      console.log(data);
      getPosts();
    } catch (err) {
      console.log(err);
    }
  };
  const value = {
    addPost,
    getPosts,
    deletePost,
    updatePost,
    posts,
  };
  return <PostContext.Provider value={value}>{children}</PostContext.Provider>;
};

export default PostProvider;
