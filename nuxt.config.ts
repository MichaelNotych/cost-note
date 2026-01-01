import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    app: {
        head: {
            title: "Cost Note",
            htmlAttrs: {
                lang: "en",
            },
        },
    },
    ssr: true,
    nitro: {
        preset: "node-server",
    },
    compatibilityDate: "2025-07-15",
    devtools: { enabled: true },
    css: ["~/assets/css/tailwind.css"],

    vite: {
        plugins: [tailwindcss()],
    },

    runtimeConfig: {
        mongoUri: process.env.MONGO_URI,
        googleApiKey: process.env.GOOGLE_API_KEY,
        exchangeRateApiKey: process.env.EXCHANGE_RATE_API_KEY,
    },

    modules: ["nuxt-auth-utils", "shadcn-nuxt", "@pinia/nuxt"],
    shadcn: {
        /**
         * Prefix for all the imported component.
         * @default "Ui"
         */
        prefix: "",
        /**
         * Directory that the component lives in.
         * Will respect the Nuxt aliases.
         * @link https://nuxt.com/docs/api/nuxt-config#alias
         * @default "@/components/ui"
         */
        componentDir: "@/components/ui",
    },
});
