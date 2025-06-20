import React, { useRef, useEffect, useState } from 'react';
import { DecisionNode } from '../types';
import { decisionTree } from '../data/cities';
import { ArrowRight, MapPin, RotateCcw } from 'lucide-react';

interface FlowChartProps {
  currentNodeId: string;
  path: string[];
  onNavigate: (nodeId: string) => void;
  onRestart: () => void;
}

interface NodePosition {
  x: number;
  y: number;
  width: number;
  height: number;
}

export const FlowChart: React.FC<FlowChartProps> = ({
  currentNodeId,
  path,
  onNavigate,
  onRestart
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  // Layout configuration with increased spacing
  const QUESTION_WIDTH = 300;
  const QUESTION_HEIGHT = 100;
  const OPTION_WIDTH = 220;
  const OPTION_HEIGHT = 70;
  const RESULT_WIDTH = 280;
  const RESULT_HEIGHT = 120;
  const HORIZONTAL_SPACING = 700; // Increased from 350
  const VERTICAL_SPACING = 190;   // Increased from 120
  const OPTION_TO_QUESTION_GAP = 120; // New gap between options and next questions
  const option_vertical_padding = 30; 
  
  // Calculate positions for all nodes in the flowchart
  const calculateLayout = (): Record<string, NodePosition> => {
    const positions: Record<string, NodePosition> = {};
    const processedNodes = new Set<string>();
    
    // Start with the root question
    const startY = 1220;
    positions['start'] = { x: 50, y: startY, width: QUESTION_WIDTH, height: QUESTION_HEIGHT };
    
    // Process nodes level by level
    const processLevel = (nodeIds: string[], level: number) => {
      const nextLevelNodes: string[] = [];
      let currentY = startY - ((nodeIds.length - 1) * VERTICAL_SPACING) / 2;
      
      nodeIds.forEach((nodeId, index) => {
        if (processedNodes.has(nodeId)) return;
        
        const node = decisionTree[nodeId];
        if (!node) return;
        
        processedNodes.add(nodeId);
        
        // Position the current node if not already positioned
        if (!positions[nodeId]) {
          positions[nodeId] = {
            x: 50 + (level * HORIZONTAL_SPACING),
            y: currentY + (index * VERTICAL_SPACING),
            width: node.type === 'result' ? RESULT_WIDTH : QUESTION_WIDTH,
            height: node.type === 'result' ? RESULT_HEIGHT : QUESTION_HEIGHT
          };
        }
        
        // Position options for question nodes
        if (node.type === 'question' && node.options) {
          const questionPos = positions[nodeId];
          const optionStartY = questionPos.y - ((node.options.length - 1) * (OPTION_HEIGHT + 30)) / 2;
          
          node.options.forEach((option, optionIndex) => {
            const optionY = optionStartY + (optionIndex * (OPTION_HEIGHT + 30));
            const optionX = questionPos.x + QUESTION_WIDTH + 80; // Increased gap
            
            // Create a unique ID for the option
            const optionId = `${nodeId}-option-${optionIndex}`;
            positions[optionId] = {
              x: optionX,
              y: optionY,
              width: OPTION_WIDTH,
              height: OPTION_HEIGHT
            };
            
            // Add the target node to next level
            if (!processedNodes.has(option.nextId)) {
              nextLevelNodes.push(option.nextId);
            }
          });
        }
      });
      
      // Process next level if there are nodes
      if (nextLevelNodes.length > 0) {
        processLevel(nextLevelNodes, level + 1);
      }
    };
    
    processLevel(['start'], 0);
    return positions;
  };

  const positions = calculateLayout();

  // Auto-scroll to current node
  useEffect(() => {
    const currentPos = positions[currentNodeId];
    if (currentPos && containerRef.current) {
      const container = containerRef.current;
      const scrollX = Math.max(0, currentPos.x - container.clientWidth / 2);
      const scrollY = Math.max(0, currentPos.y - container.clientHeight / 2);
      
      container.scrollTo({
        left: scrollX,
        top: scrollY,
        behavior: 'smooth'
      });
    }
  }, [currentNodeId, positions]);

  // Handle mouse events for panning
  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button === 0) {
      setIsDragging(true);
      setDragStart({ x: e.clientX, y: e.clientY });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && containerRef.current) {
      const deltaX = dragStart.x - e.clientX;
      const deltaY = dragStart.y - e.clientY;
      
      containerRef.current.scrollLeft += deltaX;
      containerRef.current.scrollTop += deltaY;
      
      setDragStart({ x: e.clientX, y: e.clientY });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Render question nodes
  const renderQuestionNode = (nodeId: string, node: DecisionNode) => {
    const pos = positions[nodeId];
    if (!pos) return null;

    const isCurrent = nodeId === currentNodeId;
    const isInPath = path.includes(nodeId);

    return (
      <div
        key={nodeId}
        className={`absolute rounded-xl border-2 p-6 transition-all duration-300 ${
          isCurrent
            ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white border-purple-700 shadow-2xl scale-105'
            : isInPath
            ? 'bg-blue-50 border-blue-300 text-blue-800 shadow-lg'
            : 'bg-white border-gray-300 text-gray-700 shadow-md hover:shadow-lg'
        }`}
        style={{
          left: pos.x,
          top: pos.y,
          width: pos.width,
          height: pos.height
        }}
      >
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <div className={`font-semibold text-sm leading-tight ${
              isCurrent ? 'text-white' : isInPath ? 'text-blue-800' : 'text-gray-800'
            }`}>
              {node.question}
            </div>
            {isCurrent && (
              <div className="mt-3 text-xs text-blue-100">
                Choose an option →
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  // Render option nodes
  const renderOptionNodes = (nodeId: string, node: DecisionNode) => {
    if (!node.options) return null;

    return node.options.map((option, index) => {
      const optionId = `${nodeId}-option-${index}`;
      const pos = positions[optionId];
      if (!pos) return null;

      const targetNode = decisionTree[option.nextId];
      const isSelected = path.includes(option.nextId);
      const isCurrent = option.nextId === currentNodeId;

      return (
        <div key={optionId}>
          {/* Option button */}
          <button
            className={`absolute rounded-lg border-2 p-4 transition-all duration-300 text-left ${
              isCurrent
                ? 'bg-purple-600 text-white border-purple-700 shadow-xl scale-105'
                : isSelected
                ? 'bg-blue-500 text-white border-blue-600 shadow-lg'
                : 'bg-white border-gray-300 text-gray-700 shadow-md hover:shadow-lg hover:border-blue-400 hover:bg-blue-50'
            }`}
            style={{
              left: pos.x,
              top: pos.y,
              width: pos.width,
              height: pos.height
            }}
            onClick={() => onNavigate(option.nextId)}
          >
            <div className="flex items-center justify-between h-full">
              <div className="flex-1 pr-3">
                <div className={`font-medium text-sm leading-tight ${
                  isCurrent || isSelected ? 'text-white' : 'text-gray-800'
                }`}>
                  {option.text}
                </div>
                {targetNode?.type === 'result' && targetNode.city && (
                  <div className={`text-xs mt-2 ${
                    isCurrent || isSelected ? 'text-blue-100' : 'text-gray-500'
                  }`}>
                    → {targetNode.city.name}
                  </div>
                )}
              </div>
              <ArrowRight className={`w-5 h-5 flex-shrink-0 ${
                isCurrent || isSelected ? 'text-white' : 'text-gray-400'
              }`} />
            </div>
          </button>

          {/* Arrow from option to next node */}
          {renderArrow(pos, positions[option.nextId], isSelected)}
        </div>
      );
    });
  };

  // Render result nodes
  const renderResultNode = (nodeId: string, node: DecisionNode) => {
    const pos = positions[nodeId];
    if (!pos || !node.city) return null;

    const isCurrent = nodeId === currentNodeId;
    const isInPath = path.includes(nodeId);

    return (
      <div
        key={nodeId}
        className={`absolute rounded-xl border-2 p-5 transition-all duration-300 ${
          isCurrent
            ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white border-emerald-700 shadow-2xl scale-105'
            : isInPath
            ? 'bg-green-50 border-green-300 text-green-800 shadow-lg'
            : 'bg-white border-gray-300 text-gray-700 shadow-md'
        }`}
        style={{
          left: pos.x,
          top: pos.y,
          width: pos.width,
          height: pos.height
        }}
      >
        <div className="h-full flex flex-col justify-center">
          <div className="flex items-center mb-3">
            <MapPin className={`w-5 h-5 mr-2 ${
              isCurrent ? 'text-white' : isInPath ? 'text-green-600' : 'text-gray-500'
            }`} />
            <div className={`font-bold text-base ${
              isCurrent ? 'text-white' : isInPath ? 'text-green-800' : 'text-gray-800'
            }`}>
              {node.city.name}
            </div>
          </div>
          <div className={`text-sm ${
            isCurrent ? 'text-green-100' : isInPath ? 'text-green-600' : 'text-gray-600'
          }`}>
            {node.city.country}
          </div>
          <div className={`text-xs mt-2 ${
            isCurrent ? 'text-green-100' : isInPath ? 'text-green-600' : 'text-gray-500'
          }`}>
            {node.city.temperature} • {node.city.vibe}
          </div>
        </div>
      </div>
    );
  };

  // Render arrows between nodes
  const renderArrow = (fromPos: NodePosition | undefined, toPos: NodePosition | undefined, isActive: boolean) => {
    if (!fromPos || !toPos) return null;

    const startX = fromPos.x + fromPos.width;
    const startY = fromPos.y + fromPos.height / 2;
    const endX = toPos.x;
    const endY = toPos.y + toPos.height / 2;

    const midX = startX + (endX - startX) / 2;

    return (
      <svg
        key={`arrow-${startX}-${startY}-${endX}-${endY}`}
        className="absolute pointer-events-none"
        style={{
          left: Math.min(startX, endX) - 10,
          top: Math.min(startY, endY) - 10,
          width: Math.abs(endX - startX) + 20,
          height: Math.abs(endY - startY) + 20
        }}
      >
        <defs>
          <marker
            id={`arrowhead-${isActive ? 'active' : 'inactive'}`}
            markerWidth="10"
            markerHeight="7"
            refX="9"
            refY="3.5"
            orient="auto"
          >
            <polygon
              points="0 0, 10 3.5, 0 7"
              fill={isActive ? '#3b82f6' : '#d1d5db'}
            />
          </marker>
        </defs>
        <path
          d={`M ${startX - Math.min(startX, endX) + 10} ${startY - Math.min(startY, endY) + 10} 
              Q ${midX - Math.min(startX, endX) + 10} ${startY - Math.min(startY, endY) + 10} 
              ${endX - Math.min(startX, endX) + 10} ${endY - Math.min(startY, endY) + 10}`}
          stroke={isActive ? '#3b82f6' : '#d1d5db'}
          strokeWidth={isActive ? 3 : 2}
          fill="none"
          markerEnd={`url(#arrowhead-${isActive ? 'active' : 'inactive'})`}
        />
      </svg>
    );
  };
// Calculate total dimensions
  const maxX = Object.values(positions).reduce((max, pos) => Math.max(max, pos.x + pos.width), 0) + 200; // Increased padding
  const maxY = Object.values(positions).reduce((max, pos) => Math.max(max, pos.y + pos.height), 0) + 200; // Increased padding

  return (
    <div className="h-full flex flex-col bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-4 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-800">Decision Flowchart</h2>
            <p className="text-sm text-gray-600">Follow the path from left to right to find your perfect city</p>
          </div>
          
          <button
            onClick={onRestart}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            Start Over
          </button>
        </div>
      </div>

      {/* Flowchart Container */}
      <div
        ref={containerRef}
        className={`flex-1 overflow-auto ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <div
          className="relative"
          style={{
            width: maxX,
            height: maxY,
            minWidth: '100%',
            minHeight: '100%'
          }}
        >
          {/* Grid background */}
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: `
                linear-gradient(to right, #e5e7eb 1px, transparent 1px),
                linear-gradient(to bottom, #e5e7eb 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px'
            }}
          />

          {/* Render all nodes */}
          {Object.entries(decisionTree).map(([nodeId, node]) => {
            if (node.type === 'question') {
              return (
                <div key={nodeId}>
                  {renderQuestionNode(nodeId, node)}
                  {renderOptionNodes(nodeId, node)}
                </div>
              );
            } else if (node.type === 'result') {
              return renderResultNode(nodeId, node);
            }
            return null;
          })}

          {/* Arrows from questions to options */}
          {Object.entries(decisionTree).map(([nodeId, node]) => {
            if (node.type === 'question' && node.options) {
              // CHANGE THIS LINE: Use adjustedPositions
              const questionPos = adjustedPositions[nodeId];
              return node.options.map((option, index) => {
                const optionId = `${nodeId}-option-${index}`;
                // CHANGE THIS LINE: Use adjustedPositions
                const optionPos = adjustedPositions[optionId];
                const isActive = path.includes(option.nextId);
                // CHANGE THIS LINE: Pass adjustedPositions[option.nextId]
                return renderArrow(questionPos, optionPos, isActive);
              });
            }
            return null;
          })}
        </div>
      </div>
      {/* Legend */}
      <div className="bg-white border-t border-gray-200 p-4 flex-shrink-0">
        <div className="flex flex-wrap items-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded"></div>
            <span>Current Question</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-purple-600 rounded"></div>
            <span>Selected Option</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-blue-50 border-2 border-blue-300 rounded"></div>
            <span>Your Path</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-gradient-to-r from-green-600 to-emerald-600 rounded"></div>
            <span>Final Result</span>
          </div>
          <div className="text-gray-500">
            <span>💡 Drag to pan • Click options to navigate</span>
          </div>
        </div>
      </div>
    </div>
  );
};