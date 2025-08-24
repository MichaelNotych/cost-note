// Промпт для AI для извлечения данных о трате
export const EXTRACT_PROMPT: string = `
I will give user input your task is extract from string amount,
currency as ISO currency code, and title of expense.
Examples:
input: 159 baht - breakfast
output:{"amount": 159,"currency": "THB","title": "breakfast"}
input: $2,99 - spotify sub
output:{"amount": 2.99,"currency": "USD","title": "Spotify Subscription"}
your answer must be valid JSON only, use examples as reference,
answer on my message only with JSON, don't write any markdown
input:`;

// Промпт для AI для определения категории
export const CATEGORY_PROMPT: string = `
I will give an expense string and expense categories list,
your task is to return the id and title of the category that matches the best.
If there are no categories (or there is no category that will match more than 70%), 
than send me id as a null, and title as a new category title
Examples:
input: {expense: "breakfast", categories: "[{id: 1, title: "Food"},{id: 2, title: "Supermarket"}, {id: 3, title: "Tickets"}]"}
output:{"id": 1, title: "Food"}
input: {expense: "cocktails", categories: "[{id: 1, title: "Food"},{id: 2, title: "Supermarket"}, {id: 3, title: "Tickets"}]"}
output:{"id": "null", title: "Entertainment"}
your answer must be valid JSON only, use examples as reference,
answer on my message only with JSON, don't write any markdown
input:`;