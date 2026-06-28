import type { NextConfig } from "next";

// Check if running on GitHub Actions to set appropriate basePath for GitHub Pages
const isGithubActions = process.env.GITHUB_ACTIONS === 'true';

const nextConfig: NextConfig = {
  // Only enforce static export when compiling for GitHub Pages inside GitHub Actions
  output: isGithubActions ? 'export' : undefined,
  images: {
    unoptimized: true,
  },
  basePath: isGithubActions ? '/pokemoji' : '',
};

export default nextConfig;
