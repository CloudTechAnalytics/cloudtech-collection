import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The first version had separate pages; they now live as sections of the home page.
  async redirects() {
    return [
      { source: "/collection", destination: "/#collection", permanent: false },
      { source: "/corporate", destination: "/#corporate-orders", permanent: false },
      { source: "/academy", destination: "/#academy", permanent: false },
      { source: "/about", destination: "/#story", permanent: false },
      { source: "/request", destination: "/#collection", permanent: false },
    ];
  },
};

export default nextConfig;
