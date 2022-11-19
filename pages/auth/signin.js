import { useState, useEffect } from "react";
import { getProviders, signIn } from "next-auth/react";
import { getCsrfToken } from "next-auth/react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Profile from "components/Profile/Profile";
import axios from "axios";
import { Settings } from "constants/Settings";

export default function SignIn({ providers, csrfToken }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [reg, setReg] = useState(false);
  const [lastUrl, setLastUrl] = useState("");

  // useEffect(() => {
  //   setLastUrl(localStorage.getItem("lastUrl"));
  // }, []);

  useEffect(() => {
    if (session) {
      var checkReg = axios
        .get(`${Settings.API_DATA_URL}auth/is_user_registered`, {
          params: {
            email: session.user.email,
          },
        })
        .then((response) => {
          const res = response.data.status;
          if (res == "found") {
            setReg(true);
          } else {
            setReg(false);
          }
        })
        .catch((err) => {
          console.log(err);
          if (err.response) {
            if (err.response.status === 400) {
              router.replace("/user/register-provider-user");
            }
          }
        });

      return () => {
        checkReg = null;
      };
    }
  }, [session]);

  // if (status === "authenticated") {
  //   if (lastUrl === "") {
  //     if (reg === true) {
  //       return (
  //         <div>
  //           <Profile />
  //         </div>
  //       );
  //     }
  //   } else {
  //     if (lastUrl.includes("auth/signin")) {
  //     } else {
  //       router.push(lastUrl);
  //     }
  //   }
  // }

  if (status === "loading") {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <h2>loading...</h2>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center w-screen h-screen px-4">
      <div className="flex flex-col justify-center items-center border-2 border-gray-20 w-full lg:w-96 px-4 py-8 shadow-lg">
        <form method="POST" action="/api/auth/callback/credentials">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-slate-600">
              Login to proceed
            </h1>
            <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
            <label className="flex flex-col my-4">
              <input
                className="border-simple px-2 py-2 rounded-sm w-full lg:w-full"
                name="username"
                type="text"
                placeholder="email or username"
              />
            </label>
            <label className="flex flex-col my-4">
              <input
                className=""
                name="password"
                type="password"
                placeholder="password"
                autoComplete="true"
              />
            </label>
            <button
              className="bg-slate-600 hover:bg-orange-600 text-orange-100 hover:text-white w-full border-2 border-gray-100 hover:border-gray-300 py-2 px-4 rounded-sm"
              type="submit"
            >
              Sign in
            </button>
          </div>
        </form>
        <div className="w-full flex justify-between items-center mt-3 px-10">
          <Link href="/auth/send-reset-code">
            <span className="text-orange-600 hover:text-orange-800 cursor-pointer">
              Reset Password
            </span>
          </Link>
          <Link href="/signup">
            <span className="text-slate-500 hover:text-slate-800 cursor-pointer">
              Register
            </span>
          </Link>
        </div>
        <hr className="border-1 border-slate-200 w-full my-6" />
        {Object.values(providers).map((provider) => (
          <div
            key={provider.name}
            className={`${provider.name === "Email" ? "hidden" : ""}`}
          >
            <button
              className={`${
                provider.name === "GitHub" ? "bg-blue-800" : "bg-red-600"
              } text-white w-full border-2 border-gray-100 hover:border-gray-300 hover:text-slate-300 py-2 px-4 rounded-sm`}
              onClick={() => signIn(provider.id)}
            >
              Sign in with {provider.name}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

// This is the recommended way for Next.js 9.3 or newer
export async function getServerSideProps(context) {
  const providers = await getProviders();
  const csrfToken = await getCsrfToken(context);
  return {
    props: { providers, csrfToken },
  };
}

// export async function getStaticProps(context) {
//   const providers = await getProviders();
//   const csrfToken = await getCsrfToken(context);
//   return {
//     props: { providers, csrfToken },
//   };
// }

/*
// If older than Next.js 9.3
SignIn.getInitialProps = async () => {
  return {
    providers: await getProviders()
  }
}
*/
