import { SparklesIcon, SunIcon, MoonIcon } from 'lucide-react';
import { motion } from 'framer-motion';

interface HeaderProps {
  isDarkMode: boolean;
  onThemeToggle: () => void;
}

const Header = ({ isDarkMode, onThemeToggle }: HeaderProps) => {
  return (
    <motion.header 
      className={`${
        isDarkMode 
          ? 'bg-gray-800/95 border-gray-700' 
          : 'bg-white/80 backdrop-blur-lg border-gray-200'
      } sticky top-0 z-40 border-b transition-colors duration-300`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100 }}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <motion.div 
            className="flex items-center space-x-3"
            whileHover={{ scale: 1.05 }}
          >
            <SparklesIcon className={`h-7 w-7 ${
              isDarkMode ? 'text-blue-400' : 'text-blue-500'
            }`} />
            <h1 className={`text-2xl font-bold bg-gradient-to-r ${
              isDarkMode
                ? 'from-blue-400 to-purple-400'
                : 'from-blue-600 to-purple-600'
            } bg-clip-text text-transparent`}>
              Summarize & Visualize
            </h1>
          </motion.div>
          
          <div className="flex items-center space-x-6">
            <motion.a 
              href="#"
              className={`text-sm font-medium ${
                isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'
              } transition-colors`}
              whileHover={{ scale: 1.05 }}
            >
              How it works
            </motion.a>
            <motion.a 
              href="#"
              className={`text-sm font-medium ${
                isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'
              } transition-colors`}
              whileHover={{ scale: 1.05 }}
            >
              About
            </motion.a>
            <motion.button 
              className={`px-5 py-2.5 rounded-full ${
                isDarkMode
                  ? 'bg-blue-500 hover:bg-blue-400 text-white'
                  : 'bg-blue-600 hover:bg-blue-500 text-white'
              } font-medium text-sm transition-colors duration-200`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Started
            </motion.button>
            <motion.button
              onClick={onThemeToggle}
              className={`p-2 rounded-full ${
                isDarkMode 
                  ? 'bg-gray-700 text-yellow-300 hover:bg-gray-600' 
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              initial={false}
              animate={{ rotate: isDarkMode ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {isDarkMode ? <SunIcon className="w-5 h-5" /> : <MoonIcon className="w-5 h-5" />}
            </motion.button>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;