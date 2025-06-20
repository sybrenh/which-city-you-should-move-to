import React, { useState, useEffect } from 'react';
import { ChevronRight, ChevronDown, ArrowLeft, MapPin, Home } from 'lucide-react';
import { DecisionNode } from '../types';
import { decisionTree } from '../data/cities';

interface TreeViewProps {
  currentNodeId: string;
  path: string[];
  onNavigate: (nodeId: string) => void;
  onRestart: () => void;
}

interface TreeNodeProps {
  nodeId: string;
  node: DecisionNode;
  level: number;
  isExpanded: boolean;
  isInPath: boolean;
  isCurrent: boolean;
  onToggle: (nodeId: string) => void;
  onNavigate: (nodeId: string) => void;
  children?: React.ReactNode;
}

const TreeNode: React.FC<TreeNodeProps> = ({
  nodeId,
  node,
  level,
  isExpanded,
  isInPath,
  isCurrent,
  onToggle,
  onNavigate,
  children
}) => {
  const hasChildren = node.type === 'question' && node.options && node.options.length > 0;
  const isResult = node.type === 'result';

  const handleClick = () => {
    if (hasChildren) {
      onToggle(nodeId);
    }
    onNavigate(nodeId);
  };

  const getNodeIcon = () => {
    if (isResult) return <MapPin className="w-4 h-4" />;
    if (hasChildren) {
      return isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />;
    }
    return <div className="w-4 h-4" />;
  };

  const getNodeStyles = () => {
    let baseStyles = "flex items-center gap-3 p-3 rounded-lg transition-all duration-200 cursor-pointer group ";
    
    if (isCurrent) {
      baseStyles += "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg transform scale-105 ";
    } else if (isInPath) {
      baseStyles += "bg-blue-50 border-2 border-blue-200 text-blue-800 ";
    } else if (isResult) {
      baseStyles += "bg-green-50 border border-green-200 text-green-800 hover:bg-green-100 ";
    } else {
      baseStyles += "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300 ";
    }

    return baseStyles;
  };

  return (
    <div className="relative">
      <div
        className={getNodeStyles()}
        onClick={handleClick}
        role="button"
        tabIndex={0}
        aria-expanded={hasChildren ? isExpanded : undefined}
        aria-label={`${node.question}${isResult && node.city ? ` - ${node.city.name}` : ''}`}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleClick();
          }
        }}
        style={{ marginLeft: `${level * 24}px` }}
      >
        {/* Connection line for child nodes */}
        {level > 0 && (
          <div className="absolute left-0 top-0 bottom-0 w-px bg-gray-200" 
               style={{ left: `${(level - 1) * 24 + 12}px` }} />
        )}
        
        {/* Node connector */}
        {level > 0 && (
          <div className="absolute top-1/2 bg-gray-200 h-px w-3" 
               style={{ left: `${(level - 1) * 24 + 12}px` }} />
        )}

        {/* Icon */}
        <div className={`flex-shrink-0 ${isCurrent ? 'text-white' : 'text-gray-500'}`}>
          {getNodeIcon()}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className={`font-medium ${isCurrent ? 'text-white' : ''}`}>
            {node.question}
          </div>
          
          {isResult && node.city && (
            <div className={`text-sm mt-1 ${isCurrent ? 'text-blue-100' : 'text-gray-500'}`}>
              <div className="flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                {node.city.name}, {node.city.country}
              </div>
              <div className="mt-1 text-xs opacity-75">
                {node.city.temperature} • {node.city.vibe}
              </div>
            </div>
          )}
        </div>

        {/* Current indicator */}
        {isCurrent && (
          <div className="flex-shrink-0">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
          </div>
        )}
      </div>

      {/* Children */}
      {hasChildren && isExpanded && (
        <div className="mt-2 space-y-2">
          {children}
        </div>
      )}
    </div>
  );
};

export const TreeView: React.FC<TreeViewProps> = ({
  currentNodeId,
  path,
  onNavigate,
  onRestart
}) => {
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set(['start']));

  // Auto-expand nodes in the current path
  useEffect(() => {
    setExpandedNodes(prev => {
      const newExpanded = new Set(prev);
      path.forEach(nodeId => {
        newExpanded.add(nodeId);
        // Also expand parent nodes
        Object.entries(decisionTree).forEach(([parentId, parentNode]) => {
          if (parentNode.options?.some(option => option.nextId === nodeId)) {
            newExpanded.add(parentId);
          }
        });
      });
      return newExpanded;
    });
  }, [path]);

  const handleToggle = (nodeId: string) => {
    setExpandedNodes(prev => {
      const newExpanded = new Set(prev);
      if (newExpanded.has(nodeId)) {
        newExpanded.delete(nodeId);
      } else {
        newExpanded.add(nodeId);
      }
      return newExpanded;
    });
  };

  const renderNode = (nodeId: string, level: number = 0): React.ReactNode => {
    const node = decisionTree[nodeId];
    if (!node) return null;

    const isExpanded = expandedNodes.has(nodeId);
    const isInPath = path.includes(nodeId);
    const isCurrent = nodeId === currentNodeId;

    const children = node.options?.map(option => 
      renderNode(option.nextId, level + 1)
    );

    return (
      <TreeNode
        key={nodeId}
        nodeId={nodeId}
        node={node}
        level={level}
        isExpanded={isExpanded}
        isInPath={isInPath}
        isCurrent={isCurrent}
        onToggle={handleToggle}
        onNavigate={onNavigate}
      >
        {children}
      </TreeNode>
    );
  };

  const currentNode = decisionTree[currentNodeId];
  const canGoBack = path.length > 1;
  const parentNodeId = canGoBack ? path[path.length - 2] : null;

  return (
    <div className="h-full flex flex-col bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-bold text-gray-800">Decision Tree</h2>
            <div className="text-sm text-gray-500">
              Step {path.length} of journey
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {canGoBack && parentNodeId && (
              <button
                onClick={() => onNavigate(parentNodeId)}
                className="flex items-center gap-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                aria-label="Go back to previous question"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </button>
            )}
            
            <button
              onClick={onRestart}
              className="flex items-center gap-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              aria-label="Start over from the beginning"
            >
              <Home className="w-4 h-4" />
              Start Over
            </button>
          </div>
        </div>
      </div>

      {/* Current Question Display */}
      {currentNode && (
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-lg font-semibold mb-2">Current Question:</h3>
            <p className="text-blue-100">{currentNode.question}</p>
            {currentNode.type === 'question' && currentNode.options && (
              <p className="text-sm text-blue-200 mt-2">
                Choose from {currentNode.options.length} options below
              </p>
            )}
          </div>
        </div>
      )}

      {/* Tree Structure */}
      <div className="flex-1 overflow-auto p-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="space-y-2">
              {renderNode('start')}
            </div>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="bg-white border-t border-gray-200 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-wrap items-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded"></div>
              <span>Current Position</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-blue-50 border-2 border-blue-200 rounded"></div>
              <span>Your Path</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-50 border border-green-200 rounded"></div>
              <span>City Results</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-white border border-gray-200 rounded"></div>
              <span>Available Options</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};