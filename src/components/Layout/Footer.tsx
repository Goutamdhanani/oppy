import React from 'react';
import { Heart, Github, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-200 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <div className="flex items-center">
              <span className="text-xl mr-2">🎮</span>
              <span className="font-bold">DSA Learning Tree</span>
            </div>
            <p className="text-sm text-gray-600 mt-1">
              Learn Data Structures and Algorithms through interactive visualizations
            </p>
          </div>
          
          <div className="flex space-x-8">
            <div>
              <h4 className="font-medium mb-2">Resources</h4>
              <ul className="space-y-1">
                <li>
                  <a href="#" className="text-sm text-gray-600 hover:text-indigo-600">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-gray-600 hover:text-indigo-600">
                    Tutorials
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-gray-600 hover:text-indigo-600">
                    FAQ
                  </a>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium mb-2">Connect</h4>
              <ul className="space-y-1">
                <li>
                  <a href="#" className="text-sm text-gray-600 hover:text-indigo-600 flex items-center">
                    <Github className="w-4 h-4 mr-1" />
                    GitHub
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-gray-600 hover:text-indigo-600 flex items-center">
                    <Twitter className="w-4 h-4 mr-1" />
                    Twitter
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-100 text-center text-sm text-gray-600">
          <p className="flex items-center justify-center">
            Made with <Heart className="w-4 h-4 mx-1 text-red-500" /> for DSA enthusiasts
          </p>
          <p className="mt-1">&copy; {new Date().getFullYear()} DSA Learning Tree. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;