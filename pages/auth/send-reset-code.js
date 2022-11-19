import React, { useState } from "react";
import axios from "axios";
import { Settings } from "constants/Settings";
import { useRouter } from "next/router";

function Resetpassword() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(0);
  const router = useRouter();

  const sendResetCode = () => {
    if (email === "") {
      return;
    }
    axios
      .post(Settings.API_DATA_URL + "register/send_reset_code", {
        email,
      })
      .then((response) => {
        const id = response.data.id;
        router.replace(`/auth/reset-password/`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="flex flex-col justify-center items-center w-screen min-h-screen bg-greyish px-4">
      <div className="w-full md-w-1/2 lg:w-1/3 p-8 bg-white rounded-md shadow-lg border-primary-darkest">
        <label className="mb-16">
          <p className="my-4 text-slate-500">
            Enter your phone/email address and a password reset code will be
            sent to the phone/email you registered on the account. Enter the
            code in the provided box to reset your password
          </p>
          <input
            type="email"
            name="email"
            className="border-simple px-2 py-2 rounded-sm w-full lg:w-full"
            placeholder="Phone/Email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <button
          type="submit"
          className="btn-primary-dark mt-4 float-right"
          onClick={sendResetCode}
        >
          Send Reset Code
        </button>
      </div>
    </div>
  );
}

export default Resetpassword;
