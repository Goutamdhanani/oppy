import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import Dashboard from './pages/Dashboard';
import TopicDetail from './pages/TopicDetail';
import AlgorithmVisualizer from './pages/AlgorithmVisualizer';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';
import { ProgressProvider } from './context/ProgressContext';
import { GamificationProvider } from './context/GamificationContext';
import './components/Visualizer/visualizer.css';

const App: React.FC = () => {
  return (
    <ProgressProvider>
      <GamificationProvider>
        <Router>
          <div className="flex flex-col min-h-screen bg-gray-50">
            <Toaster position="top-right" />
            <Header />
            <main className="flex-grow container mx-auto px-4 py-8">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/topic/:topicId" element={<TopicDetail />} />
                <Route path="/topic/:topicId/:subtopicId" element={<TopicDetail />} />
                <Route path="/visualize/:algorithmId" element={<AlgorithmVisualizer />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </GamificationProvider>
    </ProgressProvider>
  );
};

export default App;