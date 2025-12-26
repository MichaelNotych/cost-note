import { Expense } from '../../models/Expense'

export default defineEventHandler(async (event) => {
    const id = getRouterParam(event, 'id')
    const body = await readBody(event)

    // Filter allowed fields
    const updateData: any = {}
    if (body.categoryId) updateData.category = body.categoryId
    if (body.title) updateData.title = body.title
    if (body.amount) updateData.amount = body.amount
    // Add other fields as needed

    const updatedExpense = await Expense.findByIdAndUpdate(
        id,
        updateData,
        { new: true }
    ).populate('category')

    if (!updatedExpense) {
        throw createError({ statusCode: 404, statusMessage: 'Expense not found' })
    }

    return updatedExpense
})
