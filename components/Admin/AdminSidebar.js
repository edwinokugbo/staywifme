import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

function AdminSidebar() {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    const sess = session;
    if (session && session.user.usertype > 3) {
    } else {
      router.replace("/");
    }
  }, []);

  return (
    <div className="min-w-fit bg-gray-800 flex flex-col items-start pt-6 pl-4 lg:pl-3 lg:pr-12">
      <p className="w-full text-white mb-4" title="Dashboard">
        <i className="fas fa-tachometer-alt mr-2"></i>
        <span className="hidden lg:inline">Dashboard</span>
      </p>
      <Link href={`/admin/users`}>
        <a className="text-white text-sm pb-5" title="Users">
          <i className="fas fa-users text-gray-400 mr-2"></i>
          <span className="hidden lg:inline">Users</span>
        </a>
      </Link>
      <Link href={`/admin/posts`}>
        <a className="text-white text-sm pb-5" title="Posts">
          <i className="fas fa-blog text-yellow-500 mr-2"></i>
          <span className="hidden lg:inline">Posts</span>
        </a>
      </Link>
      <Link href={`/admin/audios`}>
        <a className="text-white text-sm pb-5" title="Audio">
          <i className="fas fa-microphone text-slate-400 mr-2"></i>
          <span className="hidden lg:inline">Audio</span>
        </a>
      </Link>
      <Link href={`/admin/videos`}>
        <a className="text-white text-sm pb-5" title="Video">
          <i className="fas fa-video text-red-500 mr-2"></i>
          <span className="hidden lg:inline">Video</span>
        </a>
      </Link>
      <Link href={`/admin/books`}>
        <a className="text-white text-sm pb-5" title="E-Books">
          <i className="fas fa-book text-blue-400 mr-2"></i>
          <span className="hidden lg:inline">E-Books</span>
        </a>
      </Link>
      <Link href={`/admin/subscriptions`}>
        <a className="text-white text-sm pb-5" title="Subscriptions">
          <i className="fas fa-credit-card text-green-500 mr-2"></i>
          <span className="hidden lg:inline">Subscriptions</span>
        </a>
      </Link>
      <Link href={`/admin/media`}>
        <a className="text-white text-sm pb-5" title="Media">
          <i className="fas fa-images text-yellow-700 mr-2"></i>
          <span className="hidden lg:inline">Media</span>
        </a>
      </Link>
      <div className="flex justify-center items-center w-full"></div>
    </div>
  );
}

export default AdminSidebar;
