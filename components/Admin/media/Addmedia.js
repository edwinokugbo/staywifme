import React, { useState, useEffect, useCallback } from "react";
import { useSession } from "next-auth/react";
import UploadSiteMedia from "components/Utils/UploadSiteMedia ";

function Addmedia() {
  const { data: session } = useSession();

  return (
    <div>
      <UploadSiteMedia />
    </div>
  );
}

export default Addmedia;
