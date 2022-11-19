import React, { useState, useRef } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import Swal from "sweetalert2";
import Router from "next/router";
import { Settings } from "../constants/Settings";

type UserType = {
  firstname: String;
  middlename: String;
  lastname: String;
  email: String;
  phone: String;
  password: String;
  rpassword: String;
};

function Register() {
  const { data: session } = useSession();
  const [user, setUser] = useState<UserType>({} as UserType);
  const iaccept = useRef();
  const [savebut, setSavebut] = useState(true);
  const [emailok, setEmailOK] = useState(false);
  const [phoneok, setPhoneOK] = useState(false);

  const saveNewUser = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (!emailok || !phoneok) {
      alert("Email or Phone is invalid You must fix this to continue...");
      return;
    }

    const pw = user.password;
    const pw2 = user.rpassword;

    if (pw !== pw2) {
      alert("Password and repeat password must be the same");
      return;
    }

    // console.log(user);

    axios
      .post(`${Settings.API_DATA_URL}register`, {
        firstname: user.firstname,
        middlename: user.middlename,
        lastname: user.lastname,
        email: user.email,
        phone: user.phone,
        password: user.password,
      })
      .then((response) => {
        const res = response.data;
        if (response.status === 201) {
          Swal.fire({
            title: "StayWifMe",
            text: "Registration Successful!",
            icon: "success",
          });
          Router.replace("/auth/signin");
        }
      })
      .catch((error) => {
        console.log(error);
        Swal.fire({
          title: "Klazroom",
          text: "Could not save user!",
          icon: "error",
        });
      });
  };

  const checkEmailAvailable = () => {
    checkIDAvailable(1);
  };

  const checkPhoneAvailable = () => {
    checkIDAvailable(2);
  };

  const checkIDAvailable = (id: Number) => {
    axios
      .post(`${Settings.API_DATA_URL}auth/is_user_registered`, {
        email: user.email,
        phone: user.phone,
      })
      .then((response) => {
        const res = response.data;

        let messageTaken = "";
        let messageOK = "";
        let idStatus: HTMLParagraphElement | null = null;

        if (res.status === "found") {
          if (id == 1) {
            idStatus = document.getElementById(
              "email-status"
            ) as HTMLParagraphElement | null;
            messageTaken = "Email is already taken";
            messageOK = "Email is OK";
            setEmailOK(false);
          } else {
            idStatus = document.getElementById(
              "phone-status"
            ) as HTMLParagraphElement | null;
            messageTaken = "Phone is already taken";
            messageOK = "Phone is OK";
            setPhoneOK(false);
          }

          idStatus!.innerHTML = messageTaken;
          idStatus!.style.color = "red";
        } else {
          if (id == 1) {
            idStatus = document.getElementById(
              "email-status"
            ) as HTMLParagraphElement | null;
            messageTaken = "Email is already taken";
            messageOK = "Email is OK";
            setEmailOK(true);
          } else {
            idStatus = document.getElementById(
              "phone-status"
            ) as HTMLParagraphElement | null;
            messageTaken = "Phone is already taken";
            messageOK = "Phone is OK";
            setPhoneOK(true);
          }

          idStatus!.innerHTML = messageOK;
          idStatus!.style.color = "green";
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const checkIAccept = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSavebut(!savebut);
  };

  const setUserValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.value;
    setUser({ ...user, [name]: value });
  };

  if (!session) {
    return (
      <div className="flex flex-col items-center justify-start w-screen h-full mb-16 px-4 pt-2">
        <div className="w-full md:w-4/5 lg:w-2/5 py-4 px-2 md:px-8  border-2 border-gray-100">
          <h1 className="text-2xl font-bold pb-4">Sign Up</h1>
          <hr />
          <form onSubmit={saveNewUser}>
            <div className="flex flex-col">
              <div className="py-4">
                <p className="pb-2">
                  FirstName <span className="text-red-600">*</span>
                </p>
                <input
                  name="firstname"
                  type="text"
                  placeholder="FirstName"
                  onChange={setUserValue}
                  className="border-simple px-2 py-2 rounded-md w-full lg:w-full"
                  required
                />
              </div>
              <div className="py-4">
                <p className="pb-2">MiddleName</p>
                <input
                  name="middlename"
                  type="text"
                  placeholder="MiddleName"
                  onChange={setUserValue}
                  className="border-simple px-2 py-2 rounded-md w-full lg:w-full"
                />
              </div>
              <div className="py-4">
                <p className="pb-2">
                  LastName <span className="text-red-600">*</span>
                </p>
                <input
                  name="lastname"
                  type="text"
                  placeholder="LastName"
                  onChange={setUserValue}
                  className="border-simple px-2 py-2 rounded-md w-full lg:w-full"
                  required
                />
              </div>
              <div className="py-4">
                <p className="pb-2">
                  Email <span className="text-red-600">*</span>
                </p>
                <input
                  name="email"
                  type="text"
                  placeholder="My email"
                  onChange={setUserValue}
                  className="border-simple px-2 py-2 rounded-md w-full lg:w-full"
                  onBlur={checkEmailAvailable}
                  required
                />
                <p id="email-status" className="mt-2 px-4 text-right"></p>
              </div>
              <div className="py-4">
                <p className="pb-2">
                  Phone <span className="text-red-600">*</span>
                </p>
                <input
                  name="phone"
                  type="text"
                  placeholder="My Phone number"
                  onChange={setUserValue}
                  className="border-simple px-2 py-2 rounded-md w-full lg:w-full"
                  onBlur={checkPhoneAvailable}
                  required
                />
                <p id="phone-status" className="mt-2 px-4 text-right"></p>
              </div>
              <div className="py-4">
                <p className="pb-2">
                  Password <span className="text-red-600">*</span>
                </p>
                <input
                  name="password"
                  type="password"
                  onChange={setUserValue}
                  className="border-simple px-2 py-2 rounded-md w-full lg:w-full"
                  required
                />
              </div>
              <div className="py-4">
                <p className="pb-2">
                  Repeat Password <span className="text-red-600">*</span>
                </p>
                <input
                  name="rpassword"
                  type="password"
                  onChange={setUserValue}
                  className="border-simple px-2 py-2 rounded-md w-full lg:w-full"
                  required
                />
              </div>
              <div className="py-4">
                <label className="flex justify-center items-center px-2 py-4 bold italic bg-orange-200">
                  <input
                    // ref={iaccept}
                    type="checkbox"
                    name="iaccept"
                    className="border-simple px-2 py-2 rounded-md w-fit mx-6"
                    onChange={checkIAccept}
                  />
                  I accept the terms and conditions of this program as spelt out
                  in the terms of service
                </label>
              </div>

              <hr />
              <div className="py-4 flex justify-start">
                <button
                  disabled={savebut ? true : null}
                  className={`btn ${
                    savebut ? "" : "bg-blue-600 text-white"
                  } border-2 border-gray-100 hover:border-gray-300 hover:text-amber-700 py-2 px-4`}
                >
                  Register
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  } else {
    return <h1>Not logged in</h1>;
  }
}

export default Register;
