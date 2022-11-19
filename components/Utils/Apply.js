import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Personalinfo from "components/Registration/Addressinfo";
import Contactinfo from "components/Registration/Basicinfo";
import PrivateInfo from "components/Registration/Personalinfo";
import SocialInfo from "components/Registration/Socialinfo";

function Apply() {
  const { data: session } = useSession();
  const { currentPage, setCurrentPage } = useState(1);

  if (session) {
    return (
      <div className="w-full lg:w-1/2 lg:mx-auto h-fit px-4 pt-4 mt-4 mb-16 border-2">
        {/* {if (currentPage === 1) {
        return <Contactinfo />
        
        } else if (currentPage === 2) {
          <Personalinfo />
        

        } else if (currentPage === 3) {
          <PrivateInfo />
        

        } else if (currentPage === 4) {
          <SocialInfo />
        }} */}

        <div className="py-4 justify-between hidden">
          <button className="btn btn-gray border-2 border-gray-100 hover:border-gray-300 hover:text-amber-700 py-2 px-4">
            Prev
          </button>
          <button className="btn btn-gray border-2 border-gray-100 hover:border-gray-300 hover:text-amber-700 py-2 px-4">
            Save
          </button>
          <button className="btn btn-gray border-2 border-gray-100 hover:border-gray-300 hover:text-amber-700 py-2 px-4">
            Next
          </button>
        </div>
      </div>
    );
  } else {
    return <h1>Not logged in</h1>;
  }
}

export default Apply;
