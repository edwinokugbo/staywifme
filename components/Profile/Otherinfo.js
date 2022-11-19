import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import { Settings } from "constants/Settings";
import Swal from "sweetalert2";

function OtherInfo() {
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
      .patch(`${Settings.API_DATA_URL}user-others`, {
        id: session.user.id,
        referees: event.target.referees.value,
        how_you_heard: event.target.how_you_heard.value,
        available_time: event.target.available_time.value,
        done_before: event.target.done_before.value,
        done_before_list: event.target.done_before_list.value,
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
          <h1 className="text-2xl font-bold pb-4">Other Information</h1>
          <hr />
          <div className="flex flex-col">
            <div className="py-4">
              <p className="pb-2 text-sm">
                Please list three (3) people whom you have known for over three
                (3) years each, in case we need to get in touch with you on very
                short notice or who can serve as a reference (i.e., Significant
                other, family, roommate, boss, etc.), And please include their
                name, address, phone number, and how you know them:
              </p>
              <textarea
                rows={5}
                cols={100}
                name="referees"
                value={user.referees}
                onChange={setInput}
                placeholder="List of Referees"
                className="border-simple px-2 py-2 rounded-md w-full"
              ></textarea>
            </div>
            <div className="py-4">
              <p className="pb-2">How did you hear about the program?</p>
              <input
                type="text"
                name="how_you_heard"
                value={user.how_you_heard}
                onChange={setInput}
                placeholder="e.g. Internet, a friend, Facebook advert"
                className="border-simple px-2 py-2 rounded-md w-full"
              />
            </div>
            <div>
              <p className="pb-2">
                If accepted into the Programme, will you be available for any
                slated time for the show?
              </p>
              <select
                name="available_time"
                value={user.available_time}
                onChange={setInput}
                className="border-simple px-2 py-2 mb-4 rounded-md w-fit"
              >
                <option value={"Yes"}>Yes</option>
                <option value={"No"}>No</option>
              </select>
            </div>
            <hr />
            <div>
              <p className="pb-2">
                Have you appeared on any television game/reality show,
                commercials or films?
              </p>
              <select
                name="done_before"
                value={user.done_before}
                onChange={setInput}
                className="border-simple px-2 py-2 mb-4 rounded-md w-fit"
              >
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
            <div className="py-4">
              <p className="pb-2">
                If Yes, List shows (including the month and year of your
                appearance, how far you made it on the show, any prizes or
                awards that you won, what network or broadcaster aired the show,
                and any ongoing obligations you may have):
              </p>
              <textarea
                rows={5}
                cols={100}
                name="done_before_list"
                value={user.done_before_list}
                onChange={setInput}
                className="border-simple px-2 py-2 rounded-md w-full"
              ></textarea>
            </div>
            <hr />
            {/* <div className="py-4">
              <label className="flex justify-center items-center px-2 py-4 bold italic bg-orange-200">
                <input
                  type="radio"
                  name="iaccept"
                  value={user.iaccept}
                  onChange={setInput}
                  className="border-simple px-2 py-2 rounded-md w-fit mx-6"
                />
                I accept the terms and conditions of this program as spelt out
                in the terms of service
              </label>
            </div> */}
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

export default OtherInfo;
