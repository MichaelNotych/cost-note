import { Rate } from '../models/Rate'

export const convertCurrency = async (amount: number, from: string, to: string = 'USD') => {
    const config = useRuntimeConfig()

    try {
        // 1. Get latest rates from DB
        let rateDoc = await Rate.findOne().sort({ date: -1 })

        // 2. Check if we need to update (no rates or older than 3 days)
        const threeDaysAgo = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)

        if (!rateDoc || rateDoc.date < threeDaysAgo) {
            console.log('Fetching new exchange rates...')
            const response: any = await $fetch(`https://v6.exchangerate-api.com/v6/${config.exchangeRateApiKey}/latest/USD`)

            if (response && response.conversion_rates) {
                rateDoc = await Rate.create({
                    rates: response.conversion_rates,
                    date: new Date()
                })
            }
        }

        if (!rateDoc || !rateDoc.rates) {
            console.warn('No rates available, returning original amount')
            return { amount, currency: from }
        }

        // 3. Convert
        // Formula: amount / rate[from] * rate[to]
        // rates are based on USD. 
        // Example: USD=1, THB=34. 
        // 100 THB -> USD: 100 / 34 * 1 = 2.94

        const fromRate = rateDoc.rates.get(from)
        const toRate = rateDoc.rates.get(to)

        if (!fromRate || !toRate) {
            console.warn(`Rate not found for ${from} or ${to}`)
            return { amount, currency: from }
        }

        const convertedAmount = (amount / fromRate) * toRate

        return {
            amount: convertedAmount,
            currency: to
        }

    } catch (e) {
        console.error('Currency conversion error:', e)
        return { amount, currency: from }
    }
}
