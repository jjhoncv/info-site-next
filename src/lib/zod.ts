import { object, string } from "zod";

export const loginSchema = object({
  email: string().email("Invalid email address"),
  password: string().min(6, "Password must be at least 6 characters"),
});

export const signupSchema = object({
  username: string().min(1, "Username is required"),
  email: string().email("Invalid email address"),
  password: string().min(6, "Password must be at least 6 characters"),
});
