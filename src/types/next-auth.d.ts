// eslint-disable-next-line
import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      providerId: string;
      name?: string;
      email?: string;
      image?: string;
    };
  }
}