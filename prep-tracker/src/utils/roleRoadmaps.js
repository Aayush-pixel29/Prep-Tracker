// ═══════════════════════════════════════════════════════════════════════════════
// Role-Based Career Roadmap Data
// Each role has phases → sections → topics
// Topics include theory, video search queries, and practice links
// ═══════════════════════════════════════════════════════════════════════════════

// ─── Helpers ─────────────────────────────────────────────────────────────────

// ─── Curated High-Quality YouTube Videos by Topic ───────────────────────────
export const CURATED_TOPIC_VIDEOS = {
  // Math for ML
  'Vectors & Matrices': [
    { title: '3Blue1Brown - Vectors, what even are they?', videoId: 'fNk_zzaMoEs', channel: '3Blue1Brown', duration: '9:52' },
    { title: 'Khan Academy - Introduction to Matrices', videoId: 'xyAuNHPsq-g', channel: 'Khan Academy', duration: '14:20' },
  ],
  'Matrix Operations': [
    { title: '3Blue1Brown - Linear Transformations and Matrices', videoId: 'XkY2DOUCWMU', channel: '3Blue1Brown', duration: '10:59' },
    { title: '3Blue1Brown - Matrix Multiplication as Composition', videoId: 'X7S_2kZzQeM', channel: '3Blue1Brown', duration: '10:03' },
  ],
  'Eigenvalues & Eigenvectors': [
    { title: '3Blue1Brown - Eigenvectors and Eigenvalues', videoId: 'PFDu9oVAE-g', channel: '3Blue1Brown', duration: '17:15' },
    { title: 'StatQuest - PCA Main Ideas (uses Eigenvectors)', videoId: 'FgakZw6K1QQ', channel: 'StatQuest', duration: '21:52' },
  ],
  'Derivatives & Gradients': [
    { title: '3Blue1Brown - The Essence of Calculus', videoId: 'WUvTyaaNkzM', channel: '3Blue1Brown', duration: '17:04' },
    { title: '3Blue1Brown - Gradient Descent', videoId: 'IHZwWFHWa-w', channel: '3Blue1Brown', duration: '13:53' },
  ],
  'Chain Rule & Backpropagation': [
    { title: '3Blue1Brown - What is Backpropagation Really Doing?', videoId: 'Ilg3gGewQ5U', channel: '3Blue1Brown', duration: '12:26' },
    { title: '3Blue1Brown - Backpropagation Calculus', videoId: 'tIeHLnjs5U8', channel: '3Blue1Brown', duration: '10:16' },
  ],
  'Probability Distributions': [
    { title: 'StatQuest - Probability Distributions', videoId: 'oI33PjybqiA', channel: 'StatQuest', duration: '15:10' },
    { title: 'Khan Academy - Normal Distribution Basics', videoId: 'hgtMMS3O50Q', channel: 'Khan Academy', duration: '11:45' },
  ],
  'Bayes Theorem': [
    { title: '3Blue1Brown - Bayes Theorem', videoId: 'HZGCoVF3YvM', channel: '3Blue1Brown', duration: '15:42' },
    { title: 'StatQuest - Bayes Theorem Clearly Explained', videoId: '9wCnvr7Xw4E', channel: 'StatQuest', duration: '8:45' },
  ],
  'Hypothesis Testing': [
    { title: 'StatQuest - Hypothesis Testing and p-values', videoId: '0oc49DyA3hU', channel: 'StatQuest', duration: '11:27' },
    { title: 'StatQuest - P-Values Clearly Explained', videoId: '5Z9OIYA8He8', channel: 'StatQuest', duration: '11:00' },
  ],

  // Classical ML
  'Linear Regression': [
    { title: 'StatQuest - Linear Regression Clearly Explained', videoId: 'zPG4NjIkCjc', channel: 'StatQuest', duration: '27:26' },
    { title: 'StatQuest - Fitting a Line to Data', videoId: 'PaFPbb66DxQ', channel: 'StatQuest', duration: '9:30' },
  ],
  'Logistic Regression': [
    { title: 'StatQuest - Logistic Regression Clearly Explained', videoId: 'yIYKR4sgzI8', channel: 'StatQuest', duration: '8:47' },
    { title: 'StatQuest - Logistic Regression Coefficients', videoId: 'vN5cNN2-HWE', channel: 'StatQuest', duration: '16:04' },
  ],
  'Decision Trees': [
    { title: 'StatQuest - Decision Trees Clearly Explained', videoId: '7VeUPuFGJHk', channel: 'StatQuest', duration: '17:22' },
  ],
  'Random Forests': [
    { title: 'StatQuest - Random Forests Part 1: Building and Using', videoId: 'J4Wdy0Wc_xQ', channel: 'StatQuest', duration: '9:54' },
  ],
  'Support Vector Machines': [
    { title: 'StatQuest - Support Vector Machines (SVM) Part 1', videoId: 'efR1C6CvhmE', channel: 'StatQuest', duration: '20:32' },
  ],
  'K-Nearest Neighbors': [
    { title: 'StatQuest - K-Nearest Neighbors (KNN) Clearly Explained', videoId: 'HVXime0nQeI', channel: 'StatQuest', duration: '5:30' },
  ],
  'XGBoost & Gradient Boosting': [
    { title: 'StatQuest - XGBoost Part 1: Regression', videoId: 'OtD8w_Pmj0g', channel: 'StatQuest', duration: '25:46' },
    { title: 'StatQuest - Gradient Boost Part 1: Regression Main Ideas', videoId: '3CC4N4z3GJc', channel: 'StatQuest', duration: '15:45' },
  ],
  'Naive Bayes': [
    { title: 'StatQuest - Naive Bayes Clearly Explained', videoId: 'O2L2Uv9pdDA', channel: 'StatQuest', duration: '15:12' },
  ],
  'K-Means Clustering': [
    { title: 'StatQuest - K-Means Clustering', videoId: '4b5d3muPQmA', channel: 'StatQuest', duration: '8:57' },
  ],
  'PCA (Principal Component Analysis)': [
    { title: 'StatQuest - Principal Component Analysis (PCA) Main Ideas', videoId: 'FgakZw6K1QQ', channel: 'StatQuest', duration: '21:52' },
  ],
  'DBSCAN': [
    { title: 'StatQuest - DBSCAN Clearly Explained', videoId: 'RDZUdRbcEvM', channel: 'StatQuest', duration: '12:40' },
  ],
  't-SNE & UMAP': [
    { title: 'StatQuest - StatQuest: t-SNE, Clearly Explained', videoId: 'NEaUSP4YerM', channel: 'StatQuest', duration: '11:47' },
  ],
  'Bias-Variance Tradeoff': [
    { title: 'StatQuest - Machine Learning Fundamentals: Bias and Variance', videoId: 'EuBBz3bI-aA', channel: 'StatQuest', duration: '6:35' },
  ],
  'Cross-Validation': [
    { title: 'StatQuest - Cross Validation Clearly Explained', videoId: 'fSytzGwwBVw', channel: 'StatQuest', duration: '6:04' },
  ],
  'Precision, Recall & F1': [
    { title: 'StatQuest - Sensitivity and Specificity (and Precision/Recall)', videoId: 'vP06aMOojv8', channel: 'StatQuest', duration: '18:50' },
  ],
  'ROC & AUC': [
    { title: 'StatQuest - ROC and AUC, Clearly Explained', videoId: '4jRBRDbJemM', channel: 'StatQuest', duration: '16:22' },
  ],
  'Regularization (L1 & L2)': [
    { title: 'StatQuest - Regularization Part 1: Ridge (L2) Regression', videoId: 'Q81RR3yKn30', channel: 'StatQuest', duration: '20:25' },
    { title: 'StatQuest - Regularization Part 2: Lasso (L1) Regression', videoId: 'NGf0voTMlcs', channel: 'StatQuest', duration: '15:30' },
  ],

  // Deep Learning
  'Neural Network Basics': [
    { title: '3Blue1Brown - But what is a neural network? | Chapter 1', videoId: 'aircAruvnKk', channel: '3Blue1Brown', duration: '19:13' },
    { title: '3Blue1Brown - Gradient Descent, how neural networks learn | Chapter 2', videoId: 'IHZwWFHWa-w', channel: '3Blue1Brown', duration: '21:01' },
  ],
  'Activation Functions': [
    { title: 'StatQuest - Neural Networks Part 2: Activation Functions', videoId: '68BZ5f7P94E', channel: 'StatQuest', duration: '10:45' },
  ],
  'Backpropagation': [
    { title: '3Blue1Brown - What is backpropagation really doing? | Chapter 3', videoId: 'Ilg3gGewQ5U', channel: '3Blue1Brown', duration: '12:26' },
  ],
  'Loss Functions': [
    { title: 'StatQuest - Cross Entropy Loss Explained', videoId: '6ArSys5qHAU', channel: 'StatQuest', duration: '11:15' },
  ],
  'Optimizers (SGD, Adam)': [
    { title: 'StatQuest - Gradient Descent & Stochastic Gradient Descent', videoId: 'mdKjFi--6uo', channel: 'StatQuest', duration: '12:00' },
  ],
  'Batch Normalization & Dropout': [
    { title: 'StatQuest - Neural Networks: Dropout', videoId: 'dXB-KQYkzNU', channel: 'StatQuest', duration: '7:40' },
  ],
  'Convolution Operations': [
    { title: '3Blue1Brown - Convolutions | Chapter 1', videoId: 'KuXjwB4LzSA', channel: '3Blue1Brown', duration: '23:18' },
  ],
  'CNN Architectures (ResNet, VGG)': [
    { title: 'freeCodeCamp - Deep Learning with PyTorch & CNNs', videoId: 'YRhxdVk_sIs', channel: 'freeCodeCamp', duration: '45:20' },
  ],
  'Object Detection (YOLO)': [
    { title: 'freeCodeCamp - YOLO Object Detection Tutorial', videoId: 'ag3DLKsl2vk', channel: 'freeCodeCamp', duration: '35:10' },
  ],
  'Self-Attention Mechanism': [
    { title: '3Blue1Brown - Attention in Transformers, Visually Explained', videoId: 'wjZofJX0v4U', channel: '3Blue1Brown', duration: '26:45' },
  ],
  'Transformer Architecture': [
    { title: 'StatQuest - Transformers, Clearly Explained', videoId: 'zxQyTK8quyY', channel: 'StatQuest', duration: '29:40' },
  ],
  'BERT & GPT': [
    { title: 'StatQuest - Word2Vec and Embeddings', videoId: 'eMlx5fFNoYc', channel: 'StatQuest', duration: '18:15' },
  ],
  'Fine-tuning LLMs (LoRA, QLoRA)': [
    { title: 'Fireship - Fine-tune an LLM on Custom Data', videoId: 't509sv5MT0S', channel: 'Fireship', duration: '8:30' },
  ],
  'RAG (Retrieval Augmented Generation)': [
    { title: 'Fireship - RAG from Scratch', videoId: 'T-D1OfcDW1M', channel: 'Fireship', duration: '9:15' },
  ],

  // DSA - Arrays & Hashing
  'Contains Duplicate': [{ title: 'NeetCode - Contains Duplicate (LeetCode 217)', videoId: '3OamzN90kPg', channel: 'NeetCode', duration: '7:15' }],
  'Valid Anagram': [{ title: 'NeetCode - Valid Anagram (LeetCode 242)', videoId: '9UtInBqnCgA', channel: 'NeetCode', duration: '9:40' }],
  'Two Sum': [{ title: 'NeetCode - Two Sum (LeetCode 1)', videoId: 'KLlXCFG5TnA', channel: 'NeetCode', duration: '10:20' }],
  'Group Anagrams': [{ title: 'NeetCode - Group Anagrams (LeetCode 49)', videoId: 'vzdNOK2oDA4', channel: 'NeetCode', duration: '11:15' }],
  'Top K Frequent Elements': [{ title: 'NeetCode - Top K Frequent Elements (LeetCode 347)', videoId: 'YPTqKIgVk-k', channel: 'NeetCode', duration: '14:20' }],
  'Product of Array Except Self': [{ title: 'NeetCode - Product of Array Except Self (LeetCode 238)', videoId: 'bNvIQI2wAjk', channel: 'NeetCode', duration: '13:00' }],
  'Valid Sudoku': [{ title: 'NeetCode - Valid Sudoku (LeetCode 36)', videoId: 'TjFXEUCMqI8', channel: 'NeetCode', duration: '12:30' }],
  'Longest Consecutive Sequence': [{ title: 'NeetCode - Longest Consecutive Sequence (LeetCode 128)', videoId: 'P6RZZMu_maU', channel: 'NeetCode', duration: '11:45' }],

  // DSA - Two Pointers
  'Valid Palindrome': [{ title: 'NeetCode - Valid Palindrome (LeetCode 125)', videoId: 'jJXJ16kPFWg', channel: 'NeetCode', duration: '8:10' }],
  'Two Sum II - Sorted Array': [{ title: 'NeetCode - Two Sum II (LeetCode 167)', videoId: 'cQ1Oz4ckcMT', channel: 'NeetCode', duration: '9:00' }],
  '3Sum': [{ title: 'NeetCode - 3Sum (LeetCode 15)', videoId: 'jzZsG8n2R9A', channel: 'NeetCode', duration: '15:20' }],
  'Container With Most Water': [{ title: 'NeetCode - Container With Most Water (LeetCode 11)', videoId: 'UuiTKBwPgAo', channel: 'NeetCode', duration: '10:30' }],
  'Trapping Rain Water': [{ title: 'NeetCode - Trapping Rain Water (LeetCode 42)', videoId: 'ZI2z58mA0S4', channel: 'NeetCode', duration: '18:40' }],

  // DSA - Sliding Window
  'Best Time to Buy & Sell Stock': [{ title: 'NeetCode - Best Time to Buy & Sell Stock (LeetCode 121)', videoId: '1pkOgXD63yU', channel: 'NeetCode', duration: '8:45' }],
  'Longest Substring Without Repeating': [{ title: 'NeetCode - Longest Substring Without Repeating (LeetCode 3)', videoId: 'wiGpQwVHdE0', channel: 'NeetCode', duration: '12:15' }],
  'Longest Repeating Character Replacement': [{ title: 'NeetCode - Longest Repeating Character Replacement (LeetCode 424)', videoId: 'gqXU1UyA8pk', channel: 'NeetCode', duration: '14:50' }],
  'Minimum Window Substring': [{ title: 'NeetCode - Minimum Window Substring (LeetCode 76)', videoId: 'jSto0O4AJbM', channel: 'NeetCode', duration: '20:10' }],

  // DSA - Stack
  'Valid Parentheses': [{ title: 'NeetCode - Valid Parentheses (LeetCode 20)', videoId: 'WTzjTskDF3A', channel: 'NeetCode', duration: '7:55' }],
  'Min Stack': [{ title: 'NeetCode - Min Stack (LeetCode 155)', videoId: 'qkLl7nAwDPo', channel: 'NeetCode', duration: '9:30' }],
  'Daily Temperatures': [{ title: 'NeetCode - Daily Temperatures (LeetCode 739)', videoId: 'cTBiBSnjO3c', channel: 'NeetCode', duration: '11:40' }],
  'Largest Rectangle in Histogram': [{ title: 'NeetCode - Largest Rectangle in Histogram (LeetCode 84)', videoId: 'zx5Sw9130L0', channel: 'NeetCode', duration: '19:25' }],

  // DSA - Binary Search
  'Binary Search': [{ title: 'NeetCode - Binary Search (LeetCode 704)', videoId: 's4DPM8ct1pI', channel: 'NeetCode', duration: '6:50' }],
  'Search a 2D Matrix': [{ title: 'NeetCode - Search a 2D Matrix (LeetCode 74)', videoId: 'Ber2pi2C0j0', channel: 'NeetCode', duration: '11:00' }],
  'Koko Eating Bananas': [{ title: 'NeetCode - Koko Eating Bananas (LeetCode 875)', videoId: 'U2Q75VUUpGs', channel: 'NeetCode', duration: '13:40' }],
  'Find Minimum in Rotated Sorted Array': [{ title: 'NeetCode - Find Minimum in Rotated Sorted Array (LeetCode 153)', videoId: 'nIVW4P8b1VA', channel: 'NeetCode', duration: '12:20' }],
  'Search in Rotated Sorted Array': [{ title: 'NeetCode - Search in Rotated Sorted Array (LeetCode 33)', videoId: 'U8XENwh8Oy8', channel: 'NeetCode', duration: '15:10' }],

  // DSA - Linked List
  'Reverse Linked List': [{ title: 'NeetCode - Reverse Linked List (LeetCode 206)', videoId: 'G0_I-ZF0S38', channel: 'NeetCode', duration: '8:30' }],
  'Merge Two Sorted Lists': [{ title: 'NeetCode - Merge Two Sorted Lists (LeetCode 21)', videoId: 'XIdigk956uU', channel: 'NeetCode', duration: '9:15' }],
  'Linked List Cycle': [{ title: 'NeetCode - Linked List Cycle (LeetCode 141)', videoId: 'gBTe7lFR3vc', channel: 'NeetCode', duration: '10:05' }],
  'LRU Cache': [{ title: 'NeetCode - LRU Cache (LeetCode 146)', videoId: '7ABFKPK2hD4', channel: 'NeetCode', duration: '18:30' }],
  'Merge K Sorted Lists': [{ title: 'NeetCode - Merge K Sorted Lists (LeetCode 23)', videoId: 'q5a5OiGbT6Q', channel: 'NeetCode', duration: '16:45' }],

  // DSA - Trees
  'Invert Binary Tree': [{ title: 'NeetCode - Invert Binary Tree (LeetCode 226)', videoId: 'OnSn2XEQ4MY', channel: 'NeetCode', duration: '5:45' }],
  'Maximum Depth of Binary Tree': [{ title: 'NeetCode - Maximum Depth of Binary Tree (LeetCode 104)', videoId: 'hTM3phVI6YQ', channel: 'NeetCode', duration: '8:15' }],
  'Binary Tree Level Order Traversal': [{ title: 'NeetCode - Binary Tree Level Order Traversal (LeetCode 102)', videoId: '6ZnyEApgFYg', channel: 'NeetCode', duration: '10:45' }],
  'Validate BST': [{ title: 'NeetCode - Validate Binary Search Tree (LeetCode 98)', videoId: 's6ATEkipzow', channel: 'NeetCode', duration: '12:30' }],
  'Binary Tree Maximum Path Sum': [{ title: 'NeetCode - Binary Tree Maximum Path Sum (LeetCode 124)', videoId: 'Hr5cWUld4vU', channel: 'NeetCode', duration: '17:10' }],
  'Serialize and Deserialize Binary Tree': [{ title: 'NeetCode - Serialize and Deserialize Binary Tree (LeetCode 297)', videoId: 'u4JAi2JJhDg', channel: 'NeetCode', duration: '16:00' }],

  // DSA - Graphs
  'Number of Islands': [{ title: 'NeetCode - Number of Islands (LeetCode 200)', videoId: 'pV2kpPD66nE', channel: 'NeetCode', duration: '14:20' }],
  'Clone Graph': [{ title: 'NeetCode - Clone Graph (LeetCode 133)', videoId: 'mQeF6bN8hMk', channel: 'NeetCode', duration: '13:10' }],
  'Course Schedule': [{ title: 'NeetCode - Course Schedule (LeetCode 207)', videoId: 'EgI5nU9etnU', channel: 'NeetCode', duration: '15:50' }],
  'Pacific Atlantic Water Flow': [{ title: 'NeetCode - Pacific Atlantic Water Flow (LeetCode 417)', videoId: 's-VKbVC3DXI', channel: 'NeetCode', duration: '16:30' }],
  'Word Ladder': [{ title: 'NeetCode - Word Ladder (LeetCode 127)', videoId: 'h9iTnkgv05E', channel: 'NeetCode', duration: '20:15' }],

  // DSA - Dynamic Programming
  'Climbing Stairs': [{ title: 'NeetCode - Climbing Stairs (LeetCode 70)', videoId: 'Y0lT9Fck7qI', channel: 'NeetCode', duration: '9:30' }],
  'House Robber': [{ title: 'NeetCode - House Robber (LeetCode 198)', videoId: '73r3KWiEvyk', channel: 'NeetCode', duration: '12:00' }],
  'Coin Change': [{ title: 'NeetCode - Coin Change (LeetCode 322)', videoId: 'H9bfqozjoqs', channel: 'NeetCode', duration: '15:40' }],
  'Longest Increasing Subsequence': [{ title: 'NeetCode - Longest Increasing Subsequence (LeetCode 300)', videoId: 'cjWnW0hdF1Y', channel: 'NeetCode', duration: '17:50' }],
  'Longest Common Subsequence': [{ title: 'NeetCode - Longest Common Subsequence (LeetCode 1143)', videoId: 'Ua0GhsJSlWM', channel: 'NeetCode', duration: '19:15' }],
  'Edit Distance': [{ title: 'NeetCode - Edit Distance (LeetCode 72)', videoId: 'XYi2-LPrwm4', channel: 'NeetCode', duration: '20:45' }],

  // DSA - Heap / Priority Queue
  'Kth Largest Element in Array': [{ title: 'NeetCode - Kth Largest Element in Array (LeetCode 215)', videoId: 'XEmy138QB9Q', channel: 'NeetCode', duration: '13:00' }],
  'Task Scheduler': [{ title: 'NeetCode - Task Scheduler (LeetCode 621)', videoId: 's8p8ukTyA2I', channel: 'NeetCode', duration: '16:15' }],
  'Find Median from Data Stream': [{ title: 'NeetCode - Find Median from Data Stream (LeetCode 295)', videoId: 'itmhHWaHupI', channel: 'NeetCode', duration: '19:30' }],

  // DSA - Backtracking
  'Subsets': [{ title: 'NeetCode - Subsets (LeetCode 78)', videoId: 'REOH22Xwdkk', channel: 'NeetCode', duration: '11:20' }],
  'Combination Sum': [{ title: 'NeetCode - Combination Sum (LeetCode 39)', videoId: 'GBKI9VSKdGg', channel: 'NeetCode', duration: '14:10' }],
  'Permutations': [{ title: 'NeetCode - Permutations (LeetCode 46)', videoId: 's7AvT7cGdSo', channel: 'NeetCode', duration: '12:45' }],
  'N-Queens': [{ title: 'NeetCode - N-Queens (LeetCode 51)', videoId: 'Ph95IHmTH5E', channel: 'NeetCode', duration: '22:15' }],

  // DSA - Greedy
  'Maximum Subarray': [{ title: 'NeetCode - Maximum Subarray (LeetCode 53)', videoId: '5WZl3MMT0Eg', channel: 'NeetCode', duration: '8:45' }],
  'Jump Game': [{ title: 'NeetCode - Jump Game (LeetCode 55)', videoId: 'Yan0cv2cLy8', channel: 'NeetCode', duration: '10:30' }],
  'Merge Intervals': [{ title: 'NeetCode - Merge Intervals (LeetCode 56)', videoId: '44H3cEC2fFM', channel: 'NeetCode', duration: '11:50' }],

  // DSA - Tries & Bit Manipulation
  'Implement Trie': [{ title: 'NeetCode - Implement Trie (LeetCode 208)', videoId: 'oobqoCJlHA0', channel: 'NeetCode', duration: '12:00' }],
  'Word Search II': [{ title: 'NeetCode - Word Search II (LeetCode 212)', videoId: 'asbcE9mZz_U', channel: 'NeetCode', duration: '23:30' }],
  'Single Number': [{ title: 'NeetCode - Single Number (LeetCode 136)', videoId: 'qMPX1AOa83k', channel: 'NeetCode', duration: '7:15' }],
  'Counting Bits': [{ title: 'NeetCode - Counting Bits (LeetCode 338)', videoId: 'RyBM56RIJrM', channel: 'NeetCode', duration: '9:40' }],
  'Reverse Bits': [{ title: 'NeetCode - Reverse Bits (LeetCode 190)', videoId: 'UcoN6UjAI64', channel: 'NeetCode', duration: '8:25' }],

  // System Design
  'System Design Basics': [{ title: 'Gaurav Sen - System Design Basics', videoId: '-W9F__D3oY4', channel: 'Gaurav Sen', duration: '15:20' }],
  'Load Balancing': [{ title: 'ByteByteGo - Load Balancers Explained', videoId: 'K0Ta65OqQk8', channel: 'ByteByteGo', duration: '6:15' }],
  'Caching': [{ title: 'ByteByteGo - Caching Strategies', videoId: '6FYXUrKeqZg', channel: 'ByteByteGo', duration: '7:30' }],
  'Database Design': [{ title: 'ByteByteGo - SQL vs NoSQL', videoId: 'W2Z7gtrEvmo', channel: 'ByteByteGo', duration: '6:45' }],
  'CAP Theorem': [{ title: 'ByteByteGo - CAP Theorem Explained', videoId: 'k-Yaq8LoTVM', channel: 'ByteByteGo', duration: '5:50' }],
  'Message Queues': [{ title: 'ByteByteGo - Message Queues & Kafka', videoId: 'oGJk9s_0GxE', channel: 'ByteByteGo', duration: '7:20' }],
  'Microservices Architecture': [{ title: 'ByteByteGo - Microservices Architecture', videoId: '1xo-0gCVhTU', channel: 'ByteByteGo', duration: '8:10' }],
  'API Design (REST & GraphQL)': [{ title: 'ByteByteGo - REST vs GraphQL', videoId: '4vLxWqE94l4', channel: 'ByteByteGo', duration: '6:30' }],
  'Design URL Shortener': [{ title: 'ByteByteGo - Design TinyURL', videoId: 'fMZMm_0ZhK4', channel: 'ByteByteGo', duration: '11:20' }],
  'Design Twitter / News Feed': [{ title: 'ByteByteGo - Design Twitter / News Feed', videoId: 'wYk0xPP_P_8', channel: 'ByteByteGo', duration: '14:40' }],
  'Design Chat System': [{ title: 'ByteByteGo - Design WhatsApp / Chat', videoId: 'vvhC64hQZMk', channel: 'ByteByteGo', duration: '13:15' }],
  'Design YouTube / Video Platform': [{ title: 'ByteByteGo - Design YouTube', videoId: 'jPKTo1iGQiE', channel: 'ByteByteGo', duration: '15:50' }],
  'Design Rate Limiter': [{ title: 'ByteByteGo - Design Rate Limiter', videoId: 'FU4WlwfS3G0', channel: 'ByteByteGo', duration: '10:35' }],

  // Web Dev
  'HTML5 & Semantic Elements': [{ title: 'freeCodeCamp - HTML5 Full Course for Beginners', videoId: 'kUMe1FH4CHE', channel: 'freeCodeCamp', duration: '2:05:00' }],
  'Modern JavaScript': [{ title: 'freeCodeCamp - JavaScript Programming Full Course', videoId: 'jS4aFq5-91M', channel: 'freeCodeCamp', duration: '3:25:00' }],
  'React Fundamentals': [{ title: 'freeCodeCamp - React 18 Full Course', videoId: 'bMknfKXIFA8', channel: 'freeCodeCamp', duration: '11:55:00' }],
  'State Management': [{ title: 'Dave Gray - Redux Toolkit Tutorial', videoId: '5lrKM6gy96o', channel: 'Dave Gray', duration: '45:00' }],
  'Node.js & Express': [{ title: 'freeCodeCamp - Node.js and Express.js Full Course', videoId: 'Oe421EPjeBE', channel: 'freeCodeCamp', duration: '8:15:00' }],
  'SQL & Databases': [{ title: 'freeCodeCamp - PostgreSQL Course for Beginners', videoId: 'qw--VYLpxG4', channel: 'freeCodeCamp', duration: '4:20:00' }],
  'REST & GraphQL': [{ title: 'freeCodeCamp - GraphQL Full Course', videoId: 'ed8SzALpx1Q', channel: 'freeCodeCamp', duration: '2:15:00' }],
  'Authentication & Security': [{ title: 'Web Dev Simplified - Authentication & JWT', videoId: '7Q17ubqL20U', channel: 'Web Dev Simplified', duration: '22:45' }],

  // DevOps & Cloud
  'Linux & Shell': [{ title: 'freeCodeCamp - Linux for Beginners', videoId: 'ZtqB5_3EkEg', channel: 'freeCodeCamp', duration: '5:45:00' }],
  'Networking Basics': [{ title: 'freeCodeCamp - Network Engineering Full Course', videoId: 'IPvYjXCsTg8', channel: 'freeCodeCamp', duration: '9:25:00' }],
  'Docker & Containers': [{ title: 'freeCodeCamp - Docker Tutorial for Beginners', videoId: '3c-iBn73dDE', channel: 'freeCodeCamp', duration: '2:10:00' }],
  'Kubernetes': [{ title: 'freeCodeCamp - Kubernetes Course', videoId: 'X48VuDVv0do', channel: 'freeCodeCamp', duration: '3:35:00' }],
  'CI/CD Pipelines': [{ title: 'TechWorld with Nana - CI/CD Tutorial', videoId: 'scEDHsr3APg', channel: 'TechWorld with Nana', duration: '38:20' }],
  'Terraform & IaC': [{ title: 'freeCodeCamp - Terraform Course', videoId: '7xngnjfIlK4', channel: 'freeCodeCamp', duration: '2:40:00' }],
  'AWS Fundamentals': [{ title: 'freeCodeCamp - AWS Cloud Practitioner Certification', videoId: 'ulprqHHWlng', channel: 'freeCodeCamp', duration: '13:10:00' }],

  // Data Science
  'Python for Data Science': [{ title: 'freeCodeCamp - Python for Data Science Course', videoId: 'LHBE6Q9XlzI', channel: 'freeCodeCamp', duration: '12:00:00' }],
  'SQL for Data Analysis': [{ title: 'freeCodeCamp - SQL for Data Analysis', videoId: '7mz73uXD9DA', channel: 'freeCodeCamp', duration: '4:15:00' }],
  'Data Cleaning & Preprocessing': [{ title: 'Keith Galli - Pandas Data Cleaning Tutorial', videoId: 'eMOA1pPVUc4', channel: 'Keith Galli', duration: '58:00' }],
  'Exploratory Data Analysis (EDA)': [{ title: 'freeCodeCamp - Exploratory Data Analysis with Python', videoId: 'm6mYwS_dha4', channel: 'freeCodeCamp', duration: '2:30:00' }],
  'Data Visualization (Advanced)': [{ title: 'freeCodeCamp - Data Visualization with Python', videoId: '2LhoCfjm8R4', channel: 'freeCodeCamp', duration: '3:15:00' }],
  'Statistical Analysis': [{ title: 'freeCodeCamp - Statistics for Data Science', videoId: 'Vfo5le26IhY', channel: 'freeCodeCamp', duration: '8:05:00' }],

  // OOP & Design Patterns
  'OOP Principles': [{ title: 'freeCodeCamp - Object Oriented Programming in Python', videoId: 'SiBw7os-_zI', channel: 'freeCodeCamp', duration: '2:15:00' }],
  'SOLID Principles': [{ title: 'Web Dev Simplified - SOLID Principles', videoId: 'XzdhWwtCpsY', channel: 'Web Dev Simplified', duration: '15:30' }],
  'Design Patterns (Creational)': [{ title: 'Fireship - 10 Design Patterns Explained', videoId: 'tv-_1er1mWI', channel: 'Fireship', duration: '11:45' }],
  'Design Patterns (Structural)': [{ title: 'Christopher Okhravi - Structural Design Patterns', videoId: 'lAYbZ7q6U_w', channel: 'Christopher Okhravi', duration: '22:15' }],
  'Design Patterns (Behavioral)': [{ title: 'Christopher Okhravi - Behavioral Design Patterns', videoId: 'v9ejT8FO-7I', channel: 'Christopher Okhravi', duration: '28:40' }],

  // Behavioral Interviews
  'STAR Method': [{ title: 'Self Made Millennial - STAR Method Explained', videoId: '8f7sL-qFjC8', channel: 'Self Made Millennial', duration: '10:15' }],
  'Common Behavioral Questions': [{ title: 'Dan Croitor - Amazon Behavioral Interview Questions', videoId: '1U_W4eC8w5E', channel: 'Dan Croitor', duration: '18:30' }],
  'Resume & LinkedIn Optimization': [{ title: 'Jeff Su - Resume Tips for Software Engineers', videoId: 'BYUy1yNRm64', channel: 'Jeff Su', duration: '12:50' }],
};

function topic(name, theory, difficulty, searchQueries, practiceLinks = [], tags = [], customVideos = []) {
  const defaultVideos = CURATED_TOPIC_VIDEOS[name] || [];
  const videos = [...defaultVideos, ...customVideos];

  return {
    name,
    theory,
    difficulty, // 'easy' | 'medium' | 'hard'
    estimatedHours: difficulty === 'easy' ? 1.5 : difficulty === 'medium' ? 3 : 4.5,
    searchQueries, // Array of YouTube search strings
    practiceLinks, // [{ name, url, platform }]
    tags,
    videos,
  };
}

function practice(name, url, platform = 'leetcode') {
  return { name, url, platform };
}

// ═══════════════════════════════════════════════════════════════════════════════
// SHARED TOPIC POOLS — Reusable across roles
// ═══════════════════════════════════════════════════════════════════════════════

// ─── DSA: Arrays & Hashing ───────────────────────────────────────────────────
const DSA_ARRAYS_HASHING = [
  topic('Contains Duplicate', 'Use a HashSet to detect duplicates in O(n) time and space.', 'easy',
    ['neetcode contains duplicate', 'contains duplicate leetcode python solution', 'arrays hashing tutorial beginners'],
    [practice('LeetCode #217', 'https://leetcode.com/problems/contains-duplicate/')],
    ['arrays', 'hash-set']),
  topic('Valid Anagram', 'Compare character frequency counts using a hash map or sorting.', 'easy',
    ['neetcode valid anagram', 'valid anagram leetcode explained', 'anagram check algorithm'],
    [practice('LeetCode #242', 'https://leetcode.com/problems/valid-anagram/')],
    ['strings', 'hash-map']),
  topic('Two Sum', 'Use a hash map to store complements and find pairs in O(n).', 'easy',
    ['neetcode two sum', 'two sum leetcode python explained', 'two sum problem tutorial beginners'],
    [practice('LeetCode #1', 'https://leetcode.com/problems/two-sum/')],
    ['arrays', 'hash-map']),
  topic('Group Anagrams', 'Group strings by sorted character key or character count tuple.', 'medium',
    ['neetcode group anagrams', 'group anagrams leetcode solution', 'group anagrams python explained'],
    [practice('LeetCode #49', 'https://leetcode.com/problems/group-anagrams/')],
    ['strings', 'hash-map']),
  topic('Top K Frequent Elements', 'Use bucket sort or a heap to find k most frequent elements.', 'medium',
    ['neetcode top k frequent elements', 'top k frequent elements bucket sort', 'top k frequent leetcode explained'],
    [practice('LeetCode #347', 'https://leetcode.com/problems/top-k-frequent-elements/')],
    ['arrays', 'heap', 'bucket-sort']),
  topic('Product of Array Except Self', 'Use prefix and suffix product arrays to avoid division.', 'medium',
    ['neetcode product of array except self', 'product of array except self explained', 'prefix suffix product technique'],
    [practice('LeetCode #238', 'https://leetcode.com/problems/product-of-array-except-self/')],
    ['arrays', 'prefix-sum']),
  topic('Valid Sudoku', 'Check each row, column, and 3x3 box for duplicate digits using sets.', 'medium',
    ['neetcode valid sudoku', 'valid sudoku leetcode solution python', 'sudoku validation algorithm'],
    [practice('LeetCode #36', 'https://leetcode.com/problems/valid-sudoku/')],
    ['arrays', 'hash-set', 'matrix']),
  topic('Longest Consecutive Sequence', 'Use a HashSet and only start counting from sequence beginnings.', 'medium',
    ['neetcode longest consecutive sequence', 'longest consecutive sequence leetcode', 'longest consecutive sequence O(n) solution'],
    [practice('LeetCode #128', 'https://leetcode.com/problems/longest-consecutive-sequence/')],
    ['arrays', 'hash-set']),
];

// ─── DSA: Two Pointers ──────────────────────────────────────────────────────
const DSA_TWO_POINTERS = [
  topic('Valid Palindrome', 'Use two pointers from both ends, skip non-alphanumeric characters.', 'easy',
    ['neetcode valid palindrome', 'valid palindrome leetcode python', 'two pointer technique tutorial'],
    [practice('LeetCode #125', 'https://leetcode.com/problems/valid-palindrome/')],
    ['strings', 'two-pointers']),
  topic('Two Sum II - Sorted Array', 'Use two pointers since array is sorted — shrink the window.', 'medium',
    ['neetcode two sum II', 'two sum sorted array two pointers', 'two sum II leetcode explained'],
    [practice('LeetCode #167', 'https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/')],
    ['arrays', 'two-pointers']),
  topic('3Sum', 'Sort array, fix one element, use two pointers for remaining pair.', 'medium',
    ['neetcode 3sum', '3sum leetcode python solution', 'three sum two pointer approach'],
    [practice('LeetCode #15', 'https://leetcode.com/problems/3sum/')],
    ['arrays', 'two-pointers']),
  topic('Container With Most Water', 'Two pointers from edges, move the shorter side inward.', 'medium',
    ['neetcode container with most water', 'container with most water explained', 'max area two pointers'],
    [practice('LeetCode #11', 'https://leetcode.com/problems/container-with-most-water/')],
    ['arrays', 'two-pointers', 'greedy']),
  topic('Trapping Rain Water', 'Use left and right max arrays or two pointers for O(n) solution.', 'hard',
    ['neetcode trapping rain water', 'trapping rain water leetcode hard', 'trapping rain water two pointers python'],
    [practice('LeetCode #42', 'https://leetcode.com/problems/trapping-rain-water/')],
    ['arrays', 'two-pointers', 'dynamic-programming']),
];

// ─── DSA: Sliding Window ────────────────────────────────────────────────────
const DSA_SLIDING_WINDOW = [
  topic('Best Time to Buy & Sell Stock', 'Track minimum price and maximum profit with a single pass.', 'easy',
    ['neetcode best time buy sell stock', 'buy sell stock leetcode python', 'sliding window stock problem'],
    [practice('LeetCode #121', 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock/')],
    ['arrays', 'sliding-window']),
  topic('Longest Substring Without Repeating', 'Expand window right, shrink left when duplicate found using a set.', 'medium',
    ['neetcode longest substring without repeating', 'longest substring no repeat characters', 'sliding window substring technique'],
    [practice('LeetCode #3', 'https://leetcode.com/problems/longest-substring-without-repeating-characters/')],
    ['strings', 'sliding-window', 'hash-set']),
  topic('Longest Repeating Character Replacement', 'Sliding window — window is valid if (length - maxFreq) <= k.', 'medium',
    ['neetcode longest repeating character replacement', 'character replacement sliding window', 'longest repeating character leetcode'],
    [practice('LeetCode #424', 'https://leetcode.com/problems/longest-repeating-character-replacement/')],
    ['strings', 'sliding-window']),
  topic('Minimum Window Substring', 'Use two pointers with character frequency maps to find smallest valid window.', 'hard',
    ['neetcode minimum window substring', 'minimum window substring leetcode hard', 'min window substring sliding window python'],
    [practice('LeetCode #76', 'https://leetcode.com/problems/minimum-window-substring/')],
    ['strings', 'sliding-window', 'hash-map']),
];

// ─── DSA: Stack ─────────────────────────────────────────────────────────────
const DSA_STACK = [
  topic('Valid Parentheses', 'Use a stack to match opening and closing brackets.', 'easy',
    ['neetcode valid parentheses', 'valid parentheses leetcode python', 'stack matching brackets tutorial'],
    [practice('LeetCode #20', 'https://leetcode.com/problems/valid-parentheses/')],
    ['stack']),
  topic('Min Stack', 'Maintain a secondary stack tracking the minimum at each level.', 'medium',
    ['neetcode min stack', 'min stack design leetcode', 'minimum stack data structure'],
    [practice('LeetCode #155', 'https://leetcode.com/problems/min-stack/')],
    ['stack', 'design']),
  topic('Daily Temperatures', 'Use a monotonic decreasing stack to find next warmer day.', 'medium',
    ['neetcode daily temperatures', 'daily temperatures monotonic stack', 'daily temperatures leetcode python'],
    [practice('LeetCode #739', 'https://leetcode.com/problems/daily-temperatures/')],
    ['stack', 'monotonic-stack']),
  topic('Largest Rectangle in Histogram', 'Monotonic stack to find max rectangle area in histogram.', 'hard',
    ['neetcode largest rectangle histogram', 'largest rectangle histogram stack', 'max rectangle histogram leetcode hard'],
    [practice('LeetCode #84', 'https://leetcode.com/problems/largest-rectangle-in-histogram/')],
    ['stack', 'monotonic-stack']),
];

// ─── DSA: Binary Search ─────────────────────────────────────────────────────
const DSA_BINARY_SEARCH = [
  topic('Binary Search', 'Classic divide-and-conquer: compare mid element, halve search space.', 'easy',
    ['neetcode binary search', 'binary search algorithm explained', 'binary search tutorial for beginners python'],
    [practice('LeetCode #704', 'https://leetcode.com/problems/binary-search/')],
    ['binary-search']),
  topic('Search a 2D Matrix', 'Treat 2D matrix as a flattened sorted array — binary search on virtual index.', 'medium',
    ['neetcode search 2d matrix', 'search 2d matrix binary search', 'search 2d matrix leetcode python'],
    [practice('LeetCode #74', 'https://leetcode.com/problems/search-a-2d-matrix/')],
    ['binary-search', 'matrix']),
  topic('Koko Eating Bananas', 'Binary search on answer: find minimum eating speed to finish in h hours.', 'medium',
    ['neetcode koko eating bananas', 'koko eating bananas binary search', 'binary search on answer explained'],
    [practice('LeetCode #875', 'https://leetcode.com/problems/koko-eating-bananas/')],
    ['binary-search']),
  topic('Find Minimum in Rotated Sorted Array', 'Modified binary search — compare mid with right boundary.', 'medium',
    ['neetcode find min rotated sorted array', 'rotated sorted array binary search', 'find minimum rotated array leetcode'],
    [practice('LeetCode #153', 'https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/')],
    ['binary-search']),
  topic('Search in Rotated Sorted Array', 'Determine which half is sorted, then binary search in correct half.', 'medium',
    ['neetcode search rotated sorted array', 'search rotated sorted array explained', 'rotated array binary search python'],
    [practice('LeetCode #33', 'https://leetcode.com/problems/search-in-rotated-sorted-array/')],
    ['binary-search']),
];

// ─── DSA: Linked List ───────────────────────────────────────────────────────
const DSA_LINKED_LIST = [
  topic('Reverse Linked List', 'Iterative: use three pointers (prev, curr, next). Recursive: reverse rest first.', 'easy',
    ['neetcode reverse linked list', 'reverse linked list iterative recursive', 'reverse linked list python tutorial'],
    [practice('LeetCode #206', 'https://leetcode.com/problems/reverse-linked-list/')],
    ['linked-list']),
  topic('Merge Two Sorted Lists', 'Use a dummy head and compare nodes, linking smaller first.', 'easy',
    ['neetcode merge two sorted lists', 'merge sorted linked lists explained', 'merge two lists leetcode python'],
    [practice('LeetCode #21', 'https://leetcode.com/problems/merge-two-sorted-lists/')],
    ['linked-list']),
  topic('Linked List Cycle', 'Floyd\'s tortoise and hare: slow moves 1 step, fast moves 2 steps.', 'easy',
    ['neetcode linked list cycle', 'floyd cycle detection algorithm', 'detect cycle linked list python'],
    [practice('LeetCode #141', 'https://leetcode.com/problems/linked-list-cycle/')],
    ['linked-list', 'two-pointers']),
  topic('LRU Cache', 'Combine a hash map with a doubly linked list for O(1) get/put.', 'medium',
    ['neetcode LRU cache', 'LRU cache design leetcode', 'LRU cache implementation python explained'],
    [practice('LeetCode #146', 'https://leetcode.com/problems/lru-cache/')],
    ['linked-list', 'hash-map', 'design']),
  topic('Merge K Sorted Lists', 'Use a min-heap to efficiently merge k sorted lists.', 'hard',
    ['neetcode merge k sorted lists', 'merge k sorted lists heap', 'merge k lists leetcode hard python'],
    [practice('LeetCode #23', 'https://leetcode.com/problems/merge-k-sorted-lists/')],
    ['linked-list', 'heap']),
];

// ─── DSA: Trees ─────────────────────────────────────────────────────────────
const DSA_TREES = [
  topic('Invert Binary Tree', 'Recursively swap left and right children of every node.', 'easy',
    ['neetcode invert binary tree', 'invert binary tree explained', 'invert binary tree python recursive'],
    [practice('LeetCode #226', 'https://leetcode.com/problems/invert-binary-tree/')],
    ['trees', 'recursion']),
  topic('Maximum Depth of Binary Tree', 'DFS/BFS — max depth is 1 + max(left depth, right depth).', 'easy',
    ['neetcode maximum depth binary tree', 'max depth binary tree dfs bfs', 'maximum depth binary tree leetcode'],
    [practice('LeetCode #104', 'https://leetcode.com/problems/maximum-depth-of-binary-tree/')],
    ['trees', 'dfs']),
  topic('Binary Tree Level Order Traversal', 'Use BFS with a queue, process level by level.', 'medium',
    ['neetcode level order traversal', 'binary tree level order bfs', 'level order traversal leetcode python'],
    [practice('LeetCode #102', 'https://leetcode.com/problems/binary-tree-level-order-traversal/')],
    ['trees', 'bfs']),
  topic('Validate BST', 'Track valid range (min, max) for each node during DFS traversal.', 'medium',
    ['neetcode validate bst', 'validate binary search tree explained', 'validate BST leetcode python'],
    [practice('LeetCode #98', 'https://leetcode.com/problems/validate-binary-search-tree/')],
    ['trees', 'dfs', 'bst']),
  topic('Binary Tree Maximum Path Sum', 'At each node, compute max gain including that node. Track global max.', 'hard',
    ['neetcode binary tree max path sum', 'binary tree maximum path sum hard', 'max path sum leetcode explained'],
    [practice('LeetCode #124', 'https://leetcode.com/problems/binary-tree-maximum-path-sum/')],
    ['trees', 'dfs', 'dynamic-programming']),
  topic('Serialize and Deserialize Binary Tree', 'Use preorder traversal with null markers for serialization.', 'hard',
    ['neetcode serialize deserialize binary tree', 'serialize binary tree leetcode', 'serialize deserialize tree python'],
    [practice('LeetCode #297', 'https://leetcode.com/problems/serialize-and-deserialize-binary-tree/')],
    ['trees', 'design']),
];

// ─── DSA: Graphs ────────────────────────────────────────────────────────────
const DSA_GRAPHS = [
  topic('Number of Islands', 'BFS/DFS from each unvisited land cell, mark visited as you go.', 'medium',
    ['neetcode number of islands', 'number of islands bfs dfs', 'number of islands leetcode python'],
    [practice('LeetCode #200', 'https://leetcode.com/problems/number-of-islands/')],
    ['graphs', 'bfs', 'dfs']),
  topic('Clone Graph', 'Use a hash map to track old-to-new node mapping during BFS/DFS.', 'medium',
    ['neetcode clone graph', 'clone graph leetcode python', 'clone graph bfs dfs explained'],
    [practice('LeetCode #133', 'https://leetcode.com/problems/clone-graph/')],
    ['graphs', 'bfs', 'hash-map']),
  topic('Course Schedule', 'Detect cycle in directed graph using DFS with visited states or topological sort.', 'medium',
    ['neetcode course schedule', 'course schedule topological sort', 'detect cycle directed graph python'],
    [practice('LeetCode #207', 'https://leetcode.com/problems/course-schedule/')],
    ['graphs', 'topological-sort']),
  topic('Pacific Atlantic Water Flow', 'BFS/DFS from ocean borders inward, find intersection of reachable cells.', 'medium',
    ['neetcode pacific atlantic water flow', 'pacific atlantic water flow explained', 'pacific atlantic leetcode python'],
    [practice('LeetCode #417', 'https://leetcode.com/problems/pacific-atlantic-water-flow/')],
    ['graphs', 'bfs', 'dfs']),
  topic('Word Ladder', 'BFS on word graph — change one letter at a time, find shortest path.', 'hard',
    ['neetcode word ladder', 'word ladder bfs shortest path', 'word ladder leetcode hard python'],
    [practice('LeetCode #127', 'https://leetcode.com/problems/word-ladder/')],
    ['graphs', 'bfs']),
];

// ─── DSA: Dynamic Programming ───────────────────────────────────────────────
const DSA_DP = [
  topic('Climbing Stairs', 'Fibonacci-style DP: dp[i] = dp[i-1] + dp[i-2].', 'easy',
    ['neetcode climbing stairs', 'climbing stairs dynamic programming', 'climbing stairs leetcode python tutorial'],
    [practice('LeetCode #70', 'https://leetcode.com/problems/climbing-stairs/')],
    ['dynamic-programming']),
  topic('House Robber', 'At each house, choose max of (rob this + dp[i-2]) or (skip, dp[i-1]).', 'medium',
    ['neetcode house robber', 'house robber dynamic programming explained', 'house robber leetcode python'],
    [practice('LeetCode #198', 'https://leetcode.com/problems/house-robber/')],
    ['dynamic-programming']),
  topic('Coin Change', 'Bottom-up DP: for each amount, try all coins and take minimum.', 'medium',
    ['neetcode coin change', 'coin change dynamic programming', 'coin change leetcode python explained'],
    [practice('LeetCode #322', 'https://leetcode.com/problems/coin-change/')],
    ['dynamic-programming']),
  topic('Longest Increasing Subsequence', 'DP: dp[i] = max length ending at i. Binary search for O(n log n).', 'medium',
    ['neetcode longest increasing subsequence', 'LIS dynamic programming binary search', 'longest increasing subsequence leetcode'],
    [practice('LeetCode #300', 'https://leetcode.com/problems/longest-increasing-subsequence/')],
    ['dynamic-programming', 'binary-search']),
  topic('Longest Common Subsequence', '2D DP: if chars match, dp[i][j] = 1 + dp[i-1][j-1], else max of skip either.', 'medium',
    ['neetcode longest common subsequence', 'LCS dynamic programming 2d', 'longest common subsequence leetcode python'],
    [practice('LeetCode #1143', 'https://leetcode.com/problems/longest-common-subsequence/')],
    ['dynamic-programming', '2d-dp']),
  topic('Edit Distance', '2D DP: at each position consider insert, delete, or replace operations.', 'medium',
    ['neetcode edit distance', 'edit distance dynamic programming', 'edit distance leetcode python explained'],
    [practice('LeetCode #72', 'https://leetcode.com/problems/edit-distance/')],
    ['dynamic-programming', '2d-dp', 'strings']),
];

// ─── DSA: Heap / Priority Queue ─────────────────────────────────────────────
const DSA_HEAP = [
  topic('Kth Largest Element in Array', 'Use a min-heap of size k, or QuickSelect for O(n) average.', 'medium',
    ['neetcode kth largest element', 'kth largest element heap quickselect', 'kth largest leetcode python'],
    [practice('LeetCode #215', 'https://leetcode.com/problems/kth-largest-element-in-an-array/')],
    ['heap', 'sorting']),
  topic('Task Scheduler', 'Greedy with max-heap: schedule most frequent tasks first with cooldown.', 'medium',
    ['neetcode task scheduler', 'task scheduler greedy heap', 'task scheduler leetcode python explained'],
    [practice('LeetCode #621', 'https://leetcode.com/problems/task-scheduler/')],
    ['heap', 'greedy']),
  topic('Find Median from Data Stream', 'Two heaps: max-heap for lower half, min-heap for upper half.', 'hard',
    ['neetcode find median data stream', 'median from data stream two heaps', 'find median stream leetcode hard'],
    [practice('LeetCode #295', 'https://leetcode.com/problems/find-median-from-data-stream/')],
    ['heap', 'design']),
];

// ─── DSA: Backtracking ──────────────────────────────────────────────────────
const DSA_BACKTRACKING = [
  topic('Subsets', 'Generate all subsets using include/exclude pattern with backtracking.', 'medium',
    ['neetcode subsets', 'subsets backtracking explained', 'subsets leetcode python tutorial'],
    [practice('LeetCode #78', 'https://leetcode.com/problems/subsets/')],
    ['backtracking', 'recursion']),
  topic('Combination Sum', 'Backtrack with remaining target — can reuse same element.', 'medium',
    ['neetcode combination sum', 'combination sum backtracking', 'combination sum leetcode python'],
    [practice('LeetCode #39', 'https://leetcode.com/problems/combination-sum/')],
    ['backtracking']),
  topic('Permutations', 'Swap elements or use visited array to generate all orderings.', 'medium',
    ['neetcode permutations', 'permutations backtracking algorithm', 'permutations leetcode python'],
    [practice('LeetCode #46', 'https://leetcode.com/problems/permutations/')],
    ['backtracking']),
  topic('N-Queens', 'Place queens row by row, track column and diagonal conflicts.', 'hard',
    ['neetcode n queens', 'n queens backtracking explained', 'n queens leetcode hard python'],
    [practice('LeetCode #51', 'https://leetcode.com/problems/n-queens/')],
    ['backtracking', 'matrix']),
];

// ─── DSA: Greedy ────────────────────────────────────────────────────────────
const DSA_GREEDY = [
  topic('Maximum Subarray', 'Kadane\'s algorithm: track current sum, reset when negative.', 'medium',
    ['neetcode maximum subarray', 'kadane algorithm explained', 'maximum subarray leetcode python'],
    [practice('LeetCode #53', 'https://leetcode.com/problems/maximum-subarray/')],
    ['greedy', 'dynamic-programming']),
  topic('Jump Game', 'Track farthest reachable index greedily from left to right.', 'medium',
    ['neetcode jump game', 'jump game greedy approach', 'jump game leetcode python explained'],
    [practice('LeetCode #55', 'https://leetcode.com/problems/jump-game/')],
    ['greedy']),
  topic('Merge Intervals', 'Sort by start time, merge overlapping intervals.', 'medium',
    ['neetcode merge intervals', 'merge intervals sorting approach', 'merge intervals leetcode python'],
    [practice('LeetCode #56', 'https://leetcode.com/problems/merge-intervals/')],
    ['greedy', 'sorting', 'intervals']),
];

// ─── DSA: Tries ─────────────────────────────────────────────────────────────
const DSA_TRIES = [
  topic('Implement Trie', 'Build a prefix tree with insert, search, and startsWith operations.', 'medium',
    ['neetcode implement trie', 'trie data structure tutorial', 'implement trie prefix tree python'],
    [practice('LeetCode #208', 'https://leetcode.com/problems/implement-trie-prefix-tree/')],
    ['trie', 'design']),
  topic('Word Search II', 'Combine Trie with backtracking on the board for efficient multi-word search.', 'hard',
    ['neetcode word search II', 'word search 2 trie backtracking', 'word search II leetcode hard python'],
    [practice('LeetCode #212', 'https://leetcode.com/problems/word-search-ii/')],
    ['trie', 'backtracking']),
];

// ─── DSA: Bit Manipulation ──────────────────────────────────────────────────
const DSA_BITS = [
  topic('Single Number', 'XOR all numbers — duplicates cancel, leaving the unique one.', 'easy',
    ['neetcode single number', 'single number xor explained', 'single number leetcode python'],
    [practice('LeetCode #136', 'https://leetcode.com/problems/single-number/')],
    ['bit-manipulation']),
  topic('Counting Bits', 'dp[i] = dp[i >> 1] + (i & 1) — use previously computed results.', 'easy',
    ['neetcode counting bits', 'counting bits dynamic programming', 'counting bits leetcode python'],
    [practice('LeetCode #338', 'https://leetcode.com/problems/counting-bits/')],
    ['bit-manipulation', 'dynamic-programming']),
  topic('Reverse Bits', 'Iterate 32 times, extract last bit with AND, shift into result.', 'easy',
    ['neetcode reverse bits', 'reverse bits leetcode python', 'reverse bits bitwise operations'],
    [practice('LeetCode #190', 'https://leetcode.com/problems/reverse-bits/')],
    ['bit-manipulation']),
];

// ─── ML: Math Foundations ───────────────────────────────────────────────────
const ML_MATH = [
  topic('Vectors & Matrices', 'Vectors are ordered lists of numbers; matrices are 2D arrays. Foundation for all ML math.', 'easy',
    ['3blue1brown linear algebra', 'linear algebra for machine learning', 'vectors matrices tutorial beginners', 'khan academy linear algebra'],
    [practice('Khan Academy', 'https://www.khanacademy.org/math/linear-algebra', 'khan-academy')],
    ['math', 'linear-algebra']),
  topic('Matrix Operations', 'Addition, multiplication, transpose, inverse — key operations for data transformations.', 'easy',
    ['matrix multiplication explained', 'matrix operations for machine learning', '3blue1brown matrix multiplication', 'numpy matrix operations tutorial'],
    [practice('Khan Academy', 'https://www.khanacademy.org/math/linear-algebra', 'khan-academy')],
    ['math', 'linear-algebra']),
  topic('Eigenvalues & Eigenvectors', 'Eigen-decomposition reveals principal directions of transformation. Used in PCA.', 'medium',
    ['3blue1brown eigenvectors eigenvalues', 'eigenvalues eigenvectors machine learning', 'eigenvalue decomposition explained simply'],
    [],
    ['math', 'linear-algebra']),
  topic('Derivatives & Gradients', 'Derivatives measure rate of change. Gradients extend this to multiple dimensions for optimization.', 'medium',
    ['3blue1brown calculus gradient', 'derivatives for machine learning', 'gradient descent math explained', 'calculus for deep learning'],
    [practice('Khan Academy', 'https://www.khanacademy.org/math/multivariable-calculus', 'khan-academy')],
    ['math', 'calculus']),
  topic('Chain Rule & Backpropagation', 'Chain rule computes derivatives of composed functions — the math behind backpropagation.', 'medium',
    ['3blue1brown backpropagation', 'chain rule backpropagation deep learning', 'backpropagation calculus explained'],
    [],
    ['math', 'calculus', 'deep-learning']),
  topic('Probability Distributions', 'Normal, Bernoulli, Poisson, Uniform — describe how data is distributed.', 'medium',
    ['probability distributions machine learning', 'statquest probability distributions', 'probability distributions explained simply', 'normal distribution tutorial'],
    [],
    ['math', 'statistics']),
  topic('Bayes Theorem', 'P(A|B) = P(B|A)·P(A)/P(B). Foundation for Naive Bayes and Bayesian inference.', 'medium',
    ['3blue1brown bayes theorem', 'bayes theorem machine learning explained', 'statquest bayes theorem', 'bayesian thinking tutorial'],
    [],
    ['math', 'statistics', 'probability']),
  topic('Hypothesis Testing', 'Test whether observed results are statistically significant using p-values and confidence intervals.', 'medium',
    ['statquest hypothesis testing', 'hypothesis testing for data science', 'p-value explained simply', 'statistical significance tutorial'],
    [],
    ['math', 'statistics']),
];

// ─── ML: Core Algorithms ────────────────────────────────────────────────────
const ML_SUPERVISED = [
  topic('Linear Regression', 'Fit a line y = mx + b minimizing squared error. Gradient descent or normal equation.', 'easy',
    ['statquest linear regression', 'linear regression machine learning python', 'linear regression from scratch', 'linear regression sklearn tutorial'],
    [practice('Kaggle', 'https://www.kaggle.com/learn/intro-to-machine-learning', 'kaggle')],
    ['ml', 'regression']),
  topic('Logistic Regression', 'Sigmoid function maps linear output to probability. Binary classification.', 'easy',
    ['statquest logistic regression', 'logistic regression from scratch python', 'logistic regression machine learning explained'],
    [practice('Kaggle', 'https://www.kaggle.com/learn/intro-to-machine-learning', 'kaggle')],
    ['ml', 'classification']),
  topic('Decision Trees', 'Split data by features using information gain or Gini impurity. Interpretable models.', 'easy',
    ['statquest decision trees', 'decision tree algorithm explained', 'decision trees python sklearn tutorial', 'decision tree from scratch'],
    [],
    ['ml', 'classification', 'regression']),
  topic('Random Forests', 'Ensemble of decision trees trained on random subsets (bagging). Reduces overfitting.', 'medium',
    ['statquest random forests', 'random forest machine learning', 'random forest python tutorial', 'random forest vs decision tree'],
    [],
    ['ml', 'ensemble']),
  topic('Support Vector Machines', 'Find hyperplane that maximizes margin between classes. Kernel trick for non-linear.', 'medium',
    ['statquest support vector machines', 'SVM machine learning explained', 'support vector machines python tutorial', 'SVM kernel trick'],
    [],
    ['ml', 'classification']),
  topic('K-Nearest Neighbors', 'Classify by majority vote of k nearest training examples. Simple but effective.', 'easy',
    ['KNN algorithm explained', 'k nearest neighbors python', 'KNN machine learning tutorial', 'statquest KNN'],
    [],
    ['ml', 'classification']),
  topic('XGBoost & Gradient Boosting', 'Sequentially add trees that correct previous errors. State-of-the-art for tabular data.', 'medium',
    ['statquest xgboost', 'gradient boosting explained', 'xgboost python tutorial', 'xgboost vs random forest'],
    [],
    ['ml', 'ensemble', 'boosting']),
  topic('Naive Bayes', 'Apply Bayes theorem with independence assumption. Fast, good for text classification.', 'easy',
    ['naive bayes algorithm explained', 'statquest naive bayes', 'naive bayes text classification python', 'naive bayes spam filter'],
    [],
    ['ml', 'classification', 'probability']),
];

const ML_UNSUPERVISED = [
  topic('K-Means Clustering', 'Partition data into k clusters by iteratively assigning points and updating centroids.', 'easy',
    ['statquest k-means clustering', 'k-means clustering python tutorial', 'k-means algorithm explained', 'k-means sklearn'],
    [],
    ['ml', 'clustering']),
  topic('PCA (Principal Component Analysis)', 'Reduce dimensionality by projecting onto directions of maximum variance.', 'medium',
    ['statquest PCA', 'PCA machine learning explained', 'principal component analysis python', 'PCA dimensionality reduction tutorial'],
    [],
    ['ml', 'dimensionality-reduction']),
  topic('DBSCAN', 'Density-based clustering — finds arbitrarily shaped clusters, handles noise.', 'medium',
    ['DBSCAN algorithm explained', 'DBSCAN clustering python', 'DBSCAN vs k-means', 'density based clustering tutorial'],
    [],
    ['ml', 'clustering']),
  topic('t-SNE & UMAP', 'Non-linear dimensionality reduction for visualization. t-SNE preserves local structure.', 'medium',
    ['statquest t-SNE', 't-SNE UMAP visualization explained', 't-SNE python tutorial', 'UMAP vs t-SNE'],
    [],
    ['ml', 'visualization', 'dimensionality-reduction']),
];

const ML_EVALUATION = [
  topic('Bias-Variance Tradeoff', 'High bias = underfitting, high variance = overfitting. Balance model complexity.', 'medium',
    ['statquest bias variance tradeoff', 'bias variance machine learning', 'overfitting underfitting explained', 'bias variance tradeoff tutorial'],
    [],
    ['ml', 'theory']),
  topic('Cross-Validation', 'K-fold CV: split data into k folds, train on k-1, validate on remaining. Robust evaluation.', 'easy',
    ['statquest cross validation', 'k-fold cross validation explained', 'cross validation python sklearn', 'cross validation tutorial'],
    [],
    ['ml', 'evaluation']),
  topic('Precision, Recall & F1', 'Precision = TP/(TP+FP), Recall = TP/(TP+FN). F1 is harmonic mean. For imbalanced data.', 'medium',
    ['statquest precision recall', 'precision recall F1 score explained', 'confusion matrix explained', 'precision recall python'],
    [],
    ['ml', 'evaluation', 'classification']),
  topic('ROC & AUC', 'ROC curve plots TPR vs FPR at various thresholds. AUC measures overall classifier performance.', 'medium',
    ['statquest ROC AUC', 'ROC curve AUC explained', 'ROC AUC python tutorial', 'ROC curve machine learning'],
    [],
    ['ml', 'evaluation']),
  topic('Regularization (L1 & L2)', 'L1 (Lasso) promotes sparsity, L2 (Ridge) prevents large weights. Control overfitting.', 'medium',
    ['statquest regularization', 'L1 L2 regularization explained', 'lasso ridge regression python', 'regularization machine learning'],
    [],
    ['ml', 'regularization']),
];

// ─── Deep Learning Topics ───────────────────────────────────────────────────
const DL_FUNDAMENTALS = [
  topic('Neural Network Basics', 'Layers of neurons with weights, biases, and activation functions. Universal approximators.', 'medium',
    ['3blue1brown neural networks', 'neural network from scratch python', 'neural networks explained simply', 'deep learning fundamentals'],
    [],
    ['deep-learning', 'neural-networks']),
  topic('Activation Functions', 'ReLU, Sigmoid, Tanh, Softmax — introduce non-linearity. ReLU most common.', 'easy',
    ['activation functions deep learning', 'ReLU sigmoid tanh explained', 'activation functions neural networks', 'why ReLU works'],
    [],
    ['deep-learning']),
  topic('Backpropagation', 'Compute gradients of loss w.r.t. weights using chain rule. Core of neural network training.', 'medium',
    ['3blue1brown backpropagation', 'backpropagation explained step by step', 'backpropagation neural network python', 'backprop calculus'],
    [],
    ['deep-learning', 'optimization']),
  topic('Loss Functions', 'MSE for regression, Cross-Entropy for classification. Choose based on task.', 'easy',
    ['loss functions deep learning explained', 'cross entropy loss explained', 'MSE vs cross entropy', 'loss functions neural networks'],
    [],
    ['deep-learning']),
  topic('Optimizers (SGD, Adam)', 'SGD: basic gradient descent. Adam: adaptive learning rates with momentum. Adam most popular.', 'medium',
    ['optimizers deep learning explained', 'adam optimizer explained', 'SGD vs adam', 'deep learning optimizers comparison'],
    [],
    ['deep-learning', 'optimization']),
  topic('Batch Normalization & Dropout', 'BatchNorm normalizes layer inputs. Dropout randomly zeroes neurons for regularization.', 'medium',
    ['batch normalization explained', 'dropout regularization deep learning', 'batchnorm dropout tutorial', 'regularization deep learning'],
    [],
    ['deep-learning', 'regularization']),
];

const DL_CNN = [
  topic('Convolution Operations', 'Filters slide over input to detect features. Learns edges, textures, patterns hierarchically.', 'medium',
    ['CNN convolution explained', '3blue1brown convolution', 'convolutional neural network tutorial', 'convolution operation deep learning'],
    [],
    ['deep-learning', 'cnn', 'computer-vision']),
  topic('CNN Architectures (ResNet, VGG)', 'LeNet → AlexNet → VGG → ResNet. Skip connections solve vanishing gradient.', 'medium',
    ['CNN architectures explained', 'ResNet explained', 'VGG AlexNet history', 'deep learning CNN evolution'],
    [],
    ['deep-learning', 'cnn']),
  topic('Object Detection (YOLO)', 'YOLO: single-pass detection. Divides image into grid, predicts boxes + classes simultaneously.', 'hard',
    ['YOLO object detection explained', 'YOLO v8 tutorial python', 'object detection deep learning', 'YOLO from scratch'],
    [],
    ['deep-learning', 'cnn', 'computer-vision']),
];

const DL_TRANSFORMERS = [
  topic('Self-Attention Mechanism', 'Each token attends to all others via Query-Key-Value matrices. Core of Transformers.', 'medium',
    ['attention mechanism explained', 'self attention transformer tutorial', '3blue1brown attention', 'attention is all you need explained'],
    [],
    ['deep-learning', 'transformers', 'nlp']),
  topic('Transformer Architecture', 'Encoder-Decoder with multi-head attention, positional encoding, feed-forward layers.', 'hard',
    ['transformer architecture explained', 'attention is all you need paper explained', 'transformer from scratch python', 'illustrated transformer'],
    [],
    ['deep-learning', 'transformers']),
  topic('BERT & GPT', 'BERT: bidirectional encoder for understanding. GPT: autoregressive decoder for generation.', 'medium',
    ['BERT explained simply', 'GPT explained', 'BERT vs GPT difference', 'large language models explained'],
    [],
    ['deep-learning', 'transformers', 'nlp']),
  topic('Fine-tuning LLMs (LoRA, QLoRA)', 'Adapt large models to specific tasks by training small adapter layers. Memory efficient.', 'hard',
    ['LoRA fine tuning explained', 'fine tune LLM tutorial', 'QLoRA explained', 'fine tuning large language models'],
    [],
    ['deep-learning', 'llm', 'nlp']),
  topic('RAG (Retrieval Augmented Generation)', 'Combine LLMs with external knowledge retrieval for factual, up-to-date responses.', 'medium',
    ['RAG explained tutorial', 'retrieval augmented generation python', 'RAG LLM tutorial', 'build RAG system'],
    [],
    ['deep-learning', 'llm', 'nlp']),
];

// ─── System Design Topics ───────────────────────────────────────────────────
const SYSTEM_DESIGN_FUNDAMENTALS = [
  topic('System Design Basics', 'Understand scalability, availability, consistency, and partitioning tradeoffs.', 'medium',
    ['system design fundamentals', 'system design interview basics', 'system design for beginners', 'gaurav sen system design'],
    [practice('System Design Primer', 'https://github.com/donnemartin/system-design-primer', 'github')],
    ['system-design']),
  topic('Load Balancing', 'Distribute traffic across servers. Round-robin, least connections, consistent hashing.', 'medium',
    ['load balancing explained', 'load balancer system design', 'nginx load balancing tutorial', 'load balancing algorithms'],
    [],
    ['system-design', 'scalability']),
  topic('Caching', 'Store frequently accessed data closer to the user. Redis, Memcached, CDN, browser cache.', 'medium',
    ['caching system design', 'redis caching tutorial', 'caching strategies explained', 'cache invalidation patterns'],
    [],
    ['system-design', 'performance']),
  topic('Database Design', 'SQL vs NoSQL, indexing, sharding, replication. Choose based on access patterns.', 'medium',
    ['database design system design', 'SQL vs NoSQL explained', 'database sharding explained', 'database indexing tutorial'],
    [],
    ['system-design', 'database']),
  topic('CAP Theorem', 'Distributed systems can only guarantee 2 of 3: Consistency, Availability, Partition tolerance.', 'medium',
    ['CAP theorem explained', 'CAP theorem system design', 'consistency availability partition tolerance', 'distributed systems CAP'],
    [],
    ['system-design', 'distributed-systems']),
  topic('Message Queues', 'Async communication between services. Kafka, RabbitMQ, SQS. Decouples producers/consumers.', 'medium',
    ['message queue system design', 'kafka tutorial beginners', 'message queue explained', 'kafka vs rabbitmq'],
    [],
    ['system-design', 'distributed-systems']),
  topic('Microservices Architecture', 'Break monolith into small, independently deployable services. API gateway, service mesh.', 'hard',
    ['microservices architecture explained', 'microservices tutorial', 'microservices vs monolith', 'microservices design patterns'],
    [],
    ['system-design', 'architecture']),
  topic('API Design (REST & GraphQL)', 'REST: resource-based URLs. GraphQL: client specifies data shape. Design clean APIs.', 'medium',
    ['REST API design best practices', 'REST vs GraphQL', 'API design tutorial', 'RESTful API design patterns'],
    [],
    ['system-design', 'api']),
];

const SYSTEM_DESIGN_INTERVIEWS = [
  topic('Design URL Shortener', 'Hash URL to short code, redirect on access. Discuss scaling, caching, analytics.', 'medium',
    ['design url shortener system design', 'url shortener system design interview', 'tiny url system design', 'design URL shortener step by step'],
    [],
    ['system-design', 'interview']),
  topic('Design Twitter / News Feed', 'Fan-out on write vs read, timeline service, caching, real-time updates.', 'hard',
    ['design twitter system design', 'news feed system design', 'design twitter interview', 'social media feed system design'],
    [],
    ['system-design', 'interview']),
  topic('Design Chat System', 'WebSocket connections, message storage, presence, group chats, E2E encryption.', 'hard',
    ['design chat application system design', 'whatsapp system design', 'real time chat system design', 'messenger system design interview'],
    [],
    ['system-design', 'interview']),
  topic('Design YouTube / Video Platform', 'Video upload pipeline, transcoding, CDN delivery, recommendation engine.', 'hard',
    ['design youtube system design', 'video streaming platform design', 'youtube system design interview', 'video platform architecture'],
    [],
    ['system-design', 'interview']),
  topic('Design Rate Limiter', 'Token bucket, sliding window, fixed window algorithms. Protect APIs from abuse.', 'medium',
    ['rate limiter system design', 'design rate limiter interview', 'rate limiting algorithms explained', 'API rate limiter design'],
    [],
    ['system-design', 'interview']),
];

// ─── ML System Design ───────────────────────────────────────────────────────
const ML_SYSTEM_DESIGN = [
  topic('ML System Architecture', 'End-to-end ML pipeline: data collection → preprocessing → training → serving → monitoring.', 'medium',
    ['ML system design interview', 'machine learning system architecture', 'ML pipeline design', 'end to end ML system'],
    [],
    ['ml-system-design']),
  topic('Feature Stores', 'Centralized feature management for training and serving. Feast, Tecton, Hopsworks.', 'medium',
    ['feature store machine learning', 'feature store explained', 'feast feature store tutorial', 'ML feature engineering pipeline'],
    [],
    ['ml-system-design', 'mlops']),
  topic('Model Serving & Deployment', 'REST API, batch prediction, real-time inference. TensorFlow Serving, TorchServe, BentoML.', 'medium',
    ['ML model deployment tutorial', 'model serving best practices', 'deploy ML model production', 'FastAPI ML model serving'],
    [],
    ['ml-system-design', 'deployment']),
  topic('A/B Testing for ML', 'Compare model versions in production. Statistical significance, metric selection, guardrail metrics.', 'medium',
    ['A/B testing machine learning', 'ML A/B testing explained', 'online experiments ML', 'ML model evaluation production'],
    [],
    ['ml-system-design', 'evaluation']),
  topic('ML Monitoring', 'Track data drift, model performance degradation, concept drift. Alerts and retraining triggers.', 'medium',
    ['ML model monitoring production', 'data drift detection', 'ML monitoring tools', 'model performance monitoring'],
    [],
    ['ml-system-design', 'mlops']),
];

// ─── Web Development Topics ─────────────────────────────────────────────────
const WEB_FRONTEND = [
  topic('HTML5 & Semantic Elements', 'Structure web pages with semantic tags: header, nav, main, article, section, footer.', 'easy',
    ['HTML5 full course beginners', 'HTML semantic elements tutorial', 'HTML crash course', 'freecodecamp HTML course'],
    [practice('freeCodeCamp', 'https://www.freecodecamp.org/learn/2022/responsive-web-design/', 'freecodecamp')],
    ['web', 'html']),
  topic('CSS3 & Flexbox/Grid', 'Style pages with CSS. Flexbox for 1D layout, Grid for 2D. Responsive design.', 'easy',
    ['CSS flexbox grid tutorial', 'CSS full course beginners', 'CSS flexbox explained', 'CSS grid layout tutorial'],
    [practice('freeCodeCamp', 'https://www.freecodecamp.org/learn/2022/responsive-web-design/', 'freecodecamp')],
    ['web', 'css']),
  topic('JavaScript Fundamentals', 'Variables, functions, closures, promises, async/await, DOM manipulation.', 'easy',
    ['javascript full course beginners', 'javascript fundamentals tutorial', 'javascript crash course', 'freecodecamp javascript'],
    [practice('freeCodeCamp', 'https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/', 'freecodecamp')],
    ['web', 'javascript']),
  topic('React.js', 'Component-based UI library. JSX, hooks (useState, useEffect), props, state management.', 'medium',
    ['react js full course beginners', 'react tutorial for beginners 2024', 'react hooks explained', 'react crash course'],
    [practice('React Docs', 'https://react.dev/learn', 'docs')],
    ['web', 'react', 'frontend']),
  topic('TypeScript', 'Typed JavaScript. Interfaces, generics, type guards. Catches errors at compile time.', 'medium',
    ['typescript full course beginners', 'typescript tutorial', 'typescript for react developers', 'typescript crash course'],
    [practice('TS Docs', 'https://www.typescriptlang.org/docs/', 'docs')],
    ['web', 'typescript', 'frontend']),
  topic('Next.js', 'React framework with SSR, SSG, API routes, file-based routing. Full-stack React.', 'medium',
    ['next.js full tutorial', 'next.js 14 crash course', 'next.js for beginners', 'next.js app router tutorial'],
    [practice('Next.js Docs', 'https://nextjs.org/docs', 'docs')],
    ['web', 'react', 'fullstack']),
];

const WEB_BACKEND = [
  topic('Node.js & Express', 'JavaScript runtime for server-side. Express: lightweight web framework for REST APIs.', 'easy',
    ['node.js full course beginners', 'express.js tutorial', 'REST API with node express', 'node express crash course'],
    [practice('Node Docs', 'https://nodejs.org/en/docs', 'docs')],
    ['web', 'backend', 'nodejs']),
  topic('Python Backend (FastAPI/Flask)', 'FastAPI: modern, fast, async. Flask: lightweight, flexible. Both great for APIs.', 'easy',
    ['fastapi full tutorial', 'flask tutorial beginners', 'python REST API tutorial', 'fastapi vs flask'],
    [practice('FastAPI Docs', 'https://fastapi.tiangolo.com/', 'docs')],
    ['web', 'backend', 'python']),
  topic('SQL & PostgreSQL', 'Relational databases. SQL queries, joins, indexes, transactions. PostgreSQL is production standard.', 'medium',
    ['SQL full course beginners', 'postgresql tutorial', 'SQL for developers', 'database design tutorial'],
    [practice('SQLBolt', 'https://sqlbolt.com/', 'practice')],
    ['web', 'backend', 'database']),
  topic('MongoDB & NoSQL', 'Document-based database. Flexible schema, JSON-like documents. Good for unstructured data.', 'easy',
    ['mongodb full course', 'mongodb tutorial beginners', 'mongodb vs postgresql', 'NoSQL database explained'],
    [practice('MongoDB University', 'https://university.mongodb.com/', 'course')],
    ['web', 'backend', 'database']),
  topic('Authentication & Authorization', 'JWT, OAuth2, sessions, bcrypt. Secure user authentication patterns.', 'medium',
    ['authentication authorization tutorial', 'JWT explained', 'OAuth2 tutorial', 'node.js authentication tutorial'],
    [],
    ['web', 'backend', 'security']),
];

// ─── Cloud & DevOps Topics ──────────────────────────────────────────────────
const CLOUD_DEVOPS = [
  topic('Linux Fundamentals', 'Shell commands, file system, permissions, processes, package management. Server OS.', 'easy',
    ['linux tutorial beginners', 'linux command line full course', 'linux for devops', 'linux commands tutorial'],
    [practice('OverTheWire', 'https://overthewire.org/wargames/bandit/', 'practice')],
    ['devops', 'linux']),
  topic('Docker & Containers', 'Package apps with dependencies into containers. Dockerfile, images, docker-compose.', 'medium',
    ['docker tutorial beginners', 'docker full course', 'docker for developers', 'techworld with nana docker'],
    [practice('Docker Docs', 'https://docs.docker.com/get-started/', 'docs')],
    ['devops', 'containers']),
  topic('Kubernetes Basics', 'Container orchestration. Pods, Services, Deployments, ConfigMaps. Manages containerized apps.', 'hard',
    ['kubernetes tutorial beginners', 'kubernetes full course', 'techworld with nana kubernetes', 'k8s crash course'],
    [practice('K8s Docs', 'https://kubernetes.io/docs/tutorials/', 'docs')],
    ['devops', 'kubernetes']),
  topic('CI/CD Pipelines', 'Automate build, test, deploy. GitHub Actions, Jenkins, GitLab CI. Continuous delivery.', 'medium',
    ['CI/CD tutorial beginners', 'github actions tutorial', 'CI/CD pipeline explained', 'jenkins pipeline tutorial'],
    [],
    ['devops', 'ci-cd']),
  topic('AWS Core Services', 'EC2, S3, RDS, Lambda, API Gateway, IAM. Most popular cloud provider.', 'medium',
    ['AWS tutorial beginners', 'AWS full course', 'AWS core services explained', 'aws certified cloud practitioner'],
    [practice('AWS Free Tier', 'https://aws.amazon.com/free/', 'practice')],
    ['devops', 'cloud', 'aws']),
  topic('Infrastructure as Code (Terraform)', 'Define infrastructure in code. Reproducible, version-controlled deployments.', 'medium',
    ['terraform tutorial beginners', 'infrastructure as code explained', 'terraform full course', 'terraform aws tutorial'],
    [practice('Terraform Docs', 'https://developer.hashicorp.com/terraform/tutorials', 'docs')],
    ['devops', 'iac']),
  topic('Networking Fundamentals', 'TCP/IP, DNS, HTTP/HTTPS, load balancers, firewalls, VPC. How the internet works.', 'medium',
    ['networking fundamentals', 'computer networking full course', 'TCP IP explained', 'DNS explained simply'],
    [],
    ['devops', 'networking']),
  topic('Monitoring & Observability', 'Prometheus, Grafana, ELK stack. Logs, metrics, traces. Know your system health.', 'medium',
    ['monitoring observability devops', 'prometheus grafana tutorial', 'monitoring tools explained', 'observability explained'],
    [],
    ['devops', 'monitoring']),
];

// ─── Mobile Development Topics ──────────────────────────────────────────────
const MOBILE_DEV = [
  topic('React Native Fundamentals', 'Build mobile apps with React. Components, navigation, native modules, Expo.', 'medium',
    ['react native full course', 'react native tutorial beginners', 'react native crash course 2024', 'expo react native tutorial'],
    [practice('React Native Docs', 'https://reactnative.dev/docs/getting-started', 'docs')],
    ['mobile', 'react-native']),
  topic('Flutter & Dart', 'Google\'s cross-platform toolkit. Dart language, widgets, state management, Material Design.', 'medium',
    ['flutter full course beginners', 'flutter tutorial 2024', 'dart programming tutorial', 'flutter crash course'],
    [practice('Flutter Docs', 'https://flutter.dev/docs', 'docs')],
    ['mobile', 'flutter']),
  topic('Mobile UI/UX Design', 'Material Design, Human Interface Guidelines, responsive layouts, accessibility.', 'easy',
    ['mobile app design tutorial', 'material design guidelines', 'mobile UX best practices', 'app UI design principles'],
    [],
    ['mobile', 'design']),
  topic('State Management', 'Redux, MobX, Provider, Riverpod, Zustand. Manage app state predictably.', 'medium',
    ['state management mobile apps', 'redux tutorial', 'provider flutter tutorial', 'state management patterns'],
    [],
    ['mobile', 'architecture']),
  topic('Push Notifications & Background Tasks', 'FCM for push notifications. Background fetch, scheduled tasks, WorkManager.', 'medium',
    ['push notifications mobile tutorial', 'firebase cloud messaging tutorial', 'react native push notifications', 'flutter notifications'],
    [],
    ['mobile', 'notifications']),
  topic('App Store Deployment', 'Build, sign, and publish to Google Play Store and Apple App Store. CI/CD for mobile.', 'medium',
    ['publish app google play store', 'deploy app to app store', 'mobile app deployment tutorial', 'app store optimization'],
    [],
    ['mobile', 'deployment']),
];

// ─── Data Science Topics ────────────────────────────────────────────────────
const DATA_SCIENCE = [
  topic('Python for Data Science', 'NumPy, Pandas, Matplotlib, Seaborn. Data manipulation, analysis, and visualization.', 'easy',
    ['python data science full course', 'pandas tutorial beginners', 'numpy tutorial', 'data science python tutorial'],
    [practice('Kaggle', 'https://www.kaggle.com/learn/python', 'kaggle')],
    ['data-science', 'python']),
  topic('SQL for Data Analysis', 'Window functions, CTEs, subqueries, aggregations. Query data like a pro.', 'medium',
    ['SQL for data analysis', 'advanced SQL tutorial', 'SQL window functions', 'SQL for data science'],
    [practice('Mode Analytics', 'https://mode.com/sql-tutorial/', 'practice')],
    ['data-science', 'sql']),
  topic('Data Cleaning & Preprocessing', 'Handle missing values, outliers, encoding, normalization. 80% of real-world work.', 'easy',
    ['data cleaning python tutorial', 'data preprocessing machine learning', 'data cleaning pandas', 'handle missing data python'],
    [],
    ['data-science', 'preprocessing']),
  topic('Exploratory Data Analysis (EDA)', 'Understand data through visualization and statistics before modeling.', 'easy',
    ['exploratory data analysis python', 'EDA tutorial beginners', 'EDA with pandas matplotlib', 'data exploration techniques'],
    [],
    ['data-science', 'eda']),
  topic('Data Visualization (Advanced)', 'Plotly, D3.js, Tableau. Interactive dashboards, storytelling with data.', 'medium',
    ['data visualization python advanced', 'plotly tutorial', 'tableau tutorial beginners', 'data storytelling techniques'],
    [],
    ['data-science', 'visualization']),
  topic('Statistical Analysis', 'A/B testing, ANOVA, chi-square tests, correlation analysis. Make data-driven decisions.', 'medium',
    ['statistical analysis python', 'A/B testing tutorial', 'statistics for data science', 'hypothesis testing python'],
    [],
    ['data-science', 'statistics']),
];

// ─── OOP & Design Patterns ──────────────────────────────────────────────────
const OOP_PATTERNS = [
  topic('OOP Principles', 'Encapsulation, Inheritance, Polymorphism, Abstraction. Foundation of software design.', 'easy',
    ['OOP principles explained', 'object oriented programming tutorial', 'OOP python tutorial', 'OOP java tutorial'],
    [],
    ['oop', 'design']),
  topic('SOLID Principles', 'Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, Dependency Inversion.', 'medium',
    ['SOLID principles explained', 'SOLID design principles', 'SOLID principles python', 'SOLID principles java examples'],
    [],
    ['oop', 'design-patterns']),
  topic('Design Patterns (Creational)', 'Singleton, Factory, Builder, Prototype. Patterns for object creation.', 'medium',
    ['design patterns tutorial', 'factory pattern explained', 'singleton pattern', 'creational design patterns'],
    [],
    ['oop', 'design-patterns']),
  topic('Design Patterns (Structural)', 'Adapter, Decorator, Facade, Proxy. Patterns for organizing code structure.', 'medium',
    ['structural design patterns', 'decorator pattern explained', 'adapter pattern tutorial', 'facade pattern'],
    [],
    ['oop', 'design-patterns']),
  topic('Design Patterns (Behavioral)', 'Observer, Strategy, Command, State. Patterns for object communication.', 'medium',
    ['behavioral design patterns', 'observer pattern explained', 'strategy pattern tutorial', 'command pattern'],
    [],
    ['oop', 'design-patterns']),
];

// ─── Behavioral Interview ───────────────────────────────────────────────────
const BEHAVIORAL_INTERVIEW = [
  topic('STAR Method', 'Structure answers: Situation, Task, Action, Result. For all behavioral questions.', 'easy',
    ['STAR method interview', 'behavioral interview answers STAR', 'STAR method examples', 'tell me about yourself interview'],
    [],
    ['interview', 'behavioral']),
  topic('Common Behavioral Questions', 'Tell me about yourself, biggest challenge, conflict resolution, leadership examples.', 'easy',
    ['common behavioral interview questions', 'top behavioral questions answers', 'behavioral interview preparation', 'amazon leadership principles interview'],
    [],
    ['interview', 'behavioral']),
  topic('Resume & LinkedIn Optimization', 'Tailor resume to job description. Quantify achievements. ATS-friendly formatting.', 'easy',
    ['tech resume tips', 'resume for software engineer', 'LinkedIn profile optimization', 'resume tips for freshers'],
    [],
    ['interview', 'career']),
];


// ═══════════════════════════════════════════════════════════════════════════════
// ROLE DEFINITIONS — Compose phases from topic pools
// ═══════════════════════════════════════════════════════════════════════════════

export const ROLES = {
  // ─── AI / ML Engineer ────────────────────────────────────────────────────────
  ai_ml_engineer: {
    name: 'AI / ML Engineer',
    icon: '🤖',
    tagline: 'Build intelligent systems with machine learning & deep learning',
    gradient: 'linear-gradient(135deg, #8B5CF6, #EC4899)',
    accentColor: '#8B5CF6',
    estimatedWeeks: 20,
    languages: ['python'],
    highlights: ['NeetCode 150 DSA', 'ML Algorithms', 'Deep Learning & Transformers', 'LLMs & RAG', 'ML System Design'],
    phases: [
      {
        id: 'foundations',
        name: 'Phase 1: Foundations',
        description: 'Build your programming and math foundation',
        duration: '3-4 weeks',
        icon: '🧱',
        sections: [
          { id: 'math', name: 'Math for ML', icon: '📐', topics: ML_MATH },
          { id: 'dsa-basics', name: 'DSA Essentials', icon: '💻', topics: [...DSA_ARRAYS_HASHING, ...DSA_TWO_POINTERS] },
        ],
      },
      {
        id: 'core-dsa',
        name: 'Phase 2: Core DSA',
        description: 'Master data structures and algorithms for coding interviews',
        duration: '4-6 weeks',
        icon: '⚡',
        sections: [
          { id: 'dsa-mid', name: 'Core Patterns', icon: '🔄', topics: [...DSA_SLIDING_WINDOW, ...DSA_STACK, ...DSA_BINARY_SEARCH] },
          { id: 'dsa-adv', name: 'Advanced Structures', icon: '🌳', topics: [...DSA_LINKED_LIST, ...DSA_TREES, ...DSA_HEAP] },
          { id: 'dsa-algo', name: 'Algorithms', icon: '🧮', topics: [...DSA_GRAPHS, ...DSA_DP, ...DSA_BACKTRACKING, ...DSA_GREEDY, ...DSA_TRIES, ...DSA_BITS] },
        ],
      },
      {
        id: 'core-ml',
        name: 'Phase 3: Core ML',
        description: 'Learn classical machine learning algorithms and evaluation',
        duration: '4-5 weeks',
        icon: '🧠',
        sections: [
          { id: 'supervised', name: 'Supervised Learning', icon: '🎯', topics: ML_SUPERVISED },
          { id: 'unsupervised', name: 'Unsupervised Learning', icon: '🔍', topics: ML_UNSUPERVISED },
          { id: 'evaluation', name: 'Model Evaluation', icon: '📊', topics: ML_EVALUATION },
        ],
      },
      {
        id: 'deep-learning',
        name: 'Phase 4: Deep Learning',
        description: 'Neural networks, CNNs, and Transformers',
        duration: '4-5 weeks',
        icon: '🔬',
        sections: [
          { id: 'dl-fundamentals', name: 'Neural Network Fundamentals', icon: '🧬', topics: DL_FUNDAMENTALS },
          { id: 'dl-cnn', name: 'Computer Vision & CNNs', icon: '👁️', topics: DL_CNN },
          { id: 'dl-transformers', name: 'Transformers & LLMs', icon: '🤖', topics: DL_TRANSFORMERS },
        ],
      },
      {
        id: 'interview-prep',
        name: 'Phase 5: Interview Prep',
        description: 'System design, ML design, and behavioral interview preparation',
        duration: '3-4 weeks',
        icon: '🎤',
        sections: [
          { id: 'ml-sys-design', name: 'ML System Design', icon: '⚙️', topics: ML_SYSTEM_DESIGN },
          { id: 'sys-design', name: 'System Design', icon: '🏗️', topics: SYSTEM_DESIGN_FUNDAMENTALS },
          { id: 'behavioral', name: 'Behavioral Interview', icon: '💬', topics: BEHAVIORAL_INTERVIEW },
        ],
      },
    ],
  },

  // ─── Software Developer (SDE) ───────────────────────────────────────────────
  sde: {
    name: 'Software Developer (SDE)',
    icon: '💻',
    tagline: 'Master DSA, system design, and coding interviews for top tech companies',
    gradient: 'linear-gradient(135deg, #4F6EF7, #06B6D4)',
    accentColor: '#4F6EF7',
    estimatedWeeks: 18,
    languages: ['python', 'java', 'cpp'],
    highlights: ['Full NeetCode 150', 'System Design', 'OOP & Design Patterns', 'FAANG Interview Prep'],
    phases: [
      {
        id: 'foundations',
        name: 'Phase 1: Foundations',
        description: 'Core data structures and basic algorithms',
        duration: '3-4 weeks',
        icon: '🧱',
        sections: [
          { id: 'dsa-basics', name: 'Arrays, Strings & Hashing', icon: '📦', topics: DSA_ARRAYS_HASHING },
          { id: 'dsa-pointers', name: 'Two Pointers & Sliding Window', icon: '🔄', topics: [...DSA_TWO_POINTERS, ...DSA_SLIDING_WINDOW] },
          { id: 'dsa-stack', name: 'Stack & Binary Search', icon: '📚', topics: [...DSA_STACK, ...DSA_BINARY_SEARCH] },
        ],
      },
      {
        id: 'intermediate',
        name: 'Phase 2: Intermediate DSA',
        description: 'Data structures that come up frequently in interviews',
        duration: '4-5 weeks',
        icon: '⚡',
        sections: [
          { id: 'linked-list', name: 'Linked Lists', icon: '🔗', topics: DSA_LINKED_LIST },
          { id: 'trees', name: 'Trees & BST', icon: '🌳', topics: DSA_TREES },
          { id: 'heap', name: 'Heap & Priority Queue', icon: '⬆️', topics: DSA_HEAP },
          { id: 'tries', name: 'Tries', icon: '🔤', topics: DSA_TRIES },
        ],
      },
      {
        id: 'advanced-dsa',
        name: 'Phase 3: Advanced Algorithms',
        description: 'Graphs, DP, and advanced problem-solving techniques',
        duration: '4-5 weeks',
        icon: '🚀',
        sections: [
          { id: 'graphs', name: 'Graphs', icon: '🕸️', topics: DSA_GRAPHS },
          { id: 'dp', name: 'Dynamic Programming', icon: '📈', topics: DSA_DP },
          { id: 'backtracking', name: 'Backtracking & Greedy', icon: '🔙', topics: [...DSA_BACKTRACKING, ...DSA_GREEDY] },
          { id: 'bits', name: 'Bit Manipulation', icon: '🔢', topics: DSA_BITS },
        ],
      },
      {
        id: 'system-design',
        name: 'Phase 4: System Design & OOP',
        description: 'Design scalable systems and write clean, maintainable code',
        duration: '3-4 weeks',
        icon: '🏗️',
        sections: [
          { id: 'sys-design', name: 'System Design', icon: '⚙️', topics: SYSTEM_DESIGN_FUNDAMENTALS },
          { id: 'sys-interviews', name: 'Design Interviews', icon: '📝', topics: SYSTEM_DESIGN_INTERVIEWS },
          { id: 'oop', name: 'OOP & Design Patterns', icon: '🧩', topics: OOP_PATTERNS },
        ],
      },
      {
        id: 'interview-prep',
        name: 'Phase 5: Interview Prep',
        description: 'Polish your skills and prepare for behavioral rounds',
        duration: '2-3 weeks',
        icon: '🎤',
        sections: [
          { id: 'behavioral', name: 'Behavioral Interview', icon: '💬', topics: BEHAVIORAL_INTERVIEW },
        ],
      },
    ],
  },

  // ─── Full-Stack Web Developer ────────────────────────────────────────────────
  fullstack: {
    name: 'Full-Stack Web Developer',
    icon: '🌐',
    tagline: 'Build modern web applications from frontend to backend to deployment',
    gradient: 'linear-gradient(135deg, #06B6D4, #10B981)',
    accentColor: '#06B6D4',
    estimatedWeeks: 20,
    languages: ['javascript', 'python'],
    highlights: ['React / Next.js', 'Node.js / FastAPI', 'Databases', 'Cloud Deployment', 'DSA for Interviews'],
    phases: [
      {
        id: 'frontend',
        name: 'Phase 1: Frontend',
        description: 'HTML, CSS, JavaScript, and React for building modern UIs',
        duration: '4-5 weeks',
        icon: '🎨',
        sections: [
          { id: 'web-frontend', name: 'Frontend Fundamentals', icon: '🖥️', topics: WEB_FRONTEND },
        ],
      },
      {
        id: 'backend',
        name: 'Phase 2: Backend & Databases',
        description: 'Build APIs, manage databases, and handle authentication',
        duration: '4-5 weeks',
        icon: '⚙️',
        sections: [
          { id: 'web-backend', name: 'Backend Development', icon: '🔧', topics: WEB_BACKEND },
        ],
      },
      {
        id: 'dsa',
        name: 'Phase 3: DSA for Interviews',
        description: 'Core data structures and algorithms needed for coding interviews',
        duration: '5-6 weeks',
        icon: '💻',
        sections: [
          { id: 'dsa-basics', name: 'DSA Fundamentals', icon: '📦', topics: [...DSA_ARRAYS_HASHING, ...DSA_TWO_POINTERS, ...DSA_SLIDING_WINDOW] },
          { id: 'dsa-core', name: 'Core DSA', icon: '🌳', topics: [...DSA_STACK, ...DSA_BINARY_SEARCH, ...DSA_LINKED_LIST, ...DSA_TREES] },
          { id: 'dsa-advanced', name: 'Algorithms', icon: '🧮', topics: [...DSA_GRAPHS, ...DSA_DP] },
        ],
      },
      {
        id: 'devops',
        name: 'Phase 4: DevOps & Deployment',
        description: 'Docker, cloud deployment, and CI/CD pipelines',
        duration: '3-4 weeks',
        icon: '🚀',
        sections: [
          { id: 'cloud', name: 'Cloud & DevOps', icon: '☁️', topics: CLOUD_DEVOPS.slice(0, 5) },
        ],
      },
      {
        id: 'interview-prep',
        name: 'Phase 5: Interview Prep',
        description: 'System design and behavioral interview preparation',
        duration: '2-3 weeks',
        icon: '🎤',
        sections: [
          { id: 'sys-design', name: 'System Design', icon: '🏗️', topics: SYSTEM_DESIGN_FUNDAMENTALS.slice(0, 5) },
          { id: 'sys-interviews', name: 'Design Interviews', icon: '📝', topics: SYSTEM_DESIGN_INTERVIEWS.slice(0, 3) },
          { id: 'behavioral', name: 'Behavioral Interview', icon: '💬', topics: BEHAVIORAL_INTERVIEW },
        ],
      },
    ],
  },

  // ─── Mobile App Developer ────────────────────────────────────────────────────
  app_developer: {
    name: 'Mobile App Developer',
    icon: '📱',
    tagline: 'Build cross-platform and native mobile applications',
    gradient: 'linear-gradient(135deg, #F59E0B, #EF4444)',
    accentColor: '#F59E0B',
    estimatedWeeks: 18,
    languages: ['javascript', 'dart', 'kotlin'],
    highlights: ['React Native / Flutter', 'Mobile UI/UX', 'App Architecture', 'Publishing', 'DSA for Interviews'],
    phases: [
      {
        id: 'foundations',
        name: 'Phase 1: Foundations',
        description: 'Programming fundamentals and mobile ecosystem overview',
        duration: '3-4 weeks',
        icon: '🧱',
        sections: [
          { id: 'web-basics', name: 'JavaScript / Dart Basics', icon: '📝', topics: WEB_FRONTEND.slice(2, 4) },
        ],
      },
      {
        id: 'mobile',
        name: 'Phase 2: Mobile Development',
        description: 'Build mobile apps with cross-platform frameworks',
        duration: '5-6 weeks',
        icon: '📱',
        sections: [
          { id: 'mobile-dev', name: 'Mobile Frameworks', icon: '🔨', topics: MOBILE_DEV },
        ],
      },
      {
        id: 'dsa',
        name: 'Phase 3: DSA for Interviews',
        description: 'Essential data structures and algorithms',
        duration: '4-5 weeks',
        icon: '💻',
        sections: [
          { id: 'dsa-basics', name: 'DSA Basics', icon: '📦', topics: [...DSA_ARRAYS_HASHING, ...DSA_TWO_POINTERS] },
          { id: 'dsa-core', name: 'Core DSA', icon: '🌳', topics: [...DSA_STACK, ...DSA_BINARY_SEARCH, ...DSA_TREES] },
          { id: 'dsa-algo', name: 'Algorithms', icon: '🧮', topics: [...DSA_GRAPHS.slice(0, 3), ...DSA_DP.slice(0, 4)] },
        ],
      },
      {
        id: 'backend',
        name: 'Phase 4: Backend & APIs',
        description: 'Build APIs for your mobile apps',
        duration: '3-4 weeks',
        icon: '⚙️',
        sections: [
          { id: 'backend', name: 'Backend Basics', icon: '🔧', topics: WEB_BACKEND.slice(0, 3) },
        ],
      },
      {
        id: 'interview-prep',
        name: 'Phase 5: Interview Prep',
        description: 'System design and behavioral preparation',
        duration: '2-3 weeks',
        icon: '🎤',
        sections: [
          { id: 'sys-design', name: 'System Design', icon: '🏗️', topics: SYSTEM_DESIGN_FUNDAMENTALS.slice(0, 4) },
          { id: 'behavioral', name: 'Behavioral Interview', icon: '💬', topics: BEHAVIORAL_INTERVIEW },
        ],
      },
    ],
  },

  // ─── Data Scientist ──────────────────────────────────────────────────────────
  data_scientist: {
    name: 'Data Scientist / Analyst',
    icon: '📊',
    tagline: 'Analyze data, build models, and derive insights for business decisions',
    gradient: 'linear-gradient(135deg, #10B981, #3B82F6)',
    accentColor: '#10B981',
    estimatedWeeks: 18,
    languages: ['python', 'sql'],
    highlights: ['Python & SQL', 'Statistics & EDA', 'Machine Learning', 'Data Visualization', 'Case Studies'],
    phases: [
      {
        id: 'foundations',
        name: 'Phase 1: Foundations',
        description: 'Python, SQL, and statistics fundamentals',
        duration: '3-4 weeks',
        icon: '🧱',
        sections: [
          { id: 'data-science', name: 'Data Science Tools', icon: '🐍', topics: DATA_SCIENCE },
          { id: 'math', name: 'Statistics & Probability', icon: '📐', topics: ML_MATH.slice(5) },
        ],
      },
      {
        id: 'ml',
        name: 'Phase 2: Machine Learning',
        description: 'Learn classical ML algorithms and model evaluation',
        duration: '4-5 weeks',
        icon: '🧠',
        sections: [
          { id: 'supervised', name: 'Supervised Learning', icon: '🎯', topics: ML_SUPERVISED },
          { id: 'unsupervised', name: 'Unsupervised Learning', icon: '🔍', topics: ML_UNSUPERVISED },
          { id: 'evaluation', name: 'Evaluation & Tuning', icon: '📊', topics: ML_EVALUATION },
        ],
      },
      {
        id: 'dsa',
        name: 'Phase 3: DSA Essentials',
        description: 'Data structures and algorithms for coding interviews',
        duration: '4-5 weeks',
        icon: '💻',
        sections: [
          { id: 'dsa-basics', name: 'DSA Basics', icon: '📦', topics: [...DSA_ARRAYS_HASHING, ...DSA_TWO_POINTERS] },
          { id: 'dsa-core', name: 'Core Patterns', icon: '🔄', topics: [...DSA_SLIDING_WINDOW, ...DSA_BINARY_SEARCH, ...DSA_STACK] },
          { id: 'dsa-dp', name: 'DP & Graphs', icon: '🧮', topics: [...DSA_DP.slice(0, 4), ...DSA_GRAPHS.slice(0, 3)] },
        ],
      },
      {
        id: 'deep-learning',
        name: 'Phase 4: Deep Learning',
        description: 'Neural networks and modern AI techniques',
        duration: '3-4 weeks',
        icon: '🔬',
        sections: [
          { id: 'dl-fund', name: 'Neural Networks', icon: '🧬', topics: DL_FUNDAMENTALS.slice(0, 4) },
          { id: 'dl-nlp', name: 'NLP & Transformers', icon: '🤖', topics: DL_TRANSFORMERS.slice(0, 3) },
        ],
      },
      {
        id: 'interview-prep',
        name: 'Phase 5: Interview Prep',
        description: 'Case studies, SQL interviews, and behavioral prep',
        duration: '2-3 weeks',
        icon: '🎤',
        sections: [
          { id: 'behavioral', name: 'Behavioral Interview', icon: '💬', topics: BEHAVIORAL_INTERVIEW },
        ],
      },
    ],
  },

  // ─── Cloud / DevOps Engineer ─────────────────────────────────────────────────
  devops: {
    name: 'Cloud / DevOps Engineer',
    icon: '☁️',
    tagline: 'Build and manage scalable cloud infrastructure and CI/CD pipelines',
    gradient: 'linear-gradient(135deg, #EF4444, #F59E0B)',
    accentColor: '#EF4444',
    estimatedWeeks: 18,
    languages: ['python', 'bash'],
    highlights: ['Linux & Networking', 'AWS / GCP / Azure', 'Docker & Kubernetes', 'CI/CD & Terraform', 'System Design'],
    phases: [
      {
        id: 'foundations',
        name: 'Phase 1: Foundations',
        description: 'Linux, networking, and scripting fundamentals',
        duration: '3-4 weeks',
        icon: '🧱',
        sections: [
          { id: 'devops', name: 'DevOps Fundamentals', icon: '🐧', topics: CLOUD_DEVOPS },
        ],
      },
      {
        id: 'dsa',
        name: 'Phase 2: DSA for Interviews',
        description: 'Core data structures and algorithms',
        duration: '4-5 weeks',
        icon: '💻',
        sections: [
          { id: 'dsa-basics', name: 'DSA Basics', icon: '📦', topics: [...DSA_ARRAYS_HASHING, ...DSA_TWO_POINTERS] },
          { id: 'dsa-core', name: 'Core DSA', icon: '🔄', topics: [...DSA_SLIDING_WINDOW, ...DSA_STACK, ...DSA_BINARY_SEARCH] },
          { id: 'dsa-algo', name: 'Algorithms', icon: '🧮', topics: [...DSA_TREES.slice(0, 4), ...DSA_GRAPHS.slice(0, 3), ...DSA_DP.slice(0, 3)] },
        ],
      },
      {
        id: 'system-design',
        name: 'Phase 3: System Design',
        description: 'Design scalable, reliable distributed systems',
        duration: '4-5 weeks',
        icon: '🏗️',
        sections: [
          { id: 'sys-design', name: 'System Design Concepts', icon: '⚙️', topics: SYSTEM_DESIGN_FUNDAMENTALS },
          { id: 'sys-interviews', name: 'Design Interviews', icon: '📝', topics: SYSTEM_DESIGN_INTERVIEWS },
        ],
      },
      {
        id: 'backend',
        name: 'Phase 4: Backend & APIs',
        description: 'Build APIs and understand backend architecture',
        duration: '3-4 weeks',
        icon: '⚙️',
        sections: [
          { id: 'backend', name: 'Backend Development', icon: '🔧', topics: WEB_BACKEND.slice(0, 3) },
          { id: 'oop', name: 'OOP & Patterns', icon: '🧩', topics: OOP_PATTERNS.slice(0, 3) },
        ],
      },
      {
        id: 'interview-prep',
        name: 'Phase 5: Interview Prep',
        description: 'Behavioral and scenario-based interview preparation',
        duration: '2-3 weeks',
        icon: '🎤',
        sections: [
          { id: 'behavioral', name: 'Behavioral Interview', icon: '💬', topics: BEHAVIORAL_INTERVIEW },
        ],
      },
    ],
  },
};

// ═══════════════════════════════════════════════════════════════════════════════
// HELPER FUNCTIONS
// ═══════════════════════════════════════════════════════════════════════════════

/** Get flat list of all topics for a role */
export function getAllTopicsForRole(roleKey) {
  const role = ROLES[roleKey];
  if (!role) return [];
  const result = [];
  role.phases.forEach(phase => {
    phase.sections.forEach(section => {
      section.topics.forEach(t => {
        result.push({
          roleKey,
          phaseId: phase.id,
          sectionId: section.id,
          topicId: `${roleKey}:${section.id}|${t.name}`,
          ...t,
        });
      });
    });
  });
  return result;
}

/** Count total topics for a role */
export function getRoleTopicCount(roleKey) {
  return getAllTopicsForRole(roleKey).length;
}

/** Build a progress key compatible with the database */
export function getProgressKey(roleKey, sectionId, topicName) {
  return { pillar: `${roleKey}:${sectionId}`, topic: topicName, subtopic: '' };
}

/** Get role-specific ROADMAP_DATA format (backward compatible) */
export function getRoadmapDataForRole(roleKey) {
  const role = ROLES[roleKey];
  if (!role) return {};
  const data = {};
  role.phases.forEach(phase => {
    phase.sections.forEach(section => {
      const key = `${roleKey}:${section.id}`;
      data[key] = {
        name: section.name,
        icon: section.icon,
        color: role.accentColor,
        gradient: role.gradient,
        phaseId: phase.id,
        phaseName: phase.name,
        topics: [{
          name: section.name,
          subtopics: section.topics.map(t => t.name),
        }],
      };
    });
  });
  return data;
}

/** Get all role keys */
export function getRoleKeys() {
  return Object.keys(ROLES);
}

/** Get a specific topic by role, section, and name */
export function getTopicDetail(roleKey, sectionId, topicName) {
  const role = ROLES[roleKey];
  if (!role) return null;
  for (const phase of role.phases) {
    for (const section of phase.sections) {
      if (section.id === sectionId) {
        return section.topics.find(t => t.name === topicName) || null;
      }
    }
  }
  return null;
}
