import React, { useRef, useEffect, useState } from 'react';
import { DecisionNode } from '../types';
import { decisionTree } from '../data/cities'; // Assuming this path is correct
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

  // Layout configuration with proper spacing
  const QUESTION_WIDTH = 280;
  const QUESTION_HEIGHT = 100;
  const OPTION_WIDTH = 200;
  const OPTION_HEIGHT = 60;
  const RESULT_WIDTH = 260;
  const RESULT_HEIGHT = 120;
  const HORIZONTAL_SPACING = 400; // Space between levels
  const VERTICAL_SPACING = 80;    // Minimum space between nodes vertically
  const OPTION_SPACING = 20;      // Extra space between options
  const CANVAS_PADDING = 100;     // Padding around entire canvas

  // Calculate positions for all nodes in the flowchart
  const calculateLayout = (): Record<string, NodePosition> => {
    const positions: Record<string, NodePosition> = {};
    const levelNodes: Record<number, string[]> = {};
    const nodeToLevel: Record<string, number> = {};
    
    // First pass: assign levels to all nodes
    const assignLevels = (nodeId: string, level: number) => {
      if (nodeToLevel[nodeId] !== undefined) return;
      
      nodeToLevel[nodeId] = level;
      if (!levelNodes[level]) levelNodes[level] = [];
      levelNodes[level].push(nodeId);
      
      const node = decisionTree[nodeId];
      if (node?.options) {
        node.options.forEach(option => {
          assignLevels(option.nextId, level + 1);
        });
      }
    };
    
    assignLevels('start', 0);
    
    // Second pass: calculate positions level by level
    const maxLevel = Math.max(...Object.keys(levelNodes).map(Number));
    
    for (let level = 0; level <= maxLevel; level++) {
      const nodesAtLevel = levelNodes[level] || [];
      const x = CANVAS_PADDING + (level * HORIZONTAL_SPACING);
      
      // Calculate total height needed for this level
      let totalHeight = 0;
      nodesAtLevel.forEach(nodeId => {
        const node = decisionTree[nodeId];
        if (node?.type === 'result') {
          totalHeight += RESULT_HEIGHT + VERTICAL_SPACING;
        } else {
          totalHeight += QUESTION_HEIGHT + VERTICAL_SPACING;
        }
      });
      
      // Start positioning from center
      let currentY = CANVAS_PADDING;
      
      // If we have parent nodes, try to center around them
      if (level > 0) {
        const parentNodes = levelNodes[level - 1] || [];
        if (parentNodes.length > 0) {
          const parentPositions = parentNodes.map(id => positions[id]).filter(Boolean);
          if (parentPositions.length > 0) {
            const avgParentY = parentPositions.reduce((sum, pos) => sum + pos.y, 0) / parentPositions.length;
            currentY = Math.max(CANVAS_PADDING, avgParentY - totalHeight / 2);
          }
        }
      }
      
      nodesAtLevel.forEach((nodeId, index) => {
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
        
        currentY += height + VERTICAL_SPACING;
      });
    }
    
    // Third pass: position option buttons between questions and their targets
    Object.entries(decisionTree).forEach(([nodeId, node]) => {
      if (node.type === 'question' && node.options) {
        const questionPos = positions[nodeId];
        if (!questionPos) return;
        
        const optionTargets = node.options.map(option => ({
          option,
          targetPos: positions[option.nextId]
        })).filter(item => item.targetPos);
        
        if (optionTargets.length === 0) return;
        
        // Calculate the vertical span of target nodes
        const targetYs = optionTargets.map(item => item.targetPos!.y);
        const minTargetY = Math.min(...targetYs);
        const maxTargetY = Math.max(...targetYs);
        const targetSpan = maxTargetY - minTargetY;
        
        // Position options between question and targets
        const optionX = questionPos.x + questionPos.width + 60;
        
        // Distribute options vertically to align with their targets
        node.options.forEach((option, index) => {
          const targetPos = positions[option.nextId];
          if (!targetPos) return;
          
          const optionId = `${nodeId}-option-${index}`;
          positions[optionId] = {
            x: optionX,
            y: targetPos.y + (targetPos.height / 2) - (OPTION_HEIGHT / 2),
            width: OPTION_WIDTH,
            height: OPTION_HEIGHT
          };
        });
      }
    });
    
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
          <button
            className={`absolute rounded-lg border-2 p-3 transition-all duration-300 text-left ${
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
              <div className="flex-1 pr-2">
                <div className={`font-medium text-xs leading-tight ${
                  isCurrent || isSelected ? 'text-white' : 'text-gray-800'
                }`}>
                  {option.text.length > 25 ? option.text.substring(0, 23) + '...' : option.text}
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

  // Render arrows between nodes
  const renderArrow = (fromPos: NodePosition, toPos: NodePosition, isActive: boolean) => {
    if (!fromPos || !toPos) return null;

    // Calculate connection points
    const startX = fromPos.x + fromPos.width;
    const startY = fromPos.y + fromPos.height / 2;
    const endX = toPos.x;
    const endY = toPos.y + toPos.height / 2;

    // Create a simple straight arrow for horizontal flow
    const svgLeft = Math.min(startX, endX) - 10;
    const svgTop = Math.min(startY, endY) - 10;
    const svgWidth = Math.abs(endX - startX) + 20;
    const svgHeight = Math.abs(endY - startY) + 20;

    const localStartX = startX - svgLeft;
    const localStartY = startY - svgTop;
    const localEndX = endX - svgLeft;
    const localEndY = endY - svgTop;

    return (
      <svg
        key={`arrow-${startX}-${startY}-${endX}-${endY}`}
        className="absolute pointer-events-none"
        style={{
          left: svgLeft,
          top: svgTop,
          width: svgWidth,
          height: svgHeight
        }}
      >
        <defs>
          <marker
            id={`arrowhead-${isActive ? 'active' : 'inactive'}`}
            markerWidth="8"
            markerHeight="6"
            refX="7"
            refY="3"
            orient="auto"
          >
            <polygon
              points="0 0, 8 3, 0 6"
              fill={isActive ? '#3b82f6' : '#d1d5db'}
            />
          </marker>
        </defs>
        <line
          x1={localStartX}
          y1={localStartY}
          x2={localEndX}
          y2={localEndY}
          stroke={isActive ? '#3b82f6' : '#d1d5db'}
          strokeWidth={isActive ? 2 : 1}
          markerEnd={`url(#arrowhead-${isActive ? 'active' : 'inactive'})`}
        />
      </svg>
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

          {/* Render arrows */}
          {Object.entries(decisionTree).map(([nodeId, node]) => {
            if (node.type === 'question' && node.options) {
              return node.options.map((option, index) => {
                const optionId = `${nodeId}-option-${index}`;
                const optionPos = positions[optionId];
                const targetPos = positions[option.nextId];
                const isActive = path.includes(option.nextId);
                
                if (!optionPos || !targetPos) return null;
                
                return renderArrow(optionPos, targetPos, isActive);
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