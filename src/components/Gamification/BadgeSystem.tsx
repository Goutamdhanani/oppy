import React from 'react';
import { motion } from 'framer-motion';
import { useGamification } from '../../context/GamificationContext';

const BadgeSystem: React.FC = () => {
  const { achievements } = useGamification();
  
  // Group achievements by category
  const achievementsByCategory = achievements.reduce((acc, achievement) => {
    const { category } = achievement;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(achievement);
    return acc;
  }, {} as Record<string, typeof achievements>);
  
  // Category labels
  const categoryLabels: Record<string, string> = {
    topic: 'Topic Mastery',
    problem: 'Problem Solving',
    streak: 'Learning Streaks',
    visualization: 'Visualizations',
  };
  
  return (
    <div className="space-y-6">
      {Object.entries(achievementsByCategory).map(([category, categoryAchievements]) => (
        <div key={category}>
          <h3 className="text-lg font-medium mb-3">{categoryLabels[category] || category}</h3>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {categoryAchievements.map((achievement) => (
              <motion.div
                key={achievement.id}
                className={`p-4 rounded-lg text-center ${
                  achievement.unlocked
                    ? 'bg-indigo-50 border-2 border-indigo-200'
                    : 'bg-gray-50 border-2 border-gray-200'
                }`}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <div className="text-3xl mb-2">{achievement.icon}</div>
                <h4 className="font-medium text-sm mb-1">{achievement.title}</h4>
                <p className="text-xs text-gray-500 mb-2">{achievement.description}</p>
                
                {!achievement.unlocked && (
                  <div>
                    <div className="w-full bg-gray-200 h-1.5 rounded-full mb-1">
                      <div
                        className="bg-indigo-500 h-1.5 rounded-full"
                        style={{
                          width: `${(achievement.progress / achievement.requiredValue) * 100}%`,
                        }}
                      />
                    </div>
                    <p className="text-xs text-gray-500">
                      {achievement.progress} / {achievement.requiredValue}
                    </p>
                  </div>
                )}
                
                {achievement.unlocked && (
                  <span className="inline-block px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                    Unlocked
                  </span>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default BadgeSystem;