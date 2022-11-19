import React from "react";
import Link from "next/link";
import { black } from "tailwindcss/colors";
import SignInOut from "../../components/utils/SignInOut.js";
import { useSession } from "next-auth/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faSearch } from "@fortawesome/free-solid-svg-icons";
import {
  faFacebook,
  faTwitter,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";

type NavProps = {
  fixed: true | false;
};

export default function Navbar(props: NavProps) {
  const { data: session } = useSession();
  const [navbarOpen, setNavbarOpen] = React.useState(false);
  const [displaySearch, setDisplaySearch] = React.useState(false);
  return (
    <div className="nav-wrapper bg-primary-darkest">
      <nav
        className={`top-0 navbar ${props.fixed} ${black} z-50 w-full h-auto lg:h-18 flex flex-wrap items-center justify-between px-2 navbar-expand-lg`}
      >
        <div className="container1 w-full lg:w-2/3 px-4 mx-auto flex flex-wrap items-center justify-between">
          <div
            tabIndex={0}
            className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start px-2 rounded-tr-2xl rounded-bl-2xl"
          >
            <Link
              href="/"
              className="text-blueGray-700 text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase"
              passHref
            >
              <h2 className="text-[#9dd7fe] hover:text-primary-darker text-2xl md:text-3xl font-bold normal-case rounded-lg shadow-lg border-0 border-slate-600 px-2 lg:px-8 py-1">
                Staywifme.com
              </h2>
            </Link>
            <button
              className="cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
              type="button"
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              <FontAwesomeIcon icon={faBars} className="text-white" />
            </button>
          </div>
          <div
            className={
              "lg:flex flex-grow justify-end items-center bg-primary-dark lg:bg-transparent lg:bg-opacity-0 lg:shadow-none px-4 py-8 lg:px-0 lg:py-0 z-10 lg:z-1" +
              (navbarOpen ? " block" : " hidden")
            }
            id="example-navbar-warning"
          >
            <ul
              id="rightside-ul"
              className="flex flex-col lg:flex-row list-none lg:ml-auto"
            >
              <li tabIndex={0} className="flex items-center">
                <Link href="/about">
                  <span className="topmenu-item">About</span>
                </Link>
              </li>
              <li tabIndex={0} className="flex items-center mx-4">
                <Link href="/pricing">
                  <span className="topmenu-item">Pricing</span>
                </Link>
              </li>
              <li tabIndex={0} className="flex items-center"></li>
              <li tabIndex={0} className="flex items-center">
                <Link
                  className="hover:text-slate-300 text-slate-100 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                  href="https://www.facebook.com/staywifme"
                  target="_blank"
                  rel="noreferrer"
                >
                  <FontAwesomeIcon
                    icon={faFacebook}
                    className="text-slate-300 text-lg leading-lg"
                  />
                  <span className="lg:hidden inline-block ml-2">Share</span>
                </Link>
              </li>

              <li tabIndex={0} className="flex items-center">
                <a
                  className="hover:text-slate-300 text-slate-100 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                  href="https://twitter.com/staywifme"
                  target="_blank"
                  rel="noreferrer"
                >
                  <FontAwesomeIcon
                    icon={faTwitter}
                    className="text-slate-300 text-lg leading-lg"
                  />
                  <span className="lg:hidden inline-block ml-2">Tweet</span>
                </a>
              </li>

              <li tabIndex={0} className="flex items-center">
                <Link
                  className="hover:text-slate-300 text-slate-100 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                  href="https://instagram.com/staywifme"
                  target="_blank"
                  rel="noreferrer"
                >
                  <FontAwesomeIcon
                    icon={faInstagram}
                    className="text-slate-300 text-lg leading-lg"
                  />
                  <span className="lg:hidden inline-block ml-2">Star</span>
                </Link>
              </li>
              <li className="">
                <div
                  className={
                    "flex items-center justify-start transition-all duration-1000 ease-in-out " +
                    (displaySearch ? " block" : " hidden")
                  }
                >
                  <input
                    type="text"
                    className="border-2 border-primary hover:border-greyish rounded-sm ml-2 mr-1 px-2 py-1 w-40 h-8 shadow-2xl"
                  />
                  <button className="btn-primary">Search</button>
                </div>
              </li>
              <button
                className="flex items-start justify-start py-3 mx-4 pointer-cursor"
                onClick={() => setDisplaySearch(!displaySearch)}
                title="Toggle Search"
              >
                <FontAwesomeIcon
                  icon={faSearch}
                  className="text-slate-300 text-lg leading-lg"
                />
              </button>
              <SignInOut />
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
