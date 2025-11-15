import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, AreaChart, Area,
} from "recharts";
import {
  AlertCircle, Music, Briefcase,
  Package,  Settings,Wallet, 
  CreditCard, PiggyBank, BarChart3, X
} from "lucide-react";
import { dashbaordData } from "../data/mockData";

// Reusable Components
const Card = ({ children, className = "", hover = false }) => (
  <div
    className={`bg-white dark:bg-slate-800 rounded-xl shadow-md ${
      hover ? "hover:shadow-lg" : ""
    } transition-shadow ${className}`}
  >
    {children}
  </div>
);

const CardHeader = ({ children, className = "" }) => (
  <div className={`px-6 py-4 border-b border-gray-200 dark:border-slate-700 ${className}`}>
    {children}
  </div>
);

const CardContent = ({ children, className = "" }) => (
  <div className={`p-6 ${className}`}>{children}</div>
);

const Badge = ({ children, variant = "default" }) => {
  const variants = {
    default: "bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300",
    success: "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400",
    warning: "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400",
    danger: "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400",
  };
  return (
    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${variants[variant]}`}>
      {children}
    </span>
  );
};

const Popup = ({ title, onClose, children }) => (
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
        className="bg-white dark:bg-slate-800 rounded-xl shadow-2xl max-w-md w-full"
      >
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-slate-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">{title}</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </button>
        </div>
        <div className="p-6">{children}</div>
      </motion.div>
    </motion.div>
  </AnimatePresence>
);

// Summary Card Component
const SummaryCard = ({ title, value, subtitle, Icon, color, trend }) => (
  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
    <Card hover className="relative overflow-hidden cursor-pointer h-full">
      <div className={`absolute top-0 right-0 w-20 h-20 opacity-10 ${color} rounded-full -mr-6 -mt-6`}></div>
      <CardContent className="flex flex-col gap-4 h-full">
        <div className="flex items-start gap-3">
          <div className={`p-3 rounded-xl bg-gradient-to-br ${color} shadow-lg flex-shrink-0`}>
            <Icon className="w-6 h-6 text-white" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{title}</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
              {typeof value === "number" ? `${value.toLocaleString()}` : value}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{subtitle}</p>
          </div>
        </div>
        {trend && (
          <div className="flex justify-end">
            <Badge variant={trend.includes("↑") ? "success" : "danger"}>{trend}</Badge>
          </div>
        )}
      </CardContent>
    </Card>
  </motion.div>
);

// Quick Action Card
const QuickActionCard = ({ title, icon: Icon, color, id, onClick }) => (
  <motion.button
    whileHover={{ scale: 1.05, y: -2 }}
    whileTap={{ scale: 0.95 }}
    onClick={() => onClick(id)}
    className={`p-4 rounded-xl bg-gradient-to-br ${color} text-white shadow-lg hover:shadow-xl transition-all duration-200 flex flex-col items-center justify-center min-h-[100px] group`}
  >
    <Icon className="w-6 h-6 mb-2 group-hover:scale-110 transition-transform" />
    <span className="text-sm font-semibold text-center">{title}</span>
  </motion.button>
);

// Alert Item
const AlertItem = ({ alert, idx }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: idx * 0.1 }}
    className="flex items-center justify-between p-4 rounded-lg border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-900/20 hover:shadow-md transition-shadow"
  >
    <div className="flex items-center space-x-3 min-w-0">
      <AlertCircle className="w-6 h-6 text-amber-600 dark:text-amber-400 flex-shrink-0" />
      <div className="min-w-0">
        <p className="font-medium text-gray-900 dark:text-white truncate">{alert.message}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400">Amount: ${alert.amount}</p>
      </div>
    </div>
    <button className="px-3 py-1 text-sm bg-amber-500 hover:bg-amber-600 text-white rounded-lg transition-colors flex-shrink-0 ml-2">
      Review
    </button>
  </motion.div>
);

// Transaction Item
const TransactionItem = ({ txn, idx }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: idx * 0.05 }}
    className="flex items-center justify-between p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors cursor-pointer group"
  >
    <div className="flex items-center space-x-3 min-w-0 flex-1">
      <div className="p-2 rounded-lg bg-gray-100 dark:bg-slate-700 group-hover:scale-110 transition-transform flex-shrink-0">
        <txn.Icon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="font-medium text-gray-900 dark:text-white truncate">{txn.description}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {txn.category} • {txn.date}
        </p>
      </div>
    </div>
    <span className={`font-semibold flex-shrink-0 ml-4 ${txn.amount >= 0 ? "text-emerald-600 dark:text-emerald-400" : "text-red-600 dark:text-red-400"}`}>
      {txn.amount >= 0 ? "+" : "-"}${Math.abs(txn.amount).toLocaleString()}
    </span>
  </motion.div>
);

// Form Components
const FormInput = ({ placeholder, type = "text", className = "" }) => (
  <input
    type={type}
    placeholder={placeholder}
    className={`w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${className}`}
  />
);

const FormSelect = ({ children, className = "" }) => (
  <select className={`w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${className}`}>
    {children}
  </select>
);

const FormButton = ({ children, gradient }) => (
  <button className={`w-full px-4 py-2 bg-gradient-to-r ${gradient} text-white rounded-lg font-semibold hover:shadow-lg transition-shadow`}>
    {children}
  </button>
);

// Popup Forms
const PopupContent = {
  send: (
    <div className="space-y-4">
      <FormInput placeholder="Recipient Name" />
      <FormInput placeholder="Amount" type="number" />
      <FormButton gradient="from-green-500 to-emerald-600">Send Now</FormButton>
    </div>
  ),
  bills: (
    <div className="space-y-4">
      <FormSelect>
        <option>Select Bill Provider</option>
        <option>Electricity</option>
        <option>Water</option>
        <option>Internet</option>
        <option>Phone</option>
      </FormSelect>
      <FormInput placeholder="Amount" type="number" />
      <FormButton gradient="from-blue-500 to-cyan-600">Pay Bill</FormButton>
    </div>
  ),
  invest: (
    <div className="space-y-4">
      <FormSelect>
        <option>Select Investment Type</option>
        <option>Stocks</option>
        <option>Bonds</option>
        <option>Mutual Funds</option>
        <option>Crypto</option>
      </FormSelect>
      <FormInput placeholder="Investment Amount" type="number" />
      <FormButton gradient="from-purple-500 to-indigo-600">Invest Now</FormButton>
    </div>
  ),
  loan: (
    <div className="space-y-4">
      <FormInput placeholder="Loan Amount" type="number" />
      <FormSelect>
        <option>Loan Duration</option>
        <option>6 months</option>
        <option>1 year</option>
        <option>2 years</option>
        <option>5 years</option>
      </FormSelect>
      <FormButton gradient="from-orange-500 to-red-500">Apply for Loan</FormButton>
    </div>
  ),
};

// Main Dashboard Component
const Dashboard = () => {
  const [timeRange, setTimeRange] = useState("monthly");
  const [showDetailedView, setShowDetailedView] = useState(false);
  const [activePopup, setActivePopup] = useState(null);

  const pieData = useMemo(() => [
    { name: "Food & Dining", value: 800, color: "#EF4444" },
    { name: "Transport", value: 600, color: "#F59E0B" },
    { name: "Entertainment", value: 400, color: "#8B5CF6" },
    { name: "Bills & Utilities", value: 1200, color: "#3B82F6" },
    { name: "Shopping", value: 500, color: "#EC4899" },
    { name: "Other", value: 300, color: "#10B981" },
  ], []);

  const transactions = useMemo(() => [
    { id: 1, description: "Spotify Subscription", category: "Entertainment", date: "Today", amount: -12.99, Icon: Music },
    { id: 2, description: "Salary Deposit", category: "Income", date: "Yesterday", amount: 5000, Icon: Briefcase },
    { id: 3, description: "Amazon Purchase", category: "Shopping", date: "2 days ago", amount: -127.5, Icon: Package },
  ], []);

  const handlePopupOpen = (id) => setActivePopup(id);
  const handlePopupClose = () => setActivePopup(null);

  return (
    <div className="space-y-6 p-4 sm:p-6 bg-gray-50 dark:bg-slate-900 min-h-screen">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Welcome back! Here's your financial overview.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-4 py-2 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowDetailedView(!showDetailedView)}
            className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors"
          >
            <Settings className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </motion.button>
        </div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Quick Actions
            </h3>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {dashbaordData.quickActions.map((action) => (
                <QuickActionCard
                  key={action.id}
                  {...action}
                  onClick={handlePopupOpen}
                />
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <SummaryCard
          title="Total Balance"
          value={dashbaordData.accountSummary.balance}
          subtitle="Available funds"
          Icon={Wallet}
          color="from-emerald-500 to-teal-600"
          trend="↑ 2.5%"
        />
        <SummaryCard
          title="Credit Score"
          value={dashbaordData.accountSummary.creditScore}
          subtitle="Excellent"
          Icon={CreditCard}
          color="from-blue-500 to-cyan-600"
          trend="↑ 15 pts"
        />
        <SummaryCard
          title="Savings"
          value={dashbaordData.accountSummary.savings}
          subtitle="Growing 2.1% monthly"
          Icon={PiggyBank}
          color="from-purple-500 to-indigo-600"
          trend="↑ 1.8%"
        />
        <SummaryCard
          title="Investments"
          value={dashbaordData.accountSummary.investments}
          subtitle="+5.2% this month"
          Icon={BarChart3}
          color="from-orange-500 to-red-500"
          trend="↑ 5.2%"
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Financial Overview
              </h3>
              <Badge variant="success">Live</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={dashbaordData.chartData}>
                <defs>
                  <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0.1}/>
                  </linearGradient>
                  <linearGradient id="expensesGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#EF4444" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#EF4444" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="currentColor" opacity={0.1} />
                <XAxis dataKey="name" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip contentStyle={{ backgroundColor: '#1F2937', border: 'none', borderRadius: '8px' }} />
                <Area type="monotone" dataKey="income" stroke="#10B981" fillOpacity={1} fill="url(#incomeGradient)" />
                <Area type="monotone" dataKey="expenses" stroke="#EF4444" fillOpacity={1} fill="url(#expensesGradient)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Spending Distribution
            </h3>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={showDetailedView ? 40 : 60}
                  outerRadius={showDetailedView ? 80 : 90}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Alerts and Transactions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Financial Alerts
              </h3>
              <Badge variant="warning">{dashbaordData.spendingAlerts.length} Alerts</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-3 max-h-96 overflow-y-auto">
            {dashbaordData.spendingAlerts.map((alert, idx) => (
              <AlertItem key={alert.id} alert={alert} idx={idx} />
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Recent Transactions
              </h3>
              <Badge variant="success">{transactions.length} Transactions</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {transactions.map((txn, idx) => (
              <TransactionItem key={txn.id} txn={txn} idx={idx} />
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Popups */}
      <AnimatePresence>
        {activePopup === 1 && (
          <Popup title="Send Money" onClose={handlePopupClose}>
            {PopupContent.send}
          </Popup>
        )}
        {activePopup === 2 && (
          <Popup title="Pay Bills" onClose={handlePopupClose}>
            {PopupContent.bills}
          </Popup>
        )}
        {activePopup === 3 && (
          <Popup title="Invest" onClose={handlePopupClose}>
            {PopupContent.invest}
          </Popup>
        )}
        {activePopup === 4 && (
          <Popup title="Apply for Loan" onClose={handlePopupClose}>
            {PopupContent.loan}
          </Popup>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Dashboard;