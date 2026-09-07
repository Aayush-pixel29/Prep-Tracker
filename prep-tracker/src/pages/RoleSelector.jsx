import React, { useState } from 'react';
import { ROLES, getRoleTopicCount } from '../utils/roleRoadmaps';
import { useRole } from '../utils/RoleContext';

const LANGUAGE_OPTIONS = [
  { key: 'python', name: 'Python', icon: '🐍', description: 'Most popular for AI/ML, Data Science, and scripting' },
  { key: 'java', name: 'Java', icon: '☕', description: 'Enterprise standard, Android development' },
  { key: 'cpp', name: 'C++', icon: '⚡', description: 'High performance, competitive programming' },
  { key: 'javascript', name: 'JavaScript', icon: '🟨', description: 'Web development, full-stack, React/Node' },
  { key: 'c', name: 'C', icon: '🔧', description: 'Systems programming, embedded, OS fundamentals' },
];

export default function RoleSelector() {
  const { selectRole } = useRole();
  const [selectedRole, setSelectedRole] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState('python');
  const [step, setStep] = useState(1); // 1: role, 2: language, 3: confirm

  function handleContinue() {
    if (step === 1 && selectedRole) {
      setStep(2);
    } else if (step === 2) {
      setStep(3);
    }
  }

  function handleStart() {
    if (selectedRole) {
      selectRole(selectedRole, selectedLanguage);
    }
  }

  const roleEntries = Object.entries(ROLES);

  return (
    <div className="role-selector">
      {/* Background decoration */}
      <div className="role-selector__bg-glow role-selector__bg-glow--1" />
      <div className="role-selector__bg-glow role-selector__bg-glow--2" />

      <div className="role-selector__container">
        {/* Header */}
        <div className="role-selector__header">
          <div className="role-selector__logo">🚀</div>
          <h1 className="role-selector__title">
            Welcome to <span className="role-selector__brand">PrepTracker</span>
          </h1>
          <p className="role-selector__subtitle">
            {step === 1 && "Choose your target role and get a complete learning roadmap with videos, theory, and practice problems."}
            {step === 2 && "Select your preferred programming language for DSA practice."}
            {step === 3 && "Ready to start your journey? Here's what's ahead."}
          </p>

          {/* Step indicator */}
          <div className="role-selector__steps">
            {[1, 2, 3].map(s => (
              <div key={s} className={`role-selector__step ${step >= s ? 'role-selector__step--active' : ''}`}>
                <div className="role-selector__step-dot">{step > s ? '✓' : s}</div>
                <span className="role-selector__step-label">
                  {s === 1 ? 'Choose Role' : s === 2 ? 'Language' : 'Confirm'}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Step 1: Role Selection */}
        {step === 1 && (
          <div className="role-selector__grid animate-fade-in">
            {roleEntries.map(([key, role]) => {
              const topicCount = getRoleTopicCount(key);
              const isSelected = selectedRole === key;

              return (
                <div
                  key={key}
                  className={`role-card ${isSelected ? 'role-card--selected' : ''}`}
                  onClick={() => setSelectedRole(key)}
                  style={{ '--role-gradient': role.gradient, '--role-accent': role.accentColor }}
                >
                  <div className="role-card__glow" />
                  <div className="role-card__content">
                    <div className="role-card__icon">{role.icon}</div>
                    <h3 className="role-card__name">{role.name}</h3>
                    <p className="role-card__tagline">{role.tagline}</p>

                    <div className="role-card__stats">
                      <div className="role-card__stat">
                        <span className="role-card__stat-value">{role.phases.length}</span>
                        <span className="role-card__stat-label">Phases</span>
                      </div>
                      <div className="role-card__stat">
                        <span className="role-card__stat-value">{topicCount}</span>
                        <span className="role-card__stat-label">Topics</span>
                      </div>
                      <div className="role-card__stat">
                        <span className="role-card__stat-value">~{role.estimatedWeeks}w</span>
                        <span className="role-card__stat-label">Duration</span>
                      </div>
                    </div>

                    <div className="role-card__highlights">
                      {role.highlights.map((h, i) => (
                        <span key={i} className="role-card__tag">{h}</span>
                      ))}
                    </div>

                    {isSelected && (
                      <div className="role-card__check">✓</div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Step 2: Language Selection */}
        {step === 2 && (
          <div className="role-selector__languages animate-fade-in">
            {LANGUAGE_OPTIONS.map(lang => {
              const isSelected = selectedLanguage === lang.key;
              return (
                <div
                  key={lang.key}
                  className={`lang-card ${isSelected ? 'lang-card--selected' : ''}`}
                  onClick={() => setSelectedLanguage(lang.key)}
                >
                  <div className="lang-card__icon">{lang.icon}</div>
                  <div className="lang-card__info">
                    <div className="lang-card__name">{lang.name}</div>
                    <div className="lang-card__desc">{lang.description}</div>
                  </div>
                  {isSelected && <div className="lang-card__check">✓</div>}
                </div>
              );
            })}
            <p className="role-selector__note">
              💡 This affects video search suggestions. You can always search for any language!
            </p>
          </div>
        )}

        {/* Step 3: Confirmation */}
        {step === 3 && selectedRole && (
          <div className="role-selector__confirm animate-fade-in">
            <div className="confirm-card" style={{ '--role-gradient': ROLES[selectedRole].gradient }}>
              <div className="confirm-card__icon">{ROLES[selectedRole].icon}</div>
              <h2 className="confirm-card__role">{ROLES[selectedRole].name}</h2>
              <p className="confirm-card__language">
                Preferred Language: <strong>{LANGUAGE_OPTIONS.find(l => l.key === selectedLanguage)?.name}</strong>
              </p>

              <div className="confirm-card__phases">
                <h4>Your Learning Journey</h4>
                {ROLES[selectedRole].phases.map((phase, i) => (
                  <div key={i} className="confirm-card__phase">
                    <span className="confirm-card__phase-icon">{phase.icon}</span>
                    <div>
                      <div className="confirm-card__phase-name">{phase.name}</div>
                      <div className="confirm-card__phase-duration">{phase.duration} • {phase.sections.reduce((sum, s) => sum + s.topics.length, 0)} topics</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="confirm-card__features">
                <div className="confirm-card__feature">📹 YouTube video search for every topic</div>
                <div className="confirm-card__feature">📖 Theory guides and cheat sheets</div>
                <div className="confirm-card__feature">🔗 Practice links to LeetCode & more</div>
                <div className="confirm-card__feature">🔥 Streak tracking and consistency insights</div>
                <div className="confirm-card__feature">🎤 Interview prep and system design</div>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="role-selector__actions">
          {step > 1 && (
            <button className="role-selector__btn role-selector__btn--back" onClick={() => setStep(step - 1)}>
              ← Back
            </button>
          )}
          {step < 3 ? (
            <button
              className="role-selector__btn role-selector__btn--next"
              disabled={step === 1 && !selectedRole}
              onClick={handleContinue}
              style={selectedRole ? { background: ROLES[selectedRole]?.gradient } : {}}
            >
              Continue →
            </button>
          ) : (
            <button
              className="role-selector__btn role-selector__btn--start"
              onClick={handleStart}
              style={{ background: ROLES[selectedRole]?.gradient }}
            >
              🚀 Start My Journey
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
