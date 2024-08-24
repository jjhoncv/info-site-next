import { PERMISSIONS } from "@/interfaces";
import { hasPermission } from "@/lib/hasPermission";
import { getBanners } from "@/models/banner";
import Image from "next/image";

export default async function BannersPage() {
  const permission = await hasPermission([PERMISSIONS.BANNERS_VIEW]);

  if (!permission) {
    return <div>Unauthorized</div>;
  }

  const banners = await getBanners();

  return (
    <div className="container">
      <h1>Banners</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Image</th>
            <th>Link</th>
            <th>Active</th>
          </tr>
        </thead>
        <tbody>
          {banners.map((banner) => {
            if (!banner) return null;
            return (
              <tr key={banner.id}>
                <td>{banner.id}</td>
                <td>
                  <Image
                    src={banner.image_url}
                    width={400}
                    height={50}
                    alt={""}
                  />
                </td>
                <td>{banner.link}</td>
                <td>{banner.description}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
