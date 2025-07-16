import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Lock, ArrowRight, ZoomIn, ZoomOut, Move } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { topicsData } from '../data/topics';

// Current user data
const CURRENT_DATE = "2025-07-16 19:50:32";
const CURRENT_USER = "Daksha1107";

const LearningTree = ({ progress, getTopicStatus, getCompletionPercentage }) => {
  const navigate = useNavigate();
  const [treeNodes, setTreeNodes] = useState([]);
  const [treeEdges, setTreeEdges] = useState([]);
  const containerRef = useRef(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [maxDepth, setMaxDepth] = useState(0);
  
  // Calculate tree dimensions
  useEffect(() => {
    // Function to build the tree layout
    const buildTreeLayout = () => {
      // Create a map to track the depth of each node
      const nodeDepths = {};
      const nodeLevelPositions = {};
      
      // Find root nodes (those with no prerequisites)
      const rootNodes = topicsData.filter(topic => topic.prerequisites.length === 0);
      
      // Calculate depths for all nodes using BFS
      const calculateDepths = () => {
        // Initialize root nodes at depth 0
        rootNodes.forEach(node => {
          nodeDepths[node.id] = 0;
        });
        
        // Process each level, assigning depths to children
        let currentDepth = 0;
        let nodesToProcess = [...rootNodes];
        
        while (nodesToProcess.length > 0) {
          const nextLevel = [];
          
          // Process current level nodes
          nodesToProcess.forEach(node => {
            // Find children (nodes that have this node as a prerequisite)
            const children = topicsData.filter(t => 
              t.prerequisites.includes(node.id) && !nodeDepths.hasOwnProperty(t.id)
            );
            
            // Assign depth to children
            children.forEach(child => {
              nodeDepths[child.id] = currentDepth + 1;
              nextLevel.push(child);
            });
          });
          
          nodesToProcess = nextLevel;
          currentDepth++;
        }
      };
      
      calculateDepths();
      
      // Find maximum depth
      const calculatedMaxDepth = Math.max(...Object.values(nodeDepths));
      setMaxDepth(calculatedMaxDepth);
      
      // Group nodes by depth
      const nodesByDepth = {};
      Object.keys(nodeDepths).forEach(nodeId => {
        const depth = nodeDepths[nodeId];
        if (!nodesByDepth[depth]) {
          nodesByDepth[depth] = [];
        }
        const topic = topicsData.find(t => t.id === nodeId);
        if (topic) {
          nodesByDepth[depth].push(topic);
        }
      });
      
      // Calculate horizontal positions for each node at each level
      const calculateHorizontalPositions = () => {
        // For each depth level
        for (let depth = 0; depth <= calculatedMaxDepth; depth++) {
          const nodesAtDepth = nodesByDepth[depth] || [];
          const totalNodes = nodesAtDepth.length;
          
          // Calculate horizontal spacing
          nodesAtDepth.forEach((node, index) => {
            // Calculate position as percentage of width
            const horizontalPosition = totalNodes === 1 
              ? 50 // Center if only one node
              : 10 + (80 * index / (totalNodes > 1 ? totalNodes - 1 : 1)); // Distribute across 80% of width with 10% padding
            
            if (!nodeLevelPositions[depth]) {
              nodeLevelPositions[depth] = {};
            }
            
            nodeLevelPositions[depth][node.id] = horizontalPosition;
          });
        }
      };
      
      calculateHorizontalPositions();
      
      // Create positioned nodes
      const nodes = topicsData.map(topic => {
        const depth = nodeDepths[topic.id] || 0;
        const horizontalPos = nodeLevelPositions[depth]?.[topic.id] || 50;
        
        return {
          id: topic.id,
          topic,
          x: horizontalPos,
          y: 120 + (depth * 180), // Increased vertical spacing
          depth
        };
      });
      
      // Create edges between nodes
      const edges = [];
      topicsData.forEach(topic => {
        if (topic.prerequisites.length > 0) {
          topic.prerequisites.forEach(prereqId => {
            const sourceNode = nodes.find(n => n.id === prereqId);
            const targetNode = nodes.find(n => n.id === topic.id);
            
            if (sourceNode && targetNode) {
              edges.push({
                id: `${prereqId}-${topic.id}`,
                source: sourceNode,
                target: targetNode,
                sourceStatus: getTopicStatus(prereqId),
                targetStatus: getTopicStatus(topic.id)
              });
            }
          });
        }
      });
      
      setTreeNodes(nodes);
      setTreeEdges(edges);
    };
    
    buildTreeLayout();
  }, [progress, getTopicStatus]);
  
  // Calculate optimal container height based on tree depth
  const containerHeight = Math.max(600, (maxDepth + 1) * 200); // At least 600px or enough for tree
  
  // Handle zoom controls
  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 0.1, 1.5));
  };
  
  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 0.1, 0.5));
  };
  
  return (
    <div className="bg-white rounded-xl shadow-sm p-4 overflow-hidden">
      {/* Zoom controls */}
      <div className="flex justify-end mb-2 space-x-2">
        <button 
          onClick={handleZoomOut}
          className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
          aria-label="Zoom out"
        >
          <ZoomOut className="w-4 h-4 text-gray-700" />
        </button>
        <button 
          onClick={handleZoomIn}
          className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
          aria-label="Zoom in"
        >
          <ZoomIn className="w-4 h-4 text-gray-700" />
        </button>
        <span className="p-2 text-xs text-gray-500 flex items-center">
          <Move className="w-4 h-4 mr-1" />
          Scroll to navigate
        </span>
      </div>
      
      {/* Tree container with scroll */}
      <div 
        className="relative overflow-auto tree-container" 
        ref={containerRef}
        style={{ 
          height: '70vh', // Use viewport height for better scaling
          maxHeight: '800px' 
        }}
      >
        <div 
          className="relative" 
          style={{ 
            height: `${containerHeight}px`,
            width: '100%',
            transform: `scale(${zoomLevel})`,
            transformOrigin: 'top center',
            transition: 'transform 0.3s ease'
          }}
        >
          {/* Draw edges first (so they appear behind nodes) */}
          <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 0 }}>
            {treeEdges.map(edge => {
              // Calculate path
              const sourceX = `${edge.source.x}%`;
              const sourceY = edge.source.y;
              const targetX = `${edge.target.x}%`;
              const targetY = edge.target.y;
              
              // Control points for curved path
              const midY = (sourceY + targetY) / 2;
              
              // Line color based on completion status
              let lineColor = '#d1d5db'; // Default gray
              if (edge.sourceStatus === 'completed' && edge.targetStatus === 'completed') {
                lineColor = '#10b981'; // Green for completed path
              } else if (edge.sourceStatus === 'in-progress' || edge.targetStatus === 'in-progress') {
                lineColor = '#0070f3'; // Blue for in-progress
              } else if (edge.sourceStatus === 'available' || edge.targetStatus === 'available') {
                lineColor = '#8b5cf6'; // Purple for available
              }
              
              return (
                <motion.path 
                  key={edge.id}
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1, delay: 0.2 }}
                  d={`M ${sourceX} ${sourceY} C ${sourceX} ${midY}, ${targetX} ${midY}, ${targetX} ${targetY}`}
                  stroke={lineColor}
                  strokeWidth="2"
                  fill="none"
                  strokeDasharray={edge.targetStatus === 'locked' ? "5,5" : "none"}
                  className="tree-line"
                />
              );
            })}
          </svg>
          
          {/* Draw nodes on top of edges */}
          {treeNodes.map(node => {
            const status = getTopicStatus(node.id);
            const completionPercentage = getCompletionPercentage(node.id);
            
            return (
              <motion.div
                key={node.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: node.depth * 0.1 }}
                className={`absolute rounded-xl p-3 w-44 shadow-sm cursor-pointer border-2 tree-node ${
                  status === 'completed' 
                    ? 'bg-[#d1fae5] border-[#34d399] text-[#059669]' 
                    : status === 'in-progress' 
                      ? 'bg-[#dbeafe] border-[#0070f3] text-[#1d4ed8]'
                      : status === 'available'
                        ? 'bg-[#ede9fe] border-[#8b5cf6] text-[#6d28d9]'
                        : 'bg-gray-100 border-gray-200 text-gray-400'
                }`}
                style={{
                  top: `${node.y}px`,
                  left: `${node.x}%`,
                  transform: 'translate(-50%, -50%)',
                  zIndex: 10
                }}
                onClick={() => {
                  if (status !== 'locked') {
                    navigate(`/topic/${node.id}`);
                  }
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center mb-2">
                  <span className="text-2xl mr-2">{node.topic.icon}</span>
                  <h4 className="font-bold text-sm">{node.topic.title}</h4>
                </div>
                
                {status !== 'locked' && (
                  <div className="w-full bg-white bg-opacity-50 rounded-full h-1.5 overflow-hidden mt-2">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${completionPercentage}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className={`h-1.5 rounded-full ${
                        status === 'completed' 
                          ? 'bg-[#10b981]' 
                          : status === 'in-progress'
                            ? 'bg-[#0070f3]'
                            : 'bg-[#8b5cf6]'
                      }`}
                    />
                  </div>
                )}
                
                {status === 'locked' && (
                  <div className="flex justify-center mt-2">
                    <Lock className="w-4 h-4" />
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
      
      {/* Legend */}
      <div className="flex flex-wrap justify-center mt-4 gap-4 p-2 bg-gray-50 rounded-lg">
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-[#10b981] mr-2"></div>
          <span className="text-sm text-gray-600">Completed</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-[#0070f3] mr-2"></div>
          <span className="text-sm text-gray-600">In Progress</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-[#8b5cf6] mr-2"></div>
          <span className="text-sm text-gray-600">Available</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-gray-300 mr-2"></div>
          <span className="text-sm text-gray-600">Locked</span>
        </div>
      </div>
      
      {/* User info */}
      <div className="mt-4 text-center text-xs text-gray-500">
        <p>
          Current date: {CURRENT_DATE} | User: {CURRENT_USER}
        </p>
      </div>
    </div>
  );
};

export default LearningTree;