import React from "react";
import Link from "next/link";

function Post({ id, featuredImage, title, content }) {
  return (
    <Link href={`/blog/${id}`}>
      <div className="flex flex-col items-center h-full w-fit lg:w-auto px-2 lg:px-4 py-4 mb-4 cursor-pointer drop-shadow-md">
        <img
          alt="Profile Img"
          src={featuredImage}
          className="object-cover h-fit w-full"
        />
        <div className="flex flex-col items-center">
          <h2 className="text-lg mt-2">{title}</h2>
          <h4 className="text-sm mt-2">{content}</h4>
          <h1 className="text-gray-300 mt-2">--------------------</h1>
        </div>
      </div>
    </Link>
  );
}

export default Post;
