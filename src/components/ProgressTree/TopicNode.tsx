import React from 'react';
import { NodeProps, Handle, Position } from 'reactflow';
import { motion } from 'framer-motion';
import { LockIcon, CheckIcon, BookOpenIcon } from 'lucide-react';

interface TopicNodeData {
  id: string;
  title: string;
  icon: string;
  color: string;
  status: 'locked' | 'available' | 'in-progress' | 'completed';
  completionPercentage: number;
  subtopicCount: number;
  problemCount: number;
  estimatedHours: number;
}

const TopicNode: React.FC<NodeProps<TopicNodeData>> = ({ data }) => {
  const { id, title, icon, color, status, completionPercentage, subtopicCount, problemCount, estimatedHours } = data;
  
  // Define styles based on status
  const getNodeStyles = () => {
    switch (status) {
      case 'locked':
        return {
          background: '#f1f5f9',
          border: '2px solid #cbd5e1',
          color: '#94a3b8',
          cursor: 'not-allowed',
        };
      case 'available':
        return {
          background: 'white',
          border: `2px solid ${color}`,
          color: '#1e293b',
          cursor: 'pointer',
        };
      case 'in-progress':
        return {
          background: 'white',
          border: `2px solid ${color}`,
          color: '#1e293b',
          boxShadow: `0 0 10px ${color}`,
          cursor: 'pointer',
        };
      case 'completed':
        return {
          background: `${color}10`,
          border: `2px solid ${color}`,
          color: '#1e293b',
          cursor: 'pointer',
        };
      default:
        return {
          background: 'white',
          border: '2px solid #cbd5e1',
          color: '#1e293b',
        };
    }
  };
  
  // Get the appropriate icon based on status
  const getStatusIcon = () => {
    switch (status) {
      case 'locked':
        return <LockIcon className="w-5 h-5 text-gray-400" />;
      case 'in-progress':
        return <BookOpenIcon className="w-5 h-5 text-blue-500" />;
      case 'completed':
        return <CheckIcon className="w-5 h-5 text-green-500" />;
      default:
        return null;
    }
  };
  
  // Animation variants for the node
  const nodeVariants = {
    locked: { scale: 1, opacity: 0.7 },
    available: { scale: 1, opacity: 1 },
    'in-progress': { 
      scale: [1, 1.02, 1],
      transition: { 
        repeat: Infinity,
        repeatType: 'reverse' as const,
        duration: 2
      }
    },
    completed: { scale: 1, opacity: 1 },
  };
  
  return (
    <>
      <Handle type="target" position={Position.Top} />
      
      <motion.div
        className="p-3 rounded-lg w-52"
        style={getNodeStyles()}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={status}
        variants={nodeVariants}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center">
            <span className="text-xl mr-2">{icon}</span>
            <h3 className="font-bold text-sm">{title}</h3>
          </div>
          <div>{getStatusIcon()}</div>
        </div>
        
        {status !== 'locked' && (
          <>
            <div className="mb-2">
              <div className="flex justify-between text-xs mb-1">
                <span>Progress</span>
                <span>{completionPercentage}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1.5">
                <motion.div
                  className="h-1.5 rounded-full"
                  style={{ backgroundColor: color }}
                  initial={{ width: '0%' }}
                  animate={{ width: `${completionPercentage}%` }}
                  transition={{ duration: 1, delay: 0.2 }}
                />
              </div>
            </div>
            
            <div className="flex justify-between text-xs text-gray-500">
              <div>{subtopicCount} lessons</div>
              <div>{problemCount} problems</div>
              <div>~{estimatedHours} hrs</div>
            </div>
          </>
        )}
      </motion.div>
      
      <Handle type="source" position={Position.Bottom} />
    </>
  );
};

export default TopicNode;