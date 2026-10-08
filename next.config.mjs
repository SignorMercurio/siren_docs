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
      { source: '/analysis/info', destination: '/process', permanent: true },
      { source: '/analysis/upload', destination: '/files', permanent: true },
      { source: '/misc/clean', destination: '/cleanup', permanent: true },
      { source: '/dossier', destination: '/reports', permanent: true },
      { source: '/dossier/syntax', destination: '/reports/syntax', permanent: true },
      { source: '/dossier/workflow', destination: '/reports', permanent: true },
      { source: '/dossier/config', destination: '/reports', permanent: true },
    ];
  },
};

export default withMDX(config);
