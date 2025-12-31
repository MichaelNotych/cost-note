import { Expense } from "../../models/Expense";
import { Category } from "../../models/Category";
import { parseExpense } from "../../utils/ai";
import { convertCurrency } from "../../utils/currency";

export default defineEventHandler(async (event) => {
    const { user } = await requireUserSession(event);

    const body = await readBody(event);
    const { text } = body;

    if (!text) {
        throw createError({
            statusCode: 400,
            statusMessage: "Text is required",
        });
    }

    const parsedData = await parseExpense(text);
    if (!parsedData) {
        throw createError({
            statusCode: 500,
            statusMessage: "Failed to parse expense",
        });
    }

    if (!parsedData.amount || !parsedData.currency) {
        throw createError({
            statusCode: 500,
            statusMessage: "No amount or currency provided",
        });
    }

    // Category Logic
    let categoryId = null;
    let category = null;
    if (parsedData.category) {
        // Case-insensitive search
        category = await Category.findOne({
            name: parsedData.category,
            user: user.id,
        });

        if (!category) {
            category = await Category.create({
                name: parsedData.category,
                user: user.id,
            });
        }
        categoryId = category._id;
    }

    // Currency Conversion
    let defaultCurrency = null;
    if (parsedData.amount && parsedData.currency) {
        defaultCurrency = await convertCurrency(
            parsedData.amount,
            parsedData.currency
        );
    }

    // Create Expense
    const expense = new Expense({
        ...parsedData,
        category: categoryId,
        userDescription: text,
        user: user.id,
        defaultCurrency,
    });
    await expense.save();

    const populatedExpense = await expense.populate('category');

    return {
        success: true,
        data: {
            expense: populatedExpense
        }
    }
});
