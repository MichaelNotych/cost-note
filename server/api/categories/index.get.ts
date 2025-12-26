import { Category } from "../../models/Category";

export default defineEventHandler(async (event) => {
    const { user } = await requireUserSession(event);

    // Find or create category
    let categories = await Category.find({
        user: user.id
    });

    return categories;
});