import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    role: string;
    username: string;
    token: string;
  }
  interface Session extends DefaultSession {
    user: {
      id: string;
      role: string;
      token: string;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: string;
    token: string;
  }
}
