import { GithubIcon, HeartIcon, TwitterIcon } from 'lucide-react';
import { motion } from 'framer-motion';

interface FooterProps {
  isDarkMode: boolean;
}

const Footer = ({ isDarkMode }: FooterProps) => {
  return (
    <footer className={`${
      isDarkMode 
        ? 'bg-gray-800 border-gray-700' 
        : 'bg-white/80 backdrop-blur-lg border-gray-200'
    } border-t transition-colors duration-300 py-8 mt-auto`}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <motion.div 
            className="mb-4 md:mb-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className={`${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            } text-sm`}>
              © 2025 Summarize & Visualize. All rights reserved.
            </p>
          </motion.div>

          <motion.div 
            className="flex items-center space-x-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <motion.a 
              href="#"
              className={`${
                isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-700'
              } transition-colors`}
              whileHover={{ scale: 1.1, rotate: 5 }}
              aria-label="GitHub"
            >
              <GithubIcon className="h-5 w-5" />
            </motion.a>
            <motion.a 
              href="#"
              className={`${
                isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-700'
              } transition-colors`}
              whileHover={{ scale: 1.1, rotate: -5 }}
              aria-label="Twitter"
            >
              <TwitterIcon className="h-5 w-5" />
            </motion.a>
            <motion.div 
              className={`flex items-center ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              } text-sm`}
              whileHover={{ scale: 1.05 }}
            >
              <span className="mr-1">Made with</span>
              <motion.div
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 10, -10, 0]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              >
                <HeartIcon className="h-4 w-4 text-red-500 mx-1" />
              </motion.div>
              <span>by StackBlitz</span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;