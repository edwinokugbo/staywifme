import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
// import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { Settings } from "constants/Settings";
import axios from "axios";

export default NextAuth({
  secret: process.env.SECRET,
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Email",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: {
          label: "Username",
          type: "text",
          placeholder: "email or username",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        const response = await axios.post(
          Settings.API_DATA_URL + "user/signin",
          {
            credentials: credentials,
          }
        );
        const res = response.data;
        if (res.status === "success") {
          // console.log(res);
          return res.user;
        } else {
          // console.log(res);
          return null;
        }
      },
    }),
    // GithubProvider({
    //   clientId: process.env.GITHUB_ID,
    //   clientSecret: process.env.GITHUB_SECRET,
    // }),
    GoogleProvider({
      clientId:
        "817255103008-i782vbr589ef6qaeb36b062c3sn633l5.apps.googleusercontent.com",
      clientSecret: "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",
    }),
  ],
  session: {
    jwt: true,
  },
  jwt: {
    encryption: true,
  },
  callbacks: {
    async jwt({ token, account, user }) {
      // Persist the OAuth access_token to the token right after signin
      if (account) {
        token.accessToken = account.access_token;
        token.id = user.id;
        token.firstname = user.firstname;
        token.middlename = user.middlename;
        token.lastname = user.lastname;
        token.phone = user.phone;
        token.profile_img = user.profile_img;
        token.usertype = user.usertype;
        token.payment_status = user.payment_status;
      }
      return token;
    },
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token from a provider.
      session.accessToken = token.accessToken;
      session.user.id = token.id;
      session.user.phone = token.phone;
      session.user.firstname = token.firstname;
      session.user.middlename = token.middlename;
      session.user.lastname = token.lastname;
      session.user.profile_img = token.profile_img;
      session.user.usertype = token.usertype;
      session.user.payment_status = token.payment_status;
      return session;
    },
    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      console.log(url);
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
  },
  debug: true,
  pages: {
    signIn: "/auth/signin",
    signOut: "/",
    // error: "/auth/error", // Error code passed in query string as ?error=
    // verifyRequest: "/auth/verify-request", // (used for check email message)
    // newUser: "/auth/new-user", // New users will be directed here on first sign in (leave the property out if not of interest)
  },
});
