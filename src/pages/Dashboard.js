import React from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardHeader, CardContent } from '../components/UI/Card';
import Badge from '../components/UI/Badge';
import { mockData } from '../data/mockData';

const Dashboard = () => {
  const SummaryCard = ({ title, value, subtitle, icon, color, trend }) => (
    <Card hover={true}>
      <CardContent>
        <div className="flex items-start justify-between">
          <div className="flex items-start">
            <div className={`p-3 rounded-lg ${color} mr-4`}>
              <span className="text-2xl">{icon}</span>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{title}</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                {typeof value === 'number' ? `$${value.toLocaleString()}` : value}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{subtitle}</p>
            </div>
          </div>
          {trend && <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">{trend}</span>}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">Welcome back! Here's your financial overview.</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <SummaryCard
          title="Total Balance"
          value={mockData.accountSummary.balance}
          subtitle="Available funds"
          icon="💰"
          color="bg-emerald-100 dark:bg-emerald-900/30"
          trend="↑ 2.5%"
        />
        <SummaryCard
          title="Credit Score"
          value={mockData.accountSummary.creditScore}
          subtitle="Excellent"
          icon="📊"
          color="bg-blue-100 dark:bg-blue-900/30"
          trend="↑ 15 pts"
        />
        <SummaryCard
          title="Savings"
          value={mockData.accountSummary.savings}
          subtitle="Growing 2.1% monthly"
          icon="🏦"
          color="bg-purple-100 dark:bg-purple-900/30"
          trend="↑ 1.8%"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Income vs Expenses</h3>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={mockData.chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="currentColor" opacity={0.1} />
                <XAxis dataKey="name" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip contentStyle={{ backgroundColor: '#1F2937', border: 'none', borderRadius: '8px' }} />
                <Legend />
                <Line type="monotone" dataKey="income" stroke="#10B981" strokeWidth={2} dot={{ fill: '#10B981', r: 4 }} />
                <Line type="monotone" dataKey="expenses" stroke="#EF4444" strokeWidth={2} dot={{ fill: '#EF4444', r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Spending Breakdown</h3>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie data={mockData.categoryData} cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={2} dataKey="value">
                  {mockData.categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Transactions</h3>
            <Badge variant="success">5 Transactions</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockData.transactions.map((txn, idx) => (
              <motion.div
                key={txn.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="flex items-center justify-between p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors cursor-pointer"
              >
                <div className="flex items-center space-x-3">
                  <div className="text-2xl">{txn.icon}</div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">{txn.description}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{txn.category} • {txn.date}</p>
                  </div>
                </div>
                <span className={`font-semibold ${txn.amount >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'}`}>
                  {txn.amount >= 0 ? '+' : '-'}${Math.abs(txn.amount).toLocaleString()}
                </span>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;