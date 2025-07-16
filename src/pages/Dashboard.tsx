import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, BookOpen, Code, Activity, ArrowRight, CheckCircle, Lock, GitBranch, ChevronRight } from 'lucide-react';
import { topicsData } from '../data/topics';
import LearningTree from '../components/LearningTree'; // Import the component

// Current user data
const CURRENT_DATE = "2025-07-16 19:50:32";
const CURRENT_USER = "Daksha1107";

const Dashboard = () => {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(() => {
    const saved = localStorage.getItem('dsa_progress');
    return saved ? JSON.parse(saved) : {};
  });
  
  const [xp, setXp] = useState(() => {
    const saved = localStorage.getItem('dsa_xp');
    return saved ? parseInt(saved) : 0;
  });
  
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'tree'
  const [lastVisit, setLastVisit] = useState('');
  
  // Initialize progress if empty
  useEffect(() => {
    if (Object.keys(progress).length === 0) {
      const firstTopic = topicsData.find(t => t.prerequisites.length === 0);
      if (firstTopic) {
        const initialProgress = { [firstTopic.id]: { completed: [], status: 'available' } };
        setProgress(initialProgress);
        localStorage.setItem('dsa_progress', JSON.stringify(initialProgress));
      }
    }
    
    // Set last visit
    const storedLastVisit = localStorage.getItem('last_visit');
    if (storedLastVisit) {
      setLastVisit(storedLastVisit);
    }
    localStorage.setItem('last_visit', CURRENT_DATE);
  }, [progress]);
  
  const getTopicStatus = (topicId) => {
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
  
  const getCompletionPercentage = (topicId) => {
    const topic = topicsData.find(t => t.id === topicId);
    if (!topic || !progress[topicId]) return 0;
    
    return Math.round((progress[topicId].completed.length / topic.subtopics.length) * 100);
  };
  
  const getTotalProgress = () => {
    let completedTopics = 0;
    let totalTopics = topicsData.length;
    
    let completedSubtopics = 0;
    let totalSubtopics = 0;
    
    topicsData.forEach(topic => {
      totalSubtopics += topic.subtopics.length;
      
      if (progress[topic.id]?.status === 'completed') {
        completedTopics++;
      }
      
      completedSubtopics += progress[topic.id]?.completed.length || 0;
    });
    
    return {
      topics: Math.round((completedTopics / totalTopics) * 100),
      subtopics: Math.round((completedSubtopics / totalSubtopics) * 100)
    };
  };
  
  const totalProgress = getTotalProgress();
  
  // Calculate current level based on XP
  const calculateLevel = (xp) => {
    return Math.floor(Math.sqrt(xp / 10)) + 1;
  };
  
  const level = calculateLevel(xp);
  
  // Next topic to learn (in-progress or first available)
  const getNextTopic = () => {
    // First check for in-progress topics
    const inProgressTopic = topicsData.find(t => 
      progress[t.id]?.status === 'in-progress'
    );
    
    if (inProgressTopic) return inProgressTopic;
    
    // Then check for available topics
    const availableTopic = topicsData.find(t => 
      getTopicStatus(t.id) === 'available' && 
      (!progress[t.id] || progress[t.id].completed.length === 0)
    );
    
    return availableTopic;
  };
  
  const nextTopic = getNextTopic();
  
  // Topic Card Component
  const TopicCard = ({ topic }) => {
    const status = getTopicStatus(topic.id);
    const completionPercentage = getCompletionPercentage(topic.id);
    
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className={`bg-white rounded-xl shadow-sm overflow-hidden border-2 transition-all duration-300 hover:shadow-md ${
          status === 'completed' 
            ? 'border-[#34d399]' 
            : status === 'in-progress' 
              ? 'border-[#0070f3]'
              : status === 'available'
                ? 'border-[#8b5cf6]'
                : 'border-gray-200'
        }`}
      >
        <div className={`px-6 py-4 ${
          status === 'locked' ? 'bg-gray-50' : 'bg-white'
        }`}>
          <div className="flex items-start justify-between">
            <div className="flex items-center">
              <span className="text-3xl mr-3">{topic.icon}</span>
              <div>
                <h3 className={`font-bold ${
                  status === 'locked' ? 'text-gray-400' : 'text-gray-900'
                }`}>{topic.title}</h3>
                <p className={`text-sm ${
                  status === 'locked' ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  {topic.description.length > 60 
                    ? topic.description.substring(0, 60) + '...' 
                    : topic.description}
                </p>
              </div>
            </div>
            
            <div>
              {status === 'locked' && (
                <motion.div 
                  whileHover={{ scale: 1.1 }}
                  className="bg-gray-100 p-2 rounded-full"
                >
                  <Lock className="w-4 h-4 text-gray-400" />
                </motion.div>
              )}
              {status === 'completed' && (
                <motion.div 
                  whileHover={{ scale: 1.1 }}
                  className="bg-[#d1fae5] p-2 rounded-full"
                >
                  <CheckCircle className="w-4 h-4 text-[#059669]" />
                </motion.div>
              )}
            </div>
          </div>
          
          {status !== 'locked' && (
            <div className="mt-4">
              <div className="flex justify-between text-xs mb-1">
                <span className="text-gray-500">Progress</span>
                <span className="font-medium">{completionPercentage}%</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${completionPercentage}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className={`h-1.5 rounded-full ${
                    status === 'completed' 
                      ? 'bg-[#10b981]' 
                      : status === 'in-progress'
                        ? 'bg-[#0070f3]'
                        : 'bg-[#8b5cf6]'
                  }`}
                />
              </div>
            </div>
          )}
        </div>
        
        <div className={`px-6 py-3 border-t ${
          status === 'locked' ? 'border-gray-100 bg-gray-50' : 'border-gray-100'
        }`}>
          <div className="flex justify-between items-center">
            <div className="flex items-center text-xs text-gray-500">
              <Activity className="w-3 h-3 mr-1" />
              <span>{topic.estimatedHours} hours</span>
              <span className="mx-2">•</span>
              <span>{topic.subtopics.length} subtopics</span>
            </div>
            
            {status === 'locked' ? (
              <div className="text-xs text-gray-400">
                Complete prerequisites first
              </div>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate(`/topic/${topic.id}`)}
                className={`text-xs font-medium px-3 py-1.5 rounded-md ${
                  status === 'completed'
                    ? 'bg-[#d1fae5] text-[#059669] hover:bg-[#a7f3d0]'
                    : status === 'in-progress'
                      ? 'bg-[#dbeafe] text-[#1d4ed8] hover:bg-[#bfdbfe]'
                      : 'bg-[#ede9fe] text-[#6d28d9] hover:bg-[#ddd6fe]'
                }`}
              >
                {status === 'completed' 
                  ? 'Review' 
                  : status === 'in-progress' 
                    ? 'Continue' 
                    : 'Start Learning'}
              </motion.button>
            )}
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-8 max-w-6xl"
    >
      {/* Welcome section */}
      <div className="mb-4 bg-gradient-to-r from-[#4f46e5] to-[#7c3aed] text-white rounded-xl p-6 shadow-md">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold mb-2">Welcome back, {CURRENT_USER}!</h1>
            <p className="text-indigo-100">
              {lastVisit ? `Last visit: ${lastVisit}` : `Current date: ${CURRENT_DATE}`}
            </p>
          </div>
          {nextTopic && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate(`/topic/${nextTopic.id}`)}
              className="bg-white text-indigo-700 px-4 py-2 rounded-md shadow-sm hover:bg-indigo-50 transition-colors duration-200 flex items-center"
            >
              Continue Learning
              <ChevronRight className="w-5 h-5 ml-1" />
            </motion.button>
          )}
        </div>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <motion.div 
          whileHover={{ y: -5 }}
          transition={{ duration: 0.2 }}
          className="bg-white rounded-xl shadow-sm p-6 border-b-4 border-[#8b5cf6]"
        >
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Level {level}</h2>
              <p className="text-gray-500 text-sm">Learning progress</p>
            </div>
            <div className="bg-[#f3f4f6] p-3 rounded-full">
              <Trophy className="w-6 h-6 text-[#8b5cf6]" />
            </div>
          </div>
          
          <div className="mt-4">
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-600">XP</span>
              <span className="font-medium">{xp} / {Math.pow(level, 2) * 10}</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${(xp % (Math.pow(level, 2) * 10)) / (Math.pow(level, 2) * 10) * 100}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="bg-[#8b5cf6] h-2 rounded-full"
              />
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          whileHover={{ y: -5 }}
          transition={{ duration: 0.2 }}
          className="bg-white rounded-xl shadow-sm p-6 border-b-4 border-[#0070f3]"
        >
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{totalProgress.topics}%</h2>
              <p className="text-gray-500 text-sm">Topics completed</p>
            </div>
            <div className="bg-[#f3f4f6] p-3 rounded-full">
              <BookOpen className="w-6 h-6 text-[#0070f3]" />
            </div>
          </div>
          
          <div className="mt-4">
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-600">Progress</span>
              <span className="font-medium">
                {Object.values(progress).filter(p => p.status === 'completed').length} / {topicsData.length}
              </span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${totalProgress.topics}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="bg-[#0070f3] h-2 rounded-full"
              />
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          whileHover={{ y: -5 }}
          transition={{ duration: 0.2 }}
          className="bg-white rounded-xl shadow-sm p-6 border-b-4 border-[#f59e0b]"
        >
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{totalProgress.subtopics}%</h2>
              <p className="text-gray-500 text-sm">Subtopics mastered</p>
            </div>
            <div className="bg-[#f3f4f6] p-3 rounded-full">
              <Code className="w-6 h-6 text-[#f59e0b]" />
            </div>
          </div>
          
          <div className="mt-4">
            <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${totalProgress.subtopics}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="bg-[#f59e0b] h-2 rounded-full"
              />
            </div>
          </div>
          
          <div className="mt-3 text-sm text-gray-500">
            Keep going to unlock more advanced topics!
          </div>
        </motion.div>
      </div>
      
      {/* View toggle */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Your Learning Path</h2>
        
        <div className="flex bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setViewMode('grid')}
            className={`px-4 py-2 text-sm font-medium rounded-md flex items-center ${
              viewMode === 'grid'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Activity className="w-4 h-4 mr-2" />
            Grid View
          </button>
          <button
            onClick={() => setViewMode('tree')}
            className={`px-4 py-2 text-sm font-medium rounded-md flex items-center ${
              viewMode === 'tree'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <GitBranch className="w-4 h-4 mr-2" />
            Tree View
          </button>
        </div>
      </div>
      
      {/* Content based on view mode */}
      <AnimatePresence mode="wait">
        {viewMode === 'grid' ? (
          <motion.div
            key="grid"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
          >
            {topicsData.map(topic => (
              <TopicCard key={topic.id} topic={topic} />
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="tree"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="mb-12"
          >
            <LearningTree 
              progress={progress} 
              getTopicStatus={getTopicStatus} 
              getCompletionPercentage={getCompletionPercentage} 
            />
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* User info footer */}
      <div className="mt-8 p-4 bg-gray-50 rounded-lg text-center text-sm text-gray-500">
        <p>Logged in as <span className="font-medium">{CURRENT_USER}</span> | Current session: {CURRENT_DATE}</p>
      </div>
    </motion.div>
  );
};

export default Dashboard;