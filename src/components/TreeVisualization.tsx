import React, { useRef, useEffect, useState } from 'react';
import { DecisionNode, TreePosition } from '../types';
import { decisionTree } from '../data/cities';

interface TreeVisualizationProps {
  currentNodeId: string;
  path: string[];
  onNavigate: (nodeId: string) => void;
  zoom: number;
  onZoomChange: (zoom: number) => void;
}

export const TreeVisualization: React.FC<TreeVisualizationProps> = ({
  currentNodeId,
  path,
  onNavigate,
  zoom,
  onZoomChange
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [viewBox, setViewBox] = useState({ x: 0, y: 0, width: 1200, height: 800 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  // Calculate positions for all nodes
  const calculatePositions = (): Record<string, TreePosition> => {
    const positions: Record<string, TreePosition> = {};
    const nodeWidth = 200;
    const nodeHeight = 80;
    const levelHeight = 150;
    const questionOffset = 60; // Space above options for question

    // Level 0: Start (continent selection)
    positions['start'] = { x: 600, y: questionOffset, level: 0 };

    // Level 1: Continents
    const continents = ['north-america', 'europe', 'asia', 'oceania'];
    continents.forEach((continent, index) => {
      positions[continent] = {
        x: 200 + (index * 300),
        y: levelHeight + questionOffset,
        level: 1
      };
    });

    // Level 2: Climate preferences for each continent
    const climateNodes = [
      'na-warm', 'na-mild', 'na-cold',
      'eu-warm', 'eu-mild', 'eu-cold',
      'asia-warm', 'asia-mild', 'asia-cold',
      'oc-warm', 'oc-mild'
    ];
    
    let climateIndex = 0;
    continents.forEach((continent, continentIndex) => {
      const climateOptions = decisionTree[continent]?.options || [];
      climateOptions.forEach((option, optionIndex) => {
        positions[option.nextId] = {
          x: 100 + (climateIndex * 120),
          y: (levelHeight * 2) + questionOffset,
          level: 2
        };
        climateIndex++;
      });
    });

    // Level 3: City size preferences
    const sizeNodes = [
      'na-warm-large', 'na-warm-medium', 'na-warm-small',
      'na-mild-large', 'na-mild-medium', 'na-mild-small',
      'na-cold-large', 'na-cold-medium', 'na-cold-small',
      'eu-warm-large', 'eu-warm-medium', 'eu-warm-small',
      'eu-mild-large', 'eu-mild-medium', 'eu-mild-small',
      'eu-cold-large', 'eu-cold-medium', 'eu-cold-small',
      'asia-warm-large', 'asia-warm-medium', 'asia-warm-small',
      'asia-mild-large', 'asia-mild-medium', 'asia-mild-small',
      'asia-cold-large', 'asia-cold-medium', 'asia-cold-small',
      'oc-warm-large', 'oc-warm-medium', 'oc-warm-small',
      'oc-mild-large', 'oc-mild-medium', 'oc-mild-small'
    ];

    sizeNodes.forEach((nodeId, index) => {
      if (decisionTree[nodeId]) {
        positions[nodeId] = {
          x: 50 + (index * 80),
          y: (levelHeight * 3) + questionOffset,
          level: 3
        };
      }
    });

    // Level 4: Final preferences and results
    let finalIndex = 0;
    Object.keys(decisionTree).forEach(nodeId => {
      const node = decisionTree[nodeId];
      if (node.type === 'question' && !positions[nodeId] && node.id !== 'start') {
        positions[nodeId] = {
          x: 40 + (finalIndex * 60),
          y: (levelHeight * 4) + questionOffset,
          level: 4
        };
        finalIndex++;
      } else if (node.type === 'result' && !positions[nodeId]) {
        positions[nodeId] = {
          x: 30 + (finalIndex * 50),
          y: (levelHeight * 5) + questionOffset,
          level: 5
        };
        finalIndex++;
      }
    });

    return positions;
  };

  const positions = calculatePositions();

  // Get current question and its options
  const getCurrentQuestionAndOptions = () => {
    const currentNode = decisionTree[currentNodeId];
    if (!currentNode || currentNode.type !== 'question') return null;

    const questionPosition = positions[currentNodeId];
    if (!questionPosition) return null;

    return {
      question: currentNode.question,
      questionX: questionPosition.x,
      questionY: questionPosition.y - 40,
      options: currentNode.options || []
    };
  };

  const questionData = getCurrentQuestionAndOptions();

  // Handle mouse events for panning
  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button === 0) { // Left mouse button
      setIsDragging(true);
      setDragStart({ x: e.clientX, y: e.clientY });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      const deltaX = (e.clientX - dragStart.x) / zoom;
      const deltaY = (e.clientY - dragStart.y) / zoom;
      
      setViewBox(prev => ({
        ...prev,
        x: prev.x - deltaX,
        y: prev.y - deltaY
      }));
      
      setDragStart({ x: e.clientX, y: e.clientY });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Handle wheel zoom
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? 0.9 : 1.1;
    const newZoom = Math.max(0.1, Math.min(3, zoom * delta));
    onZoomChange(newZoom);
  };

  // Auto-center on current node
  useEffect(() => {
    const currentPos = positions[currentNodeId];
    if (currentPos) {
      setViewBox(prev => ({
        ...prev,
        x: currentPos.x - prev.width / 2,
        y: currentPos.y - prev.height / 2
      }));
    }
  }, [currentNodeId]);

  // Draw connections between parent questions and their options
  const renderConnections = () => {
    const connections: JSX.Element[] = [];
    
    Object.entries(decisionTree).forEach(([nodeId, node]) => {
      if (node.type === 'question' && node.options) {
        const parentPos = positions[nodeId];
        if (!parentPos) return;

        node.options.forEach((option) => {
          const childPos = positions[option.nextId];
          if (!childPos) return;

          const isInPath = path.includes(option.nextId);
          
          connections.push(
            <line
              key={`${nodeId}-${option.nextId}`}
              x1={parentPos.x}
              y1={parentPos.y}
              x2={childPos.x}
              y2={childPos.y}
              stroke={isInPath ? '#3b82f6' : '#e5e7eb'}
              strokeWidth={isInPath ? 3 : 1}
              opacity={0.6}
            />
          );
        });
      }
    });

    return connections;
  };

  // Render option nodes (the clickable elements)
  const renderOptionNodes = () => {
    const nodes: JSX.Element[] = [];

    Object.entries(decisionTree).forEach(([nodeId, node]) => {
      if (node.type === 'question' && node.options) {
        node.options.forEach((option) => {
          const pos = positions[option.nextId];
          if (!pos) return;

          const isInPath = path.includes(option.nextId);
          const isCurrent = option.nextId === currentNodeId;
          const targetNode = decisionTree[option.nextId];
          const isResult = targetNode?.type === 'result';

          let nodeColor = '#f3f4f6'; // Default gray
          let textColor = '#374151';
          let borderColor = '#d1d5db';

          if (isCurrent) {
            nodeColor = '#8b5cf6'; // Purple for current
            textColor = 'white';
            borderColor = '#7c3aed';
          } else if (isInPath) {
            nodeColor = '#3b82f6'; // Blue for path
            textColor = 'white';
            borderColor = '#2563eb';
          } else if (isResult) {
            nodeColor = '#10b981'; // Green for results
            textColor = 'white';
            borderColor = '#059669';
          }

          nodes.push(
            <g key={option.nextId}>
              <rect
                x={pos.x - 80}
                y={pos.y - 25}
                width={160}
                height={50}
                rx={8}
                fill={nodeColor}
                stroke={borderColor}
                strokeWidth={2}
                className="cursor-pointer hover:opacity-80 transition-opacity"
                onClick={() => onNavigate(option.nextId)}
              />
              <text
                x={pos.x}
                y={pos.y}
                textAnchor="middle"
                dominantBaseline="middle"
                fill={textColor}
                fontSize="12"
                fontWeight="500"
                className="cursor-pointer pointer-events-none"
                style={{ userSelect: 'none' }}
              >
                {option.text.length > 20 ? option.text.substring(0, 18) + '...' : option.text}
              </text>
              {isResult && targetNode?.city && (
                <text
                  x={pos.x}
                  y={pos.y + 15}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill={textColor}
                  fontSize="10"
                  fontWeight="600"
                  className="pointer-events-none"
                  style={{ userSelect: 'none' }}
                >
                  {targetNode.city.name}
                </text>
              )}
            </g>
          );
        });
      }
    });

    return nodes;
  };

  return (
    <div className="relative w-full h-full overflow-hidden bg-gray-50">
      <svg
        ref={svgRef}
        className="w-full h-full cursor-grab active:cursor-grabbing"
        viewBox={`${viewBox.x} ${viewBox.y} ${viewBox.width} ${viewBox.height}`}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onWheel={handleWheel}
        style={{ transform: `scale(${zoom})` }}
      >
        {/* Grid background */}
        <defs>
          <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
            <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#f0f0f0" strokeWidth="1"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />

        {/* Connections */}
        <g>{renderConnections()}</g>

        {/* Option nodes */}
        <g>{renderOptionNodes()}</g>

        {/* Floating question */}
        {questionData && (
          <g>
            <rect
              x={questionData.questionX - 150}
              y={questionData.questionY - 20}
              width={300}
              height={40}
              rx={20}
              fill="white"
              stroke="#e5e7eb"
              strokeWidth={2}
              filter="drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))"
            />
            <text
              x={questionData.questionX}
              y={questionData.questionY}
              textAnchor="middle"
              dominantBaseline="middle"
              fill="#1f2937"
              fontSize="14"
              fontWeight="600"
              style={{ userSelect: 'none' }}
            >
              {questionData.question.length > 40 
                ? questionData.question.substring(0, 38) + '...' 
                : questionData.question}
            </text>
          </g>
        )}
      </svg>

      {/* Instructions */}
      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 text-sm text-gray-600 max-w-xs">
        <div className="font-semibold mb-1">Navigation:</div>
        <div>• Click options to navigate</div>
        <div>• Drag to pan around</div>
        <div>• Scroll to zoom in/out</div>
      </div>
    </div>
  );
};