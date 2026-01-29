import { Preferences } from '@capacitor/preferences';
import { Transaction } from '../types';

const STORAGE_KEY = 'transactions';

export async function saveTransactions(transactions: Transaction[]): Promise<void> {
  await Preferences.set({
    key: STORAGE_KEY,
    value: JSON.stringify(transactions)
  });
}

export async function loadTransactions(): Promise<Transaction[]> {
  const { value } = await Preferences.get({ key: STORAGE_KEY });
  if (!value) return [];
  try {
    return JSON.parse(value);
  } catch {
    return [];
  }
}
