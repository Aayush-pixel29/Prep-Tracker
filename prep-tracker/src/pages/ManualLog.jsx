import React, { useState, useEffect } from 'react';
import { API_BASE, PILLAR_NAMES, PILLAR_ICONS } from '../utils/helpers';

const CATEGORIES = [
  'arrays', 'hashing', 'two_pointers', 'stack', 'sliding_window', 'binary_search',
  'linked_list', 'trees', 'tries', 'heap', 'backtracking', 'graphs',
  'dynamic_programming', 'greedy', 'intervals', 'math', 'bit_manipulation',
  'ml_theory', 'deep_learning', 'nlp', 'computer_vision', 'system_design', 'other',
];

export default function ManualLog() {
  const [activeTab, setActiveTab] = useState('problem');
  const [problems, setProblems] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const [problemForm, setProblemForm] = useState({
    platform: 'leetcode', problem_name: '', problem_url: '', difficulty: 'medium', category: 'arrays', notes: '',
  });

  const [sessionForm, setSessionForm] = useState({
    pillar: 'dsa', topic: '', duration_minutes: 30, notes: '', resources: '',
  });

  useEffect(() => {
    fetch(`${API_BASE}/api/problems?limit=20`).then(r => r.json()).then(setProblems).catch(() => {});
    fetch(`${API_BASE}/api/sessions?limit=20`).then(r => r.json()).then(setSessions).catch(() => {});
  }, []);

  function submitProblem() {
    fetch(`${API_BASE}/api/problems`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(problemForm),
    })
      .then(r => r.json())
      .then(() => {
        fetch(`${API_BASE}/api/problems?limit=20`).then(r => r.json()).then(setProblems);
        setProblemForm({ platform: 'leetcode', problem_name: '', problem_url: '', difficulty: 'medium', category: 'arrays', notes: '' });
        setShowForm(false);
      })
      .catch(() => {});
  }

  function submitSession() {
    const resources = sessionForm.resources ? sessionForm.resources.split('\n').filter(Boolean) : [];
    fetch(`${API_BASE}/api/sessions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...sessionForm, resources }),
    })
      .then(r => r.json())
      .then(() => {
        fetch(`${API_BASE}/api/sessions?limit=20`).then(r => r.json()).then(setSessions);
        setSessionForm({ pillar: 'dsa', topic: '', duration_minutes: 30, notes: '', resources: '' });
        setShowForm(false);
      })
      .catch(() => {});
  }

  function deleteProblem(id) {
    fetch(`${API_BASE}/api/problems/${id}`, { method: 'DELETE' })
      .then(() => setProblems(prev => prev.filter(p => p.id !== id)))
      .catch(() => {});
  }

  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <h1 className="page-header__title">📝 Manual Log & Notes</h1>
            <p className="page-header__subtitle">Log problems, study sessions, and resources manually</p>
          </div>
          <button className="btn btn--primary" onClick={() => setShowForm(true)}>
            + Log Entry
          </button>
        </div>
      </div>

      <div className="page-body">
        {/* Tab toggle */}
        <div className="tabs" style={{ marginBottom: 'var(--space-5)' }}>
          <button className={`tab ${activeTab === 'problem' ? 'tab--active' : ''}`} onClick={() => setActiveTab('problem')}>
            💻 Problems ({problems.length})
          </button>
          <button className={`tab ${activeTab === 'session' ? 'tab--active' : ''}`} onClick={() => setActiveTab('session')}>
            📖 Study Sessions ({sessions.length})
          </button>
        </div>

        {/* Problems List */}
        {activeTab === 'problem' && (
          problems.length > 0 ? (
            <div className="table-container">
              <table className="table">
                <thead>
                  <tr>
                    <th>Problem</th>
                    <th>Platform</th>
                    <th>Difficulty</th>
                    <th>Category</th>
                    <th>Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {problems.map(p => (
                    <tr key={p.id}>
                      <td>
                        <div style={{ fontWeight: 600 }}>{p.problem_name}</div>
                        {p.notes && <div style={{ fontSize: '12px', color: 'var(--text-tertiary)' }}>{p.notes}</div>}
                      </td>
                      <td><span className="badge badge--platform">{p.platform}</span></td>
                      <td><span className={`badge badge--${p.difficulty}`}>{p.difficulty}</span></td>
                      <td style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>{p.category}</td>
                      <td style={{ color: 'var(--text-tertiary)', fontSize: '12px' }}>{new Date(p.solved_at).toLocaleDateString()}</td>
                      <td>
                        <button className="btn btn--ghost btn--sm" onClick={() => deleteProblem(p.id)} style={{ color: 'var(--accent-red)' }}>🗑️</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="empty-state">
              <div className="empty-state__icon">💻</div>
              <div className="empty-state__title">No problems logged</div>
              <div className="empty-state__desc">Log a problem manually or connect the Chrome extension to auto-sync.</div>
            </div>
          )
        )}

        {/* Sessions List */}
        {activeTab === 'session' && (
          sessions.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
              {sessions.map(s => (
                <div key={s.id} className="card" style={{ display: 'flex', gap: 'var(--space-4)', alignItems: 'center' }}>
                  <div style={{ fontSize: '28px' }}>{PILLAR_ICONS[s.pillar] || '📖'}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, fontSize: '14px' }}>{s.topic}</div>
                    <div style={{ fontSize: '12px', color: 'var(--text-secondary)', display: 'flex', gap: 'var(--space-3)', marginTop: '4px' }}>
                      <span className="badge badge--platform">{PILLAR_NAMES[s.pillar] || s.pillar}</span>
                      <span>⏱ {s.duration_minutes}m</span>
                      <span>{new Date(s.created_at).toLocaleDateString()}</span>
                    </div>
                    {s.notes && <div style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '6px' }}>{s.notes}</div>}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <div className="empty-state__icon">📖</div>
              <div className="empty-state__title">No study sessions logged</div>
              <div className="empty-state__desc">Log your study sessions to track time spent on each topic.</div>
            </div>
          )
        )}
      </div>

      {/* Log Entry Modal */}
      {showForm && (
        <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && setShowForm(false)}>
          <div className="modal">
            <div className="modal__title">Log {activeTab === 'problem' ? 'Problem' : 'Study Session'}</div>

            <div className="tabs" style={{ marginBottom: 'var(--space-5)' }}>
              <button className={`tab ${activeTab === 'problem' ? 'tab--active' : ''}`} onClick={() => setActiveTab('problem')}>💻 Problem</button>
              <button className={`tab ${activeTab === 'session' ? 'tab--active' : ''}`} onClick={() => setActiveTab('session')}>📖 Session</button>
            </div>

            {activeTab === 'problem' ? (
              <>
                <div className="form-group">
                  <label className="form-label">Problem Name *</label>
                  <input className="form-input" placeholder="e.g., Two Sum" value={problemForm.problem_name}
                    onChange={e => setProblemForm({ ...problemForm, problem_name: e.target.value })} />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
                  <div className="form-group">
                    <label className="form-label">Platform</label>
                    <select className="form-input form-select" value={problemForm.platform}
                      onChange={e => setProblemForm({ ...problemForm, platform: e.target.value })}>
                      <option value="leetcode">LeetCode</option>
                      <option value="neetcode">NeetCode</option>
                      <option value="hackerrank">HackerRank</option>
                      <option value="gfg">GeeksForGeeks</option>
                      <option value="manual">Manual</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Difficulty</label>
                    <select className="form-input form-select" value={problemForm.difficulty}
                      onChange={e => setProblemForm({ ...problemForm, difficulty: e.target.value })}>
                      <option value="easy">Easy</option>
                      <option value="medium">Medium</option>
                      <option value="hard">Hard</option>
                    </select>
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Category</label>
                  <select className="form-input form-select" value={problemForm.category}
                    onChange={e => setProblemForm({ ...problemForm, category: e.target.value })}>
                    {CATEGORIES.map(c => <option key={c} value={c}>{c.replace(/_/g, ' ')}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">URL (optional)</label>
                  <input className="form-input" placeholder="https://leetcode.com/problems/..." value={problemForm.problem_url}
                    onChange={e => setProblemForm({ ...problemForm, problem_url: e.target.value })} />
                </div>
                <div className="form-group">
                  <label className="form-label">Notes (optional)</label>
                  <textarea className="form-input" placeholder="Key learnings, approach used..."
                    value={problemForm.notes}
                    onChange={e => setProblemForm({ ...problemForm, notes: e.target.value })} />
                </div>
              </>
            ) : (
              <>
                <div className="form-group">
                  <label className="form-label">Topic *</label>
                  <input className="form-input" placeholder="e.g., Backpropagation, Dynamic Programming"
                    value={sessionForm.topic}
                    onChange={e => setSessionForm({ ...sessionForm, topic: e.target.value })} />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
                  <div className="form-group">
                    <label className="form-label">Pillar</label>
                    <select className="form-input form-select" value={sessionForm.pillar}
                      onChange={e => setSessionForm({ ...sessionForm, pillar: e.target.value })}>
                      {Object.entries(PILLAR_NAMES).map(([k, v]) => (
                        <option key={k} value={k}>{PILLAR_ICONS[k]} {v}</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Duration (minutes)</label>
                    <input type="number" className="form-input" value={sessionForm.duration_minutes}
                      onChange={e => setSessionForm({ ...sessionForm, duration_minutes: parseInt(e.target.value) || 0 })} />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Notes</label>
                  <textarea className="form-input" placeholder="What did you learn?"
                    value={sessionForm.notes}
                    onChange={e => setSessionForm({ ...sessionForm, notes: e.target.value })} />
                </div>
                <div className="form-group">
                  <label className="form-label">Resources (one URL per line)</label>
                  <textarea className="form-input" placeholder="https://youtube.com/...\nhttps://docs.python.org/..."
                    value={sessionForm.resources}
                    onChange={e => setSessionForm({ ...sessionForm, resources: e.target.value })} />
                </div>
              </>
            )}

            <div className="modal__actions">
              <button className="btn btn--secondary" onClick={() => setShowForm(false)}>Cancel</button>
              <button className="btn btn--primary"
                onClick={activeTab === 'problem' ? submitProblem : submitSession}
                disabled={activeTab === 'problem' ? !problemForm.problem_name : !sessionForm.topic}>
                Save Entry
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
