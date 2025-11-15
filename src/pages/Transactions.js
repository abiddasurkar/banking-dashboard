import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardHeader, CardContent } from "../components/ui/Card";
import Badge from "../components/ui/Badge";

import { transactionsPageData } from "../data/mockData";

const Transactions = () => {
  const [filter, setFilter] = useState("all");
  const [sortBy, setSortBy] = useState("date");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);

  const { categories, transactions: allTransactions } = transactionsPageData;

  const transactions = useMemo(() => {
    let filtered = [...allTransactions];

    if (filter !== "all") {
      filtered = filtered.filter((txn) => txn.type === filter);
    }

    if (searchTerm) {
      filtered = filtered.filter(
        (txn) =>
          txn.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          txn.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategories.length > 0) {
      filtered = filtered.filter((txn) =>
        selectedCategories.includes(txn.category)
      );
    }

    filtered.sort((a, b) => {
      if (sortBy === "date") {
        return new Date(b.date) - new Date(a.date);
      } else if (sortBy === "amount") {
        return Math.abs(b.amount) - Math.abs(a.amount);
      }
      return 0;
    });

    return filtered;
  }, [filter, sortBy, searchTerm, selectedCategories, allTransactions]);

  const toggleCategory = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const getStatusVariant = (status) => {
    switch (status) {
      case "Completed":
        return "success";
      case "Pending":
        return "warning";
      case "Failed":
        return "danger";
      default:
        return "default";
    }
  };

  const exportTransactions = () => {
    alert(`Exporting ${transactions.length} transactions...`);
  };

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Transactions
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              View and manage all your transactions.
            </p>
          </div>

          <motion.button
            onClick={exportTransactions}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors shadow-sm flex items-center gap-2"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span>📥</span>
            Export CSV
          </motion.button>
        </div>
      </motion.div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Total Transactions
            </p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
              {transactions.length}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Total Income
            </p>
            <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mt-1">
              $
              {transactions
                .filter((t) => t.amount > 0)
                .reduce((sum, t) => sum + t.amount, 0)
                .toLocaleString()}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Total Expenses
            </p>
            <p className="text-2xl font-bold text-red-600 dark:text-red-400 mt-1">
              $
              {Math.abs(
                transactions
                  .filter((t) => t.amount < 0)
                  .reduce((sum, t) => sum + t.amount, 0)
              ).toLocaleString()}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Net Flow
            </p>
            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400 mt-1">
              $
              {transactions
                .reduce((sum, t) => sum + t.amount, 0)
                .toLocaleString()}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters + Table */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Filters */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Filters
            </h3>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Search */}
            <div>
              <label className="text-sm font-medium block mb-2 text-gray-900 dark:text-white">
                Search
              </label>
              <input
                type="text"
                placeholder="Search transactions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
              />
            </div>

            {/* Type Filter */}
            <div>
              <label className="text-sm font-medium block mb-2 text-gray-900 dark:text-white">
                Transaction Type
              </label>
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
              >
                <option value="all">All</option>
                <option value="income">Income</option>
                <option value="expense">Expenses</option>
              </select>
            </div>

            {/* Category Filter */}
            <div>
              <label className="text-sm font-medium block mb-2 text-gray-900 dark:text-white">
                Categories
              </label>
              <div className="space-y-2">
                {categories.map((category) => (
                  <motion.label
                    key={category}
                    className="flex items-center space-x-2 cursor-pointer text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                    whileHover={{ x: 4 }}
                  >
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(category)}
                      onChange={() => toggleCategory(category)}
                      className="w-4 h-4 rounded border-gray-300 dark:border-slate-600"
                    />
                    <span>{category}</span>
                  </motion.label>
                ))}
              </div>
            </div>

            {/* Sort */}
            <div>
              <label className="text-sm font-medium block mb-2 text-gray-900 dark:text-white">
                Sort By
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
              >
                <option value="date">Latest First</option>
                <option value="amount">Amount (High → Low)</option>
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Transactions Table */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <h3 className="text-lg font-semibold">All Transactions</h3>
          </CardHeader>

          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-gray-50 dark:bg-slate-800">
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">Description</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">Category</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">Date</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">Status</th>
                    <th className="px-4 py-3 text-right text-sm font-semibold text-gray-900 dark:text-white">Amount</th>
                  </tr>
                </thead>

                <tbody className="divide-y">
                  <AnimatePresence>
                    {transactions.map((txn) => {
                      const IconComponent = txn.icon;
                      return (
                        <motion.tr
                          key={txn.id}
                          className="border-b hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          layout
                        >
                          <td className="px-4 py-3 flex items-center gap-3">
                            <IconComponent className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                            <span className="font-medium text-gray-900 dark:text-white">{txn.description}</span>
                          </td>
                          <td className="px-4 py-3">
                            <Badge>{txn.category}</Badge>
                          </td>
                          <td className="px-4 py-3 text-gray-700 dark:text-gray-300">
                            {new Date(txn.date).toLocaleDateString()}
                          </td>
                          <td className="px-4 py-3">
                            <Badge variant={getStatusVariant(txn.status)}>
                              {txn.status}
                            </Badge>
                          </td>
                          <td
                            className={`px-4 py-3 text-right font-semibold ${
                              txn.amount >= 0
                                ? "text-emerald-600 dark:text-emerald-400"
                                : "text-red-600 dark:text-red-400"
                            }`}
                          >
                            {txn.amount >= 0 ? "+" : "-"}$
                            {Math.abs(txn.amount).toLocaleString()}
                          </td>
                        </motion.tr>
                      );
                    })}
                  </AnimatePresence>
                </tbody>
              </table>

              {transactions.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-5xl mb-4">🔍</div>
                  <h3 className="text-lg font-semibold">No transactions found</h3>
                  <p className="text-gray-500">Try adjusting filters.</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Transactions;