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
