import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { useNavigate } from 'react-router-dom';
import { Play, CheckCircle, ArrowRight } from 'lucide-react';
import { useGamification } from '../../context/GamificationContext';
import { Subtopic } from '../../data/topics';
import { algorithmsData } from '../../data/algorithms';

interface SubtopicViewProps {
  subtopic: Subtopic;
  isCompleted: boolean;
  onComplete: () => void;
  topicColor: string;
}

const SubtopicView: React.FC<SubtopicViewProps> = ({
  subtopic,
  isCompleted,
  onComplete,
  topicColor,
}) => {
  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const { trackActivity } = useGamification();
  const navigate = useNavigate();
  
  useEffect(() => {
    // In a real app, this would fetch from an API or markdown files
    // For this example, we'll simulate loading content
    setLoading(true);
    
    // Simulate fetching content
    setTimeout(() => {
      const exampleContent = `
# ${subtopic.title}

${subtopic.description}

## Overview

This is an example of content for the ${subtopic.title} subtopic. In a real application, this would be loaded from markdown files or from a CMS.

## Key Concepts

- Key concept 1
- Key concept 2
- Key concept 3

## Code Example

\`\`\`javascript
function example() {
  console.log("This is an example code snippet");
  
  // Example logic
  const data = [1, 2, 3, 4, 5];
  for (let i = 0; i < data.length; i++) {
    console.log(data[i]);
  }
  
  return "Done!";
}
\`\`\`

## Visual Explanation

The algorithm works by iterating through each element and performing operations.

## Related Resources

1. [Resource 1](https://example.com)
2. [Resource 2](https://example.com)
`;
      
      setContent(exampleContent);
      setLoading(false);
    }, 800);
  }, [subtopic]);
  
  const handleComplete = () => {
    trackActivity('subtopic_completed', subtopic.id);
    onComplete();
  };
  
  const handleVisualizeClick = () => {
    if (subtopic.visualizerId) {
      navigate(`/visualize/${subtopic.visualizerId}`);
    }
  };
  
  if (loading) {
    return <div className="text-center py-8">Loading content...</div>;
  }
  
  return (
    <div>
      <div className="prose max-w-none">
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
      
      {subtopic.visualizerId && (
        <div className="mt-8 p-4 border border-gray-200 rounded-lg bg-gray-50">
          <h3 className="font-medium mb-2">Interactive Visualization Available</h3>
          <p className="text-sm text-gray-600 mb-4">
            Explore this concept with an interactive visualization to better understand the algorithm.
          </p>
          <button
            onClick={handleVisualizeClick}
            className="flex items-center text-white bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-md transition-colors"
          >
            <Play className="w-4 h-4 mr-2" />
            Visualize Algorithm
          </button>
        </div>
      )}
      
      <div className="mt-8 pt-6 border-t border-gray-200 flex justify-between">
        {!isCompleted ? (
          <motion.button
            onClick={handleComplete}
            className="flex items-center px-6 py-3 rounded-md font-medium text-white transition-colors"
            style={{ backgroundColor: topicColor }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <CheckCircle className="w-5 h-5 mr-2" />
            Mark as Completed
          </motion.button>
        ) : (
          <div className="flex items-center text-green-600">
            <CheckCircle className="w-5 h-5 mr-2" />
            Completed
          </div>
        )}
        
        <button
          onClick={onComplete}
          className="flex items-center px-6 py-3 bg-gray-100 hover:bg-gray-200 rounded-md font-medium text-gray-700 transition-colors"
        >
          Next Lesson
          <ArrowRight className="w-5 h-5 ml-2" />
        </button>
      </div>
    </div>
  );
};

export default SubtopicView;