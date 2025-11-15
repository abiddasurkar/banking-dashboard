import React, { useState, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardHeader, CardContent } from "../components/ui/Card";
import Badge from "../components/ui/Badge";
import { transactionsPageData } from "../data/mockData";
import { Download, Search, Filter, ChevronDown } from "lucide-react";

// Stat Card Component
const StatCard = ({ label, value, color, isLoading = false }) => (
  <Card className="hover:shadow-lg transition-shadow">
    <CardContent className="text-center py-6">
      <p className="text-sm text-gray-600 dark:text-gray-400">{label}</p>
      <p className={`text-2xl font-bold mt-1 ${color}`}>
        {isLoading ? "..." : value}
      </p>
    </CardContent>
  </Card>
);

// Dropdown Menu Component
const DropdownMenu = ({ label, options, selected, onSelect, multi = false }) => {
  const [open, setOpen] = useState(false);

  const displayValue = multi
    ? selected.length > 0
      ? `${selected.length} selected`
      : label
    : options.find((opt) => opt.value === selected)?.label || label;

  return (
    <div className="relative">
      <motion.button
        onClick={() => setOpen(!open)}
        className="px-4 py-2 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-white text-sm font-medium flex items-center gap-2 hover:bg-gray-50 dark:hover:bg-slate-600 transition-colors w-full sm:w-auto justify-between sm:justify-start"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <span className="truncate">{displayValue}</span>
        <ChevronDown
          className={`w-4 h-4 flex-shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-600 rounded-lg shadow-lg z-40"
            onClick={() => setOpen(false)}
          >
            {options.map((option) => (
              <motion.button
                key={option.value}
                onClick={() => {
                  if (multi) {
                    onSelect(option.value);
                  } else {
                    onSelect(option.value);
                    setOpen(false);
                  }
                }}
                className={`w-full px-4 py-2 text-left text-sm flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors first:rounded-t-lg last:rounded-b-lg ${
                  multi ? "justify-start" : ""
                }`}
                whileHover={{ x: 4 }}
              >
                {multi ? (
                  <input
                    type="checkbox"
                    checked={selected.includes(option.value)}
                    onChange={() => {}}
                    className="w-4 h-4 rounded cursor-pointer accent-blue-600"
                  />
                ) : null}
                <span className={`${multi && selected.includes(option.value) ? "font-semibold" : ""}`}>
                  {option.label}
                </span>
              </motion.button>
            ))}
            {multi && selected.length > 0 && (
              <>
                <div className="border-t border-gray-200 dark:border-slate-600" />
                <motion.button
                  onClick={() => onSelect("clear")}
                  className="w-full px-4 py-2 text-left text-sm text-blue-600 dark:text-blue-400 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-b-lg transition-colors font-medium"
                  whileHover={{ x: 4 }}
                >
                  Clear All
                </motion.button>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Transaction Row Component
const TransactionRow = ({ txn, idx }) => {
  const IconComponent = txn.icon;
  const statusVariant = {
    "Completed": "success",
    "Pending": "warning",
    "Failed": "danger",
  }[txn.status] || "default";

  return (
    <motion.tr
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ delay: idx * 0.02 }}
      layout
      className="border-b hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors group"
    >
      <td className="px-4 py-4 flex items-center gap-3 min-w-0">
        <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-900/20 group-hover:scale-110 transition-transform flex-shrink-0">
          <IconComponent className="w-5 h-5 text-blue-600 dark:text-blue-400" />
        </div>
        <span className="font-medium text-gray-900 dark:text-white truncate">
          {txn.description}
        </span>
      </td>
      <td className="px-4 py-4">
        <Badge>{txn.category}</Badge>
      </td>
      <td className="px-4 py-4 text-sm text-gray-700 dark:text-gray-300">
        {new Date(txn.date).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        })}
      </td>
      <td className="px-4 py-4">
        <Badge variant={statusVariant}>{txn.status}</Badge>
      </td>
      <td
        className={`px-4 py-4 text-right font-semibold whitespace-nowrap ${
          txn.amount >= 0
            ? "text-emerald-600 dark:text-emerald-400"
            : "text-red-600 dark:text-red-400"
        }`}
      >
        {txn.amount >= 0 ? "+" : "-"}${Math.abs(txn.amount).toLocaleString()}
      </td>
    </motion.tr>
  );
};

// Empty State Component
const EmptyState = () => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    className="text-center py-16"
  >
    <div className="text-6xl mb-4">🔍</div>
    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
      No transactions found
    </h3>
    <p className="text-gray-600 dark:text-gray-400 mt-2">
      Try adjusting your filters or search terms.
    </p>
  </motion.div>
);

// Main Transactions Component
const Transactions = () => {
  const [filter, setFilter] = useState("all");
  const [sortBy, setSortBy] = useState("date");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);

  const { categories, transactions: allTransactions } = transactionsPageData;

  // Filtered and sorted transactions
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

  // Calculate stats
  const stats = useMemo(() => {
    const income = transactions
      .filter((t) => t.amount > 0)
      .reduce((sum, t) => sum + t.amount, 0);

    const expenses = Math.abs(
      transactions
        .filter((t) => t.amount < 0)
        .reduce((sum, t) => sum + t.amount, 0)
    );

    const netFlow = income - expenses;

    return { income, expenses, netFlow };
  }, [transactions]);

  const handleCategorySelect = useCallback(
    (value) => {
      if (value === "clear") {
        setSelectedCategories([]);
      } else {
        setSelectedCategories((prev) =>
          prev.includes(value)
            ? prev.filter((c) => c !== value)
            : [...prev, value]
        );
      }
    },
    []
  );

  const handleExport = useCallback(() => {
    const csv = [
      ["Description", "Category", "Date", "Status", "Amount"],
      ...transactions.map((t) => [
        t.description,
        t.category,
        new Date(t.date).toLocaleDateString(),
        t.status,
        t.amount,
      ]),
    ]
      .map((row) => row.map((cell) => `"${cell}"`).join(","))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `transactions-${new Date().toISOString().split("T")[0]}.csv`;
    link.click();
  }, [transactions]);

  const typeOptions = [
    { label: "All Transactions", value: "all" },
    { label: "Income Only", value: "income" },
    { label: "Expenses Only", value: "expense" },
  ];

  const categoryOptions = categories.map((cat) => ({
    label: cat,
    value: cat,
  }));

  const sortOptions = [
    { label: "Latest First", value: "date" },
    { label: "Highest Amount", value: "amount" },
  ];

  return (
    <div className="space-y-6 p-4 sm:p-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Transactions
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            View and manage all your financial transactions.
          </p>
        </div>

        <motion.button
          onClick={handleExport}
          className="px-4 sm:px-6 py-2 sm:py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors shadow-sm flex items-center gap-2 whitespace-nowrap"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Download className="w-4 h-4" />
          <span className="hidden sm:inline">Export CSV</span>
          <span className="sm:hidden">Export</span>
        </motion.button>
      </motion.div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
          <StatCard
            label="Total Transactions"
            value={transactions.length.toLocaleString()}
            color="text-gray-900 dark:text-white"
          />
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <StatCard
            label="Total Income"
            value={`$${stats.income.toLocaleString()}`}
            color="text-emerald-600 dark:text-emerald-400"
          />
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
          <StatCard
            label="Total Expenses"
            value={`$${stats.expenses.toLocaleString()}`}
            color="text-red-600 dark:text-red-400"
          />
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <StatCard
            label="Net Flow"
            value={`$${stats.netFlow.toLocaleString()}`}
            color={`${stats.netFlow >= 0 ? "text-blue-600 dark:text-blue-400" : "text-red-600 dark:text-red-400"}`}
          />
        </motion.div>
      </div>

      {/* Transactions Table with Filters */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              All Transactions
            </h3>
            <Badge variant="default">{transactions.length} Results</Badge>
          </div>

          {/* Filters Bar inside header */}
          <div className="flex flex-col sm:flex-row gap-3 flex-wrap items-start sm:items-center">
            {/* Search */}
            <div className="flex-1 min-w-0 sm:min-w-[200px]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search transactions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm"
                />
              </div>
            </div>

            {/* Type Dropdown */}
            <DropdownMenu
              label="Type"
              options={typeOptions}
              selected={filter}
              onSelect={setFilter}
            />

            {/* Categories Dropdown */}
            <DropdownMenu
              label="Categories"
              options={categoryOptions}
              selected={selectedCategories}
              onSelect={handleCategorySelect}
              multi={true}
            />

            {/* Sort Dropdown */}
            <DropdownMenu
              label="Sort"
              options={sortOptions}
              selected={sortBy}
              onSelect={setSortBy}
            />
          </div>
        </CardHeader>

        <CardContent className="border-t border-gray-200 dark:border-slate-700">
          {transactions.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="overflow-x-auto -mx-6">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-gray-50 dark:bg-slate-800 sticky top-0">
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white whitespace-nowrap">
                      Description
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white whitespace-nowrap">
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white whitespace-nowrap">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white whitespace-nowrap">
                      Status
                    </th>
                    <th className="px-6 py-3 text-right text-sm font-semibold text-gray-900 dark:text-white whitespace-nowrap">
                      Amount
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y">
                  <AnimatePresence>
                    {transactions.map((txn, idx) => (
                      <TransactionRow key={txn.id} txn={txn} idx={idx} />
                    ))}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Transactions;