import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import { Settings } from "constants/Settings";
import Swal from "sweetalert2";

function BusinessInfo() {
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
      .patch(`${Settings.API_DATA_URL}user-business`, {
        id: session.user.id,
        organisation: event.target.organisation.value,
        org_address: event.target.org_address.value,
        org_city: event.target.org_city.value,
        org_state: event.target.org_state.value,
        org_country: event.target.org_country.value,
        org_website: event.target.org_website.value,
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
          <h1 className="text-2xl font-bold pb-4">Organisation Information</h1>
          <hr />
          <div className="flex flex-col">
            <div className="py-4">
              <p className="pb-2">Organisation Name</p>
              <input
                type="text"
                name="organisation"
                value={user.organisation}
                onChange={setInput}
                placeholder="Your Organisation/Company Name"
                className="border-simple px-2 py-2 rounded-md w-full"
              />
            </div>
            <div className="py-4">
              <p className="pb-2">Address</p>
              <input
                type="text"
                name="org_address"
                value={user.org_address}
                onChange={setInput}
                placeholder="Your Organisation Address"
                className="border-simple px-2 py-2 rounded-md w-full"
              />
            </div>
            <div className="py-4">
              <p className="pb-2">City</p>
              <input
                type="text"
                name="org_city"
                value={user.org_address}
                onChange={setInput}
                placeholder="Your Organisation City"
                className="border-simple px-2 py-2 rounded-md w-full"
              />
            </div>
            <div className="py-4">
              <p className="pb-2">State</p>
              <input
                type="text"
                name="org_state"
                value={user.org_state}
                onChange={setInput}
                placeholder="Your Organisation State"
                className="border-simple px-2 py-2 rounded-md w-full"
              />
            </div>
            <div className="py-4">
              <p className="pb-2">Country</p>
              <input
                type="text"
                name="org_country"
                value={user.org_country}
                onChange={setInput}
                placeholder="Your Organisation Country"
                className="border-simple px-2 py-2 rounded-md w-full"
              />
            </div>
            <div className="py-4">
              <p className="pb-2">Website</p>
              <input
                type="text"
                name="org_website"
                value={user.org_website}
                onChange={setInput}
                placeholder="Your Organisation Website"
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

export default BusinessInfo;
