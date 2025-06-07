import { defineCronHandler } from '#nuxt/cron'
import { useRuntimeConfig } from '#imports'
import { Rate } from '~/server/models/rates.model';

export default defineCronHandler('daily', async () => {
	console.log('Fetching exchange rate');
	const config = useRuntimeConfig();
	const response = await fetch(`https://v6.exchangerate-api.com/v6/${config.EXCHANGE_RATE_API_KEY}/latest/USD`);
	const data = await response.json();
	const rates = data.conversion_rates;
	const ratesEntity = new Rate({
		rates: JSON.stringify(rates),
		date: new Date(),
	});
	await ratesEntity.save();
	console.log('Exchange rate fetched and saved');
});