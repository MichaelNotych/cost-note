import mongoose from "mongoose";

export default defineNitroPlugin(async (nitroApp) => {
	const config = useRuntimeConfig();

	await mongoose.connect(config.MONGO_URI);
	console.log('Connected to MongoDB');

	nitroApp.hooks.hook('close', async () => {
		console.log('Closing MongoDB connection (inside nitroApp.hooks)');
		await mongoose.connection.close();
	});
});