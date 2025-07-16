import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { 
  ChevronLeft, 
  Code, 
  PlayCircle, 
  PauseCircle, 
  RotateCcw, 
  FastForward, 
  Clock, 
  ChevronDown, 
  Book, 
  Info, 
  Award, 
  Settings, 
  Copy, 
  CheckCircle, 
  Edit,
  ChevronRight,
  SkipBack,
  SkipForward,
  Menu,
  X,
  Monitor,
  Sun,
  Moon,
  Zap,
  Palette,
  Lock,
  Sparkles,
  Eye
} from 'lucide-react';
import { algorithmsData } from '../data/algorithms';

// Current date and user data as specified
const CURRENT_DATE = "2025-07-16 20:27:39";
const CURRENT_USER = "Daksha1107";

// Step interface for algorithm visualization
interface Step {
  arrayState: number[];
  current: number | null;
  comparison: number[]; // indices
  swap: boolean;
  sorted: number[]; // indices finalized
  description: string;
}

// Visualization type
type VisualizationType = 'bars' | 'array' | 'circle';

// Theme type
type ThemeType = 'light' | 'dark' | 'neon' | 'cyberpunk';

const AlgorithmVisualizer: React.FC = () => {
  const { algorithmId } = useParams<{ algorithmId: string }>();
  const navigate = useNavigate();
  const [algorithm, setAlgorithm] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'visualization' | 'code' | 'explanation'>('visualization');
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [currentStep, setCurrentStep] = useState(0);
  const [inputData, setInputData] = useState<number[]>([5, 2, 8, 1, 9, 3]);
  const [showSettings, setShowSettings] = useState(false);
  const [codeCopied, setCodeCopied] = useState(false);
  const [showExpertTips, setShowExpertTips] = useState(false);
  const [editingInput, setEditingInput] = useState(false);
  const [inputValue, setInputValue] = useState('5, 2, 8, 1, 9, 3');
  const [visualizationType, setVisualizationType] = useState<VisualizationType>('bars');
  const [theme, setTheme] = useState<ThemeType>('light');
  const [showDirectorTip, setShowDirectorTip] = useState(false);
  
  const visualizationRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  
  // Convert input data to steps (simplified version)
  const generateSteps = (array: number[]): Step[] => {
    const steps: Step[] = [];
    
    // Initial state
    steps.push({
      arrayState: [...array],
      current: null,
      comparison: [],
      swap: false,
      sorted: [],
      description: "Initial array"
    });
    
    // Bubble sort algorithm (simplified for demonstration)
    const n = array.length;
    const arr = [...array];
    
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        // Add comparison step
        steps.push({
          arrayState: [...arr],
          current: j,
          comparison: [j, j + 1],
          swap: false,
          sorted: Array.from({ length: i }, (_, idx) => n - 1 - idx),
          description: `Comparing elements at indices ${j} and ${j + 1}: ${arr[j]} and ${arr[j + 1]}`
        });
        
        // If swap needed
        if (arr[j] > arr[j + 1]) {
          steps.push({
            arrayState: [...arr],
            current: j,
            comparison: [j, j + 1],
            swap: true,
            sorted: Array.from({ length: i }, (_, idx) => n - 1 - idx),
            description: `Swapping elements at indices ${j} and ${j + 1}: ${arr[j]} and ${arr[j + 1]}`
          });
          
          // Perform swap
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          
          // Add post-swap step
          steps.push({
            arrayState: [...arr],
            current: j + 1,
            comparison: [],
            swap: false,
            sorted: Array.from({ length: i }, (_, idx) => n - 1 - idx),
            description: `Array after swapping elements at indices ${j} and ${j + 1}`
          });
        }
      }
      
      // Add step after completing a pass
      steps.push({
        arrayState: [...arr],
        current: null,
        comparison: [],
        swap: false,
        sorted: Array.from({ length: i + 1 }, (_, idx) => n - 1 - idx),
        description: `Completed pass ${i + 1}. Element at index ${n - 1 - i} is now sorted.`
      });
    }
    
    // Final sorted state
    steps.push({
      arrayState: [...arr],
      current: null,
      comparison: [],
      swap: false,
      sorted: Array.from({ length: n }, (_, idx) => idx),
      description: "Array is now fully sorted!"
    });
    
    return steps;
  };
  
  // Generate visualization steps based on input data
  const [visualizationSteps, setVisualizationSteps] = useState<Step[]>([]);
  
  useEffect(() => {
    const steps = generateSteps(inputData);
    setVisualizationSteps(steps);
    setCurrentStep(0);
  }, [inputData]);
  
  // Get current step data
  const currentStepData: Step = visualizationSteps[currentStep] || {
    arrayState: [],
    current: null,
    comparison: [],
    swap: false,
    sorted: [],
    description: ""
  };
  
  // Check for key moments to show director tips
  useEffect(() => {
    if (currentStepData.swap) {
      setShowDirectorTip(true);
      const timer = setTimeout(() => setShowDirectorTip(false), 4000);
      return () => clearTimeout(timer);
    }
    
    if (currentStepData.sorted.length > 0 && 
        (visualizationSteps[currentStep-1]?.sorted.length || 0) < currentStepData.sorted.length) {
      setShowDirectorTip(true);
      const timer = setTimeout(() => setShowDirectorTip(false), 4000);
      return () => clearTimeout(timer);
    }
  }, [currentStep, currentStepData, visualizationSteps]);
  
  // Animation for each step
  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (isPlaying && currentStep < visualizationSteps.length - 1) {
      // Speed determines delay: 1 = 1000ms, 2 = 500ms, 3 = 250ms
      const delay = 1000 / speed;
      timer = setTimeout(() => {
        setCurrentStep(prev => prev + 1);
      }, delay);
    } else if (currentStep >= visualizationSteps.length - 1) {
      setIsPlaying(false);
    }
    
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isPlaying, currentStep, speed, visualizationSteps.length]);
  
  useEffect(() => {
    if (algorithmId) {
      // Simulate loading
      setLoading(true);
      
      setTimeout(() => {
        const foundAlgorithm = algorithmsData.find((a) => a.id === algorithmId);
        if (foundAlgorithm) {
          setAlgorithm(foundAlgorithm);
        } else {
          navigate('/');
        }
        setLoading(false);
      }, 800);
    }
  }, [algorithmId, navigate]);
  
  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };
  
  const handleReset = () => {
    setCurrentStep(0);
    setIsPlaying(false);
  };
  
  const handleNextStep = () => {
    if (currentStep < visualizationSteps.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };
  
  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };
  
  const handleSpeedChange = (newSpeed: number) => {
    setSpeed(newSpeed);
  };
  
  const handleCopyCode = () => {
    if (algorithm) {
      navigator.clipboard.writeText(algorithm.implementation);
      setCodeCopied(true);
      setTimeout(() => setCodeCopied(false), 2000);
    }
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };
  
  const handleInputSubmit = () => {
    try {
      // Parse input as array of numbers
      const newInput = inputValue.split(',').map(item => parseInt(item.trim(), 10));
      if (newInput.some(isNaN)) {
        throw new Error('Invalid input');
      }
      setInputData(newInput);
      setEditingInput(false);
      handleReset();
    } catch (error) {
      alert('Please enter valid comma-separated numbers (e.g. 5, 2, 8, 1, 9, 3)');
    }
  };
  
  const handleTimelineClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!timelineRef.current) return;
    
    const rect = timelineRef.current.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const percentage = offsetX / rect.width;
    const stepIndex = Math.min(
      Math.max(0, Math.floor(percentage * visualizationSteps.length)),
      visualizationSteps.length - 1
    );
    
    setCurrentStep(stepIndex);
  };
  
  // Theme-related classes
  const getThemeClasses = () => {
    switch(theme) {
      case 'dark':
        return {
          bg: 'bg-gray-900',
          text: 'text-gray-100',
          card: 'bg-gray-800 border-gray-700',
          highlight: 'bg-indigo-900 text-indigo-200',
          button: 'bg-indigo-700 hover:bg-indigo-600 text-white',
          accent: 'text-indigo-400',
          border: 'border-gray-700',
          element: {
            default: 'bg-gray-600',
            current: 'bg-blue-600',
            compared: 'bg-yellow-600',
            swapping: 'bg-red-600',
            sorted: 'bg-green-600'
          }
        };
      case 'neon':
        return {
          bg: 'bg-gray-900',
          text: 'text-white',
          card: 'bg-gray-800 border-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.5)]',
          highlight: 'bg-purple-900 text-pink-200',
          button: 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white',
          accent: 'text-pink-400',
          border: 'border-purple-500',
          element: {
            default: 'bg-gradient-to-r from-purple-400 to-pink-400',
            current: 'bg-gradient-to-r from-blue-400 to-cyan-400 shadow-[0_0_15px_rgba(59,130,246,0.7)]',
            compared: 'bg-gradient-to-r from-yellow-400 to-amber-400 shadow-[0_0_15px_rgba(251,191,36,0.7)]',
            swapping: 'bg-gradient-to-r from-red-400 to-pink-400 shadow-[0_0_15px_rgba(239,68,68,0.7)]',
            sorted: 'bg-gradient-to-r from-green-400 to-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.7)]'
          }
        };
      case 'cyberpunk':
        return {
          bg: 'bg-black',
          text: 'text-yellow-300',
          card: 'bg-gray-900 border-yellow-500 border-b-4 border-l-0 border-r-0 border-t-0',
          highlight: 'bg-yellow-900/30 text-yellow-200',
          button: 'bg-yellow-600 hover:bg-yellow-500 text-black',
          accent: 'text-cyan-400',
          border: 'border-yellow-500',
          element: {
            default: 'bg-cyan-600',
            current: 'bg-yellow-400 shadow-[0_0_15px_rgba(250,204,21,0.7)]',
            compared: 'bg-fuchsia-500 shadow-[0_0_15px_rgba(217,70,239,0.7)]',
            swapping: 'bg-rose-500 shadow-[0_0_15px_rgba(244,63,94,0.7)]',
            sorted: 'bg-lime-500 shadow-[0_0_15px_rgba(132,204,22,0.7)]'
          }
        };
      default: // light
        return {
          bg: 'bg-white',
          text: 'text-gray-900',
          card: 'bg-white border-gray-200',
          highlight: 'bg-indigo-50 text-indigo-800',
          button: 'bg-indigo-600 hover:bg-indigo-700 text-white',
          accent: 'text-indigo-600',
          border: 'border-gray-200',
          element: {
            default: 'bg-indigo-500',
            current: 'bg-blue-500',
            compared: 'bg-yellow-500',
            swapping: 'bg-red-500',
            sorted: 'bg-green-500'
          }
        };
    }
  };
  
  const themeClasses = getThemeClasses();
  
  // Director's tips based on current step
  const getDirectorTip = () => {
    if (currentStepData.swap) {
      return {
        title: "Swap in Action!",
        tip: "Notice how elements glide past each other with a spring motion, simulating real physical movement. The blur effect adds a sense of speed and momentum to the swap operation."
      };
    }
    
    if (currentStepData.sorted.length > 0 && 
        (visualizationSteps[currentStep-1]?.sorted.length || 0) < currentStepData.sorted.length) {
      return {
        title: "Element Locked In Place",
        tip: "The element has found its final position in the sorted array. The bouncing effect and green glow indicate completion - a visual reward showing progress in the algorithm."
      };
    }
    
    if (currentStepData.comparison.length > 0) {
      return {
        title: "Comparison Highlight",
        tip: "Watch for the subtle electric pulse between compared elements. This visual cue helps you identify which values the algorithm is currently evaluating."
      };
    }
    
    return {
      title: "Algorithm in Motion",
      tip: "Each step reveals the algorithm's inner workings. Pay attention to patterns in how elements move toward their final positions."
    };
  };
  
  const directorTip = getDirectorTip();
  
  // Bar Animation Component
  const BarVisualization = ({ data }: { data: Step }) => {
    return (
      <div className="flex justify-center items-end space-x-2 h-64">
        {data.arrayState.map((value, index) => {
          // Determine styling based on current step info
          const isCurrent = data.current === index;
          const isCompared = data.comparison.includes(index);
          const isSorted = data.sorted.includes(index);
          const isSwapping = isCompared && data.swap;
          
          // Calculate height percentage based on value
          const maxValue = Math.max(...data.arrayState);
          const heightPercentage = (value / maxValue) * 100;
          
          // Determine bar color based on theme and state
          let barColor = themeClasses.element.default;
          if (isSorted) barColor = themeClasses.element.sorted;
          else if (isSwapping) barColor = themeClasses.element.swapping;
          else if (isCompared) barColor = themeClasses.element.compared;
          else if (isCurrent) barColor = themeClasses.element.current;
          
          return (
            <motion.div
              key={`bar-${index}-${value}`}
              initial={{ height: `${heightPercentage}%` }}
              animate={{ 
                height: `${heightPercentage}%`,
                y: isSwapping ? [0, -20, 0] : 0,
                scale: isCompared ? [1, 1.05, 1] : 1,
                filter: isCompared || isSorted ? 'brightness(1.2)' : 'brightness(1)'
              }}
              transition={{ 
                type: "spring",
                stiffness: 300,
                damping: isSwapping ? 8 : 15,
                duration: 0.5
              }}
              className={`relative w-14 md:w-16 rounded-t-md ${barColor} flex items-center justify-center ${
                (isCompared || isCurrent) ? 'z-10' : 'z-0'
              } ${isSorted ? 'border-t-2 border-white' : ''}`}
              style={{ 
                height: `${heightPercentage}%`,
                boxShadow: (isCompared || isCurrent) ? '0 0 10px rgba(0,0,0,0.2)' : 'none'
              }}
              whileHover={{ 
                scale: 1.05,
                transition: { duration: 0.2 } 
              }}
            >
              <span className={`absolute -top-7 font-medium ${themeClasses.text}`}>{value}</span>
              
              {/* Index indicator */}
              <span className={`absolute -bottom-7 ${themeClasses.text} text-sm opacity-75`}>{index}</span>
              
              {/* Lock icon for sorted elements */}
              {isSorted && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ 
                    type: "spring",
                    stiffness: 500,
                    damping: 15 
                  }}
                  className="absolute -top-3 -right-3 bg-white rounded-full p-1 shadow-md"
                >
                  <Lock className="w-3 h-3 text-green-600" />
                </motion.div>
              )}
              
              {/* Sparkles for active comparison */}
              {isCompared && !isSwapping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ 
                    repeat: Infinity,
                    duration: 1.5
                  }}
                  className="absolute inset-0 overflow-hidden"
                >
                  <Sparkles className="w-4 h-4 text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                </motion.div>
              )}
              
              {/* Motion blur during swaps */}
              {isSwapping && (
                <motion.div
                  className="absolute inset-0 bg-current opacity-10 blur-md"
                  animate={{ 
                    opacity: [0, 0.2, 0] 
                  }}
                  transition={{ 
                    duration: 0.5,
                    ease: "easeInOut"
                  }}
                />
              )}
            </motion.div>
          );
        })}
      </div>
    );
  };
  
  // Array View Component
  const ArrayVisualization = ({ data }: { data: Step }) => {
    return (
      <div className="flex flex-wrap justify-center gap-4 py-16">
        {data.arrayState.map((value, index) => {
          // Determine styling based on current step info
          const isCurrent = data.current === index;
          const isCompared = data.comparison.includes(index);
          const isSorted = data.sorted.includes(index);
          const isSwapping = isCompared && data.swap;
          
          // Determine color based on theme and state
          let bgColor = themeClasses.element.default;
          let textColor = "text-white";
          
          if (isSorted) bgColor = themeClasses.element.sorted;
          else if (isSwapping) bgColor = themeClasses.element.swapping;
          else if (isCompared) bgColor = themeClasses.element.compared;
          else if (isCurrent) bgColor = themeClasses.element.current;
          
          // For light theme cards
          if (theme === 'light' && !isCompared && !isCurrent && !isSwapping && !isSorted) {
            textColor = "text-white";
          }
          
          return (
            <motion.div
              key={`array-${index}-${value}`}
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ 
                opacity: 1, 
                scale: 1,
                x: isSwapping ? [0, index % 2 === 0 ? 50 : -50, 0] : 0,
                rotate: isSwapping ? [0, index % 2 === 0 ? 5 : -5, 0] : 0,
                boxShadow: isCompared || isCurrent ? '0 0 15px rgba(0,0,0,0.3)' : '0 2px 5px rgba(0,0,0,0.1)'
              }}
              transition={{ 
                layout: { type: "spring", stiffness: 300, damping: 25 },
                opacity: { duration: 0.2 },
                scale: { type: "spring", stiffness: 400, damping: 15 },
                boxShadow: { duration: 0.2 }
              }}
              className={`relative flex items-center justify-center w-16 h-16 rounded-lg ${bgColor} ${textColor} ${
                (isCompared || isCurrent) ? 'z-10 ring-2 ring-white' : 'z-0'
              }`}
              whileHover={{ 
                scale: 1.1,
                transition: { duration: 0.2 } 
              }}
            >
              <span className="text-xl font-bold">{value}</span>
              
              {/* Index indicator */}
              <span className="absolute -bottom-6 text-xs bg-gray-200 dark:bg-gray-700 px-2 py-0.5 rounded-full">
                idx: {index}
              </span>
              
              {/* Lock icon for sorted elements */}
              {isSorted && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ 
                    type: "spring",
                    stiffness: 500,
                    damping: 15 
                  }}
                  className="absolute -top-2 -right-2 bg-white rounded-full p-1 shadow-md"
                >
                  <Lock className="w-4 h-4 text-green-600" />
                </motion.div>
              )}
              
              {/* Motion blur during swaps */}
              {isSwapping && (
                <motion.div
                  className="absolute inset-0 bg-current opacity-10 blur-md rounded-lg"
                  animate={{ 
                    opacity: [0, 0.3, 0] 
                  }}
                  transition={{ 
                    duration: 0.5,
                    ease: "easeInOut"
                  }}
                />
              )}
            </motion.div>
          );
        })}
      </div>
    );
  };
  
  // Circle View Component
  const CircleVisualization = ({ data }: { data: Step }) => {
    const totalElements = data.arrayState.length;
    const radius = 120; // Circle radius
    
    return (
      <div className="relative w-full h-[400px] flex items-center justify-center my-8">
        {/* Center indicator */}
        <motion.div 
          className={`absolute w-6 h-6 rounded-full ${themeClasses.accent} z-0`}
          animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }}
          transition={{ repeat: Infinity, duration: 2 }}
        />
        
        {/* Circular track */}
        <div className={`absolute w-[${radius*2}px] h-[${radius*2}px] rounded-full border-2 ${themeClasses.border} opacity-20`} />
        
        {data.arrayState.map((value, index) => {
          // Calculate position on circle
          const angle = (index / totalElements) * 2 * Math.PI;
          const x = radius * Math.cos(angle);
          const y = radius * Math.sin(angle);
          
          // Determine styling based on current step info
          const isCurrent = data.current === index;
          const isCompared = data.comparison.includes(index);
          const isSorted = data.sorted.includes(index);
          const isSwapping = isCompared && data.swap;
          
          // Determine color based on theme and state
          let bgColor = themeClasses.element.default;
          
          if (isSorted) bgColor = themeClasses.element.sorted;
          else if (isSwapping) bgColor = themeClasses.element.swapping;
          else if (isCompared) bgColor = themeClasses.element.compared;
          else if (isCurrent) bgColor = themeClasses.element.current;
          
          // Determine size based on value
          const maxValue = Math.max(...data.arrayState);
          const size = 30 + (value / maxValue) * 30; // Between 30px and 60px
          
          return (
            <motion.div
              key={`circle-${index}-${value}`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ 
                opacity: 1, 
                scale: isCompared ? [1, 1.1, 1] : 1,
                x, 
                y,
                boxShadow: isCompared || isCurrent ? '0 0 15px rgba(0,0,0,0.3)' : '0 2px 5px rgba(0,0,0,0.1)'
              }}
              transition={{ 
                type: "spring",
                stiffness: 300,
                damping: isSwapping ? 8 : 20,
                duration: 0.5
              }}
              className={`absolute flex items-center justify-center rounded-full ${bgColor} text-white
                ${(isCompared || isCurrent) ? 'z-10 ring-2 ring-white' : 'z-0'}`}
              style={{ 
                width: `${size}px`, 
                height: `${size}px`,
                marginLeft: `-${size/2}px`,
                marginTop: `-${size/2}px` 
              }}
              whileHover={{ 
                scale: 1.1,
                transition: { duration: 0.2 } 
              }}
            >
              <span className="text-sm font-bold">{value}</span>
              
              {/* Index indicator */}
              <span className="absolute -bottom-6 text-xs bg-gray-200 dark:bg-gray-700 px-2 py-0.5 rounded-full">
                {index}
              </span>
              
              {/* Lock icon for sorted elements */}
              {isSorted && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ 
                    type: "spring",
                    stiffness: 500,
                    damping: 15 
                  }}
                  className="absolute -top-2 -right-2 bg-white rounded-full p-1 shadow-md"
                >
                  <Lock className="w-3 h-3 text-green-600" />
                </motion.div>
              )}
              
              {/* Connection lines */}
              {index > 0 && (
                <div className="absolute top-1/2 left-1/2 w-[1px] h-[1px]">
                  <motion.div
                    className={`absolute h-[2px] ${isCompared ? 'bg-yellow-400' : 'bg-gray-300'} origin-left`}
                    style={{
                      width: `${radius}px`,
                      transform: `rotate(${angle + Math.PI}rad)`,
                      transformOrigin: 'left center'
                    }}
                    animate={{
                      opacity: isCompared ? [0.5, 1, 0.5] : 0.3
                    }}
                    transition={{
                      repeat: isCompared ? Infinity : 0,
                      duration: 1
                    }}
                  />
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    );
  };
  
  if (loading) {
    return (
      <div className={`flex flex-col justify-center items-center h-screen ${themeClasses.bg} ${themeClasses.text}`}>
        <motion.div 
          animate={{ 
            rotate: 360,
            filter: [
              'drop-shadow(0 0 5px rgba(99, 102, 241, 0.5))',
              'drop-shadow(0 0 15px rgba(99, 102, 241, 0.8))',
              'drop-shadow(0 0 5px rgba(99, 102, 241, 0.5))'
            ]
          }}
          transition={{ 
            rotate: { duration: 1.5, repeat: Infinity, ease: "linear" },
            filter: { duration: 2, repeat: Infinity }
          }}
          className="w-16 h-16 border-t-4 border-indigo-600 border-solid rounded-full"
        />
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-4 text-lg"
        >
          Loading algorithm visualization...
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ delay: 1, duration: 2, repeat: Infinity }}
          className="mt-2 text-sm text-indigo-500"
        >
          Preparing cinematic experience
        </motion.p>
      </div>
    );
  }

  if (!algorithm) {
    return (
      <div className={`text-center py-16 ${themeClasses.bg} ${themeClasses.text}`}>
        <div className="text-red-500 text-xl">Algorithm not found</div>
        <button 
          onClick={() => navigate('/')}
          className={`mt-4 px-4 py-2 ${themeClasses.button} rounded-md`}
        >
          Return to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className={`${themeClasses.bg} min-h-screen transition-colors duration-300`}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={`max-w-6xl mx-auto px-4 py-8 ${themeClasses.text}`}
      >
        {/* Header with back button and user info */}
        <div className="flex justify-between items-center mb-6">
          <motion.button
            whileHover={{ x: -3 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate(-1)}
            className={`flex items-center ${themeClasses.text} hover:${themeClasses.accent} transition-colors`}
          >
            <ChevronLeft className="w-5 h-5 mr-1" />
            Back to Learning Path
          </motion.button>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center text-sm opacity-75">
              <span className="hidden md:inline">User:</span> 
              <span className="font-medium ml-1 mr-4">{CURRENT_USER}</span>
              <Clock className="w-4 h-4 mr-1" /> 
              <span>{CURRENT_DATE}</span>
            </div>
            
            {/* Theme selector */}
            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setTheme(theme === 'light' ? 'dark' : theme === 'dark' ? 'neon' : theme === 'neon' ? 'cyberpunk' : 'light')}
                className={`p-2 rounded-md ${themeClasses.border} border flex items-center`}
              >
                {theme === 'light' && <Sun className="w-4 h-4" />}
                {theme === 'dark' && <Moon className="w-4 h-4" />}
                {theme === 'neon' && <Zap className="w-4 h-4" />}
                {theme === 'cyberpunk' && <Palette className="w-4 h-4" />}
              </motion.button>
            </div>
          </div>
        </div>
        
        {/* Algorithm header */}
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">{algorithm.title}</h1>
              <p className="opacity-80 max-w-3xl">{algorithm.description}</p>
              
              <motion.div 
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="flex flex-wrap gap-3 mt-4"
              >
                <span className={`px-3 py-1 rounded-full text-sm border ${themeClasses.border} flex items-center ${themeClasses.highlight}`}>
                  <Code className="w-3.5 h-3.5 mr-1" />
                  {algorithm.category}
                </span>
                <span className={`px-3 py-1 rounded-full text-sm border ${themeClasses.border} flex items-center ${themeClasses.highlight}`}>
                  <Clock className="w-3.5 h-3.5 mr-1" />
                  Time: {algorithm.timeComplexity}
                </span>
                <span className={`px-3 py-1 rounded-full text-sm border ${themeClasses.border} flex items-center ${themeClasses.highlight}`}>
                  <Info className="w-3.5 h-3.5 mr-1" />
                  Space: {algorithm.spaceComplexity}
                </span>
              </motion.div>
            </div>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowExpertTips(!showExpertTips)}
              className={`px-3 py-2 rounded-lg text-sm border ${themeClasses.border} flex items-center ${themeClasses.highlight}`}
            >
              <Award className="w-4 h-4 mr-2" />
              Expert Tips
              <ChevronDown className={`w-4 h-4 ml-2 transition-transform duration-300 ${showExpertTips ? 'rotate-180' : ''}`} />
            </motion.button>
          </div>
          
          <AnimatePresence>
            {showExpertTips && (
              <motion.div
                initial={{ opacity: 0, height: 0, y: -10 }}
                animate={{ opacity: 1, height: 'auto', y: 0 }}
                exit={{ opacity: 0, height: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className={`mt-4 border ${themeClasses.border} rounded-lg p-4 overflow-hidden ${themeClasses.highlight}`}
              >
                <h3 className="font-semibold mb-2 flex items-center">
                  <Award className="w-4 h-4 mr-2" />
                  Expert Insights for {algorithm.title}
                </h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex">
                    <span className="font-bold mr-2">•</span>
                    <span>This algorithm is particularly useful when dealing with {
                      algorithm.category === 'sorting' 
                        ? 'collections that need to be ordered'
                        : algorithm.category === 'trees'
                          ? 'hierarchical data structures'
                          : algorithm.category === 'graphs'
                            ? 'connected network-like data'
                            : 'complex data operations'
                    }.</span>
                  </li>
                  <li className="flex">
                    <span className="font-bold mr-2">•</span>
                    <span>Watch for the key step where {
                      algorithm.id.includes('sort')
                        ? 'elements are compared and swapped'
                        : algorithm.id.includes('search')
                          ? 'the search space is reduced'
                          : 'the core operation occurs'
                    } to understand the algorithm's efficiency.</span>
                  </li>
                  <li className="flex">
                    <span className="font-bold mr-2">•</span>
                    <span>A common mistake is to {
                      algorithm.id.includes('sort')
                        ? 'forget the boundary conditions in the inner loop'
                        : algorithm.id.includes('search')
                          ? 'not handle the case when the element is not found'
                          : 'overlook edge cases'
                    }. Watch out for this in your implementation.</span>
                  </li>
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
        
        {/* Tabs */}
        <div className={`mb-6 border-b ${themeClasses.border}`}>
          <div className="flex space-x-2">
            <motion.button
              whileHover={{ y: -2 }}
              whileTap={{ y: 0 }}
              onClick={() => setActiveTab('visualization')}
              className={`px-4 py-3 text-sm font-medium flex items-center border-b-2 transition-colors ${
                activeTab === 'visualization'
                  ? `border-indigo-600 ${themeClasses.accent}`
                  : `border-transparent opacity-70 hover:opacity-100`
              }`}
            >
              <PlayCircle className="w-4 h-4 mr-2" />
              Visualization
            </motion.button>
            
            <motion.button
              whileHover={{ y: -2 }}
              whileTap={{ y: 0 }}
              onClick={() => setActiveTab('code')}
              className={`px-4 py-3 text-sm font-medium flex items-center border-b-2 transition-colors ${
                activeTab === 'code'
                  ? `border-indigo-600 ${themeClasses.accent}`
                  : `border-transparent opacity-70 hover:opacity-100`
              }`}
            >
              <Code className="w-4 h-4 mr-2" />
              Code & Pseudocode
            </motion.button>
            
            <motion.button
              whileHover={{ y: -2 }}
              whileTap={{ y: 0 }}
              onClick={() => setActiveTab('explanation')}
              className={`px-4 py-3 text-sm font-medium flex items-center border-b-2 transition-colors ${
                activeTab === 'explanation'
                  ? `border-indigo-600 ${themeClasses.accent}`
                  : `border-transparent opacity-70 hover:opacity-100`
              }`}
            >
              <Book className="w-4 h-4 mr-2" />
              Explanation
            </motion.button>
          </div>
        </div>
        
        {/* Tab content */}
        <AnimatePresence mode="wait">
          {activeTab === 'visualization' && (
            <motion.div
              key="visualization"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className={`border ${themeClasses.border} rounded-xl ${themeClasses.card} overflow-hidden`}
            >
              {/* Visualization header with controls */}
              <div className={`p-4 border-b ${themeClasses.border} flex flex-wrap justify-between items-center`}>
                <div className="flex items-center">
                  <h2 className="font-semibold">Algorithm Visualization</h2>
                  
                  <div className="ml-4 flex items-center bg-opacity-20 rounded-md border px-1 shadow-sm">
                    <button
                      onClick={handleReset}
                      className="p-1.5 hover:text-indigo-500 transition-colors"
                      title="Reset"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </button>
                    
                    <button
                      onClick={() => setCurrentStep(prev => Math.max(0, prev - 5))}
                      className="p-1.5 hover:text-indigo-500 transition-colors"
                      title="Back 5 steps"
                      disabled={currentStep === 0}
                    >
                      <SkipBack className="w-4 h-4" />
                    </button>
                    
                    <button
                      onClick={handlePrevStep}
                      className="p-1.5 hover:text-indigo-500 transition-colors"
                      title="Previous step"
                      disabled={currentStep === 0}
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    
                    <button
                      onClick={handlePlayPause}
                      className="p-1.5 hover:text-indigo-500 transition-colors"
                      title={isPlaying ? "Pause" : "Play"}
                    >
                      {isPlaying ? <PauseCircle className="w-5 h-5" /> : <PlayCircle className="w-5 h-5" />}
                    </button>
                    
                    <button
                      onClick={handleNextStep}
                      className="p-1.5 hover:text-indigo-500 transition-colors"
                      title="Next step"
                      disabled={currentStep >= visualizationSteps.length - 1}
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                    
                    <button
                      onClick={() => setCurrentStep(prev => Math.min(visualizationSteps.length - 1, prev + 5))}
                      className="p-1.5 hover:text-indigo-500 transition-colors"
                      title="Forward 5 steps"
                      disabled={currentStep >= visualizationSteps.length - 1}
                    >
                      <SkipForward className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <div className="ml-4 flex items-center space-x-1 bg-opacity-20 rounded-md border p-1 shadow-sm">
                    <button
                      onClick={() => handleSpeedChange(0.5)}
                      className={`px-2 py-1 text-xs rounded ${
                        speed === 0.5 
                          ? `bg-indigo-100 dark:bg-indigo-900 ${themeClasses.accent}` 
                          : 'hover:bg-opacity-20 hover:bg-gray-200'
                      }`}
                    >
                      0.5x
                    </button>
                    <button
                      onClick={() => handleSpeedChange(1)}
                      className={`px-2 py-1 text-xs rounded ${
                        speed === 1 
                          ? `bg-indigo-100 dark:bg-indigo-900 ${themeClasses.accent}` 
                          : 'hover:bg-opacity-20 hover:bg-gray-200'
                      }`}
                    >
                      1x
                    </button>
                    <button
                      onClick={() => handleSpeedChange(2)}
                      className={`px-2 py-1 text-xs rounded ${
                        speed === 2 
                          ? `bg-indigo-100 dark:bg-indigo-900 ${themeClasses.accent}` 
                          : 'hover:bg-opacity-20 hover:bg-gray-200'
                      }`}
                    >
                      2x
                    </button>
                  </div>
                  
                  {/* View type selector */}
                  <div className="ml-4 flex items-center space-x-1 bg-opacity-20 rounded-md border p-1 shadow-sm">
                    <button
                      onClick={() => setVisualizationType('bars')}
                      className={`px-2 py-1 text-xs rounded flex items-center ${
                        visualizationType === 'bars' 
                          ? `bg-indigo-100 dark:bg-indigo-900 ${themeClasses.accent}` 
                          : 'hover:bg-opacity-20 hover:bg-gray-200'
                      }`}
                    >
                      <Monitor className="w-3 h-3 mr-1" />
                      Bars
                    </button>
                    <button
                      onClick={() => setVisualizationType('array')}
                      className={`px-2 py-1 text-xs rounded flex items-center ${
                        visualizationType === 'array' 
                          ? `bg-indigo-100 dark:bg-indigo-900 ${themeClasses.accent}` 
                          : 'hover:bg-opacity-20 hover:bg-gray-200'
                      }`}
                    >
                      <Menu className="w-3 h-3 mr-1" />
                      Array
                    </button>
                    <button
                      onClick={() => setVisualizationType('circle')}
                      className={`px-2 py-1 text-xs rounded flex items-center ${
                        visualizationType === 'circle' 
                          ? `bg-indigo-100 dark:bg-indigo-900 ${themeClasses.accent}` 
                          : 'hover:bg-opacity-20 hover:bg-gray-200'
                      }`}
                    >
                      <Eye className="w-3 h-3 mr-1" />
                      Circle
                    </button>
                  </div>
                </div>
                
                <div className="flex items-center mt-2 sm:mt-0">
                  <div className="text-sm opacity-75">
                    Step {currentStep + 1}/{visualizationSteps.length}
                  </div>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowSettings(!showSettings)}
                    className="ml-4 p-1.5 bg-opacity-20 rounded-md border text-indigo-500 hover:bg-opacity-30 transition-colors"
                    title="Settings"
                  >
                    <Settings className="w-4 h-4" />
                  </motion.button>
                </div>
              </div>
              
              {/* Settings panel */}
              <AnimatePresence>
                {showSettings && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className={`p-4 border-b ${themeClasses.border} bg-opacity-50`}
                  >
                    <div className="flex flex-wrap items-center gap-4">
                      <div>
                        <label className="text-sm font-medium block mb-1">Input Array:</label>
                        {editingInput ? (
                          <div className="flex items-center">
                            <input
                              type="text"
                              value={inputValue}
                              onChange={handleInputChange}
                              className={`border ${themeClasses.border} rounded-md px-3 py-1.5 text-sm w-64 bg-transparent`}
                              placeholder="Enter comma-separated numbers"
                            />
                            <button
                              onClick={handleInputSubmit}
                              className={`ml-2 ${themeClasses.button} px-3 py-1.5 rounded-md text-sm`}
                            >
                              Apply
                            </button>
                          </div>
                        ) : (
                          <div className="flex items-center">
                            <div className={`border ${themeClasses.border} rounded-md px-3 py-1.5 text-sm w-64`}>
                              {inputData.join(', ')}
                            </div>
                            <button
                              onClick={() => setEditingInput(true)}
                              className={`ml-2 ${themeClasses.accent}`}
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                          </div>
                        )}
                      </div>
                      
                      <div>
                        <label className="text-sm font-medium block mb-1">Animation Speed:</label>
                        <div className="flex items-center space-x-2">
                          <span className="text-xs opacity-75">Slow</span>
                          <input
                            type="range"
                            min="0.25"
                            max="3"
                            step="0.25"
                            value={speed}
                            onChange={(e) => handleSpeedChange(parseFloat(e.target.value))}
                            className="w-24 speed-control"
                          />
                          <span className="text-xs opacity-75">Fast</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              
              {/* Visualization area */}
              <div className="p-6" ref={visualizationRef}>
                {/* Current step description */}
                <div className={`mb-8 ${themeClasses.highlight} p-4 rounded-lg border ${themeClasses.border}`}>
                  <p>{currentStepData.description}</p>
                </div>
                
                {/* Director's tip */}
                <AnimatePresence>
                  {showDirectorTip && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9, y: 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9, y: 20 }}
                      transition={{ 
                        type: "spring", 
                        stiffness: 500,
                        damping: 30 
                      }}
                      className="mb-8 bg-black text-white p-4 rounded-lg border border-gray-700 shadow-lg"
                    >
                      <div className="flex items-start">
                        <div className="flex-shrink-0 p-1 bg-indigo-500 rounded-full mr-3">
                          <Award className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="font-bold text-indigo-300">{directorTip.title}</h4>
                          <p className="text-sm text-gray-300 mt-1">{directorTip.tip}</p>
                        </div>
                        <button 
                          onClick={() => setShowDirectorTip(false)}
                          className="flex-shrink-0 ml-auto p-1 text-gray-400 hover:text-white"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                
                {/* Visualization based on selected view type */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={visualizationType}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                  >
                    {visualizationType === 'bars' && (
                      <BarVisualization data={currentStepData} />
                    )}
                    
                    {visualizationType === 'array' && (
                      <ArrayVisualization data={currentStepData} />
                    )}
                    
                    {visualizationType === 'circle' && (
                      <CircleVisualization data={currentStepData} />
                    )}
                  </motion.div>
                </AnimatePresence>
                
                {/* Timeline scrubber */}
                <div className="mt-10">
                  <div className="flex justify-between text-xs opacity-75 mb-1">
                    <span>Progress:</span>
                    <span>{Math.round((currentStep / (visualizationSteps.length - 1)) * 100)}%</span>
                  </div>
                  <div 
                    className={`w-full h-4 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden cursor-pointer relative`}
                    onClick={handleTimelineClick}
                    ref={timelineRef}
                  >
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${(currentStep / (visualizationSteps.length - 1)) * 100}%` }}
                      className={`h-full ${themeClasses.element.default}`}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                    
                    {/* Timeline steps markers */}
                    <div className="absolute inset-0 flex items-center">
                      {visualizationSteps.map((_, index) => {
                        const isSwapStep = visualizationSteps[index]?.swap;
                        const isSortedStep = visualizationSteps[index]?.sorted.length > 0 && 
                          (visualizationSteps[index-1]?.sorted.length || 0) < visualizationSteps[index]?.sorted.length;
                        
                        if (!isSwapStep && !isSortedStep) return null;
                        
                        const position = `${(index / (visualizationSteps.length - 1)) * 100}%`;
                        
                        return (
                          <div 
                            key={`marker-${index}`}
                            className={`absolute w-1 h-4 ${
                              isSwapStep 
                                ? 'bg-red-500' 
                                : isSortedStep 
                                  ? 'bg-green-500' 
                                  : 'bg-gray-400'
                            } opacity-80`}
                            style={{ left: position }}
                            title={visualizationSteps[index]?.description}
                          />
                        );
                      })}
                    </div>
                    
                    {/* Current position marker */}
                    <motion.div 
                      className="absolute top-0 w-2 h-4 bg-white border border-indigo-600 rounded-full shadow-md"
                      style={{ left: `calc(${(currentStep / (visualizationSteps.length - 1)) * 100}% - 4px)` }}
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 0.5, repeat: 0 }}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}
          
          {activeTab === 'code' && (
            <motion.div
              key="code"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              <div className={`rounded-xl ${themeClasses.card} overflow-hidden border ${themeClasses.border}`}>
                <div className={`flex justify-between items-center p-4 border-b ${themeClasses.border}`}>
                  <h2 className="font-semibold flex items-center">
                    <Code className="w-4 h-4 mr-2" />
                    Implementation
                  </h2>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleCopyCode}
                    className={`text-sm flex items-center py-1 px-2 rounded border ${themeClasses.border}`}
                  >
                    {codeCopied ? (
                      <>
                        <CheckCircle className="w-3.5 h-3.5 mr-1 text-green-500" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 mr-1" />
                        Copy code
                      </>
                    )}
                  </motion.button>
                </div>
                <div className="p-4">
                  <pre className={`${theme === 'light' ? 'bg-gray-800 text-gray-100' : 'bg-black text-gray-100'} p-4 rounded-lg overflow-auto text-sm h-80`}>
                    <code>{algorithm.implementation}</code>
                  </pre>
                </div>
              </div>
              
              <div className={`rounded-xl ${themeClasses.card} overflow-hidden border ${themeClasses.border}`}>
                <div className={`p-4 border-b ${themeClasses.border}`}>
                  <h2 className="font-semibold flex items-center">
                    <Book className="w-4 h-4 mr-2" />
                    Pseudocode
                  </h2>
                </div>
                <div className="p-4">
                  <pre className={`${theme === 'light' ? 'bg-gray-50 text-gray-800' : 'bg-gray-900 text-gray-100'} p-4 rounded-lg overflow-auto text-sm h-80 border ${themeClasses.border}`}>
                    {algorithm.pseudocode}
                  </pre>
                </div>
              </div>
            </motion.div>
          )}
          
          {activeTab === 'explanation' && (
            <motion.div
              key="explanation"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className={`rounded-xl ${themeClasses.card} overflow-hidden border ${themeClasses.border}`}
            >
              <div className={`p-4 border-b ${themeClasses.border}`}>
                <h2 className="font-semibold flex items-center">
                <Book className="w-4 h-4 mr-2" />
                  Detailed Explanation
                </h2>
              </div>
              
              <div className="p-6">
                <div className="prose max-w-none dark:prose-invert">
                  <h3>Understanding {algorithm.title}</h3>
                  <p>
                    {algorithm.title} is a {algorithm.category} algorithm with {algorithm.timeComplexity} time complexity, 
                    making it {
                      algorithm.timeComplexity === 'O(1)' ? 'extremely efficient'
                        : algorithm.timeComplexity === 'O(log n)' ? 'very efficient'
                        : algorithm.timeComplexity === 'O(n)' ? 'efficient'
                        : algorithm.timeComplexity === 'O(n log n)' ? 'reasonably efficient'
                        : 'suitable for specific use cases'
                    }.
                  </p>
                  
                  <h4>Key Concepts</h4>
                  <p>
                    The algorithm works by {
                      algorithm.id.includes('bubble')
                        ? 'repeatedly stepping through the list, comparing adjacent elements and swapping them if they are in the wrong order'
                        : algorithm.id.includes('merge')
                          ? 'dividing the array into smaller subarrays, sorting them, and then merging them back together'
                        : algorithm.id.includes('quick')
                          ? 'selecting a "pivot" element and partitioning the array around it'
                        : algorithm.id.includes('binary')
                          ? 'repeatedly dividing the search space in half'
                        : 'employing its core strategy to process the data efficiently'
                    }.
                  </p>
                  
                  <h4>Step-by-Step Process</h4>
                  <ol>
                    <li>
                      <strong>Initialization:</strong> {
                        algorithm.id.includes('sort')
                          ? 'Begin with the unsorted array'
                          : algorithm.id.includes('search')
                            ? 'Define the search boundaries (typically the start and end of the array)'
                            : 'Set up the initial state'
                      }
                    </li>
                    <li>
                      <strong>Core Operation:</strong> {
                        algorithm.id.includes('bubble')
                          ? 'Compare adjacent elements and swap if necessary'
                          : algorithm.id.includes('merge')
                            ? 'Divide the array, sort recursively, then merge'
                          : algorithm.id.includes('quick')
                            ? 'Choose a pivot and partition the array'
                          : algorithm.id.includes('binary')
                            ? 'Compare the middle element with the target'
                          : 'Perform the main algorithm operation'
                      }
                    </li>
                    <li>
                      <strong>Iteration:</strong> {
                        algorithm.id.includes('sort')
                          ? 'Continue until the array is completely sorted'
                          : algorithm.id.includes('search')
                            ? 'Narrow the search space until the element is found or determined to be absent'
                            : 'Repeat until the termination condition is met'
                      }
                    </li>
                    <li>
                      <strong>Completion:</strong> {
                        algorithm.id.includes('sort')
                          ? 'Return the sorted array'
                          : algorithm.id.includes('search')
                            ? 'Return the index of the element or indicate it was not found'
                            : 'Return the final result'
                      }
                    </li>
                  </ol>
                  
                  <h4>Time & Space Complexity Analysis</h4>
                  <ul>
                    <li>
                      <strong>Time Complexity:</strong> {algorithm.timeComplexity} - {
                        algorithm.timeComplexity === 'O(1)'
                          ? 'This algorithm takes constant time regardless of input size.'
                          : algorithm.timeComplexity === 'O(log n)'
                            ? 'This algorithm is logarithmic, meaning it gets only slightly slower as the input size increases exponentially.'
                            : algorithm.timeComplexity === 'O(n)'
                              ? 'This algorithm is linear, meaning its runtime grows directly proportional to the input size.'
                              : algorithm.timeComplexity === 'O(n log n)'
                                ? 'This algorithm is linearithmic, making it efficient for large data sets, but not as fast as linear algorithms.'
                                : 'This complexity means the algorithm slows down significantly as the input size increases.'
                      }
                    </li>
                    <li>
                      <strong>Space Complexity:</strong> {algorithm.spaceComplexity} - {
                        algorithm.spaceComplexity === 'O(1)'
                          ? 'This algorithm uses constant extra space regardless of input size.'
                          : algorithm.spaceComplexity === 'O(log n)'
                            ? 'This algorithm uses logarithmic extra space, typically due to recursive call stacks.'
                            : algorithm.spaceComplexity === 'O(n)'
                              ? 'This algorithm uses extra space directly proportional to the input size.'
                              : 'This complexity means the algorithm requires significant extra space as the input size increases.'
                      }
                    </li>
                  </ul>
                  
                  <h4>Common Use Cases</h4>
                  <p>
                    {algorithm.title} is commonly used for:
                  </p>
                  <ul>
                    <li>
                      {algorithm.id.includes('sort')
                        ? 'Organizing data in a specific order'
                        : algorithm.id.includes('search')
                          ? 'Finding specific elements in a collection'
                          : algorithm.id.includes('tree')
                            ? 'Working with hierarchical data structures'
                            : algorithm.id.includes('graph')
                              ? 'Analyzing networks and relationships'
                              : 'Solving specialized computational problems'
                      }
                    </li>
                    <li>
                      {algorithm.category === 'sorting'
                        ? 'Database operations requiring ordered results'
                        : algorithm.category === 'searching'
                          ? 'Lookup operations in data collections'
                          : algorithm.category === 'trees'
                            ? 'File systems and hierarchical data management'
                            : algorithm.category === 'graphs'
                              ? 'Route finding and network analysis'
                              : 'Specialized problem domains'
                      }
                    </li>
                  </ul>
                </div>
                
                <div className={`mt-8 ${themeClasses.highlight} p-4 rounded-lg border ${themeClasses.border}`}>
                  <h3 className="text-lg font-semibold mb-2">Try it yourself!</h3>
                  <p className="mb-4">
                    The best way to understand an algorithm is to implement it yourself and experiment with different inputs.
                  </p>
                  <div className="flex items-center">
                    <button className={`${themeClasses.button} px-4 py-2 rounded-md transition-colors`}>
                      Open in Code Playground
                    </button>
                    <span className="ml-4 text-sm">
                      Or try modifying the input above in the Visualization tab!
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Bottom section with related algorithms */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mt-10"
        >
          <h2 className="text-xl font-bold mb-4">Related Algorithms</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {algorithmsData
              .filter(a => a.id !== algorithm.id && a.category === algorithm.category)
              .slice(0, 3)
              .map(relatedAlgorithm => (
                <motion.div
                  key={relatedAlgorithm.id}
                  whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }}
                  className={`${themeClasses.card} rounded-xl border ${themeClasses.border} overflow-hidden transition-all duration-200`}
                >
                  <div className="p-4">
                    <h3 className="font-medium">{relatedAlgorithm.title}</h3>
                    <p className="text-sm mt-1 line-clamp-2 opacity-80">{relatedAlgorithm.description}</p>
                    
                    <div className="flex items-center mt-3">
                      <span className={`text-xs ${themeClasses.highlight} px-2 py-0.5 rounded`}>
                        {relatedAlgorithm.timeComplexity}
                      </span>
                      <button
                        onClick={() => navigate(`/visualize/${relatedAlgorithm.id}`)}
                        className={`ml-auto text-sm ${themeClasses.accent} hover:underline flex items-center`}
                      >
                        View
                        <ChevronRight className="w-4 h-4 ml-1" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
          </div>
        </motion.div>
        
        {/* Footer with current date and user */}
        <div className="mt-10 text-center text-sm opacity-60 py-4 border-t border-gray-200 dark:border-gray-800">
          <p>
            Algorithm visualized by {CURRENT_USER} | {CURRENT_DATE}
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default AlgorithmVisualizer;