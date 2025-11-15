// ---------------------------------------------------
// Import All Lucide Icons Used Everywhere
// ---------------------------------------------------
import {
  Send,
  FileText,
  TrendingUp,
  Landmark,
  Music,
  Briefcase,
  Package,
  Car,
  Wallet,
  GraduationCap,
  Palette,
  Bell,
  Shield,
  Globe,
  BookOpen,
  Mail,
  Smartphone,
  Megaphone,
  BarChart,
  Target,
  ChartLine,
} from "lucide-react";

// ---------------------------------------------------
// DASHBOARD DATA
// ---------------------------------------------------
export const dashbaordData = {
  accountSummary: {
    balance: 45231,
    creditScore: 785,
    savings: 12845,
    investments: 28760,
    monthlyGrowth: 2.5,
  },

  chartData: [
    { name: "Jan", income: 5000, expenses: 2400, savings: 2600, investments: 1800 },
    { name: "Feb", income: 5500, expenses: 2800, savings: 2700, investments: 2000 },
    { name: "Mar", income: 6000, expenses: 3200, savings: 2800, investments: 2200 },
    { name: "Apr", income: 5800, expenses: 2900, savings: 2900, investments: 2400 },
    { name: "May", income: 6200, expenses: 3400, savings: 2800, investments: 2600 },
    { name: "Jun", income: 6500, expenses: 3100, savings: 3400, investments: 2800 },
    { name: "Jul", income: 6800, expenses: 3300, savings: 3500, investments: 3000 },
    { name: "Aug", income: 7200, expenses: 3500, savings: 3700, investments: 3200 },
  ],

  quickActions: [
    { id: 1, title: "Send Money", icon: Send, color: "from-green-500 to-emerald-600" },
    { id: 2, title: "Pay Bills", icon: FileText, color: "from-blue-500 to-cyan-600" },
    { id: 3, title: "Invest", icon: TrendingUp, color: "from-purple-500 to-indigo-600" },
    { id: 4, title: "Loan", icon: Landmark, color: "from-orange-500 to-red-500" },
  ],

  spendingAlerts: [
    { id: 1, message: "Unusual spending detected in Entertainment", amount: 450, type: "warning" },
    { id: 2, message: "Subscription renewal due: Netflix", amount: 15.99, type: "info" },
  ],

  spendingDistribution: [
    { name: "Food & Dining", value: 800, color: "#EF4444" },
    { name: "Transport", value: 600, color: "#F59E0B" },
    { name: "Entertainment", value: 400, color: "#8B5CF6" },
    { name: "Bills & Utilities", value: 1200, color: "#3B82F6" },
    { name: "Shopping", value: 500, color: "#EC4899" },
    { name: "Other", value: 300, color: "#10B981" },
  ],

  recentTransactions: [
    {
      id: 1,
      description: "Spotify Subscription",
      category: "Entertainment",
      date: "Today",
      amount: -12.99,
      icon: Music,
      status: "Completed",
    },
    {
      id: 2,
      description: "Salary Deposit",
      category: "Income",
      date: "Yesterday",
      amount: 5000,
      icon: Briefcase,
      status: "Completed",
    },
    {
      id: 3,
      description: "Amazon Purchase",
      category: "Shopping",
      date: "2 days ago",
      amount: -127.5,
      icon: Package,
      status: "Completed",
    },
  ],
};

// ---------------------------------------------------
// LOANS DATA (ALL LUCIDE ICONS)
// ---------------------------------------------------
export const loansData = {
  active: [
    {
      id: 1,
      name: "Car Loan",
      amount: 25000,
      paid: 8750,
      interestRate: 4.5,
      status: "Active",
      progress: 35,
      nextPayment: "2024-02-15",
      remainingAmount: 16250,
      monthlyPayment: 485,
      startDate: "2022-01-15",
      endDate: "2027-01-15",
      type: "Car",
      icon: Car,
    },
    {
      id: 2,
      name: "Personal Loan",
      amount: 10000,
      paid: 3000,
      interestRate: 6.2,
      status: "Active",
      progress: 30,
      nextPayment: "2024-02-20",
      remainingAmount: 7000,
      monthlyPayment: 220,
      startDate: "2023-03-10",
      endDate: "2026-03-10",
      type: "Personal",
      icon: Wallet,
    },
  ],

  paid: [
    {
      id: 3,
      name: "Student Loan",
      amount: 15000,
      paid: 15000,
      interestRate: 3.2,
      status: "Paid",
      progress: 100,
      nextPayment: "N/A",
      remainingAmount: 0,
      monthlyPayment: 0,
      startDate: "2018-09-01",
      endDate: "2023-09-01",
      type: "Education",
      icon: GraduationCap,
    },
  ],
};

// ---------------------------------------------------
// PROFILE PAGE DATA
// ---------------------------------------------------
export const profilePageData = {
  profile: {
    name: "Alex Johnson",
    email: "alex.johnson@email.com",
    phone: "+1 (555) 123-4567",
    memberSince: "Jan 2022",
    address: "123 Main St, New York, NY 10001",
    dateOfBirth: "1990-05-15",
    employment: "Senior Software Engineer at TechCorp",
  },

  personalInfoFields: [
    { key: "name", label: "Full Name", type: "text" },
    { key: "email", label: "Email Address", type: "email" },
    { key: "phone", label: "Phone Number", type: "tel" },
    { key: "address", label: "Address", type: "text" },
    { key: "dateOfBirth", label: "Date of Birth", type: "date" },
    { key: "employment", label: "Employment", type: "text" },
  ],

  securitySettings: [
    { id: 1, title: "Two-Factor Authentication", description: "Add an extra layer of security", enabled: true },
    { id: 2, title: "Biometric Login", description: "Use fingerprint or face ID", enabled: false },
    { id: 3, title: "Login Alerts", description: "Get notified of new logins", enabled: true },
  ],

  notificationSettings: [
    { id: 1, title: "Email Notifications", description: "Receive updates via email", enabled: true },
    { id: 2, title: "Push Notifications", description: "Get push notifications on your device", enabled: true },
    { id: 3, title: "SMS Alerts", description: "Important alerts via SMS", enabled: false },
  ],

  accountStats: [
    { label: "Account Type", value: "Premium", color: "purple" },
    { label: "Verification", value: "Verified", color: "emerald" },
    { label: "Account Status", value: "Active", color: "emerald" },
    { label: "Last Login", value: "Today, 09:42 AM", color: "blue" },
  ],
};

// ---------------------------------------------------
// SETTINGS PAGE DATA (ALL LUCIDE ICONS)
// ---------------------------------------------------
export const settingsPageData = {
  settingsSections: [
    { id: "appearance", label: "Appearance", icon: Palette },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "privacy", label: "Privacy", icon: Shield },
    { id: "language", label: "Language", icon: Globe },
    { id: "about", label: "About", icon: BookOpen },
  ],

  languageOptions: [
    { code: "en", name: "English", native: "English" },
    { code: "hi", name: "Hindi", native: "हिंदी" },
    { code: "fr", name: "French", native: "Français" },
    { code: "ar", name: "Arabic", native: "العربية" },
  ],

  notificationDefaults: {
    email: true,
    push: true,
    sms: false,
    marketing: true,
  },

  notificationLabels: {
    email: { title: "Email Notifications", description: "Receive updates via email", icon: Mail },
    push: { title: "Push Notifications", description: "Browser push alerts", icon: Bell },
    sms: { title: "SMS Alerts", description: "Receive text messages", icon: Smartphone },
    marketing: { title: "Marketing Emails", description: "Promotional updates", icon: Megaphone },
  },

  privacyDefaults: {
    dataCollection: true,
    personalizedAds: false,
    analytics: true,
  },

  privacyLabels: {
    dataCollection: { title: "Data Collection", description: "Allow usage data tracking", icon: BarChart },
    personalizedAds: { title: "Personalized Ads", description: "Ads tailored to you", icon: Target },
    analytics: { title: "Analytics", description: "Improve service performance", icon: ChartLine },
  },
};

// ---------------------------------------------------
// TRANSACTIONS PAGE DATA
// ---------------------------------------------------
export const transactionsPageData = {
  categories: [
    "Food",
    "Transport",
    "Entertainment",
    "Bills",
    "Shopping",
    "Income",
    "Transfer",
    "Other",
  ],

  transactions: [
    {
      id: 1,
      description: "Spotify Subscription",
      category: "Entertainment",
      date: "2024-01-15",
      amount: -12.99,
      icon: Music,
      status: "Completed",
      type: "expense",
    },
    {
      id: 2,
      description: "Salary Deposit",
      category: "Income",
      date: "2024-01-14",
      amount: 5000,
      icon: Briefcase,
      status: "Completed",
      type: "income",
    },
    {
      id: 3,
      description: "Amazon Purchase",
      category: "Shopping",
      date: "2024-01-13",
      amount: -127.5,
      icon: Package,
      status: "Completed",
      type: "expense",
    },
    {
      id: 4,
      description: "Bank Transfer",
      category: "Transfer",
      date: "2024-01-12",
      amount: 500,
      icon: Landmark,
      status: "Pending",
      type: "income",
    },
    {
      id: 5,
      description: "Gas Station",
      category: "Transport",
      date: "2024-01-12",
      amount: -45.2,
      icon: Car,
      status: "Completed",
      type: "expense",
    },
    {
      id: 6,
      description: "Grocery Store",
      category: "Food",
      date: "2024-01-11",
      amount: -85.75,
      icon: Package,
      status: "Completed",
      type: "expense",
    },
    {
      id: 7,
      description: "Freelance Payment",
      category: "Income",
      date: "2024-01-10",
      amount: 1200,
      icon: Briefcase,
      status: "Completed",
      type: "income",
    },
  ],
};