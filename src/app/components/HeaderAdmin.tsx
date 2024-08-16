import { HeaderNavigationAdmin } from "./HeaderNavigationAdmin";
import { UserAdminNav } from "./UserAdminNav";

export const HeaderAdmin = () => {
  return (
    <header>
      <h1>LOGO</h1>
      <UserAdminNav />
      <HeaderNavigationAdmin />
    </header>
  );
};
