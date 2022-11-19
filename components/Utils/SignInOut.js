import UserDropdown from "components/Dropdowns/UserDropdown";
import { useSession, signIn, signOut } from "next-auth/react";

export default function SignInOut() {
  const { data: session } = useSession();
  if (session) {
    return (
      <>
        <UserDropdown />
      </>
    );
  }
  return (
    <>
      <div>sdsdsds</div>
    </>
  );
}
