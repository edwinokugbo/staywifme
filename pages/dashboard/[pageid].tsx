import React from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Main from "../../components/dashboard/Main";

function Pageid() {
  const { data: session } = useSession();
  const router = useRouter();
  const pageid = router.query.pageid;

  return (
    <>
      <Main page={pageid} />;
    </>
  );
}

export default Pageid;
