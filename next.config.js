/** @type {import('next').NextConfig} */
// standalone: the runtime image carries only the traced server files, not all of
// node_modules (the old image was 1.17 GB on a 14 GB shared box).
const nextConfig = { poweredByHeader: false, output: "standalone" };

module.exports = nextConfig;
