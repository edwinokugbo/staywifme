import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import BasicInfo from "./Basicinfo";
import Addressinfo from "./Addressinfo";
import PersonalInfo from "./Personalinfo";
import SocialInfo from "./Socialinfo";
import BusinessInfo from "./Businessinfo";
import OtherInfo from "./Otherinfo";
import Link from "next/link";
import axios from "axios";
import { API_DATA_URL } from "constants/Settings";
import useSWR from "swr";
import Swal from "sweetalert2";
import Landing from "./Landing";

function Profile() {
  const { data: session } = useSession();
  const [currentPage, setCurrentPage] = useState(0);
  const [ustatus, setUStatus] = useState("verified");
  const id = session ? session.user.id : "";

  useEffect(() => {
    axios
      .post(`${Settings.API_DATA_URL}get-verify`, {
        id: id,
      })
      .then((response) => {})
      .catch((err) => {
        console.log("Error: ", err);
      });
  }, [session]);

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const nextPage = () => {
    if (currentPage < 6) setCurrentPage(currentPage + 1);
  };

  const resendVerification = () => {
    axios
      .post(`${Settings.API_DATA_URL}resend-verify`, {
        id: session.user.id,
        email: session.user.email,
      })
      .then((response) => {
        Swal.fire({
          title: "Purpose Thoughts",
          text: "Verification Email has been sent to your reistered email",
          icon: "success",
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (session) {
    return (
      <>
        {ustatus === "verified" && (
          <p className="bg-blue-200 text-black py-2 px-8">
            Your email is not yet verified. You will not be able to fully
            participate until your email is verified. Go to your email box and
            click on the VERIFY EMAIL link we sent to you on registration. Click{" "}
            <span
              className="text-blue text-lg font-bold cursor-pointer"
              onClick={resendVerification}
            >
              here
            </span>{" "}
            to resend the verification email
          </p>
        )}
        <div className="flex flex-col md:flex-row px-2 lg:px-8 py-4 lg:py-8 bg-slate-50">
          <div className="px-4 w-full md:w-1/5">
            <h1 className="text-lg font-bold mb-4 hidden">My Information</h1>
            <div className="flex flex-col items-center mb-8">
              <Link href="/user/update-profile-pic">
                <img
                  alt="..."
                  className="w-10 rounded-full align-middle border-none shadow-lg mb-2 cursor-pointer"
                  src={`${
                    session.user.profile_img
                      ? session.user.profile_img
                      : "/img/profile/useroff.png"
                  }`}
                />
              </Link>
              <h1
                className="cursor-pointer my-2"
                onClick={() => setCurrentPage(0)}
              >
                {session.user.name}
              </h1>
              {session.user.payment_status == "paid" && (
                <button
                  className={`w-1/2 border border-red-300 bg-red-600 text-white font-bold text-md py-1 px-2 rounded-sm shadow-md`}
                >
                  Go Pro!
                </button>
              )}
              {session.user.payment_status === "pro" && (
                <p
                  className={`ml-2 border border-slate-200 bg-red-600 text-white font-bold text-xs py-1 px-4 rounded-md`}
                >
                  {session.user.payment_status.toUpperCase()}
                </p>
              )}
              {session.user.payment_status === "premium" && (
                <p
                  className={`ml-2 border border-slate-200 bg-purple-600 text-white font-bold text-xs py-1 px-4 rounded-md`}
                >
                  {session.user.payment_status.toUpperCase()}
                </p>
              )}
            </div>
            <hr className="border-1 border-slate-100 my-4 w-1/2" />
            <ul className="text-center">
              <li
                className="mb-4 hover:text-orange-800 cursor-pointer"
                onClick={() => setCurrentPage(1)}
              >
                Basic
              </li>
              <li
                className="mb-4 hover:text-orange-800 cursor-pointer"
                onClick={() => setCurrentPage(2)}
              >
                Address
              </li>
              <li
                className="mb-4 hover:text-orange-800 cursor-pointer"
                onClick={() => setCurrentPage(3)}
              >
                Personal
              </li>
              <li
                className="mb-4 hover:text-orange-800 cursor-pointer"
                onClick={() => setCurrentPage(4)}
              >
                Social
              </li>
              <li
                className="mb-4 hover:text-orange-800 cursor-pointer"
                onClick={() => setCurrentPage(5)}
              >
                Business
              </li>
              <li
                className="mb-4 hover:text-orange-800 cursor-pointer"
                onClick={() => setCurrentPage(6)}
              >
                Others
              </li>
            </ul>
          </div>
          <div className="w-full">
            <div className="w-full h-fit px-8 py-4 pt-8 mb-16 border-2 rounded-md bg-white shadow-md">
              {currentPage === 0 ? <Landing userid={id} /> : ""}
              {currentPage === 1 ? <BasicInfo /> : ""}
              {currentPage === 2 ? <Addressinfo /> : ""}
              {currentPage === 3 ? <PersonalInfo /> : ""}
              {currentPage === 4 ? <SocialInfo /> : ""}
              {currentPage === 5 ? <BusinessInfo /> : ""}
              {currentPage === 6 ? <OtherInfo /> : ""}
            </div>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <h1 className="w-full h-screen justify-center items-center">
        Not logged in
      </h1>
    );
  }
}

export default Profile;
