import React, { useState, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import Swal from "sweetalert2";
import { Settings } from "constants/Settings";
import { useRouter } from "next/router";
import Image from "next/image";
import { useEditor, EditorContent } from "@tiptap/react";
import moment from "moment";
import UploadAudioImage from "components/Utils/UploadAudioImage";
import Link from "next/link";

function Editaudio({ audioid }) {
  const router = useRouter();
  const { data: session } = useSession();
  const [audio, setAudio] = useState({});
  const [preview, setPreview] = useState(false);
  const [upload, setUpload] = useState(false);

  useEffect(() => {
    if (audioid) {
      axios
        .get(`${Settings.API_DATA_URL}audio/audio/`, {
          params: {
            aid: audioid,
          },
        })
        .then((response) => {
          const data = response.data;
          setAudio(data.audio);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  const updateAudio = (event) => {
    event.preventDefault();
    axios
      .patch(`${Settings.API_DATA_URL}audio/audio`, {
        id: audio._id,
        title: audio.title,
        description: audio.description,
        format: audio.format,
        length: audio.length,
        url: audio.url,
        status: audio.status,
        date_created: audio.date_created,
        author: session.user.id,
      })
      .then((response) => {
        const res = response.data;
        if (response.status === 200) {
          Swal.fire({
            title: "Purpose Thoughts",
            text: "Audio Saved Successfully!",
            icon: "success",
          });
          router.replace("/admin/audios");
        }
      })
      .catch((error) => {
        console.log(error);
        Swal.fire({
          title: "Purpose Thoughts",
          text: "Could not save audio!",
          icon: "error",
        });
      });
  };

  const setInput = (e) => {
    setAudio({
      ...audio,
      [e.target.name]: e.target.value,
    });
  };

  const showMediaUpload = () => {
    setUpload(!upload);
  };

  const inputChange = (e) => {
    setAudio({
      ...audio,
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
            <h1 className="text-2xl font-bold pb-4">Edit Audio</h1>
            <div className="flex">
              <p
                className="border-2 border-slate-200 flex justify-center items-center py-1 px-3 cursor-pointer"
                title="Upload Image"
                onClick={showMediaUpload}
              >
                <i className="fa fa-camera text-global-blue"></i>
              </p>
              <Link href={`/admin/audios`}>
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
                  <UploadAudioImage
                    id={audio._id}
                    image={
                      audio.image_url
                        ? `${audio.image_url}`
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
                value={audio.title}
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
                  value={audio.description}
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
                value={audio.format}
                onChange={inputChange}
                placeholder="Format"
                className="border-simple px-2 py-2 rounded-md w-full"
              >
                <option value="mp3">MP3</option>
                <option value="wma">WMA</option>
              </select>
            </div>
            <div className="py-4">
              <p className="pb-2">Duration</p>
              <input
                name="length"
                value={audio.length}
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
                value={audio.url}
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
                value={moment(audio.date_created).format("YYYY-MM-DDTHH:mm")}
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
                value={audio.status}
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
                onClick={updateAudio}
                className="btn btn-gray border-2 border-gray-100 hover:border-gray-300 hover:text-amber-700 py-2 px-4"
              >
                Save Audio
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

export default Editaudio;
