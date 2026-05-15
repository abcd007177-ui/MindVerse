export const conversations = [
  {
    id: '1',
    characterName: 'Ayanokoji',
    emoji: '🧊',
    tagline: 'Strategic Cold Thinker',
    category: 'Anime',
    tags: ['Emotionally Detached', 'INTJ', 'Calculated'],
    lastMessage: 'Your emotions are your greatest weakness...',
    timestamp: '2m ago',
    unread: 2,
    isOnline: true,
    philosophy: 'People are nothing but pieces on the board.',
    stats: { intelligence: 99, strategic: 98, emotional_control: 95, discipline: 90, creativity: 88, confidence: 85, leadership: 75, charisma: 40 }
  },
  {
    id: '2',
    characterName: 'David Goggins',
    emoji: '🔥',
    tagline: 'Discipline Incarnate',
    category: 'Motivator',
    tags: ['Anti-Excuse', 'Relentless', 'ESTJ'],
    lastMessage: 'Stop making excuses. Period.',
    timestamp: '15m ago',
    unread: 0,
    isOnline: true,
    philosophy: 'The only way to grow is to go beyond what you think you can do.',
    stats: { intelligence: 75, strategic: 70, emotional_control: 85, discipline: 100, creativity: 55, confidence: 99, leadership: 90, charisma: 80 }
  },
  {
    id: '3',
    characterName: 'Tony Stark',
    emoji: '⚡',
    tagline: 'Genius Visionary',
    category: 'Superhero',
    tags: ['Sarcastic', 'Genius', 'ENTP'],
    lastMessage: 'I am Iron Man. Also, you\'re welcome.',
    timestamp: '1h ago',
    unread: 1,
    isOnline: false,
    philosophy: 'Part of the journey is the end.',
    stats: { intelligence: 98, strategic: 88, emotional_control: 55, discipline: 70, creativity: 99, confidence: 97, leadership: 85, charisma: 92 }
  }
];

export const groups = [
  { id: 'g1', name: 'Discipline Council', emoji: '🏛️', members: ['Goggins', 'Batman', 'Jocko'], theme: 'Discipline' },
  { id: 'g2', name: 'Anime Masterminds', emoji: '🧠', members: ['Ayanokoji', 'Light Yagami', 'Lelouch'], theme: 'Strategy' },
  { id: 'g3', name: 'Billionaire Mindset', emoji: '💰', members: ['Elon Musk', 'Tony Stark', 'Naval'], theme: 'Entrepreneur' }
];

export const dummyMessages: Record<string, any[]> = {
  '1': [
    { id: 'm1', role: 'user', content: 'How do I deal with people who try to manipulate me?', timestamp: '10:42 AM' },
    { id: 'm2', role: 'ai', content: 'Manipulation is only effective against those who are unaware of it. Observe the patterns. Understand their goals. Then let them believe they are succeeding — while you control the outcome from the beginning. Never reveal that you know.', timestamp: '10:42 AM' },
    { id: 'm3', role: 'user', content: 'What if they\'re smarter than me?', timestamp: '10:44 AM' },
    { id: 'm4', role: 'ai', content: 'Intelligence is not about raw processing power. It is about information asymmetry. Know more about them than they know about you. That is the only edge that matters.', timestamp: '10:44 AM' }
  ]
};

export const similarMinds = [
  { id: 's1', name: 'Light Yagami', emoji: '🎭', tag: 'Calculated' },
  { id: 's2', name: 'Lelouch', emoji: '👁️', tag: 'Tactical' },
  { id: 's3', name: 'Sherlock Holmes', emoji: '🔍', tag: 'Analytical' }
];
