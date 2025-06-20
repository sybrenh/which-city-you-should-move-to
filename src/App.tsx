import React, { useState } from 'react';
import { MapPin, Compass } from 'lucide-react';
import { useDecisionTree } from './hooks/useDecisionTree';
import { QuestionCard } from './components/QuestionCard';
import { CityResult } from './components/CityResult';
import { TreeVisualization } from './components/TreeVisualization';
import { ZoomControls } from './components/ZoomControls';

function App() {
  const { state, navigateToNode, restart, getCurrentNode } = useDecisionTree();
  const [zoom, setZoom] = useState(1);
  const [showTreeView, setShowTreeView] = useState(true);
  
  const currentNode = getCurrentNode();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="relative z-10 pt-6 pb-4">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center mb-3">
            <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full text-white mr-2">
              <Compass className="w-6 h-6" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              City Compass
            </h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Navigate the decision tree to discover your perfect city
          </p>
        </div>
      </header>

      {/* View Toggle */}
      <div className="relative z-10 flex justify-center mb-4">
        <div className="bg-white rounded-lg p-1 shadow-md">
          <button
            onClick={() => setShowTreeView(true)}
            className={`px-4 py-2 rounded-md transition-all ${
              showTreeView 
                ? 'bg-blue-500 text-white shadow-sm' 
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Tree View
          </button>
          <button
            onClick={() => setShowTreeView(false)}
            className={`px-4 py-2 rounded-md transition-all ${
              !showTreeView 
                ? 'bg-blue-500 text-white shadow-sm' 
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Card View
          </button>
        </div>
      </div>

      {/* Main Content */}
      <main className="relative">
        {showTreeView ? (
          <>
            {/* Tree Visualization */}
            <div className="h-[70vh] relative">
              <TreeVisualization
                currentNodeId={state.currentNodeId}
                path={state.path}
                onNavigate={navigateToNode}
                zoom={zoom}
                onZoomChange={setZoom}
              />
              <ZoomControls zoom={zoom} onZoomChange={setZoom} />
            </div>

            {/* Current Node Info */}
            <div className="container mx-auto px-4 py-6">
              {currentNode.type === 'result' ? (
                <div className="max-w-2xl mx-auto">
                  <CityResult 
                    node={currentNode}
                    onRestart={restart}
                    isAnimating={state.isAnimating}
                  />
                </div>
              ) : (
                <div className="text-center">
                  <div className="bg-white rounded-xl shadow-lg p-6 max-w-md mx-auto">
                    <h3 className="text-xl font-bold text-gray-800 mb-4">
                      {currentNode.question}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Click an option in the tree above to continue
                    </p>
                    <button
                      onClick={restart}
                      className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all"
                    >
                      Start Over
                    </button>
                  </div>
                </div>
              )}
            </div>
          </>
        ) : (
          /* Card View */
          <div className="container mx-auto px-4 pb-12">
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
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 py-6 mt-8">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <div className="flex items-center justify-center mb-2">
            <MapPin className="w-4 h-4 mr-1" />
            <span>Find your perfect city to call home</span>
          </div>
          <p className="text-sm">
            Navigate through the decision tree to discover your ideal destination
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;