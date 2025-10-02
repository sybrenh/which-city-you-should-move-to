import { DecisionNode } from '../types';

export const decisionTree: Record<string, DecisionNode> = {
  start: {
    id: 'start',
    type: 'question',
    question: 'What kind of winter weather do you prefer?',
    options: [
      { text: 'Mild and comfortable (15-21°C)', nextId: 'mild-winter' },
      { text: 'Cool but not freezing (4-15°C)', nextId: 'cool-winter' },
      { text: 'Cold and snowy (below 4°C)', nextId: 'cold-winter' }
    ]
  },

  'mild-winter': {
    id: 'mild-winter',
    type: 'question',
    question: 'What size city appeals to you most? 🏙️',
    options: [
      { text: 'Large metropolitan area (1M+ people)', nextId: 'mild-large' },
      { text: 'Medium-sized city (100K-1M people)', nextId: 'mild-medium' },
      { text: 'Smaller city or town (under 100K)', nextId: 'mild-small' }
    ]
  },

  'cool-winter': {
    id: 'cool-winter',
    type: 'question',
    question: 'How important is it that English is widely spoken? 🗣️',
    options: [
      { text: 'Essential - I need English everywhere', nextId: 'cool-english-essential' },
      { text: 'Helpful - some English would be nice', nextId: 'cool-english-helpful' },
      { text: 'Not important - I enjoy language challenges', nextId: 'cool-no-english' }
    ]
  },

  'cold-winter': {
    id: 'cold-winter',
    type: 'question',
    question: 'What timezone preference do you have? 🕐',
    options: [
      { text: 'European timezone (CET/GMT+1)', nextId: 'cold-european' },
      { text: 'North American timezone (EST/PST)', nextId: 'cold-american' },
      { text: 'Asian timezone (JST/CST)', nextId: 'cold-asian' }
    ]
  },

  'mild-large': {
    id: 'mild-large',
    type: 'question',
    question: 'What kind of outdoor activities do you enjoy most? 🏃‍♂️',
    options: [
      { text: 'Beach and water sports', nextId: 'beach-large' },
      { text: 'Urban parks and city exploration', nextId: 'urban-large' },
      { text: 'Desert landscapes and hiking', nextId: 'desert-large' }
    ]
  },

  'mild-medium': {
    id: 'mild-medium',
    type: 'question',
    question: 'How important is cultural diversity to you? 🌍',
    options: [
      { text: 'Very important - I love multicultural cities', nextId: 'diverse-medium' },
      { text: 'Somewhat important - some variety is nice', nextId: 'moderate-medium' },
      { text: 'Not crucial - I prefer local culture', nextId: 'local-medium' }
    ]
  },

  'mild-small': {
    id: 'mild-small',
    type: 'question',
    question: 'What draws you to smaller cities? 🏡',
    options: [
      { text: 'Close-knit community feel', nextId: 'community-small' },
      { text: 'Lower cost of living', nextId: 'affordable-small' },
      { text: 'Access to nature and outdoors', nextId: 'nature-small' }
    ]
  },

  'cool-english-essential': {
    id: 'cool-english-essential',
    type: 'question',
    question: 'Do you prefer mountains or coastlines? 🏔️',
    options: [
      { text: 'Mountains and hiking trails', nextId: 'mountain-english' },
      { text: 'Coastal cities and ocean views', nextId: 'coastal-english' },
      { text: 'Rolling hills and countryside', nextId: 'hills-english' }
    ]
  },

  'cool-english-helpful': {
    id: 'cool-english-helpful',
    type: 'question',
    question: 'What type of work environment interests you? 💼',
    options: [
      { text: 'Tech and innovation hubs', nextId: 'tech-helpful' },
      { text: 'Creative and artistic communities', nextId: 'creative-helpful' },
      { text: 'Traditional business centers', nextId: 'business-helpful' }
    ]
  },

  'cool-no-english': {
    id: 'cool-no-english',
    type: 'question',
    question: 'Which cultural experience appeals to you? 🎭',
    options: [
      { text: 'Mediterranean lifestyle', nextId: 'mediterranean' },
      { text: 'Scandinavian design and nature', nextId: 'scandinavian' },
      { text: 'Central European history and culture', nextId: 'central-european' }
    ]
  },

  'cold-european': {
    id: 'cold-european',
    type: 'question',
    question: 'What draws you to colder European climates? 🏰',
    options: [
      { text: 'Winter sports and alpine culture', nextId: 'alpine-sports' },
      { text: 'Historic architecture and culture', nextId: 'historic-culture' },
      { text: 'Northern lights and Arctic experiences', nextId: 'arctic-experience' }
    ]
  },

  'cold-american': {
    id: 'cold-american',
    type: 'question',
    question: 'What type of winter activities interest you? ⛷️',
    options: [
      { text: 'Skiing and snowboarding', nextId: 'winter-sports-us' },
      { text: 'Cozy indoor culture and arts', nextId: 'cozy-culture-us' },
      { text: 'Four distinct seasons experience', nextId: 'four-seasons-us' }
    ]
  },

  'cold-asian': {
    id: 'cold-asian',
    type: 'question',
    question: 'What aspect of Asian culture interests you most? 🏮',
    options: [
      { text: 'Modern technology and innovation', nextId: 'tech-asia' },
      { text: 'Traditional culture and temples', nextId: 'traditional-asia' },
      { text: 'Unique seasonal experiences', nextId: 'seasonal-asia' }
    ]
  },

  // Results for beach-large path
  'beach-large': {
    id: 'beach-large',
    type: 'result',
    question: 'Your perfect city is...',
    city: {
      name: 'San Diego',
      country: 'California, USA',
      description: 'Perfect year-round weather meets stunning beaches and a laid-back lifestyle in this major metropolitan area.',
      highlights: ['18-24°C year-round', 'World-class beaches', 'Craft beer scene', 'Balboa Park', '1.4M population'],
      image: 'https://images.pexels.com/photos/1054218/pexels-photo-1054218.jpeg',
      temperature: '18-24°C',
      vibe: 'Relaxed beach metropolis'
    }
  },

  'urban-large': {
    id: 'urban-large',
    type: 'result',
    question: 'Your perfect city is...',
    city: {
      name: 'Los Angeles',
      country: 'California, USA',
      description: 'The entertainment capital with endless urban exploration, diverse neighborhoods, and perfect weather.',
      highlights: ['20-26°C year-round', 'Entertainment industry', 'Diverse neighborhoods', 'Urban hiking', '4M population'],
      image: 'https://images.pexels.com/photos/2695679/pexels-photo-2695679.jpeg',
      temperature: '16-24°C',
      vibe: 'Creative urban energy'
    }
  },

  'desert-large': {
    id: 'desert-large',
    type: 'result',
    question: 'Your perfect city is...',
    city: {
      name: 'Phoenix',
      country: 'Arizona, USA',
      description: 'Desert beauty with incredible hiking, golf, and a thriving metropolitan arts scene.',
      highlights: ['300+ sunny days', 'Desert hiking trails', 'Southwest cuisine', 'Golf paradise', '1.7M population'],
      image: 'https://images.pexels.com/photos/417173/pexels-photo-417173.jpeg',
      temperature: '15-27°C (winter)',
      vibe: 'Desert adventure hub'
    }
  },

  'diverse-medium': {
    id: 'diverse-medium',
    type: 'result',
    question: 'Your perfect city is...',
    city: {
      name: 'Austin',
      country: 'Texas, USA',
      description: 'Keep it weird in this vibrant city known for music, food, tech innovation, and cultural diversity.',
      highlights: ['Live music capital', 'Food truck culture', 'Tech hub', 'South by Southwest', '965K population'],
      image: 'https://images.pexels.com/photos/2469122/pexels-photo-2469122.jpeg',
      temperature: '10-21°C (winter)',
      vibe: 'Creative and diverse'
    }
  },

  'moderate-medium': {
    id: 'moderate-medium',
    type: 'result',
    question: 'Your perfect city is...',
    city: {
      name: 'Nashville',
      country: 'Tennessee, USA',
      description: 'Music City with Southern charm, growing food scene, and perfect medium-city feel.',
      highlights: ['Country music capital', 'Southern hospitality', 'Growing tech scene', 'Historic districts', '695K population'],
      image: 'https://images.pexels.com/photos/2882234/pexels-photo-2882234.jpeg',
      temperature: '5-15°C (winter)',
      vibe: 'Musical Southern charm'
    }
  },

  'local-medium': {
    id: 'local-medium',
    type: 'result',
    question: 'Your perfect city is...',
    city: {
      name: 'Charleston',
      country: 'South Carolina, USA',
      description: 'Historic Southern charm with incredible cuisine, architecture, and coastal beauty.',
      highlights: ['Historic architecture', 'World-class cuisine', 'Southern hospitality', 'Coastal access', '150K population'],
      image: 'https://images.pexels.com/photos/2882234/pexels-photo-2882234.jpeg',
      temperature: '8-18°C (winter)',
      vibe: 'Historic Southern elegance'
    }
  },

  'community-small': {
    id: 'community-small',
    type: 'result',
    question: 'Your perfect city is...',
    city: {
      name: 'Savannah',
      country: 'Georgia, USA',
      description: 'Charming historic squares, tight-knit community, and Southern hospitality in a walkable city.',
      highlights: ['Historic squares', 'Walkable downtown', 'Art scene', 'Ghost tours', '145K population'],
      image: 'https://images.pexels.com/photos/1402850/pexels-photo-1402850.jpeg',
      temperature: '8-19°C (winter)',
      vibe: 'Historic community charm'
    }
  },

  'affordable-small': {
    id: 'affordable-small',
    type: 'result',
    question: 'Your perfect city is...',
    city: {
      name: 'Asheville',
      country: 'North Carolina, USA',
      description: 'Mountain town with craft beer, arts scene, and affordable living in the Blue Ridge Mountains.',
      highlights: ['Blue Ridge Mountains', 'Craft beer capital', 'Arts district', 'Affordable living', '95K population'],
      image: 'https://images.pexels.com/photos/1761282/pexels-photo-1761282.jpeg',
      temperature: '2-12°C (winter)',
      vibe: 'Artsy mountain community'
    }
  },

  'nature-small': {
    id: 'nature-small',
    type: 'result',
    question: 'Your perfect city is...',
    city: {
      name: 'Boulder',
      country: 'Colorado, USA',
      description: 'Gateway to the Rockies with incredible outdoor access and a health-conscious community.',
      highlights: ['Rocky Mountain access', 'Outdoor recreation', 'Health-conscious', 'University town', '108K population'],
      image: 'https://images.pexels.com/photos/2265876/pexels-photo-2265876.jpeg',
      temperature: '0-10°C (winter)',
      vibe: 'Outdoor adventure base'
    }
  },

  'mountain-english': {
    id: 'mountain-english',
    type: 'result',
    question: 'Your perfect city is...',
    city: {
      name: 'Denver',
      country: 'Colorado, USA',
      description: 'Mile-high city with incredible mountain access, outdoor recreation, and English-speaking environment.',
      highlights: ['300+ days of sunshine', 'Rocky Mountain access', 'Craft brewery capital', 'Outdoor lifestyle', '715K population'],
      image: 'https://images.pexels.com/photos/2265876/pexels-photo-2265876.jpeg',
      temperature: '7-15°C (winter)',
      vibe: 'Active mountain lifestyle'
    }
  },

  'coastal-english': {
    id: 'coastal-english',
    type: 'result',
    question: 'Your perfect city is...',
    city: {
      name: 'Seattle',
      country: 'Washington, USA',
      description: 'Emerald city with coffee culture, tech innovation, and stunning natural beauty.',
      highlights: ['Coffee capital', 'Tech industry', 'Pike Place Market', 'Mountain & water views', '750K population'],
      image: 'https://images.pexels.com/photos/1519088/pexels-photo-1519088.jpeg',
      temperature: '7-13°C (winter)',
      vibe: 'Urban sophistication'
    }
  },

  'hills-english': {
    id: 'hills-english',
    type: 'result',
    question: 'Your perfect city is...',
    city: {
      name: 'San Francisco',
      country: 'California, USA',
      description: 'Iconic city with rolling hills, world-class dining, and cultural diversity.',
      highlights: ['Golden Gate Bridge', 'Diverse neighborhoods', 'World-class dining', 'Tech innovation', '875K population'],
      image: 'https://images.pexels.com/photos/1006965/pexels-photo-1006965.jpeg',
      temperature: '10-15°C year-round',
      vibe: 'Progressive urban culture'
    }
  },

  'tech-helpful': {
    id: 'tech-helpful',
    type: 'result',
    question: 'Your perfect city is...',
    city: {
      name: 'Vancouver',
      country: 'British Columbia, Canada',
      description: 'Tech hub with stunning natural beauty, mild climate, and multicultural environment.',
      highlights: ['Tech industry', 'Mountain & ocean views', 'Multicultural', 'Mild climate', '675K population'],
      image: 'https://images.pexels.com/photos/1519088/pexels-photo-1519088.jpeg',
      temperature: '3-8°C (winter)',
      vibe: 'Tech-forward nature city'
    }
  },

  'creative-helpful': {
    id: 'creative-helpful',
    type: 'result',
    question: 'Your perfect city is...',
    city: {
      name: 'Portland',
      country: 'Oregon, USA',
      description: 'Creative hub with quirky culture, incredible food scene, and Pacific Northwest beauty.',
      highlights: ['Creative community', 'Food truck culture', 'Craft beer', 'Keep Portland Weird', '650K population'],
      image: 'https://images.pexels.com/photos/2882234/pexels-photo-2882234.jpeg',
      temperature: '4-10°C (winter)',
      vibe: 'Creative and quirky'
    }
  },

  'business-helpful': {
    id: 'business-helpful',
    type: 'result',
    question: 'Your perfect city is...',
    city: {
      name: 'Toronto',
      country: 'Ontario, Canada',
      description: 'Major business center with incredible diversity, culture, and four-season climate.',
      highlights: ['Financial district', 'Multicultural', 'CN Tower', 'Four seasons', '2.9M population'],
      image: 'https://images.pexels.com/photos/1519088/pexels-photo-1519088.jpeg',
      temperature: '-5-2°C (winter)',
      vibe: 'International business hub'
    }
  },

  'mediterranean': {
    id: 'mediterranean',
    type: 'result',
    question: 'Your perfect city is...',
    city: {
      name: 'Barcelona',
      country: 'Catalonia, Spain',
      description: 'Mediterranean paradise with incredible architecture, beach culture, and vibrant nightlife.',
      highlights: ['Gaudí architecture', 'Beach access', 'Tapas culture', 'Mediterranean climate', '1.6M population'],
      image: 'https://images.pexels.com/photos/1519088/pexels-photo-1519088.jpeg',
      temperature: '8-15°C (winter)',
      vibe: 'Mediterranean lifestyle'
    }
  },

  'scandinavian': {
    id: 'scandinavian',
    type: 'result',
    question: 'Your perfect city is...',
    city: {
      name: 'Copenhagen',
      country: 'Denmark',
      description: 'Design capital with hygge culture, bike-friendly streets, and Scandinavian quality of life.',
      highlights: ['Design culture', 'Bike-friendly', 'Hygge lifestyle', 'High quality of life', '660K population'],
      image: 'https://images.pexels.com/photos/1519088/pexels-photo-1519088.jpeg',
      temperature: '0-4°C (winter)',
      vibe: 'Scandinavian design culture'
    }
  },

  'central-european': {
    id: 'central-european',
    type: 'result',
    question: 'Your perfect city is...',
    city: {
      name: 'Prague',
      country: 'Czech Republic',
      description: 'Fairy-tale architecture, rich history, affordable living, and Central European charm.',
      highlights: ['Historic architecture', 'Affordable living', 'Beer culture', 'Castle views', '1.3M population'],
      image: 'https://images.pexels.com/photos/1519088/pexels-photo-1519088.jpeg',
      temperature: '-2-3°C (winter)',
      vibe: 'Historic Central European'
    }
  },

  'alpine-sports': {
    id: 'alpine-sports',
    type: 'result',
    question: 'Your perfect city is...',
    city: {
      name: 'Innsbruck',
      country: 'Austria',
      description: 'Alpine paradise with world-class skiing, mountain culture, and Austrian charm.',
      highlights: ['World-class skiing', 'Alpine culture', 'Mountain views', 'Winter Olympics host', '132K population'],
      image: 'https://images.pexels.com/photos/1730877/pexels-photo-1730877.jpeg',
      temperature: '-5-2°C (winter)',
      vibe: 'Alpine sports paradise'
    }
  },

  'historic-culture': {
    id: 'historic-culture',
    type: 'result',
    question: 'Your perfect city is...',
    city: {
      name: 'Vienna',
      country: 'Austria',
      description: 'Imperial grandeur with coffee house culture, classical music, and European sophistication.',
      highlights: ['Imperial architecture', 'Coffee house culture', 'Classical music', 'Museums', '1.9M population'],
      image: 'https://images.pexels.com/photos/1519088/pexels-photo-1519088.jpeg',
      temperature: '-1-4°C (winter)',
      vibe: 'Imperial European culture'
    }
  },

  'arctic-experience': {
    id: 'arctic-experience',
    type: 'result',
    question: 'Your perfect city is...',
    city: {
      name: 'Tromsø',
      country: 'Norway',
      description: 'Arctic adventure with Northern Lights, midnight sun, and unique polar experiences.',
      highlights: ['Northern Lights', 'Midnight sun', 'Arctic culture', 'Sami heritage', '77K population'],
      image: 'https://images.pexels.com/photos/1761282/pexels-photo-1761282.jpeg',
      temperature: '-8--2°C (winter)',
      vibe: 'Arctic adventure'
    }
  },

  'winter-sports-us': {
    id: 'winter-sports-us',
    type: 'result',
    question: 'Your perfect city is...',
    city: {
      name: 'Salt Lake City',
      country: 'Utah, USA',
      description: 'Gateway to world-class skiing with a thriving downtown and outdoor culture.',
      highlights: ['World-class skiing', 'Outdoor recreation', 'Craft beer scene', 'Mountain access', '200K population'],
      image: 'https://images.pexels.com/photos/1730877/pexels-photo-1730877.jpeg',
      temperature: '-1-7°C (winter)',
      vibe: 'Outdoor adventure base'
    }
  },

  'cozy-culture-us': {
    id: 'cozy-culture-us',
    type: 'result',
    question: 'Your perfect city is...',
    city: {
      name: 'Portland',
      country: 'Maine, USA',
      description: 'Charming coastal city with incredible food scene and New England charm.',
      highlights: ['Lobster capital', 'Craft beer', 'Historic Old Port', 'Coastal beauty', '68K population'],
      image: 'https://images.pexels.com/photos/1402850/pexels-photo-1402850.jpeg',
      temperature: '-4-4°C (winter)',
      vibe: 'Cozy New England charm'
    }
  },

  'four-seasons-us': {
    id: 'four-seasons-us',
    type: 'result',
    question: 'Your perfect city is...',
    city: {
      name: 'Burlington',
      country: 'Vermont, USA',
      description: 'Picture-perfect seasons with Lake Champlain views and vibrant local culture.',
      highlights: ['Four distinct seasons', 'Lake Champlain', 'Local food scene', 'Outdoor recreation', '42K population'],
      image: 'https://images.pexels.com/photos/1761282/pexels-photo-1761282.jpeg',
      temperature: '-7-2°C (winter)',
      vibe: 'Seasonal perfection'
    }
  },

  'tech-asia': {
    id: 'tech-asia',
    type: 'result',
    question: 'Your perfect city is...',
    city: {
      name: 'Seoul',
      country: 'South Korea',
      description: 'Ultra-modern tech capital with incredible food, K-culture, and 24/7 energy.',
      highlights: ['Tech innovation', 'K-culture hub', '24/7 lifestyle', 'Amazing food', '9.7M population'],
      image: 'https://images.pexels.com/photos/1519088/pexels-photo-1519088.jpeg',
      temperature: '-6-3°C (winter)',
      vibe: 'High-tech urban energy'
    }
  },

  'traditional-asia': {
    id: 'traditional-asia',
    type: 'result',
    question: 'Your perfect city is...',
    city: {
      name: 'Kyoto',
      country: 'Japan',
      description: 'Ancient capital with thousands of temples, traditional culture, and seasonal beauty.',
      highlights: ['2000+ temples', 'Traditional culture', 'Cherry blossoms', 'Tea ceremony', '1.5M population'],
      image: 'https://images.pexels.com/photos/1519088/pexels-photo-1519088.jpeg',
      temperature: '2-10°C (winter)',
      vibe: 'Traditional Japanese culture'
    }
  },

  'seasonal-asia': {
    id: 'seasonal-asia',
    type: 'result',
    question: 'Your perfect city is...',
    city: {
      name: 'Sapporo',
      country: 'Japan',
      description: 'Snow festival capital with incredible winter experiences, hot springs, and fresh seafood.',
      highlights: ['Snow Festival', 'Hot springs', 'Fresh seafood', 'Winter Olympics host', '1.9M population'],
      image: 'https://images.pexels.com/photos/1730877/pexels-photo-1730877.jpeg',
      temperature: '-7--1°C (winter)',
      vibe: 'Winter wonderland'
    }
  }
};