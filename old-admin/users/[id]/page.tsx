// app/admin/users/[id]/page.tsx
"use client";

import { useState, useEffect } from "react";
import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} from "@/services/userService";
import { DataTable } from "@/app/components/DataTable";
import { Form } from "@/app/components/Form";
import { UserWithRole } from "@/interfaces";
import { z } from "zod";

const userSchema = z.object({
  username: z
    .string()
    .min(3, "El nombre de usuario debe tener al menos 3 caracteres"),
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
  role_id: z.number(),
  is_active: z.boolean().default(true),
});

export default function UsersPage() {
  const [users, setUsers] = useState<UserWithRole[]>([]);
  const [editingUser, setEditingUser] = useState<UserWithRole | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      const fetchedUsers = await getUsers();
      setUsers(fetchedUsers);
    };
    fetchUsers();
  }, []);

  const handleCreate = async (data: z.infer<typeof userSchema>) => {
    const newUser = await createUser(data);
    setUsers([...users, newUser]);
  };

  const handleUpdate = async (data: Partial<UserWithRole>) => {
    if (editingUser) {
      const updatedUser = await updateUser(editingUser.id, data);
      setUsers(users.map((u) => (u.id === editingUser.id ? updatedUser : u)));
      setEditingUser(null);
    }
  };

  const handleDelete = async (user: UserWithRole) => {
    await deleteUser(user.id);
    setUsers(users.filter((u) => u.id !== user.id));
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Gestión de Usuarios</h1>
      <DataTable
        data={users}
        columns={[
          { key: "username", header: "Nombre de usuario" },
          { key: "email", header: "Email" },
          { key: "role.name", header: "Rol" },
          {
            key: "is_active",
            header: "Activo",
            render: (user) => (user.is_active ? "Sí" : "No"),
          },
        ]}
        onEdit={setEditingUser}
        onDelete={handleDelete}
      />
      <h2 className="text-xl font-bold mt-8 mb-4">
        {editingUser ? "Editar Usuario" : "Crear Nuevo Usuario"}
      </h2>
      <Form
        schema={userSchema}
        onSubmit={editingUser ? handleUpdate : handleCreate}
        defaultValues={
          editingUser
            ? {
                username: editingUser.username,
                email: editingUser.email,
                role_id: editingUser.role.id,
                is_active: editingUser.is_active,
                password: "", // No incluimos la contraseña por seguridad
              }
            : { is_active: true } // Valor por defecto para nuevos usuarios
        }
      />
      {editingUser && (
        <button
          onClick={() => setEditingUser(null)}
          className="mt-4 bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded"
        >
          Cancelar Edición
        </button>
      )}
    </div>
  );
}
