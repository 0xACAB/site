import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    eslint: {
        // Warning: This allows production builds to successfully complete even if
        // your project has ESLint errors.
        ignoreDuringBuilds: true,
    },
    reactStrictMode: false,
    experimental: {
        forceSwcTransforms: true,
        serverActions: {
            allowedOrigins: ['xtranscendence.ru', 'localhost:3000', 'localhost:80']
        }
    },
    devIndicators: false,
    poweredByHeader: false,
    trailingSlash: true,
    /*async redirects() {
		return [
			{
				source: '/math',
				destination: '/',
				permanent: true,
			},
		]
	},*/
    webpack: (config) => {
        config.module.rules.push({
            test: /\.(glsl|wgsl|vs|fs)$/,
            loader: 'raw-loader'
        });

        return config;
    }
};

export default nextConfig;
