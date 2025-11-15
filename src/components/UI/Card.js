import { motion } from "framer-motion";

export const Card = ({ children, className = "", hover = false }) => (
  <motion.div
    className={`bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700 ${
      hover ? "hover:shadow-lg" : ""
    } ${className}`}
    whileHover={hover ? { y: -2 } : {}}
    transition={{ duration: 0.2 }}
  >
    {children}
  </motion.div>
);

export const CardHeader = ({ children, className = "" }) => (
  <div className={`p-6 border-b border-gray-200 dark:border-slate-700 ${className}`}>
    {children}
  </div>
);

export const CardContent = ({ children, className = "" }) => (
  <div className={`p-6 ${className}`}>{children}</div>
);