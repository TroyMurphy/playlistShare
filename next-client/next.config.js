/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
	async rewrites() {
		return [
			{
				source: "/:any*",
				destination: "/",
			}
		]
	},
	async redirects() 
	{
		return [
			{
				source: '/',
				destination: '/lobby/join',
				permanent: true
			}
		]
	}
}

module.exports = nextConfig
