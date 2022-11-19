import { useState } from "react";
import UserDropdown from "/components/dropdowns/UserDropDown";
import { useSession, signIn, signOut } from "next-auth/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

export default function SignInOut() {
  const { data: session } = useSession();
  const [showlogin, setShowLogin] = useState(0);

  if (session) {
    return (
      <>
        {/* <UserDropdown /> */}
        <div className="custom-dropdown">
          <button className="dropbtn text-white ml-0 lg:ml-4">
            <FontAwesomeIcon icon={faCaretDown} className="text-white" />
          </button>
          <div className="custom-dropdown-content">
            <Link href="/dashboard">
              <div
                className={
                  "text-sm py-2 pl-4 pr-10 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700 cursor-pointer"
                }
              >
                Dashboard
              </div>
            </Link>
            <a
              href="#pablo"
              className={
                "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
              }
              onClick={(e) => e.preventDefault()}
            >
              Settings
            </a>
            <div className="h-0 my-2 border border-solid border-blueGray-100" />
            <Link href="/admin/">
              <p
                className={
                  "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700 cursor-pointer"
                }
              >
                Site Admin
              </p>
            </Link>
            <div className="h-0 my-2 border border-solid border-blueGray-100" />
            <a
              href="#"
              className={
                "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
              }
              onClick={() => signOut()}
            >
              Sign Out
            </a>
          </div>
        </div>
      </>
    );
  }
  return (
    <>
      <Link href="/auth/signin" className="mt-0.5">
        <button className="bg-accent border-2 border-slate-100 text-white py-0 px-4 mx-4 mb-4 lg:mb-0 mt-0 lg:mt-1 rounded-2xl">
          SignIn
        </button>
      </Link>
      <Link href="/signup" className="mt-0.5">
        <button className="bg-primary-dark border-2 border-slate-100 text-white py- px-4 mt-0 lg:mt-1 rounded-2xl">
          SignUp
        </button>
      </Link>
      {showlogin && <LoginBox />}
    </>
  );
}

const LoginBox = () => {
  return (
    <div className="w-screen h-screen bg-[rgba(0,0,0,0.61)] mt-16 fixed top-0 left-0 flex justify-center items-center">
      <div className="w-full lg:w-[500px] bg-slate-200 rounded-md shadow-sm shadow-white">
        <div className="bg-accent text-white flex justify-center items-center py-6 mb-4">
          <h2 className="text-3xl font-semibold uppercase">Login</h2>
          <hr />
        </div>
        <div className="px-8 pt-8 pb-16">
          <input
            type="text"
            placeholder="email or username"
            className="w-full border-b-2 border-slate-500 h-[40px] px-2 py-2 mb-8"
          />
          <input
            type="password"
            placeholder="password"
            className="w-full border-b-2 border-slate-500 h-[40px] px-2 py-2"
          />
          <input
            type="submit"
            value="Login"
            className="w-full bg-accent border-2 border-slate-100 text-white mt-8 py-2 px-4 rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};
