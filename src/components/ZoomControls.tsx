import React from 'react';
import { ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';

interface ZoomControlsProps {
  zoom: number;
  onZoomChange: (zoom: number) => void;
}

export function ZoomControls({ zoom, onZoomChange }: ZoomControlsProps) {
  const handleZoomIn = () => {
    onZoomChange(Math.min(zoom + 0.1, 2));
  };

  const handleZoomOut = () => {
    onZoomChange(Math.max(zoom - 0.1, 0.5));
  };

  const handleReset = () => {
    onZoomChange(1);
  };

  return (
    <div className="absolute bottom-4 right-4 z-20 flex flex-col gap-2">
      <div className="bg-white rounded-lg shadow-lg p-2 flex flex-col gap-1">
        <button
          onClick={handleZoomIn}
          disabled={zoom >= 2}
          className="p-2 rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          title="Zoom In"
        >
          <ZoomIn className="w-4 h-4" />
        </button>
        
        <button
          onClick={handleZoomOut}
          disabled={zoom <= 0.5}
          className="p-2 rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          title="Zoom Out"
        >
          <ZoomOut className="w-4 h-4" />
        </button>
        
        <button
          onClick={handleReset}
          className="p-2 rounded-md hover:bg-gray-100 transition-colors"
          title="Reset Zoom"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>
      
      <div className="bg-white rounded-lg shadow-lg px-3 py-2 text-center">
        <span className="text-sm font-medium text-gray-700">
          {Math.round(zoom * 100)}%
        </span>
      </div>
    </div>
  );
}