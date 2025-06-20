import React from 'react';
import { DecisionNode } from '../types';
import { MapPin, Thermometer, Heart, RotateCcw } from 'lucide-react';

interface CityResultProps {
  node: DecisionNode;
  onRestart: () => void;
  isAnimating: boolean;
}

export const CityResult: React.FC<CityResultProps> = ({ node, onRestart, isAnimating }) => {
  const city = node.city!;

  return (
    <div className={`
      transform transition-all duration-700 ease-out
      ${isAnimating ? 'scale-95 opacity-50' : 'scale-100 opacity-100'}
    `}>
      <div className="bg-white rounded-2xl shadow-2xl overflow-hidden max-w-3xl mx-auto">
        <div className="relative h-64 overflow-hidden">
          <img 
            src={city.image} 
            alt={city.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          <div className="absolute bottom-4 left-6 text-white">
            <h1 className="text-4xl font-bold mb-2">{city.name}</h1>
            <div className="flex items-center text-lg opacity-90">
              <MapPin className="w-5 h-5 mr-2" />
              {city.country}
            </div>
          </div>
        </div>

        <div className="p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              {node.question}
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              {city.description}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="flex items-center p-4 bg-blue-50 rounded-xl">
              <Thermometer className="w-6 h-6 text-blue-600 mr-3" />
              <div>
                <div className="font-semibold text-gray-800">Temperature</div>
                <div className="text-blue-600">{city.temperature}</div>
              </div>
            </div>
            <div className="flex items-center p-4 bg-purple-50 rounded-xl">
              <Heart className="w-6 h-6 text-purple-600 mr-3" />
              <div>
                <div className="font-semibold text-gray-800">Vibe</div>
                <div className="text-purple-600">{city.vibe}</div>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Why you'll love it here:</h3>
            <div className="grid sm:grid-cols-2 gap-3">
              {city.highlights.map((highlight, index) => (
                <div 
                  key={index}
                  className="flex items-center p-3 bg-gray-50 rounded-lg"
                  style={{ 
                    animationDelay: `${index * 100}ms`,
                    animation: isAnimating ? 'none' : 'slideInUp 0.6s ease-out forwards'
                  }}
                >
                  <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mr-3"></div>
                  <span className="text-gray-700">{highlight}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={onRestart}
              className="
                inline-flex items-center px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 
                text-white font-semibold rounded-xl shadow-lg
                hover:from-blue-700 hover:to-purple-700 
                transform hover:scale-105 transition-all duration-300
              "
            >
              <RotateCcw className="w-5 h-5 mr-2" />
              Try Again
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};