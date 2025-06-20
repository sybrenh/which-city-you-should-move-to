import React from 'react';
import { DecisionNode } from '../types';
import { ChevronRight } from 'lucide-react';

interface QuestionCardProps {
  node: DecisionNode;
  onAnswer: (nextId: string) => void;
  isAnimating: boolean;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({ node, onAnswer, isAnimating }) => {
  return (
    <div className={`
      transform transition-all duration-700 ease-out
      ${isAnimating ? 'scale-95 opacity-50' : 'scale-100 opacity-100'}
    `}>
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-4 leading-tight">
            {node.question}
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mx-auto"></div>
        </div>
        
        <div className="space-y-4">
          {node.options?.map((option, index) => (
            <button
              key={option.nextId}
              onClick={() => onAnswer(option.nextId)}
              disabled={isAnimating}
              className={`
                w-full text-left p-6 rounded-xl border-2 border-gray-200 
                hover:border-blue-400 hover:bg-blue-50 
                transition-all duration-300 ease-out
                transform hover:scale-[1.02] hover:shadow-lg
                disabled:opacity-50 disabled:cursor-not-allowed
                ${isAnimating ? 'pointer-events-none' : ''}
                group
              `}
              style={{ 
                animationDelay: `${index * 100}ms`,
                animation: isAnimating ? 'none' : 'slideInUp 0.6s ease-out forwards'
              }}
            >
              <div className="flex items-center justify-between">
                <span className="text-lg font-medium text-gray-700 group-hover:text-blue-700">
                  {option.text}
                </span>
                <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors" />
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};