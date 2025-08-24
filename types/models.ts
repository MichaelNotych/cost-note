// Интерфейс пользователя
export interface IUser {
  _id: string;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

// Интерфейс расхода
export interface IExpense {
  _id: string;
  title?: string;           // Название расхода (извлекается AI)
  amount?: number;          // Сумма (извлекается AI)
  currency?: string;        // Валюта (извлекается AI)
  category?: string;        // ID категории (подбирается AI)
  date: Date;              // Дата создания
  userDescription: string;  // Исходное описание пользователя
  user: string;            // ID пользователя
  defaultCurrency?: {      // Конвертированная сумма
    amount: number;
    currency: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

// Интерфейс курса валют
export interface IRate {
  _id: string;
  rates: string;    // JSON строка с курсами валют
  date: Date;       // Дата получения курсов
  createdAt: Date;
}

// Интерфейс категории
export interface ICategory {
  _id: string;
  title: string;    // Название категории
  color: string;    // Цвет категории (hex)
  createdAt: Date;
  updatedAt: Date;
}

// Типы для валютных курсов
export interface ExchangeRates {
  [currency: string]: number;
}

export interface RateData {
  base: string;
  rates: ExchangeRates;
  date: string;
}

// Типы для пользовательской сессии
export interface UserSession {
  user: {
    id: string;
    name: string;
    email: string;
  };
}