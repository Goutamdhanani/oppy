import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

interface RewardAnimationsProps {
  trigger: 'levelUp' | 'achievement' | 'streak' | null;
  message?: string;
  icon?: string;
}

const RewardAnimations: React.FC<RewardAnimationsProps> = ({
  trigger,
  message = 'Great job!',
  icon = '🎉',
}) => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    if (trigger) {
      setIsVisible(true);
      
      // Trigger confetti based on the type of reward
      if (trigger === 'levelUp') {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#4f46e5', '#06b6d4', '#22c55e'],
        });
      } else if (trigger === 'achievement') {
        confetti({
          particleCount: 80,
          spread: 60,
          origin: { y: 0.6 },
          shapes: ['circle'],
          colors: ['#f59e0b', '#ef4444', '#4f46e5'],
        });
      } else if (trigger === 'streak') {
        confetti({
          particleCount: 50,
          spread: 45,
          origin: { y: 0.6 },
          shapes: ['star'],
          colors: ['#f59e0b', '#ef4444'],
        });
      }
      
      // Hide after animation completes
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [trigger]);
  
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.4 }}
        >
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center max-w-md">
            <motion.div
              className="text-5xl mb-4"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.4 }}
            >
              {icon}
            </motion.div>
            
            <motion.h3
              className="text-2xl font-bold mb-2"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.4 }}
            >
              {message}
            </motion.h3>
            
            <motion.div
              className="text-gray-500"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.4 }}
            >
              {trigger === 'levelUp' && 'You leveled up! New challenges await.'}
              {trigger === 'achievement' && 'You unlocked a new achievement!'}
              {trigger === 'streak' && 'Keep up the momentum!'}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default RewardAnimations;