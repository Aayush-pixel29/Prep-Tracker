// Multi-language code snippets, templates, and syntax cheatsheets for DSA & Coding Interviews

export const LANGUAGE_METADATA = {
  python: {
    name: 'Python',
    icon: '🐍',
    badge: 'Python 3',
    color: '#3776AB',
    ext: 'py',
    comment: '#',
    highlightClass: 'python',
  },
  java: {
    name: 'Java',
    icon: '☕',
    badge: 'Java 17+',
    color: '#ED8B00',
    ext: 'java',
    comment: '//',
    highlightClass: 'java',
  },
  cpp: {
    name: 'C++',
    icon: '⚡',
    badge: 'C++ 17/20 (STL)',
    color: '#00599C',
    ext: 'cpp',
    comment: '//',
    highlightClass: 'cpp',
  },
  c: {
    name: 'C',
    icon: '🔧',
    badge: 'C99/C11',
    color: '#606C76',
    ext: 'c',
    comment: '//',
    highlightClass: 'c',
  },
  javascript: {
    name: 'JavaScript',
    icon: '🟨',
    badge: 'JavaScript (ES6+)',
    color: '#F7DF1E',
    ext: 'js',
    comment: '//',
    highlightClass: 'javascript',
  },
};

// Common Pattern Code Templates for all 5 languages
export const PATTERN_TEMPLATES = {
  'Two Pointers': {
    python: `def two_pointers(arr, target):
    left, right = 0, len(arr) - 1
    while left < right:
        current_sum = arr[left] + arr[right]
        if current_sum == target:
            return [left, right]
        elif current_sum < target:
            left += 1
        else:
            right -= 1
    return []`,
    java: `public int[] twoPointers(int[] arr, int target) {
    int left = 0, right = arr.length - 1;
    while (left < right) {
        int currentSum = arr[left] + arr[right];
        if (currentSum == target) {
            return new int[]{left, right};
        } else if (currentSum < target) {
            left++;
        } else {
            right--;
        }
    }
    return new int[]{};
}`,
    cpp: `vector<int> twoPointers(const vector<int>& arr, int target) {
    int left = 0, right = arr.size() - 1;
    while (left < right) {
        int currentSum = arr[left] + arr[right];
        if (currentSum == target) {
            return {left, right};
        } else if (currentSum < target) {
            left++;
        } else {
            right--;
        }
    }
    return {};
}`,
    c: `int* twoPointers(int* arr, int size, int target, int* returnSize) {
    int left = 0, right = size - 1;
    while (left < right) {
        int currentSum = arr[left] + arr[right];
        if (currentSum == target) {
            int* result = (int*)malloc(2 * sizeof(int));
            result[0] = left; result[1] = right;
            *returnSize = 2;
            return result;
        } else if (currentSum < target) {
            left++;
        } else {
            right--;
        }
    }
    *returnSize = 0;
    return NULL;
}`,
    javascript: `function twoPointers(arr, target) {
    let left = 0, right = arr.length - 1;
    while (left < right) {
        const currentSum = arr[left] + arr[right];
        if (currentSum === target) {
            return [left, right];
        } else if (currentSum < target) {
            left++;
        } else {
            right--;
        }
    }
    return [];
}`,
  },

  'Sliding Window': {
    python: `def max_subarray_sum(nums, k):
    window_sum = sum(nums[:k])
    max_sum = window_sum
    for i in range(k, len(nums)):
        window_sum += nums[i] - nums[i - k]
        max_sum = max(max_sum, window_sum)
    return max_sum`,
    java: `public int maxSubarraySum(int[] nums, int k) {
    int windowSum = 0;
    for (int i = 0; i < k; i++) windowSum += nums[i];
    int maxSum = windowSum;
    for (int i = k; i < nums.length; i++) {
        windowSum += nums[i] - nums[i - k];
        maxSum = Math.max(maxSum, windowSum);
    }
    return maxSum;
}`,
    cpp: `int maxSubarraySum(const vector<int>& nums, int k) {
    int windowSum = 0;
    for (int i = 0; i < k; i++) windowSum += nums[i];
    int maxSum = windowSum;
    for (int i = k; i < nums.size(); i++) {
        windowSum += nums[i] - nums[i - k];
        maxSum = max(maxSum, windowSum);
    }
    return maxSum;
}`,
    c: `int maxSubarraySum(int* nums, int size, int k) {
    int windowSum = 0;
    for (int i = 0; i < k; i++) windowSum += nums[i];
    int maxSum = windowSum;
    for (int i = k; i < size; i++) {
        windowSum += nums[i] - nums[i - k];
        if (windowSum > maxSum) maxSum = windowSum;
    }
    return maxSum;
}`,
    javascript: `function maxSubarraySum(nums, k) {
    let windowSum = 0;
    for (let i = 0; i < k; i++) windowSum += nums[i];
    let maxSum = windowSum;
    for (let i = k; i < nums.length; i++) {
        windowSum += nums[i] - nums[i - k];
        maxSum = Math.max(maxSum, windowSum);
    }
    return maxSum;
}`,
  },

  'Binary Search': {
    python: `def binary_search(nums, target):
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
    java: `public int binarySearch(int[] nums, int target) {
    int left = 0, right = nums.length - 1;
    while (left <= right) {
        int mid = left + (right - left) / 2;
        if (nums[mid] == target) return mid;
        else if (nums[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    return -1;
}`,
    cpp: `int binarySearch(const vector<int>& nums, int target) {
    int left = 0, right = nums.size() - 1;
    while (left <= right) {
        int mid = left + (right - left) / 2;
        if (nums[mid] == target) return mid;
        else if (nums[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    return -1;
}`,
    c: `int binarySearch(int* nums, int size, int target) {
    int left = 0, right = size - 1;
    while (left <= right) {
        int mid = left + (right - left) / 2;
        if (nums[mid] == target) return mid;
        else if (nums[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    return -1;
}`,
    javascript: `function binarySearch(nums, target) {
    let left = 0, right = nums.length - 1;
    while (left <= right) {
        const mid = Math.floor(left + (right - left) / 2);
        if (nums[mid] === target) return mid;
        else if (nums[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    return -1;
}`,
  },

  'Fast & Slow Pointers': {
    python: `def has_cycle(head):
    slow = fast = head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
        if slow == fast:
            return True
    return False`,
    java: `public boolean hasCycle(ListNode head) {
    ListNode slow = head, fast = head;
    while (fast != null && fast.next != null) {
        slow = slow.next;
        fast = fast.next.next;
        if (slow == fast) return true;
    }
    return false;
}`,
    cpp: `bool hasCycle(ListNode *head) {
    ListNode *slow = head, *fast = head;
    while (fast && fast->next) {
        slow = slow->next;
        fast = fast->next->next;
        if (slow == fast) return true;
    }
    return false;
}`,
    c: `bool hasCycle(struct ListNode *head) {
    struct ListNode *slow = head, *fast = head;
    while (fast != NULL && fast->next != NULL) {
        slow = slow->next;
        fast = fast->next->next;
        if (slow == fast) return true;
    }
    return false;
}`,
    javascript: `function hasCycle(head) {
    let slow = head, fast = head;
    while (fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;
        if (slow === fast) return true;
    }
    return false;
}`,
  },

  'BFS / DFS': {
    python: `# BFS using deque
from collections import deque

def bfs(graph, start):
    visited = {start}
    queue = deque([start])
    while queue:
        node = queue.popleft()
        for neighbor in graph.get(node, []):
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append(neighbor)
    return visited`,
    java: `// BFS using Queue
import java.util.*;

public Set<Integer> bfs(Map<Integer, List<Integer>> graph, int start) {
    Set<Integer> visited = new HashSet<>();
    Queue<Integer> queue = new LinkedList<>();
    visited.add(start);
    queue.offer(start);
    while (!queue.isEmpty()) {
        int node = queue.poll();
        for (int neighbor : graph.getOrDefault(node, new ArrayList<>())) {
            if (!visited.contains(neighbor)) {
                visited.add(neighbor);
                queue.offer(neighbor);
            }
        }
    }
    return visited;
}`,
    cpp: `// BFS using std::queue
#include <vector>
#include <queue>
#include <unordered_set>
using namespace std;

unordered_set<int> bfs(const unordered_map<int, vector<int>>& graph, int start) {
    unordered_set<int> visited;
    queue<int> q;
    visited.insert(start);
    q.push(start);
    while (!q.empty()) {
        int node = q.front(); q.pop();
        if (graph.count(node)) {
            for (int neighbor : graph.at(node)) {
                if (!visited.count(neighbor)) {
                    visited.insert(neighbor);
                    q.push(neighbor);
                }
            }
        }
    }
    return visited;
}`,
    c: `// BFS in C using queue array
#include <stdbool.h>

void bfs(int adjMatrix[100][100], int n, int start) {
    bool visited[100] = {false};
    int queue[100];
    int front = 0, rear = 0;
    visited[start] = true;
    queue[rear++] = start;
    while (front < rear) {
        int node = queue[front++];
        for (int i = 0; i < n; i++) {
            if (adjMatrix[node][i] && !visited[i]) {
                visited[i] = true;
                queue[rear++] = i;
            }
        }
    }
}`,
    javascript: `// BFS using Array as Queue
function bfs(graph, start) {
    const visited = new Set([start]);
    const queue = [start];
    while (queue.length > 0) {
        const node = queue.shift();
        for (const neighbor of (graph[node] || [])) {
            if (!visited.has(neighbor)) {
                visited.add(neighbor);
                queue.push(neighbor);
            }
        }
    }
    return visited;
}`,
  },

  'Dynamic Programming': {
    python: `# 1D Tabulation Example (Fibonacci / Climbing Stairs)
def climb_stairs(n: int) -> int:
    if n <= 2:
        return n
    dp = [0] * (n + 1)
    dp[1], dp[2] = 1, 2
    for i in range(3, n + 1):
        dp[i] = dp[i - 1] + dp[i - 2]
    return dp[n]`,
    java: `// 1D Tabulation
public int climbStairs(int n) {
    if (n <= 2) return n;
    int[] dp = new int[n + 1];
    dp[1] = 1;
    dp[2] = 2;
    for (int i = 3; i <= n; i++) {
        dp[i] = dp[i - 1] + dp[i - 2];
    }
    return dp[n];
}`,
    cpp: `// 1D Tabulation
int climbStairs(int n) {
    if (n <= 2) return n;
    vector<int> dp(n + 1, 0);
    dp[1] = 1;
    dp[2] = 2;
    for (int i = 3; i <= n; i++) {
        dp[i] = dp[i - 1] + dp[i - 2];
    }
    return dp[n];
}`,
    c: `// 1D Tabulation in C
int climbStairs(int n) {
    if (n <= 2) return n;
    int prev2 = 1, prev1 = 2, current = 0;
    for (int i = 3; i <= n; i++) {
        current = prev1 + prev2;
        prev2 = prev1;
        prev1 = current;
    }
    return current;
}`,
    javascript: `// 1D Tabulation
function climbStairs(n) {
    if (n <= 2) return n;
    const dp = new Array(n + 1).fill(0);
    dp[1] = 1;
    dp[2] = 2;
    for (let i = 3; i <= n; i++) {
        dp[i] = dp[i - 1] + dp[i - 2];
    }
    return dp[n];
}`,
  },
};

// Language-specific syntax cheat sheet for quick reference
export const LANGUAGE_CHEATSHEETS = {
  python: {
    dataStructures: [
      { name: 'Dynamic Array (List)', syntax: 'arr = [1, 2, 3]', ops: 'arr.append(x), arr.pop(), arr[0], len(arr)' },
      { name: 'Hash Map (Dict)', syntax: 'd = {"key": val}', ops: 'd[key] = val, d.get(key, default), key in d' },
      { name: 'Hash Set', syntax: 's = set([1, 2])', ops: 's.add(x), s.remove(x), x in s' },
      { name: 'Queue / Deque', syntax: 'from collections import deque; q = deque()', ops: 'q.append(x), q.popleft(), len(q)' },
      { name: 'Min-Heap', syntax: 'import heapq; h = []', ops: 'heapq.heappush(h, x), heapq.heappop(h), h[0]' },
      { name: 'Max-Heap', syntax: 'import heapq; h = []', ops: 'heapq.heappush(h, -x), -heapq.heappop(h)' },
      { name: 'Sorting', syntax: 'arr.sort(), sorted(arr, key=lambda x: ...)', ops: 'O(N log N) Timsort' },
    ],
    tips: [
      'Use list comprehension for clean transformations: [x * 2 for x in nums if x > 0]',
      'Use collections.defaultdict(int) or collections.Counter(nums) for frequency maps',
      'Use bisect.bisect_left(arr, x) for built-in binary search',
      'Swap two elements easily: a, b = b, a',
    ],
  },
  java: {
    dataStructures: [
      { name: 'Dynamic Array (ArrayList)', syntax: 'List<Integer> list = new ArrayList<>();', ops: 'list.add(x), list.get(i), list.remove(i), list.size()' },
      { name: 'Hash Map', syntax: 'Map<String, Integer> map = new HashMap<>();', ops: 'map.put(k, v), map.getOrDefault(k, 0), map.containsKey(k)' },
      { name: 'Hash Set', syntax: 'Set<Integer> set = new HashSet<>();', ops: 'set.add(x), set.contains(x), set.remove(x)' },
      { name: 'Queue / Deque', syntax: 'Deque<Integer> q = new ArrayDeque<>();', ops: 'q.offer(x), q.poll(), q.peek(), q.isEmpty()' },
      { name: 'Min-Heap (PriorityQueue)', syntax: 'PriorityQueue<Integer> pq = new PriorityQueue<>();', ops: 'pq.offer(x), pq.poll(), pq.peek()' },
      { name: 'Max-Heap', syntax: 'PriorityQueue<Integer> pq = new PriorityQueue<>(Collections.reverseOrder());', ops: 'pq.offer(x), pq.poll()' },
      { name: 'Sorting', syntax: 'Arrays.sort(arr); Collections.sort(list);', ops: 'Custom: (a, b) -> Integer.compare(a, b)' },
    ],
    tips: [
      'Always use StringBuilder for string concatenation in loops to avoid O(N²) memory overhead',
      'Use Math.max() and Math.min() without importing',
      'Avoid Integer == Integer comparisons for values outside [-128, 127]; use .equals()',
      'Initialize 2D array: int[][] dp = new int[m][n];',
    ],
  },
  cpp: {
    dataStructures: [
      { name: 'Dynamic Array (vector)', syntax: 'vector<int> vec = {1, 2, 3};', ops: 'vec.push_back(x), vec.pop_back(), vec[i], vec.size()' },
      { name: 'Hash Map (unordered_map)', syntax: 'unordered_map<string, int> map;', ops: 'map[k] = v, map.count(k), map.find(k) != map.end()' },
      { name: 'Hash Set (unordered_set)', syntax: 'unordered_set<int> set;', ops: 'set.insert(x), set.count(x), set.erase(x)' },
      { name: 'Queue', syntax: 'queue<int> q;', ops: 'q.push(x), q.pop(), q.front(), q.empty()' },
      { name: 'Min-Heap', syntax: 'priority_queue<int, vector<int>, greater<int>> minHeap;', ops: 'minHeap.push(x), minHeap.pop(), minHeap.top()' },
      { name: 'Max-Heap (default)', syntax: 'priority_queue<int> maxHeap;', ops: 'maxHeap.push(x), maxHeap.pop(), maxHeap.top()' },
      { name: 'Sorting', syntax: 'sort(vec.begin(), vec.end());', ops: 'Custom: sort(vec.begin(), vec.end(), [](auto& a, auto& b){ return a < b; });' },
    ],
    tips: [
      'Use std::ios_base::sync_with_stdio(false); std::cin.tie(NULL); for fast competitive I/O',
      'Pass large vectors by reference: const vector<int>& nums to avoid copying',
      'Use auto& for iterating without copies: for (const auto& item : vec)',
      'Use lower_bound() and upper_bound() for binary search in sorted ranges',
    ],
  },
  c: {
    dataStructures: [
      { name: 'Dynamic Array (malloc)', syntax: 'int* arr = (int*)malloc(n * sizeof(int));', ops: 'arr[i] = x; free(arr);' },
      { name: 'Fixed Array', syntax: 'int arr[100];', ops: 'sizeof(arr)/sizeof(arr[0])' },
      { name: 'Linked List Node', syntax: 'struct Node { int val; struct Node* next; };', ops: 'struct Node* node = malloc(sizeof(struct Node));' },
      { name: 'String in C', syntax: 'char str[100] = "hello";', ops: 'strlen(str), strcmp(s1, s2), strcpy(dest, src)' },
      { name: 'Sorting (qsort)', syntax: 'qsort(arr, n, sizeof(int), cmpFunc);', ops: 'int cmp(const void* a, const void* b) { return (*(int*)a - *(int*)b); }' },
      { name: '2D Dynamic Matrix', syntax: 'int** m = (int**)malloc(r * sizeof(int*)); for(...) m[i] = malloc(c * sizeof(int));', ops: 'Always free all rows then m' },
    ],
    tips: [
      'Always remember to free() any memory allocated with malloc() or calloc() to prevent memory leaks',
      'Check pointer != NULL before dereferencing to prevent Segmentation Faults',
      'Strings must be null-terminated with \'\\0\'',
      'Use pointer arithmetic or indices carefully to avoid buffer overflows',
    ],
  },
  javascript: {
    dataStructures: [
      { name: 'Array (Dynamic)', syntax: 'const arr = [1, 2, 3];', ops: 'arr.push(x), arr.pop(), arr.shift(), arr.unshift(x), arr.length' },
      { name: 'Map (Hash Map)', syntax: 'const map = new Map();', ops: 'map.set(k, v), map.get(k), map.has(k), map.delete(k)' },
      { name: 'Set (Hash Set)', syntax: 'const set = new Set([1, 2]);', ops: 'set.add(x), set.has(x), set.delete(x)' },
      { name: 'Object as Hash Map', syntax: 'const obj = {};', ops: 'obj[k] = v, k in obj, Object.keys(obj)' },
      { name: 'Queue Simulation', syntax: 'const queue = [];', ops: 'queue.push(x), queue.shift() // O(N) shift, or use index pointer' },
      { name: 'Sorting Numbers', syntax: 'nums.sort((a, b) => a - b);', ops: 'Note: .sort() without comparator sorts alphabetically!' },
      { name: 'Functional Methods', syntax: 'arr.map(fn), arr.filter(fn), arr.reduce(fn, init)', ops: 'Modern immutable functional utilities' },
    ],
    tips: [
      'Always provide a comparator function to arr.sort((a, b) => a - b) because default sort is lexicographical ([10, 2].sort() is [10, 2])',
      'Use Math.floor((left + right) / 2) for binary search midpoints',
      'Use Set to easily remove duplicates: [...new Set(array)]',
      'Use modern optional chaining ?. and nullish coalescing ?? for safe property access',
    ],
  },
};
