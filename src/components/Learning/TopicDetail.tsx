import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Book, Code, Monitor, Lock, CheckCircle, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';
import { useProgress } from '../../context/ProgressContext';
import { topicsData, Subtopic } from '../../data/topics';
import SubtopicView from './SubtopicView';
import ProblemTracker from './ProblemTracker';
import XPBar from '../Gamification/XPBar';

const TopicDetail: React.FC = () => {
  const { topicId, subtopicId } = useParams<{ topicId: string; subtopicId?: string }>();
  const navigate = useNavigate();
  const { topicProgress, updateTopicStatus, completeSubtopic, isTopicAvailable } = useProgress();
  
  const [topic, setTopic] = useState<any>(null);
  const [selectedSubtopic, setSelectedSubtopic] = useState<Subtopic | null>(null);
  const [activeTab, setActiveTab] = useState<'content' | 'problems'>('content');
  
  useEffect(() => {
    if (topicId) {
      const foundTopic = topicsData.find((t) => t.id === topicId);
      
      if (foundTopic) {
        setTopic(foundTopic);
        
        // If topic is locked and not available, redirect back
        if (
          topicProgress[topicId]?.status === 'locked' &&
          !isTopicAvailable(topicId)
        ) {
          navigate('/');
          return;
        }
        
        // Mark as in-progress if it was available
        if (topicProgress[topicId]?.status === 'available') {
          updateTopicStatus(topicId, 'in-progress');
        }
        
        // Find selected subtopic
        if (subtopicId) {
          const foundSubtopic = foundTopic.subtopics.find(
            (s: Subtopic) => s.id === subtopicId
          );
          
          if (foundSubtopic) {
            setSelectedSubtopic(foundSubtopic);
          } else {
            // Default to first subtopic if not found
            setSelectedSubtopic(foundTopic.subtopics[0]);
          }
        } else {
          // Default to first subtopic
          setSelectedSubtopic(foundTopic.subtopics[0]);
        }
      }
    }
  }, [topicId, subtopicId, topicProgress, isTopicAvailable, navigate, updateTopicStatus]);
  
  const handleSubtopicSelect = (subtopic: Subtopic) => {
    setSelectedSubtopic(subtopic);
    navigate(`/topic/${topicId}/${subtopic.id}`);
  };
  
  const handleSubtopicComplete = () => {
    if (topicId && selectedSubtopic) {
      completeSubtopic(topicId, selectedSubtopic.id);
      
      // Check if all subtopics are completed to mark topic as completed
      const allSubtopicsCompleted = topic.subtopics.every((subtopic: Subtopic) =>
        topicProgress[topicId]?.completedSubtopics.includes(subtopic.id)
      );
      
      if (allSubtopicsCompleted) {
        updateTopicStatus(topicId, 'completed');
      }
      
      // Navigate to the next subtopic if available
      const currentIndex = topic.subtopics.findIndex(
        (s: Subtopic) => s.id === selectedSubtopic.id
      );
      
      if (currentIndex < topic.subtopics.length - 1) {
        const nextSubtopic = topic.subtopics[currentIndex + 1];
        handleSubtopicSelect(nextSubtopic);
      } else {
        // Move to problems tab if all subtopics are completed
        setActiveTab('problems');
      }
    }
  };
  
  if (!topic || !selectedSubtopic) {
    return <div className="text-center py-8">Loading...</div>;
  }
  
  const isSubtopicCompleted = (subtopicId: string) => {
    return topicProgress[topicId]?.completedSubtopics.includes(subtopicId);
  };
  
  return (
    <div>
      <div className="flex items-center mb-8">
        <button
          onClick={() => navigate('/')}
          className="flex items-center text-gray-600 hover:text-gray-900"
        >
          <ChevronLeft className="w-5 h-5 mr-1" />
          Back to Learning Tree
        </button>
      </div>
      
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold flex items-center">
            <span className="mr-3">{topic.icon}</span>
            {topic.title}
          </h1>
          <p className="text-gray-600 mt-1">{topic.description}</p>
        </div>
        
        <div className="w-64">
          <XPBar />
        </div>
      </div>
      
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-3">
          <div className="bg-white rounded-xl shadow-sm p-4">
            <h2 className="text-lg font-medium mb-3">Subtopics</h2>
            
            <div className="space-y-2">
              {topic.subtopics.map((subtopic: Subtopic, index: number) => (
                <button
                  key={subtopic.id}
                  onClick={() => handleSubtopicSelect(subtopic)}
                  className={`w-full text-left px-3 py-2 rounded-lg flex items-center ${
                    selectedSubtopic.id === subtopic.id
                      ? 'bg-indigo-50 text-indigo-700'
                      : 'hover:bg-gray-50'
                  }`}
                >
                  <div className="flex-shrink-0 mr-2">
                    {isSubtopicCompleted(subtopic.id) ? (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    ) : (
                      <div className="w-5 h-5 rounded-full bg-gray-200 text-xs flex items-center justify-center text-gray-700">
                        {index + 1}
                      </div>
                    )}
                  </div>
                  <div>
                    <div className="font-medium">{subtopic.title}</div>
                    <div className="text-xs text-gray-500 truncate">
                      {subtopic.description}
                    </div>
                  </div>
                </button>
              ))}
            </div>
            
            <div className="mt-4 pt-4 border-t border-gray-100">
              <h2 className="text-lg font-medium mb-3">Progress</h2>
              <div className="flex justify-between text-sm mb-1">
                <span>Completed</span>
                <span>
                  {topicProgress[topicId]?.completedSubtopics.length || 0} /{' '}
                  {topic.subtopics.length}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                <div
                  className="h-2 rounded-full"
                  style={{
                    width: `${
                      ((topicProgress[topicId]?.completedSubtopics.length || 0) /
                        topic.subtopics.length) *
                      100
                    }%`,
                    backgroundColor: topic.color,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        
        <div className="col-span-9">
          <div className="bg-white rounded-xl shadow-sm mb-6">
            <div className="border-b border-gray-200">
              <nav className="flex">
                <button
                  onClick={() => setActiveTab('content')}
                  className={`px-6 py-4 text-sm font-medium flex items-center ${
                    activeTab === 'content'
                      ? 'border-b-2 border-indigo-500 text-indigo-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <BookOpen className="w-4 h-4 mr-2" />
                  Content
                </button>
                <button
                  onClick={() => setActiveTab('problems')}
                  className={`px-6 py-4 text-sm font-medium flex items-center ${
                    activeTab === 'problems'
                      ? 'border-b-2 border-indigo-500 text-indigo-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <Code className="w-4 h-4 mr-2" />
                  Practice Problems
                </button>
              </nav>
            </div>
            
            <div className="p-6">
              {activeTab === 'content' ? (
                <SubtopicView
                  subtopic={selectedSubtopic}
                  isCompleted={isSubtopicCompleted(selectedSubtopic.id)}
                  onComplete={handleSubtopicComplete}
                  topicColor={topic.color}
                />
              ) : (
                <ProblemTracker 
                  topicId={topicId} 
                  problems={topic.problems} 
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopicDetail;