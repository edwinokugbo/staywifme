import React, { useState } from "react";

function Personal() {
  const [message, setMessage] = useState();
  return (
    <div className="w-full">
      <div className="w-full py-4">
        <h2 className="text-lg font-bold">Type of Relationshp</h2>
        <select
          name="relationship"
          id=""
          className="w-full mt-2 p-2 border-2 border-slate-200"
        >
          <option value="gist">A Gist partner</option>
          <option value="friend">A friend/Companion</option>
          <option value="long-term">Long Term Relationship</option>
          <option value="marriage">Possible Marriage</option>
        </select>
      </div>
      <div className="w-full py-4">
        <h2 className="text-lg font-bold">Location</h2>
        <input type="text" name="location" placeholder="Partner Location" />
      </div>
      <div className="w-full py-4">
        <h2 className="text-lg font-bold">Education</h2>
        <select
          name="education"
          id=""
          className="w-full mt-2 p-2 border-2 border-slate-200"
        >
          <option value="all">Not Important</option>
          <option value="secondary-school">Secondary School</option>
          <option value="under-graduate">University (Under Graduate)</option>
          <option value="long-graduate">University (Graduate)</option>
          <option value="post-graduate">University (Post Graduate)</option>
        </select>
      </div>
      <div className="w-full py-4">
        <h2 className="text-lg font-bold">Work Status</h2>
        <select
          name="work_status"
          id=""
          className="w-full mt-2 p-2 border-2 border-slate-200"
        >
          <option value="all">All</option>
          <option value="student">Student</option>
          <option value="unemployed">Unemployed</option>
          <option value="employee">Corporate Employee</option>
          <option value="entrepreneur">Entrepreneur</option>
          <option value="profesional">Skilled Professional</option>
        </select>
      </div>
      <p className="w-full text-red-600 text-right italic">{message}</p>
      <button className="w-full bg-accent text-white border-2 border-greyish py-1 rounded-md">
        Save
      </button>
    </div>
  );
}

export default Personal;
