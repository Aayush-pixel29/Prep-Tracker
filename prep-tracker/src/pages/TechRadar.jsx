import React, { useState } from 'react';
import { useGamification } from '../utils/GamificationContext';

const TECH_RADAR_DATA = {
  ai_frontier: {
    name: 'AI & LLM Frontier',
    icon: '🤖',
    badge: 'High Demand in 2026',
    topics: [
      {
        title: 'DeepSeek V3 & Reasoning Models (R1 Architecture)',
        category: 'LLMs / Inference',
        impact: 'Critical',
        summary: 'MoE (Mixture of Experts) with Multi-Head Latent Attention (MLA) and DeepSeek-V3 load-balancing algorithms revolutionized compute efficiency. Understanding RL-based reasoning (Chain of Thought distillation) is now a core interview requirement.',
        keyTakeaway: 'Master: MoE routing, KV-cache optimization, FlashAttention-3, and Speculative Decoding.',
        actionLink: 'https://github.com/deepseek-ai/DeepSeek-V3',
      },
      {
        title: 'Agentic Workflows & Multi-Agent Orchestration',
        category: 'AI Engineering',
        impact: 'Explosive',
        summary: 'Shift from single-prompt chatbots to autonomous multi-agent loops with tool-calling, reflection, plan-and-solve workflows, and deterministic guardrails (LangGraph, CrewAI, AutoGen).',
        keyTakeaway: 'Master: Structured JSON tool calling, context window pruning, ReAct loops, and agent checkpointing.',
        actionLink: 'https://github.com/langchain-ai/langgraph',
      },
      {
        title: 'High-Throughput Inference Engines (vLLM & SGLang)',
        category: 'MLOps & Systems',
        impact: 'Standard in Production',
        summary: 'PagedAttention, continuous batching, and chunked prefill enable 10x higher token generation throughput. Production AI engineering now requires infrastructure-level model serving knowledge.',
        keyTakeaway: 'Master: PagedAttention mechanics, tensor parallelism, and Triton inference server configurations.',
        actionLink: 'https://github.com/vllm-project/vllm',
      },
      {
        title: 'Advanced RAG & Vector Databases (Hybrid Search + Reranking)',
        category: 'Data & Retrieval',
        impact: 'Essential',
        summary: 'Basic cosine similarity search fails in production. 2026 standard is Hybrid Search (Dense Embeddings + Sparse BM25) coupled with Cross-Encoder Rerankers and GraphRAG.',
        keyTakeaway: 'Master: Qdrant / Pinecone HNSW indexing, reciprocal rank fusion (RRF), and ColBERT token-level scoring.',
        actionLink: 'https://github.com/qdrant/qdrant',
      },
    ],
  },
  systems_backend: {
    name: 'Backend & High-Performance Systems',
    icon: '⚡',
    badge: 'Core Infrastructure',
    topics: [
      {
        title: 'Rust for High-Performance Microservices',
        category: 'Systems Language',
        impact: 'Rapidly Growing',
        summary: 'Companies are replacing memory-heavy Go and C++ backends with Rust (Tokio, Axum, Tonic gRPC) for zero-cost abstractions, fearless concurrency, and zero memory leaks without garbage collection pauses.',
        keyTakeaway: 'Master: Ownership, borrowing, lifetimes, Tokio async runtime, and non-blocking I/O.',
        actionLink: 'https://github.com/tokio-rs/tokio',
      },
      {
        title: 'Event-Driven Architectures & Distributed Streaming (Kafka / Redpanda)',
        category: 'System Design',
        impact: 'Enterprise Standard',
        summary: 'Modern financial and high-throughput systems rely on append-only distributed commit logs with exact-once semantics (EOS), consumer group partitions, and schema registries.',
        keyTakeaway: 'Master: Partition rebalancing, consumer lag monitoring, idempotency keys, and CQRS patterns.',
        actionLink: 'https://github.com/redpanda-data/redpanda',
      },
      {
        title: 'Modern Database Engines: DuckDB, SQLite with Litestream & pgvector',
        category: 'Databases',
        impact: 'Massive Trend',
        summary: 'In-process analytical OLAP queries with vectorized execution (DuckDB) and fast vector similarity searches directly inside PostgreSQL (pgvector) have reshaped traditional database architecture.',
        keyTakeaway: 'Master: Columnar storage vs row storage, SIMD execution, and ACID WAL replication.',
        actionLink: 'https://github.com/duckdb/duckdb',
      },
      {
        title: 'Containerization & Cloud Native Orchestration (Kubernetes & eBPF)',
        category: 'DevOps & Observability',
        impact: 'Crucial for SDE II+',
        summary: 'Linux kernel-level tracing with eBPF (Cilium) for zero-overhead networking and security, alongside Kubernetes Operator patterns and custom resource definitions (CRDs).',
        keyTakeaway: 'Master: K8s pods, ingress controllers, rolling zero-downtime updates, and eBPF network routing.',
        actionLink: 'https://github.com/cilium/cilium',
      },
    ],
  },
  interview_trends: {
    name: '2026 Hiring & Interview Shifts',
    icon: '💼',
    badge: 'Recruiter Playbook',
    topics: [
      {
        title: 'Pattern-Based DSA over Random Puzzles',
        category: 'Coding Rounds',
        impact: '100% Relevant',
        summary: 'Interviewers test whether you can recognize underlying patterns (Sliding Window, Monotonic Stack, Two Pointers) within 5 minutes and explain Big-O trade-offs clearly rather than memorizing obscure DP tricks.',
        keyTakeaway: 'Strategy: Practice 15 core patterns rather than 1,000 random questions.',
        actionLink: 'https://neetcode.io',
      },
      {
        title: 'System Design: Low-Level (LLD) & High-Level (HLD) Convergence',
        category: 'Architecture Rounds',
        impact: 'High Impact',
        summary: 'Senior interviews now expect you to draw the architecture (HLD) AND write the clean object-oriented design with SOLID principles and concurrency locks (LLD) in the same session.',
        keyTakeaway: 'Strategy: Practice designing rate limiters, LRU caches, and notification systems with code structure.',
        actionLink: 'https://github.com/donnemartin/system-design-primer',
      },
      {
        title: 'AI Collaboration & Code Debugging Assessments',
        category: 'Modern Screening',
        impact: 'New Format',
        summary: 'Companies now evaluate candidates on how effectively they use AI tools to generate, refactor, and write unit tests for complex legacy codebases, testing code comprehension over raw typing speed.',
        keyTakeaway: 'Strategy: Know how to review generated code, spot hallucinations, and write comprehensive edge-case tests.',
        actionLink: 'https://github.com',
      },
    ],
  },
};

export default function TechRadar() {
  const { addXP } = useGamification();
  const [activeCategory, setActiveCategory] = useState('ai_frontier');
  const [readItems, setReadItems] = useState({});

  function handleOpenLink(url, title) {
    if (!readItems[title]) {
      addXP(25, `Read Tech Radar: ${title}`);
      setReadItems(prev => ({ ...prev, [title]: true }));
    }
    if (window.electronAPI?.openExternal) {
      window.electronAPI.openExternal(url);
    } else {
      window.open(url, '_blank');
    }
  }

  const category = TECH_RADAR_DATA[activeCategory];

  return (
    <div className="animate-fade-in">
      {/* Page Header */}
      <div className="page-header">
        <div>
          <h1 className="page-header__title">📡 Live Tech Radar & Market Intelligence</h1>
          <p className="page-header__subtitle">
            Real-time industry shifts, breaking AI architectures, and in-demand engineering skills for 2026
          </p>
        </div>
      </div>

      <div className="page-body">
        {/* Category Switcher Tabs */}
        <div className="tabs" style={{ marginBottom: 'var(--space-5)' }}>
          {Object.entries(TECH_RADAR_DATA).map(([key, cat]) => (
            <button
              key={key}
              className={`tab ${activeCategory === key ? 'tab--active' : ''}`}
              onClick={() => setActiveCategory(key)}
            >
              <span>{cat.icon}</span>
              <span>{cat.name}</span>
            </button>
          ))}
        </div>

        {/* Action Item of the Week Banner */}
        <div className="radar-highlight-banner">
          <div className="radar-highlight-icon">⚡</div>
          <div className="radar-highlight-content">
            <span className="radar-highlight-badge">2026 Strategic Blueprint</span>
            <h3 className="radar-highlight-title">The "AI-Augmented Senior Engineer" Advantage</h3>
            <p className="radar-highlight-desc">
              Candidates who combine <strong>Pattern-Based DSA</strong> + <strong>System Design First Principles</strong> + <strong>Production AI/LLM Integration</strong> stand out in the top 1% of the applicant pool.
            </p>
          </div>
        </div>

        {/* Tech Radar Cards Grid */}
        <div className="radar-grid">
          {category.topics.map((item, idx) => (
            <div key={idx} className="radar-card">
              <div className="radar-card__header">
                <span className="radar-card__category">{item.category}</span>
                <span className="radar-card__impact">💥 {item.impact}</span>
              </div>

              <h3 className="radar-card__title">{item.title}</h3>
              <p className="radar-card__summary">{item.summary}</p>

              <div className="radar-card__takeaway">
                <span className="radar-card__takeaway-label">🎯 Engineering Focus:</span>
                <p className="radar-card__takeaway-text">{item.keyTakeaway}</p>
              </div>

              <div className="radar-card__actions">
                <button
                  className="btn-radar-link"
                  onClick={() => handleOpenLink(item.actionLink, item.title)}
                >
                  <span>Explore Repository / Spec ↗</span>
                </button>
                {readItems[item.title] && (
                  <span className="badge badge--easy">✓ Read (+25 XP)</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
