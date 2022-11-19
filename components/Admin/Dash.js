import { useEffect } from "react";
import { useSession, signIn } from "next-auth/react";
import AdminSidebar from "./AdminSidebar";
import Head from "next/head";
import { useRouter } from "next/router";
import { RotateRight } from "@material-ui/icons";

function Dash() {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    const securePage = async () => {
      if (!session || session.user.userType < 4) {
        router.push("/");
      }
    };
    securePage();
  }, [session]);

  if (session) {
    return (
      <>
        <Head>
          <title>Dashboard</title>
        </Head>
        <div className="flex w-screen h-screen">
          <AdminSidebar />
          <div className="w-10/12 px-4 py-4">
            <h1 className="text-2xl font-bold mb-2">Dashboard</h1>
            <hr />
            <p className="py-4">
              Welcome to Purpose Thoughts dashboard. Use the right sidebar menus
              to manage the resources and content on this portal. You can manage
              contestants, judges, users and other site content from this
              console.
            </p>
            <div className="py-2 border-2 border-gray-100">
              <h1 className="text-xl font-bold">Quick Stats</h1>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="flex justify-center items-center w-screen h-screen">
      <h1>Loading...</h1>
    </div>
  );
}

export default Dash;
