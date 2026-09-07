import React, { createContext, useContext, useState, useEffect } from 'react';
import { ROLES, getRoadmapDataForRole, getAllTopicsForRole } from './roleRoadmaps';
import { API_BASE } from './helpers';

const RoleContext = createContext(null);

export const SUPPORTED_LANGUAGES = [
  { key: 'python', name: 'Python', icon: '🐍', color: '#3776AB', ext: 'py' },
  { key: 'java', name: 'Java', icon: '☕', color: '#ED8B00', ext: 'java' },
  { key: 'cpp', name: 'C++', icon: '⚡', color: '#00599C', ext: 'cpp' },
  { key: 'c', name: 'C', icon: '🔧', color: '#555555', ext: 'c' },
  { key: 'javascript', name: 'JavaScript', icon: '🟨', color: '#F7DF1E', ext: 'js' },
];

export function RoleProvider({ children }) {
  const [activeRole, setActiveRole] = useState(null);
  const [preferredLanguage, setPreferredLanguage] = useState('python');
  const [onboardingComplete, setOnboardingComplete] = useState(null); // null = loading
  const [customVideos, setCustomVideos] = useState({});

  // Load saved role from settings
  useEffect(() => {
    fetch(`${API_BASE}/api/settings`)
      .then(r => r.json())
      .then(settings => {
        if (settings.selected_role && ROLES[settings.selected_role]) {
          setActiveRole(settings.selected_role);
          setOnboardingComplete(true);
        } else {
          setOnboardingComplete(false);
        }
        if (settings.preferred_language) {
          setPreferredLanguage(settings.preferred_language);
        }
      })
      .catch(() => {
        // Fallback: check localStorage
        const saved = localStorage.getItem('prep_selected_role');
        if (saved && ROLES[saved]) {
          setActiveRole(saved);
          setOnboardingComplete(true);
        } else {
          setOnboardingComplete(false);
        }
        const savedLang = localStorage.getItem('prep_preferred_language');
        if (savedLang) {
          setPreferredLanguage(savedLang);
        }
      });

    // Load custom videos
    fetch(`${API_BASE}/api/custom-videos`)
      .then(r => r.json())
      .then(data => {
        const map = {};
        data.forEach(v => {
          const key = `${v.section_id}|${v.topic_name}`;
          if (!map[key]) map[key] = [];
          map[key].push(v);
        });
        setCustomVideos(map);
      })
      .catch(() => {});
  }, []);

  // Select a role (called from onboarding)
  function selectRole(roleKey, language = 'python') {
    setActiveRole(roleKey);
    setPreferredLanguage(language);
    setOnboardingComplete(true);
    localStorage.setItem('prep_selected_role', roleKey);
    localStorage.setItem('prep_preferred_language', language);

    // Save to settings API
    fetch(`${API_BASE}/api/settings`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        selected_role: roleKey,
        preferred_language: language,
        onboarding_complete: 'true',
      }),
    }).catch(() => {});
  }

  // Change language on the fly
  function changeLanguage(langKey) {
    setPreferredLanguage(langKey);
    localStorage.setItem('prep_preferred_language', langKey);
    fetch(`${API_BASE}/api/settings`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ preferred_language: langKey }),
    }).catch(() => {});
  }

  // Switch role
  function switchRole() {
    setOnboardingComplete(false);
  }

  // Add custom video to a topic
  function addCustomVideo(sectionId, topicName, videoTitle, youtubeUrl) {
    const key = `${sectionId}|${topicName}`;
    const video = { section_id: sectionId, topic_name: topicName, video_title: videoTitle, youtube_url: youtubeUrl };

    setCustomVideos(prev => ({
      ...prev,
      [key]: [...(prev[key] || []), video],
    }));

    fetch(`${API_BASE}/api/custom-videos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(video),
    }).catch(() => {});
  }

  // Remove custom video
  function removeCustomVideo(videoId, sectionId, topicName) {
    const key = `${sectionId}|${topicName}`;
    setCustomVideos(prev => ({
      ...prev,
      [key]: (prev[key] || []).filter(v => v.id !== videoId),
    }));

    fetch(`${API_BASE}/api/custom-videos/${videoId}`, { method: 'DELETE' }).catch(() => {});
  }

  // Get custom videos for a topic
  function getCustomVideos(sectionId, topicName) {
    return customVideos[`${sectionId}|${topicName}`] || [];
  }

  // Get the active role data
  const roleData = activeRole ? ROLES[activeRole] : null;
  const roadmapData = activeRole ? getRoadmapDataForRole(activeRole) : {};
  const allTopics = activeRole ? getAllTopicsForRole(activeRole) : [];

  const value = {
    activeRole,
    roleData,
    roadmapData,
    allTopics,
    preferredLanguage,
    changeLanguage,
    onboardingComplete,
    selectRole,
    switchRole,
    addCustomVideo,
    removeCustomVideo,
    getCustomVideos,
    ROLES,
    SUPPORTED_LANGUAGES,
  };

  return (
    <RoleContext.Provider value={value}>
      {children}
    </RoleContext.Provider>
  );
}

export function useRole() {
  const context = useContext(RoleContext);
  if (!context) throw new Error('useRole must be used within a RoleProvider');
  return context;
}

export default RoleContext;
