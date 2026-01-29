import { create } from 'zustand';
import { Transaction } from '../types';
import { saveTransactions, loadTransactions } from '../utils/storage';

interface TransactionStore {
  transactions: Transaction[];
  isLoaded: boolean;
  addTransaction: (transaction: Omit<Transaction, 'id' | 'createdAt'>) => void;
  deleteTransaction: (id: string) => void;
  loadTransactions: () => Promise<void>;
}

export const useTransactionStore = create<TransactionStore>((set, get) => ({
  transactions: [],
  isLoaded: false,

  addTransaction: (transaction) => {
    const newTransaction: Transaction = {
      ...transaction,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };

    const updatedTransactions = [newTransaction, ...get().transactions];
    set({ transactions: updatedTransactions });
    saveTransactions(updatedTransactions);
  },

  deleteTransaction: (id) => {
    const updatedTransactions = get().transactions.filter(t => t.id !== id);
    set({ transactions: updatedTransactions });
    saveTransactions(updatedTransactions);
  },

  loadTransactions: async () => {
    const transactions = await loadTransactions();
    set({ transactions, isLoaded: true });
  }
}));
