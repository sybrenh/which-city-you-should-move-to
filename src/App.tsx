import React from 'react';
import { MapPin, Compass } from 'lucide-react';
import { useDecisionTree } from './hooks/useDecisionTree';
import { QuestionCard } from './components/QuestionCard';
import { CityResult } from './components/CityResult';
import { ProgressBar } from './components/ProgressBar';

function App() {
  const { state, navigateToNode, restart, getCurrentNode, getProgress } = useDecisionTree();
  const currentNode = getCurrentNode();
  const progress = getProgress();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="pt-8 pb-6">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full text-white mr-3">
              <Compass className="w-8 h-8" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              City Compass
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover your perfect city to call home with our personalized recommendation engine
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 pb-12">
        {/* Progress Bar - only show during questions */}
        {currentNode.type === 'question' && (
          <ProgressBar current={progress.current} total={progress.total} />
        )}

        {/* Decision Tree Interface */}
        <div className="relative">
          {currentNode.type === 'question' ? (
            <QuestionCard 
              node={currentNode}
              onAnswer={navigateToNode}
              isAnimating={state.isAnimating}
            />
          ) : (
            <CityResult 
              node={currentNode}
              onRestart={restart}
              isAnimating={state.isAnimating}
            />
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 py-8 mt-12">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <div className="flex items-center justify-center mb-2">
            <MapPin className="w-4 h-4 mr-1" />
            <span>Find your perfect city to call home</span>
          </div>
          <p className="text-sm">
            Based on lifestyle preferences and climate data
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;