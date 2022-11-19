import React from "react";

function ProfileRoundedOne({ id, imgsrc, name, company }) {
  return (
    <div className="flex flex-col items-center h-fit w-full lg:w-1/4 lg:h-76 px-4 py-4 mb-8 cursor-pointer drop-shadow-md">
      <a href={`/contestants/${id}`}>
        <img
          alt="Profile Img"
          src={imgsrc}
          className="object-cover h-76 lg:h-76 w-80 rounded-full border-b-8 border-t-8 border-b-orange-600 border-t-zinc-600 hover:border-t-orange-600 hover:border-b-zinc-600 ease-in-out duration-300"
        />
      </a>
      <div className="flex flex-col items-center">
        <h2 className="text-xl font-bold text-slate-100">{name}</h2>
        <h4 className="italic text-white">{company}</h4>
      </div>
    </div>
  );
}

export default ProfileRoundedOne;
