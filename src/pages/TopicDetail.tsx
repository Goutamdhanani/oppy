import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, Book, Code, CheckCircle, ArrowRight, Play, Clock, Award, Lock, Star, Check } from 'lucide-react';
import { topicsData } from '../data/topics';
import { algorithmsData } from '../data/algorithms';

// Current date and user info
const CURRENT_DATE = "2025-07-16 19:27:47";
const CURRENT_USER = "Daksha1107";

// Progress tracking using localStorage
const useProgress = () => {
  const [progress, setProgress] = useState(() => {
    const saved = localStorage.getItem('dsa_progress');
    return saved ? JSON.parse(saved) : {};
  });

  const markComplete = (topicId, subtopicId) => {
    const newProgress = { ...progress };
    if (!newProgress[topicId]) {
      newProgress[topicId] = { completed: [], status: 'in-progress' };
    }
    if (!newProgress[topicId].completed.includes(subtopicId)) {
      newProgress[topicId].completed.push(subtopicId);
    }
    
    // If all subtopics are completed, mark topic as completed
    const topic = topicsData.find(t => t.id === topicId);
    if (topic && newProgress[topicId].completed.length === topic.subtopics.length) {
      newProgress[topicId].status = 'completed';
      
      // Unlock next topics
      topic.prerequisites.forEach(prereqId => {
        const dependentTopics = topicsData.filter(t => 
          t.prerequisites.includes(topicId) && 
          t.prerequisites.every(p => 
            p === topicId || (newProgress[p] && newProgress[p].status === 'completed')
          )
        );
        
        dependentTopics.forEach(t => {
          if (!newProgress[t.id]) {
            newProgress[t.id] = { completed: [], status: 'available' };
          } else if (newProgress[t.id].status === 'locked') {
            newProgress[t.id].status = 'available';
          }
        });
      });
    }
    
    setProgress(newProgress);
    localStorage.setItem('dsa_progress', JSON.stringify(newProgress));
    return newProgress;
  };

  const getStatus = (topicId) => {
    if (!progress[topicId]) {
      // Check if prerequisites are met
      const topic = topicsData.find(t => t.id === topicId);
      if (!topic) return 'locked';
      
      const prereqsMet = topic.prerequisites.length === 0 || 
        topic.prerequisites.every(p => progress[p] && progress[p].status === 'completed');
      
      return prereqsMet ? 'available' : 'locked';
    }
    
    return progress[topicId].status;
  };

  const isSubtopicCompleted = (topicId, subtopicId) => {
    return progress[topicId]?.completed.includes(subtopicId) || false;
  };

  const getCompletionPercentage = (topicId) => {
    const topic = topicsData.find(t => t.id === topicId);
    if (!topic || !progress[topicId]) return 0;
    
    return Math.round((progress[topicId].completed.length / topic.subtopics.length) * 100);
  };

  // Initialize with first topic available if nothing is set
  useEffect(() => {
    if (Object.keys(progress).length === 0) {
      const firstTopic = topicsData.find(t => t.prerequisites.length === 0);
      if (firstTopic) {
        const initialProgress = { [firstTopic.id]: { completed: [], status: 'available' } };
        setProgress(initialProgress);
        localStorage.setItem('dsa_progress', JSON.stringify(initialProgress));
      }
    }
  }, [progress]);

  return { progress, markComplete, getStatus, isSubtopicCompleted, getCompletionPercentage };
};

const TopicDetail = () => {
  const { topicId, subtopicId } = useParams();
  const navigate = useNavigate();
  const { progress, markComplete, getStatus, isSubtopicCompleted, getCompletionPercentage } = useProgress();
  
  const [topic, setTopic] = useState(null);
  const [selectedSubtopic, setSelectedSubtopic] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('content');
  const [contentLoading, setContentLoading] = useState(false);
  const [isCompleting, setIsCompleting] = useState(false);
  
  // Simulate XP for gamification
  const [xp, setXp] = useState(() => {
    const saved = localStorage.getItem('dsa_xp');
    return saved ? parseInt(saved) : 0;
  });
  
  const addXp = (amount) => {
    const newXp = xp + amount;
    setXp(newXp);
    localStorage.setItem('dsa_xp', newXp.toString());
    
    // Show toast notification with animation
    const toast = document.createElement('div');
    toast.className = 'fixed top-4 right-4 bg-gradient-to-r from-green-500 to-green-600 text-white px-5 py-3 rounded-lg shadow-lg animate-fade-in-out z-50 flex items-center';
    toast.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
    </svg>
    <span><span class="font-bold">+${amount} XP</span> earned!</span>`;
    document.body.appendChild(toast);
    
    // Add confetti effect
    const confetti = document.createElement('script');
    confetti.src = 'https://cdn.jsdelivr.net/npm/canvas-confetti@1.5.1/dist/confetti.browser.min.js';
    confetti.onload = function() {
      window.confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.2 }
      });
    };
    document.body.appendChild(confetti);
    
    setTimeout(() => {
      document.body.removeChild(toast);
      document.body.removeChild(confetti);
    }, 3000);
  };

  useEffect(() => {
    if (topicId) {
      const foundTopic = topicsData.find(t => t.id === topicId);
      
      if (foundTopic) {
        setTopic(foundTopic);
        
        // Find selected subtopic or default to first one
        if (subtopicId) {
          const foundSubtopic = foundTopic.subtopics.find(s => s.id === subtopicId);
          if (foundSubtopic) {
            setSelectedSubtopic(foundSubtopic);
          } else {
            setSelectedSubtopic(foundTopic.subtopics[0]);
          }
        } else {
          setSelectedSubtopic(foundTopic.subtopics[0]);
        }
      }
      
      setLoading(false);
    }
  }, [topicId, subtopicId]);

  const handleSubtopicSelect = (subtopic) => {
    setSelectedSubtopic(subtopic);
    setContentLoading(true);
    navigate(`/topic/${topicId}/${subtopic.id}`);
    
    // Simulate content loading
    setTimeout(() => setContentLoading(false), 500);
  };

  const handleMarkComplete = () => {
    if (!selectedSubtopic) return;
    
    setIsCompleting(true);
    
    // Add progress
    setTimeout(() => {
      markComplete(topicId, selectedSubtopic.id);
      
      // Add XP
      addXp(30);
      
      setIsCompleting(false);
    }, 1000);
  };

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#0070f3]"></div>
        <p className="text-gray-500 mt-4">Loading topic content...</p>
      </div>
    );
  }

  if (!topic) {
    return (
      <div className="text-center py-16">
        <div className="text-red-500 text-xl">Topic not found</div>
        <button 
          onClick={() => navigate('/')}
          className="mt-4 px-4 py-2 bg-[#0070f3] text-white rounded-md hover:bg-[#0060df] transition-colors"
        >
          Return to Dashboard
        </button>
      </div>
    );
  }

  const topicStatus = getStatus(topicId);
  const completionPercentage = getCompletionPercentage(topicId);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-8 max-w-6xl"
    >
      {/* Header with back button and progress */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <motion.button
            whileHover={{ x: -3 }}
            transition={{ duration: 0.2 }}
            onClick={() => navigate('/')}
            className="flex items-center text-gray-600 hover:text-gray-900 mb-2"
          >
            <ChevronLeft className="w-5 h-5 mr-1" />
            Back to Dashboard
          </motion.button>
          
          <div className="flex items-center">
            <motion.span 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="text-4xl mr-3"
            >
              {topic.icon}
            </motion.span>
            <motion.h1 
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="text-3xl font-bold text-gray-900"
            >
              {topic.title}
            </motion.h1>
          </div>
        </div>
        
        <motion.div 
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="mt-4 md:mt-0 flex flex-col items-end"
        >
          <div className="flex items-center mb-2">
            <Award className="w-5 h-5 mr-2 text-[#8b5cf6]" />
            <span className="font-medium">{xp} XP</span>
          </div>
          
          <div className="w-48">
            <div className="flex justify-between text-sm mb-1">
              <span>Progress</span>
              <span>{completionPercentage}%</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${completionPercentage}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
                className={`h-2 rounded-full ${
                  topicStatus === 'completed' 
                    ? 'bg-[#10b981]' 
                    : 'bg-[#0070f3]'
                }`}
              />
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* Topic description */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="bg-gradient-to-r from-[#ede9fe] to-[#ddd6fe] rounded-xl p-5 mb-8"
      >
        <p className="text-[#4c1d95]">{topic.description}</p>
      </motion.div>
      
      {/* Main content grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Sidebar with subtopics list */}
        <motion.div 
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="md:col-span-4 lg:col-span-3"
        >
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="bg-[#f9fafb] px-4 py-3 border-b border-gray-200">
              <h2 className="font-semibold text-gray-800">Subtopics</h2>
            </div>
            
            <div className="divide-y divide-gray-100">
              {topic.subtopics.map((subtopic, index) => {
                const isCompleted = isSubtopicCompleted(topicId, subtopic.id);
                
                return (
                  <motion.button
                    key={subtopic.id}
                    whileHover={{ x: 3 }}
                    transition={{ duration: 0.2 }}
                    onClick={() => handleSubtopicSelect(subtopic)}
                    className={`w-full text-left px-4 py-3 flex items-center transition-colors ${
                      selectedSubtopic?.id === subtopic.id
                        ? 'bg-[#f5f3ff]'
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex-shrink-0 mr-3">
                      {isCompleted ? (
                        <div className="w-6 h-6 rounded-full bg-[#d1fae5] flex items-center justify-center">
                          <CheckCircle className="w-4 h-4 text-[#059669]" />
                        </div>
                      ) : (
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                          selectedSubtopic?.id === subtopic.id
                            ? 'bg-[#ede9fe] text-[#6d28d9]'
                            : 'bg-gray-100 text-gray-600'
                        }`}>
                          {index + 1}
                        </div>
                      )}
                    </div>
                    <div>
                      <div className={`font-medium ${
                        isCompleted 
                          ? 'text-[#059669]' 
                          : selectedSubtopic?.id === subtopic.id 
                            ? 'text-[#6d28d9]' 
                            : 'text-gray-800'
                      }`}>
                        {subtopic.title}
                      </div>
                      <div className="text-xs text-gray-500 truncate max-w-xs">
                        {subtopic.description}
                      </div>
                    </div>
                  </motion.button>
                );
              })}
            </div>
            
            <div className="bg-[#f9fafb] p-4 border-t border-gray-200">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">Completion</span>
                <span className="text-gray-800 font-medium">
                  {progress[topicId]?.completed.length || 0}/{topic.subtopics.length}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${completionPercentage}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="bg-[#0070f3] h-2 rounded-full"
                />
              </div>
            </div>
          </div>
          
          {/* Topic information */}
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.5 }}
            className="bg-white rounded-xl shadow-sm mt-6 p-5"
          >
            <h2 className="font-semibold text-gray-800 mb-3">Topic Information</h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Estimated Time:</span>
                <span className="text-gray-800 font-medium">{topic.estimatedHours} hours</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Problems:</span>
                <span className="text-gray-800 font-medium">{topic.problems.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Status:</span>
                <span className={`font-medium ${
                  topicStatus === 'completed' 
                    ? 'text-[#059669]' 
                    : topicStatus === 'in-progress' 
                      ? 'text-[#1d4ed8]' 
                      : topicStatus === 'available' 
                        ? 'text-[#6d28d9]' 
                        : 'text-gray-600'
                }`}>
                  {topicStatus.charAt(0).toUpperCase() + topicStatus.slice(1)}
                </span>
              </div>
              <div>
                <span className="text-gray-600">Prerequisites:</span>
                <div className="mt-1">
                  {topic.prerequisites.length > 0 ? (
                    topic.prerequisites.map(prereq => {
                      const prereqTopic = topicsData.find(t => t.id === prereq);
                      return (
                        <span 
                          key={prereq}
                          className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded mr-2 mb-2"
                        >
                          {prereqTopic?.title || prereq}
                        </span>
                      );
                    })
                  ) : (
                    <span className="text-gray-500 text-sm">None</span>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* User info */}
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.6 }}
            className="bg-[#f5f3ff] rounded-xl p-4 mt-6 text-sm text-[#6d28d9]"
          >
            <div className="flex items-center mb-2">
              <div className="w-8 h-8 bg-[#ede9fe] rounded-full flex items-center justify-center mr-3">
                <span className="font-bold">{CURRENT_USER.charAt(0)}</span>
              </div>
              <div>
                <div className="font-semibold">{CURRENT_USER}</div>
                <div className="text-xs text-[#7c3aed]">{CURRENT_DATE}</div>
              </div>
            </div>
          </motion.div>
        </motion.div>
        
        {/* Main content area */}
        <motion.div 
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="md:col-span-8 lg:col-span-9"
        >
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            {/* Tabs */}
            <div className="border-b border-gray-200">
              <nav className="flex">
                <button
                  onClick={() => setActiveTab('content')}
                  className={`px-6 py-4 text-sm font-medium flex items-center border-b-2 transition-colors duration-200 ${
                    activeTab === 'content'
                      ? 'border-[#0070f3] text-[#0070f3]'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Book className="w-4 h-4 mr-2" />
                  Learning Content
                </button>
                <button
                  onClick={() => setActiveTab('problems')}
                  className={`px-6 py-4 text-sm font-medium flex items-center border-b-2 transition-colors duration-200 ${
                    activeTab === 'problems'
                      ? 'border-[#0070f3] text-[#0070f3]'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Code className="w-4 h-4 mr-2" />
                  Practice Problems
                </button>
              </nav>
            </div>
            
            {/* Tab content */}
            <div className="p-6">
              <AnimatePresence mode="wait">
                {contentLoading ? (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex justify-center items-center h-64"
                  >
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#0070f3]"></div>
                  </motion.div>
                ) : activeTab === 'content' && selectedSubtopic ? (
                  <motion.div
                    key="content"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Subtopic header */}
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900">{selectedSubtopic.title}</h2>
                        <p className="text-gray-600 mt-1">{selectedSubtopic.description}</p>
                      </div>
                      
                      {isSubtopicCompleted(topicId, selectedSubtopic.id) && (
                        <div className="bg-[#d1fae5] text-[#059669] px-3 py-1 rounded-full text-sm font-medium flex items-center">
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Completed
                        </div>
                      )}
                    </div>
                    
                    {/* Mock content section */}
                    <div className="prose max-w-none">
                      <p>Welcome to the lesson on <strong>{selectedSubtopic.title}</strong>.</p>
                      
                      <p>In this lesson, you'll learn about key concepts related to {selectedSubtopic.title.toLowerCase()} 
                      and how they apply to data structures and algorithms problems.</p>
                      
                      <h3>Key Concepts</h3>
                      <ul>
                        <li>Understanding the fundamentals of {selectedSubtopic.title}</li>
                        <li>Implementation techniques and best practices</li>
                        <li>Common patterns and problem-solving approaches</li>
                        <li>Performance considerations and optimization</li>
                      </ul>
                      
                      <div className="bg-[#f9fafb] p-4 rounded-lg my-6 border border-gray-200">
                        <h4 className="font-bold text-gray-800">Example Code:</h4>
                        <pre className="bg-gray-800 text-gray-100 p-4 rounded overflow-x-auto">
                          <code>{`function example${selectedSubtopic.title.replace(/\s/g, '')}() {
  // Implementation of ${selectedSubtopic.title} algorithm
  console.log("Implementing ${selectedSubtopic.title}...");
  
  // Sample code would go here
  const data = [1, 2, 3, 4, 5];
  
  return "Algorithm complete!";
}`}</code>
                        </pre>
                      </div>
                      
                      <p>For the complete content, refer to: <code>{selectedSubtopic.contentPath}</code></p>
                    </div>
                    
                    {/* Visualization section if available */}
                    {selectedSubtopic.visualizerId && (
                      <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.4 }}
                        className="mt-8 p-6 bg-gradient-to-r from-[#dbeafe] to-[#eff6ff] rounded-xl border border-[#bfdbfe]"
                      >
                        <h3 className="text-lg font-semibold text-[#1e40af] flex items-center mb-2">
                          <Play className="w-5 h-5 mr-2" />
                          Interactive Visualization
                        </h3>
                        <p className="text-[#1e40af] mb-4">
                          This topic includes an interactive visualization to help you understand the concepts better.
                        </p>
                        <motion.button 
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => {
                            // In a full implementation, this would navigate to the visualization page
                            alert(`Opening visualization for: ${selectedSubtopic.visualizerId}`);
                          }}
                          className="bg-[#0070f3] hover:bg-[#0060df] text-white px-4 py-2 rounded-md transition-colors duration-200 flex items-center shadow-sm"
                        >
                          Launch Visualization
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </motion.button>
                      </motion.div>
                    )}
                    
                    {/* Subtopics if available */}
                    {selectedSubtopic.children && selectedSubtopic.children.length > 0 && (
                      <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.4 }}
                        className="mt-8"
                      >
                        <h3 className="text-xl font-bold mb-4">Related Subtopics</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {selectedSubtopic.children.map(child => (
                            <motion.div 
                              key={child.id}
                              whileHover={{ y: -3, boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' }}
                              transition={{ duration: 0.2 }}
                              className="border border-gray-200 rounded-lg p-4 transition-all duration-200"
                            >
                              <h4 className="font-bold text-gray-800">{child.title}</h4>
                              <p className="text-sm text-gray-600 mt-1">{child.description}</p>
                              {child.visualizerId && (
                                <div className="mt-2 text-xs text-[#0070f3] flex items-center">
                                  <Play className="w-3 h-3 mr-1" />
                                  Includes visualization
                                </div>
                              )}
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                    
                    {/* Navigation buttons */}
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4, duration: 0.4 }}
                      className="mt-8 pt-6 border-t border-gray-200 flex justify-between"
                    >
                      {!isSubtopicCompleted(topicId, selectedSubtopic.id) ? (
                        <motion.button
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={handleMarkComplete}
                          disabled={isCompleting}
                          className={`flex items-center px-5 py-2.5 bg-[#10b981] hover:bg-[#059669] text-white rounded-lg transition-all duration-200 shadow-sm ${
                            isCompleting ? 'opacity-70 cursor-not-allowed' : ''
                          }`}
                        >
                          {isCompleting ? (
                            <>
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                              Completing...
                            </>
                          ) : (
                            <>
                              <CheckCircle className="w-5 h-5 mr-2" />
                              Mark as Completed
                            </>
                          )}
                        </motion.button>
                      ) : (
                        <div className="flex items-center text-[#059669]">
                          <CheckCircle className="w-5 h-5 mr-2" />
                          Completed on {CURRENT_DATE.split(' ')[0]}
                        </div>
                      )}
                      
                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          const currentIndex = topic.subtopics.findIndex(s => s.id === selectedSubtopic.id);
                          if (currentIndex < topic.subtopics.length - 1) {
                            handleSubtopicSelect(topic.subtopics[currentIndex + 1]);
                          } else {
                            setActiveTab('problems');
                          }
                        }}
                        className="flex items-center px-5 py-2.5 bg-[#ede9fe] hover:bg-[#ddd6fe] text-[#6d28d9] rounded-lg transition-colors duration-200"
                      >
                        Next Lesson
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </motion.button>
                    </motion.div>
                  </motion.div>
                ) : activeTab === 'problems' ? (
                  <motion.div
                  key="problems"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="text-2xl font-bold mb-6 text-gray-900">Practice Problems</h2>
                  
                  <div className="space-y-4">
                    {topic.problems.map(problem => (
                      <motion.div 
                        key={problem.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-all duration-200"
                        whileHover={{ y: -3, boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="flex items-center mb-2">
                              <h3 className="font-semibold text-lg text-gray-900 mr-3">{problem.title}</h3>
                              <span className={`text-xs px-2 py-1 rounded-full ${
                                problem.difficulty === 'easy' 
                                  ? 'bg-[#d1fae5] text-[#059669]'
                                  : problem.difficulty === 'medium'
                                    ? 'bg-[#fef3c7] text-[#b45309]'
                                    : 'bg-[#fee2e2] text-[#b91c1c]'
                              }`}>
                                {problem.difficulty.charAt(0).toUpperCase() + problem.difficulty.slice(1)}
                              </span>
                            </div>
                            <p className="text-gray-600 text-sm mb-3">
                              {problem.description}
                            </p>
                            
                            <div className="flex flex-wrap gap-2 mb-3">
                              <span className="text-xs bg-[#f3f4f6] text-gray-600 px-2 py-1 rounded-full flex items-center">
                                <Clock className="w-3 h-3 mr-1" />
                                {problem.difficulty === 'easy' ? '15-30' : problem.difficulty === 'medium' ? '30-45' : '45-60'} mins
                              </span>
                              <span className="text-xs bg-[#f3f4f6] text-gray-600 px-2 py-1 rounded-full flex items-center">
                                <Star className="w-3 h-3 mr-1" />
                                {problem.difficulty === 'easy' ? '1-2' : problem.difficulty === 'medium' ? '3-4' : '4-5'} stars
                              </span>
                            </div>
                            
                            <div className="flex items-center text-xs text-gray-500">
                              <Check className="w-3 h-3 mr-1 text-[#059669]" />
                              <span>Verified by {Math.floor(Math.random() * 1000) + 500} users</span>
                            </div>
                          </div>
                          
                          {problem.externalUrl && (
                            <motion.a
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.98 }}
                              href={problem.externalUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="bg-[#0070f3] hover:bg-[#0060df] text-white px-4 py-2 rounded-md text-sm transition-colors duration-200 flex items-center shadow-sm"
                            >
                              Solve Problem
                              <ArrowRight className="w-4 h-4 ml-1" />
                            </motion.a>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.4 }}
                    className="mt-8 pt-6 border-t border-gray-200"
                  >
                    <div className="bg-[#ede9fe] text-[#6d28d9] p-4 rounded-lg">
                      <div className="flex items-start">
                        <Award className="w-5 h-5 mr-3 mt-0.5" />
                        <div>
                          <p className="font-medium">Pro Tip</p>
                          <p className="text-sm">
                            Completing practice problems is essential for mastering this topic. 
                            Try to solve all problems to strengthen your understanding. Track your progress
                            on each problem to see improvement over time.
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4 text-center text-sm text-gray-500">
                      <p>Last updated: {CURRENT_DATE}</p>
                    </div>
                  </motion.div>
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center py-16 text-gray-500"
                >
                  Select a tab to view content
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </div>
  </motion.div>
);
};

export default TopicDetail;