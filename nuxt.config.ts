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
    ssr: true, // This ensures full SSR and includes server routes

    // Optional but recommended for Nitro server deployments
    nitro: {
        preset: "node-server", // Ensures full Node server output, not static
    },
});
