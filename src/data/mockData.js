export const mockData = {
  userData: {
    name: "Alex Johnson",
    email: "alex.johnson@enterprisebank.com",
    phone: "+1 (555) 123-4567",
    memberSince: "Jan 2020"
  },
  accountSummary: {
    balance: 125430.75,
    creditScore: 785,
    savings: 75420.50,
  },
  transactions: [
    { id: 1, date: "2024-01-15", description: "Salary Deposit", amount: 5500.00, category: "Income", status: "Completed", icon: "💼" },
    { id: 2, date: "2024-01-14", description: "Mortgage Payment", amount: -2450.00, category: "Housing", status: "Completed", icon: "🏠" },
    { id: 3, date: "2024-01-13", description: "Grocery Store", amount: -156.43, category: "Food", status: "Completed", icon: "🛒" },
    { id: 4, date: "2024-01-12", description: "Investment Deposit", amount: -2000.00, category: "Investment", status: "Completed", icon: "📈" },
    { id: 5, date: "2024-01-11", description: "Freelance Payment", amount: 3200.00, category: "Income", status: "Completed", icon: "💻" },
  ],
  chartData: [
    { name: 'Jan', income: 12000, expenses: 8500 },
    { name: 'Feb', income: 15000, expenses: 9200 },
    { name: 'Mar', income: 13000, expenses: 7800 },
    { name: 'Apr', income: 18000, expenses: 11000 },
    { name: 'May', income: 16000, expenses: 9500 },
    { name: 'Jun', income: 19000, expenses: 12000 },
  ],
  categoryData: [
    { name: 'Housing', value: 2450, color: '#3B82F6' },
    { name: 'Food', value: 1200, color: '#10B981' },
    { name: 'Investment', value: 2000, color: '#8B5CF6' },
    { name: 'Entertainment', value: 450, color: '#F59E0B' },
    { name: 'Other', value: 400, color: '#EF4444' },
  ],
  loans: [
    {
      id: 1,
      name: "Mortgage Loan",
      amount: 350000,
      paid: 125000,
      interestRate: 3.5,
      status: "Active",
      nextPayment: "2024-02-01",
      progress: 35.7
    },
    {
      id: 2,
      name: "Auto Loan",
      amount: 35000,
      paid: 18500,
      interestRate: 4.2,
      status: "Active",
      nextPayment: "2024-02-15",
      progress: 52.8
    },
  ]
};