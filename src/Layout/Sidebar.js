import React from "react";
import { motion } from "framer-motion";

const Sidebar = ({ navigation, currentPage, setCurrentPage, isOpen, isMobile, closeSidebar }) => {

  return (
    <>
      {/* Mobile toggle button */}
      {isMobile && (
        <div className="lg:hidden fixed top-20 left-4 z-50">
          <motion.button
            onClick={isOpen ? closeSidebar : () => closeSidebar(true)}
            className="p-2 rounded-lg bg-white dark:bg-slate-800 shadow-lg text-gray-900 dark:text-white border border-gray-200 dark:border-slate-700"
            whileTap={{ scale: 0.95 }}
          >
            {isOpen ? "✕" : "☰"}
          </motion.button>
        </div>
      )}

      {/* Backdrop for mobile */}
      {isMobile && isOpen && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={closeSidebar}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />
      )}

      {/* Sidebar */}
      <motion.div
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-white dark:bg-slate-800 shadow-lg lg:shadow-none lg:translate-x-0 lg:static`}
        animate={{
          x: isMobile ? (isOpen ? 0 : -256) : 0
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
              className={`w-full flex items-center px-4 py-3 rounded-lg transition-all duration-200 ${
                currentPage === item.id
                  ? "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 font-semibold"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700"
              }`}
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="text-lg mr-3">{item.icon}</span>
              <span>{item.name}</span>
            </motion.button>
          ))}
        </nav>
      </motion.div>
    </>
  );
};

export default Sidebar;
