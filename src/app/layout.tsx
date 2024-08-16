// app/layout.tsx
// import Layout from "./components/Layout";

import "./globals.css";

import { getAllServices } from "@/services/serviceService";

export const metadata = {
  title: "Mi Sitio Web Informativo",
  description: "Un sitio web informativo con múltiples secciones",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
