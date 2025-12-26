import { connect } from 'mongoose'

export default defineNitroPlugin(async (_nitroApp) => {
    const config = useRuntimeConfig()

    try {
        await connect(config.mongoUri as string)
        console.log('Connected to MongoDB')
    } catch (e) {
        console.error('MongoDB connection error:', e)
    }
})
