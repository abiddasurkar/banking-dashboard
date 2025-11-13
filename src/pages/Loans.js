import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardContent } from '../components/UI/Card';
import Badge from '../components/UI/Badge';
import { mockData } from '../data/mockData';

const Loans = () => {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Loans</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">Manage your loans and track payment progress.</p>
      </motion.div>

      {/* Loan Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardContent className="text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">Total Loans</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
              {mockData.loans.length}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">Total Balance</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
              {formatCurrency(mockData.loans.reduce((sum, loan) => sum + (loan.amount - loan.paid), 0))}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">Average Progress</p>
            <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mt-1">
              {((mockData.loans.reduce((sum, loan) => sum + loan.progress, 0) / mockData.loans.length) || 0).toFixed(1)}%
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6">
        {mockData.loans.map((loan, idx) => (
          <motion.div 
            key={loan.id} 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: idx * 0.1 }}
          >
            <Card hover={true} className="border-l-4 border-l-blue-500">
              <CardContent>
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-6 gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{loan.name}</h3>
                      <Badge variant="success">{loan.status}</Badge>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                      <p className="text-gray-600 dark:text-gray-400">
                        <span className="font-medium">Interest Rate:</span> {loan.interestRate}%
                      </p>
                      <p className="text-gray-600 dark:text-gray-400">
                        <span className="font-medium">Next Payment:</span> {formatDate(loan.nextPayment)}
                      </p>
                    </div>
                  </div>
                  
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
                    <p className="text-sm text-blue-600 dark:text-blue-400 font-medium">Monthly Payment</p>
                    <p className="text-lg font-bold text-blue-700 dark:text-blue-300">
                      {formatCurrency((loan.amount * (loan.interestRate / 100) / 12) + (loan.amount / 60))}
                    </p>
                  </div>
                </div>

                {/* Progress Section */}
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                    <div className="bg-gray-50 dark:bg-slate-800 p-4 rounded-lg">
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Amount</p>
                      <p className="text-lg font-bold text-gray-900 dark:text-white">{formatCurrency(loan.amount)}</p>
                    </div>
                    <div className="bg-emerald-50 dark:bg-emerald-900/20 p-4 rounded-lg">
                      <p className="text-sm text-emerald-600 dark:text-emerald-400 mb-1">Amount Paid</p>
                      <p className="text-lg font-bold text-emerald-700 dark:text-emerald-300">{formatCurrency(loan.paid)}</p>
                    </div>
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                      <p className="text-sm text-blue-600 dark:text-blue-400 mb-1">Remaining</p>
                      <p className="text-lg font-bold text-blue-700 dark:text-blue-300">
                        {formatCurrency(loan.amount - loan.paid)}
                      </p>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Payment Progress</span>
                      <span className="font-semibold text-blue-600 dark:text-blue-400">
                        {loan.progress.toFixed(1)}% Complete
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-3">
                      <motion.div
                        className="bg-gradient-to-r from-blue-500 to-indigo-600 h-3 rounded-full relative"
                        initial={{ width: 0 }}
                        animate={{ width: `${loan.progress}%` }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                      >
                        <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-4 h-4 bg-white border-2 border-blue-500 rounded-full"></div>
                      </motion.div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                      <span>Start</span>
                      <span>Complete</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 pt-4">
                    <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors flex-1">
                      Make Payment
                    </button>
                    <button className="px-4 py-2 border border-gray-300 dark:border-slate-600 hover:bg-gray-50 dark:hover:bg-slate-700 text-gray-700 dark:text-gray-300 rounded-lg font-medium transition-colors flex-1">
                      View Details
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Empty State (if no loans) */}
      {mockData.loans.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <div className="text-6xl mb-4">🏦</div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No Active Loans</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">You don't have any active loans at the moment.</p>
            <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">
              Apply for a Loan
            </button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Loans;