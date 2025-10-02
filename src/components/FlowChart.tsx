import React, { useRef, useEffect } from 'react';
import { DecisionNode } from '../types';
import { decisionTree } from '../data/cities';
import { ArrowRight, MapPin, RotateCcw, ArrowLeft, Home } from 'lucide-react';

interface FlowChartProps {
  currentNodeId: string;
  path: string[];
  onNavigate: (nodeId: string) => void;
  onRestart: () => void;
}

export const FlowChart: React.FC<FlowChartProps> = ({
  currentNodeId,
  path,
  onNavigate,
  onRestart
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const currentNode = decisionTree[currentNodeId];
  
  // Get parent node for back navigation
  const canGoBack = path.length > 1;
  const parentNodeId = canGoBack ? path[path.length - 2] : null;

  // Add emojis to options based on content
  const addEmojiToOption = (text: string): string => {
    const emojiMap: Record<string, string> = {
      // Weather preferences
      'mild': '🌤️',
      'cool': '🌥️', 
      'cold': '❄️',
      'warm': '☀️',
      'freezing': '🥶',
      
      // City sizes
      'large': '🏙️',
      'medium': '🏘️',
      'small': '🏡',
      'metropolitan': '🌆',
      
      // Activities
      'beach': '🏖️',
      'water sports': '🏄‍♂️',
      'urban': '🚶‍♂️',
      'parks': '🌳',
      'desert': '🏜️',
      'hiking': '🥾',
      'mountains': '⛰️',
      'skiing': '⛷️',
      'snowboarding': '🏂',
      'winter sports': '🎿',
      
      // Culture
      'english': '🗣️',
      'multicultural': '🌍',
      'diversity': '🤝',
      'community': '👥',
      'tech': '💻',
      'creative': '🎨',
      'business': '💼',
      'traditional': '🏛️',
      'innovation': '🚀',
      
      // Geography
      'coastal': '🌊',
      'hills': '🏔️',
      'countryside': '🌾',
      'mediterranean': '🌅',
      'scandinavian': '🌲',
      'european': '🏰',
      'alpine': '🏔️',
      'arctic': '🐧',
      'four seasons': '🍂',
      
      // Lifestyle
      'affordable': '💰',
      'nature': '🌿',
      'food': '🍽️',
      'nightlife': '🌃',
      'cozy': '☕',
      'outdoor': '🏕️'
    };

    let result = text;
    Object.entries(emojiMap).forEach(([keyword, emoji]) => {
      if (text.toLowerCase().includes(keyword)) {
        result = `${emoji} ${text}`;
        return;
      }
    });
    
    // Default emojis if no match found
    if (result === text) {
      if (text.includes('°C') || text.includes('temperature')) result = `🌡️ ${text}`;
      else if (text.includes('people') || text.includes('population')) result = `👥 ${text}`;
      else if (text.includes('timezone')) result = `🕐 ${text}`;
      else result = `✨ ${text}`;
    }
    
    return result;
  };

  if (!currentNode) return null;

  // If it's a result node, show the city result
  if (currentNode.type === 'result' && currentNode.city) {
    return (
      <div className="h-full flex flex-col bg-gradient-to-br from-green-50 via-white to-emerald-50">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <MapPin className="w-6 h-6 text-green-600" />
              <h2 className="text-xl font-bold text-gray-800">Your Perfect City!</h2>
            </div>
            
            <div className="flex items-center gap-2">
              {canGoBack && parentNodeId && (
                <button
                  onClick={() => onNavigate(parentNodeId)}
                  className="flex items-center gap-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </button>
              )}
              
              <button
                onClick={onRestart}
                className="flex items-center gap-2 px-3 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
              >
                <Home className="w-4 h-4" />
                Start Over
              </button>
            </div>
          </div>
        </div>

        {/* City Result */}
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden max-w-2xl w-full">
            <div className="relative h-48 overflow-hidden">
              <img 
                src={currentNode.city.image} 
                alt={currentNode.city.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute bottom-4 left-6 text-white">
                <h1 className="text-3xl font-bold mb-1">{currentNode.city.name}</h1>
                <div className="flex items-center text-lg opacity-90">
                  <MapPin className="w-4 h-4 mr-2" />
                  {currentNode.city.country}
                </div>
              </div>
            </div>

            <div className="p-6">
              <p className="text-gray-600 mb-4 leading-relaxed">
                {currentNode.city.description}
              </p>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="flex items-center p-3 bg-blue-50 rounded-lg">
                  <span className="text-2xl mr-3">🌡️</span>
                  <div>
                    <div className="font-semibold text-gray-800">Temperature</div>
                    <div className="text-blue-600">{currentNode.city.temperature}</div>
                  </div>
                </div>
                <div className="flex items-center p-3 bg-purple-50 rounded-lg">
                  <span className="text-2xl mr-3">✨</span>
                  <div>
                    <div className="font-semibold text-gray-800">Vibe</div>
                    <div className="text-purple-600">{currentNode.city.vibe}</div>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                {currentNode.city.highlights.map((highlight, index) => (
                  <div key={index} className="flex items-center p-2 bg-gray-50 rounded-lg">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                    <span className="text-gray-700">{highlight}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Question node - show current question with options
  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-2xl">🧭</div>
            <div>
              <h2 className="text-xl font-bold text-gray-800">City Compass</h2>
              <p className="text-sm text-gray-600">Step {path.length} of your journey</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {canGoBack && parentNodeId && (
              <button
                onClick={() => onNavigate(parentNodeId)}
                className="flex items-center gap-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </button>
            )}
            
            <button
              onClick={onRestart}
              className="flex items-center gap-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              <Home className="w-4 h-4" />
              Start Over
            </button>
          </div>
        </div>
      </div>

      {/* Main Content - Centered Question and Options */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="max-w-4xl w-full">
          {/* Question Box */}
          <div className="text-center mb-12">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl p-8 shadow-2xl">
              <h3 className="text-2xl font-bold mb-2">{currentNode.question}</h3>
              <p className="text-blue-100">Choose one of the options below to continue</p>
            </div>
          </div>

          {/* Arrow pointing down */}
          <div className="flex justify-center mb-8">
            <div className="flex flex-col items-center">
              <div className="w-1 h-12 bg-gradient-to-b from-purple-600 to-blue-600 rounded-full"></div>
              <div className="w-0 h-0 border-l-[8px] border-r-[8px] border-t-[12px] border-l-transparent border-r-transparent border-t-blue-600"></div>
            </div>
          </div>

          {/* Options Grid */}
          <div className="grid gap-4 max-w-3xl mx-auto">
            {currentNode.options?.map((option, index) => {
              const targetNode = decisionTree[option.nextId];
              const isResult = targetNode?.type === 'result';
              
              return (
                <div key={option.nextId} className="relative">
                  <button
                    onClick={() => onNavigate(option.nextId)}
                    className="w-full group bg-white hover:bg-blue-50 border-2 border-gray-200 hover:border-blue-400 rounded-xl p-6 transition-all duration-300 hover:shadow-lg hover:scale-[1.02] text-left"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="text-lg font-semibold text-gray-800 group-hover:text-blue-700 mb-1">
                          {addEmojiToOption(option.text)}
                        </div>
                        {isResult && targetNode?.city && (
                          <div className="text-sm text-gray-500 group-hover:text-blue-600">
                            → {targetNode.city.name}, {targetNode.city.country}
                          </div>
                        )}
                      </div>
                      <ArrowRight className="w-6 h-6 text-gray-400 group-hover:text-blue-500 transition-colors ml-4" />
                    </div>
                  </button>
                </div>
              );
            })}
          </div>

          {/* Progress indicator */}
          <div className="text-center mt-8">
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 text-sm text-gray-600">
              <div className="flex gap-1">
                {Array.from({ length: Math.min(path.length, 5) }).map((_, i) => (
                  <div key={i} className="w-2 h-2 bg-blue-500 rounded-full"></div>
                ))}
                {path.length < 5 && Array.from({ length: 5 - path.length }).map((_, i) => (
                  <div key={i} className="w-2 h-2 bg-gray-300 rounded-full"></div>
                ))}
              </div>
              <span>Progress</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};