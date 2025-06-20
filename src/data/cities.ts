import { DecisionNode } from '../types';

export const decisionTree: Record<string, DecisionNode> = {
  start: {
    id: 'start',
    type: 'question',
    question: 'What kind of winter weather do you prefer?',
    options: [
      { text: 'Mild and comfortable (60-70°F)', nextId: 'mild-winter' },
      { text: 'Cool but not freezing (40-60°F)', nextId: 'cool-winter' },
      { text: 'Cold and snowy (below 40°F)', nextId: 'cold-winter' }
    ]
  },

  'mild-winter': {
    id: 'mild-winter',
    type: 'question',
    question: 'What kind of outdoor activities do you enjoy most?',
    options: [
      { text: 'Beach and water sports', nextId: 'beach-mild' },
      { text: 'Desert hiking and landscapes', nextId: 'desert-mild' },
      { text: 'City parks and urban exploration', nextId: 'urban-mild' }
    ]
  },

  'cool-winter': {
    id: 'cool-winter',
    type: 'question',
    question: 'Do you prefer mountains or coastlines?',
    options: [
      { text: 'Mountains and hiking trails', nextId: 'mountain-cool' },
      { text: 'Coastal cities and ocean views', nextId: 'coastal-cool' },
      { text: 'Rolling hills and wine country', nextId: 'hills-cool' }
    ]
  },

  'cold-winter': {
    id: 'cold-winter',
    type: 'question',
    question: 'What draws you to colder climates?',
    options: [
      { text: 'Winter sports and snow activities', nextId: 'winter-sports' },
      { text: 'Cozy culture and seasonal charm', nextId: 'cozy-culture' },
      { text: 'Four distinct seasons', nextId: 'four-seasons' }
    ]
  },

  'beach-mild': {
    id: 'beach-mild',
    type: 'result',
    question: 'Your perfect city is...',
    city: {
      name: 'San Diego',
      country: 'California, USA',
      description: 'Perfect year-round weather meets stunning beaches and a laid-back lifestyle.',
      highlights: ['70°F year-round', 'World-class beaches', 'Craft beer scene', 'Balboa Park'],
      image: 'https://images.pexels.com/photos/1054218/pexels-photo-1054218.jpeg',
      temperature: '65-75°F',
      vibe: 'Relaxed beach culture'
    }
  },

  'desert-mild': {
    id: 'desert-mild',
    type: 'result',
    question: 'Your perfect city is...',
    city: {
      name: 'Phoenix',
      country: 'Arizona, USA',
      description: 'Desert beauty with incredible hiking, golf, and a thriving arts scene.',
      highlights: ['300+ sunny days', 'Desert hiking trails', 'Southwest cuisine', 'Golf paradise'],
      image: 'https://images.pexels.com/photos/417173/pexels-photo-417173.jpeg',
      temperature: '60-80°F (winter)',
      vibe: 'Desert adventure'
    }
  },

  'urban-mild': {
    id: 'urban-mild',
    type: 'result',
    question: 'Your perfect city is...',
    city: {
      name: 'Austin',
      country: 'Texas, USA',
      description: 'Keep it weird in this vibrant city known for music, food, and tech innovation.',
      highlights: ['Live music capital', 'Food truck culture', 'Tech hub', 'South by Southwest'],
      image: 'https://images.pexels.com/photos/2469122/pexels-photo-2469122.jpeg',
      temperature: '50-70°F (winter)',
      vibe: 'Creative and quirky'
    }
  },

  'mountain-cool': {
    id: 'mountain-cool',
    type: 'result',
    question: 'Your perfect city is...',
    city: {
      name: 'Denver',
      country: 'Colorado, USA',
      description: 'Mile-high city with incredible mountain access and outdoor recreation.',
      highlights: ['300+ days of sunshine', 'Rocky Mountain access', 'Craft brewery capital', 'Outdoor lifestyle'],
      image: 'https://images.pexels.com/photos/2265876/pexels-photo-2265876.jpeg',
      temperature: '45-60°F (winter)',
      vibe: 'Active mountain lifestyle'
    }
  },

  'coastal-cool': {
    id: 'coastal-cool',
    type: 'result',
    question: 'Your perfect city is...',
    city: {
      name: 'Seattle',
      country: 'Washington, USA',
      description: 'Emerald city with coffee culture, tech innovation, and stunning natural beauty.',
      highlights: ['Coffee capital', 'Tech industry', 'Pike Place Market', 'Mountain & water views'],
      image: 'https://images.pexels.com/photos/1519088/pexels-photo-1519088.jpeg',
      temperature: '45-55°F (winter)',
      vibe: 'Urban sophistication'
    }
  },

  'hills-cool': {
    id: 'hills-cool',
    type: 'result',
    question: 'Your perfect city is...',
    city: {
      name: 'San Francisco',
      country: 'California, USA',
      description: 'Iconic city with rolling hills, world-class dining, and cultural diversity.',
      highlights: ['Golden Gate Bridge', 'Diverse neighborhoods', 'World-class dining', 'Tech innovation'],
      image: 'https://images.pexels.com/photos/1006965/pexels-photo-1006965.jpeg',
      temperature: '50-60°F year-round',
      vibe: 'Progressive urban culture'
    }
  },

  'winter-sports': {
    id: 'winter-sports',
    type: 'result',
    question: 'Your perfect city is...',
    city: {
      name: 'Salt Lake City',
      country: 'Utah, USA',
      description: 'Gateway to world-class skiing with a thriving downtown and outdoor culture.',
      highlights: ['World-class skiing', 'Outdoor recreation', 'Craft beer scene', 'Mountain access'],
      image: 'https://images.pexels.com/photos/1730877/pexels-photo-1730877.jpeg',
      temperature: '30-45°F (winter)',
      vibe: 'Outdoor adventure base'
    }
  },

  'cozy-culture': {
    id: 'cozy-culture',
    type: 'result',
    question: 'Your perfect city is...',
    city: {
      name: 'Portland',
      country: 'Maine, USA',
      description: 'Charming coastal city with incredible food scene and New England charm.',
      highlights: ['Lobster capital', 'Craft beer', 'Historic Old Port', 'Coastal beauty'],
      image: 'https://images.pexels.com/photos/1402850/pexels-photo-1402850.jpeg',
      temperature: '25-40°F (winter)',
      vibe: 'Cozy New England charm'
    }
  },

  'four-seasons': {
    id: 'four-seasons',
    type: 'result',
    question: 'Your perfect city is...',
    city: {
      name: 'Burlington',
      country: 'Vermont, USA',
      description: 'Picture-perfect seasons with Lake Champlain views and vibrant local culture.',
      highlights: ['Four distinct seasons', 'Lake Champlain', 'Local food scene', 'Outdoor recreation'],
      image: 'https://images.pexels.com/photos/1761282/pexels-photo-1761282.jpeg',
      temperature: '20-35°F (winter)',
      vibe: 'Seasonal perfection'
    }
  }
};