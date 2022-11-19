import React, { useState, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import Swal from "sweetalert2";
import { Settings } from "constants/Settings";
import { useRouter } from "next/router";
import UploadPostImage from "components/Utils/UploadPostImage";
import Image from "next/image";

function Editpost({ postid }) {
  const router = useRouter();
  const { data: session } = useSession();
  const [post, setPost] = useState({});
  const [categories, setCategories] = useState([]);
  const [upload, setUpload] = useState(false);

  useEffect(() => {
    axios
      .get(`${Settings.API_DATA_URL}post/${postid}`)
      .then((response) => {
        const data = response.data;
        setPost(data.post);
        setCategories(data.categories);
      })
      .catch((err) => {
        console.log(err);
      });
    return () => {};
  }, [postid]);

  const updatePost = (event) => {
    event.preventDefault();
    axios
      .patch(`${Settings.API_DATA_URL}post`, {
        id: post._id,
        title: event.target.title.value,
        subtitle: event.target.subtitle.value,
        category: event.target.category.value,
        content: event.target.content.value,
        featuredImage: event.target.featuredImage.value,
        author: session.user.id,
      })
      .then((response) => {
        const res = response.data;
        if (response.status === 200) {
          Swal.fire({
            title: "Purpose Thoughts",
            text: "Post Saved Successfully!",
            icon: "success",
          });
          router.replace("/admin/posts");
        }
      })
      .catch((error) => {
        console.log(error);
        Swal.fire({
          title: "Purpose Thoughts",
          text: "Could not save post!",
          icon: "error",
        });
      });
  };

  const setInput = (e) => {
    setPost({
      ...post,
      [e.target.name]: e.target.value,
    });
  };

  const showMediaUpload = () => {
    setUpload(!upload);
  };

  if (session) {
    return (
      <div className="flex flex-col items-center justify-start w-screen h-full mb-16 px-4 pt-2">
        <div className="w-full lg:w-3/4 py-4 px-2 md:px-8  border-2 border-gray-100">
          <div className="flex justify-between mb-4">
            <h1 className="text-2xl font-bold pb-4">Edit Post</h1>{" "}
            <p
              className="border-2 border-slate-200 flex justify-center items-center py-1 px-3 cursor-pointer"
              title="Upload Image"
              onClick={showMediaUpload}
            >
              <i className="fa fa-camera text-global-blue"></i>
            </p>
          </div>
          {upload && (
            <div>
              <UploadPostImage id={post._id} />
            </div>
          )}
          <Image
            alt=""
            src={
              post.featuredImage && post.featuredImage.startsWith("/")
                ? `${post.featuredImage}`
                : "/" + post.featuredImage
            }
            width={300}
            height={250}
            layout="fixed"
          />
          <hr />
          <form onSubmit={updatePost}>
            <div className="flex flex-col">
              <div className="py-4">
                <p className="pb-2">Title</p>
                <input
                  name="title"
                  value={post.title}
                  type="text"
                  placeholder="Title"
                  onChange={setInput}
                  className="border-simple px-2 py-2 rounded-md w-full"
                />
              </div>
              <div className="py-4">
                <p className="pb-2">Subtitle</p>
                <input
                  name="subtitle"
                  value={post.subtitle}
                  type="text"
                  placeholder="Subtitle"
                  onChange={setInput}
                  className="border-simple px-2 py-2 rounded-md w-full"
                />
              </div>
              <div className="py-4">
                <p className="pb-2">Category</p>
                <select
                  name="category"
                  value={post.category}
                  type="text"
                  onChange={setInput}
                  className="border-simple px-2 py-2 rounded-md w-full"
                >
                  {categories.map((cat) => {
                    return (
                      <option key={cat._id} value={cat._id}>
                        {cat.name}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="py-4">
                {/* <Maineditor /> */}
                <p className="pb-2">Content</p>
                <textarea
                  rows={20}
                  cols={100}
                  name="content"
                  value={post.content}
                  placeholder=""
                  onChange={setInput}
                  className="border-simple px-2 py-2 rounded-md w-full"
                ></textarea>
              </div>
              <div className="py-4">
                <p className="pb-2">Featured Image</p>
                <input
                  name="featuredImage"
                  value={post.featuredImage}
                  type="text"
                  placeholder="Image URL"
                  onChange={setInput}
                  className="border-simple px-2 py-2 rounded-md w-full"
                />
              </div>
              <hr />
              <div className="py-4 flex justify-start">
                <button className="btn btn-gray border-2 border-gray-100 hover:border-gray-300 hover:text-amber-700 py-2 px-4">
                  Save Post
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  } else {
    return <h1>Not logged in</h1>;
  }
}

export default Editpost;
