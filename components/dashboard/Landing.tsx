import React from "react";
import ProfileImage from "../../components/Profile/ProfileImage";
import { useSession } from "next-auth/react";

function Landing() {
  const { data: session } = useSession();

  return (
    <div className="pb-8 bg-slate-100 px-4 pt-4 border-2 border-slate-300">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="">
          <ProfileImage />
        </div>
        <div className="col-span-2 pl-0 md:pl-4">
          <h2 className="text-2xl font-bold">
            {session?.user.firstname + " " + session?.user.lastname}{" "}
            <span className="text-lg font-normal text-primary-darker">
              [{session?.user.email}]
            </span>
          </h2>
          <div className="mt-2">
            <span>Lagos</span>, <span>Nigeria</span>
          </div>
          <div className="mt-2">
            <span className="font-bold">Age:</span> <span>40 years</span>
          </div>
          <div className="mt-2">
            <p className="text-md">
              I am a simple guy with a big heart. I love fun and seriousness in
              equal proportion. I am a good listener but also good at starting
              conversations. I am fun to be with
            </p>
          </div>
          <div className="mt-2">
            <span className="font-bold">Verified:</span> <span>No</span>
          </div>
          <div className="mt-2">
            <span className="font-bold">Membership:</span> <span className="bg-accent text-white px-2 py-[3px] rounded-md">Premium</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 mt-8  md:mt-0 pt-8">
        <div className="min-h-[400px]">
          <h2 className="text-lg font-bold">Messages</h2>
        </div>
        <div className="min-h-[400px]">
          <h2 className="text-lg font-bold">Reccomendations</h2>
        </div>
      </div>
    </div>
  );
}

export default Landing;
