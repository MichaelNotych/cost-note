// DTO для аутентификации
export interface SignupRequest {
  name: string;
  email: string;
  password: string;
}

export interface SigninRequest {
  email: string;
  password: string;
}

export interface UpdateProfileRequest {
  name?: string;
  email?: string;
}

// DTO для расходов
export interface CreateExpenseRequest {
  userDescription: string;
}

export interface UpdateExpenseRequest {
  title?: string;
  amount?: number;
  currency?: string;
  category?: string;
}

// DTO для категорий
export interface CreateCategoryRequest {
  title: string;
  color: string;
}

export interface UpdateCategoryRequest {
  title?: string;
  color?: string;
}

// DTO для AI ответов
export interface AIExpenseData {
  amount: number;
  currency: string;
  title: string;
}

export interface AICategoryData {
  id: string | null;
  title: string;
}

// Общие DTO для API ответов
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface ApiError {
  success: false;
  error: string;
  statusCode?: number;
}

export interface ApiSuccess<T = unknown> {
  success: true;
  data: T;
  message?: string;
}

// DTO для запросов с пагинацией
export interface PaginationQuery {
  page?: number;
  limit?: number;
  sort?: string;
  order?: 'asc' | 'desc';
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

// DTO для фильтрации расходов
export interface ExpenseFilters {
  scope?: 'today' | 'week' | 'month' | 'year';
  category?: string;
  dateFrom?: string;
  dateTo?: string;
  minAmount?: number;
  maxAmount?: number;
  currency?: string;
}

// DTO для статистики
export interface ExpenseStats {
  totalAmount: number;
  totalCount: number;
  currency: string;
  categories: {
    category: string;
    amount: number;
    count: number;
    percentage: number;
  }[];
  dailyStats: {
    date: string;
    amount: number;
    count: number;
  }[];
}

// DTO для пользователя (без пароля)
export interface UserProfile {
  _id: string;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

// DTO для расхода с популированными данными
export interface ExpenseWithCategory {
  _id: string;
  title?: string;
  amount?: number;
  currency?: string;
  category?: {
    _id: string;
    title: string;
    color: string;
  };
  date: Date;
  userDescription: string;
  defaultCurrency?: {
    amount: number;
    currency: string;
  };
  createdAt: Date;
  updatedAt: Date;
}