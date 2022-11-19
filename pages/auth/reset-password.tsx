import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { Settings } from "../../constants/Settings";
import { verify } from "crypto";

type UserType = {
  code: String;
  email: String;
  status: String;
  id: string;
};

function ResetPassword() {
  const router = useRouter();
  const userid = router.query.userid;
  const [id, setID] = useState("");
  const [user, setUser] = useState<UserType>({} as UserType);
  const [one, setOne] = useState("");
  const [two, setTwo] = useState("");
  const [three, setThree] = useState("");
  const [four, setFour] = useState("");
  const [five, setFive] = useState("");
  const [six, setSix] = useState("");
  const [invalid, setInvalid] = useState(false);
  const [validcode, setValidCode] = useState(false);
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [message2, setMessage2] = useState("");

  // Check if code already exist for use with current ID and get user credentials if exist
  const getEmailCredentials = () => {
    axios
      .post(`${Settings.API_DATA_URL}register/get_email_credentials`, {
        id: id,
      })
      .then((response) => {
        if (response.status == 200) {
          console.log(response.data);
          setUser(response.data.user);
          const saved_code = response.data.user.code;
          verifyCode(saved_code);
        }
      })
      .catch((err) => {
        console.log(err);
        setInvalid(true);
      });
  };
  const setCode = (e: React.ChangeEvent<HTMLInputElement>, num: Number) => {
    switch (num) {
      case 1:
        setOne(e.target.value);
        e.currentTarget.nextElementSibling?.focus();
        break;
      case 2:
        setTwo(e.target.value);
        e.currentTarget.nextElementSibling!.focus();
        break;
      case 3:
        setThree(e.target.value);
        e.currentTarget.nextElementSibling!.focus();
        break;
      case 4:
        setFour(e.target.value);
        e.currentTarget.nextElementSibling!.focus();
        break;
      case 5:
        setFive(e.target.value);
        e.currentTarget.nextElementSibling!.focus();
        break;
      case 6:
        setSix(e.target.value);
        break;
      default:
        break;
    }
  };

  const verifyCode = (saved_code: String) => {
    const code = one + two + three + four + five + six;

    if (code == "") {
      return;
    }

    if (code === saved_code) {
      setInvalid(false);
      setValidCode(true);
    } else {
      setInvalid(true);
      setValidCode(false);
      return;
    }
    // router.replace(`/signup/profile/${userid}`);
  };

  const saveResetPassword = () => {
    // Check password policy before save
    if (password !== password2) {
      setMessage2("Passwords do not match! Check your entered text");
      return;
    }
    if (password.length < 6) {
      setMessage2("Password must be at least, 6 characters long");
      return;
    }
    var regEx = /^[0-9a-zA-Z]+$/;
    if (!password.match(regEx)) {
    } else {
      setMessage2("Password must contain both letters and numbers!");
      // return;
    }

    setMessage2("");

    // Save password to DB
    axios
      .patch(`${Settings.API_DATA_URL}register/save_reset_password`, {
        id: user.id,
        password,
      })
      .then((response) => {
        console.log(response.data);
        router.replace("/auth/signin");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const resendCode = () => {
    axios
      .post(`${Settings.API_DATA_URL}register/resendcode`, {
        id: userid,
      })
      .then((response) => {
        if (response.status == 200) {
          alert("New code has been sent to your registered email");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (validcode) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-greyish px-4">
        <div className="flex flex-col items-center w-full md:w-1/2 lg:w-1/3 bg-white rounded-md shadow-sm px-4 py-8">
          {message2 != "" && (
            <div className="bg-greyish px-2 py-2 mb-4 italic text-red-600 rounded-lg">
              {message2}
            </div>
          )}
          <h2 className="w-full text-lg font-bold mb-2">
            Change Your Password
          </h2>
          <hr className="border-[2px]" />
          <div className="w-full">
            <input
              type="password"
              placeholder="Password"
              className="w-full border-simple mb-4 px-2 py-2"
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="Repeat Password"
              className="w-full border-simple mb-4 px-2 py-2"
              onChange={(e) => setPassword2(e.target.value)}
            />
            <div className="w-full text-right">
              {" "}
              <button className="btn-primary-dark" onClick={saveResetPassword}>
                Change Password
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-greyish px-4">
      <div className="flex flex-col items-center w-full md:w-1/2 lg:w-1/3 bg-white rounded-md shadow-sm px-4 py-8">
        {invalid && (
          <div className="bg-greyish px-2 py-2 mb-4 italic text-red-600 rounded-lg">
            Invalid code or phone/email. Enter a valid code or click on resend
            code to receive another code
          </div>
        )}
        <p className="mb-4 text-lg text-slate-700">
          Enter the code sent to your phone/email and click continue
        </p>
        <div className="w-full">
          <input
            type="text"
            placeholder="Phone/Email"
            className="w-full border-simple mt-2 px-2 py-2"
            onChange={(e) => setID(e.target.value)}
          />
        </div>
        <hr className="w-full border-[1px] border-slate-100 my-8" />
        <div className="w-full text-center">Reset Code</div>
        <div className="flex my-4">
          <input
            id="codeboxOne"
            type="text"
            maxLength={1}
            className="w-[45px] h-[45px] md:w-[50px] md:h-[50px] lg:w-[70px] lg:h-[70px] border-simple p-2 rounded-full mb-4 mr-3 text-center text-slate-800 font-bold text-2xl"
            value={one}
            onChange={(e) => setCode(e, 1)}
            onFocus={() => setOne("")}
          />
          <input
            type="text"
            maxLength={1}
            className="w-[45px] h-[45px] md:w-[50px] md:h-[50px] lg:w-[70px] lg:h-[70px] border-simple p-2 rounded-full mb-4 mr-3 text-center text-slate-800 font-bold text-2xl"
            value={two}
            onChange={(e) => setCode(e, 2)}
            onFocus={() => setTwo("")}
          />
          <input
            type="text"
            maxLength={1}
            className="w-[45px] h-[45px] md:w-[50px] md:h-[50px] lg:w-[70px] lg:h-[70px] border-simple p-2 rounded-full mb-4 mr-3 text-center text-slate-800 font-bold text-2xl"
            value={three}
            onChange={(e) => setCode(e, 3)}
            onFocus={() => setThree("")}
          />
          <input
            type="text"
            maxLength={1}
            className="w-[45px] h-[45px] md:w-[50px] md:h-[50px] lg:w-[70px] lg:h-[70px] border-simple p-2 rounded-full mb-4 mr-3 text-center text-slate-800 font-bold text-2xl"
            value={four}
            onChange={(e) => setCode(e, 4)}
            onFocus={() => setFour("")}
          />
          <input
            type="text"
            maxLength={1}
            className="w-[45px] h-[45px] md:w-[50px] md:h-[50px] lg:w-[70px] lg:h-[70px] border-simple p-2 rounded-full mb-4 mr-3 text-center text-slate-800 font-bold text-2xl"
            value={five}
            onChange={(e) => setCode(e, 5)}
            onFocus={() => setFive("")}
          />
          <input
            type="text"
            maxLength={1}
            className="w-[45px] h-[45px] md:w-[50px] md:h-[50px] lg:w-[70px] lg:h-[70px] border-simple p-2 rounded-full mb-4 mr-3 text-center text-slate-800 font-bold text-2xl"
            value={six}
            onChange={(e) => setCode(e, 6)}
            onFocus={() => setSix("")}
          />
        </div>
        <div className="w-full pb-4 flex justify-between items-center">
          <p className="text-primary-dark cursor-pointer" onClick={resendCode}>
            Resend Code
          </p>
          <button className="btn-primary-dark" onClick={getEmailCredentials}>
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
