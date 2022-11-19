import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { Settings } from "constants/Settings";

function VerifyEmail() {
  const router = useRouter();
  const params = router.query.email;
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const email = typeof params === "string" ? params.split("||")[1] : "";
    axios
      .get(`${Settings.API_DATA_URL}email/confirm-email`, {
        email: email,
      })
      .then((response) => {
        const res = response.data;
        setMessage(res.message);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen w-screen">
        <h1 className="text-lg font-bold">Loading...</h1>
      </div>
    );
  } else {
    return (
      <div className="flex justify-center items-center h-screen w-screen">
        <h1 className="text-lg text-green-700">{message}</h1>
      </div>
    );
  }
}

export default VerifyEmail;
