import { Expense } from '../../models/Expense'

export default defineEventHandler(async (event) => {
    const { user } = await requireUserSession(event)

    const expenses = await Expense.find({ user: user.id })
        .sort({ date: -1 })
        .populate('category')
        .limit(20)

    return expenses
})
