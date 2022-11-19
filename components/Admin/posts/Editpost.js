import React, { useState, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import Swal from "sweetalert2";
import { Settings } from "constants/Settings";
import { useRouter } from "next/router";
import UploadPostImage from "components/Utils/UploadPostImage";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import EditorMenuBar from "components/Utils/EditorMenuBar";
import Link from "next/link";

function Editpost({ postid }) {
  const router = useRouter();
  const { data: session } = useSession();
  const [post, setPost] = useState({});
  const [categories, setCategories] = useState([]);
  const [upload, setUpload] = useState(false);
  const editor = useEditor({
    extensions: [StarterKit],
    content: "",
  });

  useEffect(() => {
    if (postid) {
      axios
        .get(`${Settings.API_DATA_URL}post/post/`, {
          params: {
            pid: postid,
          },
        })
        .then((response) => {
          const data = response.data;
          setPost(data.post);
          setCategories(data.categories);
          editor.commands.setContent(`<p>Example Text</p>`);
          console.log("editor time!!!");
        })
        .catch((err) => {
          console.log(err);
          console.log("No editor time!!!");
        });
    }
  }, []);

  useEffect(() => {
    if (editor && !editor.isDestroyed) {
      editor.chain().focus().setContent(post.content).run();
    }
  }, [post, editor]);

  const updatePost = (event) => {
    event.preventDefault();
    axios
      .patch(`${Settings.API_DATA_URL}post/post`, {
        id: post._id,
        title: post.title,
        subtitle: post.subtitle,
        category: post.category,
        content: editor.getHTML(),
        author: session.user.id,
        featuredImage: post.featuredImage,
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

  // const inputChange = (e) => {
  //   setPost({
  //     ...post,
  //     [e.target.name]: e.target.value,
  //   });
  // };

  const imgError = (e) => {
    e.target.onError = null;
    e.target.src = "/img/sketch.jpg";
  };

  if (session) {
    return (
      <div className="flex flex-col items-center justify-start w-screen h-full mb-16 px-4 pt-2">
        <div className="w-full lg:w-3/4 py-4 px-2 md:px-8  border-2 border-gray-100">
          <div className="flex justify-between mb-4">
            <h1 className="text-2xl font-bold pb-4">Edit Post</h1>{" "}
            <div className="flex">
              <p
                className="border-2 border-slate-200 flex justify-center items-center py-1 px-3 cursor-pointer"
                title="Upload Image"
                onClick={showMediaUpload}
              >
                <i className="fa fa-camera text-global-blue"></i>
              </p>
              <Link href={`/admin/posts`}>
                <a
                  className="border-2 border-slate-200 flex justify-center items-center py-1 px-3 cursor-pointer"
                  title="Go Back"
                >
                  <i className="fa fa-backward text-global-blue"></i>
                </a>
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-1">
            {/* <div className="w-full bg-slate-300 border border-orange-200">
              <Image
                alt="Image here"
                src={
                  post.featuredImage ? `${post.featuredImage}` : "/img/user.png"
                }
                onError={imgError}
                width={300}
                height={250}
                layout="fixed"
                className="w-full"
              />
            </div> */}
            <div>
              {upload && (
                <div>
                  <UploadPostImage
                    id={post._id}
                    image={
                      post.featuredImage
                        ? `${post.featuredImage}`
                        : "/img/profile/useroff.png"
                    }
                  />
                </div>
              )}
            </div>
          </div>
          <hr />
          {/* <form onSubmit={updatePost}> */}
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
            <div className="py-4 block">
              <p className="pb-2">Content</p>
              <div className="block">
                <EditorMenuBar editor={editor} />
                <EditorContent
                  className="h-full border border-slate-300 p-2"
                  editor={editor}
                />
              </div>
            </div>
            <div className="py-4 mt-12 hidden">
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
              <button
                onClick={updatePost}
                className="btn btn-gray border-2 border-gray-100 hover:border-gray-300 hover:text-amber-700 py-2 px-4"
              >
                Save Post
              </button>
            </div>
          </div>
          {/* </form> */}
        </div>
      </div>
    );
  } else {
    return <h1>Not logged in</h1>;
  }
}

export default Editpost;
