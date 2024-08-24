import { DefaultSession } from "next-auth";
import "next-auth/jwt";
import { User as IUser } from "@/interfaces";

declare module "next-auth" {
  interface Session {
    user: IUser & DefaultSession["user"];
  }

  interface User {
    role?: string;
    data: IUser;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: string;
    data: IUser;
  }
}
