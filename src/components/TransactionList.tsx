import React from 'react';
import { useTransactionStore } from '../store/useTransactionStore';
import { formatCurrency, formatDateTime } from '../utils/formatters';

export function TransactionList() {
  const { transactions, deleteTransaction } = useTransactionStore();

  if (transactions.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8 text-center text-gray-500">
        아직 입력된 내역이 없습니다
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {transactions.map(transaction => (
        <div
          key={transaction.id}
          className="bg-white rounded-lg shadow-md p-4 flex items-center justify-between"
        >
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className={`font-bold text-xl ${
                transaction.type === 'income' ? 'text-blue-600' : 'text-red-600'
              }`}>
                {transaction.type === 'income' ? '+' : '-'}{formatCurrency(transaction.amount)}
              </span>
              <span className="px-2 py-1 text-xs rounded bg-gray-100 text-gray-600">
                {transaction.category}
              </span>
            </div>
            {transaction.memo && (
              <p className="text-sm text-gray-600 mb-1">{transaction.memo}</p>
            )}
            <p className="text-xs text-gray-400">{formatDateTime(transaction.createdAt)}</p>
          </div>
          
          <button
            onClick={() => deleteTransaction(transaction.id)}
            className="ml-4 px-3 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
          >
            삭제
          </button>
        </div>
      ))}
    </div>
  );
}
