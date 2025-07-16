import React from 'react';
import { Play, Pause, SkipBack, SkipForward, RefreshCw } from 'lucide-react';

interface ExecutionControlsProps {
  isPlaying: boolean;
  currentStep: number;
  totalSteps: number;
  speed: number;
  onPlayPause: () => void;
  onStepForward: () => void;
  onStepBackward: () => void;
  onReset: () => void;
  onSpeedChange: (speed: number) => void;
}

const ExecutionControls: React.FC<ExecutionControlsProps> = ({
  isPlaying,
  currentStep,
  totalSteps,
  speed,
  onPlayPause,
  onStepForward,
  onStepBackward,
  onReset,
  onSpeedChange,
}) => {
  return (
    <div className="mt-6">
      <div className="flex items-center justify-between mb-2">
        <div className="text-sm text-gray-500">
          Step {currentStep + 1} of {totalSteps}
        </div>
        
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500">Speed:</span>
          <select
            value={speed}
            onChange={(e) => onSpeedChange(Number(e.target.value))}
            className="text-sm border border-gray-300 rounded-md py-1 px-2"
          >
            <option value="0.5">0.5x</option>
            <option value="1">1x</option>
            <option value="1.5">1.5x</option>
            <option value="2">2x</option>
          </select>
        </div>
      </div>
      
      <div className="flex justify-center space-x-4">
        <button
          onClick={onReset}
          className="p-2 rounded-full hover:bg-gray-200 transition-colors"
          title="Reset"
        >
          <RefreshCw className="w-5 h-5 text-gray-700" />
        </button>
        
        <button
          onClick={onStepBackward}
          disabled={currentStep === 0}
          className={`p-2 rounded-full hover:bg-gray-200 transition-colors ${
            currentStep === 0 ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          title="Step backward"
        >
          <SkipBack className="w-5 h-5 text-gray-700" />
        </button>
        
        <button
          onClick={onPlayPause}
          className="p-3 bg-indigo-600 rounded-full text-white hover:bg-indigo-700 transition-colors"
          title={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? (
            <Pause className="w-6 h-6" />
          ) : (
            <Play className="w-6 h-6" />
          )}
        </button>
        
        <button
          onClick={onStepForward}
          disabled={currentStep === totalSteps - 1}
          className={`p-2 rounded-full hover:bg-gray-200 transition-colors ${
            currentStep === totalSteps - 1 ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          title="Step forward"
        >
          <SkipForward className="w-5 h-5 text-gray-700" />
        </button>
      </div>
    </div>
  );
};

export default ExecutionControls;