import { PERMISSIONS } from "@/interfaces";
import { hasPermission } from "@/lib/hasPermission";
import { getUsers } from "@/models/user";
import React from "react";

export default async function UsersPage() {
  const permission = await hasPermission([PERMISSIONS.USERS_VIEW]);

  if (!permission) {
    return <div>Unauthorized</div>;
  }

  const users = await getUsers();

  return (
    <div className="container">
      <h1>Users</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>Role</th>
            <th>Permissions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => {
            if (!user) return null;
            return (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.email}</td>
                <td>{user.role?.name}</td>
                <td>
                  <ul>
                    {user.role?.permissions?.map((permission) => (
                      <li key={permission}>{permission}</li>
                    ))}
                  </ul>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
