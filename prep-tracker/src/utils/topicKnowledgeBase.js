// ═══════════════════════════════════════════════════════════════════════════════
// Comprehensive Topic Knowledge Base
// Detailed conceptual notes, mathematical/algorithmic formulas,
// canonical LeetCode problems, visual step-by-step traces, and multi-language solutions.
// ═══════════════════════════════════════════════════════════════════════════════

export const TOPIC_KNOWLEDGE_BASE = {
  // ───────────────────────────────────────────────────────────────────────────
  // MATH FOR ML
  // ───────────────────────────────────────────────────────────────────────────
  'Vectors & Matrices': {
    notes: {
      overview: 'Vectors and Matrices form the universal language of Machine Learning and AI. Every dataset, image, token embedding, and neural network weight is represented as a multidimensional vector or tensor.',
      keyConcepts: [
        {
          title: 'Vector Representation',
          desc: 'A vector is an ordered list of numbers representing magnitude and direction in N-dimensional space. In ML, a feature vector represents an entity (e.g., [age, income, credit_score]).',
          formula: 'v = [x₁, x₂, ..., xₙ]ᵀ ∈ ℝⁿ',
        },
        {
          title: 'Matrix as a Linear Transformation',
          desc: 'A matrix of dimensions M × N maps vectors from ℝⁿ to ℝᵐ. It scales, rotates, shears, or projects data points into new feature spaces.',
          formula: 'A ∈ ℝᵐˣⁿ,  y = A · x',
        },
        {
          title: 'Dot Product & Cosine Similarity',
          desc: 'Measures the directional alignment between two vectors. Foundation of attention mechanisms in Transformers and vector similarity search.',
          formula: 'u · v = ∑(uᵢ · vᵢ) = ||u|| ||v|| cos(θ)',
        },
        {
          title: 'Matrix Transposition & Symmetry',
          desc: 'Flipping a matrix over its diagonal. A matrix is symmetric if A = Aᵀ, which guarantees real eigenvalues.',
          formula: '(Aᵀ)ᵢⱼ = Aⱼᵢ,  (AB)ᵀ = Bᵀ Aᵀ',
        },
      ],
      pitfalls: [
        'Matrix multiplication is non-commutative: A · B ≠ B · A in general.',
        'Inner dimensions must match for multiplication: (M × K) · (K × N) = (M × N).',
        'Be careful with 0-indexed vs 1-indexed coordinates when traversing 2D matrices.',
      ],
    },
    leetcodeProblem: {
      title: 'Matrix Diagonal Sum (LeetCode #1572)',
      difficulty: 'Easy',
      leetcodeUrl: 'https://leetcode.com/problems/matrix-diagonal-sum/',
      description: 'Given a square matrix `mat`, return the sum of the matrix diagonals. Only include the sum of all the elements on the primary diagonal and all the elements on the secondary diagonal that are not part of the primary diagonal.',
      examples: [
        {
          input: 'mat = [[1,2,3],[4,5,6],[7,8,9]]',
          output: '25',
          explanation: 'Diagonals sum: 1 + 5 + 9 + 3 + 7 = 25. Note that element mat[1][1] = 5 is only counted once.',
        },
      ],
      visualTrace: {
        title: 'Step-by-Step Visual Execution Trace',
        steps: [
          {
            step: 1,
            state: 'Initialize: n = 3, sum = 0',
            diagram: `
[1]  2  [3]   <- Row 0: Primary (0,0)=1, Secondary (0,2)=3
 4  [5]  6    <- Row 1: Primary (1,1)=5, Secondary (1,1)=5 (overlap!)
[7]  8  [9]   <- Row 2: Primary (2,2)=9, Secondary (2,0)=7`,
            action: 'Loop through row i from 0 to n-1. Add mat[i][i] and mat[i][n - 1 - i].',
          },
          {
            step: 2,
            state: 'Iteration i=0: Add mat[0][0]=1 and mat[0][2]=3 -> sum = 4',
            diagram: `sum = 1 + 3 = 4`,
            action: 'Add primary and secondary diagonal elements of row 0.',
          },
          {
            step: 3,
            state: 'Iteration i=1: Add mat[1][1]=5 and mat[1][1]=5 -> sum = 14',
            diagram: `sum = 4 + 5 + 5 = 14`,
            action: 'Row 1 is middle row. Note: overlap will be subtracted if n is odd.',
          },
          {
            step: 4,
            state: 'Iteration i=2: Add mat[2][2]=9 and mat[2][0]=7 -> sum = 30',
            diagram: `sum = 14 + 9 + 7 = 30`,
            action: 'Finished iterating all rows.',
          },
          {
            step: 5,
            state: 'Post-process: Since n=3 (odd), subtract middle overlap mat[1][1]=5 -> Final sum = 25',
            diagram: `Result: 30 - 5 = 25 ✅`,
            action: 'Return 25.',
          },
        ],
      },
      solutions: {
        python: `class Solution:
    def diagonalSum(self, mat: list[list[int]]) -> int:
        n = len(mat)
        total_sum = 0
        for i in range(n):
            total_sum += mat[i][i]               # Primary diagonal
            total_sum += mat[i][n - 1 - i]       # Secondary diagonal
            
        # Subtract center element if n is odd to avoid double counting
        if n % 2 == 1:
            total_sum -= mat[n // 2][n // 2]
            
        return total_sum`,
        java: `class Solution {
    public int diagonalSum(int[][] mat) {
        int n = mat.length;
        int totalSum = 0;
        for (int i = 0; i < n; i++) {
            totalSum += mat[i][i];             // Primary diagonal
            totalSum += mat[i][n - 1 - i];     // Secondary diagonal
        }
        if (n % 2 == 1) {
            totalSum -= mat[n / 2][n / 2];     // Deduct duplicate center
        }
        return totalSum;
    }
}`,
        cpp: `class Solution {
public:
    int diagonalSum(vector<vector<int>>& mat) {
        int n = mat.size();
        int totalSum = 0;
        for (int i = 0; i < n; i++) {
            totalSum += mat[i][i];             // Primary diagonal
            totalSum += mat[i][n - 1 - i];     // Secondary diagonal
        }
        if (n % 2 == 1) {
            totalSum -= mat[n / 2][n / 2];     // Deduct duplicate center
        }
        return totalSum;
    }
};`,
        c: `int diagonalSum(int** mat, int matSize, int* matColSize) {
    int n = matSize;
    int totalSum = 0;
    for (int i = 0; i < n; i++) {
        totalSum += mat[i][i];             // Primary diagonal
        totalSum += mat[i][n - 1 - i];     // Secondary diagonal
    }
    if (n % 2 == 1) {
        totalSum -= mat[n / 2][n / 2];     // Deduct duplicate center
    }
    return totalSum;
}`,
        javascript: `/**
 * @param {number[][]} mat
 * @return {number}
 */
var diagonalSum = function(mat) {
    const n = mat.length;
    let totalSum = 0;
    for (let i = 0; i < n; i++) {
        totalSum += mat[i][i];             // Primary diagonal
        totalSum += mat[i][n - 1 - i];     // Secondary diagonal
    }
    if (n % 2 === 1) {
        totalSum -= mat[Math.floor(n / 2)][Math.floor(n / 2)]; // Deduct center
    }
    return totalSum;
};`,
      },
      complexity: {
        time: 'O(N) — We perform a single loop of N iterations across rows.',
        space: 'O(1) — Constant auxiliary memory used.',
      },
    },
  },

  // ───────────────────────────────────────────────────────────────────────────
  // ARRAYS & TWO POINTERS / HASHING
  // ───────────────────────────────────────────────────────────────────────────
  'Arrays & Hashing': {
    notes: {
      overview: 'Arrays provide O(1) random access by index. Hash Tables use hash functions to achieve O(1) average-time lookups, insertions, and deletions, trading space for lightning-fast search.',
      keyConcepts: [
        {
          title: 'Hash Map Lookup Strategy',
          desc: 'Instead of searching for a complement in O(N) time with nested loops (O(N²)), store visited values in a Hash Map to check complements in O(1) time.',
          formula: 'complement = target - current_val; if complement in map: return [map[complement], i]',
        },
        {
          title: 'Frequency Counter Pattern',
          desc: 'Counting occurrences of characters or numbers to detect anagrams, duplicates, or majority elements in O(N) time.',
          formula: 'freq[char] = freq.get(char, 0) + 1',
        },
        {
          title: 'Prefix Sum Array',
          desc: 'Precomputing cumulative sums enables O(1) range sum queries across any subarray [L, R].',
          formula: 'prefix[i] = prefix[i-1] + arr[i],  Sum(L, R) = prefix[R] - prefix[L-1]',
        },
      ],
      pitfalls: [
        'Hash collisions can degrade lookup to O(N) in worst case, though rare with good hash functions.',
        'Array resizing (dynamic array doubling) has amortized O(1) cost, but worst-case single insert is O(N).',
      ],
    },
    leetcodeProblem: {
      title: 'Two Sum (LeetCode #1)',
      difficulty: 'Easy',
      leetcodeUrl: 'https://leetcode.com/problems/two-sum/',
      description: 'Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`. You may assume each input has exactly one solution, and you may not use the same element twice.',
      examples: [
        {
          input: 'nums = [2, 7, 11, 15], target = 9',
          output: '[0, 1]',
          explanation: 'Because nums[0] + nums[1] == 2 + 7 == 9, we return [0, 1].',
        },
      ],
      visualTrace: {
        title: 'Step-by-Step Visual Execution Trace',
        steps: [
          {
            step: 1,
            state: 'Initialize empty Map: seen = {}',
            diagram: `nums = [ 2,  7, 11, 15 ], target = 9
           ^ (i=0, val=2)
seen = {}`,
            action: 'Calculate complement: 9 - 2 = 7. Is 7 in seen? No. Store seen[2] = 0.',
          },
          {
            step: 2,
            state: 'i=1, val=7. Complement: 9 - 7 = 2',
            diagram: `nums = [ 2,  7, 11, 15 ], target = 9
               ^ (i=1, val=7)
seen = { 2: 0 }`,
            action: 'Is 2 in seen? YES! Return [seen[2], 1] -> [0, 1]. Solved in 2 steps!',
          },
        ],
      },
      solutions: {
        python: `class Solution:
    def twoSum(self, nums: list[int], target: int) -> list[int]:
        seen = {}  # num -> index
        for i, num in enumerate(nums):
            complement = target - num
            if complement in seen:
                return [seen[complement], i]
            seen[num] = i
        return []`,
        java: `import java.util.HashMap;
import java.util.Map;

class Solution {
    public int[] twoSum(int[] nums, int target) {
        Map<Integer, Integer> seen = new HashMap<>();
        for (int i = 0; i < nums.length; i++) {
            int complement = target - nums[i];
            if (seen.containsKey(complement)) {
                return new int[] { seen.get(complement), i };
            }
            seen.put(nums[i], i);
        }
        return new int[0];
    }
}`,
        cpp: `class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        unordered_map<int, int> seen;
        for (int i = 0; i < nums.size(); i++) {
            int complement = target - nums[i];
            if (seen.count(complement)) {
                return { seen[complement], i };
            }
            seen[nums[i]] = i;
        }
        return {};
    }
};`,
        c: `/**
 * Note: The returned array must be malloced, assume caller calls free().
 */
int* twoSum(int* nums, int numsSize, int target, int* returnSize) {
    // For small/clean C implementation without hash map library:
    for (int i = 0; i < numsSize; i++) {
        for (int j = i + 1; j < numsSize; j++) {
            if (nums[i] + nums[j] == target) {
                int* result = (int*)malloc(2 * sizeof(int));
                result[0] = i;
                result[1] = j;
                *returnSize = 2;
                return result;
            }
        }
    }
    *returnSize = 0;
    return NULL;
}`,
        javascript: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    const seen = new Map();
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        if (seen.has(complement)) {
            return [seen.get(complement), i];
        }
        seen.set(nums[i], i);
    }
    return [];
};`,
      },
      complexity: {
        time: 'O(N) — One single pass through the array with O(1) hash lookups.',
        space: 'O(N) — Storing up to N elements in the hash map.',
      },
    },
  },

  // ───────────────────────────────────────────────────────────────────────────
  // TWO POINTERS
  // ───────────────────────────────────────────────────────────────────────────
  'Two Pointers': {
    notes: {
      overview: 'Two Pointers is an optimal technique where two indices traverse a data structure toward each other or in the same direction, reducing O(N²) quadratic searches to linear O(N) time.',
      keyConcepts: [
        {
          title: 'Opposite Ends (Sorted Arrays)',
          desc: 'Start one pointer at index 0 and another at N - 1. If sum < target, increment left (to increase sum). If sum > target, decrement right (to decrease sum).',
          formula: 'left = 0, right = n - 1; sum = arr[left] + arr[right]',
        },
        {
          title: 'Same Direction (Fast & Slow)',
          desc: 'One pointer moves quickly while the other tracks unique elements or cycle detection (Tortoise and Hare).',
          formula: 'slow = 0; for fast in range(n): if condition: arr[slow] = arr[fast]; slow += 1',
        },
      ],
      pitfalls: [
        'Opposite-direction pointers require the array to be SORTED.',
        'Avoid off-by-one errors: check whether while loop should be `left < right` or `left <= right`.',
      ],
    },
    leetcodeProblem: {
      title: 'Valid Palindrome (LeetCode #125)',
      difficulty: 'Easy',
      leetcodeUrl: 'https://leetcode.com/problems/valid-palindrome/',
      description: 'A phrase is a palindrome if, after converting all uppercase letters into lowercase and removing all non-alphanumeric characters, it reads the same forward and backward.',
      examples: [
        {
          input: 's = "A man, a plan, a canal: Panama"',
          output: 'true',
          explanation: '"amanaplanacanalpanama" is a palindrome.',
        },
      ],
      visualTrace: {
        title: 'Step-by-Step Two Pointers Trace',
        steps: [
          {
            step: 1,
            state: 'Left pointer at start "A", Right pointer at end "a"',
            diagram: `[A] m a n , a  p l a n , a  c a n a l : P a n a m [a]
 ^left                                              ^right`,
            action: 'Both are alphanumeric: lowercase("A") == lowercase("a") -> "a" == "a". Move left++, right--.',
          },
          {
            step: 2,
            state: 'Skip spaces and punctuation',
            diagram: `A [m] a n , a  p l a n , a  c a n a l : P a n a [m] a
    ^left                                         ^right`,
            action: '"m" == "m". Match! Continue until left >= right.',
          },
        ],
      },
      solutions: {
        python: `class Solution:
    def isPalindrome(self, s: str) -> bool:
        left, right = 0, len(s) - 1
        while left < right:
            while left < right and not s[left].isalnum():
                left += 1
            while left < right and not s[right].isalnum():
                right -= 1
            if s[left].lower() != s[right].lower():
                return False
            left += 1
            right -= 1
        return True`,
        java: `class Solution {
    public boolean isPalindrome(String s) {
        int left = 0, right = s.length() - 1;
        while (left < right) {
            while (left < right && !Character.isLetterOrDigit(s.charAt(left))) left++;
            while (left < right && !Character.isLetterOrDigit(s.charAt(right))) right--;
            if (Character.toLowerCase(s.charAt(left)) != Character.toLowerCase(s.charAt(right))) {
                return false;
            }
            left++;
            right--;
        }
        return true;
    }
}`,
        cpp: `class Solution {
public:
    bool isPalindrome(string s) {
        int left = 0, right = s.size() - 1;
        while (left < right) {
            while (left < right && !isalnum(s[left])) left++;
            while (left < right && !isalnum(s[right])) right--;
            if (tolower(s[left]) != tolower(s[right])) return false;
            left++;
            right--;
        }
        return true;
    }
};`,
        c: `bool isPalindrome(char* s) {
    int left = 0, right = strlen(s) - 1;
    while (left < right) {
        while (left < right && !isalnum(s[left])) left++;
        while (left < right && !isalnum(s[right])) right--;
        if (tolower(s[left]) != tolower(s[right])) return false;
        left++;
        right--;
    }
    return true;
}`,
        javascript: `var isPalindrome = function(s) {
    let left = 0, right = s.length - 1;
    const isAlnum = (c) => /[a-zA-Z0-9]/.test(c);
    while (left < right) {
        while (left < right && !isAlnum(s[left])) left++;
        while (left < right && !isAlnum(s[right])) right--;
        if (s[left].toLowerCase() !== s[right].toLowerCase()) return false;
        left++;
        right--;
    }
    return true;
};`,
      },
      complexity: {
        time: 'O(N) — Each character is visited at most twice.',
        space: 'O(1) — In-place pointer comparison without extra string allocation.',
      },
    },
  },

  // ───────────────────────────────────────────────────────────────────────────
  // SLIDING WINDOW
  // ───────────────────────────────────────────────────────────────────────────
  'Sliding Window': {
    notes: {
      overview: 'Sliding Window is used to find optimal contiguous subarrays or substrings satisfying a specific condition (e.g., maximum sum of size K, longest substring with distinct characters) in linear O(N) time.',
      keyConcepts: [
        {
          title: 'Fixed Size Window',
          desc: 'Window size K is fixed. Add incoming element at right and subtract outgoing element at left.',
          formula: 'window_sum += arr[right] - arr[right - K]',
        },
        {
          title: 'Dynamic / Variable Size Window',
          desc: 'Expand right pointer until condition is violated, then shrink left pointer until valid again.',
          formula: 'while invalid: shrink left; update max_len = max(max_len, right - left + 1)',
        },
      ],
      pitfalls: [
        'Do not shrink with an `if` condition when a `while` loop is required to restore validity.',
        'Length of window from index L to R is `(R - L + 1)`.',
      ],
    },
    leetcodeProblem: {
      title: 'Longest Substring Without Repeating Characters (LeetCode #3)',
      difficulty: 'Medium',
      leetcodeUrl: 'https://leetcode.com/problems/longest-substring-without-repeating-characters/',
      description: 'Given a string `s`, find the length of the longest substring without duplicate characters.',
      examples: [
        {
          input: 's = "abcabcbb"',
          output: '3',
          explanation: 'The answer is "abc", with the length of 3.',
        },
      ],
      visualTrace: {
        title: 'Dynamic Sliding Window Trace',
        steps: [
          {
            step: 1,
            state: 'Expand window right: [a] -> [a, b] -> [a, b, c]',
            diagram: `s = "a  b  c  a  b  c  b  b"
    [a  b  c] (length = 3, seen = {a:0, b:1, c:2})`,
            action: 'All unique. Max length = 3.',
          },
          {
            step: 2,
            state: 'Encounter duplicate "a" at index 3: Jump left pointer past previous "a"',
            diagram: `s = "a  b  c  a  b  c  b  b"
       [b  c  a] (left jumps from 0 to 1, length = 3)`,
            action: 'Window remains valid. Continue expanding.',
          },
        ],
      },
      solutions: {
        python: `class Solution:
    def lengthOfLongestSubstring(self, s: str) -> int:
        seen = {}  # char -> last seen index
        left = 0
        max_len = 0
        for right, char in enumerate(s):
            if char in seen and seen[char] >= left:
                left = seen[char] + 1
            seen[char] = right
            max_len = max(max_len, right - left + 1)
        return max_len`,
        java: `class Solution {
    public int lengthOfLongestSubstring(String s) {
        int[] lastSeen = new int[128];
        Arrays.fill(lastSeen, -1);
        int left = 0, maxLen = 0;
        for (int right = 0; right < s.length(); right++) {
            char c = s.charAt(right);
            if (lastSeen[c] >= left) {
                left = lastSeen[c] + 1;
            }
            lastSeen[c] = right;
            maxLen = Math.max(maxLen, right - left + 1);
        }
        return maxLen;
    }
}`,
        cpp: `class Solution {
public:
    int lengthOfLongestSubstring(string s) {
        vector<int> lastSeen(128, -1);
        int left = 0, maxLen = 0;
        for (int right = 0; right < s.size(); right++) {
            if (lastSeen[s[right]] >= left) {
                left = lastSeen[s[right]] + 1;
            }
            lastSeen[s[right]] = right;
            maxLen = max(maxLen, right - left + 1);
        }
        return maxLen;
    }
};`,
        c: `int lengthOfLongestSubstring(char* s) {
    int lastSeen[128];
    for (int i = 0; i < 128; i++) lastSeen[i] = -1;
    int left = 0, maxLen = 0, len = strlen(s);
    for (int right = 0; right < len; right++) {
        unsigned char c = (unsigned char)s[right];
        if (lastSeen[c] >= left) {
            left = lastSeen[c] + 1;
        }
        lastSeen[c] = right;
        int currentLen = right - left + 1;
        if (currentLen > maxLen) maxLen = currentLen;
    }
    return maxLen;
}`,
        javascript: `var lengthOfLongestSubstring = function(s) {
    const seen = new Map();
    let left = 0, maxLen = 0;
    for (let right = 0; right < s.length; right++) {
        const char = s[right];
        if (seen.has(char) && seen.get(char) >= left) {
            left = seen.get(char) + 1;
        }
        seen.set(char, right);
        maxLen = Math.max(maxLen, right - left + 1);
    }
    return maxLen;
};`,
      },
      complexity: {
        time: 'O(N) — Both left and right pointers traverse the string at most once.',
        space: 'O(min(N, M)) — Storing alphabet character map (M ≤ 128 ASCII symbols).',
      },
    },
  },

  // ───────────────────────────────────────────────────────────────────────────
  // BINARY SEARCH
  // ───────────────────────────────────────────────────────────────────────────
  'Binary Search': {
    notes: {
      overview: 'Binary Search achieves logarithmic O(log N) time by halving the search space in each step on sorted data or monotonic answer spaces.',
      keyConcepts: [
        {
          title: 'Midpoint Calculation without Overflow',
          desc: 'Using `mid = left + (right - left) // 2` prevents 32-bit integer overflow compared to `(left + right) / 2`.',
          formula: 'mid = left + (right - left) // 2',
        },
        {
          title: 'Search on Answer Space',
          desc: 'When finding the minimum or maximum feasible value (e.g., Koko Eating Bananas, Capacity to Ship Packages), binary search on the range of possible answers.',
          formula: 'low = min_possible, high = max_possible; while low <= high: check_feasibility(mid)',
        },
      ],
      pitfalls: [
        'Loop condition: `while (left <= right)` for exact search; `while (left < right)` for boundary search.',
        'Infinite loop risk: Ensure `left = mid + 1` or `right = mid - 1` to always shrink boundaries.',
      ],
    },
    leetcodeProblem: {
      title: 'Binary Search (LeetCode #704)',
      difficulty: 'Easy',
      leetcodeUrl: 'https://leetcode.com/problems/binary-search/',
      description: 'Given an array of integers `nums` which is sorted in ascending order, and an integer `target`, write a function to search `target` in `nums`. If `target` exists, then return its index. Otherwise, return `-1`.',
      examples: [
        {
          input: 'nums = [-1, 0, 3, 5, 9, 12], target = 9',
          output: '4',
          explanation: '9 exists in nums and its index is 4.',
        },
      ],
      visualTrace: {
        title: 'Step-by-Step Halving Space Trace',
        steps: [
          {
            step: 1,
            state: 'Initial: left = 0, right = 5. mid = 2 (val = 3)',
            diagram: `[-1,  0, [3],  5,  9, 12]  target = 9
  ^left       ^mid       ^right`,
            action: 'nums[mid]=3 < 9. Target must be in right half! Set left = mid + 1 = 3.',
          },
          {
            step: 2,
            state: 'Step 2: left = 3, right = 5. mid = 4 (val = 9)',
            diagram: `[-1,  0,  3,  5, [9], 12]  target = 9
                 ^left  ^mid ^right`,
            action: 'nums[mid]=9 == target! Found at index 4! Return 4.',
          },
        ],
      },
      solutions: {
        python: `class Solution:
    def search(self, nums: list[int], target: int) -> int:
        left, right = 0, len(nums) - 1
        while left <= right:
            mid = left + (right - left) // 2
            if nums[mid] == target:
                return mid
            elif nums[mid] < target:
                left = mid + 1
            else:
                right = mid - 1
        return -1`,
        java: `class Solution {
    public int search(int[] nums, int target) {
        int left = 0, right = nums.length - 1;
        while (left <= right) {
            int mid = left + (right - left) / 2;
            if (nums[mid] == target) return mid;
            else if (nums[mid] < target) left = mid + 1;
            else right = mid - 1;
        }
        return -1;
    }
}`,
        cpp: `class Solution {
public:
    int search(vector<int>& nums, int target) {
        int left = 0, right = nums.size() - 1;
        while (left <= right) {
            int mid = left + (right - left) / 2;
            if (nums[mid] == target) return mid;
            else if (nums[mid] < target) left = mid + 1;
            else right = mid - 1;
        }
        return -1;
    }
};`,
        c: `int search(int* nums, int numsSize, int target) {
    int left = 0, right = numsSize - 1;
    while (left <= right) {
        int mid = left + (right - left) / 2;
        if (nums[mid] == target) return mid;
        else if (nums[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    return -1;
}`,
        javascript: `var search = function(nums, target) {
    let left = 0, right = nums.length - 1;
    while (left <= right) {
        const mid = Math.floor(left + (right - left) / 2);
        if (nums[mid] === target) return mid;
        else if (nums[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    return -1;
};`,
      },
      complexity: {
        time: 'O(log N) — Halving search space by 2 on each comparison.',
        space: 'O(1) — Iterative solution uses constant auxiliary memory.',
      },
    },
  },
};

// Fallback generator for topics without explicit static entries
export function getTopicKnowledge(topicName, language = 'python') {
  if (TOPIC_KNOWLEDGE_BASE[topicName]) {
    return TOPIC_KNOWLEDGE_BASE[topicName];
  }

  // Check substring matches
  for (const [key, data] of Object.entries(TOPIC_KNOWLEDGE_BASE)) {
    if (topicName.toLowerCase().includes(key.toLowerCase()) || key.toLowerCase().includes(topicName.toLowerCase())) {
      return data;
    }
  }

  // Generic rich default
  return {
    notes: {
      overview: `In-depth theoretical guide and engineering principles for ${topicName}. Mastering this foundation prepares you for both technical coding challenges and high-level architectural interview discussions.`,
      keyConcepts: [
        {
          title: 'Core Concept & Working Mechanism',
          desc: `Understand the fundamental logic behind ${topicName}. Focus on edge cases, mathematical constraints, and data structure guarantees.`,
          formula: 'Time Complexity: O(N) or O(N log N) | Space: O(1) or O(N)',
        },
        {
          title: 'Standard Implementation Blueprint',
          desc: '1. Validate input constraints → 2. Choose optimal data structure → 3. Implement iterative/recursive logic → 4. Verify boundary conditions.',
          formula: 'Input -> Process -> Boundary Check -> Return Result',
        },
      ],
      pitfalls: [
        'Always check for empty inputs or null references before accessing properties.',
        'Watch for boundary off-by-one errors and integer overflows.',
        'Consider time-space tradeoffs (e.g. hash table O(N) space vs sorting O(1) space).',
      ],
    },
    leetcodeProblem: {
      title: `${topicName} Practice Problem`,
      difficulty: 'Medium',
      leetcodeUrl: `https://leetcode.com/problemset/?search=${encodeURIComponent(topicName)}`,
      description: `Practice canonical problems related to ${topicName} on LeetCode to solidify your understanding.`,
      examples: [
        {
          input: `Sample input for ${topicName}`,
          output: 'Optimal Output',
          explanation: 'Step-by-step trace through standard algorithmic patterns.',
        },
      ],
      visualTrace: {
        title: 'Step-by-Step Algorithm Execution Flow',
        steps: [
          {
            step: 1,
            state: 'Step 1: Input validation and base case check',
            diagram: `Input -> Verify constraints -> Setup initial pointers/state`,
            action: 'Ensure input is non-empty and initialized.',
          },
          {
            step: 2,
            state: 'Step 2: Core processing iteration',
            diagram: `Loop / Recurse -> Update state variables -> Maintain invariants`,
            action: 'Execute core logic step-by-step.',
          },
          {
            step: 3,
            state: 'Step 3: Result extraction and return',
            diagram: `State finalized -> Return optimal result`,
            action: 'Return the computed output.',
          },
        ],
      },
      solutions: {
        python: `# Python 3 Solution Template for ${topicName}
def solve(data):
    # Base case check
    if not data:
        return None
    # Main logic
    result = []
    return result`,
        java: `// Java Solution Template for ${topicName}
class Solution {
    public int[] solve(int[] nums) {
        if (nums == null || nums.length == 0) return new int[0];
        return nums;
    }
}`,
        cpp: `// C++ Solution Template for ${topicName}
class Solution {
public:
    vector<int> solve(vector<int>& nums) {
        if (nums.empty()) return {};
        return nums;
    }
};`,
        c: `// C Solution Template for ${topicName}
int* solve(int* nums, int size, int* returnSize) {
    if (size == 0) {
        *returnSize = 0;
        return NULL;
    }
    *returnSize = size;
    return nums;
}`,
        javascript: `// JavaScript Solution Template for ${topicName}
var solve = function(nums) {
    if (!nums || nums.length === 0) return [];
    return nums;
};`,
      },
      complexity: {
        time: 'O(N) to O(N log N) depending on sorting / hashing approach.',
        space: 'O(1) to O(N) based on auxiliary data structures used.',
      },
    },
  };
}
