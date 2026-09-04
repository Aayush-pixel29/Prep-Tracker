export const API_BASE = 'http://localhost:3847';

export async function api(endpoint, options = {}) {
  const url = `${API_BASE}${endpoint}`;
  const config = {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  };
  if (options.body && typeof options.body === 'object') {
    config.body = JSON.stringify(options.body);
  }
  const res = await fetch(url, config);
  if (!res.ok) throw new Error(`API Error: ${res.status}`);
  return res.json();
}

export function formatDate(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export function formatTime(minutes) {
  if (minutes < 60) return `${minutes}m`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m > 0 ? `${h}h ${m}m` : `${h}h`;
}

export function getToday() {
  return new Date().toISOString().split('T')[0];
}

export function getDaysAgo(n) {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d.toISOString().split('T')[0];
}

export function getDayOfWeek(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-US', { weekday: 'short' });
}

export const MOTIVATIONAL_QUOTES = [
  { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
  { text: "It does not matter how slowly you go as long as you do not stop.", author: "Confucius" },
  { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill" },
  { text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
  { text: "Strive not to be a success, but rather to be of value.", author: "Albert Einstein" },
  { text: "The best time to plant a tree was 20 years ago. The second best time is now.", author: "Chinese Proverb" },
  { text: "Your limitation—it's only your imagination.", author: "Unknown" },
  { text: "Don't watch the clock; do what it does. Keep going.", author: "Sam Levenson" },
  { text: "The expert in anything was once a beginner.", author: "Helen Hayes" },
  { text: "Hard work beats talent when talent doesn't work hard.", author: "Tim Notke" },
  { text: "Dream big. Start small. Act now.", author: "Robin Sharma" },
  { text: "Every master was once a disaster.", author: "T. Harv Eker" },
  { text: "Code is like humor. When you have to explain it, it's bad.", author: "Cory House" },
  { text: "First, solve the problem. Then, write the code.", author: "John Johnson" },
  { text: "Consistency is what transforms average into excellence.", author: "Unknown" },
];

export function getTodaysQuote() {
  const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0)) / 86400000);
  return MOTIVATIONAL_QUOTES[dayOfYear % MOTIVATIONAL_QUOTES.length];
}

export const DIFFICULTY_COLORS = {
  easy: 'var(--accent-green)',
  medium: 'var(--accent-orange)',
  hard: 'var(--accent-red)',
};

export const PLATFORM_COLORS = {
  leetcode: '#FFA116',
  neetcode: '#4F46E5',
  hackerrank: '#00EA64',
  gfg: '#2F8D46',
  manual: '#8B5CF6',
};

export const PILLAR_ICONS = {
  dsa: '💻',
  ml_theory: '🧠',
  deep_learning: '🤖',
  specialization: '🎯',
  system_design: '⚙️',
};

export const PILLAR_NAMES = {
  dsa: 'DSA / Coding',
  ml_theory: 'ML Theory',
  deep_learning: 'Deep Learning',
  specialization: 'Specializations',
  system_design: 'System Design & MLOps',
};
