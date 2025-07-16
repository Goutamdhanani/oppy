import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import AlgorithmVisualizerComponent from '../components/Visualizer/AlgorithmVisualizer';
import { algorithmsData, Algorithm } from '../data/algorithms';

const AlgorithmVisualizer: React.FC = () => {
  const { algorithmId } = useParams<{ algorithmId: string }>();
  const navigate = useNavigate();
  const [algorithm, setAlgorithm] = useState<Algorithm | null>(null);
  
  useEffect(() => {
    if (algorithmId) {
      const foundAlgorithm = algorithmsData.find((a) => a.id === algorithmId);
      if (foundAlgorithm) {
        setAlgorithm(foundAlgorithm);
      } else {
        navigate('/');
      }
    }
}, [algorithmId, navigate]);
  
if (!algorithm) {
  return <div className="text-center py-8">Loading algorithm data...</div>;
}

return (
  <div>
    <div className="flex items-center mb-8">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-gray-600 hover:text-gray-900"
      >
        <ChevronLeft className="w-5 h-5 mr-1" />
        Back
      </button>
    </div>
    
    <div className="mb-8">
      <h1 className="text-3xl font-bold mb-2">{algorithm.title}</h1>
      <p className="text-gray-600">{algorithm.description}</p>
      
      <div className="flex flex-wrap gap-4 mt-4">
        <div className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-sm">
          {algorithm.category}
        </div>
        <div className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm">
          Time: {algorithm.timeComplexity}
        </div>
        <div className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm">
          Space: {algorithm.spaceComplexity}
        </div>
      </div>
    </div>
    
    <AlgorithmVisualizerComponent
      algorithmId={algorithm.id}
      code={algorithm.implementation}
      initialData={[5, 2, 8, 1, 9, 3]}
    />
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-bold mb-4">Pseudocode</h2>
        <pre className="bg-gray-50 p-4 rounded-lg overflow-auto text-sm">
          {algorithm.pseudocode}
        </pre>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-bold mb-4">Key Insights</h2>
        <div className="space-y-3">
          <p className="text-gray-700">
            Understanding the {algorithm.title} algorithm is crucial for mastering the {algorithm.category} data structure.
          </p>
          <p className="text-gray-700">
            The time complexity is {algorithm.timeComplexity}, making it efficient for {
              algorithm.timeComplexity === 'O(1)' 
                ? 'constant-time operations regardless of input size' 
                : algorithm.timeComplexity === 'O(n)' 
                  ? 'linear processing of all elements' 
                  : algorithm.timeComplexity === 'O(log n)' 
                    ? 'divide-and-conquer approaches on sorted data'
                    : 'specific use cases'
            }.
          </p>
          <p className="text-gray-700">
            Try experimenting with different inputs in the visualizer to better understand how the algorithm behaves.
          </p>
        </div>
      </div>
    </div>
  </div>
);
};

export default AlgorithmVisualizer;