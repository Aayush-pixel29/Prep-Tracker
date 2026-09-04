// NeetCode 150 categories + AI/ML preparation roadmap data
export const ROADMAP_DATA = {
  dsa: {
    name: 'DSA / Coding',
    icon: '💻',
    color: 'var(--accent-blue)',
    gradient: 'linear-gradient(135deg, #4F6EF7, #06B6D4)',
    topics: [
      {
        name: 'Arrays & Hashing',
        subtopics: ['Contains Duplicate', 'Valid Anagram', 'Two Sum', 'Group Anagrams', 'Top K Frequent Elements', 'Encode & Decode Strings', 'Product of Array Except Self', 'Valid Sudoku', 'Longest Consecutive Sequence'],
      },
      {
        name: 'Two Pointers',
        subtopics: ['Valid Palindrome', 'Two Sum II', '3Sum', 'Container With Most Water', 'Trapping Rain Water'],
      },
      {
        name: 'Sliding Window',
        subtopics: ['Best Time to Buy & Sell Stock', 'Longest Substring Without Repeating', 'Longest Repeating Character Replacement', 'Permutation in String', 'Minimum Window Substring', 'Sliding Window Maximum'],
      },
      {
        name: 'Stack',
        subtopics: ['Valid Parentheses', 'Min Stack', 'Evaluate Reverse Polish Notation', 'Generate Parentheses', 'Daily Temperatures', 'Car Fleet', 'Largest Rectangle in Histogram'],
      },
      {
        name: 'Binary Search',
        subtopics: ['Binary Search', 'Search a 2D Matrix', 'Koko Eating Bananas', 'Find Minimum in Rotated Sorted Array', 'Search in Rotated Sorted Array', 'Time Based Key-Value Store', 'Median of Two Sorted Arrays'],
      },
      {
        name: 'Linked List',
        subtopics: ['Reverse Linked List', 'Merge Two Sorted Lists', 'Reorder List', 'Remove Nth Node From End', 'Copy List with Random Pointer', 'Add Two Numbers', 'Linked List Cycle', 'Find the Duplicate Number', 'LRU Cache', 'Merge K Sorted Lists', 'Reverse Nodes in K-Group'],
      },
      {
        name: 'Trees',
        subtopics: ['Invert Binary Tree', 'Maximum Depth', 'Diameter of Binary Tree', 'Balanced Binary Tree', 'Same Tree', 'Subtree of Another Tree', 'Lowest Common Ancestor of BST', 'Binary Tree Level Order Traversal', 'Binary Tree Right Side View', 'Count Good Nodes', 'Validate BST', 'Kth Smallest Element in BST', 'Construct Binary Tree from Preorder & Inorder', 'Binary Tree Maximum Path Sum', 'Serialize and Deserialize Binary Tree'],
      },
      {
        name: 'Tries',
        subtopics: ['Implement Trie', 'Design Add & Search Words', 'Word Search II'],
      },
      {
        name: 'Heap / Priority Queue',
        subtopics: ['Kth Largest Element in a Stream', 'Last Stone Weight', 'K Closest Points to Origin', 'Kth Largest Element in Array', 'Task Scheduler', 'Design Twitter', 'Find Median from Data Stream'],
      },
      {
        name: 'Backtracking',
        subtopics: ['Subsets', 'Combination Sum', 'Permutations', 'Subsets II', 'Combination Sum II', 'Word Search', 'Palindrome Partitioning', 'Letter Combinations of Phone Number', 'N-Queens'],
      },
      {
        name: 'Graphs',
        subtopics: ['Number of Islands', 'Max Area of Island', 'Clone Graph', 'Walls and Gates', 'Rotting Oranges', 'Pacific Atlantic Water Flow', 'Surrounded Regions', 'Course Schedule', 'Course Schedule II', 'Graph Valid Tree', 'Number of Connected Components', 'Redundant Connection', 'Word Ladder'],
      },
      {
        name: 'Advanced Graphs',
        subtopics: ['Reconstruct Itinerary', 'Min Cost to Connect All Points', 'Network Delay Time', 'Swim in Rising Water', 'Alien Dictionary', 'Cheapest Flights Within K Stops'],
      },
      {
        name: '1-D Dynamic Programming',
        subtopics: ['Climbing Stairs', 'Min Cost Climbing Stairs', 'House Robber', 'House Robber II', 'Longest Palindromic Substring', 'Palindromic Substrings', 'Decode Ways', 'Coin Change', 'Maximum Product Subarray', 'Word Break', 'Longest Increasing Subsequence', 'Partition Equal Subset Sum'],
      },
      {
        name: '2-D Dynamic Programming',
        subtopics: ['Unique Paths', 'Longest Common Subsequence', 'Best Time to Buy & Sell Stock with Cooldown', 'Coin Change II', 'Target Sum', 'Interleaving String', 'Longest Increasing Path in Matrix', 'Distinct Subsequences', 'Edit Distance', 'Burst Balloons', 'Regular Expression Matching'],
      },
      {
        name: 'Greedy',
        subtopics: ['Maximum Subarray', 'Jump Game', 'Jump Game II', 'Gas Station', 'Hand of Straights', 'Merge Triplets to Form Target', 'Partition Labels', 'Valid Parenthesis String'],
      },
      {
        name: 'Intervals',
        subtopics: ['Insert Interval', 'Merge Intervals', 'Non-Overlapping Intervals', 'Meeting Rooms', 'Meeting Rooms II', 'Minimum Interval to Include Each Query'],
      },
      {
        name: 'Math & Geometry',
        subtopics: ['Rotate Image', 'Spiral Matrix', 'Set Matrix Zeroes', 'Happy Number', 'Plus One', 'Pow(x, n)', 'Multiply Strings', 'Detect Squares'],
      },
      {
        name: 'Bit Manipulation',
        subtopics: ['Single Number', 'Number of 1 Bits', 'Counting Bits', 'Reverse Bits', 'Missing Number', 'Sum of Two Integers', 'Reverse Integer'],
      },
    ],
  },

  ml_theory: {
    name: 'ML Theory',
    icon: '🧠',
    color: 'var(--accent-purple)',
    gradient: 'linear-gradient(135deg, #8B5CF6, #EC4899)',
    topics: [
      {
        name: 'Linear Algebra',
        subtopics: ['Vectors & Matrices', 'Matrix Operations', 'Eigenvalues & Eigenvectors', 'Singular Value Decomposition', 'Matrix Decomposition', 'Vector Spaces'],
      },
      {
        name: 'Calculus',
        subtopics: ['Derivatives & Partial Derivatives', 'Chain Rule', 'Gradients', 'Hessian Matrix', 'Optimization Theory', 'Lagrange Multipliers'],
      },
      {
        name: 'Probability & Statistics',
        subtopics: ['Probability Distributions', 'Bayes Theorem', 'Descriptive Statistics', 'Inferential Statistics', 'Hypothesis Testing', 'MLE & MAP', 'Information Theory'],
      },
      {
        name: 'Supervised Learning',
        subtopics: ['Linear Regression', 'Logistic Regression', 'Decision Trees', 'Random Forests', 'SVM', 'KNN', 'Naive Bayes', 'XGBoost / LightGBM', 'Gradient Boosting'],
      },
      {
        name: 'Unsupervised Learning',
        subtopics: ['K-Means Clustering', 'DBSCAN', 'Hierarchical Clustering', 'PCA', 't-SNE / UMAP', 'Gaussian Mixture Models', 'Autoencoders'],
      },
      {
        name: 'Feature Engineering',
        subtopics: ['Feature Scaling', 'Feature Selection', 'Encoding Categorical Variables', 'Handling Missing Data', 'Feature Extraction', 'Dimensionality Reduction'],
      },
      {
        name: 'Model Evaluation',
        subtopics: ['Bias-Variance Tradeoff', 'Cross-Validation', 'Confusion Matrix', 'ROC & AUC', 'Precision / Recall / F1', 'Regularization (L1, L2)', 'Hyperparameter Tuning'],
      },
    ],
  },

  deep_learning: {
    name: 'Deep Learning',
    icon: '🤖',
    color: 'var(--accent-cyan)',
    gradient: 'linear-gradient(135deg, #06B6D4, #4F6EF7)',
    topics: [
      {
        name: 'Neural Network Fundamentals',
        subtopics: ['Perceptron & Activation Functions', 'Backpropagation', 'Loss Functions', 'Optimizers (SGD, Adam, RMSProp)', 'Batch Normalization', 'Dropout & Regularization', 'Weight Initialization'],
      },
      {
        name: 'Convolutional Neural Networks',
        subtopics: ['Convolution Operations', 'Pooling Layers', 'Classic Architectures (LeNet, AlexNet, VGG)', 'ResNet & Skip Connections', 'Inception & EfficientNet', 'Object Detection (YOLO, SSD)', 'Semantic Segmentation'],
      },
      {
        name: 'Recurrent Neural Networks',
        subtopics: ['Vanilla RNN', 'LSTM', 'GRU', 'Bidirectional RNNs', 'Sequence-to-Sequence', 'Encoder-Decoder Architecture'],
      },
      {
        name: 'Transformers & Attention',
        subtopics: ['Self-Attention Mechanism', 'Multi-Head Attention', 'Positional Encoding', 'Transformer Architecture', 'BERT', 'GPT Family', 'Vision Transformers (ViT)'],
      },
      {
        name: 'Generative Models',
        subtopics: ['GANs (Generative Adversarial Networks)', 'Variational Autoencoders', 'Diffusion Models', 'Flow-Based Models', 'Neural Style Transfer'],
      },
      {
        name: 'Transfer Learning',
        subtopics: ['Pre-trained Models', 'Fine-tuning Strategies', 'Domain Adaptation', 'Few-Shot Learning', 'Zero-Shot Learning'],
      },
    ],
  },

  specialization: {
    name: 'Specializations',
    icon: '🎯',
    color: 'var(--accent-pink)',
    gradient: 'linear-gradient(135deg, #EC4899, #F59E0B)',
    topics: [
      {
        name: 'NLP Fundamentals',
        subtopics: ['Tokenization', 'Word Embeddings (Word2Vec, GloVe)', 'TF-IDF', 'Language Models', 'Named Entity Recognition', 'Sentiment Analysis'],
      },
      {
        name: 'Modern NLP / LLMs',
        subtopics: ['Large Language Models', 'Prompt Engineering', 'RAG (Retrieval Augmented Generation)', 'Fine-tuning LLMs (LoRA, QLoRA)', 'RLHF', 'Embedding Models', 'Vector Databases'],
      },
      {
        name: 'Computer Vision',
        subtopics: ['Image Classification', 'Object Detection', 'Image Segmentation', 'Face Recognition', 'Image Generation', 'Video Analysis', 'OCR'],
      },
      {
        name: 'Reinforcement Learning',
        subtopics: ['Markov Decision Processes', 'Q-Learning', 'Policy Gradient', 'Actor-Critic Methods', 'Deep Q-Networks', 'Multi-Agent RL'],
      },
    ],
  },

  system_design: {
    name: 'System Design & MLOps',
    icon: '⚙️',
    color: 'var(--accent-orange)',
    gradient: 'linear-gradient(135deg, #F59E0B, #EF4444)',
    topics: [
      {
        name: 'ML System Design',
        subtopics: ['ML System Architecture', 'Data Pipelines', 'Feature Stores', 'Model Serving', 'A/B Testing', 'Scalability Patterns'],
      },
      {
        name: 'MLOps',
        subtopics: ['ML Pipelines (Kubeflow, Airflow)', 'Model Versioning (DVC, MLflow)', 'Model Monitoring', 'CI/CD for ML', 'Experiment Tracking', 'Data Versioning'],
      },
      {
        name: 'Deployment',
        subtopics: ['REST APIs (FastAPI, Flask)', 'Docker & Containers', 'Kubernetes Basics', 'AWS / GCP / Azure ML', 'Model Optimization (ONNX, TensorRT)', 'Edge Deployment'],
      },
      {
        name: 'Paper Reading',
        subtopics: ['Attention Is All You Need', 'BERT Paper', 'GPT Paper Series', 'ResNet Paper', 'AlphaGo Paper', 'Diffusion Models Paper', 'LoRA Paper', 'Recent Papers (Monthly)'],
      },
    ],
  },
};

// Flatten all topics for quick lookup
export function getAllTopics() {
  const result = [];
  Object.entries(ROADMAP_DATA).forEach(([pillar, data]) => {
    data.topics.forEach(topic => {
      topic.subtopics.forEach(sub => {
        result.push({ pillar, topic: topic.name, subtopic: sub });
      });
    });
  });
  return result;
}

// Count totals per pillar
export function getPillarCounts() {
  const counts = {};
  Object.entries(ROADMAP_DATA).forEach(([key, data]) => {
    let total = 0;
    data.topics.forEach(t => { total += t.subtopics.length; });
    counts[key] = total;
  });
  return counts;
}
