import { User } from "@/interfaces";
import { executeQuery } from "@/lib/db";
import { getRoles } from "./role";

export async function getUserByEmail(email: string): Promise<User | null> {
  const users = await executeQuery<User[]>({
    query: "SELECT * FROM users WHERE email = ?",
    values: [email],
  });

  if (users.length === 0) return null;

  const user = await getUser(users[0].id);

  return user;
}

export async function getUsers() {
  const users = await executeQuery<User[]>({
    query: "SELECT * FROM users",
  });

  return Promise.all(users.map((user) => getUser(user.id)));
}

export async function getUser(id: string): Promise<User | null> {
  const users = await executeQuery<User[]>({
    query: "SELECT * FROM users WHERE id = ?",
    values: [id],
  });

  if (users.length === 0) return null;
  const user = users[0];
  return {
    ...user,
    emailVerified: new Date(),
    role: await getRoles(user.role_id),
  };
}

export async function createUser(
  user: Omit<User, "id" | "created_at" | "updated_at">
): Promise<User> {
  const result = await executeQuery<{ insertId: string }>({
    query: "INSERT INTO users SET ?",
    values: [user],
  });

  return (await getUser(result.insertId)) as User;
}
