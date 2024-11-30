import { User } from "@/interfaces";
import { executeQuery } from "@/lib/db";
import { RoleModel } from "./RoleModel";

export class UserModel {
  public async getUserByEmail(email: string): Promise<User | null> {
    const users = await executeQuery<User[]>({
      query: "SELECT * FROM users WHERE email = ?",
      values: [email],
    });

    if (users.length === 0) return null;

    const user = await this.getUser(users[0].id);
    return user;
  }

  public async getUsers(): Promise<User[]> {
    const users = await executeQuery<User[]>({
      query: "SELECT * FROM users",
    });

    const usersWithData = (
      await Promise.all(users.map((user) => this.getUser(user.id)))
    ).filter(Boolean) as User[];

    return usersWithData;
  }

  public async getUser(id: string): Promise<User | null> {
    const users = await executeQuery<User[]>({
      query: "SELECT * FROM users WHERE id = ?",
      values: [id],
    });

    if (users.length === 0) return null;
    const user = users[0];

    const orole = new RoleModel();

    return {
      ...user,
      emailVerified: new Date(),
      role: await orole.getRole(user.role_id),
    };
  }

  public async createUser(
    user: Omit<User, "id" | "created_at" | "updated_at" | "role">
  ): Promise<User> {
    const result = await executeQuery<{ insertId: string }>({
      query: "INSERT INTO users SET ?",
      values: [user],
    });

    return (await this.getUser(result.insertId)) as User;
  }

  public async updateUser(userData: Partial<User>, id: string): Promise<User> {
    await executeQuery({
      query: "UPDATE users SET ? WHERE id=?",
      values: [userData, id],
    });

    return (await this.getUser(id)) as User;
  }

  public async deleteUser(id: string): Promise<void> {
    await executeQuery({
      query: "DELETE FROM users WHERE id=?",
      values: [id],
    });
  }
}
