import React from "react";

function signin() {
  return (
    <div className="w-full min-h-screen">
      <div className="w-screen bg1-[rgba(0,0,0,0.61)] mt-16 fixed top-0 left-0 flex justify-center items-center">
        <div className="w-full lg:w-[500px] bg-slate-50 border-2 rounded-md shadow-sm shadow-white">
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
    </div>
  );
}

export default signin;
