import React, { createContext, useState, useEffect, useContext } from 'react';
import toast from 'react-hot-toast';
import confetti from 'canvas-confetti';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  requiredValue: number;
  unlocked: boolean;
  progress: number;
  category: 'topic' | 'problem' | 'streak' | 'visualization';
}

interface GamificationContextType {
  xp: number;
  level: number;
  achievements: Achievement[];
  streak: {
    current: number;
    best: number;
    lastActivity: string | null;
  };
  addXP: (amount: number, reason: string) => void;
  incrementStreak: () => void;
  trackActivity: (activityType: string, entityId: string) => void;
  getNextLevelXP: () => number;
  getLevelProgress: () => number;
}

const GamificationContext = createContext<GamificationContextType | undefined>(undefined);

// XP required for each level (increases with level)
const getXPForLevel = (level: number): number => {
  return Math.floor(100 * (level * 1.5));
};

// Calculate level based on total XP
const calculateLevel = (xp: number): number => {
  let level = 1;
  let xpForNextLevel = getXPForLevel(level);
  
  while (xp >= xpForNextLevel) {
    level += 1;
    xpForNextLevel += getXPForLevel(level);
  }
  
  return level;
};

// Initial achievements
const initialAchievements: Achievement[] = [
  {
    id: 'first_topic',
    title: 'First Steps',
    description: 'Complete your first topic',
    icon: '🏆',
    requiredValue: 1,
    unlocked: false,
    progress: 0,
    category: 'topic',
  },
  {
    id: 'topic_master',
    title: 'Topic Master',
    description: 'Complete 5 topics',
    icon: '🎓',
    requiredValue: 5,
    unlocked: false,
    progress: 0,
    category: 'topic',
  },
  {
    id: 'problem_solver',
    title: 'Problem Solver',
    description: 'Solve 10 practice problems',
    icon: '🧩',
    requiredValue: 10,
    unlocked: false,
    progress: 0,
    category: 'problem',
  },
  {
    id: 'consistent_learner',
    title: 'Consistent Learner',
    description: 'Maintain a 7-day learning streak',
    icon: '🔥',
    requiredValue: 7,
    unlocked: false,
    progress: 0,
    category: 'streak',
  },
  {
    id: 'visualization_enthusiast',
    title: 'Visualization Enthusiast',
    description: 'Watch 15 algorithm visualizations',
    icon: '📊',
    requiredValue: 15,
    unlocked: false,
    progress: 0,
    category: 'visualization',
  },
];

export const GamificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [xp, setXP] = useState<number>(0);
  const [level, setLevel] = useState<number>(1);
  const [achievements, setAchievements] = useState<Achievement[]>(initialAchievements);
  const [streak, setStreak] = useState<{
    current: number;
    best: number;
    lastActivity: string | null;
  }>({
    current: 0,
    best: 0,
    lastActivity: null,
  });

  // Load saved data from localStorage
  useEffect(() => {
    const savedXP = localStorage.getItem('gamification_xp');
    const savedAchievements = localStorage.getItem('gamification_achievements');
    const savedStreak = localStorage.getItem('gamification_streak');
    
    if (savedXP) setXP(JSON.parse(savedXP));
    if (savedAchievements) setAchievements(JSON.parse(savedAchievements));
    if (savedStreak) setStreak(JSON.parse(savedStreak));
    
    // Check if streak needs to be reset
    checkStreak();
  }, []);

  // Update level when XP changes
  useEffect(() => {
    const newLevel = calculateLevel(xp);
    
    if (newLevel > level) {
      // Level up!
      toast.success(`🎉 Level Up! You're now level ${newLevel}`, {
        duration: 5000,
        icon: '🎖️',
      });
      
      // Launch confetti
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
    
    setLevel(newLevel);
    localStorage.setItem('gamification_xp', JSON.stringify(xp));
  }, [xp, level]);

  // Save achievements when they change
  useEffect(() => {
    localStorage.setItem('gamification_achievements', JSON.stringify(achievements));
  }, [achievements]);

  // Save streak when it changes
  useEffect(() => {
    localStorage.setItem('gamification_streak', JSON.stringify(streak));
  }, [streak]);

  // Check if streak needs to be reset
  const checkStreak = () => {
    if (!streak.lastActivity) return;
    
    const lastActivity = new Date(streak.lastActivity);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    // Reset streak if last activity was more than 1 day ago
    if (lastActivity < yesterday) {
      setStreak((prev) => ({
        ...prev,
        current: 0,
      }));
    }
  };

  const addXP = (amount: number, reason: string) => {
    setXP((prev) => prev + amount);
    toast.success(`+${amount} XP: ${reason}`, {
      duration: 3000,
      icon: '✨',
    });
  };

  const incrementStreak = () => {
    const today = new Date().toISOString().split('T')[0];
    const lastDay = streak.lastActivity?.split('T')[0];
    
    // Only increment if last activity was not today
    if (lastDay !== today) {
      setStreak((prev) => {
        const newCurrent = prev.current + 1;
        const newBest = Math.max(newCurrent, prev.best);
        
        // Show streak notification
        if (newCurrent > 1) {
          toast.success(`🔥 ${newCurrent} day streak!`, {
            duration: 3000,
          });
        }
        
        return {
          current: newCurrent,
          best: newBest,
          lastActivity: new Date().toISOString(),
        };
      });
    }
  };

  const trackActivity = (activityType: string, entityId: string) => {
    // Update relevant achievements
    setAchievements((prev) => {
      const updated = [...prev];
      
      // Find achievements related to this activity
      const relevantAchievements = updated.filter((achievement) => {
        if (activityType === 'topic_completed' && achievement.category === 'topic') return true;
        if (activityType === 'problem_solved' && achievement.category === 'problem') return true;
        if (activityType === 'visualization_watched' && achievement.category === 'visualization') return true;
        return false;
      });
      
      // Update progress for relevant achievements
      relevantAchievements.forEach((achievement) => {
        const idx = updated.findIndex((a) => a.id === achievement.id);
        if (idx !== -1 && !updated[idx].unlocked) {
          updated[idx] = {
            ...updated[idx],
            progress: updated[idx].progress + 1,
          };
          
          // Check if achievement should be unlocked
          if (updated[idx].progress >= updated[idx].requiredValue) {
            updated[idx].unlocked = true;
            
            // Celebrate achievement
            toast.success(`🏆 Achievement Unlocked: ${updated[idx].title}`, {
              duration: 5000,
              icon: updated[idx].icon,
            });
            
            // Award XP for achievement
            addXP(50, `Achievement: ${updated[idx].title}`);
            
            // Launch confetti
            confetti({
              particleCount: 100,
              spread: 70,
              origin: { y: 0.6 },
            });
          }
        }
      });
      
      return updated;
    });
    
    // Track for streak and add XP based on activity type
    incrementStreak();
    
    if (activityType === 'topic_completed') {
      addXP(100, 'Topic completed');
    } else if (activityType === 'subtopic_completed') {
      addXP(30, 'Subtopic completed');
    } else if (activityType === 'problem_solved') {
      addXP(50, 'Problem solved');
    } else if (activityType === 'visualization_watched') {
      addXP(20, 'Visualization watched');
    }
  };

  const getNextLevelXP = (): number => {
    return getXPForLevel(level);
  };

  const getLevelProgress = (): number => {
    const nextLevelXP = getNextLevelXP();
    const prevLevelXP = level === 1 ? 0 : getXPForLevel(level - 1);
    const levelXP = xp - prevLevelXP;
    const levelRange = nextLevelXP - prevLevelXP;
    
    return Math.floor((levelXP / levelRange) * 100);
  };

  return (
    <GamificationContext.Provider
      value={{
        xp,
        level,
        achievements,
        streak,
        addXP,
        incrementStreak,
        trackActivity,
        getNextLevelXP,
        getLevelProgress,
      }}
    >
      {children}
    </GamificationContext.Provider>
  );
};

export const useGamification = () => {
  const context = useContext(GamificationContext);
  if (!context) {
    throw new Error('useGamification must be used within a GamificationProvider');
  }
  return context;
};