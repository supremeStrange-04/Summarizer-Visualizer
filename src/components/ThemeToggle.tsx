import { SunIcon, MoonIcon } from 'lucide-react';
import { motion } from 'framer-motion';

interface ThemeToggleProps {
  isDarkMode: boolean;
  onToggle: () => void;
}

const ThemeToggle = ({ isDarkMode, onToggle }: ThemeToggleProps) => {
  return (
    <motion.button
      className={`fixed top-4 right-4 p-2 rounded-full z-50 ${
        isDarkMode ? 'bg-gray-700 text-yellow-300' : 'bg-blue-100 text-gray-800'
      }`}
      onClick={onToggle}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      initial={false}
      animate={{ rotate: isDarkMode ? 180 : 0 }}
      transition={{ duration: 0.3 }}
    >
      {isDarkMode ? <SunIcon className="w-6 h-6" /> : <MoonIcon className="w-6 h-6" />}
    </motion.button>
  );
};

export default ThemeToggle;