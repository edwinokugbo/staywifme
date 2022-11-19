import React, { useState, useEffect } from "react";
import axios from "axios";
import { Settings } from "constants/Settings";
import PostBox from "./PostBox";

function Blog() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${Settings.API_DATA_URL}blog/posts`)
      .then((response) => {
        console.log(response.data);
        setPosts(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex w-screen h-screen justify-center items-center">
        <h1 className="text-lg font-bold text-global-blue">Loading...</h1>
      </div>
    );
  }

  return (
    <div className="w-full py-4 px-4">
      <div className="py-2">
        <h1 className="text-2xl text-global-blue font-bold mb-2">Blog</h1>
        <hr />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-2">
        {posts.map((post) => {
          return <PostBox post={post} key={post._id} />;
        })}
      </div>
    </div>
  );
}

export default Blog;
