import React, { useRef, useEffect, useState } from 'react';
import { useTransactionStore } from '../store/useTransactionStore';
import { DEFAULT_CATEGORIES, TransactionType } from '../types';

export function QuickInput() {
  const [amount, setAmount] = useState('');
  const [type, setType] = useState<TransactionType>('expense');
  const [category, setCategory] = useState('');
  const [memo, setMemo] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const addTransaction = useTransactionStore(state => state.addTransaction);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    setCategory(DEFAULT_CATEGORIES[type][0]);
  }, [type]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const numAmount = parseFloat(amount);
    if (!numAmount || numAmount <= 0) return;

    addTransaction({
      amount: numAmount,
      type,
      category,
      memo: memo.trim() || undefined,
      date: new Date().toISOString()
    });

    setAmount('');
    setMemo('');
    inputRef.current?.focus();
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-xl font-bold mb-4 text-gray-800">빠른 입력</h2>
      
      <input
        ref={inputRef}
        type="text"
        inputMode="numeric"
        pattern="[0-9]*"
        placeholder="금액"
        value={amount}
        onChange={(e) => setAmount(e.target.value.replace(/[^0-9]/g, ''))}
        className="w-full text-3xl font-bold p-4 border-2 border-gray-300 rounded-lg mb-4 text-center"
      />

      <div className="grid grid-cols-2 gap-3 mb-4">
        <button
          type="button"
          onClick={() => setType('expense')}
          className={`py-4 rounded-lg font-bold text-lg transition-colors ${
            type === 'expense'
              ? 'bg-red-500 text-white'
              : 'bg-gray-100 text-gray-600'
          }`}
        >
          지출
        </button>
        <button
          type="button"
          onClick={() => setType('income')}
          className={`py-4 rounded-lg font-bold text-lg transition-colors ${
            type === 'income'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-100 text-gray-600'
          }`}
        >
          수입
        </button>
      </div>

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="w-full p-3 border-2 border-gray-300 rounded-lg mb-4"
      >
        {DEFAULT_CATEGORIES[type].map(cat => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>

      <input
        type="text"
        placeholder="메모 (선택)"
        value={memo}
        onChange={(e) => setMemo(e.target.value)}
        className="w-full p-3 border-2 border-gray-300 rounded-lg mb-4"
      />

      <button
        type="submit"
        className="w-full bg-indigo-500 text-white py-4 rounded-lg font-bold text-lg hover:bg-indigo-600 transition-colors"
      >
        저장
      </button>
    </form>
  );
}
