// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: '2025-05-15',
	devtools: { enabled: true },
	modules: ['@nuxt/eslint', 'nuxt-auth-utils', 'nuxt-cron'],
	app: {
		head: {
			title: 'Cost Note',
			link: [
				{ rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
				{
					rel: 'stylesheet',
					href: 'https://fonts.googleapis.com/css2?family=Open+Sans:wght@300..800&display=swap',
				},
			],
		},
	},
	css: ['~/assets/main.css'],
	runtimeConfig: {
		MONGO_URI: process.env.MONGO_URI,
		GOOGLE_API_KEY: process.env.GOOGLE_API_KEY,
		EXCHANGE_RATE_API_KEY: process.env.EXCHANGE_RATE_API_KEY,
	},
	experimental: {
		defaults: {
			nuxtLink: {
				// default values
				activeClass: 'cn-link_active',
			},
		},
	},
	// cron: {
	// 	runOnInit: true,
	// }
});
