import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import { Settings } from "constants/Settings";
import Swal from "sweetalert2";

function SocialInfo() {
  const { data: session } = useSession();
  const [formReady, setFormReady] = useState(true);
  const [user, setUser] = useState({});
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    axios
      .get(`${Settings.API_DATA_URL}user/${session.user.id}`)
      .then((response) => {
        setUser(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
    setSaved(false);
  }, [saved]);

  const setInput = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const saveUserData = (event) => {
    event.preventDefault();

    if (!formReady) {
      alert("You have missing or invalid fields.");
      return;
    }

    axios
      .patch(`${Settings.API_DATA_URL}user-social`, {
        id: session.user.id,
        website: event.target.website.value,
        facebook: event.target.facebook.value,
        instagram: event.target.instagram.value,
        twitter: event.target.twitter.value,
        youtube: event.target.youtube.value,
        ticktok: event.target.tiktok.value,
        skype: event.target.skype.value,
      })
      .then((response) => {
        const res = response.data;
        if (response.status === 201) {
          Swal.fire({
            title: "Purpose Thoughts",
            text: "Data Updated!",
            icon: "success",
          });
        }
        setSaved(true);
      })
      .catch((error) => {
        console.log(error);
        Swal.fire({
          title: "Purpose Thoughts",
          text: "Could not save user!",
          icon: "error",
        });
      });
  };

  return (
    <div className="flex flex-col items-center justify-start mt-2">
      <div className="w-full">
        <form onSubmit={saveUserData}>
          <h1 className="text-2xl font-bold pb-4">Social Media</h1>
          <hr />
          <div className="flex flex-col">
            <div className="py-4">
              <p className="pb-2">Website</p>
              <input
                type="text"
                name="website"
                value={user.website}
                onChange={setInput}
                placeholder="Your Website"
                className="border-simple px-2 py-2 rounded-md w-full"
              />
            </div>
            <div className="py-4">
              <p className="pb-2">Facebook</p>
              <input
                type="text"
                name="facebook"
                value={user.facebook}
                onChange={setInput}
                placeholder="Your Facebook username"
                className="border-simple px-2 py-2 rounded-md w-full"
              />
            </div>
            <div className="py-4">
              <p className="pb-2">Instagram</p>
              <input
                type="text"
                name="instagram"
                value={user.instagram}
                onChange={setInput}
                placeholder="Your Instagram handle"
                className="border-simple px-2 py-2 rounded-md w-full"
              />
            </div>
            <div className="py-4">
              <p className="pb-2">Twitter</p>
              <input
                type="text"
                name="twitter"
                value={user.twitter}
                onChange={setInput}
                placeholder="Your Twitter handle"
                className="border-simple px-2 py-2 rounded-md w-full"
              />
            </div>
            <div className="py-4">
              <p className="pb-2">Youtube</p>
              <input
                type="text"
                name="youtube"
                value={user.youtube}
                onChange={setInput}
                placeholder="Your Youtube channel"
                className="border-simple px-2 py-2 rounded-md w-full"
              />
            </div>
            <div className="py-4">
              <p className="pb-2">TikTok</p>
              <input
                type="text"
                name="tiktok"
                value={user.tiktok}
                onChange={setInput}
                placeholder="Your TikTok Page"
                className="border-simple px-2 py-2 rounded-md w-full"
              />
            </div>
            <div className="py-4">
              <p className="pb-2">Skype</p>
              <input
                type="text"
                name="skype"
                value={user.skype}
                onChange={setInput}
                placeholder="Your Skype ID"
                className="border-simple px-2 py-2 rounded-md w-full"
              />
            </div>
            <hr />
            <div className="py-4 flex justify-between">
              <button className="btn btn-gray border-2 border-gray-100 hover:border-gray-300 hover:text-amber-700 py-2 px-4">
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SocialInfo;
