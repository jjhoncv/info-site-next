// src/services/userService.ts
import { executeQuery } from "@/lib/db";
import {
  User,
  UserWithRole,
  Role,
  Permission,
  PermissionName,
} from "@/interfaces";
import bcrypt from "bcryptjs";
import { createToken } from "@/lib/auth";

export async function getUsers(): Promise<UserWithRole[]> {
  const users = await executeQuery<User[]>({
    query: "SELECT * FROM users",
  });

  return Promise.all(
    users.map(async (user) => {
      const role = await getUserRole(user.id);
      return { ...user, role } as UserWithRole;
    })
  );
}

export async function getUserById(id: number): Promise<UserWithRole | null> {
  const users = await executeQuery<User[]>({
    query: "SELECT * FROM users WHERE id = ?",
    values: [id],
  });

  if (users.length === 0) return null;

  const user = users[0];
  const role = await getUserRole(user.id);

  return {
    ...user,
    role,
  } as UserWithRole;
}

export async function getUserByEmail(email: string): Promise<User | null> {
  const users = await executeQuery<User[]>({
    query: "SELECT * FROM users WHERE email = ?",
    values: [email],
  });

  if (users.length === 0) return null;

  const user = users[0];
  const role = await getUserRole(user.id);

  return {
    ...user,
    role,
  };
}

export async function createUser(
  user: Omit<User, "id" | "created_at" | "updated_at">
): Promise<UserWithRole> {
  const result = await executeQuery<{ insertId: number }>({
    query:
      "INSERT INTO users (username, email, password, role_id, is_active) VALUES (?, ?, ?, ?, ?)",
    values: [
      user.username,
      user.email,
      user.password,
      user.role_id,
      user.is_active,
    ],
  });
  const createdUser = await getUserById(result.insertId);
  if (!createdUser) throw new Error("Failed to create user");
  return createdUser;
}

export async function updateUser(
  id: number,
  user: Partial<Omit<UserWithRole, "role">> & {
    role_id?: number;
    password?: string;
  }
): Promise<UserWithRole> {
  let query = "UPDATE users SET ";
  const values: any[] = [];
  const updateFields: string[] = [];

  if (user.username) {
    updateFields.push("username = ?");
    values.push(user.username);
  }
  if (user.email) {
    updateFields.push("email = ?");
    values.push(user.email);
  }
  if (user?.password) {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    updateFields.push("password = ?");
    values.push(hashedPassword);
  }
  if (user?.role_id !== undefined) {
    updateFields.push("role_id = ?");
    values.push(user.role_id);
  }
  if (user.is_active !== undefined) {
    updateFields.push("is_active = ?");
    values.push(user.is_active);
  }

  query += updateFields.join(", ") + " WHERE id = ?";
  values.push(id);

  await executeQuery<{ affectedRows: number }>({ query, values });

  const updatedUser = await getUserById(id);
  if (!updatedUser) throw new Error("Failed to update user");
  return updatedUser;
}

export async function deleteUser(id: number): Promise<boolean> {
  const result = await executeQuery<{ affectedRows: number }>({
    query: "DELETE FROM users WHERE id = ?",
    values: [id],
  });
  return result.affectedRows > 0;
}

export async function loginUser(
  email: string,
  password: string
): Promise<string | null> {
  const users = await executeQuery<User[]>({
    query: "SELECT * FROM users WHERE email = ?",
    values: [email],
  });

  if (users.length === 0) return null;

  const user = users[0];
  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) return null;

  return createToken(user.id);
}

export async function getUserRole(userId: number): Promise<Role | {}> {
  const roles = await executeQuery<(Role & { permission: string })[]>({
    query: `
      SELECT r.id, r.name, p.name as permission
      FROM roles r
      JOIN role_permissions rp ON r.id = rp.role_id
      JOIN permissions p ON rp.permission_id = p.id
      JOIN users u ON u.role_id = r.id
      WHERE u.id = ?
    `,
    values: [userId],
  });

  let role = {};

  if (roles.length > 0) {
    role = {
      id: roles[0].id,
      name: roles[0].name,
      permissions: roles.map((r) => r.permission as PermissionName),
      created_at: new Date(),
      updated_at: new Date(),
    };
  }

  return role;
}

export async function getUserPermissions(
  userId: number
): Promise<PermissionName[]> {
  const permissions = await executeQuery<{ name: PermissionName }[]>({
    query: `
      SELECT DISTINCT p.name
      FROM permissions p
      JOIN role_permissions rp ON p.id = rp.permission_id
      JOIN roles r ON rp.role_id = r.id
      JOIN users u ON u.role_id = r.id
      WHERE u.id = ?
    `,
    values: [userId],
  });

  return permissions.map((p) => p.name);
}

export async function registerUser(
  userData: Omit<
    User,
    "id" | "created_at" | "updated_at" | "is_active" | "role_id"
  >
): Promise<string | null> {
  const hashedPassword = await bcrypt.hash(userData.password, 10);

  try {
    const result = await executeQuery<{ insertId: number }>({
      query:
        "INSERT INTO users (username, email, password, role_id, is_active) VALUES (?, ?, ?, ?, ?)",
      values: [userData.username, userData.email, hashedPassword, 2, true], // Asumiendo que 2 es el role_id para usuarios normales
    });

    if (result.insertId) {
      return createToken(result.insertId);
    }
  } catch (error) {
    console.error("Error registering user:", error);
  }

  return null;
}
