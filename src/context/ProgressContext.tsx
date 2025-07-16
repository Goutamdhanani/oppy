import React, { createContext, useState, useEffect, useContext } from 'react';
import { topicsData } from '../data/topics';

type TopicStatus = 'locked' | 'available' | 'in-progress' | 'completed';

interface TopicProgress {
  id: string;
  status: TopicStatus;
  completedSubtopics: string[];
  completedProblems: string[];
  lastAccessed: string | null;
}

interface ProgressContextType {
  topicProgress: Record<string, TopicProgress>;
  updateTopicStatus: (topicId: string, status: TopicStatus) => void;
  completeSubtopic: (topicId: string, subtopicId: string) => void;
  completeProblem: (topicId: string, problemId: string) => void;
  isTopicAvailable: (topicId: string) => boolean;
  getCompletionPercentage: (topicId: string) => number;
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export const ProgressProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [topicProgress, setTopicProgress] = useState<Record<string, TopicProgress>>({});

  // Initialize progress from localStorage or with default values
  useEffect(() => {
    const savedProgress = localStorage.getItem('topicProgress');
    
    if (savedProgress) {
      setTopicProgress(JSON.parse(savedProgress));
    } else {
      // Initialize with default values
      const initialProgress: Record<string, TopicProgress> = {};
      
      topicsData.forEach((topic) => {
        initialProgress[topic.id] = {
          id: topic.id,
          status: topic.prerequisites.length === 0 ? 'available' : 'locked',
          completedSubtopics: [],
          completedProblems: [],
          lastAccessed: null,
        };
      });
      
      setTopicProgress(initialProgress);
    }
  }, []);

  // Save progress to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('topicProgress', JSON.stringify(topicProgress));
  }, [topicProgress]);

  const updateTopicStatus = (topicId: string, status: TopicStatus) => {
    setTopicProgress((prev) => ({
      ...prev,
      [topicId]: {
        ...prev[topicId],
        status,
        lastAccessed: new Date().toISOString(),
      },
    }));
  };

  const completeSubtopic = (topicId: string, subtopicId: string) => {
    setTopicProgress((prev) => {
      const topic = prev[topicId];
      const updatedSubtopics = topic.completedSubtopics.includes(subtopicId)
        ? topic.completedSubtopics
        : [...topic.completedSubtopics, subtopicId];
      
      return {
        ...prev,
        [topicId]: {
          ...topic,
          completedSubtopics: updatedSubtopics,
          status: 'in-progress',
          lastAccessed: new Date().toISOString(),
        },
      };
    });
  };

  const completeProblem = (topicId: string, problemId: string) => {
    setTopicProgress((prev) => {
      const topic = prev[topicId];
      const updatedProblems = topic.completedProblems.includes(problemId)
        ? topic.completedProblems
        : [...topic.completedProblems, problemId];
      
      return {
        ...prev,
        [topicId]: {
          ...topic,
          completedProblems: updatedProblems,
          lastAccessed: new Date().toISOString(),
        },
      };
    });
  };

  const isTopicAvailable = (topicId: string): boolean => {
    const topic = topicsData.find((t) => t.id === topicId);
    
    if (!topic) return false;
    if (topic.prerequisites.length === 0) return true;
    
    return topic.prerequisites.every((prereqId) => 
      topicProgress[prereqId]?.status === 'completed'
    );
  };

  const getCompletionPercentage = (topicId: string): number => {
    const topic = topicsData.find((t) => t.id === topicId);
    const progress = topicProgress[topicId];
    
    if (!topic || !progress) return 0;
    
    const totalSubtopics = topic.subtopics.length;
    const completedSubtopics = progress.completedSubtopics.length;
    
    return Math.round((completedSubtopics / totalSubtopics) * 100);
  };

  return (
    <ProgressContext.Provider
      value={{
        topicProgress,
        updateTopicStatus,
        completeSubtopic,
        completeProblem,
        isTopicAvailable,
        getCompletionPercentage,
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
};

export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
};