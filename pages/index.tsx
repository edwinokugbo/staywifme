import Link from "next/link";
import type { ReactElement } from "react";
import Layout from "../components/layout";
// import NestedLayout from '../components/nested-layout'
import type { NextPageWithLayout } from "./_app";

export default function Page() {
  return (
    <div className="main-header__wrapper w-full h-screen">
      {" "}
      <div className="main-header w-full h-screen flex justify-center items-center">
        <div className="bg-[rgb(0,0,0,0.1)] px-8 py-16 rounded-3xl">
          <h2 className="text-[1.5rem] md:text-[4.5rem] font-semibold text-white uppercase">
            Are you looking to...
          </h2>
          <h2 className="text-[1.5rem] md:text-[3.5rem] font-semibold text-primary uppercase">
            Find the love of your life?
          </h2>
          <div className="my-4">
            <Link href="/signin">
              <button className="w-full md:w-1/2 md:block md:mx-auto bg-accent border-2 border-accent text-white py-2 px-4 rounded-2xl mt-4 cursor-pointer font-effect-fire">
                I am looking for a woman
              </button>
            </Link>
            <a href="/signin">
              <button className="w-full md:w-1/2 md:block md:mx-auto bg-accent border-2 border-accent text-white py-2 px-4 rounded-2xl mt-4 cursor-pointer">
                I am looking for a man
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
