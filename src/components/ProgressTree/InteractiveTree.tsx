import React, { useCallback, useEffect } from 'react';
import ReactFlow, {
  Node,
  Edge,
  NodeTypes,
  Background,
  Controls,
  ConnectionLineType,
  useNodesState,
  useEdgesState,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { useNavigate } from 'react-router-dom';
import { useProgress } from '../../context/ProgressContext';
import { topicsData } from '../../data/topics';
import TopicNode from './TopicNode';

const nodeTypes: NodeTypes = {
  topicNode: TopicNode,
};

const InteractiveTree: React.FC = () => {
  const navigate = useNavigate();
  const { topicProgress, isTopicAvailable, getCompletionPercentage } = useProgress();
  
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  
  // Create nodes and edges from topic data
  useEffect(() => {
    const layoutTopics = () => {
      // Define layout parameters
      const levelHeight = 150;
      const nodeWidth = 220;
      const nodeHeight = 120;
      
      // Group topics by level (based on prerequisites)
      const levels: Record<number, string[]> = {};
      
      // Find root topics (no prerequisites)
      const rootTopics = topicsData.filter(topic => topic.prerequisites.length === 0);
      levels[0] = rootTopics.map(topic => topic.id);
      
      // Assign levels to other topics based on prerequisites
      let currentLevel = 0;
      let allAssigned = false;
      
      while (!allAssigned) {
        allAssigned = true;
        const nextLevelTopics: string[] = [];
        
        // Find topics that have all prerequisites in previous levels
        topicsData.forEach(topic => {
          // Skip if already assigned to a level
          if (Object.values(levels).flat().includes(topic.id)) {
            return;
          }
          
          // Check if all prerequisites are in previous levels
          const allPrereqsAssigned = topic.prerequisites.every(prereqId =>
            Object.values(levels).flat().includes(prereqId)
          );
          
          if (allPrereqsAssigned) {
            nextLevelTopics.push(topic.id);
            allAssigned = false;
          }
        });
        
        if (nextLevelTopics.length > 0) {
          currentLevel++;
          levels[currentLevel] = nextLevelTopics;
        } else if (!allAssigned) {
          // Handle circular dependencies by adding remaining topics
          const remainingTopics = topicsData
            .filter(topic => !Object.values(levels).flat().includes(topic.id))
            .map(topic => topic.id);
          
          if (remainingTopics.length > 0) {
            currentLevel++;
            levels[currentLevel] = remainingTopics;
            allAssigned = true;
          }
        }
      }
      
      // Create nodes
      const newNodes: Node[] = [];
      
      Object.entries(levels).forEach(([levelStr, topicIds]) => {
        const level = parseInt(levelStr);
        const levelWidth = topicIds.length * nodeWidth;
        const startX = -(levelWidth / 2) + (nodeWidth / 2);
        
        topicIds.forEach((topicId, index) => {
          const topic = topicsData.find(t => t.id === topicId);
          if (!topic) return;
          
          const status = topicProgress[topicId]?.status || 'locked';
          const isAvailable = isTopicAvailable(topicId);
          const completionPercentage = getCompletionPercentage(topicId);
          
          newNodes.push({
            id: topicId,
            type: 'topicNode',
            position: {
              x: startX + (index * nodeWidth),
              y: level * levelHeight,
            },
            data: {
              id: topicId,
              title: topic.title,
              icon: topic.icon,
              color: topic.color,
              status: isAvailable ? (status === 'locked' ? 'available' : status) : 'locked',
              completionPercentage,
              subtopicCount: topic.subtopics.length,
              problemCount: topic.problems.length,
              estimatedHours: topic.estimatedHours,
            },
          });
        });
      });
      
      // Create edges
      const newEdges: Edge[] = [];
      
      topicsData.forEach(topic => {
        topic.prerequisites.forEach(prereqId => {
          newEdges.push({
            id: `${prereqId}-${topic.id}`,
            source: prereqId,
            target: topic.id,
            type: 'smoothstep',
            animated: topicProgress[prereqId]?.status === 'completed',
            style: { stroke: '#94a3b8', strokeWidth: 2 },
          });
        });
      });
      
      setNodes(newNodes);
      setEdges(newEdges);
    };
    
    layoutTopics();
  }, [topicProgress, isTopicAvailable, getCompletionPercentage, setNodes, setEdges]);
  
  // Handle node click
  const onNodeClick = useCallback((event: React.MouseEvent, node: Node) => {
    const topicId = node.id;
    const status = node.data.status;
    
    // Only navigate if the topic is available or already in progress
    if (status === 'available' || status === 'in-progress' || status === 'completed') {
      navigate(`/topic/${topicId}`);
    }
  }, [navigate]);
  
  return (
    <div className="w-full h-[600px] border border-gray-200 rounded-xl overflow-hidden bg-white">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={onNodeClick}
        nodeTypes={nodeTypes}
        connectionLineType={ConnectionLineType.SmoothStep}
        fitView
        attributionPosition="bottom-right"
      >
        <Background color="#f1f5f9" gap={16} size={1} />
        <Controls />
      </ReactFlow>
    </div>
  );
};

export default InteractiveTree;