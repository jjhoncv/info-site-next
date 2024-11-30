"use server";

import { signIn } from "@/auth";
import { loginSchema, signupSchema } from "@/lib/zod";
import { UserModel } from "@/models/UserModel";
import bcrypt from "bcryptjs";
import { AuthError } from "next-auth";
import { z } from "zod";

export const loginAction = async (values: z.infer<typeof loginSchema>) => {
  try {
    await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
    });
    return { success: true, message: "login successfull" };
  } catch (error) {
    if (error instanceof AuthError) {
      return { success: false, error: error.cause?.err?.message ?? "" };
    }
    return { success: false, error: "error 500" };
  }
};

export const registerAction = async (values: z.infer<typeof signupSchema>) => {
  try {
    const { data, success } = signupSchema.safeParse(values);
    if (!success) {
      return { error: "Invalid data" };
    }

    const ouser = new UserModel();

    // verficar si el usuario existe en la base de datos
    const user = await ouser.getUserByEmail(data.email);

    if (user) {
      return { error: "User already exists" };
    }

    // hash el password del usuario antes de guardarlo en la base de datos
    const hashedPassword = await bcrypt.hash(data.password, 10);

    // crear el usuario en la base de datos
    const newUser = await ouser.createUser({
      email: data.email,
      password: hashedPassword,
      role_id: "2",
      lastname: "xxx",
      username: data.username,
    });

    // logear el usuario
    await signIn("credentials", {
      email: newUser.email,
      password: data.password,
      redirect: false,
    });

    return { success: true };
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: error.cause?.err?.message };
    }
    return { error: "error 500" };
  }
};
