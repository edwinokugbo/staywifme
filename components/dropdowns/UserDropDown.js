import React from "react";
// import { createPopper } from "@popperjs/core";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useSession } from "next-auth/react";

const UserDropdown = () => {
  const { data: session } = useSession();
  const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false);
  const btnDropdownRef = React.createRef();
  const popoverDropdownRef = React.createRef();
  const openDropdownPopover = () => {
    createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
      placement: "bottom-start",
    });
    setDropdownPopoverShow(true);
  };
  const closeDropdownPopover = () => {
    setDropdownPopoverShow(false);
  };
  return (
    <>
      <a
        className="text-blueGray-500 block"
        href="#pablo"
        ref={btnDropdownRef}
        onClick={(e) => {
          e.preventDefault();
          dropdownPopoverShow ? closeDropdownPopover() : openDropdownPopover();
        }}
      >
        <div className="items-center flex mb-6 md:mb-0">
          <span className="w-8 h-8 text-sm text-white bg-blueGray-200 inline-flex items-center justify-center rounded-full mt-2 ml-2">
            <img
              alt="..."
              className="w-full rounded-full align-middle border-none shadow-lg"
              src={`${session.user.profile_img ? session.user.profile_img : "/img/profile/useroff.png"}`}
            />
          </span>
          {session.user.payment_status == "paid" && <p className="w-fit bg-red-600 text-white px-2 py-1 rounded-md ml-2">Pro User</p>}
        </div>
      </a>
      <div
        ref={popoverDropdownRef}
        className={
          (dropdownPopoverShow ? "block " : "hidden ") +
          "bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48"
        }
      >
        <Link href="/user/profile">
          <div
            className={
              "text-sm py-2 pl-4 pr-10 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700 cursor-pointer"
            }
          >
            My Profile
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
    </>
  );
};

export default UserDropdown;
