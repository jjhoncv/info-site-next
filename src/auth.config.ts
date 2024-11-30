import bcrypt from "bcryptjs";
import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { loginSchema } from "./lib/zod";
import { UserModel } from "./models/UserModel";

export default {
  providers: [
    Credentials({
      authorize: async (credentials) => {
        const { data, success } = loginSchema.safeParse(credentials);

        if (!success) {
          throw new Error("Invalid credentials");
        }
        const ouser = new UserModel();
        // verficar si el usuario existe en la base de datos
        const user = await ouser.getUserByEmail(data.email);

        if (!user || !user.password) {
          throw new Error("Invalid credentials");
        }

        // verificar si la contraseña es correcta
        const isValid = await bcrypt.compare(data.password, user.password);

        if (!isValid) {
          throw new Error("Invalid credentials");
        }

        return {
          data: user,
        };
      },
    }),
  ],
} satisfies NextAuthConfig;
