import React from 'react';
import { motion } from 'framer-motion';
import { Award, Calendar, BookOpen, BarChart2, Settings } from 'lucide-react';
import XPBar from '../components/Gamification/XPBar';
import BadgeSystem from '../components/Gamification/BadgeSystem';
import { useGamification } from '../context/GamificationContext';
import { useProgress } from '../context/ProgressContext';
import { topicsData } from '../data/topics';

const Profile: React.FC = () => {
  const { level, xp, streak, achievements } = useGamification();
  const { topicProgress } = useProgress();
  
  // Calculate statistics
  const calculateStats = () => {
    let completedTopics = 0;
    let completedSubtopics = 0;
    let completedProblems = 0;
    
    Object.entries(topicProgress).forEach(([topicId, progress]) => {
      if (progress.status === 'completed') {
        completedTopics++;
      }
      
      completedSubtopics += progress.completedSubtopics.length;
      completedProblems += progress.completedProblems.length;
    });
    
    return {
      completedTopics,
      completedSubtopics,
      completedProblems,
      unlockedAchievements: achievements.filter(a => a.unlocked).length,
    };
  };
  
  const stats = calculateStats();
  
  // Get completed topics
  const getCompletedTopics = () => {
    return topicsData
      .filter(topic => topicProgress[topic.id]?.status === 'completed')
      .slice(0, 3); // Just show the most recent 3
  };
  
  const completedTopics = getCompletedTopics();
  
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Your Profile</h1>
        <p className="text-gray-600">
          Track your learning progress and achievements
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="md:col-span-2 bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center mb-6">
            <div className="bg-indigo-100 rounded-full p-4 mr-4">
              <Award className="w-8 h-8 text-indigo-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Level {level}</h2>
              <p className="text-gray-600">{xp} XP total</p>
            </div>
          </div>
          
          <XPBar size="lg" />
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <div className="bg-gray-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-indigo-600">{stats.completedTopics}</div>
              <div className="text-sm text-gray-600">Topics Completed</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-cyan-600">{stats.completedSubtopics}</div>
              <div className="text-sm text-gray-600">Lessons Completed</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-green-600">{stats.completedProblems}</div>
              <div className="text-sm text-gray-600">Problems Solved</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-amber-600">{stats.unlockedAchievements}</div>
              <div className="text-sm text-gray-600">Achievements</div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-bold mb-4 flex items-center">
            <Calendar className="w-5 h-5 mr-2" />
            Learning Streak
          </h2>
          
          <div className="text-center py-4">
            <div className="text-5xl mb-2">🔥</div>
            <div className="text-3xl font-bold text-amber-600">{streak.current}</div>
            <div className="text-gray-600">Days in a row</div>
            
            <div className="mt-4 text-sm text-gray-600">
              Best streak: {streak.best} days
            </div>
          </div>
          
          <div className="mt-4 bg-amber-50 rounded-lg p-3 text-sm text-amber-700">
            Keep your streak going by learning something new every day!
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-bold mb-4 flex items-center">
            <BookOpen className="w-5 h-5 mr-2" />
            Completed Topics
          </h2>
          
          {completedTopics.length > 0 ? (
            <div className="space-y-4">
              {completedTopics.map(topic => (
                <motion.div
                  key={topic.id}
                  className="p-3 border border-gray-200 rounded-lg flex items-center"
                  whileHover={{ x: 5 }}
                >
                  <div className="text-2xl mr-3">{topic.icon}</div>
                  <div>
                    <div className="font-medium">{topic.title}</div>
                    <div className="text-xs text-gray-500">
                      {topicProgress[topic.id]?.completedSubtopics.length}/{topic.subtopics.length} lessons completed
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-gray-600 text-center py-4">
              You haven't completed any topics yet. Keep learning!
            </div>
          )}
        </div>
        
        <div className="md:col-span-2 bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-bold mb-4 flex items-center">
            <BarChart2 className="w-5 h-5 mr-2" />
            Learning Activity
          </h2>
          
          <div className="text-center text-gray-600 py-8">
            <div className="mb-4">
              <div className="inline-block p-4 bg-gray-100 rounded-full">
                <BarChart2 className="w-8 h-8 text-gray-400" />
              </div>
            </div>
            <p>Detailed learning activity charts will be available soon!</p>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
        <h2 className="text-xl font-bold mb-6">Your Achievements</h2>
        <BadgeSystem />
      </div>
      
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-bold mb-4 flex items-center">
          <Settings className="w-5 h-5 mr-2" />
          Settings
        </h2>
        
        <div className="text-center text-gray-600 py-8">
          <p>Account settings and preferences will be available soon!</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;