import React, { createContext, useContext, useState, useEffect } from 'react';
import { API_BASE } from './helpers';

const GamificationContext = createContext(null);

export const SUIT_TIERS = [
  { tier: 1, name: 'Mark I (Apprentice)', minLevel: 1, maxLevel: 5, icon: '🛡️', color: '#94A3B8', glow: 'rgba(148, 163, 184, 0.4)' },
  { tier: 2, name: 'Mark VII (Associate Engineer)', minLevel: 6, maxLevel: 14, icon: '⚡', color: '#38BDF8', glow: 'rgba(56, 189, 248, 0.4)' },
  { tier: 3, name: 'Mark XLII (Senior Engineer)', minLevel: 15, maxLevel: 29, icon: '🔥', color: '#F59E0B', glow: 'rgba(245, 158, 11, 0.4)' },
  { tier: 4, name: 'Mark LXXXV (Staff Architect)', minLevel: 30, maxLevel: 49, icon: '👑', color: '#8B5CF6', glow: 'rgba(139, 92, 246, 0.4)' },
  { tier: 5, name: 'JARVIS Protocol (Principal Master)', minLevel: 50, maxLevel: 999, icon: '💎', color: '#EC4899', glow: 'rgba(236, 72, 153, 0.5)' },
];

export const ALL_BADGES = [
  { id: 'first_blood', name: 'First Blood', desc: 'Master your very first roadmap topic', icon: '⚔️', rarity: 'Common', reqXp: 100 },
  { id: 'polyglot', name: 'Polyglot Coder', desc: 'Study code solutions in 3 different languages', icon: '🌐', rarity: 'Rare', reqXp: 300 },
  { id: 'deep_diver', name: 'Deep Work Master', desc: 'Complete 5 Pomodoro deep work sessions', icon: '🧘', rarity: 'Rare', reqXp: 500 },
  { id: 'algorithm_alchemist', name: 'Algorithm Alchemist', desc: 'Master 10 algorithm & data structure topics', icon: '⚗️', rarity: 'Epic', reqXp: 1000 },
  { id: 'system_titan', name: 'System Titan', desc: 'Study all System Design & Architecture blueprints', icon: '🏗️', rarity: 'Epic', reqXp: 1500 },
  { id: 'market_oracle', name: 'Market Oracle', desc: 'Read 10 Tech Radar industry intelligence updates', icon: '📡', rarity: 'Rare', reqXp: 400 },
  { id: 'interview_unstoppable', name: 'Interview Unstoppable', desc: 'Review 15 Senior Mindset interview scripts', icon: '🎤', rarity: 'Legendary', reqXp: 2000 },
  { id: 'streak_immortal', name: 'Streak Immortal', desc: 'Maintain an unbroken 14-day study streak', icon: '🔥', rarity: 'Legendary', reqXp: 2500 },
];

function getLevelFromXP(xp) {
  // Level curve: Level = floor(sqrt(xp / 50)) + 1
  return Math.floor(Math.sqrt(xp / 50)) + 1;
}

function getXPForLevel(level) {
  return (level - 1) * (level - 1) * 50;
}

function getNextLevelXP(level) {
  return level * level * 50;
}

export function GamificationProvider({ children }) {
  const [xp, setXp] = useState(150); // initial starter XP
  const [unlockedBadges, setUnlockedBadges] = useState(['first_blood']);
  const [dailyQuests, setDailyQuests] = useState([]);
  const [focusSessionsCount, setFocusSessionsCount] = useState(0);
  const [recentXpGain, setRecentXpGain] = useState(null);

  // Initialize from storage or database
  useEffect(() => {
    const todayStr = new Date().toISOString().split('T')[0];
    const savedXp = localStorage.getItem('preptracker_xp');
    if (savedXp) setXp(parseInt(savedXp, 10));

    const savedBadges = localStorage.getItem('preptracker_badges');
    if (savedBadges) {
      try { setUnlockedBadges(JSON.parse(savedBadges)); } catch (e) {}
    }

    const savedFocus = localStorage.getItem('preptracker_focus_sessions');
    if (savedFocus) setFocusSessionsCount(parseInt(savedFocus, 10));

    // Generate daily quests
    const savedQuestsDate = localStorage.getItem('preptracker_quests_date');
    const savedQuests = localStorage.getItem('preptracker_quests');

    if (savedQuestsDate === todayStr && savedQuests) {
      try { setDailyQuests(JSON.parse(savedQuests)); } catch (e) {}
    } else {
      const defaultQuests = [
        { id: 'q1', text: 'Master 1 Roadmap Topic', xpReward: 100, completed: false, icon: '🗺️' },
        { id: 'q2', text: 'Complete a 25m Deep Work Session', xpReward: 75, completed: false, icon: '⏱️' },
        { id: 'q3', text: 'Review 1 Interview Speaking Script', xpReward: 50, completed: false, icon: '🎤' },
      ];
      setDailyQuests(defaultQuests);
      localStorage.setItem('preptracker_quests_date', todayStr);
      localStorage.setItem('preptracker_quests', JSON.stringify(defaultQuests));
    }
  }, []);

  const level = getLevelFromXP(xp);
  const currentLevelBaseXp = getXPForLevel(level);
  const nextLevelXp = getNextLevelXP(level);
  const levelProgressPercent = Math.min(
    100,
    Math.max(0, Math.round(((xp - currentLevelBaseXp) / (nextLevelXp - currentLevelBaseXp)) * 100))
  );

  const currentSuit = SUIT_TIERS.find(s => level >= s.minLevel && level <= s.maxLevel) || SUIT_TIERS[0];

  function addXP(amount, reason = 'Activity') {
    setXp(prev => {
      const updated = prev + amount;
      localStorage.setItem('preptracker_xp', updated.toString());

      // Check for badge unlocks
      const newBadges = [...unlockedBadges];
      ALL_BADGES.forEach(b => {
        if (updated >= b.reqXp && !newBadges.includes(b.id)) {
          newBadges.push(b.id);
        }
      });
      if (newBadges.length !== unlockedBadges.length) {
        setUnlockedBadges(newBadges);
        localStorage.setItem('preptracker_badges', JSON.stringify(newBadges));
      }

      return updated;
    });

    setRecentXpGain({ amount, reason, id: Date.now() });
    setTimeout(() => setRecentXpGain(null), 3000);
  }

  function completeDailyQuest(questId) {
    setDailyQuests(prev => {
      const updated = prev.map(q => {
        if (q.id === questId && !q.completed) {
          addXP(q.xpReward, `Quest: ${q.text}`);
          return { ...q, completed: true };
        }
        return q;
      });
      localStorage.setItem('preptracker_quests', JSON.stringify(updated));
      return updated;
    });
  }

  function recordFocusSession(minutes = 25) {
    setFocusSessionsCount(prev => {
      const updated = prev + 1;
      localStorage.setItem('preptracker_focus_sessions', updated.toString());
      return updated;
    });
    addXP(75, `${minutes}m Deep Work Focus`);
    completeDailyQuest('q2');
  }

  const value = {
    xp,
    level,
    currentLevelBaseXp,
    nextLevelXp,
    levelProgressPercent,
    currentSuit,
    SUIT_TIERS,
    unlockedBadges,
    ALL_BADGES,
    dailyQuests,
    focusSessionsCount,
    recentXpGain,
    addXP,
    completeDailyQuest,
    recordFocusSession,
  };

  return (
    <GamificationContext.Provider value={value}>
      {children}
    </GamificationContext.Provider>
  );
}

export function useGamification() {
  const context = useContext(GamificationContext);
  if (!context) throw new Error('useGamification must be used within GamificationProvider');
  return context;
}

export default GamificationContext;
