// src/app/admin/page.tsx
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { LayoutPageAdmin } from "../components/LayoutPageAdmin";

export default function AdminPage() {
  // const cookieStore = cookies();
  // const token = cookieStore.get("token");

  // if (!token) {
  //   redirect("/admin/login");
  // }

  return (
    <LayoutPageAdmin>
      <h1>Panel de Administración</h1>
      <p>Si puedes ver esto, has iniciado sesión correctamente.</p>
    </LayoutPageAdmin>
  );
}
