import { Category } from '../../models/Category'

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    // TODO: Auth
    const user = { _id: '60d5ec49f1b2c8b1f8c8e8e8' }

    if (!body.name) {
        throw createError({ statusCode: 400, statusMessage: 'Name is required' })
    }

    // Find or create category
    let category = await Category.findOne({
        name: { $regex: new RegExp(`^${body.name}$`, 'i') },
        // user: user._id 
    })

    if (!category) {
        category = await Category.create({
            name: body.name,
            icon: body.icon || '🏷️',
            user: user._id
        })
    }

    return category
})
