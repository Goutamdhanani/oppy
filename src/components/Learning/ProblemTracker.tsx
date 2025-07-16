import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Check, Clock, Star, StarHalf } from 'lucide-react';
import { useProgress } from '../../context/ProgressContext';
import { useGamification } from '../../context/GamificationContext';
import { Problem } from '../../data/topics';

interface ProblemTrackerProps {
  topicId: string;
  problems: Problem[];
}

const ProblemTracker: React.FC<ProblemTrackerProps> = ({ topicId, problems }) => {
  const { topicProgress, completeProblem } = useProgress();
  const { trackActivity } = useGamification();
  
  const isProblemCompleted = (problemId: string) => {
    return topicProgress[topicId]?.completedProblems.includes(problemId);
  };
  
  const handleMarkCompleted = (problem: Problem) => {
    if (!isProblemCompleted(problem.id)) {
      completeProblem(topicId, problem.id);
      trackActivity('problem_solved', problem.id);
    }
  };
  
  const getDifficultyIcon = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return <Star className="w-4 h-4 text-green-500" />;
      case 'medium':
        return <StarHalf className="w-4 h-4 text-yellow-500" />;
      case 'hard':
        return <Star className="w-4 h-4 text-red-500" />;
      default:
        return null;
    }
  };
  
  const getDifficultyText = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return 'Easy';
      case 'medium':
        return 'Medium';
      case 'hard':
        return 'Hard';
      default:
        return '';
    }
  };
  
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return 'text-green-600 bg-green-50';
      case 'medium':
        return 'text-yellow-600 bg-yellow-50';
      case 'hard':
        return 'text-red-600 bg-red-50';
      default:
        return '';
    }
  };
  
  return (
    <div>
      <h2 className="text-xl font-bold mb-6">Practice Problems</h2>
      
      <div className="space-y-4">
        {problems.map((problem) => (
          <motion.div
            key={problem.id}
            className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
            whileHover={{ y: -2 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-medium text-lg flex items-center">
                  {problem.title}
                  <span className={`ml-3 text-xs px-2 py-1 rounded-full ${getDifficultyColor(problem.difficulty)}`}>
                    {getDifficultyText(problem.difficulty)}
                  </span>
                </h3>
                <p className="text-gray-600 text-sm mt-1">
                  {problem.description}
                </p>
              </div>
              
              <div className="flex items-center">
                {isProblemCompleted(problem.id) ? (
                  <span className="flex items-center text-green-600 text-sm font-medium">
                    <Check className="w-4 h-4 mr-1" />
                    Completed
                  </span>
                ) : (
                  <button
                    onClick={() => handleMarkCompleted(problem)}
                    className="text-sm text-indigo-600 hover:text-indigo-800 font-medium flex items-center mr-4"
                  >
                    <Check className="w-4 h-4 mr-1" />
                    Mark as Completed
                  </button>
                )}
                
                {problem.externalUrl && (
                  <a
                    href={problem.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-md text-sm flex items-center transition-colors"
                  >
                    <ExternalLink className="w-3 h-3 mr-1" />
                    Solve
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      <div className="mt-8 pt-6 border-t border-gray-200">
        <h3 className="font-medium mb-3">Completion Status</h3>
        <div className="flex justify-between text-sm mb-1">
          <span>Problems Solved</span>
          <span>
            {topicProgress[topicId]?.completedProblems.length || 0} /{' '}
            {problems.length}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="h-2 rounded-full bg-indigo-600"
            style={{
              width: `${
                ((topicProgress[topicId]?.completedProblems.length || 0) /
                  problems.length) *
                100
              }%`,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ProblemTracker;