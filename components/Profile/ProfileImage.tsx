import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";

function ProfileImage() {
  const uploadProfilePic = () => {
    alert("Will upload later!");
  };

  return (
    <div className="w-full md:w-[300px] md:h-[300px] border-2 border-slate-300 rounder-md">
      <FontAwesomeIcon
        icon={faCamera}
        className="text-2xl text-white absolute left-0 ml-8 mt-2"
        onClick={uploadProfilePic}
      />
      <img src="/img/relationship.png" width="auto" height="300" />
    </div>
  );
}

export default ProfileImage;
