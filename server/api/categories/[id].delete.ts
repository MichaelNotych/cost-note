import { Category } from '../../models/Category'

export default defineEventHandler(async (event) => {
    const id = getRouterParam(event, 'id')

    const category = await Category.findByIdAndDelete(id)

    if (!category) {
        throw createError({ statusCode: 404, statusMessage: 'Category not found' })
    }

    return { success: true }
})
