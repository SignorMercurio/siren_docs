import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  allowedDevOrigins: ['127.0.0.1'],
  reactStrictMode: true,
  async redirects() {
    return [
      { source: '/credential', destination: '/server/prerequisites', permanent: true },
      { source: '/infra', destination: '/server/prerequisites', permanent: true },
      { source: '/dossier/deploy', destination: '/server/dossier', permanent: true },
    ];
  },
};

export default withMDX(config);
