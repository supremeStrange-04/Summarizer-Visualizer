import { useState } from 'react';
import { ImageIcon, LoaderIcon, RefreshCwIcon } from 'lucide-react';
import { motion } from 'framer-motion';

interface ImageDisplayProps {
  imageUrl: string;
  isLoading: boolean;
  isDarkMode: boolean;
  index: number;
}

const ImageDisplay = ({ imageUrl, isLoading, isDarkMode, index }: ImageDisplayProps) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [error, setError] = useState(false);

  const handleImageLoad = () => {
    setIsImageLoaded(true);
    setError(false);
  };

  const handleImageError = () => {
    setError(true);
    setIsImageLoaded(false);
  };

  if (isLoading) {
    return (
      <motion.div 
        className={`${
          isDarkMode 
            ? 'bg-gray-800 border-gray-700' 
            : 'bg-white/80 backdrop-blur-lg border-gray-200'
        } rounded-xl border shadow-lg shadow-purple-500/10 p-6 h-full flex flex-col`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
      >
        <h3 className={`text-lg font-semibold mb-4 ${
          isDarkMode ? 'text-white' : 'text-gray-800'
        }`}>Generated Image</h3>
        <div className={`flex-grow flex items-center justify-center ${
          isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
        } rounded-lg min-h-[240px]`}>
          <div className="flex flex-col items-center space-y-3 text-blue-500">
            <LoaderIcon className="h-10 w-10 animate-spin" />
            <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
              Generating image based on summary...
            </p>
          </div>
        </div>
      </motion.div>
    );
  }

  if (!imageUrl && !isLoading) {
    return (
      <motion.div 
        className={`${
          isDarkMode 
            ? 'bg-gray-800 border-gray-700' 
            : 'bg-white/80 backdrop-blur-lg border-gray-200'
        } rounded-xl border shadow-lg shadow-purple-500/10 p-6 h-full flex flex-col`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
      >
        <h3 className={`text-lg font-semibold mb-4 ${
          isDarkMode ? 'text-white' : 'text-gray-800'
        }`}>Generated Image</h3>
        <div className={`flex-grow flex items-center justify-center ${
          isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
        } rounded-lg min-h-[240px]`}>
          <div className="flex flex-col items-center space-y-3">
            <ImageIcon className={`h-16 w-16 ${
              isDarkMode ? 'text-gray-600' : 'text-gray-400'
            }`} />
            <p className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>
              Image will appear here
            </p>
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
      transition={{ delay: index * 0.1 }}
    >
      <h3 className={`text-lg font-semibold mb-4 ${
        isDarkMode ? 'text-white' : 'text-gray-800'
      }`}>Generated Image</h3>
      <div className={`flex-grow flex items-center justify-center ${
        isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
      } rounded-lg overflow-hidden relative`}>
        {!isImageLoaded && !error && (
          <div className="absolute inset-0 flex items-center justify-center">
            <LoaderIcon className="h-10 w-10 text-blue-500 animate-spin" />
          </div>
        )}
        
        {error && (
          <div className="flex flex-col items-center justify-center space-y-2 p-4">
            <span className={isDarkMode ? 'text-red-400' : 'text-red-500'}>
              Failed to load image
            </span>
            <motion.button 
              className={`flex items-center ${
                isDarkMode ? 'text-blue-400' : 'text-blue-600'
              } hover:underline`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <RefreshCwIcon className="h-4 w-4 mr-1" />
              <span>Try again</span>
            </motion.button>
          </div>
        )}
        
        {imageUrl && (
          <motion.img
            src={imageUrl}
            alt="Generated from summary"
            className={`max-w-full max-h-[320px] object-contain transition-opacity duration-300 ${
              isImageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={handleImageLoad}
            onError={handleImageError}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: isImageLoaded ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          />
        )}
      </div>
    </motion.div>
  );
};

export default ImageDisplay;