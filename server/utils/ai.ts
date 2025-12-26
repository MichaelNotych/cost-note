
import { GoogleGenerativeAI } from '@google/generative-ai'

export const parseExpense = async (input: string) => {
  const config = useRuntimeConfig()
  if (!config.googleApiKey) {
    console.error('CRITICAL: GOOGLE_API_KEY is missing in runtime config!')
    return null
  }
  console.log('AI: Initializing with key length:', config.googleApiKey.length)
  const genAI = new GoogleGenerativeAI(config.googleApiKey)
  const model = genAI.getGenerativeModel({ model: 'gemma-3-12b-it' })

  const prompt = `
    Extract the following details from the expense description:
    - amount (number)
    - currency (ISO code, e.g., USD, THB)
    - title (short description)
    - category (one word category, e.g., Food, Transport, Entertainment. If not sure, suggest a reasonable one.)

    Input: "${input}"

    Output JSON format:
    {
      "amount": number,
      "currency": "string",
      "title": "string",
      "category": "string"
    }
    
    Return ONLY valid JSON.
  `

  try {
    console.log('AI: Sending prompt to Gemini...')
    const result = await model.generateContent(prompt)
    const response = await result.response
    const text = response.text()
    console.log('AI: Received response:', text)
    // Clean up markdown code blocks if present
    const cleanText = text.replace(/```json/g, '').replace(/```/g, '').trim()
    return JSON.parse(cleanText)
  } catch (error) {
    console.error('AI Parsing Error Details:', error)
    return null
  }
}


