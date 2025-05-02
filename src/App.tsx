import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import TextInput from './components/TextInput';
import SummaryDisplay from './components/SummaryDisplay';
import ImageDisplay from './components/ImageDisplay';
import Footer from './components/Footer';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });
  const [text, setText] = useState('');
  const [summary, setSummary] = useState('');
  const [editedSummary, setEditedSummary] = useState('');
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [isGeneratingSummary, setIsGeneratingSummary] = useState(false);
  const [isGeneratingImages, setIsGeneratingImages] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  const handleTextSubmit = async (inputText: string) => {
    if (!inputText.trim()) {
      setError('Please enter some text to summarize');
      return;
    }
    
    setText(inputText);
    setError('');
    setIsGeneratingSummary(true);
    
    try {
      const result = await mockSummarizeText(inputText);
      setSummary(result);
      setEditedSummary(result);
      
      handleGenerateImages(result);
    } catch (err) {
      setError('Failed to generate summary. Please try again.');
      console.error(err);
    } finally {
      setIsGeneratingSummary(false);
    }
  };

  const handleGenerateImages = async (summaryText: string) => {
    if (!summaryText.trim()) {
      setError('Please enter a summary to generate images');
      return;
    }
    
    setError('');
    setIsGeneratingImages(true);
    setImageUrls([]);
    
    try {
      const imageResults = await Promise.all([
        mockGenerateImage(summaryText),
        mockGenerateImage(summaryText),
        mockGenerateImage(summaryText)
      ]);
      setImageUrls(imageResults);
    } catch (err) {
      setError('Failed to generate images. Please try again.');
      console.error(err);
    } finally {
      setIsGeneratingImages(false);
    }
  };

  const handleSummaryEdit = (newSummary: string) => {
    setEditedSummary(newSummary);
  };

  const handleRegenerateImages = () => {
    if (editedSummary) {
      handleGenerateImages(editedSummary);
    }
  };

  const mockSummarizeText = async (text: string): Promise<string> => {
    await new Promise(resolve => setTimeout(resolve, 1500));
    const words = text.split(' ');
    const selectedWords = words.filter((_, i) => i % 3 === 0 || i % 7 === 0);
    const summary = selectedWords.join(' ');
    return summary.length > 10 ? summary : 
      "This is an AI-generated summary of the text you provided. It highlights the key points while maintaining the core message.";
  };

  const mockGenerateImage = async (summary: string): Promise<string> => {
    await new Promise(resolve => setTimeout(resolve, Math.random() * 1000 + 1000));
    const mockImages = [
      "https://images.pexels.com/photos/3888585/pexels-photo-3888585.jpeg",
      "https://images.pexels.com/photos/2946359/pexels-photo-2946359.jpeg",
      "https://images.pexels.com/photos/2908968/pexels-photo-2908968.jpeg",
      "https://images.pexels.com/photos/3888585/pexels-photo-3888585.jpeg"
    ];
    return mockImages[Math.floor(Math.random() * mockImages.length)];
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDarkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-blue-50 to-purple-50'
    }`}>
      <Header isDarkMode={isDarkMode} onThemeToggle={() => setIsDarkMode(!isDarkMode)} />
      
      <main className="container mx-auto px-4 py-8">
        <motion.div 
          className="max-w-5xl mx-auto space-y-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <TextInput 
            onSubmit={handleTextSubmit} 
            isLoading={isGeneratingSummary}
            isDarkMode={isDarkMode}
          />
          
          <AnimatePresence>
            {error && (
              <motion.div 
                className="p-4 bg-red-50 dark:bg-red-900 border-l-4 border-red-500 text-red-700 dark:text-red-200 rounded"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
              >
                {error}
              </motion.div>
            )}
          </AnimatePresence>
          
          <AnimatePresence>
            {(summary || isGeneratingSummary) && (
              <motion.div 
                className="grid grid-cols-1 lg:grid-cols-2 gap-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <SummaryDisplay 
                  summary={summary}
                  editedSummary={editedSummary}
                  onSummaryChange={handleSummaryEdit}
                  onRegenerateImages={handleRegenerateImages}
                  isLoading={isGeneratingSummary}
                  isDarkMode={isDarkMode}
                />
                
                <div className="grid grid-cols-1 gap-4">
                  {imageUrls.map((url, index) => (
                    <ImageDisplay 
                      key={`${url}-${index}`}
                      imageUrl={url}
                      isLoading={isGeneratingImages}
                      isDarkMode={isDarkMode}
                      index={index}
                    />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </main>
      
      <Footer isDarkMode={isDarkMode} />
    </div>
  );
}

export default App;