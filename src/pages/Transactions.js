import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardContent } from '../components/UI/Card';
import Badge from '../components/UI/Badge';
import { mockData } from '../data/mockData';

const Transactions = () => {
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date');

  const filteredTransactions = filter === 'all' 
    ? mockData.transactions 
    : mockData.transactions.filter(t => t.amount > 0 ? 'income' === filter : 'expenses' === filter);

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Transactions</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">View and manage all your transactions.</p>
      </motion.div>

      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">All Transactions</h3>
            <div className="flex gap-2">
              <select 
                value={filter} 
                onChange={(e) => setFilter(e.target.value)} 
                className="px-3 py-2 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
              >
                <option value="all">All</option>
                <option value="income">Income</option>
                <option value="expenses">Expenses</option>
              </select>
              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)} 
                className="px-3 py-2 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
              >
                <option value="date">Latest</option>
                <option value="amount">Amount</option>
              </select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-slate-700">
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-400">Date</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-400">Description</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-400">Category</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-400">Status</th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 dark:text-gray-400">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-slate-700">
                {filteredTransactions.map((txn) => (
                  <motion.tr 
                    key={txn.id} 
                    className="hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors" 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }}
                  >
                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">{txn.date}</td>
                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300 font-medium">{txn.description}</td>
                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">{txn.category}</td>
                    <td className="px-4 py-3"><Badge variant="success">{txn.status}</Badge></td>
                    <td className={`px-4 py-3 text-sm text-right font-semibold ${txn.amount >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'}`}>
                      {txn.amount >= 0 ? '+' : '-'}${Math.abs(txn.amount).toLocaleString()}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Transactions;