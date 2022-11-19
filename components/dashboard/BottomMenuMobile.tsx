import React from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faUser,
  faMessage,
  faWrench,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";

function BottomMenuMobile() {
  return (
    <div className="flex justify-between w-full bg-primary-darker text-white rounded-md px-10 py-3 visible lg:invisible fixed bottom-0">
      <Link href="/dashboard">
        <FontAwesomeIcon icon={faHome} className="text-white" />
      </Link>
      <Link href="/dashboard/profile">
        <FontAwesomeIcon icon={faUser} className="text-white" />
      </Link>
      <Link href="/dashboard/search">
        <FontAwesomeIcon icon={faSearch} className="text-white" />
      </Link>
      <Link href="/dashboard/messages">
        <FontAwesomeIcon icon={faMessage} className="text-white" />
      </Link>
      <Link href="/dashboard/settings">
        <FontAwesomeIcon icon={faWrench} className="text-white" />
      </Link>
    </div>
  );
}

export default BottomMenuMobile;
