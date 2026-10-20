// src/app/admin/page.tsx
// import { cookies } from "next/headers";
// import { redirect } from "next/navigation";
// import { LayoutPageAdmin } from "../components/LayoutPageAdmin";
import { auth } from "@/auth";

export default async function AdminPage() {
  const session = await auth();

  if (!session) {
    return <div>Not authenticated</div>;
    // redirect("/admin/login");
  }

  // const cookieStore = cookies();
  // const token = cookieStore.get("token");

  // if (!token) {
  //   redirect("/admin/login");
  // }

  return (
    <div className="container">
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </div>
    // <LayoutPageAdmin>
    // <h1>Panel de Administración</h1>
    // <p>Si puedes ver esto, has iniciado sesión correctamente.</p>
    // </LayoutPageAdmin>
  );
}
