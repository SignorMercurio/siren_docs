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
      { source: '/remote', destination: '/reference/repl', permanent: true },
      { source: '/misc', destination: '/reference/repl', permanent: true },
      { source: '/misc/server', destination: '/reference/repl', permanent: true },
      { source: '/portforward', destination: '/reference/portforward', permanent: true },
      { source: '/config', destination: '/reference/server-config', permanent: true },
      { source: '/mcp', destination: '/reference/mcp', permanent: true },
      { source: '/dir', destination: '/reference', permanent: true },
      { source: '/protocol', destination: '/reference', permanent: true },
      { source: '/features', destination: '/overview', permanent: true },
      { source: '/plugins/development', destination: '/reference/plugin-dev', permanent: true },
      { source: '/plugins/:path*', destination: '/reference/plugins', permanent: true },
    ];
  },
};

export default withMDX(config);
