import React, { useState } from "react";
import axios, { post } from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Image from "next/image";
import { Settings } from "constants/Settings";

const UploadSiteMedia = ({ id }) => {
  const { data: session } = useSession();
  const [file, setFile] = useState(null);
  const router = useRouter();
  const [prevSrc, setPrevSrc] = useState("");

  function onFormSubmit(e) {
    e.preventDefault(); // Stop form submit
    const title = e.target.title.value;
    fileUpload(file, title).then((response) => {
      const res = response.data;
      router.replace("/admin/media");
    });
  }
  function onChange(e) {
    setFile(e.target.files[0]);
    try {
      var url = window.URL.createObjectURL(e.target.files[0]);
      setPrevSrc(url);
    } catch (err) {
      setPrevSrc("");
      console.log(err);
    }
  }
  function fileUpload(file, title) {
    try {
      const { name } = file;
    } catch (err) {
      console.log(err);
      return;
    }
    const url = `${Settings.API_DATA_URL}utils/save-site-media`;
    ``;

    let filename = "";
    filename = name.replaceAll(" ", "_");
    filename = filename.toLowerCase();
    let formData = new FormData();
    formData.append("file", file);
    formData.append("imagename", filename);
    formData.append("id", session.user.id);
    formData.append("title", title);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    return post(url, formData, config);
  }

  return (
    <div className="flex flex-col justify-start items-center w-screen h-screen mb-16">
      <div className="my-8">
        <h1 className="text-xl font-bold">Upload new media</h1>
        <hr />
      </div>
      {prevSrc && (
        <Image
          alt="..."
          src={`${prevSrc}`}
          width={300}
          height={250}
          layout="fixed"
        />
      )}
      <hr className="border-2 border-slate-100 w-1/3 my-4" />
      <form onSubmit={onFormSubmit}>
        <div className="py-4">
          <p className="pb-2">Title</p>
          <input
            name="title"
            type="text"
            placeholder="Title"
            className="border-simple px-2 py-2 rounded-md w-full"
          />
        </div>
        <div className="flex flex-col justify-center items-center">
          <h1 className="px-4 py-2">
            Clicked the box below to select an image file
          </h1>
          <input
            type="file"
            onChange={onChange}
            placeholder=""
            className="w-full h-fit bg-slate-200 shadow-xl py-4 px-4 mb-8 border-2 border-slate-300 rounded-lg flex flex-col break-all"
          />
        </div>
        <button
          className="btn btn-simple bg-orange-500 text-white float-right rounded-lg"
          type="submit"
        >
          Upload
        </button>
      </form>
    </div>
  );
};

export default UploadSiteMedia;
