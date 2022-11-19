import React from "react";

function Newsticker({ ticker }) {
  return (
    <div className="flex-1 flex w-full max-h-8 lg:max-h-fit lg:whitespace-nowrap overflow-clip bg-amber-700 px-0 mr-0 lg:mr-4 border-0 border-gray-500 rounded-sm">
      <p className="flex items-center bg-amber-400 text-black px-4 mx-0">
        News
      </p>
      <p className="bg-black text-zinc-100 w-full px-4 py-1">{ticker}</p>
    </div>
  );
}

export default Newsticker;
