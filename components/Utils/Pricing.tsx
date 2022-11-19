import React from "react";

function Pricing() {
  return (
    <div className="h-full w-full md:w-[80%] m-[auto] px-4 mb-16 md:mb-96">
      <div className="flex justify-center py-8 px-4">
        <h2 className="text-lg md:text-2xl font-bold text-[#2c8de7]">
          Find the skills building plan that is right for you
        </h2>
      </div>
      <div className="w-full lg:w-[75%] mx-[auto] flex flex-col md:flex-row justify-between gap-0 md:gap-2 lg:gap-8 bg-red-0">
        {/* Free Plan */}
        <div className="flex-1 w-full md:w-1/2 lg:w-1/3 border-2 border-t-[12px] border-slate-200 border-t-orange-500 rounded-lg shadow-lg px-8 py-16 mb-8 md:mb-2 text-center">
          {/* image */}
          <h2 className="text-3xl font-bold mb-4">Basic Plan</h2>
          <p className="mb-8">
            The basic plan is free for life. Absolutely no charges. This gives
            you access to all our free offerings and content
          </p>
          <h2 className="text-4xl font-bold mb-1">$0 /mo</h2>
          <h2 className="italic mb-5 text-slate-500">Or $0/year</h2>
          <button className="btn bg-orange-600 text-xl text-white px-6 py-2 mb-4">
            SIGNUP NOW
          </button>
          {/* image */}
          <div className="">
            <h2 className="mt-4 font-bold">Access all Free tests</h2>
            <h2 className="text-slate-300">-</h2>
            <h2 className="">Access to first 25 questions on tests</h2>
            <h2 className="text-slate-300">-</h2>
            <h2 className="">Repeat tests</h2>
            <h2 className="text-slate-300">-</h2>
            <h2 className="">View result</h2>
            <h2 className="text-slate-300">-</h2>
            <h2>Track Your Progress</h2>
          </div>
        </div>

        {/* Pro Plan */}
        <div className="flex-1 w-full md:w-1/2 lg:w-1/3 border-2 border-t-[12px] border-slate-200 border-t-[#2c8de7] rounded-lg shadow-lg px-8 py-16 mb-8 md:mb-2 text-center">
          {/* image */}
          <h2 className="text-3xl font-bold mb-4">Pro Plan</h2>
          <p className="mb-8">
            The basic plan is free for life. Absolutely no charges. This gives
            you access to all our free offerings and content
          </p>
          <h2 className="text-4xl font-bold mb-1">$10 /mo</h2>
          <h2 className="italic mb-5 text-slate-500">Or $110/year</h2>
          <button className="btn bg-[#2c8de7] text-xl text-white px-6 py-2 mb-4">
            SIGNUP NOW
          </button>
          {/* image */}
          <div className="">
            <h2 className="mt-4 font-bold">Access Free and Pro tests</h2>
            <h2 className="text-slate-300">-</h2>
            <h2 className="">Access to all questions on tests</h2>
            <h2 className="text-slate-300">-</h2>
            <h2 className="">Repeat tests</h2>
            <h2 className="text-slate-300">-</h2>
            <h2 className="">View result</h2>
            <h2 className="text-slate-300">-</h2>
            <h2>Track Your Progress</h2>
          </div>
        </div>

        {/* Premium Plan */}
        <div className="flex-1 w-full md:w-1/2 lg:w-1/3 border-2 border-t-[12px] border-slate-200 border-t-[#044480] rounded-lg shadow-lg px-8 py-16 text-center">
          {/* image */}
          <h2 className="text-3xl font-bold mb-4">Premium Plan</h2>
          <p className="mb-8">
            The basic plan is free for life. Absolutely no charges. This gives
            you access to all our free offerings and content
          </p>
          <h2 className="text-4xl font-bold mb-1">$20 /mo</h2>
          <h2 className="italic mb-5 text-slate-500">Or $225/year</h2>
          <button className="btn bg-[#044480] text-xl text-white px-6 py-2 mb-4">
            SIGNUP NOW
          </button>
          {/* image */}
          <div className="">
            <h2 className="mt-4 font-bold">Access Free, Pro and Premium tests</h2>
            <h2 className="text-slate-300">-</h2>
            <h2 className="">Access to all questions on tests</h2>
            <h2 className="text-slate-300">-</h2>
            <h2 className="">Repeat tests</h2>
            <h2 className="text-slate-300">-</h2>
            <h2 className="">View result</h2>
            <h2 className="text-slate-300">-</h2>
            <h2>Track Your Progress</h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pricing;
