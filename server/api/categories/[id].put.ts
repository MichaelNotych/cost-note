import { Category } from '../../models/Category'

export default defineEventHandler(async (event) => {
    const id = getRouterParam(event, 'id')
    const body = await readBody(event)

    if (!body.name) {
        throw createError({ statusCode: 400, statusMessage: 'Name is required' })
    }

    const category = await Category.findByIdAndUpdate(
        id,
        {
            name: body.name,
            ...(body.icon && { icon: body.icon })
        },
        { new: true }
    )

    if (!category) {
        throw createError({ statusCode: 404, statusMessage: 'Category not found' })
    }

    return category
})
