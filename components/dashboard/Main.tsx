import Link from "next/link";
import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TopMenuBar from "../../components/dashboard/TopMenuBar";
import BottomMenuMobile from "../../components/dashboard/BottomMenuMobile";
import { useSession } from "next-auth/react";
import Landing from "./Landing";
import Search from "./Search";
import Profile from "./Profile";
import Messages from "./Messages";
import MySettings from "./MySettings";

type pageProps = {
  page: string | string[] | undefined;
};

function Main(props: pageProps) {
  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      console.log(session.user);
      console.log("cool");
    } else {
      console.log("No session");
    }
  }, []);

  return (
    <div className="w-full min-h-screen bg-greyish">
      <div className="w-full lg:w-3/5 px-0 lg:px-4 mx-auto">
        <TopMenuBar />
        {/* <h2>{session?.user.firstname}</h2> */}
        {session && props.page == "index" && <Landing />}
        {session && props.page == "profile" && <Profile />}
        {session && props.page == "search" && <Search />}
        {session && props.page == "messages" && <Messages />}
        {session && props.page == "settings" && <MySettings />}
        <BottomMenuMobile />
      </div>
    </div>
  );
}

export default Main;
