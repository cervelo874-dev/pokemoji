import type { NextConfig } from "next";

// Check if running on GitHub Actions to set appropriate basePath for GitHub Pages
const isGithubActions = process.env.GITHUB_ACTIONS === 'true';

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: isGithubActions ? '/pokemoji' : '',
};

export default nextConfig;
