// interfaces.ts

export interface Banner {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  created_at: Date;
  updated_at: Date;
  display_order: number;
  link: string;
  image_url: string;
}

export interface Service {
  id: number;
  title: string;
  subtitle: string;
  image_url: string;
  slug: string;
  description: string;
  created_at: Date;
  updated_at: Date;
  display_order: number;
}

export interface ServiceImage {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  created_at: Date;
  updated_at: Date;
  display_order: number;
  id_service: number;
  image_url: string;
}

export interface Project {
  id: number;
  title: string;
  subtitle: string;
  slug: string;
  image_url: string;
  description: string;
  created_at: Date;
  updated_at: Date;
  display_order: number;
}

export interface ProjectImage {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  created_at: Date;
  updated_at: Date;
  display_order: number;
  id_project: number;
  image_url: string;
}

export interface Page {
  id: number;
  title: string;
  subtitle: string;
  slug: string;
  image_url: string;
  description: string;
  created_at: Date;
  updated_at: Date;
  display_order: number;
}

export interface PageImage {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  created_at: Date;
  updated_at: Date;
  display_order: number;
  id_page: number;
  image_url: string;
}

export interface GalleryItem {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  created_at: Date;
  updated_at: Date;
  display_order: number;
  image_url: string;
}

//admin
export interface User {
  id: number;
  username: string;
  email: string;
  password: string; // Nota: Esto solo debe usarse para creación/actualización, nunca debe enviarse al cliente
  role_id: number;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
  role?: Role; // Relación con Role, opcional porque no siempre se cargará
}

export interface Role {
  id: number;
  name: string;
  created_at: Date;
  updated_at: Date;
  permissions: PermissionName[]; // Cambiado a PermissionName[] para consistencia
}

// Mantenemos la interfaz Permission para la base de datos
export interface Permission {
  id: number;
  name: PermissionName; // Cambiado a PermissionName para asegurar que solo se usen permisos válidos
  created_at: Date;
  updated_at: Date;
}

export type PermissionName =
  | "dashboard.view"
  | "banners.view"
  | "banners.create"
  | "banners.edit"
  | "banners.delete"
  | "services.view"
  | "services.create"
  | "services.edit"
  | "services.delete"
  | "projects.view"
  | "projects.create"
  | "projects.edit"
  | "projects.delete"
  | "pages.view"
  | "pages.create"
  | "pages.edit"
  | "pages.delete"
  | "gallery.view"
  | "gallery.create"
  | "gallery.edit"
  | "gallery.delete"
  | "users.view"
  | "users.create"
  | "users.edit"
  | "users.delete";

export interface UserWithRole extends Omit<User, "password" | "role_id"> {
  role: {
    id: number;
    name: string;
    permissions: PermissionName[];
  };
}
