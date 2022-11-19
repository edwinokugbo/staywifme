import axios from "axios";
import Router from "next/router";
import React, { useState } from "react";
import { Settings } from "../../constants/Settings";

function Signup() {
  const [above18, setAbove18] = useState(false);
  const [id, setID] = useState("");
  const [message, setMessage] = useState("");

  const acceptAge = () => {
    setAbove18(!above18);
  };

  const continueSignUp = () => {
    axios
      .post(`${Settings.API_DATA_URL}register/signmeup`, {
        id: id,
      })
      .then((response) => {
        const status = response.data.status;
        const messg = response.data.message;
        const uid = response.data.uid;
        if (status === "available") {
          setMessage("");
          Router.push(`/signup/${uid}`);
        } else {
          setMessage(messg);
        }
      })
      .catch((err) => {
        console.log(err);
        setMessage("");
      });
  };

  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-greyish">
      <div className="flex flex-col items-center w-full md:w-2/3 lg:w-1/3 bg-white border-primary-darkest rounded-md shadow-sm mx-4 px-4 py-8">
        <p className="mb-4 text-slate-700">
          We are very passionate about user safety. That is why we work hard to
          make sure that everyone who registers on this platform is a real human
          being with a real identity. This starts with a valid phone/email
          address.
        </p>
        <input
          type="text"
          placeholder="Enter Phone/Email"
          className="border-simple px-2 py-2 rounded-md w-full lg:w-full mb-4"
          onChange={(e) => setID(e.target.value)}
        />
        <p className="w-full text-red-600 text-right italic">{message}</p>
        <div className="mb-4">
          <input
            type="checkbox"
            name="above18"
            className="mr-2"
            onChange={acceptAge}
          />{" "}
          <span className="text-lg text-slate-700 italic">
            I am above 18 years old
          </span>
        </div>
        {above18 && (
          <button className="btn-primary-dark" onClick={continueSignUp}>
            Continue
          </button>
        )}
      </div>
    </div>
  );
}

export default Signup;
