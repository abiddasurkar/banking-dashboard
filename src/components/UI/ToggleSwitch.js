import React from "react";
import { motion } from "framer-motion";

const ToggleSwitch = ({ value, onChange }) => (
  <motion.button
    onClick={() => onChange(!value)}
    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
      value ? "bg-blue-600" : "bg-gray-300 dark:bg-slate-600"
    }`}
    whileTap={{ scale: 0.95 }}
  >
    <motion.span
      className="inline-block h-4 w-4 rounded-full bg-white transition-transform"
      animate={{ x: value ? 20 : 2 }}
      transition={{ type: "spring", stiffness: 500, damping: 40 }}
    />
  </motion.button>
);

export default ToggleSwitch;