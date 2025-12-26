export interface Expense {
    _id: string;
    title?: string;
    amount?: number;
    currency?: string;
    category?: {
        _id: string;
        name: string;
        icon: string;
    };
    date?: string;
    userDescription: string;
    user: string;
    defaultCurrency?: {
        amount: number;
        currency: string;
    };
    createdAt?: string;
    updatedAt?: string;
}
