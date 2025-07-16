import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home } from 'lucide-react';
import { motion } from 'framer-motion';

const NotFound: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <div className="text-6xl mb-6">🔍</div>
        <h1 className="text-4xl font-bold mb-2">Page Not Found</h1>
        <p className="text-gray-600 mb-8">
          Sorry, the page you're looking for doesn't exist or has been moved.
        </p>
        
        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md transition-colors"
        >
          <Home className="w-5 h-5 mr-2" />
          Back to Dashboard
        </button>
      </motion.div>
    </div>
  );
};

export default NotFound;