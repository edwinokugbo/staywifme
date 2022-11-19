import React, { useState, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import Swal from "sweetalert2";
import { Settings } from "constants/Settings";
import { useRouter } from "next/router";
import Image from "next/image";
import { useEditor, EditorContent } from "@tiptap/react";
import moment from "moment";
import UploadBookImage from "components/Utils/UploadBookImage";
import UploadBookPDF from "components/Utils/UploadBookPDF";
import Link from "next/link";

function Editbook({ bookid }) {
  const router = useRouter();
  const { data: session } = useSession();
  const [book, setBook] = useState({});
  const [preview, setPreview] = useState(false);
  const [upload, setUpload] = useState(false);

  useEffect(() => {
    if (bookid) {
      axios
        .get(`${Settings.API_DATA_URL}book/book/`, {
          params: {
            bid: bookid,
          },
        })
        .then((response) => {
          const data = response.data;
          setBook(data.book);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  const updateBook = (event) => {
    event.preventDefault();
    axios
      .patch(`${Settings.API_DATA_URL}book/book`, {
        id: book._id,
        title: book.title,
        description: book.description,
        excerpt: book.excerpt,
        pages: book.pages,
        url: book.url,
        status: book.status,
        date_created: book.date_created,
        author: session.user.id,
      })
      .then((response) => {
        const res = response.data;
        if (response.status === 200) {
          Swal.fire({
            title: "Purpose Thoughts",
            text: "Book Saved Successfully!",
            icon: "success",
          });
          router.replace("/admin/books");
        }
      })
      .catch((error) => {
        console.log(error);
        Swal.fire({
          title: "Purpose Thoughts",
          text: "Could not save book!",
          icon: "error",
        });
      });
  };

  const setInput = (e) => {
    setBook({
      ...book,
      [e.target.name]: e.target.value,
    });
  };

  const showMediaUpload = () => {
    setUpload(!upload);
  };

  const inputChange = (e) => {
    setBook({
      ...book,
      [e.target.name]: e.target.value,
    });
  };

  const imgError = (e) => {
    e.target.onError = null;
    e.target.src = "/img/sketch.jpg";
  };

  if (session) {
    return (
      <div className="flex flex-col items-center justify-start w-screen h-full mb-16 px-4 pt-2">
        <div className="w-full lg:w-3/4 py-4 px-2 md:px-8  border-2 border-gray-100">
          <div className="flex justify-between mb-4">
            <h1 className="text-2xl font-bold pb-4">Edit Book</h1>
            <div className="flex">
              <p
                className="border-2 border-slate-200 flex justify-center items-center py-1 px-3 cursor-pointer"
                title="Upload Image"
                onClick={showMediaUpload}
              >
                <i className="fa fa-camera text-global-blue mr-2"></i>
              </p>
              <Link href={`/admin/books`}>
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
            <div>
              {upload && (
                <div>
                  <UploadBookImage
                    id={book._id}
                    image={
                      book.image_url
                        ? `${book.image_url}`
                        : "/img/profile/useroff.png"
                    }
                  />
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col">
            <div className="py-4">
              <p className="pb-2">Title</p>
              <input
                name="title"
                value={book.title}
                onChange={inputChange}
                type="text"
                placeholder="Title"
                className="border-simple px-2 py-2 rounded-md w-full"
              />
            </div>
            <div className="py-4">
              <p className="pb-2">Description</p>
              <div>
                <textarea
                  name="description"
                  value={book.description}
                  onChange={inputChange}
                  rows="5"
                  placeholder="Description"
                  className="border-simple px-2 py-2 rounded-md w-full"
                />
              </div>
            </div>
            <div className="py-4">
              <p className="pb-2">Excerpt</p>
              <textarea
                name="excerpt"
                value={book.excerpt}
                onChange={inputChange}
                rows="3"
                placeholder="Excerpt"
                className="border-simple px-2 py-2 rounded-md w-full"
              />
            </div>
            <div className="py-4">
              <p className="pb-2">Number of Pages</p>
              <input
                name="pages"
                value={book.pages}
                onChange={inputChange}
                type="number"
                step="1"
                placeholder="Number of Pages"
                className="border-simple px-2 py-2 rounded-md w-full"
              />
            </div>
            <div className="py-4">
              <p className="pb-2">URL</p>
              <input
                name="url"
                value={book.url}
                onChange={inputChange}
                type="text"
                placeholder="url"
                className="border-simple px-2 py-2 rounded-md w-full"
              />
            </div>
            <div className="py-4">
              <p className="pb-2">Date Published</p>
              <input
                name="date_created"
                value={moment(book.date_created).format("YYYY-MM-DDTHH:mm")}
                onChange={inputChange}
                type="datetime-local"
                placeholder="Date Published"
                className="border-simple px-2 py-2 rounded-md w-full"
              />
            </div>
            <div className="py-4">
              <p className="pb-2">Status</p>
              <select
                name="status"
                value={book.status}
                onChange={inputChange}
                placeholder="Status"
                className="border-simple px-2 py-2 rounded-md w-full"
              >
                <option value="0">Pending</option>
                <option value="1">Approved</option>
                <option value="2">Suspended</option>
              </select>
            </div>
            <hr />
            <div className="py-4 flex justify-start">
              <button
                onClick={updateBook}
                className="btn btn-gray border-2 border-gray-100 hover:border-gray-300 hover:text-amber-700 py-2 px-4"
              >
                Save Book
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1">
            <div>
              <UploadBookPDF
                id={book._id}
                image={
                  book.image_url
                    ? `${book.image_url}`
                    : "/img/profile/useroff.png"
                }
              />
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return <h1>Not logged in</h1>;
  }
}

export default Editbook;
