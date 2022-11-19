import React, { useState, useEffect } from "react";
import axios from "axios";
import { Settings } from "constants/Settings";
import { useSession } from "next-auth/react";

function Subscribe() {
  const [agree, setAgree] = useState(false);
  const { data: session } = useSession();

  const doSetAgree = () => {
    setAgree(!agree);
  };

  const subscribeNow = () => {
    console.log(session.user.id);
    axios
      .post(`${Settings.API_DATA_URL}frontend/reg/subscribe_me`, {
        uid: session.user.id,
        check: 1,
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
        console.log(session.user.id);
      });
  };

  return (
    <div className="w-full md:w-[60%] min-h-screen mx-auto px-8 pt-4 bg-white border-2 borer-slate-200">
      <p className="my-4 text-lg">
        Thank you for chosing to subscribe to Purpose Thought. Follow the
        instructions below to subscribe to our service.
      </p>
      <p>
        You must accept the terms and conditions to continue, by clicking on the
        provided checkbox
      </p>
      <hr className="my-4" />
      <div className="flex justify-between">
        <p className="text-xl font-bold text-slate-600">Price</p>
        <p className="text-xl italic text-slate-700">₦‎1000 per Month</p>
      </div>
      <hr className="my-4" />
      <div className="italic text-red-700">
        <input type={"checkbox"} onClick={doSetAgree} /> &nbsp;&nbsp;By
        continuing this subscription, I agree to the terms and conditions of
        this service
      </div>
      <div className="flex justify-end mt-4 pt-4 border-t-2">
        {agree && (
          <button
            className="bg-blue-200 border-2 border-blue-400 rounded-sm mt-4 px-2 py-1"
            onClick={subscribeNow}
          >
            Subscribe Now!
          </button>
        )}
      </div>
    </div>
  );
}

export default Subscribe;
