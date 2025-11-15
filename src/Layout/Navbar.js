import { motion } from "framer-motion";
import { Menu, Bell, Search } from "lucide-react";
import ThemeToggle from "../components/ui/ThemeToggle";

const Navbar = ({ onMenuToggle, user }) => {
  return (
    <nav className="sticky top-0 z-50 bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-800 shadow-sm">
      <div className="px-4 lg:px-8 py-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4 min-w-0">
          <motion.button
            onClick={onMenuToggle}
            className="lg:hidden p-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg transition-colors flex items-center justify-center w-10 h-10 text-gray-600 dark:text-gray-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Toggle menu"
          >
            <Menu className="w-5 h-5" />
          </motion.button>

          <div className="flex items-center gap-2 flex-shrink-0">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
              EB
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Enterprise
            </h1>
          </div>
        </div>

        <div className="hidden md:flex flex-1 max-w-sm mx-auto px-2">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-slate-800 border-0 rounded-lg text-sm text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
          <ThemeToggle />

          <motion.button
            className="p-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg transition-colors relative flex-shrink-0"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Notifications"
          >
            <Bell className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
          </motion.button>

          <div className="h-8 w-px bg-gray-200 dark:bg-slate-700 hidden md:block" />

          <motion.div
            className="flex items-center gap-2 sm:gap-3 cursor-pointer flex-shrink-0"
            whileHover={{ scale: 1.02 }}
          >
            <div className="text-right hidden sm:block">
              <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                {user.name}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {user.role}
              </p>
            </div>
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
              {user.initials}
            </div>
          </motion.div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;