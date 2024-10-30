import { PageUI } from "@/app/components/Page/Page";
import { PageTitle } from "@/app/components/Page/PageTitle";
import { ProfileEditView } from "@/app/components/Profile/ProfileEditView";
import { auth } from "@/auth";

export const revalidate = 0; // Deshabilitar cache estático

export default async function ProfileEditPage() {
  const session = await auth();
  if (!session?.user) return null;

  return (
    <PageUI
      title={<PageTitle title="Perfil" />}
      breadcrumb={[{ label: "Perfil Usuario" }]}
      subtitle="Informacion de usuario"
    >
      <ProfileEditView user={session?.user.data} />
    </PageUI>
  );
}
