import { parseJSON } from "@/lib/utils";
import { UserModel } from "../models/UserModel";
import { User } from "@/interfaces";

export async function getUsers(): Promise<User[]> {
  const user = new UserModel();
  return parseJSON(await user.getUsers());
}

export async function getUser(id: string): Promise<User | null> {
  const user = new UserModel();
  return parseJSON(await user.getUser(id));
}

export async function getUserByEmail(email: string): Promise<User | null> {
  const user = new UserModel();
  return parseJSON(await user.getUserByEmail(email));
}

export async function createUser(
  userData: Omit<User, "id" | "created_at" | "updated_at" | "role">
): Promise<User> {
  const user = new UserModel();
  return parseJSON(await user.createUser(userData));
}

export async function updateUser(
  id: string,
  userData: Partial<User>
): Promise<User> {
  const user = new UserModel();
  return parseJSON(await user.updateUser(userData, id));
}

export async function deleteUser(id: string): Promise<void> {
  const user = new UserModel();
  await user.deleteUser(id);
}
