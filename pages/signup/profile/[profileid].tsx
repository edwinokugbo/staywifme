import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { Settings } from "../../../constants/Settings";

type RegType = {
  email: String;
  verificationCode: String;
  status: String;
};

type UserType = {
  firstname: string;
  lastname: string;
  // phone: String;
  password: string;
  password2: string;
};

function Entercode() {
  const router = useRouter();
  const userid = router.query.profileid;
  const [id, setID] = useState("");
  const [reg, setReg] = useState<RegType>({} as RegType);
  const [user, setUser] = useState<UserType>({} as UserType);
  const [invalid, setInvalid] = useState(false);

  // Check if code already exist for use with current ID and get user credentials if exist
  useEffect(() => {
    if (userid) {
      axios
        .post(`${Settings.API_DATA_URL}register/get_user_credentials`, {
          id: userid,
        })
        .then((response) => {
          if (response.status == 200) {
            console.log("success");
            setReg(response.data.user);
          }
          if (response.status == 200) {
            console.log("not found");
          }
          console.log(response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  const setUserValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.value;
    setUser({ ...user, [name]: value });
  };

  const saveProfile = () => {
    if (user.password != user.password2) {
      alert("Passwords do not match");
      return;
    }
    axios
      .patch(`${Settings.API_DATA_URL}profile/save_basic`, {
        ...user,
        id: userid,
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-greyish px-4">
      <div className="flex flex-col items2-center w-full md:w-1/2 lg:w-1/3 bg-white rounded-md shadow-sm px-4 py-8">
        {invalid && (
          <div className="bg-greyish px-2 py-2 mb-4 italic text-red-600 rounded-lg">
            Invalid code. Enter a valid code or click on resend code to receive
            another code
          </div>
        )}
        <p className="mb-4 text-lg text-slate-700">
          Fill out the fields below to SignUp Please, do not provide false
          information. If we find out your iformation is false, your account
          will be deactivated. Cheers!
        </p>
        <p className="w-fit mb-4 mx-auto py-1 px-2 text-black font-bold bg-greyish rounded-2xl">
          {reg?.email}
        </p>
        <div className="mb-2">
          <label>Firstname</label>
          <input
            type="text"
            className="w-full border-simple mt-2 py-2 px-2 rounded-lg mb-4 text-slate-600 font-bold"
            placeholder="firstname"
            name="firstname"
            value={user.firstname}
            onChange={setUserValue}
          />
        </div>
        <div className="mb-2">
          <label>Lastname</label>
          <input
            type="text"
            className="w-full border-simple mt-2 py-2 px-2 rounded-lg mb-4 text-slate-600 font-bold"
            placeholder="lastname"
            name="lastname"
            value={user.lastname}
            onChange={setUserValue}
          />
        </div>
        <div className="mb-2">
          <label>Password</label>
          <input
            type="password"
            className="w-full border-simple mt-2 py-2 px-2 rounded-lg mb-4 text-slate-600 font-bold"
            placeholder="password"
            name="password"
            value={user.password}
            onChange={setUserValue}
          />
        </div>
        <div className="mb-2">
          <label>Repeat Password</label>
          <input
            type="password"
            className="w-full border-simple mt-2 py-2 px-2 rounded-lg mb-4 text-slate-600 font-bold"
            placeholder="password2"
            name="password2"
            value={user.password2}
            onChange={setUserValue}
          />
        </div>
        <div className="w-full pb-4 flex justify-end items-center">
          <button className="btn-primary-dark" onClick={saveProfile}>
            Save Profile
          </button>
        </div>
      </div>
    </div>
  );
}

export default Entercode;
