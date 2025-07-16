import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, SkipBack, SkipForward, ChevronRight, Clock, Code } from 'lucide-react';
import { useGamification } from '../../context/GamificationContext';
import CodePanel from './CodePanel';
import ExecutionControls from './ExecutionControls';

interface VisualizerProps {
  algorithmId: string;
  code: string;
  initialData?: any[];
}

const AlgorithmVisualizer: React.FC<VisualizerProps> = ({ algorithmId, code, initialData = [] }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [currentStep, setCurrentStep] = useState(0);
  const [visualizationSteps, setVisualizationSteps] = useState<any[]>([]);
  const [data, setData] = useState(initialData);
  const [highlightedLine, setHighlightedLine] = useState<number | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const { trackActivity } = useGamification();
  
  // Initialize visualization steps based on algorithm
  useEffect(() => {
    // This would be replaced with actual algorithm-specific logic
    const generateSteps = () => {
      // For this example, let's create some dummy steps for array traversal
      if (algorithmId === 'array-traversal') {
        const steps = [];
        const sampleArray = initialData.length > 0 ? initialData : [5, 2, 8, 1, 9, 3];
        
        // Initial state
        steps.push({
          data: [...sampleArray],
          currentIndex: -1,
          description: 'Initialize traversal at the beginning of the array',
          lineNumber: 1,
        });
        
        // Steps for each array element
        for (let i = 0; i < sampleArray.length; i++) {
          steps.push({
            data: [...sampleArray],
            currentIndex: i,
            description: `Visiting element at index ${i}: ${sampleArray[i]}`,
            lineNumber: 2,
          });
        }
        
        // Final state
        steps.push({
          data: [...sampleArray],
          currentIndex: sampleArray.length,
          description: 'Traversal complete',
          lineNumber: 4,
        });
        
        return steps;
      }
      
      return [];
    };
    
    const steps = generateSteps();
    setVisualizationSteps(steps);
    setCurrentStep(0);
    setData(initialData.length > 0 ? initialData : (steps[0]?.data || []));
    setHighlightedLine(steps[0]?.lineNumber || null);
  }, [algorithmId, initialData]);
  
  // Animation loop
  useEffect(() => {
    if (!isPlaying) {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
      return;
    }
    
    let lastTime = 0;
    const delay = 1000 / speed;
    
    const animate = (time: number) => {
      if (!lastTime || time - lastTime >= delay) {
        if (currentStep < visualizationSteps.length - 1) {
          setCurrentStep((prev) => prev + 1);
          lastTime = time;
        } else {
          setIsPlaying(false);
          // Track that the user has watched a full visualization
          trackActivity('visualization_watched', algorithmId);
          return;
        }
      }
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animationRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
    };
  }, [isPlaying, currentStep, visualizationSteps.length, speed, algorithmId, trackActivity]);
  
  // Update the current state based on the current step
  useEffect(() => {
    if (visualizationSteps.length === 0 || currentStep >= visualizationSteps.length) {
      return;
    }
    
    const step = visualizationSteps[currentStep];
    setData(step.data);
    setHighlightedLine(step.lineNumber);
    
    // Draw the current state on the canvas
    drawState(step);
  }, [currentStep, visualizationSteps]);
  
  // Draw the current state on the canvas
  const drawState = (step: any) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw array
    const elementWidth = 50;
    const elementHeight = 50;
    const startX = (canvas.width - (step.data.length * elementWidth)) / 2;
    const startY = canvas.height / 2 - elementHeight / 2;
    
    // Draw array elements
    step.data.forEach((value: any, index: number) => {
      const x = startX + (index * elementWidth);
      const y = startY;
      
      // Draw rectangle
      ctx.fillStyle = index === step.currentIndex ? '#4f46e5' : '#f1f5f9';
      ctx.strokeStyle = '#94a3b8';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.rect(x, y, elementWidth, elementHeight);
      ctx.fill();
      ctx.stroke();
      
      // Draw value
      ctx.fillStyle = index === step.currentIndex ? '#ffffff' : '#1e293b';
      ctx.font = '16px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(value.toString(), x + elementWidth / 2, y + elementHeight / 2);
      
      // Draw index
      ctx.fillStyle = '#64748b';
      ctx.font = '12px Arial';
      ctx.fillText(index.toString(), x + elementWidth / 2, y + elementHeight + 15);
    });
    
    // Draw pointer for current index
    if (step.currentIndex >= 0 && step.currentIndex < step.data.length) {
      const pointerX = startX + (step.currentIndex * elementWidth) + elementWidth / 2;
      const pointerY = startY - 20;
      
      ctx.fillStyle = '#4f46e5';
      ctx.beginPath();
      ctx.moveTo(pointerX, pointerY);
      ctx.lineTo(pointerX - 10, pointerY - 10);
      ctx.lineTo(pointerX + 10, pointerY - 10);
      ctx.closePath();
      ctx.fill();
    }
  };
  
  // Handle play/pause
  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };
  
  // Handle step forward
  const stepForward = () => {
    if (currentStep < visualizationSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };
  
  // Handle step backward
  const stepBackward = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  // Handle reset
  const reset = () => {
    setIsPlaying(false);
    setCurrentStep(0);
  };
  
  // Handle speed change
  const handleSpeedChange = (newSpeed: number) => {
    setSpeed(newSpeed);
  };
  
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
      <h2 className="text-2xl font-bold mb-4">Algorithm Visualization</h2>
      
      <div className="flex space-x-6">
        <div className="w-2/3">
          <div className="bg-gray-50 rounded-lg p-4 mb-4">
            <h3 className="text-lg font-medium mb-2 flex items-center">
              <Clock className="w-5 h-5 mr-2" />
              Visualization
            </h3>
            
            <div className="relative">
              <canvas
                ref={canvasRef}
                width={600}
                height={300}
                className="w-full border border-gray-200 rounded-lg bg-white"
              />
              
              {visualizationSteps.length > 0 && currentStep < visualizationSteps.length && (
                <div className="mt-4 text-center text-gray-700">
                  <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {visualizationSteps[currentStep].description}
                  </motion.div>
                </div>
              )}
            </div>
            
            <ExecutionControls
              isPlaying={isPlaying}
              currentStep={currentStep}
              totalSteps={visualizationSteps.length}
              speed={speed}
              onPlayPause={togglePlayPause}
              onStepForward={stepForward}
              onStepBackward={stepBackward}
              onReset={reset}
              onSpeedChange={handleSpeedChange}
            />
          </div>
        </div>
        
        <div className="w-1/3">
          <div className="bg-gray-50 rounded-lg p-4 h-full">
            <h3 className="text-lg font-medium mb-2 flex items-center">
              <Code className="w-5 h-5 mr-2" />
              Code
            </h3>
            
            <CodePanel code={code} highlightedLine={highlightedLine} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlgorithmVisualizer;