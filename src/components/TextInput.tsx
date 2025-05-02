import { useState } from 'react';
import { UploadIcon, FileTextIcon, SendIcon, LoaderIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface TextInputProps {
  onSubmit: (text: string) => void;
  isLoading: boolean;
  isDarkMode: boolean;
}

const TextInput = ({ onSubmit, isLoading, isDarkMode }: TextInputProps) => {
  const [text, setText] = useState('');
  const [isDragActive, setIsDragActive] = useState(false);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoading && text.trim()) {
      onSubmit(text);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragActive(true);
  };

  const handleDragLeave = () => {
    setIsDragActive(false);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      
      if (file.type === "text/plain") {
        try {
          const content = await readFileContent(file);
          setText(content);
        } catch (err) {
          console.error("Error reading file:", err);
        }
      }
    }
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      
      try {
        const content = await readFileContent(file);
        setText(content);
      } catch (err) {
        console.error("Error reading file:", err);
      }
    }
  };

  const readFileContent = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = (event) => {
        if (event.target?.result) {
          resolve(event.target.result as string);
        } else {
          reject(new Error("Failed to read file"));
        }
      };
      
      reader.onerror = () => {
        reject(new Error("Failed to read file"));
      };
      
      reader.readAsText(file);
    });
  };

  return (
    <motion.div 
      className={`${
        isDarkMode 
          ? 'bg-gray-800 shadow-lg shadow-purple-500/10' 
          : 'bg-white/80 backdrop-blur-lg shadow-xl shadow-purple-500/10'
      } rounded-2xl overflow-hidden transition-all duration-300`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="p-6">
        <motion.h2 
          className={`text-2xl font-bold ${
            isDarkMode ? 'text-white' : 'text-gray-800'
          } mb-4`}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          Enter your text
        </motion.h2>
        
        <form onSubmit={handleSubmit}>
          <motion.div 
            className={`relative border-2 rounded-xl transition-all duration-200 ${
              isDragActive 
                ? 'border-blue-500 bg-blue-500/10' 
                : isDarkMode
                  ? 'border-gray-600 hover:border-gray-500'
                  : 'border-gray-200 hover:border-gray-300'
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            whileHover={{ scale: 1.005 }}
          >
            <textarea 
              className={`w-full p-4 h-36 focus:outline-none resize-none rounded-lg ${
                isDarkMode 
                  ? 'bg-transparent text-white placeholder-gray-400' 
                  : 'bg-transparent text-gray-800 placeholder-gray-500'
              }`}
              placeholder="Type or paste your text here, or drop a text file..."
              value={text}
              onChange={handleTextChange}
              disabled={isLoading}
            />
            
            <AnimatePresence>
              {!text && (
                <motion.div 
                  className="absolute inset-0 flex items-center justify-center pointer-events-none"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.7 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="flex flex-col items-center text-gray-500">
                    <FileTextIcon className="h-12 w-12 mb-2" />
                    <p>Drag and drop a text file or start typing...</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
          
          <div className="mt-6 flex items-center justify-between">
            <motion.label 
              className={`inline-flex items-center px-4 py-2 rounded-full cursor-pointer ${
                isDarkMode
                  ? 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              } transition-colors`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <UploadIcon className="h-5 w-5 mr-2" />
              <span className="text-sm font-medium">Upload file</span>
              <input 
                type="file" 
                className="hidden" 
                accept=".txt"
                onChange={handleFileSelect}
                disabled={isLoading}
              />
            </motion.label>
            
            <motion.button
              type="submit"
              disabled={!text.trim() || isLoading}
              className={`
                flex items-center px-6 py-2.5 rounded-full font-medium
                ${
                  !text.trim() || isLoading
                    ? isDarkMode
                      ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                      : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    : isDarkMode
                      ? 'bg-blue-500 hover:bg-blue-400 text-white'
                      : 'bg-blue-600 hover:bg-blue-500 text-white'
                } 
                transition-all duration-200
              `}
              whileHover={!isLoading && text.trim() ? { scale: 1.05 } : {}}
              whileTap={!isLoading && text.trim() ? { scale: 0.95 } : {}}
            >
              {isLoading ? (
                <motion.div
                  className="flex items-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <LoaderIcon className="h-5 w-5 mr-2 animate-spin" />
                  <span>Processing...</span>
                </motion.div>
              ) : (
                <motion.div
                  className="flex items-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <SendIcon className="h-5 w-5 mr-2" />
                  <span>Summarize</span>
                </motion.div>
              )}
            </motion.button>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default TextInput;