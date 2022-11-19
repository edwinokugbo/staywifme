import React, { useState, useEffect } from "react";
import axios from "axios";
import { Settings } from "constants/Settings";
import Swal from "sweetalert2";
import Router from "next/router";

function ResetPassword({ passcode }) {
  const [valid, setValid] = useState(0);
  const [user, setUser] = useState({});
  useEffect(() => {
    axios
      .get(`${Settings.API_DATA_URL}util/check-reset-code/${passcode}`)
      .then((response) => {
        if (response.status === 200) {
          setValid(1);
          setUser(response.data);
        } else {
          setValid(2);
        }
      })
      .catch((err) => {
        console.log(err);
        setValid(2);
      });
  }, []);

  const submitForm = (e) => {
    e.preventDefault();

    const pw = e.target.password.value;
    const pw2 = e.target.password2.value;

    if (pw !== pw2) {
      alert("Password and repeat password must be the same!");
      return;
    }

    axios
      .patch(`${Settings.API_DATA_URL}util/reset-password-now`, {
        id: user.id,
        email: user.email,
        password: pw,
      })
      .then((response) => {
        if (response.status === 200) {
          Swal.fire({
            title: "Purpose Thoughts TV Show",
            text: "Password has been updated",
            icon: "success",
          });
          Router.replace("/auth/signin");
        } else {
          console.log("Error reseting password!");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (valid === 0) {
    return (
      <div className="flex justify-center items-center w-screen h-screen px-8">
        <h1 className="text-2xl font-bold text-slate-700">Loading...</h1>
      </div>
    );
  } else if (valid === 1) {
    return (
      <div className="flex justify-center items-center w-screen h-screen px-8">
        <form onSubmit={submitForm}>
          <label>
            <p>New Password</p>
            <input
              type="password"
              name="password"
              className="border-simple px-2 py-2 rounded-md w-full lg:w-full mb-4"
              placeholder="password"
              required
            />
          </label>
          <label>
            <p>Repeat New Password</p>
            <input
              type="password"
              name="password2"
              className="border-simple px-2 py-2 rounded-md w-full lg:w-full mb-4"
              placeholder="repeat password"
              required
            />
          </label>
          <button className="bg-slate-600 hover:bg-orange-600 text-orange-100 hover:text-white w-full border-2 border-gray-100 hover:border-gray-300 py-2 px-4 rounded-sm">
            Reset Now
          </button>
        </form>
      </div>
    );
  } else if (valid === 2) {
    return (
      <div className="flex justify-center items-center w-screen h-screen">
        <h1 className="text-2xl font-bold">
          Sorry! Invalid password reset code. You must use a valid password
          reset link
        </h1>
      </div>
    );
  }
}

export default ResetPassword;
