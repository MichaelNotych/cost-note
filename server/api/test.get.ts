export default defineEventHandler(() => {
  return { works: true, time: new Date().toISOString() }
})