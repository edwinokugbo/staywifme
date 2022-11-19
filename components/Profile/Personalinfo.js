import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import { Settings } from "constants/Settings";
import Swal from "sweetalert2";

function PersonalInfo() {
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
      .patch(`${Settings.API_DATA_URL}user-personal`, {
        id: session.user.id,
        relationship: event.target.relationship.value,
        occupation: event.target.occupation.value,
        validid: event.target.validid.value,
        languages: event.target.languages.value,
        dob: event.target.dob.value,
        gender: event.target.gender.value,
        height: event.target.height.value,
        disabilities: event.target.disabilities.value,
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
          <h1 className="text-2xl font-bold pb-4">Personal Information</h1>
          <hr />
          <div className="flex flex-col">
            <div className="py-4">
              <p className="pb-2">Relationship Status</p>
              <select
                name="relationship"
                value={user.relationship}
                className="border-simple px-2 py-2 rounded-md w-fit"
              >
                <option value={"single"}>Single</option>
                <option value={"married"}>Married</option>
                <option value={"divorced"}>Divorced</option>
                <option value={"widow"}>Widow/Widower</option>
              </select>
            </div>
            <div className="py-4">
              <p className="pb-2">Occupation</p>
              <input
                name="occupation"
                value={user.occupation}
                onChange={setInput}
                type="text"
                placeholder="Occupation"
                className="border-simple px-2 py-2 rounded-md w-full"
              />
            </div>
            <div className="py-4">
              <p className="pb-2">
                Valid ID (National ID, Voters Card, Drivers License or Int’l
                Passport)
              </p>
              <input
                name="validid"
                value={user.validid}
                onChange={setInput}
                type="text"
                placeholder="Valid ID"
                className="border-simple px-2 py-2 rounded-md w-full"
              />
            </div>
            <div className="py-4">
              <p className="pb-2">Languages Spoken</p>
              <input
                name="languages"
                value={user.languages}
                onChange={setInput}
                type="text"
                placeholder="Languages Spoken"
                className="border-simple px-2 py-2 rounded-md w-full"
              />
            </div>
            <div className="py-4">
              <p className="pb-2">
                Date of Birth (You must be at least 18 years of age at the time
                of submission)
              </p>
              <input
                name="dob"
                value={user.dob}
                onChange={setInput}
                type="date"
                placeholder="Date of Birth"
                className="border-simple px-2 py-2 rounded-md w-full"
              />
            </div>
            <div className="py-4">
              <p className="pb-2">Gender</p>
              <select
                name="gender"
                value={user.gender}
                onChange={setInput}
                className="border-simple px-2 py-2 rounded-md w-fit"
              >
                <option>Male</option>
                <option>Female</option>
              </select>
            </div>
            <div className="py-4">
              <p className="pb-2">Height</p>
              <input
                name="height"
                value={user.height}
                onChange={setInput}
                type="number"
                placeholder="Height"
                className="border-simple px-2 py-2 rounded-md w-full"
              />
            </div>
            <div className="py-4">
              <p className="pb-2">Disabilities</p>
              <input
                name="disabilities"
                value={user.disabilities}
                onChange={setInput}
                type="text"
                placeholder="Please State any medical condition  or disabilities (N/A if None)"
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

export default PersonalInfo;
