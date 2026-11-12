const { version } = require('./package.json')

// Bucket host that serves the presigned URLs of uploaded files (promotion item photos).
// next/image refuses remote hosts that are not listed here.
const s3Hostname = process.env.NEXT_PUBLIC_S3_HOSTNAME

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_APP_VERSION: version,
  },
  images: {
    remotePatterns: s3Hostname ? [{ protocol: 'https', hostname: s3Hostname }] : [],
  },
}

module.exports = nextConfig
