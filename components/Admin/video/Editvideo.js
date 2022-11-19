import React, { useState, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import Swal from "sweetalert2";
import { Settings } from "constants/Settings";
import { useRouter } from "next/router";
import Image from "next/image";
import moment from "moment";
import Link from "next/link";

function Editvideo({ videoid }) {
  const router = useRouter();
  const { data: session } = useSession();
  const [video, setVideo] = useState({});
  const [preview, setPreview] = useState(false);

  useEffect(() => {
    if (videoid) {
      axios
        .get(`${Settings.API_DATA_URL}video/video/`, {
          params: {
            aid: videoid,
          },
        })
        .then((response) => {
          const data = response.data;
          setVideo(data.video);
          console.log(data.video);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  const updateVideo = (event) => {
    event.preventDefault();
    axios
      .patch(`${Settings.API_DATA_URL}video/video`, {
        id: video._id,
        title: video.title,
        description: video.description,
        format: video.format,
        length: video.length,
        url: video.url,
        status: video.status,
        date_created: video.date_created,
        author: session.user.id,
      })
      .then((response) => {
        const res = response.data;
        if (response.status === 200) {
          Swal.fire({
            title: "Purpose Thoughts",
            text: "Video Saved Successfully!",
            icon: "success",
          });
          router.replace("/admin/videos");
        }
      })
      .catch((error) => {
        console.log(error);
        Swal.fire({
          title: "Purpose Thoughts",
          text: "Could not save video!",
          icon: "error",
        });
      });
  };

  const setInput = (e) => {
    setVideo({
      ...video,
      [e.target.name]: e.target.value,
    });
  };

  const showMediaUpload = () => {
    setUpload(!upload);
  };

  const inputChange = (e) => {
    setVideo({
      ...video,
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
          <div className="flex justify-between">
            <h1 className="text-2xl font-bold pb-4">Edit Video</h1>
            <Link href={`/admin/videos`}>
              <a
                className="border-2 border-slate-200 flex justify-center items-center mb-2 py-1 px-3 cursor-pointer"
                title="Go Back"
              >
                <i className="fa fa-backward text-global-blue"></i>
              </a>
            </Link>
          </div>

          <hr />
          <div className="flex flex-col">
            <div className="py-4">
              <p className="pb-2">Title</p>
              <input
                name="title"
                value={video.title}
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
                  value={video.description}
                  onChange={inputChange}
                  rows="5"
                  placeholder="Description"
                  className="border-simple px-2 py-2 rounded-md w-full"
                />
              </div>
            </div>
            <div className="py-4">
              <p className="pb-2">Format</p>
              <select
                name="format"
                value={video.format}
                onChange={inputChange}
                placeholder="Format"
                className="border-simple px-2 py-2 rounded-md w-full"
              >
                <option value="mp3">MP4</option>
                <option value="wma">WMV</option>
              </select>
            </div>
            <div className="py-4">
              <p className="pb-2">Duration</p>
              <input
                name="length"
                value={video.length}
                onChange={inputChange}
                type="number"
                step="0.01"
                placeholder="Duration"
                className="border-simple px-2 py-2 rounded-md w-full"
              />
            </div>
            <div className="py-4">
              <p className="pb-2">URL</p>
              <input
                name="url"
                value={video.url}
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
                value={moment(video.date_created).format("YYYY-MM-DDTHH:mm")}
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
                value={video.status}
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
                onClick={updateVideo}
                className="btn btn-gray border-2 border-gray-100 hover:border-gray-300 hover:text-amber-700 py-2 px-4"
              >
                Save Video
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return <h1>Not logged in</h1>;
  }
}

export default Editvideo;
