import { object, string, boolean } from "zod";

export const loginSchema = object({
  email: string().email("Invalid email address"),
  password: string().min(6, "Password must be at least 6 characters"),
});

export const signupSchema = object({
  username: string().min(1, "Username is required"),
  email: string().email("Invalid email address"),
  password: string().min(6, "Password must be at least 6 characters"),
});

export const userCreateSchema = object({
  username: string().min(1, "Nombres es requerido"),
  lastname: string().min(1, "Apellidos es requerido"),
  email: string().email("El email es inválido"),
  roles: string().min(1, "Seleccione un Rol"),
  password: string().min(6, "Password debe de tener como mínimo 6 caracteres"),
});

export const userEditSchema = object({
  username: string().min(1, "Nombres es requerido"),
  lastname: string().min(1, "Apellidos es requerido"),
  email: string().email("El email es inválido"),
  roles: string().min(1, "Seleccione un Rol"),
  passwordChange: boolean(),
  // id: string().readonly(),
  password: string().min(6, "Password debe de tener como mínimo 6 caracteres"),
});