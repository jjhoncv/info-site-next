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

export interface UserSession {
  id?: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
}

//admin
export interface User {
  id: string;
  username: string;
  email: string;
  password: string; // Nota: Esto solo debe usarse para creación/actualización, nunca debe enviarse al cliente
  role_id: string;
  is_active?: boolean;
  created_at?: Date;
  updated_at?: Date;
  emailVerified?: Date;
  role?: Role | null; // Relación con Role, opcional porque no siempre se cargará
}

export interface Role {
  id: string;
  name: string;
  created_at: Date;
  updated_at: Date;
  permissions: PermissionName[] | null; // Cambiado a PermissionName[] para consistencia
}

// Mantenemos la interfaz Permission para la base de datos
export interface Permission {
  id: string;
  name: PermissionName; // Cambiado a PermissionName para asegurar que solo se usen permisos válidos
  created_at: Date;
  updated_at: Date;
}

// crear enum para todos los permisos
export enum PERMISSIONS {
  DASHBOARD_VIEW = "dashboard.view",
  BANNERS_VIEW = "banners.view",
  BANNERS_CREATE = "banners.create",
  BANNERS_EDIT = "banners.edit",
  BANNERS_DELETE = "banners.delete",
  SERVICES_VIEW = "services.view",
  SERVICES_CREATE = "services.create",
  SERVICES_EDIT = "services.edit",
  SERVICES_DELETE = "services.delete",
  PROJECTS_VIEW = "projects.view",
  PROJECTS_CREATE = "projects.create",
  PROJECTS_EDIT = "projects.edit",
  PROJECTS_DELETE = "projects.delete",
  PAGES_VIEW = "pages.view",
  PAGES_CREATE = "pages.create",
  PAGES_EDIT = "pages.edit",
  PAGES_DELETE = "pages.delete",
  GALLERY_VIEW = "gallery.view",
  GALLERY_CREATE = "gallery.create",
  GALLERY_EDIT = "gallery.edit",
  GALLERY_DELETE = "gallery.delete",
  USERS_VIEW = "users.view",
  USERS_CREATE = "users.create",
  USERS_EDIT = "users.edit",
  USERS_DELETE = "users.delete",
}

export type PermissionName =
  | PERMISSIONS.DASHBOARD_VIEW
  | PERMISSIONS.BANNERS_VIEW
  | PERMISSIONS.BANNERS_CREATE
  | PERMISSIONS.BANNERS_EDIT
  | PERMISSIONS.BANNERS_DELETE
  | PERMISSIONS.SERVICES_VIEW
  | PERMISSIONS.SERVICES_CREATE
  | PERMISSIONS.SERVICES_EDIT
  | PERMISSIONS.SERVICES_DELETE
  | PERMISSIONS.PROJECTS_VIEW
  | PERMISSIONS.PROJECTS_CREATE
  | PERMISSIONS.PROJECTS_EDIT
  | PERMISSIONS.PROJECTS_DELETE
  | PERMISSIONS.PAGES_VIEW
  | PERMISSIONS.PAGES_CREATE
  | PERMISSIONS.PAGES_EDIT
  | PERMISSIONS.PAGES_DELETE
  | PERMISSIONS.GALLERY_VIEW
  | PERMISSIONS.GALLERY_CREATE
  | PERMISSIONS.GALLERY_EDIT
  | PERMISSIONS.GALLERY_DELETE
  | PERMISSIONS.USERS_VIEW
  | PERMISSIONS.USERS_CREATE
  | PERMISSIONS.USERS_EDIT
  | PERMISSIONS.USERS_DELETE;
