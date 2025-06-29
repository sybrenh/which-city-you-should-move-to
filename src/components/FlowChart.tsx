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

  // Layout configuration
  const QUESTION_WIDTH = 300;
  const QUESTION_HEIGHT = 80;
  const OPTION_WIDTH = 220;
  const OPTION_HEIGHT = 50;
  const RESULT_WIDTH = 280;
  const RESULT_HEIGHT = 100;
  const LEVEL_SPACING = 400; // Horizontal space between levels
  const NODE_SPACING = 120;  // Vertical space between nodes
  const CANVAS_PADDING = 100;

  // Calculate layout positions
  const calculateLayout = (): Record<string, NodePosition> => {
    const positions: Record<string, NodePosition> = {};
    const levelNodes: Record<number, string[]> = {};
    const nodeToLevel: Record<string, number> = {};
    
    // First pass: assign levels to all nodes using BFS
    const assignLevels = () => {
      const queue: Array<{ nodeId: string; level: number }> = [{ nodeId: 'start', level: 0 }];
      const visited = new Set<string>();
      
      while (queue.length > 0) {
        const { nodeId, level } = queue.shift()!;
        
        if (visited.has(nodeId)) continue;
        visited.add(nodeId);
        
        nodeToLevel[nodeId] = level;
        if (!levelNodes[level]) levelNodes[level] = [];
        levelNodes[level].push(nodeId);
        
        const node = decisionTree[nodeId];
        if (node?.options) {
          node.options.forEach(option => {
            if (!visited.has(option.nextId)) {
              queue.push({ nodeId: option.nextId, level: level + 1 });
            }
          });
        }
      }
    };
    
    assignLevels();
    
    // Second pass: position nodes level by level
    const maxLevel = Math.max(...Object.keys(levelNodes).map(Number));
    
    for (let level = 0; level <= maxLevel; level++) {
      const nodesAtLevel = levelNodes[level] || [];
      const x = CANVAS_PADDING + (level * LEVEL_SPACING);
      
      // Calculate total height needed for this level
      const totalNodesHeight = nodesAtLevel.reduce((sum, nodeId) => {
        const node = decisionTree[nodeId];
        if (node?.type === 'result') {
          return sum + RESULT_HEIGHT + NODE_SPACING;
        } else {
          return sum + QUESTION_HEIGHT + NODE_SPACING;
        }
      }, 0);
      
      // Start positioning from center
      let currentY = CANVAS_PADDING + Math.max(0, (800 - totalNodesHeight) / 2);
      
      nodesAtLevel.forEach((nodeId) => {
        const node = decisionTree[nodeId];
        if (!node) return;
        
        const isResult = node.type === 'result';
        const width = isResult ? RESULT_WIDTH : QUESTION_WIDTH;
        const height = isResult ? RESULT_HEIGHT : QUESTION_HEIGHT;
        
        positions[nodeId] = {
          x,
          y: currentY,
          width,
          height
        };
        
        currentY += height + NODE_SPACING;
      });
    }
    
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
        className={`absolute rounded-xl border-2 p-4 transition-all duration-300 ${
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
              <div className="mt-2 text-xs text-blue-100">
                Choose an option →
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  // Render option buttons positioned between questions
  const renderOptionButtons = (nodeId: string, node: DecisionNode) => {
    if (!node.options) return null;

    const questionPos = positions[nodeId];
    if (!questionPos) return null;

    return node.options.map((option, index) => {
      const targetPos = positions[option.nextId];
      if (!targetPos) return null;

      // Position option button between question and target
      const optionX = questionPos.x + questionPos.width + 60;
      const optionY = (questionPos.y + questionPos.height / 2) + 
                     (index - (node.options!.length - 1) / 2) * (OPTION_HEIGHT + 20);

      const targetNode = decisionTree[option.nextId];
      const isSelected = path.includes(option.nextId);
      const isCurrent = option.nextId === currentNodeId;

      return (
        <div key={`${nodeId}-option-${index}`}>
          {/* Option Button */}
          <button
            className={`absolute rounded-lg border-2 p-3 transition-all duration-300 text-left ${
              isCurrent
                ? 'bg-purple-600 text-white border-purple-700 shadow-xl scale-105'
                : isSelected
                ? 'bg-blue-500 text-white border-blue-600 shadow-lg'
                : 'bg-white border-gray-300 text-gray-700 shadow-md hover:shadow-lg hover:border-blue-400 hover:bg-blue-50'
            }`}
            style={{
              left: optionX,
              top: optionY,
              width: OPTION_WIDTH,
              height: OPTION_HEIGHT
            }}
            onClick={() => onNavigate(option.nextId)}
          >
            <div className="flex items-center justify-between h-full">
              <div className="flex-1 pr-2">
                <div className={`font-medium text-xs leading-tight ${
                  isCurrent || isSelected ? 'text-white' : 'text-gray-800'
                }`}>
                  {option.text.length > 30 ? option.text.substring(0, 28) + '...' : option.text}
                </div>
                {targetNode?.type === 'result' && targetNode.city && (
                  <div className={`text-xs mt-1 ${
                    isCurrent || isSelected ? 'text-blue-100' : 'text-gray-500'
                  }`}>
                    → {targetNode.city.name}
                  </div>
                )}
              </div>
              <ArrowRight className={`w-4 h-4 flex-shrink-0 ${
                isCurrent || isSelected ? 'text-white' : 'text-gray-400'
              }`} />
            </div>
          </button>

          {/* Arrow from question to option */}
          <svg
            className="absolute pointer-events-none"
            style={{
              left: questionPos.x + questionPos.width,
              top: Math.min(questionPos.y + questionPos.height / 2, optionY + OPTION_HEIGHT / 2) - 2,
              width: 60,
              height: Math.abs((questionPos.y + questionPos.height / 2) - (optionY + OPTION_HEIGHT / 2)) + 4
            }}
          >
            <defs>
              <marker
                id={`arrowhead-q-to-o-${nodeId}-${index}`}
                markerWidth="6"
                markerHeight="4"
                refX="5"
                refY="2"
                orient="auto"
              >
                <polygon
                  points="0 0, 6 2, 0 4"
                  fill={isSelected ? '#3b82f6' : '#9ca3af'}
                />
              </marker>
            </defs>
            <line
              x1={0}
              y1={questionPos.y + questionPos.height / 2 - Math.min(questionPos.y + questionPos.height / 2, optionY + OPTION_HEIGHT / 2) + 2}
              x2={60}
              y2={optionY + OPTION_HEIGHT / 2 - Math.min(questionPos.y + questionPos.height / 2, optionY + OPTION_HEIGHT / 2) + 2}
              stroke={isSelected ? '#3b82f6' : '#9ca3af'}
              strokeWidth={isSelected ? 2 : 1}
              markerEnd={`url(#arrowhead-q-to-o-${nodeId}-${index})`}
            />
          </svg>

          {/* Arrow from option to target */}
          <svg
            className="absolute pointer-events-none"
            style={{
              left: optionX + OPTION_WIDTH,
              top: Math.min(optionY + OPTION_HEIGHT / 2, targetPos.y + targetPos.height / 2) - 2,
              width: targetPos.x - (optionX + OPTION_WIDTH),
              height: Math.abs((optionY + OPTION_HEIGHT / 2) - (targetPos.y + targetPos.height / 2)) + 4
            }}
          >
            <defs>
              <marker
                id={`arrowhead-o-to-t-${nodeId}-${index}`}
                markerWidth="6"
                markerHeight="4"
                refX="5"
                refY="2"
                orient="auto"
              >
                <polygon
                  points="0 0, 6 2, 0 4"
                  fill={isSelected ? '#3b82f6' : '#9ca3af'}
                />
              </marker>
            </defs>
            <line
              x1={0}
              y1={optionY + OPTION_HEIGHT / 2 - Math.min(optionY + OPTION_HEIGHT / 2, targetPos.y + targetPos.height / 2) + 2}
              x2={targetPos.x - (optionX + OPTION_WIDTH)}
              y2={targetPos.y + targetPos.height / 2 - Math.min(optionY + OPTION_HEIGHT / 2, targetPos.y + targetPos.height / 2) + 2}
              stroke={isSelected ? '#3b82f6' : '#9ca3af'}
              strokeWidth={isSelected ? 2 : 1}
              markerEnd={`url(#arrowhead-o-to-t-${nodeId}-${index})`}
            />
          </svg>
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
        className={`absolute rounded-xl border-2 p-4 transition-all duration-300 ${
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
          <div className="flex items-center mb-2">
            <MapPin className={`w-4 h-4 mr-2 ${
              isCurrent ? 'text-white' : isInPath ? 'text-green-600' : 'text-gray-500'
            }`} />
            <div className={`font-bold text-sm ${
              isCurrent ? 'text-white' : isInPath ? 'text-green-800' : 'text-gray-800'
            }`}>
              {node.city.name}
            </div>
          </div>
          <div className={`text-xs ${
            isCurrent ? 'text-green-100' : isInPath ? 'text-green-600' : 'text-gray-600'
          }`}>
            {node.city.country}
          </div>
          <div className={`text-xs mt-1 ${
            isCurrent ? 'text-green-100' : isInPath ? 'text-green-600' : 'text-gray-500'
          }`}>
            {node.city.temperature} • {node.city.vibe}
          </div>
        </div>
      </div>
    );
  };

  // Calculate total dimensions
  const totalContentWidth = Object.values(positions).reduce((max, pos) => Math.max(max, pos.x + pos.width), 0) + CANVAS_PADDING;
  const totalContentHeight = Object.values(positions).reduce((max, pos) => Math.max(max, pos.y + pos.height), 0) + CANVAS_PADDING;

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
            width: totalContentWidth,
            height: totalContentHeight,
            minWidth: '100%',
            minHeight: '100%'
          }}
        >
          {/* Grid background */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `
                linear-gradient(to right, #e5e7eb 1px, transparent 1px),
                linear-gradient(to bottom, #e5e7eb 1px, transparent 1px)
              `,
              backgroundSize: '40px 40px'
            }}
          />

          {/* Render all nodes and connections */}
          {Object.entries(decisionTree).map(([nodeId, node]) => {
            if (node.type === 'question') {
              return (
                <div key={nodeId}>
                  {renderQuestionNode(nodeId, node)}
                  {renderOptionButtons(nodeId, node)}
                </div>
              );
            } else if (node.type === 'result') {
              return renderResultNode(nodeId, node);
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