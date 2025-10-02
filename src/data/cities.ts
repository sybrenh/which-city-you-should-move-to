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
    question: '🌡️ What\'s your ideal climate preference?',
    options: [
      { text: '☀️ Warm year-round - Minimal seasons', nextId: 'americas-warm' },
      { text: '🌤️ Mild with seasons - Four distinct seasons', nextId: 'americas-mild' },
      { text: '❄️ Cold winters - Snow and winter sports', nextId: 'americas-cold' }
    ]
  },

  'americas-warm': {
    id: 'americas-warm',
    type: 'question',
    question: '🏙️ What type of urban environment do you prefer?',
    options: [
      { text: '🌆 Major metropolis - Skyscrapers and bustling energy', nextId: 'americas-warm-large' },
      { text: '🏘️ Mid-size city - Urban amenities with community feel', nextId: 'americas-warm-medium' },
      { text: '🏡 Smaller city - Walkable and intimate', nextId: 'americas-warm-small' }
    ]
  },

  'americas-warm-large': {
    id: 'americas-warm-large',
    type: 'question',
    question: '💼 What\'s your career stage and priorities?',
    options: [
      { text: '🚀 Early career - Networking and opportunities', nextId: 'americas-warm-large-career' },
      { text: '💰 Established - High earning potential', nextId: 'americas-warm-large-money' },
      { text: '🎨 Creative - Arts and entertainment focus', nextId: 'americas-warm-large-creative' },
      { text: '🏖️ Lifestyle - Work-life balance priority', nextId: 'americas-warm-large-lifestyle' }
    ]
  },

  'americas-warm-large-career': {
    id: 'americas-warm-large-career',
    type: 'question',
    question: '🌐 What industry excites you most?',
    options: [
      { text: '💻 Tech and startups', nextId: 'result-austin' },
      { text: '🎬 Entertainment and media', nextId: 'result-los-angeles' },
      { text: '🏦 Finance and business', nextId: 'result-miami' }
    ]
  },

  'americas-warm-large-money': {
    id: 'americas-warm-large-money',
    type: 'question',
    question: '💸 What\'s your approach to cost of living?',
    options: [
      { text: '💎 High cost, high reward - Premium lifestyle', nextId: 'result-san-francisco' },
      { text: '⚖️ Balanced - Good value for money', nextId: 'result-austin' },
      { text: '🏖️ Lower cost - More lifestyle for less', nextId: 'result-san-diego' }
    ]
  },

  'americas-warm-large-creative': {
    id: 'americas-warm-large-creative',
    type: 'result',
    question: 'Your perfect city is...',
    city: {
      name: 'Los Angeles',
      country: 'California, USA',
      description: 'The entertainment capital with endless sunshine, diverse neighborhoods, and a thriving creative scene.',
      highlights: ['Entertainment industry hub', 'Year-round sunshine', 'Beach access', 'Diverse food scene', 'Creative communities'],
      image: 'https://images.pexels.com/photos/2695679/pexels-photo-2695679.jpeg',
      temperature: '15-25°C year-round',
      vibe: 'Creative sunshine metropolis'
    }
  },

  'americas-warm-large-lifestyle': {
    id: 'americas-warm-large-lifestyle',
    type: 'result',
    question: 'Your perfect city is...',
    city: {
      name: 'San Diego',
      country: 'California, USA',
      description: 'Perfect weather, beautiful beaches, and a laid-back lifestyle in America\'s finest city.',
      highlights: ['Perfect weather year-round', 'Beautiful beaches', 'Outdoor lifestyle', 'Craft beer scene', 'Relaxed pace'],
      image: 'https://images.pexels.com/photos/1054218/pexels-photo-1054218.jpeg',
      temperature: '14-24°C year-round',
      vibe: 'Laid-back beach paradise'
    }
  },
  'americas-mild': {
    id: 'americas-mild',
    type: 'question',
    question: '🏞️ What draws you to a four-season climate?',
    options: [
      { text: '🍂 Seasonal beauty - Fall colors and spring blooms', nextId: 'americas-mild-seasons' },
      { text: '🏔️ Outdoor activities - Hiking, skiing, water sports', nextId: 'americas-mild-outdoor' },
      { text: '🏛️ Cultural richness - Museums, arts, history', nextId: 'americas-mild-culture' }
    ]
  },

  'americas-mild-seasons': {
    id: 'americas-mild-seasons',
    type: 'question',
    question: '🎨 What type of cultural scene appeals to you?',
    options: [
      { text: '🎭 Traditional arts - Opera, theater, classical', nextId: 'americas-mild-seasons-traditional' },
      { text: '🎸 Modern culture - Music, festivals, nightlife', nextId: 'americas-mild-seasons-modern' },
      { text: '🌍 International - Diverse, multicultural', nextId: 'americas-mild-seasons-international' }
    ]
  },

  'americas-mild-seasons-traditional': {
    id: 'americas-mild-seasons-traditional',
    type: 'result',
    question: 'Your perfect city is...',
    city: {
      name: 'Boston',
      country: 'Massachusetts, USA',
      description: 'Historic charm meets academic excellence in this walkable city with four distinct seasons.',
      highlights: ['Rich American history', 'World-class universities', 'Walkable neighborhoods', 'Fall foliage', 'Cultural institutions'],
      image: 'https://images.pexels.com/photos/1519088/pexels-photo-1519088.jpeg',
      temperature: '-2-27°C',
      vibe: 'Historic academic hub'
    }
  },

  'americas-mild-seasons-modern': {
    id: 'americas-mild-seasons-modern',
    type: 'result',
    question: 'Your perfect city is...',
    city: {
      name: 'Nashville',
      country: 'Tennessee, USA',
      description: 'Music City with a booming economy, incredible food scene, and Southern hospitality.',
      highlights: ['Music capital', 'Growing tech scene', 'Southern cuisine', 'Friendly culture', 'Live music everywhere'],
      image: 'https://images.pexels.com/photos/2469122/pexels-photo-2469122.jpeg',
      temperature: '2-31°C',
      vibe: 'Musical Southern charm'
    }
  },

  'americas-mild-seasons-international': {
    id: 'americas-mild-seasons-international',
    type: 'result',
    question: 'Your perfect city is...',
    city: {
      name: 'Toronto',
      country: 'Ontario, Canada',
      description: 'Multicultural metropolis with world-class dining, arts scene, and four distinct seasons.',
      highlights: ['Most multicultural city', 'World-class food scene', 'Arts and culture', 'Four seasons', 'Safe and clean'],
      image: 'https://images.pexels.com/photos/1519088/pexels-photo-1519088.jpeg',
      temperature: '-6-26°C',
      vibe: 'Multicultural metropolis'
    }
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

  'americas-mild-outdoor': {
    id: 'americas-mild-outdoor',
    type: 'question',
    question: '⛰️ What outdoor activities excite you most?',
    options: [
      { text: '🏔️ Mountain adventures - Hiking, skiing, climbing', nextId: 'americas-mild-outdoor-mountains' },
      { text: '🌊 Water activities - Lakes, rivers, coastal access', nextId: 'americas-mild-outdoor-water' },
      { text: '🌲 Forest exploration - Trails, camping, nature', nextId: 'americas-mild-outdoor-forest' }
    ]
  },

  'americas-mild-outdoor-mountains': {
    id: 'americas-mild-outdoor-mountains',
    type: 'result',
    question: 'Your perfect city is...',
    city: {
      name: 'Denver',
      country: 'Colorado, USA',
      description: 'Mile-high city with 300+ days of sunshine and world-class outdoor recreation.',
      highlights: ['300+ sunny days', 'World-class skiing', 'Craft beer scene', 'Outdoor lifestyle', 'Mountain access'],
      image: 'https://images.pexels.com/photos/2265876/pexels-photo-2265876.jpeg',
      temperature: '-2-28°C',
      vibe: 'Sunny mountain adventure'
    }
  },

  'americas-mild-outdoor-water': {
    id: 'americas-mild-outdoor-water',
    type: 'result',
    question: 'Your perfect city is...',
    city: {
      name: 'Seattle',
      country: 'Washington, USA',
      description: 'Tech hub surrounded by water and mountains, with incredible coffee culture.',
      highlights: ['Tech industry center', 'Coffee capital', 'Mountain and water views', 'Music scene', 'Progressive culture'],
      image: 'https://images.pexels.com/photos/1519088/pexels-photo-1519088.jpeg',
      temperature: '4-22°C',
      vibe: 'Tech-forward nature city'
    }
  },

  'americas-mild-outdoor-forest': {
    id: 'americas-mild-outdoor-forest',
    type: 'result',
    question: 'Your perfect city is...',
    city: {
      name: 'Portland',
      country: 'Oregon, USA',
      description: 'Keep Portland weird in this eco-friendly city with incredible food and nature access.',
      highlights: ['Eco-friendly culture', 'Food truck paradise', 'Craft beer capital', 'Forest access', 'Quirky and creative'],
      image: 'https://images.pexels.com/photos/1519088/pexels-photo-1519088.jpeg',
      temperature: '3-26°C',
      vibe: 'Quirky eco paradise'
    }
  },

  'americas-mild-culture': {
    id: 'americas-mild-culture',
    type: 'question',
    question: '🎭 What type of cultural experience do you seek?',
    options: [
      { text: '🇫🇷 European influence - French culture and cuisine', nextId: 'americas-mild-culture-french' },
      { text: '🎨 Arts and festivals - Creative and vibrant', nextId: 'americas-mild-culture-arts' },
      { text: '🏛️ History and tradition - Deep cultural roots', nextId: 'americas-mild-culture-history' }
    ]
  },

  'americas-mild-culture-french': {
    id: 'americas-mild-culture-french',
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

  'americas-mild-culture-arts': {
    id: 'americas-mild-culture-arts',
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

'americas-mild-culture-history': {
id: 'americas-mild-culture-history',
type: 'result',
question: 'Your perfect city is...',
city: {
    name: 'Philadelphia',
    country: 'Pennsylvania, USA',
    description: 'Historic city with rich culture, great food, and walkable neighborhoods.',
    highlights: [
    'American history',
    'Incredible food scene',
    'Affordable living',
    'Walkable neighborhoods',
    'Cultural institutions'
    ],
    image: 'https://images.pexels.com/photos/358259/pexels-photo-358259.jpeg',
    temperature: '-2-30°C',
    vibe: 'Historic and vibrant'
}
},

  'americas-cold-sports': {
    id: 'americas-cold-sports',
    type: 'question',
    question: '🏙️ What type of winter sports city appeals to you?',
    options: [
      { text: '🌆 Major city with nearby slopes', nextId: 'americas-cold-sports-city' },
      { text: '🏔️ Mountain resort town', nextId: 'americas-cold-sports-resort' },
      { text: '🏒 Hockey and ice sports focused', nextId: 'americas-cold-sports-ice' }
    ]
  },

  'americas-cold-sports-city': {
    id: 'americas-cold-sports-city',
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

  'americas-cold-sports-resort': {
    id: 'americas-cold-sports-resort',
    type: 'result',
    question: 'Your perfect city is...',
    city: {
      name: 'Aspen',
      country: 'Colorado, USA',
      description: 'Luxury mountain resort town with world-class skiing and upscale mountain living.',
      highlights: ['World-class skiing', 'Luxury mountain living', 'Cultural events', 'Stunning scenery', 'Outdoor recreation'],
      image: 'https://images.pexels.com/photos/1730877/pexels-photo-1730877.jpeg',
      temperature: '-10-24°C',
      vibe: 'Luxury mountain paradise'
    }
  },

  'americas-cold-sports-ice': {
    id: 'americas-cold-sports-ice',
    type: 'result',
    question: 'Your perfect city is...',
    city: {
      name: 'Minneapolis',
      country: 'Minnesota, USA',
      description: 'Twin Cities with great hockey culture, beautiful lakes, and strong winter sports tradition.',
      highlights: ['Hockey culture', 'Beautiful lakes', 'Winter sports', 'Arts scene', 'Friendly Midwest culture'],
      image: 'https://images.pexels.com/photos/1519088/pexels-photo-1519088.jpeg',
      temperature: '-11-28°C',
      vibe: 'Winter sports paradise'
    }
  },

  'americas-cold-cozy': {
    id: 'americas-cold-cozy',
    type: 'question',
    question: '🏠 What type of cozy winter experience do you want?',
    options: [
      { text: '🇫🇷 European-style charm - Cobblestones and cafes', nextId: 'americas-cold-cozy-european' },
      { text: '🏘️ Small town warmth - Community and tradition', nextId: 'americas-cold-cozy-small' },
      { text: '🌲 Cabin culture - Rustic and natural', nextId: 'americas-cold-cozy-rustic' }
    ]
  },

  'americas-cold-cozy-european': {
    id: 'americas-cold-cozy-european',
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

  'americas-cold-cozy-small': {
    id: 'americas-cold-cozy-small',
    type: 'result',
    question: 'Your perfect city is...',
    city: {
      name: 'Burlington',
      country: 'Vermont, USA',
      description: 'Charming college town with Lake Champlain, craft beer, and cozy New England winters.',
      highlights: ['Lake Champlain', 'College town energy', 'Craft beer scene', 'New England charm', 'Outdoor recreation'],
      image: 'https://images.pexels.com/photos/1519088/pexels-photo-1519088.jpeg',
      temperature: '-9-26°C',
      vibe: 'Cozy college town'
    }
  },

  'americas-cold-cozy-rustic': {
    id: 'americas-cold-cozy-rustic',
    type: 'result',
    question: 'Your perfect city is...',
    city: {
      name: 'Anchorage',
      country: 'Alaska, USA',
      description: 'Last frontier living with incredible wilderness access and unique Alaskan culture.',
      highlights: ['Wilderness access', 'Northern lights', 'Unique culture', 'Outdoor adventures', 'Frontier spirit'],
      image: 'https://images.pexels.com/photos/1761282/pexels-photo-1761282.jpeg',
      temperature: '-11-18°C',
      vibe: 'Frontier wilderness'
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

'europe-region': {
  id: 'europe-region',
  type: 'question',
  question: '🏛️ Which region and lifestyle appeals to you most?',
  options: [
    { text: '🏛️ Western Europe - Rich history and established culture', nextId: 'western-europe' },
    { text: '🌅 Mediterranean - Coastal lifestyle and warm climate', nextId: 'mediterranean' },
    { text: '🌲 Northern Europe - Design, nature, and quality of life', nextId: 'northern-europe' },
    { text: '🦁 Africa - Adventure, growth, and unique experiences', nextId: 'africa' }
  ]
},
  // Add more detailed paths for each European region...
  // (I'll add a few key ones to show the pattern)

  'europe-english': {
    id: 'europe-english',
    type: 'question',
    question: '🏰 What type of English-speaking experience do you want?',
    options: [
      { text: '🏴󠁧󠁢󠁳󠁣󠁴󠁿 Scottish charm - Edinburgh\'s festivals and history', nextId: 'result-edinburgh' },
      { text: '🇮🇪 Irish culture - Dublin\'s pubs and literature', nextId: 'result-dublin' },
      { text: '🇬🇧 London cosmopolitan - Global city experience', nextId: 'result-london' }
    ]
  },

  'result-edinburgh': {
    id: 'result-edinburgh',
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

  'result-dublin': {
    id: 'result-dublin',
    type: 'result',
    question: 'Your perfect city is...',
    city: {
      name: 'Dublin',
      country: 'Ireland',
      description: 'Literary capital with friendly pubs, Georgian architecture, and Irish charm.',
      highlights: ['Literary heritage', 'Pub culture', 'Georgian architecture', 'Friendly locals', 'Tech hub'],
      image: 'https://images.pexels.com/photos/1519088/pexels-photo-1519088.jpeg',
      temperature: '4-20°C',
      vibe: 'Literary pub culture'
    }
  },

  'result-london': {
    id: 'result-london',
    type: 'result',
    question: 'Your perfect city is...',
    city: {
      name: 'London',
      country: 'England, UK',
      description: 'Global metropolis with royal history, world-class museums, and multicultural energy.',
      highlights: ['Global financial center', 'Royal history', 'World-class museums', 'Multicultural', 'Theater district'],
      image: 'https://images.pexels.com/photos/1519088/pexels-photo-1519088.jpeg',
      temperature: '2-23°C',
      vibe: 'Global cultural metropolis'
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
      image: 'https://images.pexels.com/photos/1519088/pexels-photo-1519088.jpeg', // Placeholder image
      temperature: '0-27°C',
      vibe: 'French gastronomic capital'
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
      image: 'https://images.pexels.com/photos/1519088/pexels-photo-1519088.jpeg', // Placeholder image
      temperature: '6-33°C',
      vibe: 'Ancient historic cradle'
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
      image: 'https://images.pexels.com/photos/1519088/pexels-photo-1519088.jpeg', // Placeholder image
      temperature: '-3-22°C',
      vibe: 'Innovative archipelago capital'
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

  // Asia & Oceania Questions
  'asia-pacific': {
    id: 'asia-pacific',
    type: 'question',
    question: '🌏 Which Asia-Pacific region and culture interests you most?',
    options: [
      { text: '🏮 East Asia - Modern technology meets ancient tradition', nextId: 'east-asia' },
      { text: '🕌 Southeast Asia - Tropical paradise with diverse cultures', nextId: 'southeast-asia' },
      { text: '🦘 Oceania - Outdoor lifestyle and relaxed living', nextId: 'oceania' },
      { text: '🏔️ South Asia - Spiritual culture and mountain landscapes', nextId: 'south-asia' }
    ]
  },

  'east-asia': {
    id: 'east-asia',
    type: 'question',
    question: '🏙️ What aspect of East Asian culture appeals to you most?',
    options: [
      { text: '🤖 Ultra-modern tech cities - Innovation and efficiency', nextId: 'asia-tech' },
      { text: '🏯 Traditional culture & temples - Ancient wisdom and beauty', nextId: 'asia-traditional' },
      { text: '🍜 Food culture paradise - Culinary excellence and variety', nextId: 'asia-food' }
    ]
  },

  'southeast-asia': {
    id: 'southeast-asia',
    type: 'question',
    question: '🌴 What draws you to Southeast Asia?',
    options: [
      { text: '💰 Low cost of living - Affordable paradise', nextId: 'sea-affordable' },
      { text: '🏖️ Tropical beach lifestyle - Island hopping and diving', nextId: 'sea-beaches' },
      { text: '🌆 Modern expat-friendly cities - Urban convenience', nextId: 'sea-expat' }
    ]
  },

  'oceania': {
    id: 'oceania',
    type: 'question',
    question: '🌊 What aspect of Oceania lifestyle appeals to you?',
    options: [
      { text: '🏄‍♂️ Surf and beach culture - Coastal living and water sports', nextId: 'oceania-surf' },
      { text: '🏙️ Cosmopolitan city life - Urban sophistication down under', nextId: 'oceania-city' },
      { text: '🌿 Nature and outdoor adventures - Unique wildlife and landscapes', nextId: 'oceania-nature' }
    ]
  },

  'south-asia': {
    id: 'south-asia',
    type: 'question',
    question: '🏔️ What draws you to South Asia?',
    options: [
      { text: '🏔️ Mountain adventures - Himalayas and trekking', nextId: 'south-asia-mountains' },
      { text: '🕉️ Spiritual culture - Yoga, meditation, and temples', nextId: 'south-asia-spiritual' },
      { text: '🌆 Modern cities - Tech hubs and urban growth', nextId: 'south-asia-modern' }
    ]
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
      highlights: ['Petronas Towers', 'Incredible street food', 'Expat friendly', 'Multicultural', 'Shopping paradise'],
      image: 'https://images.pexels.com/photos/1519088/pexels-photo-1519088.jpeg',
      temperature: '23-33°C year-round',
      vibe: 'Modern multicultural metropolis'
    }
  },

  'oceania-surf': {
    id: 'oceania-surf',
    type: 'result',
    question: 'Your perfect city is...',
    city: {
      name: 'Gold Coast',
      country: 'Australia',
      description: 'Sun-drenched city famous for its surfing beaches, theme parks, and vibrant nightlife.',
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
      name: 'Queenstown',
      country: 'New Zealand',
      description: 'Adventure capital of the world, surrounded by majestic mountains and a crystal clear lake.',
      highlights: ['Adventure sports', 'Stunning scenery', 'Hiking and skiing', 'Lord of the Rings locations', 'Outdoor lifestyle'],
      image: 'https://images.pexels.com/photos/2191013/pexels-photo-2191013.jpeg',
      temperature: '0-22°C',
      vibe: 'Adventure capital'
    }
  },

  'south-asia-mountains': {
    id: 'south-asia-mountains',
    type: 'result',
    question: 'Your perfect city is...',
    city: {
      name: 'Kathmandu',
      country: 'Nepal',
      description: 'Gateway to the Himalayas with ancient temples, mountain culture, and trekking adventures.',
      highlights: ['Himalayan gateway', 'Ancient temples', 'Trekking culture', 'Mountain views', 'Spiritual atmosphere'],
      image: 'https://images.pexels.com/photos/1519088/pexels-photo-1519088.jpeg',
      temperature: '2-29°C',
      vibe: 'Himalayan spiritual gateway'
    }
  },

  'south-asia-spiritual': {
    id: 'south-asia-spiritual',
    type: 'result',
    question: 'Your perfect city is...',
    city: {
      name: 'Rishikesh',
      country: 'India',
      description: 'Yoga capital of the world with spiritual ashrams, Ganges river, and mountain setting.',
      highlights: ['Yoga capital', 'Spiritual ashrams', 'Ganges river', 'Mountain setting', 'Meditation retreats'],
      image: 'https://images.pexels.com/photos/1519088/pexels-photo-1519088.jpeg',
      temperature: '6-38°C',
      vibe: 'Spiritual yoga paradise'
    }
  },

  'south-asia-modern': {
    id: 'south-asia-modern',
    type: 'result',
    question: 'Your perfect city is...',
    city: {
      name: 'Bangalore',
      country: 'India',
      description: 'Silicon Valley of India with tech innovation, pleasant climate, and cosmopolitan culture.',
      highlights: ['Tech innovation hub', 'Pleasant climate', 'Cosmopolitan culture', 'Startup ecosystem', 'Garden city'],
      image: 'https://images.pexels.com/photos/1519088/pexels-photo-1519088.jpeg',
      temperature: '15-28°C',
      vibe: 'Tech innovation garden city'
    }
  },

  'global-tropical': {
    id: 'global-tropical',
    type: 'question',
    question: '🌴 What type of tropical lifestyle appeals to you?',
    options: [
      { text: '🏝️ Island paradise - Beaches and relaxation', nextId: 'global-tropical-island' },
      { text: '🌆 Tropical metropolis - Urban energy with warm weather', nextId: 'global-tropical-city' },
      { text: '🌿 Jungle and nature - Eco-friendly tropical living', nextId: 'global-tropical-nature' }
    ]
  },

  'global-tropical-island': {
    id: 'global-tropical-island',
    type: 'result',
    question: 'Your perfect city is...',
    city: {
      name: 'Honolulu',
      country: 'Hawaii, USA',
      description: 'Pacific paradise with perfect weather, beautiful beaches, and island culture.',
      highlights: ['Perfect weather year-round', 'Beautiful beaches', 'Island culture', 'Outdoor lifestyle', 'Multicultural'],
      image: 'https://images.pexels.com/photos/1054218/pexels-photo-1054218.jpeg',
      temperature: '18-31°C year-round',
      vibe: 'Pacific island paradise'
    }
  },

  'global-tropical-nature': {
    id: 'global-tropical-nature',
    type: 'result',
    question: 'Your perfect city is...',
    city: {
      name: 'San José',
      country: 'Costa Rica',
      description: 'Eco-paradise with incredible biodiversity, sustainable living, and pura vida lifestyle.',
      highlights: ['Incredible biodiversity', 'Eco-friendly culture', 'Pura vida lifestyle', 'Adventure activities', 'Sustainable living'],
      image: 'https://images.pexels.com/photos/1519088/pexels-photo-1519088.jpeg',
      temperature: '17-27°C year-round',
      vibe: 'Eco-paradise pura vida'
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
}
