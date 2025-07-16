import React, { useEffect, useRef } from 'react';
import Prism from 'prismjs';
import 'prismjs/themes/prism.css';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-python';

interface CodePanelProps {
  code: string;
  highlightedLine: number | null;
  language?: string;
}

const CodePanel: React.FC<CodePanelProps> = ({ 
  code, 
  highlightedLine, 
  language = 'javascript' 
}) => {
  const preRef = useRef<HTMLPreElement>(null);
  
  useEffect(() => {
    if (preRef.current) {
      Prism.highlightElement(preRef.current);
    }
  }, [code, language]);
  
  const codeLines = code.split('\n');
  
  return (
    <div className="overflow-auto max-h-[400px] rounded-lg text-sm">
      <pre ref={preRef} className="language-javascript rounded-lg p-4 bg-white">
        <code>
          {codeLines.map((line, index) => (
            <div
              key={index}
              className={`${
                highlightedLine === index + 1
                  ? 'bg-indigo-100 -mx-4 px-4'
                  : ''
              }`}
            >
              {line}
            </div>
          ))}
        </code>
      </pre>
    </div>
  );
};

export default CodePanel;