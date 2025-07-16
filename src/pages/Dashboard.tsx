import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, BookOpen, Code, Activity, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import InteractiveTree from '../components/ProgressTree/InteractiveTree';
import XPBar from '../components/Gamification/XPBar';
import { useGamification } from '../context/GamificationContext';
import { useProgress } from '../context/ProgressContext';
import { topicsData } from '../data/topics';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { level, streak, achievements } = useGamification();
  const { topicProgress } = useProgress();
  
  // Get completion statistics
  const getTotalCompletionStats = () => {
    let completedTopics = 0;
    let completedSubtopics = 0;
    let totalSubtopics = 0;
    let completedProblems = 0;
    let totalProblems = 0;
    
    topicsData.forEach((topic) => {
      const topicData = topicProgress[topic.id];
      totalSubtopics += topic.subtopics.length;
      totalProblems += topic.problems.length;
      
      if (topicData?.status === 'completed') {
        completedTopics += 1;
      }
      
      if (topicData?.completedSubtopics) {
        completedSubtopics += topicData.completedSubtopics.length;
      }
      
      if (topicData?.completedProblems) {
        completedProblems += topicData.completedProblems.length;
      }
    });
    
    return {
      completedTopics,
      totalTopics: topicsData.length,
      completedSubtopics,
      totalSubtopics,
      completedProblems,
      totalProblems,
    };
  };
  
  const stats = getTotalCompletionStats();
  
  // Get the next topic to learn
  const getNextTopic = () => {
    for (const topic of topicsData) {
      const progress = topicProgress[topic.id];
      if (progress?.status === 'in-progress') {
        return topic;
      }
    }
    
    for (const topic of topicsData) {
      const progress = topicProgress[topic.id];
      if (progress?.status === 'available') {
        return topic;
      }
    }
    
    return null;
  };
  
  const nextTopic = getNextTopic();
  
  // Get recent achievements
  const recentAchievements = achievements
    .filter((a) => a.unlocked)
    .sort((a, b) => b.progress - a.progress)
    .slice(0, 3);
  
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Welcome to DSA Learning Tree</h1>
        <p className="text-gray-600">
          Master Data Structures and Algorithms through interactive visualizations and gamified learning.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <motion.div
          className="bg-white rounded-xl shadow-sm p-6"
          whileHover={{ y: -5 }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 mr-4">
              <Trophy className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Level {level}</h2>
              <XPBar size="sm" showLevel={false} />
            </div>
          </div>
          <p className="text-gray-600 text-sm mb-3">
            Keep learning to earn XP and level up your skills!
          </p>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">
              Streak: {streak.current} day{streak.current !== 1 ? 's' : ''}
            </span>
            <span className="text-gray-500">
              Best: {streak.best} day{streak.best !== 1 ? 's' : ''}
            </span>
          </div>
        </motion.div>
        
        <motion.div
          className="bg-white rounded-xl shadow-sm p-6"
          whileHover={{ y: -5 }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600 mr-4">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Learning Progress</h2>
              <div className="text-sm text-gray-500">
                {stats.completedTopics} of {stats.totalTopics} topics completed
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Topics</span>
                <span>
                  {stats.completedTopics} / {stats.totalTopics}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1.5">
                <div
                  className="bg-green-500 h-1.5 rounded-full"
                  style={{
                    width: `${(stats.completedTopics / stats.totalTopics) * 100}%`,
                  }}
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Lessons</span>
                <span>
                  {stats.completedSubtopics} / {stats.totalSubtopics}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1.5">
                <div
                  className="bg-indigo-500 h-1.5 rounded-full"
                  style={{
                    width: `${(stats.completedSubtopics / stats.totalSubtopics) * 100}%`,
                  }}
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Problems</span>
                <span>
                  {stats.completedProblems} / {stats.totalProblems}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1.5">
                <div
                  className="bg-amber-500 h-1.5 rounded-full"
                  style={{
                    width: `${(stats.completedProblems / stats.totalProblems) * 100}%`,
                  }}
                />
              </div>
            </div>
          </div>
        </motion.div>
        
        <motion.div
          className="bg-white rounded-xl shadow-sm p-6"
          whileHover={{ y: -5 }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center text-amber-600 mr-4">
              <Code className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold">Continue Learning</h2>
          </div>
          
          {nextTopic ? (
            <>
              <div className="flex items-center mb-3">
                <span className="text-2xl mr-2">{nextTopic.icon}</span>
                <h3 className="font-bold">{nextTopic.title}</h3>
              </div>
              
              <p className="text-sm text-gray-600 mb-4">
                {nextTopic.description.substring(0, 100)}...
              </p>
              
              <button
                onClick={() => navigate(`/topic/${nextTopic.id}`)}
                className="w-full flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md transition-colors"
              >
                Continue Learning
                <ArrowRight className="w-4 h-4 ml-2" />
              </button>
            </>
          ) : (
            <p className="text-gray-600">
              You've made great progress! Review your completed topics or explore new ones.
            </p>
          )}
        </motion.div>
      </div>
      
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Your Learning Tree</h2>
        <InteractiveTree />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-bold mb-4">Recent Achievements</h2>
          
          {recentAchievements.length > 0 ? (
            <div className="space-y-4">
              {recentAchievements.map((achievement) => (
                <div
                  key={achievement.id}
                  className="flex items-center p-3 bg-indigo-50 rounded-lg"
                >
                  <div className="text-2xl mr-3">{achievement.icon}</div>
                  <div>
                    <h3 className="font-medium">{achievement.title}</h3>
                    <p className="text-sm text-gray-600">{achievement.description}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600">
              Complete topics and solve problems to earn achievements!
            </p>
          )}
          
          <button
            onClick={() => navigate('/profile')}
            className="mt-4 text-indigo-600 hover:text-indigo-800 font-medium text-sm flex items-center"
          >
            View All Achievements
            <ArrowRight className="w-4 h-4 ml-1" />
          </button>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-bold mb-4">Algorithm Visualizations</h2>
          <p className="text-gray-600 mb-4">
            Explore interactive visualizations to better understand algorithm behavior.
          </p>
          
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => navigate('/visualize/array-traversal')}
              className="p-3 bg-gray-50 hover:bg-gray-100 rounded-lg text-left transition-colors"
            >
              <div className="flex items-center mb-1">
                <Activity className="w-4 h-4 mr-2 text-indigo-600" />
                <span className="font-medium">Array Traversal</span>
              </div>
              <p className="text-xs text-gray-600">
                Step through basic array traversal operations
              </p>
            </button>
            
            <button
              onClick={() => navigate('/visualize/array-search')}
              className="p-3 bg-gray-50 hover:bg-gray-100 rounded-lg text-left transition-colors"
            >
              <div className="flex items-center mb-1">
                <Activity className="w-4 h-4 mr-2 text-indigo-600" />
                <span className="font-medium">Binary Search</span>
              </div>
              <p className="text-xs text-gray-600">
                Visualize the binary search algorithm on sorted arrays
              </p>
            </button>
            
            <button
              onClick={() => navigate('/visualize/stack-operations')}
              className="p-3 bg-gray-50 hover:bg-gray-100 rounded-lg text-left transition-colors"
            >
              <div className="flex items-center mb-1">
                <Activity className="w-4 h-4 mr-2 text-indigo-600" />
                <span className="font-medium">Stack Operations</span>
              </div>
              <p className="text-xs text-gray-600">
                See how push, pop, and peek work on a stack
              </p>
            </button>
            
            <button
              onClick={() => navigate('/visualize/queue-operations')}
              className="p-3 bg-gray-50 hover:bg-gray-100 rounded-lg text-left transition-colors"
            >
              <div className="flex items-center mb-1">
                <Activity className="w-4 h-4 mr-2 text-indigo-600" />
                <span className="font-medium">Queue Operations</span>
              </div>
              <p className="text-xs text-gray-600">
                Learn how enqueue and dequeue modify a queue
              </p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;