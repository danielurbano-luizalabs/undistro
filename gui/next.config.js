/** @type {import('next').NextConfig} */
module.exports = {
  typescript: {
    ignoreDevErrors: true,
    ignoreBuildErrors: true
  },
  env: {
    'UNDISTRO_API_URL': process.env.UNDISTRO_API_URL,
  }
}
