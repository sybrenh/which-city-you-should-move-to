import { DecisionNode } from '../types';

export const decisionTree: Record<string, DecisionNode> = {
  start: {
    id: 'start',
    type: 'question',
    question: '🌍 Which timezone would you prefer to live in?',
    options: [
      { text: '🇺🇸 Americas (UTC-8 to UTC-5)', nextId: 'americas' },
      { text: '🇪🇺 Europe/Africa (UTC+0 to UTC+3)', nextId: 'europe-africa' },
      { text: '🇦🇺 Asia/Oceania (UTC+5 to UTC+12)', nextId: 'asia-oceania' },
      { text: '🌐 I\'m flexible with any timezone', nextId: 'flexible-timezone' }
    ]
  },

  // Americas Path
  americas: {
    id: 'americas',
    type: 'question',
    question: '🌡️ What\'s your ideal winter temperature?',
    options: [
      { text: '☀️ Warm (15-25°C) - No real winter', nextId: 'americas-warm' },
      { text: '🌤️ Mild (5-15°C) - Light jackets', nextId: 'americas-mild' },
      { text: '❄️ Cold (-5-5°C) - Snow and skiing', nextId: 'americas-cold' }
    ]
  },

  'americas-warm': {
    id: 'americas-warm',
    type: 'question',
    question: '🏙️ What size city appeals to you?',
    options: [
      { text: '🌆 Major metropolis (2M+ people)', nextId: 'americas-warm-large' },
      { text: '🏘️ Mid-size city (200K-2M people)', nextId: 'americas-warm-medium' },
      { text: '🏡 Smaller city/town (under 200K)', nextId: 'americas-warm-small' }
    ]
  },

  'americas-mild': {
    id: 'americas-mild',
    type: 'question',
    question: '🎯 What\'s most important to you?',
    options: [
      { text: '💼 Career opportunities', nextId: 'americas-mild-career' },
      { text: '🎨 Arts and culture scene', nextId: 'americas-mild-culture' },
      { text: '🌲 Access to nature', nextId: 'americas-mild-nature' }
    ]
  },

  'americas-cold': {
    id: 'americas-cold',
    type: 'question',
    question: '⛷️ How do you want to spend winter?',
    options: [
      { text: '🎿 Skiing and winter sports', nextId: 'americas-cold-sports' },
      { text: '☕ Cozy indoor culture', nextId: 'americas-cold-cozy' },
      { text: '🏔️ Mountain town vibes', nextId: 'americas-cold-mountain' }
    ]
  },

  // Europe/Africa Path
  'europe-africa': {
    id: 'europe-africa',
    type: 'question',
    question: '🌍 Which region appeals to you most?',
    options: [
      { text: '🏛️ Western Europe - History & culture', nextId: 'western-europe' },
      { text: '🌅 Mediterranean - Coastal lifestyle', nextId: 'mediterranean' },
      { text: '🌲 Northern Europe - Nature & design', nextId: 'northern-europe' },
      { text: '🦁 Africa - Adventure & growth', nextId: 'africa' }
    ]
  },

  'western-europe': {
    id: 'western-europe',
    type: 'question',
    question: '🗣️ Language preference?',
    options: [
      { text: '🇬🇧 English-speaking preferred', nextId: 'europe-english' },
      { text: '🇩🇪 German/Dutch region', nextId: 'europe-german' },
      { text: '🇫🇷 French-speaking region', nextId: 'europe-french' }
    ]
  },

  mediterranean: {
    id: 'mediterranean',
    type: 'question',
    question: '🏖️ What draws you to the Mediterranean?',
    options: [
      { text: '🌊 Beach and island life', nextId: 'med-islands' },
      { text: '🍷 Food and wine culture', nextId: 'med-food' },
      { text: '🏛️ Ancient history and ruins', nextId: 'med-history' }
    ]
  },

  'northern-europe': {
    id: 'northern-europe',
    type: 'question',
    question: '❄️ What attracts you to the North?',
    options: [
      { text: '🏠 Hygge and design culture', nextId: 'nordic-hygge' },
      { text: '🌌 Northern lights and nature', nextId: 'nordic-nature' },
      { text: '💡 Innovation and tech scene', nextId: 'nordic-tech' }
    ]
  },

  africa: {
    id: 'africa',
    type: 'question',
    question: '🌍 What type of African experience?',
    options: [
      { text: '🏙️ Modern cosmopolitan city', nextId: 'africa-modern' },
      { text: '🦁 Safari and wildlife access', nextId: 'africa-wildlife' },
      { text: '🏖️ Coastal and beach culture', nextId: 'africa-coastal' }
    ]
  },

  // Asia/Oceania Path
  'asia-oceania': {
    id: 'asia-oceania',
    type: 'question',
    question: '🌏 Which region interests you most?',
    options: [
      { text: '🏮 East Asia - Modern & traditional', nextId: 'east-asia' },
      { text: '🕌 Southeast Asia - Tropical & diverse', nextId: 'southeast-asia' },
      { text: '🦘 Oceania - Outdoor & relaxed', nextId: 'oceania' },
      { text: '🏔️ Central/South Asia - Mountains & culture', nextId: 'central-asia' }
    ]
  },

  'east-asia': {
    id: 'east-asia',
    type: 'question',
    question: '🏙️ What appeals to you most?',
    options: [
      { text: '🤖 Ultra-modern tech cities', nextId: 'asia-tech' },
      { text: '🏯 Traditional culture & temples', nextId: 'asia-traditional' },
      { text: '🍜 Food culture paradise', nextId: 'asia-food' }
    ]
  },

  'southeast-asia': {
    id: 'southeast-asia',
    type: 'question',
    question: '🌴 What\'s your priority?',
    options: [
      { text: '💰 Low cost of living', nextId: 'sea-affordable' },
      { text: '🏖️ Tropical beach lifestyle', nextId: 'sea-beaches' },
      { text: '🌆 Modern expat-friendly cities', nextId: 'sea-expat' }
    ]
  },

  oceania: {
    id: 'oceania',
    type: 'question',
    question: '🌊 What draws you to Oceania?',
    options: [
      { text: '🏄‍♂️ Surf and beach culture', nextId: 'oceania-surf' },
      { text: '🏙️ Cosmopolitan city life', nextId: 'oceania-city' },
      { text: '🌿 Nature and outdoor adventures', nextId: 'oceania-nature' }
    ]
  },

  // Flexible timezone path
  'flexible-timezone': {
    id: 'flexible-timezone',
    type: 'question',
    question: '🌡️ What\'s your ideal year-round climate?',
    options: [
      { text: '☀️ Always warm (20-30°C)', nextId: 'global-tropical' },
      { text: '🌤️ Mild with seasons (10-25°C)', nextId: 'global-temperate' },
      { text: '❄️ Cool with distinct seasons (0-20°C)', nextId: 'global-continental' }
    ]
  },

  // Results - Americas Warm Large
  'americas-warm-large': {
    id: 'americas-warm-large',
    type: 'result',
    question: 'Your perfect city is...',
    city: {
      name: 'Los Angeles',
      country: 'California, USA',
      description: 'The entertainment capital with endless sunshine, diverse neighborhoods, and a thriving creative scene.',
      highlights: ['Year-round sunshine', 'Entertainment industry hub', 'Beach access', 'Diverse food scene', 'Mountain views'],
      image: 'https://images.pexels.com/photos/2695679/pexels-photo-2695679.jpeg',
      temperature: '15-25°C year-round',
      vibe: 'Creative sunshine metropolis'
    }
  },

  'americas-warm-medium': {
    id: 'americas-warm-medium',
    type: 'result',
    question: 'Your perfect city is...',
    city: {
      name: 'Austin',
      country: 'Texas, USA',
      description: 'Keep it weird in this vibrant city known for music, food trucks, and tech innovation.',
      highlights: ['Live music capital', 'Food truck culture', 'Tech scene', 'No state income tax', 'Outdoor festivals'],
      image: 'https://images.pexels.com/photos/2469122/pexels-photo-2469122.jpeg',
      temperature: '8-28°C',
      vibe: 'Quirky music city'
    }
  },

  'americas-warm-small': {
    id: 'americas-warm-small',
    type: 'result',
    question: 'Your perfect city is...',
    city: {
      name: 'Santa Barbara',
      country: 'California, USA',
      description: 'The American Riviera with Spanish architecture, wine country, and perfect weather.',
      highlights: ['Spanish colonial architecture', 'Wine country nearby', 'Beach lifestyle', 'Small-town charm', 'Perfect weather'],
      image: 'https://images.pexels.com/photos/1054218/pexels-photo-1054218.jpeg',
      temperature: '12-24°C year-round',
      vibe: 'Coastal elegance'
    }
  },

  'americas-mild-career': {
    id: 'americas-mild-career',
    type: 'result',
    question: 'Your perfect city is...',
    city: {
      name: 'Seattle',
      country: 'Washington, USA',
      description: 'Tech hub with coffee culture, stunning nature access, and progressive values.',
      highlights: ['Tech industry center', 'Coffee capital', 'Mountain and water views', 'Music scene', 'Progressive culture'],
      image: 'https://images.pexels.com/photos/1519088/pexels-photo-1519088.jpeg',
      temperature: '4-22°C',
      vibe: 'Tech-forward nature city'
    }
  },

  'americas-mild-culture': {
    id: 'americas-mild-culture',
    type: 'result',
    question: 'Your perfect city is...',
    city: {
      name: 'Montreal',
      country: 'Quebec, Canada',
      description: 'European charm in North America with incredible arts scene and joie de vivre.',
      highlights: ['European atmosphere', 'Arts and festivals', 'Bilingual culture', 'Great food scene', 'Historic architecture'],
      image: 'https://images.pexels.com/photos/1519088/pexels-photo-1519088.jpeg',
      temperature: '-8-24°C',
      vibe: 'European-style cultural hub'
    }
  },

  'americas-mild-nature': {
    id: 'americas-mild-nature',
    type: 'result',
    question: 'Your perfect city is...',
    city: {
      name: 'Vancouver',
      country: 'British Columbia, Canada',
      description: 'Mountains meet ocean in this outdoor paradise with mild climate and multiculturalism.',
      highlights: ['Mountain and ocean access', 'Mild climate', 'Multicultural', 'Outdoor recreation', 'Clean and green'],
      image: 'https://images.pexels.com/photos/1519088/pexels-photo-1519088.jpeg',
      temperature: '3-22°C',
      vibe: 'Outdoor paradise'
    }
  },

  'americas-cold-sports': {
    id: 'americas-cold-sports',
    type: 'result',
    question: 'Your perfect city is...',
    city: {
      name: 'Denver',
      country: 'Colorado, USA',
      description: 'Mile-high city with 300+ days of sunshine and world-class skiing nearby.',
      highlights: ['300+ sunny days', 'World-class skiing', 'Craft beer scene', 'Outdoor lifestyle', 'Mountain access'],
      image: 'https://images.pexels.com/photos/2265876/pexels-photo-2265876.jpeg',
      temperature: '-2-28°C',
      vibe: 'Sunny mountain adventure'
    }
  },

  'americas-cold-cozy': {
    id: 'americas-cold-cozy',
    type: 'result',
    question: 'Your perfect city is...',
    city: {
      name: 'Quebec City',
      country: 'Quebec, Canada',
      description: 'European fairy tale with cobblestone streets, winter festivals, and cozy cafes.',
      highlights: ['UNESCO World Heritage', 'Winter carnival', 'French culture', 'Cobblestone streets', 'Cozy atmosphere'],
      image: 'https://images.pexels.com/photos/1402850/pexels-photo-1402850.jpeg',
      temperature: '-12-25°C',
      vibe: 'European winter charm'
    }
  },

  'americas-cold-mountain': {
    id: 'americas-cold-mountain',
    type: 'result',
    question: 'Your perfect city is...',
    city: {
      name: 'Banff',
      country: 'Alberta, Canada',
      description: 'Mountain town paradise in the Canadian Rockies with world-class outdoor recreation.',
      highlights: ['Canadian Rockies', 'World-class skiing', 'Hot springs', 'Wildlife viewing', 'Mountain town charm'],
      image: 'https://images.pexels.com/photos/1730877/pexels-photo-1730877.jpeg',
      temperature: '-15-22°C',
      vibe: 'Rocky Mountain paradise'
    }
  },

  // Europe Results
  'europe-english': {
    id: 'europe-english',
    type: 'result',
    question: 'Your perfect city is...',
    city: {
      name: 'Edinburgh',
      country: 'Scotland, UK',
      description: 'Historic capital with castle views, festival culture, and Scottish charm.',
      highlights: ['Edinburgh Castle', 'Festival city', 'Historic Old Town', 'Whisky culture', 'Literary heritage'],
      image: 'https://images.pexels.com/photos/1519088/pexels-photo-1519088.jpeg',
      temperature: '2-19°C',
      vibe: 'Historic cultural capital'
    }
  },

  'europe-german': {
    id: 'europe-german',
    type: 'result',
    question: 'Your perfect city is...',
    city: {
      name: 'Berlin',
      country: 'Germany',
      description: 'Creative capital with rich history, vibrant nightlife, and affordable living.',
      highlights: ['Rich history', 'Art and culture scene', 'Affordable living', 'Vibrant nightlife', 'Green spaces'],
      image: 'https://images.pexels.com/photos/1519088/pexels-photo-1519088.jpeg',
      temperature: '-1-24°C',
      vibe: 'Creative historical hub'
    }
  },

  'europe-french': {
    id: 'europe-french',
    type: 'result',
    question: 'Your perfect city is...',
    city: {
      name: 'Lyon',
      country: 'France',
      description: 'Gastronomic capital with Renaissance architecture and French savoir-vivre.',
      highlights: ['Culinary capital', 'Renaissance architecture', 'Silk industry heritage', 'Rhône and Saône rivers', 'French culture'],
      image: 'https://images.pexels.com/photos/1519088/pexels-photo-1519088.jpeg',
      temperature: '2-26°C',
      vibe: 'Gastronomic elegance'
    }
  },

  'med-islands': {
    id: 'med-islands',
    type: 'result',
    question: 'Your perfect city is...',
    city: {
      name: 'Palma',
      country: 'Mallorca, Spain',
      description: 'Island paradise with Gothic cathedral, crystal waters, and Mediterranean lifestyle.',
      highlights: ['Island living', 'Crystal clear waters', 'Gothic cathedral', 'Mediterranean cuisine', 'Year-round sailing'],
      image: 'https://images.pexels.com/photos/1519088/pexels-photo-1519088.jpeg',
      temperature: '8-29°C',
      vibe: 'Island Mediterranean paradise'
    }
  },

  'med-food': {
    id: 'med-food',
    type: 'result',
    question: 'Your perfect city is...',
    city: {
      name: 'Barcelona',
      country: 'Catalonia, Spain',
      description: 'Gaudí\'s masterpiece with incredible tapas culture, beaches, and Catalan creativity.',
      highlights: ['Gaudí architecture', 'Tapas culture', 'Beach access', 'Las Ramblas', 'Creative energy'],
      image: 'https://images.pexels.com/photos/1519088/pexels-photo-1519088.jpeg',
      temperature: '8-28°C',
      vibe: 'Artistic Mediterranean metropolis'
    }
  },

  'med-history': {
    id: 'med-history',
    type: 'result',
    question: 'Your perfect city is...',
    city: {
      name: 'Athens',
      country: 'Greece',
      description: 'Cradle of democracy with ancient ruins, vibrant neighborhoods, and Greek island access.',
      highlights: ['Ancient Acropolis', 'Birthplace of democracy', 'Greek island access', 'Vibrant neighborhoods', 'Mediterranean climate'],
      image: 'https://images.pexels.com/photos/1519088/pexels-photo-1519088.jpeg',
      temperature: '6-33°C',
      vibe: 'Ancient meets modern'
    }
  },

  'nordic-hygge': {
    id: 'nordic-hygge',
    type: 'result',
    question: 'Your perfect city is...',
    city: {
      name: 'Copenhagen',
      country: 'Denmark',
      description: 'Design capital with hygge culture, bike-friendly streets, and Scandinavian quality of life.',
      highlights: ['Hygge lifestyle', 'Design culture', 'Bike-friendly', 'High quality of life', 'Cozy cafes'],
      image: 'https://images.pexels.com/photos/1519088/pexels-photo-1519088.jpeg',
      temperature: '0-22°C',
      vibe: 'Scandinavian design paradise'
    }
  },

  'nordic-nature': {
    id: 'nordic-nature',
    type: 'result',
    question: 'Your perfect city is...',
    city: {
      name: 'Tromsø',
      country: 'Norway',
      description: 'Arctic adventure with Northern Lights, midnight sun, and pristine wilderness.',
      highlights: ['Northern Lights', 'Midnight sun', 'Arctic wilderness', 'Sami culture', 'Unique experiences'],
      image: 'https://images.pexels.com/photos/1761282/pexels-photo-1761282.jpeg',
      temperature: '-4-16°C',
      vibe: 'Arctic adventure'
    }
  },

  'nordic-tech': {
    id: 'nordic-tech',
    type: 'result',
    question: 'Your perfect city is...',
    city: {
      name: 'Stockholm',
      country: 'Sweden',
      description: 'Venice of the North with startup culture, design innovation, and archipelago beauty.',
      highlights: ['Startup ecosystem', 'Design innovation', 'Archipelago setting', 'Work-life balance', 'Tech scene'],
      image: 'https://images.pexels.com/photos/1519088/pexels-photo-1519088.jpeg',
      temperature: '-3-22°C',
      vibe: 'Nordic tech innovation'
    }
  },

  'africa-modern': {
    id: 'africa-modern',
    type: 'result',
    question: 'Your perfect city is...',
    city: {
      name: 'Cape Town',
      country: 'South Africa',
      description: 'Where Table Mountain meets the ocean in Africa\'s most cosmopolitan city.',
      highlights: ['Table Mountain', 'Wine regions nearby', 'Cosmopolitan culture', 'Beautiful beaches', 'Rich history'],
      image: 'https://images.pexels.com/photos/1519088/pexels-photo-1519088.jpeg',
      temperature: '7-26°C',
      vibe: 'Cosmopolitan African beauty'
    }
  },

  'africa-wildlife': {
    id: 'africa-wildlife',
    type: 'result',
    question: 'Your perfect city is...',
    city: {
      name: 'Nairobi',
      country: 'Kenya',
      description: 'Safari capital with wildlife parks within the city and East African culture.',
      highlights: ['Safari access', 'Nairobi National Park', 'East African culture', 'Business hub', 'Wildlife conservation'],
      image: 'https://images.pexels.com/photos/1519088/pexels-photo-1519088.jpeg',
      temperature: '11-26°C',
      vibe: 'Urban safari gateway'
    }
  },

  'africa-coastal': {
    id: 'africa-coastal',
    type: 'result',
    question: 'Your perfect city is...',
    city: {
      name: 'Casablanca',
      country: 'Morocco',
      description: 'Atlantic coast meets Moroccan culture in this vibrant economic capital.',
      highlights: ['Atlantic coastline', 'Moroccan culture', 'Hassan II Mosque', 'Economic center', 'French influence'],
      image: 'https://images.pexels.com/photos/1519088/pexels-photo-1519088.jpeg',
      temperature: '8-26°C',
      vibe: 'Moroccan coastal sophistication'
    }
  },

  // Asia Results
  'asia-tech': {
    id: 'asia-tech',
    type: 'result',
    question: 'Your perfect city is...',
    city: {
      name: 'Singapore',
      country: 'Singapore',
      description: 'Garden city-state with cutting-edge technology, incredible food, and tropical efficiency.',
      highlights: ['Garden city design', 'Tech innovation hub', 'Incredible food scene', 'Multicultural', 'Tropical climate'],
      image: 'https://images.pexels.com/photos/1519088/pexels-photo-1519088.jpeg',
      temperature: '24-32°C year-round',
      vibe: 'Futuristic garden city'
    }
  },

  'asia-traditional': {
    id: 'asia-traditional',
    type: 'result',
    question: 'Your perfect city is...',
    city: {
      name: 'Kyoto',
      country: 'Japan',
      description: 'Ancient capital with 2,000 temples, traditional culture, and seasonal beauty.',
      highlights: ['2,000+ temples', 'Traditional culture', 'Cherry blossoms', 'Tea ceremony', 'Seasonal beauty'],
      image: 'https://images.pexels.com/photos/1519088/pexels-photo-1519088.jpeg',
      temperature: '2-32°C',
      vibe: 'Traditional Japanese elegance'
    }
  },

  'asia-food': {
    id: 'asia-food',
    type: 'result',
    question: 'Your perfect city is...',
    city: {
      name: 'Tokyo',
      country: 'Japan',
      description: 'Food paradise with more Michelin stars than any other city and incredible street food.',
      highlights: ['Most Michelin stars globally', 'Incredible street food', 'Sushi capital', 'Ramen culture', 'Food innovation'],
      image: 'https://images.pexels.com/photos/1519088/pexels-photo-1519088.jpeg',
      temperature: '1-30°C',
      vibe: 'Culinary capital of the world'
    }
  },

  'sea-affordable': {
    id: 'sea-affordable',
    type: 'result',
    question: 'Your perfect city is...',
    city: {
      name: 'Chiang Mai',
      country: 'Thailand',
      description: 'Digital nomad paradise with ancient temples, mountain views, and incredibly low costs.',
      highlights: ['Very low cost of living', 'Digital nomad friendly', 'Ancient temples', 'Mountain setting', 'Great food'],
      image: 'https://images.pexels.com/photos/1519088/pexels-photo-1519088.jpeg',
      temperature: '15-35°C',
      vibe: 'Affordable mountain paradise'
    }
  },

  'sea-beaches': {
    id: 'sea-beaches',
    type: 'result',
    question: 'Your perfect city is...',
    city: {
      name: 'Phuket',
      country: 'Thailand',
      description: 'Tropical island paradise with world-class beaches, diving, and Thai hospitality.',
      highlights: ['World-class beaches', 'Diving and snorkeling', 'Thai hospitality', 'Island hopping', 'Tropical paradise'],
      image: 'https://images.pexels.com/photos/1054218/pexels-photo-1054218.jpeg',
      temperature: '24-33°C year-round',
      vibe: 'Tropical beach paradise'
    }
  },

  'sea-expat': {
    id: 'sea-expat',
    type: 'result',
    question: 'Your perfect city is...',
    city: {
      name: 'Kuala Lumpur',
      country: 'Malaysia',
      description: 'Modern multicultural metropolis with incredible food, shopping, and expat community.',
      highlights: ['Multicultural metropolis', 'Incredible food scene', 'Modern infrastructure', 'Expat-friendly', 'Shopping paradise'],
      image: 'https://images.pexels.com/photos/1519088/pexels-photo-1519088.jpeg',
      temperature: '23-33°C year-round',
      vibe: 'Modern multicultural hub'
    }
  },

  'oceania-surf': {
    id: 'oceania-surf',
    type: 'result',
    question: 'Your perfect city is...',
    city: {
      name: 'Gold Coast',
      country: 'Australia',
      description: 'Surfer\'s paradise with world-class beaches, theme parks, and laid-back lifestyle.',
      highlights: ['World-class surfing', 'Beautiful beaches', 'Theme parks', 'Laid-back lifestyle', 'Year-round warmth'],
      image: 'https://images.pexels.com/photos/1054218/pexels-photo-1054218.jpeg',
      temperature: '11-28°C',
      vibe: 'Surfer\'s paradise'
    }
  },

  'oceania-city': {
    id: 'oceania-city',
    type: 'result',
    question: 'Your perfect city is...',
    city: {
      name: 'Melbourne',
      country: 'Australia',
      description: 'Cultural capital with incredible coffee, street art, and four seasons in one day.',
      highlights: ['Coffee culture', 'Street art scene', 'Cultural events', 'Four seasons', 'Foodie paradise'],
      image: 'https://images.pexels.com/photos/1519088/pexels-photo-1519088.jpeg',
      temperature: '6-26°C',
      vibe: 'Cultural coffee capital'
    }
  },

  'oceania-nature': {
    id: 'oceania-nature',
    type: 'result',
    question: 'Your perfect city is...',
    city: {
      name: 'Wellington',
      country: 'New Zealand',
      description: 'Windy city with harbor views, creative culture, and incredible nature access.',
      highlights: ['Harbor setting', 'Creative culture', 'Nature access', 'Compact and walkable', 'Film industry'],
      image: 'https://images.pexels.com/photos/1519088/pexels-photo-1519088.jpeg',
      temperature: '6-20°C',
      vibe: 'Creative harbor city'
    }
  },

  // Global climate results
  'global-tropical': {
    id: 'global-tropical',
    type: 'result',
    question: 'Your perfect city is...',
    city: {
      name: 'Medellín',
      country: 'Colombia',
      description: 'City of eternal spring with perfect weather, innovation culture, and mountain setting.',
      highlights: ['Perfect weather year-round', 'Innovation district', 'Mountain setting', 'Friendly locals', 'Growing expat community'],
      image: 'https://images.pexels.com/photos/1519088/pexels-photo-1519088.jpeg',
      temperature: '18-28°C year-round',
      vibe: 'City of eternal spring'
    }
  },

  'global-temperate': {
    id: 'global-temperate',
    type: 'result',
    question: 'Your perfect city is...',
    city: {
      name: 'Lisbon',
      country: 'Portugal',
      description: 'European charm with Atlantic coast, perfect climate, and growing tech scene.',
      highlights: ['Perfect mild climate', 'Atlantic coastline', 'Historic trams', 'Growing tech scene', 'Affordable Europe'],
      image: 'https://images.pexels.com/photos/1519088/pexels-photo-1519088.jpeg',
      temperature: '8-28°C',
      vibe: 'Atlantic European charm'
    }
  },

  'global-continental': {
    id: 'global-continental',
    type: 'result',
    question: 'Your perfect city is...',
    city: {
      name: 'Prague',
      country: 'Czech Republic',
      description: 'Fairy-tale architecture with four distinct seasons, rich history, and affordable living.',
      highlights: ['Fairy-tale architecture', 'Four distinct seasons', 'Rich history', 'Affordable living', 'Beer culture'],
      image: 'https://images.pexels.com/photos/1519088/pexels-photo-1519088.jpeg',
      temperature: '-2-24°C',
      vibe: 'Historic fairy-tale city'
    }
  }
};