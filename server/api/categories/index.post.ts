import { Category } from "../../models/Category";

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const { user } = await requireUserSession(event);

    if (!body.name) {
        throw createError({
            statusCode: 400,
            statusMessage: "Name is required",
        });
    }

    // Find or create category
    let category = await Category.findOne({
        name: { $regex: new RegExp(`^${body.name}$`, "i") },
        user: user.id
    });

    if (!category) {
        category = await Category.create({
            name: body.name,
            icon: body.icon || "🏷️",
            user: user.id,
        });
    }

    return category;
});
