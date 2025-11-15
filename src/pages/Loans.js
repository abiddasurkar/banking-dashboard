import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardHeader, CardContent } from "../components/ui/Card";
import Badge from "../components/ui/Badge";
import { loansData } from "../data/mockData";
import { Plus, Calendar, X, ArrowRight } from "lucide-react";

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

const formatCurrency = (amount) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);

const formatDate = (dateString) =>
  new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

const calculateDaysUntil = (dateString) => {
  const diffTime = new Date(dateString) - new Date();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

// ============================================================================
// REUSABLE UI COMPONENTS
// ============================================================================

const StatCard = ({ label, value, color }) => (
  <Card className="hover:shadow-lg transition-shadow">
    <CardContent className="text-center py-6">
      <p className="text-sm text-gray-600 dark:text-gray-400">{label}</p>
      <p className={`text-2xl font-bold mt-2 ${color}`}>{value}</p>
    </CardContent>
  </Card>
);

const ProgressBar = ({ progress }) => (
  <div className="space-y-1">
    <div className="flex justify-between text-xs">
      <span className="text-gray-600 dark:text-gray-400">Progress</span>
      <span className="font-semibold text-blue-600 dark:text-blue-400">
        {progress.toFixed(1)}%
      </span>
    </div>
    <div className="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-2 relative overflow-hidden">
      <motion.div
        className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2 rounded-full"
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      />
    </div>
  </div>
);

// ============================================================================
// LOAN GRID CARD COMPONENT
// ============================================================================

const LoanGridCard = ({ loan, onClick }) => {
  const daysUntilPayment = calculateDaysUntil(loan.nextPayment);
  const IconComponent = loan.icon;
  const isActive = loan.status === "Active";

  return (
    <motion.div
      onClick={onClick}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.02, translateY: -4 }}
      className="cursor-pointer group"
    >
      <Card className="h-full border-l-4 border-l-blue-500 hover:shadow-xl transition-all duration-300 overflow-hidden">
        <CardContent className="p-5 h-full flex flex-col justify-between space-y-4">
          {/* Header */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-900/20">
                <IconComponent className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <Badge variant={isActive ? "success" : "default"}>
                {loan.status}
              </Badge>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 dark:text-white truncate">
                {loan.name}
              </h3>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                {loan.type}
              </p>
            </div>
          </div>

          {/* Key Info */}
          <div className="space-y-3 py-3 border-y border-gray-200 dark:border-slate-700">
            <div>
              <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                Monthly Payment
              </p>
              <p className="font-bold text-lg text-blue-600 dark:text-blue-400">
                {formatCurrency(loan.monthlyPayment)}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 text-center">
              <div className="bg-gray-50 dark:bg-slate-800 p-2 rounded">
                <p className="text-xs text-gray-600 dark:text-gray-400">Paid</p>
                <p className="text-sm font-bold text-emerald-600 dark:text-emerald-400">
                  {loan.progress.toFixed(0)}%
                </p>
              </div>
              <div className="bg-gray-50 dark:bg-slate-800 p-2 rounded">
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Remaining
                </p>
                <p className="text-sm font-bold text-blue-600 dark:text-blue-400">
                  {formatCurrency(loan.remainingAmount)}
                </p>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <ProgressBar progress={loan.progress} />

          {/* Footer */}
          <div className="space-y-2">
            {isActive && daysUntilPayment <= 7 && (
              <Badge variant="warning" className="w-full text-center text-xs">
                Due in {daysUntilPayment} days
              </Badge>
            )}
            {isActive && (
              <p className="text-xs text-gray-600 dark:text-gray-400 text-center">
                <Calendar className="w-3 h-3 inline mr-1" />
                Next: {formatDate(loan.nextPayment)}
              </p>
            )}
            <div className="flex items-center justify-center gap-2 text-blue-600 dark:text-blue-400 group-hover:gap-3 transition-all text-sm font-medium">
              View Details
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

// ============================================================================
// LOAN DETAIL MODAL/POPUP
// ============================================================================

const LoanDetailModal = ({ loan, isOpen, onClose }) => {
  if (!isOpen || !loan) return null;

  const IconComponent = loan.icon;
  const daysUntilPayment = calculateDaysUntil(loan.nextPayment);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        >
          {/* Modal Header */}
          <div className="sticky top-0 flex items-center justify-between p-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-b border-gray-200 dark:border-slate-700">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-blue-600 dark:bg-blue-700">
                <IconComponent className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {loan.name}
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {loan.type}
                </p>
              </div>
            </div>
            <motion.button
              onClick={onClose}
              className="p-2 hover:bg-gray-200 dark:hover:bg-slate-700 rounded-lg transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <X className="w-6 h-6 text-gray-600 dark:text-gray-400" />
            </motion.button>
          </div>

          {/* Modal Content */}
          <div className="p-6 space-y-6">
            {/* Status & Badges */}
            <div className="space-y-3">
              <div className="flex flex-wrap gap-2">
                <Badge
                  variant={loan.status === "Active" ? "success" : "default"}
                >
                  {loan.status}
                </Badge>
                <Badge variant="default">{loan.interestRate}% Interest</Badge>
                {loan.status === "Active" && daysUntilPayment <= 7 && (
                  <Badge variant="warning">
                    Due in {daysUntilPayment} days
                  </Badge>
                )}
              </div>
            </div>

            {/* Loan Timeline */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-gray-50 dark:bg-slate-800 p-4 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                  Start Date
                </p>
                <p className="font-bold text-gray-900 dark:text-white">
                  {formatDate(loan.startDate)}
                </p>
              </div>
              <div className="bg-gray-50 dark:bg-slate-800 p-4 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                  Interest Rate
                </p>
                <p className="font-bold text-gray-900 dark:text-white">
                  {loan.interestRate}% per annum
                </p>
              </div>
            </div>

            {/* Amount Breakdown */}
            <div className="space-y-3">
              <h3 className="font-semibold text-gray-900 dark:text-white">
                Loan Amount Breakdown
              </h3>
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg text-center">
                  <p className="text-xs text-blue-600 dark:text-blue-400 mb-1">
                    Total Amount
                  </p>
                  <p className="text-lg font-bold text-blue-700 dark:text-blue-300">
                    {formatCurrency(loan.amount)}
                  </p>
                </div>
                <div className="bg-emerald-50 dark:bg-emerald-900/20 p-4 rounded-lg text-center">
                  <p className="text-xs text-emerald-600 dark:text-emerald-400 mb-1">
                    Paid So Far
                  </p>
                  <p className="text-lg font-bold text-emerald-700 dark:text-emerald-300">
                    {formatCurrency(loan.paid)}
                  </p>
                </div>
                <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg text-center">
                  <p className="text-xs text-orange-600 dark:text-orange-400 mb-1">
                    Remaining
                  </p>
                  <p className="text-lg font-bold text-orange-700 dark:text-orange-300">
                    {formatCurrency(loan.remainingAmount)}
                  </p>
                </div>
              </div>
            </div>

            {/* Payment Details */}
            <div className="space-y-3">
              <h3 className="font-semibold text-gray-900 dark:text-white">
                Payment Details
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gray-50 dark:bg-slate-800 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                    Monthly Payment
                  </p>
                  <p className="text-lg font-bold text-gray-900 dark:text-white">
                    {formatCurrency(loan.monthlyPayment)}
                  </p>
                </div>
                {loan.status === "Active" && (
                  <div className="bg-gray-50 dark:bg-slate-800 p-4 rounded-lg">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                      Next Payment Due
                    </p>
                    <p className="text-lg font-bold text-gray-900 dark:text-white">
                      {formatDate(loan.nextPayment)}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Progress */}
            <div className="space-y-3">
              <h3 className="font-semibold text-gray-900 dark:text-white">
                Repayment Progress
              </h3>
              <ProgressBar progress={loan.progress} />
              <div className="text-sm text-gray-600 dark:text-gray-400">
                You have paid <span className="font-semibold">{loan.progress.toFixed(1)}%</span> of your loan.
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-200 dark:border-slate-700">
              {loan.status === "Active" ? (
                <>
                  <motion.button
                    className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors flex-1"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Make Payment
                  </motion.button>
                  <motion.button
                    className="px-6 py-3 border border-gray-300 dark:border-slate-600 hover:bg-gray-50 dark:hover:bg-slate-700 text-gray-700 dark:text-gray-300 rounded-lg font-medium transition-colors flex-1"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    View Payment Schedule
                  </motion.button>
                </>
              ) : (
                <motion.button
                  className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium transition-colors w-full"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Download Certificate
                </motion.button>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

// ============================================================================
// LOANS LIST COMPONENT
// ============================================================================

const LoansList = ({ loans, onLoanClick, emptyMessage, emptyTitle }) => {
  if (loans.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-16"
      >
        <div className="text-6xl mb-4">🏦</div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          {emptyTitle}
        </h3>
        <p className="text-gray-600 dark:text-gray-400">{emptyMessage}</p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {loans.map((loan) => (
        <LoanGridCard
          key={loan.id}
          loan={loan}
          onClick={() => onLoanClick(loan)}
        />
      ))}
    </motion.div>
  );
};

// ============================================================================
// TAB COMPONENT
// ============================================================================

const TabBar = ({ tabs, activeTab, setActiveTab }) => (
  <div className="flex gap-2 border-b border-gray-200 dark:border-slate-700 overflow-x-auto">
    {tabs.map((tab) => (
      <motion.button
        key={tab.id}
        onClick={() => setActiveTab(tab.id)}
        className={`px-4 py-3 font-medium text-sm whitespace-nowrap transition-colors relative flex-shrink-0 ${activeTab === tab.id
            ? "text-blue-600 dark:text-blue-400"
            : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
          }`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
      >
        <span className="flex items-center gap-2">
          {tab.label}
          <span className="px-2 py-0.5 text-xs bg-gray-200 dark:bg-slate-700 rounded-full font-semibold">
            {tab.count}
          </span>
        </span>
        {activeTab === tab.id && (
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-1 bg-blue-500"
            layoutId="activeTab"
          />
        )}
      </motion.button>
    ))}
  </div>
);

// ============================================================================
// MAIN LOANS COMPONENT
// ============================================================================

const Loans = () => {
  const [activeTab, setActiveTab] = useState("active");
  const [selectedLoan, setSelectedLoan] = useState(null);

  // Calculate stats memoized
  const stats = useMemo(() => {
    const allLoans = [...loansData.active, ...loansData.paid];
    return {
      total: allLoans.length,
      active: loansData.active.length,
      paid: loansData.paid.length,
      totalBalance: loansData.active.reduce(
        (sum, loan) => sum + loan.remainingAmount,
        0
      ),
      avgProgress:
        loansData.active.length > 0
          ? loansData.active.reduce((sum, loan) => sum + loan.progress, 0) /
          loansData.active.length
          : 0,
    };
  }, []);

  // Tab configuration
  const tabs = [
    { id: "active", label: "Active", count: stats.active },
    { id: "paid", label: "Paid Off", count: stats.paid },
  ];

  // Get current loans based on active tab
  const currentLoans = loansData[activeTab];

  return (
    <div className="space-y-6 p-4 sm:p-6">
      {/* ===== HEADER SECTION ===== */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Loans
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage and track all your loans in one place.
          </p>
        </div>
        <motion.button
          className="px-4 sm:px-6 py-2 sm:py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors shadow-sm flex items-center gap-2 whitespace-nowrap"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">Apply for Loan</span>
          <span className="sm:hidden">Apply</span>
        </motion.button>
      </motion.div>

      {/* ===== STATS SECTION ===== */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
        >
          <StatCard label="Total Loans" value={stats.total} color="text-gray-900 dark:text-white" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <StatCard label="Active" value={stats.active} color="text-blue-600 dark:text-blue-400" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          <StatCard
            label="Total Balance"
            value={formatCurrency(stats.totalBalance)}
            color="text-red-600 dark:text-red-400"
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <StatCard
            label="Avg Progress"
            value={`${stats.avgProgress.toFixed(1)}%`}
            color="text-emerald-600 dark:text-emerald-400"
          />
        </motion.div>
      </div>

      {/* ===== LOANS GRID SECTION ===== */}
      <Card>
        <CardHeader className="pb-0">
          <TabBar tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
        </CardHeader>

        <CardContent className="pt-6">
          <AnimatePresence mode="wait">
            <LoansList
              key={activeTab}
              loans={currentLoans}
              onLoanClick={setSelectedLoan}
              emptyTitle={`No ${activeTab === "active" ? "Active" : "Paid"} Loans`}
              emptyMessage={
                activeTab === "active"
                  ? "You don't have any active loans at the moment."
                  : "You haven't paid off any loans yet."
              }
            />
          </AnimatePresence>
        </CardContent>
      </Card>

      {/* ===== LOAN DETAIL MODAL ===== */}
      <LoanDetailModal
        loan={selectedLoan}
        isOpen={!!selectedLoan}
        onClose={() => setSelectedLoan(null)}
      />
    </div>
  );
};

export default Loans;