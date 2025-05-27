// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: '2025-05-15',
	devtools: { enabled: true },
	modules: ['@nuxt/eslint', 'nuxt-auth-utils'],
	app: {
		head: {
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
	},
});
