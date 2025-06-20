import React, { useState } from "react";
import PostContext from "./PostContext";
import { useReducer } from "react";
import { postReducer } from "../Reducer/PostReducer";
import { uploadPost, getPost } from "../API/PostApi";
const UserPostContext = ({ children }) => {
  const initialPost = {};
  const [newPost, setnewPost] = useState({ content: [], caption: "" });

  const [post, postdispatch] = useReducer(postReducer, initialPost);

 

  return (
    <PostContext.Provider
      value={{ post, postdispatch, uploadPost, getPost, newPost, setnewPost }}
    >
      {children}
    </PostContext.Provider>
  );
};

export default UserPostContext;
