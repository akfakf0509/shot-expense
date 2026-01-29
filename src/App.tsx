import { useEffect } from 'react';
import { QuickInput } from './components/QuickInput';
import { TransactionList } from './components/TransactionList';
import { useTransactionStore } from './store/useTransactionStore';
import './App.css';

function App() {
  const loadTransactions = useTransactionStore(state => state.loadTransactions);

  useEffect(() => {
    loadTransactions();
  }, [loadTransactions]);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-indigo-600 text-white py-4 px-6 shadow-lg">
        <h1 className="text-2xl font-bold">📸 찰칵가계부</h1>
      </header>
      
      <main className="max-w-2xl mx-auto p-4 pb-8">
        <QuickInput />
        <TransactionList />
      </main>
    </div>
  );
}

export default App;
