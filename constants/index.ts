export const PROMPT = `
I will give user input your task is extract from string amount,
currency as ISO currency code, and title of expense.
Examples:
input: 159 baht - breakfast
output:{"amount": 159,"currency": "THB","title": "breakfast"}
input: $2,99 - spotify sub
output:{"amount": 2.99,"currency": "USD","title": "Spotify Subscription"}
your answer must be valid JSON only, use examples as reference,
answer on my message only with JSON, dont write any markdown
input:`;
export const EXCHANGE_RATE_AI_MODEL = 'gemma-3-12b-it';
export const AI_MODEL = 'gemma-3-12b-it';
export const DEFAULT_CURRENCY = 'USD';