"use server";

import { signIn } from "@/auth";
import { loginSchema, signupSchema } from "@/lib/zod";
import { createUser, getUserByEmail } from "@/models/user";
import { AuthError } from "next-auth";
import { z } from "zod";
import bcrypt from "bcryptjs";

export const loginAction = async (values: z.infer<typeof loginSchema>) => {
  try {
    await signIn("credentials", {
      email: values.email,
      password: values.password,
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

export const registerAction = async (values: z.infer<typeof signupSchema>) => {
  try {
    const { data, success } = signupSchema.safeParse(values);
    if (!success) {
      return { error: "Invalid data" };
    }

    // verficar si el usuario existe en la base de datos
    const user = await getUserByEmail(data.email);

    if (user) {
      return { error: "User already exists" };
    }

    // hash el password del usuario antes de guardarlo en la base de datos
    const hashedPassword = await bcrypt.hash(data.password, 10);

    // crear el usuario en la base de datos
    const newUser = await createUser({
      email: data.email,
      password: hashedPassword,
      role_id: "2",
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
