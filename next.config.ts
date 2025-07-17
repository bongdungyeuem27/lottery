import dotenv from "dotenv";
import type { NextConfig } from "next";
import { transformENV } from "scripts/transform-env";

const envFile =
	process.env.NEXT_PUBLIC_APP_ENV === "prod" ? ".prod.env" : ".local.env";

console.log("envFile", envFile);

dotenv.config({ path: envFile });

if (!globalThis.privateENV || !globalThis.publicENV) {
	const envs = transformENV();
	globalThis.publicENV = envs.publicENV;
	globalThis.privateENV = envs.privateENV;
}

/**
 * @type {import('next').NextConfig}
 */
const nextConfig: NextConfig = {
	distDir: ".next",
	output: "standalone",
	eslint: {
		ignoreDuringBuilds: true,
	},
	typescript: {
		ignoreBuildErrors: true,
	},
	transpilePackages: [
		"swagger-client",
		"swagger-ui-react",
		"@tanstack/react-query",
		"@logto/react",
	],
	reactStrictMode: false,
	webpack(config, {}) {
		config.module.rules.push({
			test: /\.(test|pw)\.(js|ts|tsx)$/,
			loader: "ignore-loader",
		});

		config.module.rules.push({
			test: /\.svg$/,
			use: [
				{
					loader: "@svgr/webpack",
					options: {
						dimensions: false,
					},
				},
			],
		});

		return config;
	},
	serverExternalPackages: ["pino-pretty", "lokijs", "encoding", "mongoose"],
	productionBrowserSourceMaps: true,
	turbopack: {
		rules: {
			"*.svg": {
				loaders: [
					{
						loader: "@svgr/webpack",
						options: {
							dimensions: false,
						},
					},
				],
				as: "*.js",
			},
			"*.pw.tsx": {
				loaders: ["ignore-loader"],
				as: "*.js",
			},
			"*.pw.ts": {
				loaders: ["ignore-loader"],
				as: "*.js",
			},
			"*.test.ts": {
				loaders: ["ignore-loader"],
				as: "*.js",
			},
			"*.test.tsx": {
				loaders: ["ignore-loader"],
				as: "*.js",
			},
			"*.tsx": {
				loaders: ["react-find/webpack/webpack-react-source-loader"],
			},
			"*.jsx": {
				loaders: ["react-find/webpack/webpack-react-source-loader"],
			},
		},
		resolveExtensions: [
			".mts",
			".cts",
			".tsx",
			".ts",
			".jsx",
			".js",
			".mjs",
			".cjs",
			".json",
		],
	},
	experimental: {
		// ppr: "incremental",
		// taint: false,
		// authInterrupts: true,
		// externalDir: true,
		// optimisticClientCache: true,
		optimizePackageImports: [
			/**
			 *  Remove react and react-dom from the bundle to fix
			 * https://github.com/vercel/next.js/discussions/43577
			 */
			// "react",
			// "react-dom",
			// ** Collecting page data  .SyntaxError: Unexpected token ','
			// "handlebars",
			// ** Module parse failed: 'import' and 'export' may appear only with 'sourceType: module' (10:0)
			// "react-intersection-observer",
			// "bs58",
			// "@monaco-editor/react",
			// "react-hook-form",
			// "@hookform/resolvers",

			"@tanstack/react-query",
			"@tanstack/query-core",
			"bignumber.js",
			"body-scroll-lock",
			"moment",
			"@chakra-ui/react",
			"pako",
			"@reduxjs/toolkit",
			"@okxconnect/ui",
			"@okxconnect/universal-provider",
			"axios",
			"cookie",
			"cosmjs-utils",
			"@sei-js/cosmjs",
			"@sei-js/evm",
			"@sei-js/proto",
			"chart.js",
			"chartjs-adapter-date-fns",
			"chartjs-plugin-annotation",
			"d3",
			"date-fns",
			"decimal.js",
			"dom-to-image",
			"dompurify",
			"file-saver",
			"file-type",
			"filesize",
			"papaparse",
			"path-to-regexp",
			"query-string",
			"qrcode.react",
			"react-chartjs-2",
			"react-number-format",
			"react-redux",
			"react-scroll",
			"react-turnstile",
			"swagger-ui-react",
			"validator",
			"@cosmjs/math",
			"@cosmjs/stargate",
			"@metamask/providers",
			"@metamask/sdk-react",
			"cosmos-kit",
			"@cosmos-kit/react",
			"@reown/appkit",
			"@reown/appkit-adapter-wagmi",
			"@logto/react",
			"viem",
			"wagmi",
			"xss",
			"yup",
			"zustand",
			"zod",
			"@dicebear/collection",
			"@dicebear/core",
			"@emotion/react",
			"ethers",
			"lodash",
			"@floating-ui/react",
			"@codemirror/lang-javascript",
			"@codemirror/lint",
			"@codemirror/state",
			"@codemirror/view",
			"@chakra-ui/react",
			"@chakra-ui/styled-system",
			"@chakra-ui/system",
			"@chakra-ui/theme-tools",
			"@chakra-ui/utils",
		],
		workerThreads: false,
		optimizeCss: false,
		nextScriptWorkers: true,
		cpus: 4,
		memoryBasedWorkersCount: false,
		webpackMemoryOptimizations: false,
		staticGenerationMinPagesPerWorker: 2,
		staticGenerationMaxConcurrency: 4,
		staticGenerationRetryCount: 1,
		serverSourceMaps: true,
		webpackBuildWorker: false,
		serverActions: {
			allowedOrigins: (process.env.NEXT_PUBLIC_APP_ENV === "prod" && [
				"develop.mayfest.vn",
				"mayfest.vn",
			]) || ["localhost", "develop.mayfest.vn", "mayfest.vn"],
		},
	},
	images: {
		qualities: [100],
		dangerouslyAllowSVG: false,
		remotePatterns: [
			{
				protocol: "https",
				hostname: "**",
			},
		],
	},
	publicRuntimeConfig: {},
	env: {},
};

export default nextConfig;
