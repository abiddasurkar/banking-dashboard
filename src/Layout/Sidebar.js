import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Sidebar = ({ currentPage, setCurrentPage }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const navigation = [
    { name: 'Dashboard', id: 'dashboard', icon: '📊' },
    { name: 'Transactions', id: 'transactions', icon: '💳' },
    { name: 'Loans', id: 'loans', icon: '📈' },
    { name: 'Profile', id: 'profile', icon: '👤' },
    { name: 'Settings', id: 'settings', icon: '⚙️' },
  ];

  return (
    <>
      <div className="lg:hidden fixed top-20 left-4 z-50">
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-lg bg-white dark:bg-slate-800 shadow-lg text-gray-900 dark:text-white border border-gray-200 dark:border-slate-700"
          whileTap={{ scale: 0.95 }}
        >
          {isOpen ? '✕' : '☰'}
        </motion.button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
            onClick={() => setIsOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        )}
      </AnimatePresence>

      <motion.div
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-white dark:bg-slate-800 shadow-lg lg:shadow-none lg:translate-x-0 lg:static ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out`}
        initial={false}
        animate={{ 
          x: isMobile ? (isOpen ? 0 : -256) : 0 
        }}
      >
        <nav className="mt-8 px-3 space-y-2">
          {navigation.map((item) => (
            <motion.button
              key={item.id}
              onClick={() => {
                setCurrentPage(item.id);
                setIsOpen(false);
              }}
              className={`w-full flex items-center px-4 py-3 rounded-lg transition-all duration-200 ${
                currentPage === item.id
                  ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 font-semibold'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700'
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