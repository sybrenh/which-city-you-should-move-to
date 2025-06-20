import { useState, useCallback } from 'react';
import { TreeState } from '../types';
import { decisionTree } from '../data/cities';

export const useDecisionTree = () => {
  const [state, setState] = useState<TreeState>({
    currentNodeId: 'start',
    path: ['start'],
    isAnimating: false
  });

  const navigateToNode = useCallback((nodeId: string) => {
    setState(prev => ({ ...prev, isAnimating: true }));
    
    setTimeout(() => {
      setState(prev => ({
        currentNodeId: nodeId,
        path: [...prev.path, nodeId],
        isAnimating: false
      }));
    }, 350);
  }, []);

  const restart = useCallback(() => {
    setState(prev => ({ ...prev, isAnimating: true }));
    
    setTimeout(() => {
      setState({
        currentNodeId: 'start',
        path: ['start'],
        isAnimating: false
      });
    }, 350);
  }, []);

  const getCurrentNode = useCallback(() => {
    return decisionTree[state.currentNodeId];
  }, [state.currentNodeId]);

  const getProgress = useCallback(() => {
    const maxDepth = 4; // Updated based on new tree structure
    const currentDepth = state.path.length;
    return { current: currentDepth, total: maxDepth };
  }, [state.path.length]);

  return {
    state,
    navigateToNode,
    restart,
    getCurrentNode,
    getProgress
  };
};