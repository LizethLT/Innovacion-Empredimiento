/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // 👈 Agrega esta línea para generar la carpeta de subida
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
