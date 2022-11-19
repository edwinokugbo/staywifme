import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import { Settings } from "constants/Settings";
import Swal from "sweetalert2";

function AddressInfo() {
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
      .patch(`${Settings.API_DATA_URL}user-address`, {
        id: session.user.id,
        address: event.target.address.value,
        city: event.target.city.value,
        state: event.target.state.value,
        country: event.target.country.value,
        zipcode: event.target.zipcode.value,
        nationality: event.target.nationality.value,
        state_origin: event.target.state_origin.value,
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
          <h1 className="text-2xl font-bold pb-4">Address Information</h1>
          <hr />
          <div className="flex flex-col">
            <div className="py-4">
              <p className="pb-2">Address</p>
              <input
                name="address"
                type="text"
                placeholder="My Address"
                value={user.address}
                onChange={setInput}
                className="border-simple px-2 py-2 rounded-md w-full"
              />
            </div>
            <div className="py-4">
              <p className="pb-2">City</p>
              <input
                name="city"
                type="text"
                placeholder="City"
                value={user.city}
                onChange={setInput}
                className="border-simple px-2 py-2 rounded-md w-full"
              />
            </div>
            <div className="py-4">
              <p className="pb-2">State</p>
              <input
                name="state"
                type="text"
                placeholder="State of residence"
                value={user.state}
                onChange={setInput}
                className="border-simple px-2 py-2 rounded-md w-full"
              />
            </div>
            <div className="py-4">
              <p className="pb-2">Country</p>
              <input
                name="country"
                type="text"
                placeholder="Country"
                value={user.country}
                onChange={setInput}
                className="border-simple px-2 py-2 rounded-md w-full"
              />
            </div>

            <div className="py-4">
              <p className="pb-2">Postal/Zip Code</p>
              <input
                name="zipcode"
                type="text"
                placeholder="My Zipcode"
                value={user.zipcode}
                onChange={setInput}
                className="border-simple px-2 py-2 rounded-md w-full"
              />
            </div>
            <div className="py-4">
              <p className="pb-2">Nationality</p>
              <input
                name="nationality"
                type="text"
                placeholder="My Nationality"
                value={user.nationality}
                onChange={setInput}
                className="border-simple px-2 py-2 rounded-md w-full"
              />
            </div>
            <div className="py-4">
              <p className="pb-2">State of Origin</p>
              <input
                name="state_origin"
                type="text"
                placeholder="State or origin"
                value={user.state_origin}
                onChange={setInput}
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

export default AddressInfo;
