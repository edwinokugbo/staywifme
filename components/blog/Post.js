import React, { useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";
import { Settings } from "constants/Settings";
import { DiscussionEmbed } from "disqus-react";

function Post({ postid }) {
  var d;
  const [post, setPost] = useState({});
  const [hdate, setHDate] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${Settings.API_DATA_URL}frontend/post/${postid}`)
      .then((response) => {
        setPost(response.data.post);
        let d = new Date(post.dateCreated);
        setHDate(d.toDateString());
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
    <div className="flex flex-col items-center bg-white mb-8 w-full">
      <div className="w-full lg:w-2/3">
        <h1 className="text-6xl text-global-blue font-bold py-8 text-center leading-none">
          {post.title}
        </h1>
        <img
          src={post.featuredImage}
          layout="fixed"
          className="w-full h-fit rounded-lg"
        />
        <div className="py-2">
          <h1 className="text-global-blue font-bold my-4">{hdate}</h1>
          {/* <h1 className="text-blue-800 my-4">
            {"by" + post.author.firstname + post.author.lastname}
          </h1> */}
          <h1 className="text-black text-lg whitespace-pre-line">
            <div
              dangerouslySetInnerHTML={{
                __html: post.content,
              }}
            ></div>
          </h1>
        </div>
      </div>

      <div>
        <DiscussionEmbed
          shortname="example"
          config={{
            url: `localhost://blog/${post._id}`,
            identifier: `${post._id}`,
            title: `${post.title}`,
            language: "zh_TW", //e.g. for Traditional Chinese (Taiwan)
          }}
        />
      </div>
    </div>
  );
}

export default Post;
