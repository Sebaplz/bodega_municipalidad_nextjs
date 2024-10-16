import axiosInstance from "@/lib/axios";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { decodeToken } from "@/utils/jwt-decode";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      async authorize(credentials) {
        try {
          const response = await axiosInstance.post(
            "/auth/authenticate",
            credentials
          );
          const decodedToken = decodeToken(response.data.token);
          console.log({
            ...response.data,
            ...decodedToken,
            token: response.data.token,
          });
          return {
            ...response.data,
            ...decodedToken,
            token: response.data.token,
          };
        } catch (error) {
          console.error("Authentication error:", error);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.role = user.role;
        token.token = user.token;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.role = token.role as string;
        session.user.token = token.token as string;
      }
      return session;
    },
  },
});
