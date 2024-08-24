import NextAuth from "next-auth";
import authConfig from "./auth.config";

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  session: { strategy: "jwt" },
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.data = user.data;
      }
      return token;
    },

    session({ session, token }) {
      if (session.user) {
        session.user.data = token.data;
      }
      return session;
    },
  },
});
