import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import Swal from "sweetalert2";
import { Settings } from "constants/Settings";
import { useRouter } from "next/router";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import EditorMenuBar from "components/Utils/EditorMenuBar";
import Link from "next/link";

function Addpost({ postid }) {
  const router = useRouter();
  const { data: session } = useSession();
  const [categories, setCategories] = useState([]);
  const editor = useEditor({
    extensions: [StarterKit],
    content: "",
  });
  const [post, setPost] = useState({
    title: "",
    subtitle: "",
    category: "",
    author: "",
    content: "",
  });
  const [preview, setPreview] = useState(false);

  useEffect(() => {
    axios
      .get(`${Settings.API_DATA_URL}post/categories`)
      .then((response) => {
        setCategories(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
    return () => {};
  }, []);

  const savePost = (event) => {
    event.preventDefault();

    axios
      .post(`${Settings.API_DATA_URL}post/post`, {
        title: post.title,
        subtitle: post.subtitle,
        category: post.category,
        content: editor.getHTML(),
        author: session.user.id,
      })
      .then((response) => {
        const res = response.data;
        console.log(res);
        if (response.status === 201) {
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

  const inputChange = (e) => {
    setPost({
      ...post,
      [e.target.name]: e.target.value,
    });
  };

  if (session) {
    return (
      <div className="flex flex-col items-center justify-start w-screen h-full mb-16 px-4 pt-2">
        <div className="w-full lg:w-3/4 py-4 px-2 md:px-8  border-2 border-gray-100">
          <div className="flex justify-between">
            <h1 className="text-2xl font-bold pb-4">Add Post</h1>
            <Link href={`/admin/posts`}>
              <a
                className="border-2 border-slate-200 flex justify-center items-center mb-2 py-1 px-3 cursor-pointer"
                title="Go Back"
              >
                <i className="fa fa-backward text-global-blue"></i>
              </a>
            </Link>
          </div>

          <hr />
          {/* <form onSubmit={}> */}
          <div className="flex flex-col">
            <div className="py-4">
              <p className="pb-2">Title</p>
              {post.title}
              <input
                name="title"
                value={post.title}
                onChange={inputChange}
                type="text"
                placeholder="Title"
                className="border-simple px-2 py-2 rounded-md w-full"
              />
            </div>
            <div className="py-4">
              <p className="pb-2">Subtitle</p>
              <input
                name="subtitle"
                value={post.subtitle}
                onChange={inputChange}
                type="text"
                placeholder="Subtitle"
                className="border-simple px-2 py-2 rounded-md w-full"
              />
            </div>
            <div className="py-4">
              <p className="pb-2">Category</p>
              <select
                name="category"
                value={post.category}
                onChange={inputChange}
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
            {/* <button
              onClick={() => setPreview(!preview)}
              className="w-fit py-2 px-3 border border-slate-300 bg-slate-700 text-white text-lg font-bold"
            >
              Toggle View
            </button> */}
            <div className="py-4">
              <p className="pb-2">Content</p>
              <div>
                <EditorMenuBar editor={editor} />
                <EditorContent
                  className="h-48 border border-slate-300 p-2"
                  editor={editor}
                />
              </div>
            </div>
            <hr />
            <div className="py-4 flex justify-start">
              <button
                onClick={savePost}
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

export default Addpost;
