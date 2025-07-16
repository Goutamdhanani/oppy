import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Activity, Brain, Calendar, Clock, Award, Zap, 
  TrendingUp, Moon, User, ChevronDown, ChevronRight, 
  ArrowUp, BarChart2, Star, Coffee, Target, CheckCircle, 
  AlertTriangle, BookOpen, Code, GitBranch, Hexagon, 
  PieChart, MessageCircle, Database, FastForward, 
  Smile, Meh, Frown, Layers, RefreshCw, PlusCircle,
  Cpu, Eye, RotateCcw, GitPullRequest, Anchor, Droplet,
  Trophy, // Added missing Trophy icon
  Lock // Added missing Lock icon
} from 'lucide-react';
import { Line, Bar, Radar, Doughnut } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import { format, subDays, addDays, eachDayOfInterval } from 'date-fns';

// Current user and date - updated to exact values
const CURRENT_USER = "Daksha1107";
const CURRENT_DATE = "2025-07-16 20:55:38";

// Chart.js registration
Chart.register();

// Theme colors
const themeColors = {
  background: '#0a0a12',
  cardBg: '#12121e',
  accent: '#6c5ce7',
  accentLight: '#8370ff',
  success: '#00d2d3',
  warning: '#ffa801',
  danger: '#ff5e57',
  textPrimary: '#ffffff',
  textSecondary: '#a1a1b5',
  gridLine: '#1e1e30',
  chartGradient1: 'rgba(108, 92, 231, 0.8)',
  chartGradient2: 'rgba(0, 210, 211, 0.4)',
  badgeBg: 'rgba(108, 92, 231, 0.15)',
  greenGlow: '0 0 10px rgba(0, 210, 211, 0.7)',
  purpleGlow: '0 0 15px rgba(108, 92, 231, 0.5)',
  cardGlow: '0 4px 20px rgba(13, 13, 20, 0.7)',
};

// Badges with classy titles
const badges = [
  { id: 1, title: "Pattern Whisperer", icon: <Eye size={18} />, description: "Exceptional ability to recognize problem patterns", earned: true, date: "2025-04-23" },
  { id: 2, title: "Recursion Architect", icon: <RefreshCw size={18} />, description: "Mastery in designing elegant recursive solutions", earned: true, date: "2025-02-15" },
  { id: 3, title: "Complexity Sage", icon: <Cpu size={18} />, description: "Expert in optimizing time and space complexity", earned: true, date: "2025-03-30" },
  { id: 4, title: "Algorithm Artisan", icon: <Code size={18} />, description: "Creator of beautifully crafted algorithmic solutions", earned: false },
  { id: 5, title: "Data Structure Virtuoso", icon: <Database size={18} />, description: "Exceptional skill in manipulating data structures", earned: true, date: "2025-05-10" },
  { id: 6, title: "Graph Navigator", icon: <GitBranch size={18} />, description: "Expert in traversing and manipulating graphs", earned: false },
  { id: 7, title: "Memory Oracle", icon: <Hexagon size={18} />, description: "Master of space-efficient algorithms", earned: true, date: "2025-06-02" },
  { id: 8, title: "Binary Whisperer", icon: <Layers size={18} />, description: "Expert in binary search and bit manipulation", earned: true, date: "2025-01-18" },
  { id: 9, title: "Dynamic Visionary", icon: <PlusCircle size={18} />, description: "Master of dynamic programming techniques", earned: false },
];

// Mock data for heatmap
const generateHeatmapData = () => {
  const today = new Date(CURRENT_DATE);
  const startDate = subDays(today, 365);
  const dateRange = eachDayOfInterval({ start: startDate, end: today });
  
  // Current streak of 11 days
  const streak = 11;
  const streakStart = subDays(today, streak - 1);
  
  return dateRange.map(date => {
    const dateStr = format(date, 'yyyy-MM-dd');
    
    // Fill with random values, higher probability for recent dates
    const daysAgo = Math.round((today.getTime() - date.getTime()) / (1000 * 3600 * 24));
    
    // Create streak pattern for last 11 days
    if (date >= streakStart && date <= today) {
      return {
        date: dateStr,
        count: Math.floor(Math.random() * 10) + 5 // Higher values for streak days
      };
    }
    
    // Past best streak of 34 days (somewhere in the middle)
    const pastStreakEnd = subDays(today, 120);
    const pastStreakStart = subDays(pastStreakEnd, 33);
    if (date >= pastStreakStart && date <= pastStreakEnd) {
      return {
        date: dateStr,
        count: Math.floor(Math.random() * 15) + 5 // High values for past streak
      };
    }
    
    // More likely to have activity in recent months
    let probability = 0;
    if (daysAgo < 90) probability = 0.8;
    else if (daysAgo < 180) probability = 0.6;
    else if (daysAgo < 270) probability = 0.4;
    else probability = 0.2;
    
    // "Skipped Days This Month: 2" - ensure two days in the current month are zeros
    const isCurrentMonth = date.getMonth() === today.getMonth();
    const isSkippedDay = isCurrentMonth && (date.getDate() === 5 || date.getDate() === 15);
    
    if (isSkippedDay) {
      return {
        date: dateStr,
        count: 0
      };
    }
    
    return {
      date: dateStr,
      count: Math.random() < probability ? Math.floor(Math.random() * 8) + 1 : 0
    };
  });
};

// Open quests (incomplete topics)
const openQuests = [
  { id: 1, title: "Dynamic Programming Mastery", progress: 67, totalProblems: 30, solved: 20, difficulty: "Hard", xpReward: 2500, daysActive: 14 },
  { id: 2, title: "Graph Algorithms Deep Dive", progress: 42, totalProblems: 25, solved: 10, difficulty: "Medium", xpReward: 1800, daysActive: 8 },
  { id: 3, title: "Greedy Algorithms Conquest", progress: 15, totalProblems: 20, solved: 3, difficulty: "Medium", xpReward: 1500, daysActive: 5 },
];

// Timeline data
const timelineData = [
  { month: "Feb", problems: 42, accuracy: 64, rank: 3842 },
  { month: "Mar", problems: 68, accuracy: 70, rank: 2571 },
  { month: "Apr", problems: 95, accuracy: 75, rank: 1243 },
  { month: "May", problems: 120, accuracy: 78, rank: 875 },
  { month: "Jun", problems: 157, accuracy: 81, rank: 462 },
  { month: "Jul", problems: 192, accuracy: 87, rank: 219 },
];

const Profile: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [mood, setMood] = useState<'happy' | 'neutral' | 'sad' | null>(null);
  const [showMoodPrompt, setShowMoodPrompt] = useState(false);
  const [expandedBadge, setExpandedBadge] = useState<number | null>(null);
  const [heatmapData] = useState(generateHeatmapData());
  const [animateAI, setAnimateAI] = useState(false);
  
  const sectionRefs = {
    stats: useRef<HTMLDivElement>(null),
    skills: useRef<HTMLDivElement>(null),
    consistency: useRef<HTMLDivElement>(null),
    patterns: useRef<HTMLDivElement>(null),
    motivation: useRef<HTMLDivElement>(null),
  };
  
  // Chart configurations
  const skillRadarConfig = {
    data: {
      labels: ['Arrays', 'Strings', 'Hashing', 'Trees', 'Graphs', 'DP', 'Greedy', 'Sorting', 'Backtracking', 'Math'],
      datasets: [
        {
          label: 'Skill Level',
          data: [95, 82, 90, 75, 68, 60, 40, 85, 72, 78],
          backgroundColor: 'rgba(108, 92, 231, 0.2)',
          borderColor: themeColors.accent,
          borderWidth: 2,
          pointBackgroundColor: themeColors.accentLight,
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: themeColors.accent
        }
      ]
    },
    options: {
      scales: {
        r: {
          angleLines: {
            color: themeColors.gridLine
          },
          grid: {
            color: themeColors.gridLine
          },
          pointLabels: {
            color: themeColors.textSecondary
          },
          ticks: {
            backdropColor: 'transparent',
            color: themeColors.textSecondary
          }
        }
      },
      plugins: {
        legend: {
          display: false
        }
      }
    }
  };
  
  const timelineConfig = {
    data: {
      labels: timelineData.map(item => item.month),
      datasets: [
        {
          label: 'Problems Solved',
          data: timelineData.map(item => item.problems),
          fill: true,
          backgroundColor: 'rgba(108, 92, 231, 0.2)',
          borderColor: themeColors.accent,
          tension: 0.4
        },
        {
          label: 'Accuracy (%)',
          data: timelineData.map(item => item.accuracy),
          fill: false,
          borderColor: themeColors.success,
          tension: 0.4,
          yAxisID: 'y1'
        }
      ]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
          grid: {
            color: themeColors.gridLine
          },
          ticks: {
            color: themeColors.textSecondary
          }
        },
        y1: {
          beginAtZero: true,
          position: 'right',
          max: 100,
          grid: {
            drawOnChartArea: false
          },
          ticks: {
            color: themeColors.textSecondary
          }
        },
        x: {
          grid: {
            color: themeColors.gridLine
          },
          ticks: {
            color: themeColors.textSecondary
          }
        }
      }
    }
  };
  
  const skillDistributionConfig = {
    data: {
      labels: ['Arrays', 'Hashing', 'Recursion', 'DP', 'Graphs', 'Greedy', 'Others'],
      datasets: [
        {
          data: [25, 20, 18, 12, 10, 5, 10],
          backgroundColor: [
            '#6c5ce7',
            '#00d2d3',
            '#ff9f43',
            '#ff6b81',
            '#5f27cd',
            '#feca57',
            '#576574'
          ],
          borderWidth: 0
        }
      ]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'right',
          labels: {
            color: themeColors.textSecondary,
            padding: 15,
            font: {
              size: 11
            }
          }
        }
      }
    }
  };
  
  const consistencyBarConfig = {
    data: {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      datasets: [
        {
          label: 'Average Problems Solved',
          data: [4, 6, 8, 5, 9, 12, 14],
          backgroundColor: function(context: any) {
            const chart = context.chart;
            const {ctx, chartArea} = chart;
            if (!chartArea) {
              return;
            }
            const gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
            gradient.addColorStop(0, themeColors.chartGradient2);
            gradient.addColorStop(1, themeColors.chartGradient1);
            return gradient;
          },
          borderRadius: 6,
          borderWidth: 0
        }
      ]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
          grid: {
            color: themeColors.gridLine
          },
          ticks: {
            color: themeColors.textSecondary
          }
        },
        x: {
          grid: {
            display: false
          },
          ticks: {
            color: themeColors.textSecondary
          }
        }
      },
      plugins: {
        legend: {
          display: false
        }
      }
    }
  };
  
  useEffect(() => {
    // Simulate a system prompting for mood after "solving a problem"
    setTimeout(() => {
      setShowMoodPrompt(true);
    }, 3000);
    
    // Animate AI insights
    setTimeout(() => {
      setAnimateAI(true);
    }, 1500);
  }, []);
  
  // Scroll to section when activeSection changes
  useEffect(() => {
    if (activeSection && sectionRefs[activeSection as keyof typeof sectionRefs]?.current) {
      sectionRefs[activeSection as keyof typeof sectionRefs].current?.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  }, [activeSection]);
  
  // Record mood and hide prompt
  const handleMoodSelection = (selectedMood: 'happy' | 'neutral' | 'sad') => {
    setMood(selectedMood);
    setShowMoodPrompt(false);
    
    // Show a brief thank you message
    setTimeout(() => {
      // Logic for showing a brief thank you message would go here
    }, 500);
  };

  return (
    <div className="min-h-screen bg-[#0a0a12] text-white pt-4 pb-20 relative">
      {/* Ambient background elements */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-10 right-10 w-80 h-80 bg-[#6c5ce7] opacity-5 rounded-full filter blur-[100px]"></div>
        <div className="absolute bottom-40 left-20 w-96 h-96 bg-[#00d2d3] opacity-5 rounded-full filter blur-[120px]"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-[#12121e] rounded-2xl p-6 shadow-lg overflow-hidden relative mb-8"
            style={{ boxShadow: '0 4px 20px rgba(13, 13, 20, 0.7)' }}
          >
            {/* Glow effects */}
            <div className="absolute top-0 right-0 w-60 h-60 bg-[#6c5ce7] opacity-10 rounded-full filter blur-[80px] -z-10"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              {/* User info and avatar */}
              <div className="md:col-span-3 flex flex-col items-center md:items-start">
                <div className="relative">
                  <div className="w-28 h-28 bg-gradient-to-br from-[#8370ff] to-[#00d2d3] rounded-full flex items-center justify-center">
                    <span className="text-4xl font-bold">{CURRENT_USER.charAt(0)}</span>
                  </div>
                  {/* Level indicator */}
                  <div className="absolute -bottom-3 -right-3 bg-[#6c5ce7] text-white text-xs font-bold px-2 py-1 rounded-full border-2 border-[#12121e]">
                    LVL 42
                  </div>
                </div>
                
                <h1 className="text-2xl font-bold mt-4">{CURRENT_USER}</h1>
                <p className="text-[#a1a1b5] text-sm">Pattern Whisperer • Joined 2024</p>
                
                <div className="mt-4 flex flex-col space-y-2 w-full">
                  <div className="flex items-center justify-between bg-[#1a1a2e] p-2 rounded-md">
                    <span className="text-[#a1a1b5] text-xs flex items-center">
                      <Trophy className="w-3 h-3 mr-1" />
                      Rank
                    </span>
                    <span className="font-medium text-sm">#219 in Karnataka</span>
                  </div>
                  
                  <div className="flex items-center justify-between bg-[#1a1a2e] p-2 rounded-md">
                    <span className="text-[#a1a1b5] text-xs flex items-center">
                      <Star className="w-3 h-3 mr-1" />
                      Rating
                    </span>
                    <span className="font-medium text-sm">1860 ⚔️ (Top 9%)</span>
                  </div>
                  
                  <div className="flex items-center justify-between bg-[#1a1a2e] p-2 rounded-md">
                    <span className="text-[#a1a1b5] text-xs flex items-center">
                      <Zap className="w-3 h-3 mr-1" />
                      Streak
                    </span>
                    <span className="font-medium text-sm">11 days 🔥</span>
                  </div>
                </div>
              </div>
              
              {/* Stats overview */}
              <div className="md:col-span-9">
                {/* Current status banner - Zeigarnik Effect */}
                <div className="bg-gradient-to-r from-[#1a1a2e] to-[#1e1e30] p-4 rounded-xl mb-6">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                    <div>
                      <h3 className="text-lg font-medium">Your learning journey is 41% complete</h3>
                      <p className="text-[#a1a1b5] text-sm">3 open quests require your attention</p>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="mt-3 sm:mt-0 bg-[#6c5ce7] hover:bg-[#8370ff] text-white px-4 py-2 rounded-lg text-sm font-medium transition duration-150 ease-in-out flex items-center"
                    >
                      Continue Learning
                      <ChevronRight className="ml-1 w-4 h-4" />
                    </motion.button>
                  </div>
                </div>
                
                {/* Tabs for different views */}
                <div className="border-b border-[#1e1e30] mb-6">
                  <nav className="flex space-x-6">
                    <button
                      onClick={() => setActiveTab('overview')}
                      className={`pb-3 text-sm font-medium border-b-2 ${
                        activeTab === 'overview' 
                          ? 'border-[#6c5ce7] text-white' 
                          : 'border-transparent text-[#a1a1b5] hover:text-white'
                      } transition duration-150 ease-in-out`}
                    >
                      Overview
                    </button>
                    <button
                      onClick={() => setActiveTab('achievements')}
                      className={`pb-3 text-sm font-medium border-b-2 ${
                        activeTab === 'achievements' 
                          ? 'border-[#6c5ce7] text-white' 
                          : 'border-transparent text-[#a1a1b5] hover:text-white'
                      } transition duration-150 ease-in-out`}
                    >
                      Achievements
                    </button>
                    <button
                      onClick={() => setActiveTab('timeline')}
                      className={`pb-3 text-sm font-medium border-b-2 ${
                        activeTab === 'timeline' 
                          ? 'border-[#6c5ce7] text-white' 
                          : 'border-transparent text-[#a1a1b5] hover:text-white'
                      } transition duration-150 ease-in-out`}
                    >
                      Progress Timeline
                    </button>
                  </nav>
                </div>
                
                {/* Quick stats */}
                {activeTab === 'overview' && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 }}
                      className="bg-[#1a1a2e] p-4 rounded-xl"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[#a1a1b5] text-xs">Hard Problems</span>
                        <Award className="w-4 h-4 text-[#ffa801]" />
                      </div>
                      <p className="text-2xl font-bold">43 🔒</p>
                      <div className="mt-2 text-xs text-[#a1a1b5]">+8 this month</div>
                    </motion.div>
                    
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.2 }}
                      className="bg-[#1a1a2e] p-4 rounded-xl"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[#a1a1b5] text-xs">Daily XP</span>
                        <Zap className="w-4 h-4 text-[#00d2d3]" />
                      </div>
                      <p className="text-2xl font-bold">980</p>
                      <div className="mt-2 text-xs text-[#a1a1b5]">Avg. per day</div>
                    </motion.div>
                    
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.3 }}
                      className="bg-[#1a1a2e] p-4 rounded-xl"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[#a1a1b5] text-xs">Platform Time</span>
                        <Clock className="w-4 h-4 text-[#8370ff]" />
                      </div>
                      <p className="text-2xl font-bold">9h 42m</p>
                      <div className="mt-2 text-xs text-[#a1a1b5]">This week</div>
                    </motion.div>
                    
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.4 }}
                      className="bg-[#1a1a2e] p-4 rounded-xl"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[#a1a1b5] text-xs">Solve Speed</span>
                        <FastForward className="w-4 h-4 text-[#ff5e57]" />
                      </div>
                      <p className="text-2xl font-bold">4.7 min</p>
                      <div className="mt-2 text-xs text-[#a1a1b5]">Avg. per problem</div>
                    </motion.div>
                  </div>
                )}
                
                {activeTab === 'achievements' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {badges.map(badge => (
                      <motion.div
                        key={badge.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: badge.id * 0.05 }}
                        className={`relative p-4 rounded-xl cursor-pointer transition-all duration-300 ${
                          badge.earned 
                            ? 'bg-[#1a1a2e] hover:bg-[#1e1e30]' 
                            : 'bg-[#12121e] opacity-50'
                        }`}
                        onClick={() => setExpandedBadge(expandedBadge === badge.id ? null : badge.id)}
                      >
                        <div className="absolute top-0 right-0 mt-4 mr-4">
                          {badge.earned ? (
                            <CheckCircle className="w-4 h-4 text-[#00d2d3]" />
                          ) : (
                            <Lock className="w-4 h-4 text-[#a1a1b5]" />
                          )}
                        </div>
                        
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 ${
                          badge.earned 
                            ? 'bg-[#6c5ce7] bg-opacity-20' 
                            : 'bg-[#1e1e30]'
                        }`}>
                          <span className={badge.earned ? 'text-[#8370ff]' : 'text-[#a1a1b5]'}>
                            {badge.icon}
                          </span>
                        </div>
                        
                        <h3 className="text-sm font-medium">{badge.title}</h3>
                        {expandedBadge === badge.id && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <p className="text-xs text-[#a1a1b5] mt-2">{badge.description}</p>
                            {badge.earned && (
                              <p className="text-xs text-[#00d2d3] mt-2">Earned on {badge.date}</p>
                            )}
                          </motion.div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                )}
                
                {activeTab === 'timeline' && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="bg-[#1a1a2e] p-4 rounded-xl h-64"
                  >
                    <h3 className="text-sm font-medium mb-4">Your Growth Journey</h3>
                    <Line {...timelineConfig} />
                    <div className="mt-4 text-xs text-center text-[#a1a1b5]">
                      Your ranking improved by 3,623 positions in the last 6 months!
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Main Content Sections */}
        <div className="grid grid-cols-12 gap-6">
          {/* Navigation Sidebar */}
          <div className="col-span-12 md:col-span-3 space-y-4">
            {/* Open Quests (Zeigarnik Effect) */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="bg-[#12121e] rounded-2xl p-5 shadow-lg"
              style={{ boxShadow: '0 4px 20px rgba(13, 13, 20, 0.7)' }}
            >
              <h2 className="text-lg font-bold mb-4 flex items-center">
                <GitPullRequest className="w-5 h-5 mr-2 text-[#6c5ce7]" />
                Open Quests
              </h2>
              
              <div className="space-y-4">
                {openQuests.map(quest => (
                  <motion.div 
                    key={quest.id}
                    whileHover={{ y: -2 }}
                    className="bg-[#1a1a2e] rounded-xl p-4 cursor-pointer"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-sm font-medium">{quest.title}</h3>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        quest.difficulty === 'Hard' 
                          ? 'bg-[#ff5e57] bg-opacity-20 text-[#ff5e57]' 
                          : 'bg-[#ffa801] bg-opacity-20 text-[#ffa801]'
                      }`}>
                        {quest.difficulty}
                      </span>
                    </div>
                    
                    <div className="mb-3">
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-[#a1a1b5]">Progress</span>
                        <span>{quest.progress}%</span>
                      </div>
                      <div className="w-full bg-[#0f0f1a] h-1.5 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-[#6c5ce7] to-[#8370ff] rounded-full"
                          style={{ width: `${quest.progress}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div className="flex justify-between text-xs text-[#a1a1b5]">
                      <span>Solved: {quest.solved}/{quest.totalProblems}</span>
                      <span>+{quest.xpReward} XP</span>
                    </div>
                    
                    {/* Sunk Cost Fallacy trigger */}
                    <div className="mt-3 text-xs text-[#00d2d3]">
                      Active for {quest.daysActive} days • Don't lose progress!
                    </div>
                  </motion.div>
                ))}
              </div>
              
              {/* Endowed Progress Effect */}
              <div className="mt-6 bg-[#1a1a2e] rounded-xl p-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-sm font-medium">Overall DSA Mastery</h3>
                  <span className="text-sm font-bold text-[#00d2d3]">41%</span>
                </div>
                <div className="w-full bg-[#0f0f1a] h-2 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-[#00d2d3] to-[#6c5ce7] rounded-full"
                    style={{ width: '41%' }}
                  ></div>
                </div>
                <div className="mt-2 text-xs text-[#a1a1b5]">
                  <span className="text-[#00d2d3]">+3%</span> head start for completing your profile
                </div>
              </div>
            </motion.div>
            
            {/* AI Coach Insights */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="bg-[#12121e] rounded-2xl p-5 shadow-lg"
              style={{ boxShadow: '0 4px 20px rgba(13, 13, 20, 0.7)' }}
            >
              <h2 className="text-lg font-bold mb-4 flex items-center">
                <Brain className="w-5 h-5 mr-2 text-[#6c5ce7]" />
                AI Coach Insights
              </h2>
              
              <div className="space-y-3">
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: animateAI ? 1 : 0, y: animateAI ? 0 : 10 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                  className="bg-[#1a1a2e] rounded-xl p-3 border-l-2 border-[#00d2d3]"
                >
                  <div className="flex items-start">
                    <MessageCircle className="w-4 h-4 text-[#00d2d3] mt-1 mr-2" />
                    <p className="text-sm">You solve recursion problems <span className="text-[#00d2d3] font-bold">4.6x faster</span> than a month ago.</p>
                  </div>
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: animateAI ? 1 : 0, y: animateAI ? 0 : 10 }}
                  transition={{ duration: 0.4, delay: 0.4 }}
                  className="bg-[#1a1a2e] rounded-xl p-3 border-l-2 border-[#6c5ce7]"
                >
                  <div className="flex items-start">
                    <MessageCircle className="w-4 h-4 text-[#6c5ce7] mt-1 mr-2" />
                    <p className="text-sm">You outperformed <span className="text-[#6c5ce7] font-bold">93%</span> of users in Graphs this week.</p>
                  </div>
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: animateAI ? 1 : 0, y: animateAI ? 0 : 10 }}
                  transition={{ duration: 0.4, delay: 0.6 }}
                  className="bg-[#1a1a2e] rounded-xl p-3 border-l-2 border-[#ffa801]"
                >
                  <div className="flex items-start">
                    <MessageCircle className="w-4 h-4 text-[#ffa801] mt-1 mr-2" />
                    <p className="text-sm">You finish <span className="text-[#ffa801] font-bold">3/4</span> problems even when failing the first attempt.</p>
                  </div>
                </motion.div>
              </div>
              
              {/* Community benchmark */}
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: animateAI ? 1 : 0, y: animateAI ? 0 : 10 }}
                transition={{ duration: 0.4, delay: 0.8 }}
                className="mt-4 bg-gradient-to-r from-[#1a1a2e] to-[#1e1e30] rounded-xl p-4"
              >
                <h3 className="text-sm font-medium mb-2">Community Benchmark</h3>
                <p className="text-sm">You're in the <span className="text-[#00d2d3] font-bold">top 12%</span> of learners in Trees</p>
                <p className="text-xs text-[#a1a1b5] mt-1">One more problem and you pass 5000 users!</p>
                
                <div className="mt-3 w-full bg-[#0f0f1a] h-1.5 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-[#00d2d3] to-[#6c5ce7] rounded-full"
                    style={{ width: '88%' }}
                  ></div>
                </div>
              </motion.div>
            </motion.div>
            
            {/* Section Navigation */}
            <div className="hidden md:block sticky top-4">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.4 }}
                className="bg-[#12121e] rounded-2xl p-4 shadow-lg"
                style={{ boxShadow: '0 4px 20px rgba(13, 13, 20, 0.7)' }}
              >
                <h2 className="text-sm font-medium mb-3 text-[#a1a1b5]">Navigate Section</h2>
                <nav className="space-y-1">
                  <button 
                    onClick={() => setActiveSection('stats')}
                    className={`w-full px-3 py-2 text-sm rounded-lg flex items-center justify-between ${
                      activeSection === 'stats' 
                        ? 'bg-[#6c5ce7] bg-opacity-20 text-[#8370ff]' 
                        : 'text-[#a1a1b5] hover:bg-[#1a1a2e]'
                    }`}
                  >
                    <span className="flex items-center">
                      <Activity className="w-4 h-4 mr-2" />
                      Cognitive & Learning Stats
                    </span>
                    {activeSection === 'stats' && <ChevronRight className="w-4 h-4" />}
                  </button>
                  
                  <button 
                    onClick={() => setActiveSection('skills')}
                    className={`w-full px-3 py-2 text-sm rounded-lg flex items-center justify-between ${
                      activeSection === 'skills' 
                        ? 'bg-[#6c5ce7] bg-opacity-20 text-[#8370ff]' 
                        : 'text-[#a1a1b5] hover:bg-[#1a1a2e]'
                    }`}
                  >
                    <span className="flex items-center">
                      <PieChart className="w-4 h-4 mr-2" />
                      DSA Skill Breakdown
                    </span>
                    {activeSection === 'skills' && <ChevronRight className="w-4 h-4" />}
                  </button>
                  
                  <button 
                    onClick={() => setActiveSection('consistency')}
                    className={`w-full px-3 py-2 text-sm rounded-lg flex items-center justify-between ${
                      activeSection === 'consistency' 
                        ? 'bg-[#6c5ce7] bg-opacity-20 text-[#8370ff]' 
                        : 'text-[#a1a1b5] hover:bg-[#1a1a2e]'
                    }`}
                  >
                    <span className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2" />
                      Consistency Stats
                    </span>
                    {activeSection === 'consistency' && <ChevronRight className="w-4 h-4" />}
                  </button>
                  
                  <button 
                    onClick={() => setActiveSection('patterns')}
                    className={`w-full px-3 py-2 text-sm rounded-lg flex items-center justify-between ${
                      activeSection === 'patterns' 
                        ? 'bg-[#6c5ce7] bg-opacity-20 text-[#8370ff]' 
                        : 'text-[#a1a1b5] hover:bg-[#1a1a2e]'
                    }`}
                  >
                    <span className="flex items-center">
                      <GitBranch className="w-4 h-4 mr-2" />
                      Pattern Recognition
                    </span>
                    {activeSection === 'patterns' && <ChevronRight className="w-4 h-4" />}
                  </button>
                  
                  <button 
                    onClick={() => setActiveSection('motivation')}
                    className={`w-full px-3 py-2 text-sm rounded-lg flex items-center justify-between ${
                      activeSection === 'motivation' 
                        ? 'bg-[#6c5ce7] bg-opacity-20 text-[#8370ff]' 
                        : 'text-[#a1a1b5] hover:bg-[#1a1a2e]'
                    }`}
                  >
                    <span className="flex items-center">
                      <Target className="w-4 h-4 mr-2" />
                      Motivation & Competitive Edge
                    </span>
                    {activeSection === 'motivation' && <ChevronRight className="w-4 h-4" />}
                  </button>
                </nav>
                
                <div className="mt-4 p-3 bg-[#1a1a2e] rounded-lg">
                  <p className="text-xs text-[#a1a1b5]">
                    Current session: <span className="text-white">{CURRENT_DATE}</span>
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
          
          {/* Main Content Area */}
          <div className="col-span-12 md:col-span-9 space-y-6">
            {/* Cognitive & Learning Stats */}
            <motion.section
              ref={sectionRefs.stats}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-[#12121e] rounded-2xl p-6 shadow-lg"
              style={{ boxShadow: '0 4px 20px rgba(13, 13, 20, 0.7)' }}
            >
              <h2 className="text-xl font-bold mb-5 flex items-center">
                <Brain className="w-6 h-6 mr-2 text-[#6c5ce7]" />
                Cognitive & Learning Stats
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                <div className="bg-[#1a1a2e] rounded-xl p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-medium">Problem Solving Speed</h3>
                    <span className="text-xs bg-[#6c5ce7] bg-opacity-20 text-[#8370ff] px-2 py-1 rounded-full">
                      Top 15%
                    </span>
                  </div>
                  <p className="text-2xl font-bold">4.7 min <span className="text-sm font-normal text-[#a1a1b5]">/ problem</span></p>
                  <p className="text-xs text-[#a1a1b5] mt-1">🧠 Faster than last month by 0.3 min</p>
                </div>
                
                <div className="bg-[#1a1a2e] rounded-xl p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-medium">Time of Peak Focus</h3>
                    <Moon className="w-4 h-4 text-[#8370ff]" />
                  </div>
                  <p className="text-2xl font-bold">11:43 PM</p>
                  <p className="text-xs text-[#a1a1b5] mt-1">you little night owl</p>
                </div>
                
                <div className="bg-[#1a1a2e] rounded-xl p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-medium">Flow State</h3>
                    <Zap className="w-4 h-4 text-[#00d2d3]" />
                  </div>
                  <p className="text-2xl font-bold">7 <span className="text-sm font-normal text-[#a1a1b5]">consecutive solves</span></p>
                  <p className="text-xs text-[#a1a1b5] mt-1">Max achieved in one session</p>
                </div>
                
                <div className="bg-[#1a1a2e] rounded-xl p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-medium">Attention Recovery</h3>
                    <RotateCcw className="w-4 h-4 text-[#ffa801]" />
                  </div>
                  <p className="text-2xl font-bold">3.2 min</p>
                  <p className="text-xs text-[#a1a1b5] mt-1">After hint viewed</p>
                </div>
                
                <div className="bg-[#1a1a2e] rounded-xl p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-medium">Mental Fatigue Score</h3>
                    <Activity className="w-4 h-4 text-[#ff5e57]" />
                  </div>
                  <p className="text-2xl font-bold">6.2<span className="text-sm font-normal text-[#a1a1b5]">/10</span></p>
                  <p className="text-xs text-[#a1a1b5] mt-1">Post-session average</p>
                </div>
                
                <div className="bg-[#1a1a2e] rounded-xl p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-medium">Retry Before Success</h3>
                    <RefreshCw className="w-4 h-4 text-[#00d2d3]" />
                  </div>
                  <p className="text-2xl font-bold">2.3 <span className="text-sm font-normal text-[#a1a1b5]">attempts</span></p>
                  <p className="text-xs text-[#a1a1b5] mt-1">27% better than average</p>
                </div>
              </div>
              
              {/* Custom metric */}
              <div className="mt-6 bg-gradient-to-r from-[#1a1a2e] to-[#1e1e30] rounded-xl p-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between">
                  <div>
                    <h3 className="text-sm font-bold">Break-to-Focus Ratio: 1:5</h3>
                    <p className="text-xs text-[#a1a1b5] mt-1">For every 10min break, you focus effectively for 50min</p>
                  </div>
                  <div className="mt-3 md:mt-0 flex space-x-1 items-center">
                    <div className="w-2 h-8 rounded-sm bg-[#a1a1b5]"></div>
                    <div className="w-2 h-8 rounded-sm bg-[#6c5ce7]"></div>
                    <div className="w-2 h-8 rounded-sm bg-[#6c5ce7]"></div>
                    <div className="w-2 h-8 rounded-sm bg-[#6c5ce7]"></div>
                    <div className="w-2 h-8 rounded-sm bg-[#6c5ce7]"></div>
                    <div className="w-2 h-8 rounded-sm bg-[#6c5ce7]"></div>
                  </div>
                </div>
              </div>
            </motion.section>
            
            {/* DSA Skill Breakdown */}
            <motion.section
              ref={sectionRefs.skills}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-[#12121e] rounded-2xl p-6 shadow-lg"
              style={{ boxShadow: '0 4px 20px rgba(13, 13, 20, 0.7)' }}
            >
              <h2 className="text-xl font-bold mb-5 flex items-center">
                <PieChart className="w-6 h-6 mr-2 text-[#6c5ce7]" />
                DSA Skill Breakdown
              </h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-[#1a1a2e] rounded-xl p-4">
                  <h3 className="text-sm font-medium mb-3">Skill Distribution</h3>
                  <div className="h-64">
                    <Doughnut {...skillDistributionConfig} />
                  </div>
                </div>
                
                <div className="bg-[#1a1a2e] rounded-xl p-4">
                  <h3 className="text-sm font-medium mb-3">Skill Levels</h3>
                  <div className="h-64">
                    <Radar {...skillRadarConfig} />
                  </div>
                </div>
              </div>
              
              {/* Skill categories */}
              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-[#1a1a2e] rounded-xl p-4 border-l-4 border-[#00d2d3]">
                  <h3 className="text-sm font-medium mb-2">Mastered Topics</h3>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-[#00d2d3] bg-opacity-20 text-[#00d2d3] text-xs px-2 py-1 rounded-full">Arrays</span>
                    <span className="bg-[#00d2d3] bg-opacity-20 text-[#00d2d3] text-xs px-2 py-1 rounded-full">Hashing</span>
                    <span className="bg-[#00d2d3] bg-opacity-20 text-[#00d2d3] text-xs px-2 py-1 rounded-full">Recursion</span>
                  </div>
                </div>
                
                <div className="bg-[#1a1a2e] rounded-xl p-4 border-l-4 border-[#6c5ce7]">
                  <h3 className="text-sm font-medium mb-2">In-Progress</h3>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-[#6c5ce7] bg-opacity-20 text-[#8370ff] text-xs px-2 py-1 rounded-full">DP</span>
                    <span className="bg-[#6c5ce7] bg-opacity-20 text-[#8370ff] text-xs px-2 py-1 rounded-full">Graphs</span>
                  </div>
                </div>
                
                <div className="bg-[#1a1a2e] rounded-xl p-4 border-l-4 border-[#ff5e57]">
                  <h3 className="text-sm font-medium mb-2">Weak Zones (based on fail rate)</h3>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-[#ff5e57] bg-opacity-20 text-[#ff5e57] text-xs px-2 py-1 rounded-full">Greedy (why tho?)</span>
                  </div>
                </div>
              </div>
              
              {/* Contest stats */}
              <div className="mt-6 bg-gradient-to-r from-[#1a1a2e] to-[#1e1e30] rounded-xl p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <div className="flex items-center">
                      <Award className="w-5 h-5 text-[#ffa801] mr-2" />
                      <h3 className="text-sm font-bold">Contest Rating: 1860 ⚔️</h3>
                    </div>
                    <p className="text-xs text-[#a1a1b5] mt-1 ml-7">Top 9% globally</p>
                  </div>
                  
                  <div>
                    <div className="flex items-center">
                      <Lock className="w-5 h-5 text-[#00d2d3] mr-2" />
                      <h3 className="text-sm font-bold">Hard Problems Solved: 43 🔒</h3>
                    </div>
                    <p className="text-xs text-[#a1a1b5] mt-1 ml-7">+23% from last quarter</p>
                  </div>
                </div>
              </div>
            </motion.section>
            
            {/* Consistency Stats */}
            <motion.section
              ref={sectionRefs.consistency}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-[#12121e] rounded-2xl p-6 shadow-lg"
              style={{ boxShadow: '0 4px 20px rgba(13, 13, 20, 0.7)' }}
            >
              <h2 className="text-xl font-bold mb-5 flex items-center">
                <Calendar className="w-6 h-6 mr-2 text-[#6c5ce7]" />
                Consistency Stats
              </h2>
              
              {/* Contribution heatmap */}
              <div className="bg-[#1a1a2e] rounded-xl p-4 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-medium">Daily Activity</h3>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-[#a1a1b5]">Less</span>
                    <div className="flex space-x-1">
                      <div className="w-3 h-3 bg-[#1e1e30] rounded-sm"></div>
                      <div className="w-3 h-3 bg-[#6c5ce7] bg-opacity-20 rounded-sm"></div>
                      <div className="w-3 h-3 bg-[#6c5ce7] bg-opacity-40 rounded-sm"></div>
                      <div className="w-3 h-3 bg-[#6c5ce7] bg-opacity-60 rounded-sm"></div>
                      <div className="w-3 h-3 bg-[#6c5ce7] rounded-sm"></div>
                    </div>
                    <span className="text-xs text-[#a1a1b5]">More</span>
                  </div>
                </div>
                
                <div className="heatmap-container">
                  <CalendarHeatmap
                    startDate={subDays(new Date(CURRENT_DATE), 364)}
                    endDate={new Date(CURRENT_DATE)}
                    values={heatmapData}
                    classForValue={(value) => {
                      if (!value || value.count === 0) {
                        return 'color-empty';
                      }
                      if (value.count < 3) {
                        return 'color-scale-1';
                      } else if (value.count < 6) {
                        return 'color-scale-2';
                      } else if (value.count < 9) {
                        return 'color-scale-3';
                      } else {
                        return 'color-scale-4';
                      }
                    }}
                  />
                </div>
                
                <div className="mt-3 flex justify-between text-xs text-[#a1a1b5]">
                  <div>
                    <span className="text-[#00d2d3] font-medium">Current Streak: 11 days 🔥</span>
                  </div>
                  <div>
                    Best Streak: <span className="font-medium">34 days</span> (someone was possessed)
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-[#1a1a2e] rounded-xl p-4">
                  <h3 className="text-sm font-medium mb-3">Weekly Activity Pattern</h3>
                  <div className="h-64">
                    <Bar {...consistencyBarConfig} />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-[#1a1a2e] rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-sm font-medium">Daily Average XP</h3>
                      <span className="text-[#00d2d3] font-bold">980</span>
                    </div>
                    <div className="w-full bg-[#0f0f1a] h-2 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-[#00d2d3] to-[#6c5ce7] rounded-full"
                        style={{ width: '88%' }}
                      ></div>
                    </div>
                    <p className="text-xs text-[#a1a1b5] mt-2">Top 12% in your cohort</p>
                  </div>
                  
                  <div className="bg-[#1a1a2e] rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-sm font-medium">Most Problems in a Day</h3>
                      <span className="text-[#ffa801] font-bold">27 problems 💀</span>
                    </div>
                    <p className="text-xs text-[#a1a1b5]">That was a wild day</p>
                  </div>
                  
                  <div className="bg-[#1a1a2e] rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-sm font-medium">Platform Time This Week</h3>
                      <span className="text-[#8370ff] font-bold">9h 42m</span>
                    </div>
                    <div className="w-full bg-[#0f0f1a] h-2 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-[#6c5ce7] to-[#8370ff] rounded-full"
                        style={{ width: '70%' }}
                      ></div>
                    </div>
                    <p className="text-xs text-[#a1a1b5] mt-2">+2h 15m from last week</p>
                  </div>
                  
                  <div className="bg-[#1a1a2e] rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-sm font-medium">Skipped Days This Month</h3>
                      <span className="text-[#ff5e57] font-bold">2 (guilty)</span>
                    </div>
                    <p className="text-xs text-[#a1a1b5]">Better than 78% of users</p>
                  </div>
                </div>
              </div>
              
              {/* Late night productivity */}
              <div className="mt-6 bg-gradient-to-r from-[#1a1a2e] to-[#1e1e30] rounded-xl p-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <Moon className="w-5 h-5 text-[#ffa801] mr-2" />
                    <h3 className="text-sm font-bold">Late-Night Grind Sessions: 14</h3>
                  </div>
                  <div className="text-xs px-2 py-1 rounded-full bg-[#ffa801] bg-opacity-20 text-[#ffa801]">
                    Night Owl Badge
                  </div>
                </div>
                <p className="text-xs text-[#a1a1b5] mt-1 ml-7">You're 3.2x more productive after 10 PM</p>
              </div>
            </motion.section>
            
            {/* Pattern Recognition Metrics */}
            <motion.section
              ref={sectionRefs.patterns}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-[#12121e] rounded-2xl p-6 shadow-lg"
              style={{ boxShadow: '0 4px 20px rgba(13, 13, 20, 0.7)' }}
            >
              <h2 className="text-xl font-bold mb-5 flex items-center">
                <GitBranch className="w-6 h-6 mr-2 text-[#6c5ce7]" />
                Pattern Recognition Metrics
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="bg-[#1a1a2e] rounded-xl p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-medium">Binary Search Accuracy</h3>
                    <Anchor className="w-4 h-4 text-[#00d2d3]" />
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-14 h-14 rounded-full flex items-center justify-center bg-[#00d2d3] bg-opacity-20 text-[#00d2d3] font-bold">
                      96%
                    </div>
                    <div>
                      <div className="w-full bg-[#0f0f1a] h-1.5 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-[#00d2d3] rounded-full"
                          style={{ width: '96%' }}
                        ></div>
                      </div>
                      <p className="text-xs text-[#a1a1b5] mt-1">32/33 correct implementations</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-[#1a1a2e] rounded-xl p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-medium">DP Recurrence Identification</h3>
                    <Droplet className="w-4 h-4 text-[#8370ff]" />
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-14 h-14 rounded-full flex items-center justify-center bg-[#6c5ce7] bg-opacity-20 text-[#8370ff] font-bold">
                      72%
                    </div>
                    <div>
                      <div className="w-full bg-[#0f0f1a] h-1.5 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-[#8370ff] rounded-full"
                          style={{ width: '72%' }}
                        ></div>
                      </div>
                      <p className="text-xs text-[#a1a1b5] mt-1">+12% in last 30 days</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-[#1a1a2e] rounded-xl p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-medium">Graph Cycle Detection Recall</h3>
                    <GitBranch className="w-4 h-4 text-[#ffa801]" />
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-14 h-14 rounded-full flex items-center justify-center bg-[#ffa801] bg-opacity-20 text-[#ffa801] font-bold">
                      81%
                    </div>
                    <div>
                      <div className="w-full bg-[#0f0f1a] h-1.5 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-[#ffa801] rounded-full"
                          style={{ width: '81%' }}
                        ></div>
                      </div>
                      <p className="text-xs text-[#a1a1b5] mt-1">17/21 correct identifications</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-[#1a1a2e] rounded-xl p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-medium">Sliding Window</h3>
                    <div className="flex items-center">
                      <span className="text-xs text-[#00d2d3] font-medium mr-2">1.7 avg</span>
                      <RefreshCw className="w-4 h-4 text-[#00d2d3]" />
                    </div>
                  </div>
                  <div className="w-full bg-[#0f0f1a] h-6 rounded-lg overflow-hidden">
                    <div 
                      className="h-full flex items-center pl-2 text-xs font-medium bg-gradient-to-r from-[#00d2d3] to-[#38b2ac]"
                      style={{ width: '85%' }}
                    >
                      Attempts Before Success
                    </div>
                  </div>
                  <p className="text-xs text-[#a1a1b5] mt-2">15% faster than platform average</p>
                </div>
                
                <div className="bg-[#1a1a2e] rounded-xl p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-medium">Backtracking Tree Depth</h3>
                    <div className="flex items-center">
                      <span className="text-xs text-[#8370ff] font-medium mr-2">depth 8</span>
                      <GitBranch className="w-4 h-4 text-[#8370ff]" />
                    </div>
                  </div>
                  <div className="w-full bg-[#0f0f1a] h-6 rounded-lg overflow-hidden">
                    <div 
                      className="h-full flex items-center pl-2 text-xs font-medium bg-gradient-to-r from-[#6c5ce7] to-[#8370ff]"
                      style={{ width: '80%' }}
                    >
                      Max Depth Handling
                    </div>
                  </div>
                  <p className="text-xs text-[#a1a1b5] mt-2">Top 17% in complexity handling</p>
                </div>
                
                <div className="bg-[#1a1a2e] rounded-xl p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-medium">Pattern Efficiency</h3>
                    <TrendingUp className="w-4 h-4 text-[#00d2d3]" />
                  </div>
                  <p className="text-xl font-bold">18% faster</p>
                  <p className="text-xs text-[#a1a1b5] mt-1">Than community average</p>
                  <div className="mt-2 flex items-center">
                    <div className="w-2 h-10 bg-[#1e1e30] rounded-l-sm"></div>
                    <div className="w-10 h-10 bg-[#a1a1b5] flex items-center justify-center text-xs">
                      Avg
                    </div>
                    <div className="w-2 h-10 bg-[#00d2d3] rounded-r-sm"></div>
                    <div className="w-2 h-10 bg-[#00d2d3] rounded-none"></div>
                    <div className="w-10 h-10 bg-[#00d2d3] bg-opacity-70 flex items-center justify-center text-xs">
                      You
                    </div>
                    <div className="w-2 h-10 bg-[#00d2d3] rounded-r-sm"></div>
                  </div>
                </div>
              </div>
              
              {/* Pattern recognition trophy */}
              <div className="mt-6 bg-gradient-to-r from-[#1a1a2e] to-[#1e1e30] rounded-xl p-4">
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-[#6c5ce7] bg-opacity-20 flex items-center justify-center mr-4">
                    <Award className="w-6 h-6 text-[#8370ff]" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold mb-1">Pattern Whisperer Status Achieved</h3>
                    <p className="text-xs text-[#a1a1b5]">Your ability to identify patterns is in the top 7% of all users</p>
                  </div>
                </div>
              </div>
            </motion.section>
            
            {/* Motivation & Competitive Edge */}
            <motion.section
              ref={sectionRefs.motivation}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-[#12121e] rounded-2xl p-6 shadow-lg"
              style={{ boxShadow: '0 4px 20px rgba(13, 13, 20, 0.7)' }}
            >
              <h2 className="text-xl font-bold mb-5 flex items-center">
                <Target className="w-6 h-6 mr-2 text-[#6c5ce7]" />
                Motivation & Competitive Edge
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-[#1a1a2e] rounded-xl p-4">
                  <div className="flex items-start">
                    <div className="w-10 h-10 rounded-full bg-[#6c5ce7] bg-opacity-20 flex items-center justify-center mr-3 mt-1">
                      <TrendingUp className="w-5 h-5 text-[#8370ff]" />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium mb-1">User Rank</h3>
                      <p className="text-2xl font-bold">#219</p>
                      <p className="text-xs text-[#a1a1b5]">in Karnataka</p>
                    </div>
                  </div>
                  <div className="mt-3 w-full bg-[#0f0f1a] h-1.5 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-[#6c5ce7] to-[#8370ff] rounded-full"
                      style={{ width: '91%' }}
                    ></div>
                  </div>
                  <p className="text-xs text-[#a1a1b5] mt-1">Top 9% of all users</p>
                </div>
                
                <div className="bg-[#1a1a2e] rounded-xl p-4">
                  <div className="flex items-start">
                    <div className="w-10 h-10 rounded-full bg-[#00d2d3] bg-opacity-20 flex items-center justify-center mr-3 mt-1">
                      <Zap className="w-5 h-5 text-[#00d2d3]" />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium mb-1">XP Gained</h3>
                      <p className="text-2xl font-bold">+6,440</p>
                      <p className="text-xs text-[#a1a1b5]">Past 7 days</p>
                    </div>
                  </div>
                  <div className="mt-3 w-full bg-[#0f0f1a] h-1.5 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-[#00d2d3] to-[#38b2ac] rounded-full"
                      style={{ width: '76%' }}
                    ></div>
                  </div>
                  <p className="text-xs text-[#00d2d3] mt-1">+22% from previous week</p>
                </div>
                
                <div className="bg-[#1a1a2e] rounded-xl p-4">
                  <div className="flex items-start">
                    <div className="w-10 h-10 rounded-full bg-[#ffa801] bg-opacity-20 flex items-center justify-center mr-3 mt-1">
                      <Moon className="w-5 h-5 text-[#ffa801]" />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium mb-1">Late-Night Grind</h3>
                      <p className="text-2xl font-bold">14</p>
                      <p className="text-xs text-[#a1a1b5]">sessions this month</p>
                    </div>
                  </div>
                  <div className="mt-3 w-full bg-[#0f0f1a] h-1.5 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-[#ffa801] to-[#ff9f43] rounded-full"
                      style={{ width: '82%' }}
                    ></div>
                  </div>
                  <p className="text-xs text-[#a1a1b5] mt-1">Top 8% of night owls</p>
                </div>
              </div>
              
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-[#1a1a2e] rounded-xl p-4">
                  <h3 className="text-sm font-medium mb-3">One-More-Problem Triggers</h3>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-3xl font-bold text-[#00d2d3]">73</p>
                      <p className="text-xs text-[#a1a1b5]">times this month</p>
                    </div>
                    <div className="w-24 h-24">
                      <div className="w-full h-full rounded-full border-8 border-[#00d2d3] border-opacity-20 flex items-center justify-center relative">
                        <div className="absolute inset-0 rounded-full border-t-8 border-r-8 border-[#00d2d3]" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 0)' }}></div>
                        <div className="text-xs font-medium">73/80</div>
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-[#a1a1b5] mt-2">Each "one more" adds avg. 320 XP to your daily total</p>
                </div>
                
                <div className="bg-[#1a1a2e] rounded-xl p-4">
                  <h3 className="text-sm font-medium mb-3">Community Benchmark</h3>
                  <div className="flex flex-col space-y-3">
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span>Recursion</span>
                        <span className="text-[#00d2d3]">4.6x faster</span>
                      </div>
                      <div className="w-full bg-[#0f0f1a] h-1.5 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-[#00d2d3] rounded-full"
                          style={{ width: '90%' }}
                        ></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span>Graphs</span>
                        <span className="text-[#6c5ce7]">Top 7%</span>
                      </div>
                      <div className="w-full bg-[#0f0f1a] h-1.5 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-[#6c5ce7] rounded-full"
                          style={{ width: '93%' }}
                        ></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span>Problem Completion</span>
                        <span className="text-[#ffa801]">75% vs 62% avg</span>
                      </div>
                      <div className="w-full bg-[#0f0f1a] h-1.5 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-[#ffa801] rounded-full"
                          style={{ width: '75%' }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Success rate info */}
              <div className="mt-6 bg-gradient-to-r from-[#1a1a2e] to-[#1e1e30] rounded-xl p-4">
                <div className="flex flex-col md:flex-row justify-between">
                  <div className="mb-4 md:mb-0">
                    <h3 className="text-sm font-bold mb-2 flex items-center">
                      <Award className="w-4 h-4 mr-2 text-[#00d2d3]" />
                      "You finish 3/4 problems even when failing the first attempt."
                    </h3>
                    <p className="text-xs text-[#a1a1b5] ml-6">Your persistence is in the top 15% of all users</p>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="flex flex-col items-center mr-6">
                      <div className="w-16 h-3 bg-[#ff5e57] rounded-t-sm"></div>
                      <div className="w-16 h-16 bg-[#1e1e30] flex items-center justify-center text-sm">1st</div>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="w-16 h-12 bg-[#00d2d3] rounded-t-sm"></div>
                      <div className="w-16 h-16 bg-[#1e1e30] flex items-center justify-center text-sm">Later</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.section>
          </div>
        </div>
      </div>
      
      {/* Mood Prompt */}
      <AnimatePresence>
        {showMoodPrompt && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-6 right-6 bg-[#1a1a2e] rounded-xl p-4 shadow-lg border border-[#6c5ce7] max-w-sm"
            style={{ boxShadow: '0 4px 20px rgba(13, 13, 20, 0.7)' }}
          >
            <h3 className="text-sm font-medium mb-3">How do you feel after today's session?</h3>
            <p className="text-xs text-[#a1a1b5] mb-4">Tracking your mood helps us understand your optimal learning state.</p>
            
            <div className="flex justify-between">
              <button 
                onClick={() => handleMoodSelection('happy')}
                className="flex flex-col items-center p-2 hover:bg-[#1e1e30] rounded-lg transition-colors"
              >
                <Smile className="w-8 h-8 text-[#00d2d3] mb-1" />
                <span className="text-xs">Energized</span>
              </button>
              
              <button 
                onClick={() => handleMoodSelection('neutral')}
                className="flex flex-col items-center p-2 hover:bg-[#1e1e30] rounded-lg transition-colors"
              >
                <Meh className="w-8 h-8 text-[#ffa801] mb-1" />
                <span className="text-xs">Neutral</span>
              </button>
              
              <button 
                onClick={() => handleMoodSelection('sad')}
                className="flex flex-col items-center p-2 hover:bg-[#1e1e30] rounded-lg transition-colors"
              >
                <Frown className="w-8 h-8 text-[#ff5e57] mb-1" />
                <span className="text-xs">Drained</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Current session info - updated with exact time provided */}
      <div className="fixed bottom-4 left-4 text-xs text-[#a1a1b5]">
        <p>Current user: {CURRENT_USER} | {CURRENT_DATE}</p>
      </div>
    </div>
  );
};

export default Profile;