import React, { useState, useEffect } from "react";
import axios from "axios";
import { Settings } from "constants/Settings";
import Post from "./Post";

function LatestPosts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get(`${Settings.API_DATA_URL}blog/posts`)
      .then((response) => {
        setPosts(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      {posts.map((post) => {
        return (
          <Post
            key={post._id}
            id={post._id}
            featuredImage={post.featuredImage}
            title={post.title}
            excerpt={post.content}
          />
        );
      })}
    </div>
  );
}

export default LatestPosts;
