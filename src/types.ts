export interface DecisionNode {
  id: string;
  question: string;
  type: 'question' | 'result';
  options?: {
    text: string;
    nextId: string;
  }[];
  city?: {
    name: string;
    country: string;
    description: string;
    highlights: string[];
    image: string;
    temperature: string;
    vibe: string;
  };
}

export interface TreeState {
  currentNodeId: string;
  path: string[];
  isAnimating: boolean;
}

export interface TreePosition {
  x: number;
  y: number;
  level: number;
}