import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { Settings } from "../../constants/Settings";

type UserType = {
  code: String;
  email: String;
  status: String;
};

function Entercode() {
  const router = useRouter();
  const userid = router.query.userid;
  const [id, setID] = useState("");
  const [user, setUser] = useState<UserType | null>(null);
  const [one, setOne] = useState("");
  const [two, setTwo] = useState("");
  const [three, setThree] = useState("");
  const [four, setFour] = useState("");
  const [five, setFive] = useState("");
  const [six, setSix] = useState("");
  const [invalid, setInvalid] = useState(false);

  // let otp: HTMLDivElement | null = document.querySelector("#otp-screen");

  // if (otp !== null) {
  //   for (let pin of otp!.children) {
  //     pin.onkeyup = function () {
  //       if (pin.nextElementSibling) {
  //         pin.nextElementSibling.focus();
  //       }
  //     };
  //   }
  // }

  // Check if code already exist for use with current ID and get user credentials if exist
  useEffect(() => {
    if (userid) {

      console.log(userid);

      axios
        .post(`${Settings.API_DATA_URL}register/get_user_credentials`, {
          id: userid,
        })
        .then((response) => {
          if (response.status == 200) {
            console.log(response.data)
            setUser(response.data.user);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  const verifyCode = () => {
    const code = one + two + three + four + five + six;

    alert(user?.code);
    if (code === user?.code) {
      setInvalid(false);
    } else {
      setInvalid(true);
      return;
    }
    router.replace(`/signup/profile/${userid}`);
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

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-greyish px-4">
      <div className="flex flex-col items-center w-full md:w-1/2 lg:w-1/3 bg-white rounded-md shadow-sm px-4 py-8">
        {invalid && (
          <div className="bg-greyish px-2 py-2 mb-4 italic text-red-600 rounded-lg">
            Invalid code. Enter a valid code or click on resend code to receive
            another code
          </div>
        )}
        <p className="mb-4 text-lg text-slate-700">
          Enter the code sent to your phone/email and click continue
        </p>
        <p className="mb-4 px-2 py-1 text-black font-bold bg-greyish rounded-2xl">
          {user?.email}
        </p>
        <div className="flex my-4" id="otp-screen">
          <input
            type="text"
            maxLength={1}
            className="w-[45px] h-[45px] md:w-[50px] md:h-[50px] border-simple p-2 rounded-full mb-4 mr-3 text-center text-slate-800 font-bold text-2xl"
            value={one}
            onChange={(e) => setOne(e.target.value)}
            onFocus={() => setOne("")}
          />
          <input
            type="text"
            maxLength={1}
            className="w-[45px] h-[45px] md:w-[50px] md:h-[50px] border-simple p-2 rounded-full mb-4 mr-3 text-center text-slate-800 font-bold text-2xl"
            value={two}
            onChange={(e) => setTwo(e.target.value)}
            onFocus={() => setTwo("")}
          />
          <input
            type="text"
            maxLength={1}
            className="w-[45px] h-[45px] md:w-[50px] md:h-[50px] border-simple p-2 rounded-full mb-4 mr-3 text-center text-slate-800 font-bold text-2xl"
            value={three}
            onChange={(e) => setThree(e.target.value)}
            onFocus={() => setThree("")}
          />
          <input
            type="text"
            maxLength={1}
            className="w-[45px] h-[45px] md:w-[50px] md:h-[50px] border-simple p-2 rounded-full mb-4 mr-3 text-center text-slate-800 font-bold text-2xl"
            value={four}
            onChange={(e) => setFour(e.target.value)}
            onFocus={() => setFour("")}
          />
          <input
            type="text"
            maxLength={1}
            className="w-[45px] h-[45px] md:w-[50px] md:h-[50px] border-simple p-2 rounded-full mb-4 mr-3 text-center text-slate-800 font-bold text-2xl"
            value={five}
            onChange={(e) => setFive(e.target.value)}
            onFocus={() => setFive("")}
          />
          <input
            type="text"
            maxLength={1}
            className="w-[45px] h-[45px] md:w-[50px] md:h-[50px] border-simple p-2 rounded-full mb-4 mr-3 text-center text-slate-800 font-bold text-2xl"
            value={six}
            onChange={(e) => setSix(e.target.value)}
            onFocus={() => setSix("")}
          />
        </div>
        <div className="w-full pb-4 flex justify-between items-center">
          <p className="text-primary-dark cursor-pointer" onClick={resendCode}>
            Resend Code
          </p>
          <button className="btn-primary-dark" onClick={verifyCode}>
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}

export default Entercode;
