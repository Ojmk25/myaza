// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
//   distDir: 'build',
//   output: 'export',
//   images: { unoptimized: true },
// };

// export default nextConfig;


/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  distDir: "build",
  output: "export",
  images: { unoptimized: true },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.module.rules.push({
        test: /\.(mp4)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              publicPath: "/_next",
              outputPath: "static/videos/",
              name: "[name].[ext]",
            },
          },
        ],
      });
    }
    return config;
  },
};

export default nextConfig;

