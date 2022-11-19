import Image from "next/image";
import Link from "next/link";
import React from "react";

function PostBox({ post }) {
  var d = new Date(post.dateCreated);
  return (
    <Link href={`/blog/${post._id}`}>
      <div className=" bg-white border-2 border-slate-100 shadow-lg mb-8 cursor-pointer">
        <img
          src={post.featuredImage}
          layout="fixed"
          className="w-fit rounded-lg"
        />
        <div className="px-4 py-2">
          <h1 className="text-lg text-global-blue font-bold py-2 leading-tight">
            {post.title}
          </h1>
          <h1 className="text-sm text-blue-800 mb-2">{d.toDateString()}</h1>
          <h1 className="text-slate-600 text-sm">
            {post.content.substring(0, 100)}...
          </h1>
        </div>
      </div>
    </Link>
  );
}

export default PostBox;
