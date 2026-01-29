export interface Transaction {
  id: string;
  amount: number;
  type: 'income' | 'expense';
  category: string;
  memo?: string;
  date: string; // ISO string
  createdAt: string; // ISO string
}

export const DEFAULT_CATEGORIES = {
  expense: ['식비', '교통', '생활', '쇼핑', '기타'],
  income: ['급여', '용돈', '기타']
} as const;

export type TransactionType = 'income' | 'expense';
