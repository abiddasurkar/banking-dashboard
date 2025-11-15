import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardContent } from "../components/ui/Card";
import Badge from "../components/ui/Badge";
import { loansData } from "../data/mockData";

const Loans = () => {
  const [activeTab, setActiveTab] = useState("active");

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const calculateDaysUntil = (dateString) => {
    const today = new Date();
    const target = new Date(dateString);
    const diffTime = target - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const LoanCard = ({ loan }) => {
    const daysUntilPayment = calculateDaysUntil(loan.nextPayment);
    const IconComponent = loan.icon;
    
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Card hover={true} className="border-l-4 border-l-blue-500 relative overflow-hidden">
          {/* Background decorative element */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full -mr-16 -mt-16"></div>
          
          <CardContent>
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-6 gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <IconComponent className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                      {loan.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {loan.type} • Started {formatDate(loan.startDate)}
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  <Badge variant={loan.status === "Active" ? "success" : "default"}>
                    {loan.status}
                  </Badge>
                  <Badge variant="default">
                    {loan.interestRate}% Interest
                  </Badge>
                  {daysUntilPayment <= 7 && loan.status === "Active" && (
                    <Badge variant="warning">
                      Due in {daysUntilPayment} days
                    </Badge>
                  )}
                </div>
              </div>

              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg min-w-[140px]">
                <p className="text-sm text-blue-600 dark:text-blue-400 font-medium">
                  Monthly Payment
                </p>
                <p className="text-lg font-bold text-blue-700 dark:text-blue-300">
                  {formatCurrency(loan.monthlyPayment)}
                </p>
                {loan.status === "Active" && (
                  <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                    Due {formatDate(loan.nextPayment)}
                  </p>
                )}
              </div>
            </div>

            {/* Progress Section */}
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <div className="bg-gray-50 dark:bg-slate-800 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                    Total Amount
                  </p>
                  <p className="text-lg font-bold text-gray-900 dark:text-white">
                    {formatCurrency(loan.amount)}
                  </p>
                </div>
                <div className="bg-emerald-50 dark:bg-emerald-900/20 p-4 rounded-lg">
                  <p className="text-sm text-emerald-600 dark:text-emerald-400 mb-1">
                    Amount Paid
                  </p>
                  <p className="text-lg font-bold text-emerald-700 dark:text-emerald-300">
                    {formatCurrency(loan.paid)}
                  </p>
                </div>
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                  <p className="text-sm text-blue-600 dark:text-blue-400 mb-1">
                    Remaining
                  </p>
                  <p className="text-lg font-bold text-blue-700 dark:text-blue-300">
                    {formatCurrency(loan.remainingAmount)}
                  </p>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">
                    Payment Progress
                  </span>
                  <span className="font-semibold text-blue-600 dark:text-blue-400">
                    {loan.progress.toFixed(1)}% Complete
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-3 relative">
                  <motion.div
                    className="bg-gradient-to-r from-blue-500 to-indigo-600 h-3 rounded-full relative"
                    initial={{ width: 0 }}
                    animate={{ width: `${loan.progress}%` }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                  >
                    <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-4 h-4 bg-white border-2 border-blue-500 rounded-full shadow-lg"></div>
                  </motion.div>
                </div>
                <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                  <span>Start</span>
                  <span>Complete</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                {loan.status === "Active" && (
                  <>
                    <motion.button 
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors flex-1 shadow-sm"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Make Payment
                    </motion.button>
                    <motion.button 
                      className="px-4 py-2 border border-gray-300 dark:border-slate-600 hover:bg-gray-50 dark:hover:bg-slate-700 text-gray-700 dark:text-gray-300 rounded-lg font-medium transition-colors flex-1"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      View Schedule
                    </motion.button>
                  </>
                )}
                {loan.status === "Paid" && (
                  <motion.button 
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium transition-colors flex-1"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    View Certificate
                  </motion.button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  };

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Loans
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Manage your loans and track payment progress.
            </p>
          </div>
          <motion.button
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors shadow-sm flex items-center gap-2"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span>➕</span>
            Apply for Loan
          </motion.button>
        </div>
      </motion.div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">Total Loans</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
              {loansData.active.length + loansData.paid.length}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">Active Loans</p>
            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400 mt-1">
              {loansData.active.length}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">Total Balance</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
              {formatCurrency(
                loansData.active.reduce((sum, loan) => sum + loan.remainingAmount, 0)
              )}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">Avg Progress</p>
            <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mt-1">
              {(
                loansData.active.reduce((sum, loan) => sum + loan.progress, 0) /
                (loansData.active.length || 1)
              ).toFixed(1)}%
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Tab Navigation */}
      <Card>
        <CardContent className="p-4">
          <div className="flex space-x-1">
            {[
              { id: "active", label: "Active Loans", count: loansData.active.length },
              { id: "paid", label: "Paid Off", count: loansData.paid.length },
            ].map((tab) => (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative px-6 py-3 rounded-lg font-medium transition-colors ${
                  activeTab === tab.id
                    ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {tab.label}
                <span className="ml-2 px-2 py-1 text-xs bg-gray-200 dark:bg-slate-600 rounded-full">
                  {tab.count}
                </span>
                {activeTab === tab.id && (
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500 rounded-full"
                    layoutId="activeTab"
                  />
                )}
              </motion.button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Loans List */}
      <div className="space-y-6">
        {loansData[activeTab].map((loan, idx) => (
          <LoanCard key={loan.id} loan={loan} />
        ))}

        {loansData[activeTab].length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <div className="text-6xl mb-4">🏦</div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                No {activeTab === "active" ? "Active" : "Paid"} Loans
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                {activeTab === "active" 
                  ? "You don't have any active loans at the moment." 
                  : "You haven't paid off any loans yet."}
              </p>
              {activeTab === "active" && (
                <motion.button 
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Apply for a Loan
                </motion.button>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Loans;