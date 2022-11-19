import React, { useState, useEffect, useCallback } from "react";
import { useSession } from "next-auth/react";
import UploadProfileImage from "components/Utils/UploadProfileImage";

function ProfilePic() {
  const { data: session } = useSession();

  return (
    <div>
      <UploadProfileImage />
    </div>
  );
}

export default ProfilePic;
