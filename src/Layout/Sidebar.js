import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const Sidebar = ({
  isOpen,
  onClose,
  currentPage,
  setCurrentPage,
  isMobile,
  navItems,
}) => {
  return (
    <>
      <AnimatePresence>
        {isMobile && isOpen && (
          <motion.div
            className="fixed inset-0 bg-black/50 z-30"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        )}
      </AnimatePresence>

      <motion.aside
        className="fixed inset-y-0 left-0 z-40 w-64 bg-white dark:bg-slate-900 border-r border-gray-200 dark:border-slate-800 lg:static h-full flex flex-col"
        animate={{ x: isMobile ? (isOpen ? 0 : -260) : 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="px-6 py-8 flex items-center justify-between lg:hidden border-b border-gray-200 dark:border-slate-800">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
            EB
          </div>
          <motion.button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 dark:hover:bg-slate-800 rounded"
            whileTap={{ scale: 0.95 }}
          >
            ✕
          </motion.button>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = currentPage === item.id;

            return (
              <motion.button
                key={item.id}
                onClick={() => {
                  setCurrentPage(item.id);
                  if (isMobile) onClose();
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all ${
                  isActive
                    ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-800"
                }`}
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="text-lg">{item.icon}</span>
                <span>{item.label}</span>
                {isActive && (
                  <motion.span
                    className="ml-auto text-blue-600 dark:text-blue-400"
                    initial={{ x: -10 }}
                    animate={{ x: 0 }}
                  >
                    →
                  </motion.span>
                )}
              </motion.button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-200 dark:border-slate-800">
          <motion.button
            className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-800 rounded-lg font-medium transition-all"
            whileHover={{ x: 4 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="text-lg">🚪</span>
            Logout
          </motion.button>
        </div>
      </motion.aside>
    </>
  );
};

export default Sidebar;