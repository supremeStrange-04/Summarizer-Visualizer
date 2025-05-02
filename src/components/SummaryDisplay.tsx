import { useState } from 'react';
import { EditIcon, CheckIcon, RefreshCwIcon, LoaderIcon } from 'lucide-react';
import { motion } from 'framer-motion';

interface SummaryDisplayProps {
  summary: string;
  editedSummary: string;
  onSummaryChange: (summary: string) => void;
  onRegenerateImages: () => void;
  isLoading: boolean;
  isDarkMode: boolean;
}

const SummaryDisplay = ({
  summary,
  editedSummary,
  onSummaryChange,
  onRegenerateImages,
  isLoading,
  isDarkMode,
}: SummaryDisplayProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
  };

  const handleSummaryChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onSummaryChange(e.target.value);
  };

  const handleRegenerateClick = () => {
    setIsEditing(false);
    onRegenerateImages();
  };

  if (isLoading) {
    return (
      <motion.div 
        className={`${
          isDarkMode 
            ? 'bg-gray-800 border-gray-700' 
            : 'bg-white/80 backdrop-blur-lg border-gray-200'
        } rounded-xl border shadow-lg shadow-purple-500/10 p-6 h-full flex flex-col animate-pulse`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex justify-between items-center mb-4">
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded-md w-8"></div>
        </div>
        <div className="space-y-3 flex-grow">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4/6"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
        </div>
        <div className="flex justify-center mt-4">
          <div className="flex items-center space-x-2 text-blue-500">
            <LoaderIcon className="h-5 w-5 animate-spin" />
            <span>Generating summary...</span>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      className={`${
        isDarkMode 
          ? 'bg-gray-800 border-gray-700' 
          : 'bg-white/80 backdrop-blur-lg border-gray-200'
      } rounded-xl border shadow-lg shadow-purple-500/10 p-6 h-full flex flex-col`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className={`text-lg font-semibold ${
          isDarkMode ? 'text-white' : 'text-gray-800'
        }`}>Summary</h3>
        {!isEditing ? (
          <motion.button
            onClick={handleEditClick}
            className={`p-2 ${
              isDarkMode 
                ? 'text-gray-400 hover:text-blue-400 hover:bg-gray-700' 
                : 'text-gray-500 hover:text-blue-600 hover:bg-blue-50'
            } rounded-md transition-colors`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            title="Edit summary"
          >
            <EditIcon className="h-5 w-5" />
          </motion.button>
        ) : (
          <motion.button
            onClick={handleSaveClick}
            className={`p-2 ${
              isDarkMode 
                ? 'text-gray-400 hover:text-green-400 hover:bg-gray-700' 
                : 'text-gray-500 hover:text-green-600 hover:bg-green-50'
            } rounded-md transition-colors`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            title="Save changes"
          >
            <CheckIcon className="h-5 w-5" />
          </motion.button>
        )}
      </div>

      <div className="flex-grow">
        {isEditing ? (
          <textarea
            value={editedSummary}
            onChange={handleSummaryChange}
            className={`w-full h-full p-2 rounded-md resize-none ${
              isDarkMode 
                ? 'bg-gray-700 text-white border-gray-600 focus:border-blue-500' 
                : 'bg-white text-gray-800 border-gray-300 focus:border-blue-500'
            } border focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors`}
            placeholder="Edit the summary..."
          ></textarea>
        ) : (
          <div className="prose max-w-none">
            <p className={`leading-relaxed ${
              isDarkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>{editedSummary}</p>
          </div>
        )}
      </div>

      {isEditing && (
        <motion.div 
          className="mt-4 flex justify-end"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <motion.button
            onClick={handleRegenerateClick}
            className={`flex items-center px-4 py-2 rounded-md ${
              isDarkMode
                ? 'bg-blue-500 hover:bg-blue-400 text-white'
                : 'bg-blue-600 hover:bg-blue-500 text-white'
            } transition-colors`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <RefreshCwIcon className="h-4 w-4 mr-2" />
            <span>Regenerate images</span>
          </motion.button>
        </motion.div>
      )}
    </motion.div>
  );
};

export default SummaryDisplay;