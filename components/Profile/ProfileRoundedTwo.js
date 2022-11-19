import React from "react";
import Link from "next/link";

function ProfileRoundedTwo({ imgsrc, name, company, id }) {
  return (
    <Link href={`/judges/${id}`}>
      <div className="w-full lg:w-1/5 mx-1 my-2 flex flex-col bg-zinc-100 border-4 border-zinc-200 rounded-3xl rounded-t-full rounded-b-lg drop-shadow-md cursor-pointer">
        <img
          alt="Profile Img"
          src={imgsrc}
          className="flex-1 w-full h-auto rounded-3xl rounded-t-full rounded-b-lg hover:border-2 hover:border-amber-600 ease-in-out duration-100"
        />
        <div className="flex-1 flex flex-col items-center mt-3">
          <div className="relative -top-6 -right-20 bg-orange-400 w-8 h-8 flex items-center justify-center rounded-full p-4">
            <i className="fas fa-plus text-black text-sm" />
          </div>
          <h2 className="text-xl font-bold text-zinc-900">{name}</h2>
          <h4 className="italic text-zinc-900">{company}</h4>
        </div>
      </div>
    </Link>
  );
}

export default ProfileRoundedTwo;

// rounded-3xl rounded-t-full
// flex-1 flex flex-col items-center bg-white mx-5 my-3
