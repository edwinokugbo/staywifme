import React from "react";
import Link from "next/link";

function TopMenuBar() {
  return (
    <div className="flex justify-between w-full bg-slate-300 rounded-md px-6 py-3 invisible md:visible">
      <Link href="/dashboard">Home</Link>
      <Link href="/dashboard/profile">Profile</Link>
      <Link href="/dashboard/search">Search</Link>
      <Link href="/dashboard/messages">Messages</Link>
      <Link href="/dashboard/settings">Settings</Link>
    </div>
  );
}

export default TopMenuBar;
