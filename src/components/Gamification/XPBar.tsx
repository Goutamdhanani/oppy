import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Award } from 'lucide-react';
import { useGamification } from '../../context/GamificationContext';

interface XPBarProps {
  size?: 'sm' | 'md' | 'lg';
  showLevel?: boolean;
}

const XPBar: React.FC<XPBarProps> = ({ size = 'md', showLevel = true }) => {
  const { xp, level, getLevelProgress, getNextLevelXP } = useGamification();
  
  const progress = getLevelProgress();
  const nextLevelXP = getNextLevelXP();
  
  const getHeight = () => {
    switch (size) {
      case 'sm': return 'h-1.5';
      case 'lg': return 'h-3';
      default: return 'h-2';
    }
  };
  
  return (
    <div className="w-full">
      {showLevel && (
        <div className="flex justify-between items-center mb-1">
          <div className="flex items-center">
            <Award className="w-4 h-4 mr-1 text-indigo-600" />
            <span className="text-sm font-medium">Level {level}</span>
          </div>
          <div className="text-xs text-gray-500">
            <span className="font-medium">{xp} XP</span> / {nextLevelXP} XP needed
          </div>
        </div>
      )}
      
      <div className={`w-full bg-gray-200 rounded-full ${getHeight()}`}>
        <motion.div
          className={`bg-indigo-600 rounded-full ${getHeight()}`}
          initial={{ width: '0%' }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
};

export default XPBar;