import React, { useState } from "react";
import axios, { post } from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Image from "next/image";
import { Settings } from "constants/Settings";

const UploadBookImage = ({ id, image }) => {
  const [file, setFile] = useState(null);
  const router = useRouter();
  const [prevSrc, setPrevSrc] = useState(image);

  function onFormSubmit(e) {
    e.preventDefault(); // Stop form submit
    fileUpload(file).then((response) => {
      const res = response.data;
      router.replace("/admin/books");
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
  function fileUpload(file) {
    try {
      const { name } = file;
    } catch (err) {
      console.log(err);
      return;
    }
    const url = `${Settings.API_DATA_URL}utils/save_book_pic`;
    ``;

    const filename = "";
    filename = name.replaceAll(" ", "_");
    filename = filename.toLowerCase();
    const formData = new FormData();
    formData.append("file", file);
    formData.append("imagename", filename);
    formData.append("id", id);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    return post(url, formData, config);
  }

  return (
    <div className="flex flex-col justify-center items-center w-full h-fit mb-4 bg-slate-800 text-white py-1">
      {prevSrc && (
        <Image
          alt="..."
          src={`${prevSrc}`}
          width={300}
          height={250}
          layout="fixed"
        />
      )}
      <form onSubmit={onFormSubmit}>
        <div className="flex flex-col justify-center items-center mx-4">
          <h1 className="py-4">
            Clicked the box below to select an image file
          </h1>
          <input
            type="file"
            onChange={onChange}
            placeholder=""
            className="w-full h-fit bg-slate-700 shadow-xl py-1 px-1 mb-8 border-2 border-slate-600 rounded-md flex flex-col break-all"
          />
        </div>
        <div className="mx-4">
          <button
            className="btn btn-simple bg-orange-500 text-white float-right rounded-lg"
            type="submit"
          >
            Upload
          </button>
        </div>
      </form>
    </div>
  );
};

export default UploadBookImage;
