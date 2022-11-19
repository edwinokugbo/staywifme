import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import { Settings } from "constants/Settings";
import Swal from "sweetalert2";

function BasicInfo() {
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

    let passw = event.target.password.value;

    if (passw != "" && passw.length < 6) {
      alert(
        "Password must be at least, 6 chars. Leave the password field blank if you dont want to change the password"
      );
      return;
    }

    axios
      .patch(`${Settings.API_DATA_URL}user-basic`, {
        id: session.user.id,
        firstname: event.target.firstname.value,
        middlename: event.target.middlename.value,
        lastname: event.target.lastname.value,
        email: event.target.email.value,
        phone: event.target.phone.value,
        password: event.target.password.value,
        bio: event.target.bio.value,
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
    <div className="flex flex-col items-center justify-start">
      <p>
        Please, fill out all information correctly. Submitting a wrong or false
        information will disqulify you. Use the PREV and NEXT buttons to
        navigate to other pages.{" "}
      </p>
      <div className="w-full mt-8">
        <form onSubmit={saveUserData}>
          <h1 className="text-2xl font-bold pb-4">Basic Information</h1>
          <hr />
          <div className="flex flex-col">
            <div className="py-4">
              <p className="pb-2">FirstName</p>
              <input
                type="text"
                placeholder="First Name"
                name="firstname"
                value={user.firstname}
                onChange={setInput}
                className="border-simple px-2 py-2 rounded-md w-full"
              />
            </div>
            <div className="py-4">
              <p className="pb-2">MidName</p>
              <input
                name="middlename"
                type="text"
                placeholder="Middle Name"
                value={user.middlename}
                onChange={setInput}
                className="border-simple px-2 py-2 rounded-md w-full"
              />
            </div>
            <div className="py-4">
              <p className="pb-2">LastName</p>
              <input
                name="lastname"
                type="text"
                placeholder="Last Name"
                value={user.lastname}
                onChange={setInput}
                className="border-simple px-2 py-2 rounded-md w-full"
              />
            </div>
            <div className="py-4">
              <p className="pb-2">Email</p>
              <input
                name="email"
                type="text"
                placeholder="My email"
                value={user.email}
                onChange={setInput}
                className="border-simple px-2 py-2 rounded-md w-full"
              />
            </div>
            <div className="py-4">
              <p className="pb-2">Phone</p>
              <input
                name="phone"
                value={user.phone}
                onChange={setInput}
                type="phone"
                placeholder="My Phone number"
                className="border-simple px-2 py-2 rounded-md w-full"
              />
            </div>
            <div className="py-4">
              <p className="pb-2">Alt Phone</p>
              <input
                name="altphone"
                value={user.altphone}
                onChange={setInput}
                type="text"
                placeholder="Alt Phone number"
                className="border-simple px-2 py-2 rounded-md w-full"
              />
            </div>
            <div className="py-4">
              <p className="pb-2">
                Password (only enter a new password here if you wish to change
                your password)
              </p>
              <input
                name="password"
                onChange={setInput}
                type="text"
                placeholder="new password"
                className="border-simple px-2 py-2 rounded-md w-full"
              />
            </div>
            <div className="py-4">
              <p className="pb-2 text-sm">
                Briefly tell us about yourself. Make an impression on us with a
                few paragraphs of your bio
              </p>
              <textarea
                rows={5}
                cols={100}
                name="bio"
                value={user.bio}
                onChange={setInput}
                placeholder=""
                className="border-simple px-2 py-2 rounded-md w-full"
              ></textarea>
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

export default BasicInfo;
