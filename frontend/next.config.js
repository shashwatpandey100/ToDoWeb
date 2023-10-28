/** @type {import('next').NextConfig} */

const nextConfig = {
	reactStrictMode: true,
	async rewrites() {
		return [
			{
				source: '/api/:path*',
				destination: 'https://to-do-web-backend.vercel.app/api/:path*',
			},
		];
	}
}

module.exports = nextConfig;
