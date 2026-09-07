import React, { useState } from 'react';
import { useGamification } from '../utils/GamificationContext';

const SENIOR_SECTIONS = {
  tradeoffs: {
    name: 'Architectural Trade-Off Matrices',
    icon: '⚖️',
    description: 'First-principles mental models for making defensible architectural choices in technical interviews.',
    items: [
      {
        title: 'CAP Theorem & PACELC',
        problem: 'In a distributed network partition, do we prioritize strong consistency or high availability?',
        tradeoff: 'CP (Consistency + Partition Tolerance) vs AP (Availability + Partition Tolerance). Under normal operation (Else), trade Latency (L) vs Consistency (C).',
        whenToChoose: 'Financial ledgers, payments -> CP (Postgres, CockroachDB). Social feeds, analytics, metrics -> AP (Cassandra, DynamoDB).',
        interviewScript: `"When designing this system, under a network partition, we must choose between strong consistency and availability. For banking and ledger transactions, we strictly enforce CP to avoid double-spends. For the user feed and view counters, we choose AP with eventual consistency, allowing stale reads for 500ms to guarantee 99.999% uptime."`,
      },
      {
        title: 'SQL (Relational) vs NoSQL (Document / Key-Value) vs NewSQL',
        problem: 'How to structure persistence for scale, ACID guarantees, and flexible schema iteration?',
        tradeoff: 'SQL: Strict ACID, complex JOINs, vertical scale ceiling. NoSQL: Horizontal sharding, eventual consistency, schema flexibility. NewSQL: Distributed ACID at scale.',
        whenToChoose: 'Use SQL for relational data models & transactions. Use Key-Value (Redis) for session caches. Use Document (MongoDB) for unstructured catalogs. Use Columnar (ClickHouse) for analytics.',
        interviewScript: `"I recommend a polyglot persistence architecture. We keep user accounts and payment records in PostgreSQL for ACID guarantees, while routing real-time chat messages and user activity streams into Cassandra/ScylloDB for high-throughput write scalability across horizontal shards."`,
      },
      {
        title: 'Cache Invalidation: Cache-Aside vs Write-Through vs Write-Behind',
        problem: 'How to prevent stale data and race conditions between fast RAM caches and database writes?',
        tradeoff: 'Cache-Aside: App reads cache, on miss reads DB & populates cache. Write-Through: Writes update cache & DB synchronously. Write-Behind (Write-Back): Writes hit cache and flush asynchronously to DB.',
        whenToChoose: 'Cache-Aside is the resilient standard for most web apps. Write-Behind is used when write throughput is massive and small data loss on crash is acceptable (e.g., video view counts).',
        interviewScript: `"We implement the Cache-Aside pattern with Redis. When updating a record, we update the primary database first and explicitly invalidate or evict the corresponding Redis key. We attach a 5-minute TTL to every key as a defensive backstop against stale state."`,
      },
      {
        title: 'Monolith vs Microservices vs Modular Monolith',
        problem: 'How to organize services for team velocity, deployment safety, and independent scaling?',
        tradeoff: 'Monolith: Fast local development, single database transactions, low network latency, but deployment bottleneck. Microservices: Independent deployments & horizontal scaling, but distributed debugging and eventual consistency overhead.',
        whenToChoose: 'Start with a Modular Monolith with clean domain boundaries. Decompose into microservices only when specific components require distinct scaling, compliance, or team autonomy.',
        interviewScript: `"Rather than jumping straight to microservices and incurring distributed systems tax (distributed tracing, network hops, saga transactions), I propose a Modular Monolith. We decouple services via domain events in-process first, and carve out independent services only when scaling metrics dictate."`,
      },
    ],
  },
  interview_scripts: {
    name: '60-Second Interview Power Scripts',
    icon: '🎤',
    description: 'Word-for-word executive scripts to structure complex technical answers clearly without rambling.',
    items: [
      {
        title: 'How to answer: "Tell me about a complex technical problem you solved"',
        problem: 'Structuring deep engineering stories using the Staff-level STAR framework.',
        tradeoff: 'Focus on business impact, technical depth, architectural trade-offs, and lessons learned.',
        whenToChoose: 'Use in Lead / Senior / Staff behavioral and system deep-dive rounds.',
        interviewScript: `"At my previous project, our core API latency degraded from 80ms to over 1.2 seconds during peak traffic due to unindexed N+1 database queries and synchronous third-party webhook calls. 

I took ownership by profiling the slow queries using EXPLAIN ANALYZE, added composite B-tree indexes, and decoupled external webhooks using an asynchronous RabbitMQ queue with exponential backoff retries. 

This reduced p99 latency by 85% back to 65ms, eliminated database CPU spikes during flash sales, and saved over $1,200/month in cloud infrastructure costs."`,
      },
      {
        title: 'How to answer: "How would you scale a database experiencing high read traffic?"',
        problem: 'Handling 100k+ read QPS on a relational database.',
        tradeoff: 'Vertical scaling (RAM/CPU) vs Caching (Redis) vs Read Replicas vs Sharding.',
        whenToChoose: 'Use during System Design scaling questions.',
        interviewScript: `"I approach read scaling in four progressive layers:
1. First, optimize queries and ensure proper indexing so every query utilizes index scans rather than full table scans.
2. Second, introduce a distributed caching layer (Redis) in front of the database with Cache-Aside to absorb 90%+ of hot read traffic.
3. Third, set up read replicas with asynchronous replication for read-heavy query distribution.
4. Finally, if dataset size exceeds a single node's capacity, we partition horizontally by a shard key like UserID using consistent hashing."`,
      },
      {
        title: 'How to answer: "How do you handle disagreement with an engineer or manager?"',
        problem: 'Demonstrating emotional intelligence, data-driven decisions, and disagree-and-commit.',
        tradeoff: 'Standing up for code quality vs delivering product deadlines.',
        whenToChoose: 'Top behavioral question in Google, Meta, and Amazon interviews.',
        interviewScript: `"When technical disagreements arise, I decouple ego from engineering. Recently, a teammate wanted to use MongoDB for a transactional billing feature while I advocated for PostgreSQL. 

Instead of debating opinions, I set up a quick prototype measuring schema validation and multi-table atomic rollbacks under failure scenarios. Once we reviewed the hard data together, my teammate agreed Postgres was the safer choice. 

If consensus cannot be reached, we align with the tech lead's decision and I fully commit to executing the chosen path with zero friction."`,
      },
    ],
  },
};

export default function SeniorMindset() {
  const { addXP } = useGamification();
  const [activeTab, setActiveTab] = useState('tradeoffs');
  const [copiedIndex, setCopiedIndex] = useState(null);

  function handleCopy(text, idx) {
    navigator.clipboard.writeText(text);
    setCopiedIndex(idx);
    addXP(50, 'Studied Interview Power Script');
    setTimeout(() => setCopiedIndex(null), 2000);
  }

  const section = SENIOR_SECTIONS[activeTab];

  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <div>
          <h1 className="page-header__title">🧠 Staff Engineer Mindset & Interview Defense</h1>
          <p className="page-header__subtitle">
            Master 1st-principles architectural reasoning and word-for-word interview scripts to communicate like a Staff/Principal Engineer
          </p>
        </div>
      </div>

      <div className="page-body">
        {/* Section Tabs */}
        <div className="tabs" style={{ marginBottom: 'var(--space-5)' }}>
          {Object.entries(SENIOR_SECTIONS).map(([key, sec]) => (
            <button
              key={key}
              className={`tab ${activeTab === key ? 'tab--active' : ''}`}
              onClick={() => setActiveTab(key)}
            >
              <span>{sec.icon}</span>
              <span>{sec.name}</span>
            </button>
          ))}
        </div>

        {/* Section Description Card */}
        <div className="senior-banner">
          <div className="senior-banner__icon">💎</div>
          <div className="senior-banner__content">
            <h3>{section.name}</h3>
            <p>{section.description}</p>
          </div>
        </div>

        {/* Content Items */}
        <div className="senior-grid">
          {section.items.map((item, idx) => (
            <div key={idx} className="senior-card">
              <div className="senior-card__header">
                <span className="senior-card__number">0{idx + 1}</span>
                <h3 className="senior-card__title">{item.title}</h3>
              </div>

              <div className="senior-card__row">
                <span className="senior-card__lbl">🎯 The Problem:</span>
                <p className="senior-card__txt">{item.problem}</p>
              </div>

              <div className="senior-card__row">
                <span className="senior-card__lbl">⚖️ Trade-off Matrix:</span>
                <p className="senior-card__txt">{item.tradeoff}</p>
              </div>

              <div className="senior-card__row">
                <span className="senior-card__lbl">📌 When to Choose:</span>
                <p className="senior-card__txt">{item.whenToChoose}</p>
              </div>

              {/* Word-for-Word Interview Script */}
              <div className="senior-script-box">
                <div className="senior-script-header">
                  <span>🎙️ Word-for-Word Interview Speaking Script:</span>
                  <button
                    className="code-copy-btn"
                    onClick={() => handleCopy(item.interviewScript, idx)}
                  >
                    {copiedIndex === idx ? '✓ Copied Script (+50 XP)!' : '📋 Copy Script'}
                  </button>
                </div>
                <blockquote className="senior-script-quote">
                  {item.interviewScript}
                </blockquote>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
