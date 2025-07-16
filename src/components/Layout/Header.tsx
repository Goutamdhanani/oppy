import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Home, BookOpen, Activity, User, Award } from 'lucide-react';
import { motion } from 'framer-motion';
import XPBar from '../Gamification/XPBar';
import { useGamification } from '../../context/GamificationContext';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { level, streak } = useGamification();
  
  const navigationItems = [
    { name: 'Dashboard', icon: <Home className="w-5 h-5" />, path: '/' },
    { name: 'Topics', icon: <BookOpen className="w-5 h-5" />, path: '/topic/arrays' },
    { name: 'Visualizer', icon: <Activity className="w-5 h-5" />, path: '/visualize/array-traversal' },
    { name: 'Profile', icon: <User className="w-5 h-5" />, path: '/profile' },
  ];
  
  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };
  
  return (
    <header className="bg-white shadow-sm sticky top-0 z-10">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="flex items-center">
            <span className="text-2xl mr-2">🎮</span>
            <span className="font-bold text-xl">DSA Learning Tree</span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center ${
                  isActive(item.path)
                    ? 'text-indigo-600 font-medium'
                    : 'text-gray-700 hover:text-indigo-600'
                }`}
              >
                <span className="mr-2">{item.icon}</span>
                {item.name}
              </Link>
            ))}
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-center space-x-2 bg-indigo-50 px-3 py-1 rounded-full">
              <Award className="w-4 h-4 text-indigo-600" />
              <span className="text-indigo-600 font-medium">Level {level}</span>
            </div>
            
            {streak.current > 0 && (
              <div className="flex items-center space-x-2 bg-amber-50 px-3 py-1 rounded-full">
                <span className="text-amber-600">🔥</span>
                <span className="text-amber-600 font-medium">{streak.current} day streak</span>
              </div>
            )}
          </div>
          
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-gray-700" />
            ) : (
              <Menu className="w-6 h-6 text-gray-700" />
            )}
          </button>
        </div>
        
        {/* Mobile menu */}
        {isMenuOpen && (
          <motion.div
            className="md:hidden py-4"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex flex-col space-y-4">
              {navigationItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center py-2 ${
                    isActive(item.path)
                      ? 'text-indigo-600 font-medium'
                      : 'text-gray-700'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className="mr-3">{item.icon}</span>
                  {item.name}
                </Link>
              ))}
              
              <div className="pt-4 border-t border-gray-100">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <Award className="w-4 h-4 mr-1 text-indigo-600" />
                    <span className="text-sm font-medium">Level {level}</span>
                  </div>
                  
                  {streak.current > 0 && (
                    <div className="flex items-center">
                      <span className="text-amber-600 mr-1">🔥</span>
                      <span className="text-sm font-medium">{streak.current} day streak</span>
                    </div>
                  )}
                </div>
                
                <XPBar size="sm" showLevel={false} />
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </header>
  );
};

export default Header;