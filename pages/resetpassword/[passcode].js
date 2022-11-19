import React from "react";
import { useRouter } from "next/router";
import ResetPassword from "components/Utils/ResetPassword";

function Utilid() {
  const router = useRouter();
  const code = router.query.passcode;

  return (
    <div>
      <ResetPassword passcode={code} />
    </div>
  );
}

export default Utilid;
