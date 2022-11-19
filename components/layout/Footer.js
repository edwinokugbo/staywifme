import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <div className="bg-black text-white grid grid-clos-1 lg:grid-cols-3 px-4 py-8 lg-py-16">
      <div className="px-4 lg:pr-48 py-4 mb-8 lg:mb-0 border-b-2 lg:border-b-0 border-b-slate-700">
        <h3>About Us</h3>
        <p className="text-slate-400">
          StayWifMe.com is the place for meeting the right people. Everyone
          deserves a happy life Everyone also deserves to have someone they can
          share that happy life with. If you seek both a happy life and someone
          to share it with, then you have come to the right place. Our goal is
          to help you find that person to make your dreams come true
        </p>
      </div>
      <div className="px-4 py-4 mb-8 lg:mb-0 border-b-2 lg:border-b-0 border-b-slate-700">
        <h3>Sitemap</h3>
        <ul>
          <li>
            <Link className="text-slate-400" href="/about">
              About
            </Link>
          </li>
          <li>
            <Link className="text-slate-400" href="/blog">
              Blog
            </Link>
          </li>
          <li>
            <Link className="text-slate-400" href="/contact">
              Contact
            </Link>
          </li>
        </ul>
      </div>
      <div className="flex flex-col px-4 py-4 mb-8 lg:mb-0">
        <h3>Subscribe</h3>
        <p className="my-2 text-slate-400">
          Please subscribe to our newsletter below. Just enter your email
          address and click the Subscribe button to subscribe. Thank you
        </p>
        <form
          action="{% url 'newsletter:subscribe' %}"
          method="post"
          className="flex flex-col"
        >
          <label className="mb-2" htmlFor="email">
            Email
          </label>
          <input name="email" type="email" className="w-full lg:w-1/2 h-8" />
          <input
            type="submit"
            className="w-full lg:w-fit bg-accent border-2 border-slate-400 text-white py-1 px-4 mt-2 rounded-lg"
            value="Send"
          />
        </form>
      </div>
    </div>
  );
}
