import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "../../contexts/ThemeContext";

const ThemeToggle = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <motion.button
      onClick={toggleTheme}
      className="p-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
    >
      {isDark ? (
        <Sun
          className="w-5 h-5 text-yellow-500 dark:text-yellow-400"
          strokeWidth={2}
        />
      ) : (
        <Moon
          className="w-5 h-5 text-slate-600 dark:text-slate-400"
          strokeWidth={2}
        />
      )}
    </motion.button>
  );
};

export default ThemeToggle;