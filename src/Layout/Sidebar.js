// Sidebar.jsx
import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const Sidebar = ({
  navigation,
  currentPage,
  setCurrentPage,
  isOpen,
  isMobile,
  closeSidebar
}) => {
  return (
    <>
      {/* Backdrop for Mobile */}
      <AnimatePresence>
        {isMobile && isOpen && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 z-30"
            onClick={closeSidebar}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.div
        className="fixed inset-y-0 left-0 z-40 w-64 bg-white dark:bg-slate-800 shadow-lg 
                   lg:static lg:shadow-none lg:translate-x-0"
        animate={{
          x: isMobile ? (isOpen ? 0 : -260) : 0,
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <nav className="mt-8 px-3 space-y-2">
          {navigation.map((item) => (
            <motion.button
              key={item.id}
              onClick={() => {
                setCurrentPage(item.id);
                if (isMobile) closeSidebar();
              }}
              className={`w-full flex items-center px-4 py-3 rounded-lg transition-all ${
                currentPage === item.id
                  ? "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 font-semibold"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700"
              }`}
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.97 }}
            >
              <span className="text-lg mr-3">{item.icon}</span>
              {item.name}
            </motion.button>
          ))}
        </nav>
      </motion.div>
    </>
  );
};

export default Sidebar;
