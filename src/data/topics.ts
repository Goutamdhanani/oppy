import { TopicType } from '../types/topic';

export const topicsData: TopicType[] = [
  {
    id: 'basics-foundations',
    title: 'Basics & Foundations',
    description: 'Core fundamentals of algorithm analysis and basic computational techniques.',
    icon: '🧮',
    color: '#4f46e5',
    prerequisites: [],
    estimatedHours: 15,
    subtopics: [
      {
        id: 'time-space-complexity',
        title: 'Time & Space Complexity',
        description: 'Learn how to analyze and measure algorithm efficiency.',
        contentPath: 'basics/complexity.md',
        children: [
          {
            id: 'big-o-notation',
            title: 'Big-O, Big-Theta, Big-Omega',
            description: 'Asymptotic notation for algorithm analysis',
            contentPath: 'basics/complexity/big-o.md',
            visualizerId: 'big-o-visualization'
          },
          {
            id: 'complexity-cases',
            title: 'Best/Worst/Average Cases',
            description: 'Understanding different scenarios for algorithm performance',
            contentPath: 'basics/complexity/cases.md'
          },
          {
            id: 'amortized-analysis',
            title: 'Amortized Analysis',
            description: 'Analyzing operations averaged over time',
            contentPath: 'basics/complexity/amortized.md'
          }
        ]
      },
      {
        id: 'recursion',
        title: 'Recursion',
        description: 'Master functions that call themselves to solve problems.',
        contentPath: 'basics/recursion.md',
        visualizerId: 'recursion-visualization',
        children: [
          {
            id: 'tail-recursion',
            title: 'Tail Recursion',
            description: 'Optimization techniques for recursive functions',
            contentPath: 'basics/recursion/tail.md'
          },
          {
            id: 'stack-memory',
            title: 'Stack Memory Concept',
            description: 'Understanding how recursion uses stack memory',
            contentPath: 'basics/recursion/stack-memory.md',
            visualizerId: 'recursion-stack-visualization'
          },
          {
            id: 'recursion-tree',
            title: 'Recursion Tree & Subproblem Analysis',
            description: 'Visualizing recursive calls and breaking down problems',
            contentPath: 'basics/recursion/recursion-tree.md',
            visualizerId: 'recursion-tree-visualization'
          }
        ]
      },
      {
        id: 'bit-manipulation',
        title: 'Bit Manipulation',
        description: 'Work with data at the bit level for optimized operations.',
        contentPath: 'basics/bit-manipulation.md',
        children: [
          {
            id: 'bit-operations',
            title: 'AND, OR, XOR, NOT',
            description: 'Basic bitwise operations',
            contentPath: 'basics/bit-manipulation/operations.md',
            visualizerId: 'bitwise-operations'
          },
          {
            id: 'bit-shifts',
            title: 'Left/Right Shifts',
            description: 'Shift bit patterns in different directions',
            contentPath: 'basics/bit-manipulation/shifts.md',
            visualizerId: 'bit-shift-visualization'
          },
          {
            id: 'power-of-two',
            title: 'Power of Two Checks',
            description: 'Efficient ways to check if a number is a power of two',
            contentPath: 'basics/bit-manipulation/power-of-two.md'
          },
          {
            id: 'bitmasking',
            title: 'Bitmasking',
            description: 'Using masks for bit operations',
            contentPath: 'basics/bit-manipulation/bitmasking.md',
            visualizerId: 'bitmask-visualization'
          },
          {
            id: 'set-bits',
            title: 'Set/Clear/Toggle Bits',
            description: 'Manipulating individual bits',
            contentPath: 'basics/bit-manipulation/set-bits.md'
          },
          {
            id: 'count-bits',
            title: 'Count Set Bits',
            description: 'Efficiently counting the number of set bits',
            contentPath: 'basics/bit-manipulation/count-bits.md'
          },
          {
            id: 'xor-swap',
            title: 'XOR Swap Trick',
            description: 'Swapping variables without a temporary variable',
            contentPath: 'basics/bit-manipulation/xor-swap.md'
          }
        ]
      }
    ],
    problems: [
      {
        id: 'analyze-time-complexity',
        title: 'Algorithm Analysis',
        difficulty: 'medium',
        description: 'Determine the time and space complexity of various algorithm snippets.',
        externalUrl: 'https://leetcode.com/problems/time-complexity-analysis/'
      },
      {
        id: 'fibonacci-recursive',
        title: 'Fibonacci Sequence',
        difficulty: 'easy',
        description: 'Implement and optimize recursive and iterative Fibonacci solutions.',
        externalUrl: 'https://leetcode.com/problems/fibonacci-number/'
      },
      {
        id: 'count-bits',
        title: 'Counting Bits',
        difficulty: 'medium',
        description: 'Count the number of 1 bits in each number from 0 to n.',
        externalUrl: 'https://leetcode.com/problems/counting-bits/'
      },
      {
        id: 'single-number',
        title: 'Single Number',
        difficulty: 'easy',
        description: 'Find the single element in an array where every other element appears twice.',
        externalUrl: 'https://leetcode.com/problems/single-number/'
      }
    ]
  },
  
  {
    id: 'arrays',
    title: 'Arrays',
    description: 'The foundation of data structures. Master array operations and common patterns.',
    icon: '📊',
    color: '#06b6d4',
    prerequisites: ['basics-foundations'],
    estimatedHours: 20,
    subtopics: [
      {
        id: 'array-basics',
        title: 'Array Basics',
        description: 'Fundamentals of array operations and memory layout.',
        contentPath: 'arrays/basics.md',
        visualizerId: 'array-operations',
        children: [
          {
            id: 'array-traversal',
            title: 'Traversal, Insert, Delete',
            description: 'Basic operations on arrays',
            contentPath: 'arrays/basics/traversal.md',
            visualizerId: 'array-traversal'
          },
          {
            id: 'prefix-sum',
            title: 'Prefix Sum',
            description: 'Precomputing cumulative sums for efficient range queries',
            contentPath: 'arrays/basics/prefix-sum.md',
            visualizerId: 'prefix-sum-visualization'
          }
        ]
      },
      {
        id: 'sliding-window',
        title: 'Sliding Window',
        description: 'Efficiently process subarrays of fixed or variable size.',
        contentPath: 'arrays/sliding-window.md',
        children: [
          {
            id: 'fixed-window',
            title: 'Fixed & Variable Window',
            description: 'Understanding the two types of sliding window patterns',
            contentPath: 'arrays/sliding-window/fixed-variable.md',
            visualizerId: 'sliding-window-visualization'
          },
          {
            id: 'max-subarray',
            title: 'Max Sum Subarray',
            description: 'Finding the contiguous subarray with maximum sum',
            contentPath: 'arrays/sliding-window/max-subarray.md',
            visualizerId: 'max-subarray-visualization'
          }
        ]
      },
      {
        id: 'two-pointers',
        title: 'Two Pointers',
        description: 'Solve array problems efficiently using dual pointers.',
        contentPath: 'arrays/two-pointers.md',
        visualizerId: 'two-pointers-visualization',
        children: [
          {
            id: 'pair-sum',
            title: 'Pair Sum, 3Sum, 4Sum',
            description: 'Finding combinations of elements that satisfy conditions',
            contentPath: 'arrays/two-pointers/sum-problems.md',
            visualizerId: 'two-sum-visualization'
          }
        ]
      },
      {
        id: 'sorting',
        title: 'Sorting',
        description: 'Learn various algorithms to sort array elements.',
        contentPath: 'arrays/sorting.md',
        children: [
          {
            id: 'elementary-sorts',
            title: 'Bubble / Selection / Insertion',
            description: 'Simple sorting algorithms with O(n²) complexity',
            contentPath: 'arrays/sorting/elementary.md',
            visualizerId: 'elementary-sorts-visualization'
          },
          {
            id: 'merge-sort',
            title: 'Merge Sort',
            description: 'Divide and conquer sorting with O(n log n) complexity',
            contentPath: 'arrays/sorting/merge-sort.md',
            visualizerId: 'merge-sort-visualization'
          },
          {
            id: 'quick-sort',
            title: 'Quick Sort (Lomuto/Hoare)',
            description: 'Efficient sorting with different partitioning schemes',
            contentPath: 'arrays/sorting/quick-sort.md',
            visualizerId: 'quick-sort-visualization'
          },
          {
            id: 'linear-sorts',
            title: 'Counting Sort, Radix Sort',
            description: 'Linear time sorting algorithms for specific inputs',
            contentPath: 'arrays/sorting/linear-sorts.md',
            visualizerId: 'linear-sorts-visualization'
          }
        ]
      },
      {
        id: 'search',
        title: 'Search',
        description: 'Efficient ways to find elements in arrays.',
        contentPath: 'arrays/search.md',
        children: [
          {
            id: 'binary-search',
            title: 'Binary Search (Normal + Answers)',
            description: 'Searching in sorted arrays with O(log n) complexity',
            contentPath: 'arrays/search/binary-search.md',
            visualizerId: 'binary-search-visualization'
          },
          {
            id: 'rotated-array',
            title: 'Rotated Sorted Array',
            description: 'Searching in arrays that are sorted but rotated',
            contentPath: 'arrays/search/rotated-array.md',
            visualizerId: 'rotated-search-visualization'
          },
          {
            id: 'peak-element',
            title: 'Peak Element',
            description: 'Finding local maxima in arrays',
            contentPath: 'arrays/search/peak-element.md'
          }
        ]
      },
      {
        id: 'greedy-arrays',
        title: 'Greedy on Array',
        description: 'Solve optimization problems with greedy approach.',
        contentPath: 'arrays/greedy.md',
        children: [
          {
            id: 'jump-game',
            title: 'Jump Game',
            description: 'Determining if you can reach the end of an array',
            contentPath: 'arrays/greedy/jump-game.md',
            visualizerId: 'jump-game-visualization'
          },
          {
            id: 'minimum-platforms',
            title: 'Minimum Platforms',
            description: 'Finding minimum number of platforms needed for a railway station',
            contentPath: 'arrays/greedy/platforms.md'
          },
          {
            id: 'gas-station',
            title: 'Gas Station',
            description: 'Finding the starting station to complete a circular route',
            contentPath: 'arrays/greedy/gas-station.md',
            visualizerId: 'gas-station-visualization'
          }
        ]
      },
      {
        id: 'matrix',
        title: 'Matrix',
        description: 'Operations on 2D arrays.',
        contentPath: 'arrays/matrix.md',
        children: [
          {
            id: 'spiral-order',
            title: 'Spiral Order',
            description: 'Traversing a matrix in spiral form',
            contentPath: 'arrays/matrix/spiral.md',
            visualizerId: 'spiral-matrix-visualization'
          },
          {
            id: 'rotate-image',
            title: 'Rotate Image',
            description: 'Rotating a matrix by 90 degrees',
            contentPath: 'arrays/matrix/rotate.md',
            visualizerId: 'rotate-matrix-visualization'
          },
          {
            id: 'transpose',
            title: 'Transpose',
            description: 'Converting rows to columns and vice versa',
            contentPath: 'arrays/matrix/transpose.md'
          },
          {
            id: 'search-matrix',
            title: 'Search in Sorted Matrix',
            description: 'Efficient searching in a sorted 2D array',
            contentPath: 'arrays/matrix/search.md',
            visualizerId: 'matrix-search-visualization'
          },
          {
            id: 'prefix-sum-2d',
            title: 'Prefix Sum 2D',
            description: 'Precomputing sums for efficient submatrix queries',
            contentPath: 'arrays/matrix/prefix-sum-2d.md'
          }
        ]
      }
    ],
    problems: [
      {
        id: 'max-subarray',
        title: 'Maximum Subarray',
        difficulty: 'medium',
        description: 'Find the contiguous subarray with the largest sum.',
        externalUrl: 'https://leetcode.com/problems/maximum-subarray/'
      },
      {
        id: 'container-with-most-water',
        title: 'Container With Most Water',
        difficulty: 'medium',
        description: 'Find two lines that together with the x-axis form a container that holds the most water.',
        externalUrl: 'https://leetcode.com/problems/container-with-most-water/'
      },
      {
        id: 'search-rotated-array',
        title: 'Search in Rotated Sorted Array',
        difficulty: 'medium',
        description: 'Search for a target value in a rotated sorted array.',
        externalUrl: 'https://leetcode.com/problems/search-in-rotated-sorted-array/'
      },
      {
        id: 'spiral-matrix',
        title: 'Spiral Matrix',
        difficulty: 'medium',
        description: 'Return all elements of the matrix in spiral order.',
        externalUrl: 'https://leetcode.com/problems/spiral-matrix/'
      },
      {
        id: 'jump-game',
        title: 'Jump Game',
        difficulty: 'medium',
        description: 'Determine if you can reach the last index of the array.',
        externalUrl: 'https://leetcode.com/problems/jump-game/'
      }
    ]
  },

  {
    id: 'strings',
    title: 'Strings',
    description: 'Master string manipulation algorithms and data structures.',
    icon: '📝',
    color: '#22c55e',
    prerequisites: ['arrays'],
    estimatedHours: 15,
    subtopics: [
      {
        id: 'string-basics',
        title: 'Basics',
        description: 'Fundamentals of string manipulation.',
        contentPath: 'strings/basics.md',
        children: [
          {
            id: 'string-builders',
            title: 'String Builders, Immutable Strings',
            description: 'Understanding string mutability and efficient concatenation',
            contentPath: 'strings/basics/builders.md'
          }
        ]
      },
      {
        id: 'pattern-matching',
        title: 'Pattern Matching',
        description: 'Algorithms for finding patterns in strings.',
        contentPath: 'strings/pattern-matching.md',
        children: [
          {
            id: 'kmp-algorithm',
            title: 'KMP Algorithm',
            description: 'Knuth-Morris-Pratt algorithm for efficient pattern searching',
            contentPath: 'strings/pattern-matching/kmp.md',
            visualizerId: 'kmp-visualization'
          },
          {
            id: 'z-algorithm',
            title: 'Z-Algorithm',
            description: 'Linear time pattern matching algorithm',
            contentPath: 'strings/pattern-matching/z-algorithm.md',
            visualizerId: 'z-algorithm-visualization'
          }
        ]
      },
      {
        id: 'palindromes',
        title: 'Palindromes',
        description: 'Working with strings that read the same forwards and backwards.',
        contentPath: 'strings/palindromes.md',
        children: [
          {
            id: 'longest-palindromic-substring',
            title: 'Longest Palindromic Substring',
            description: 'Finding the longest substring that is a palindrome',
            contentPath: 'strings/palindromes/longest-substring.md',
            visualizerId: 'palindrome-visualization'
          },
          {
            id: 'manachers-algorithm',
            title: 'Manacher\'s Algorithm',
            description: 'Linear time algorithm for finding all palindromic substrings',
            contentPath: 'strings/palindromes/manachers.md',
            visualizerId: 'manachers-visualization'
          }
        ]
      },
      {
        id: 'anagrams',
        title: 'Anagrams',
        description: 'Working with words formed by rearranging letters.',
        contentPath: 'strings/anagrams.md',
        children: [
          {
            id: 'group-anagrams',
            title: 'Group Anagrams',
            description: 'Grouping strings that are anagrams of each other',
            contentPath: 'strings/anagrams/group.md'
          },
          {
            id: 'valid-anagram',
            title: 'Valid Anagram',
            description: 'Checking if two strings are anagrams',
            contentPath: 'strings/anagrams/valid.md'
          }
        ]
      },
      {
        id: 'trie',
        title: 'Trie',
        description: 'Specialized tree data structure for efficient string operations.',
        contentPath: 'strings/trie.md',
        visualizerId: 'trie-visualization',
        children: [
          {
            id: 'trie-operations',
            title: 'Insert, Search, Prefix Check',
            description: 'Basic operations on a trie',
            contentPath: 'strings/trie/operations.md',
            visualizerId: 'trie-operations-visualization'
          },
          {
            id: 'word-break',
            title: 'Word Break Problem',
            description: 'Using tries to determine if a string can be segmented into dictionary words',
            contentPath: 'strings/trie/word-break.md'
          },
          {
            id: 'auto-complete',
            title: 'Auto-complete',
            description: 'Implementing predictive text suggestions using tries',
            contentPath: 'strings/trie/auto-complete.md',
            visualizerId: 'autocomplete-visualization'
          }
        ]
      },
      {
        id: 'rolling-hash',
        title: 'Rolling Hash',
        description: 'Hash-based algorithms for string matching.',
        contentPath: 'strings/rolling-hash.md',
        children: [
          {
            id: 'rabin-karp',
            title: 'Rabin-Karp',
            description: 'String matching algorithm using hashing',
            contentPath: 'strings/rolling-hash/rabin-karp.md',
            visualizerId: 'rabin-karp-visualization'
          }
        ]
      }
    ],
    problems: [
      {
        id: 'longest-palindromic-substring',
        title: 'Longest Palindromic Substring',
        difficulty: 'medium',
        description: 'Find the longest substring that is a palindrome.',
        externalUrl: 'https://leetcode.com/problems/longest-palindromic-substring/'
      },
      {
        id: 'group-anagrams',
        title: 'Group Anagrams',
        difficulty: 'medium',
        description: 'Group strings that are anagrams of each other.',
        externalUrl: 'https://leetcode.com/problems/group-anagrams/'
      },
      {
        id: 'word-break',
        title: 'Word Break',
        difficulty: 'medium',
        description: 'Determine if a string can be segmented into dictionary words.',
        externalUrl: 'https://leetcode.com/problems/word-break/'
      },
      {
        id: 'implement-trie',
        title: 'Implement Trie',
        difficulty: 'medium',
        description: 'Implement a trie with insert, search, and startsWith methods.',
        externalUrl: 'https://leetcode.com/problems/implement-trie-prefix-tree/'
      }
    ]
  },

  {
    id: 'linked-lists',
    title: 'Linked Lists',
    description: 'Master node-based linear data structures with dynamic size.',
    icon: '🔗',
    color: '#f59e0b',
    prerequisites: ['arrays'],
    estimatedHours: 12,
    subtopics: [
      {
        id: 'linked-list-basics',
        title: 'Basics',
        description: 'Fundamentals of linked list data structures.',
        contentPath: 'linked-lists/basics.md',
        visualizerId: 'linked-list-visualization',
        children: [
          {
            id: 'types-of-linked-lists',
            title: 'Singly/Doubly/Circular',
            description: 'Different types of linked list structures',
            contentPath: 'linked-lists/basics/types.md',
            visualizerId: 'linked-list-types-visualization'
          }
        ]
      },
      {
        id: 'linked-list-operations',
        title: 'Operations',
        description: 'Common operations and transformations on linked lists.',
        contentPath: 'linked-lists/operations.md',
        children: [
          {
            id: 'list-reversal',
            title: 'Reversal (Iterative + Recursive)',
            description: 'Different approaches to reverse a linked list',
            contentPath: 'linked-lists/operations/reversal.md',
            visualizerId: 'list-reversal-visualization'
          },
          {
            id: 'detect-cycle',
            title: 'Detect Cycle (Floyd)',
            description: 'Floyd\'s cycle-finding algorithm (tortoise and hare)',
            contentPath: 'linked-lists/operations/detect-cycle.md',
            visualizerId: 'cycle-detection-visualization'
          },
          {
            id: 'remove-nth-node',
            title: 'Remove Nth Node',
            description: 'Removing a node from a specific position',
            contentPath: 'linked-lists/operations/remove-nth.md'
          },
          {
            id: 'merge-k-lists',
            title: 'Merge K Lists (Min Heap)',
            description: 'Efficiently merging multiple sorted linked lists',
            contentPath: 'linked-lists/operations/merge-k.md',
            visualizerId: 'merge-k-lists-visualization'
          }
        ]
      },
      {
        id: 'advanced-linked-lists',
        title: 'Advanced',
        description: 'Advanced linked list problems and techniques.',
        contentPath: 'linked-lists/advanced.md',
        children: [
          {
            id: 'copy-list-random',
            title: 'Copy List with Random Pointers',
            description: 'Deep copying a linked list with additional random pointers',
            contentPath: 'linked-lists/advanced/copy-random.md'
          },
          {
            id: 'lru-cache',
            title: 'LRU Cache (LinkedHashMap / Custom)',
            description: 'Implementing a Least Recently Used cache',
            contentPath: 'linked-lists/advanced/lru-cache.md',
            visualizerId: 'lru-cache-visualization'
          },
          {
            id: 'intersection-point',
            title: 'Intersection Point',
            description: 'Finding where two linked lists intersect',
            contentPath: 'linked-lists/advanced/intersection.md',
            visualizerId: 'intersection-visualization'
          },
          {
            id: 'palindrome-check',
            title: 'Palindrome Check',
            description: 'Determining if a linked list is a palindrome',
            contentPath: 'linked-lists/advanced/palindrome.md'
          }
        ]
      }
    ],
    problems: [
      {
        id: 'reverse-linked-list',
        title: 'Reverse Linked List',
        difficulty: 'easy',
        description: 'Reverse a singly linked list.',
        externalUrl: 'https://leetcode.com/problems/reverse-linked-list/'
      },
      {
        id: 'linked-list-cycle',
        title: 'Linked List Cycle',
        difficulty: 'easy',
        description: 'Determine if a linked list has a cycle.',
        externalUrl: 'https://leetcode.com/problems/linked-list-cycle/'
      },
      {
        id: 'merge-two-sorted-lists',
        title: 'Merge Two Sorted Lists',
        difficulty: 'easy',
        description: 'Merge two sorted linked lists.',
        externalUrl: 'https://leetcode.com/problems/merge-two-sorted-lists/'
      },
      {
        id: 'lru-cache',
        title: 'LRU Cache',
        difficulty: 'medium',
        description: 'Design and implement a data structure for Least Recently Used (LRU) cache.',
        externalUrl: 'https://leetcode.com/problems/lru-cache/'
      },
      {
        id: 'copy-list-random-pointer',
        title: 'Copy List with Random Pointer',
        difficulty: 'medium',
        description: 'Clone a linked list with a random pointer.',
        externalUrl: 'https://leetcode.com/problems/copy-list-with-random-pointer/'
      }
    ]
  },

  {
    id: 'stacks-queues',
    title: 'Stacks & Queues',
    description: 'Master linear data structures with specific access patterns.',
    icon: '📚',
    color: '#ef4444',
    prerequisites: ['linked-lists'],
    estimatedHours: 10,
    subtopics: [
      {
        id: 'stack-basics',
        title: 'Stack',
        description: 'Last-In-First-Out (LIFO) data structure.',
        contentPath: 'stacks-queues/stack.md',
        visualizerId: 'stack-visualization',
        children: [
          {
            id: 'balanced-parentheses',
            title: 'Balanced Parentheses',
            description: 'Checking if a string of brackets is valid',
            contentPath: 'stacks-queues/stack/parentheses.md',
            visualizerId: 'parentheses-visualization'
          },
          {
            id: 'min-stack',
            title: 'Min Stack',
            description: 'Implementing a stack that supports retrieving the minimum element',
            contentPath: 'stacks-queues/stack/min-stack.md',
            visualizerId: 'min-stack-visualization'
          },
          {
            id: 'infix-to-postfix',
            title: 'Infix to Postfix',
            description: 'Converting infix expressions to postfix notation',
            contentPath: 'stacks-queues/stack/infix-postfix.md',
            visualizerId: 'expression-conversion-visualization'
          }
        ]
      },
      {
        id: 'queue-basics',
        title: 'Queue',
        description: 'First-In-First-Out (FIFO) data structure.',
        contentPath: 'stacks-queues/queue.md',
        visualizerId: 'queue-visualization',
        children: [
          {
            id: 'circular-queue',
            title: 'Circular Queue',
            description: 'Implementing a queue using a fixed-size array',
            contentPath: 'stacks-queues/queue/circular.md',
            visualizerId: 'circular-queue-visualization'
          },
          {
            id: 'deque',
            title: 'Deque',
            description: 'Double-ended queue with operations at both ends',
            contentPath: 'stacks-queues/queue/deque.md',
            visualizerId: 'deque-visualization'
          }
        ]
      },
      {
        id: 'monotonic',
        title: 'Monotonic Stack/Queue',
        description: 'Special structures where elements maintain monotonic order.',
        contentPath: 'stacks-queues/monotonic.md',
        children: [
          {
            id: 'next-greater-element',
            title: 'Next Greater Element',
            description: 'Finding the next greater element for each element',
            contentPath: 'stacks-queues/monotonic/next-greater.md',
            visualizerId: 'next-greater-visualization'
          },
          {
            id: 'sliding-window-maximum',
            title: 'Sliding Window Maximum',
            description: 'Finding the maximum in each sliding window',
            contentPath: 'stacks-queues/monotonic/sliding-max.md',
            visualizerId: 'sliding-window-max-visualization'
          }
        ]
      },
      {
        id: 'implementation',
        title: 'Stack/Queue via Array & Linked List',
        description: 'Different ways to implement stacks and queues.',
        contentPath: 'stacks-queues/implementation.md',
        visualizerId: 'stack-queue-impl-visualization'
      }
    ],
    problems: [
      {
        id: 'valid-parentheses',
        title: 'Valid Parentheses',
        difficulty: 'easy',
        description: 'Determine if a string of brackets is valid.',
        externalUrl: 'https://leetcode.com/problems/valid-parentheses/'
      },
      {
        id: 'min-stack-problem',
        title: 'Min Stack',
        difficulty: 'easy',
        description: 'Design a stack that supports push, pop, top, and retrieving the minimum element.',
        externalUrl: 'https://leetcode.com/problems/min-stack/'
      },
      {
        id: 'implement-queue-using-stacks',
        title: 'Implement Queue using Stacks',
        difficulty: 'easy',
        description: 'Implement a queue using only stacks.',
        externalUrl: 'https://leetcode.com/problems/implement-queue-using-stacks/'
      },
      {
        id: 'sliding-window-maximum',
        title: 'Sliding Window Maximum',
        difficulty: 'hard',
        description: 'Find the maximum element in each sliding window of size k.',
        externalUrl: 'https://leetcode.com/problems/sliding-window-maximum/'
      }
    ]
  },

  {
    id: 'trees',
    title: 'Trees',
    description: 'Hierarchical data structures with a root node and child nodes.',
    icon: '🌳',
    color: '#8b5cf6',
    prerequisites: ['stacks-queues'],
    estimatedHours: 25,
    subtopics: [
      {
        id: 'tree-basics',
        title: 'Basics',
        description: 'Fundamentals of tree data structures.',
        contentPath: 'trees/basics.md',
        children: [
          {
            id: 'tree-types',
            title: 'Binary Tree vs BST',
            description: 'Understanding different types of trees and their properties',
            contentPath: 'trees/basics/types.md',
            visualizerId: 'tree-types-visualization'
          },
          {
            id: 'tree-traversals-basic',
            title: 'Inorder, Preorder, Postorder',
            description: 'Basic depth-first traversal methods',
            contentPath: 'trees/basics/traversals.md',
            visualizerId: 'tree-traversal-visualization'
          }
        ]
      },
      {
        id: 'binary-search-tree',
        title: 'Binary Search Tree',
        description: 'Tree with ordered nodes for efficient search.',
        contentPath: 'trees/bst.md',
        visualizerId: 'bst-visualization',
        children: [
          {
            id: 'bst-operations',
            title: 'Insert/Delete/Search',
            description: 'Basic operations on a binary search tree',
            contentPath: 'trees/bst/operations.md',
            visualizerId: 'bst-operations-visualization'
          },
          {
            id: 'bst-properties',
            title: 'Floor, Ceil, Closest',
            description: 'Finding specific values in a BST',
            contentPath: 'trees/bst/properties.md'
          }
        ]
      },
      {
        id: 'tree-traversals',
        title: 'Traversals',
        description: 'Various ways to visit all nodes in a tree.',
        contentPath: 'trees/traversals.md',
        children: [
          {
            id: 'iterative-traversals',
            title: 'Iterative DFS/BFS',
            description: 'Non-recursive implementations of tree traversals',
            contentPath: 'trees/traversals/iterative.md',
            visualizerId: 'iterative-traversal-visualization'
          },
          {
            id: 'morris-traversal',
            title: 'Morris Traversal',
            description: 'Traversing a tree using O(1) space',
            contentPath: 'trees/traversals/morris.md',
            visualizerId: 'morris-traversal-visualization'
          }
        ]
      },
      {
        id: 'tree-views',
        title: 'Views',
        description: 'Different perspectives of viewing a tree.',
        contentPath: 'trees/views.md',
        children: [
          {
            id: 'tree-view-types',
            title: 'Top, Bottom, Left, Right View',
            description: 'Viewing a tree from different angles',
            contentPath: 'trees/views/types.md',
            visualizerId: 'tree-views-visualization'
          }
        ]
      },
      {
        id: 'tree-properties',
        title: 'Properties',
        description: 'Key characteristics and metrics of trees.',
        contentPath: 'trees/properties.md',
        children: [
          {
            id: 'height-diameter',
            title: 'Height, Diameter',
            description: 'Measuring the dimensions of a tree',
            contentPath: 'trees/properties/dimensions.md'
          },
          {
            id: 'balanced-tree',
            title: 'Balanced Tree Check',
            description: 'Determining if a tree is height-balanced',
            contentPath: 'trees/properties/balanced.md'
          },
          {
            id: 'lowest-common-ancestor',
            title: 'LCA (Binary Tree & BST)',
            description: 'Finding the lowest common ancestor of two nodes',
            contentPath: 'trees/properties/lca.md',
            visualizerId: 'lca-visualization'
          },
          {
            id: 'max-path-sum',
            title: 'Maximum Path Sum',
            description: 'Finding the path with the maximum sum in a tree',
            contentPath: 'trees/properties/max-path.md'
          }
        ]
      },
      {
        id: 'advanced-trees',
        title: 'Advanced Trees',
        description: 'Specialized tree data structures for specific use cases.',
        contentPath: 'trees/advanced.md',
        children: [
          {
            id: 'avl-tree',
            title: 'AVL, Segment Tree',
            description: 'Self-balancing binary search trees',
            contentPath: 'trees/advanced/avl.md',
            visualizerId: 'avl-tree-visualization'
          },
          {
            id: 'fenwick-tree',
            title: 'Fenwick (Binary Indexed) Tree',
            description: 'Efficient data structure for range queries',
            contentPath: 'trees/advanced/fenwick.md',
            visualizerId: 'fenwick-tree-visualization'
          },
          {
            id: 'trie-tree',
            title: 'Trie Tree',
            description: 'Efficient string storage and retrieval',
            contentPath: 'trees/advanced/trie.md'
          },
          {
            id: 'kd-tree',
            title: 'K-D Tree',
            description: 'Space-partitioning data structure for k-dimensional points',
            contentPath: 'trees/advanced/kd-tree.md'
          },
          {
            id: 'suffix-tree',
            title: 'Suffix Tree/Array',
            description: 'Data structures for efficient string pattern matching',
            contentPath: 'trees/advanced/suffix.md'
          }
        ]
      },
      {
        id: 'tree-problems',
        title: 'Tree Problems',
        description: 'Common tree-related algorithmic challenges.',
        contentPath: 'trees/problems.md',
        children: [
          {
            id: 'serialize-deserialize',
            title: 'Serialize/Deserialize',
            description: 'Converting a tree to a string and back',
            contentPath: 'trees/problems/serialize.md'
          },
          {
            id: 'flatten-tree',
            title: 'Flatten Binary Tree',
            description: 'Converting a binary tree to a linked list',
            contentPath: 'trees/problems/flatten.md',
            visualizerId: 'flatten-tree-visualization'
          },
          {
            id: 'vertical-order',
            title: 'Vertical Order Traversal',
            description: 'Traversing a tree vertically',
            contentPath: 'trees/problems/vertical.md'
          },
          {
            id: 'zigzag-traversal',
            title: 'Zigzag Traversal',
            description: 'Level-order traversal in alternating directions',
            contentPath: 'trees/problems/zigzag.md',
            visualizerId: 'zigzag-traversal-visualization'
          }
        ]
      }
    ],
    problems: [
      {
        id: 'validate-bst',
        title: 'Validate Binary Search Tree',
        difficulty: 'medium',
        description: 'Determine if a binary tree is a valid binary search tree.',
        externalUrl: 'https://leetcode.com/problems/validate-binary-search-tree/'
      },
      {
        id: 'max-depth',
        title: 'Maximum Depth of Binary Tree',
        difficulty: 'easy',
        description: 'Find the maximum depth of a binary tree.',
        externalUrl: 'https://leetcode.com/problems/maximum-depth-of-binary-tree/'
      },
      {
        id: 'binary-tree-level-order',
        title: 'Binary Tree Level Order Traversal',
        difficulty: 'medium',
        description: "Return the level order traversal of a binary tree's values.",
        externalUrl: 'https://leetcode.com/problems/binary-tree-level-order-traversal/'
      },
      {
        id: 'lowest-common-ancestor',
        title: 'Lowest Common Ancestor of a Binary Tree',
        difficulty: 'medium',
        description: 'Find the lowest common ancestor of two nodes in a binary tree.',
        externalUrl: 'https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/'
      },
      {
        id: 'serialize-deserialize',
        title: 'Serialize and Deserialize Binary Tree',
        difficulty: 'hard',
        description: 'Design an algorithm to serialize and deserialize a binary tree.',
        externalUrl: 'https://leetcode.com/problems/serialize-and-deserialize-binary-tree/'
      }
    ]
  },

  {
    id: 'heaps',
    title: 'Heaps / Priority Queues',
    description: 'Specialized tree-based data structures for priority operations.',
    icon: '⛰️',
    color: '#ec4899',
    prerequisites: ['trees'],
    estimatedHours: 8,
    subtopics: [
      {
        id: 'heap-types',
        title: 'Min Heap, Max Heap',
        description: 'Understanding different types of heap structures.',
        contentPath: 'heaps/types.md',
        visualizerId: 'heap-visualization'
      },
      {
        id: 'heap-sort',
        title: 'Heap Sort',
        description: 'Sorting algorithm using heap data structure.',
        contentPath: 'heaps/heap-sort.md',
        visualizerId: 'heap-sort-visualization'
      },
      {
        id: 'kth-element',
        title: 'Kth Largest / Smallest',
        description: 'Finding the kth element in an unsorted array.',
        contentPath: 'heaps/kth-element.md',
        visualizerId: 'kth-element-visualization'
      },
      {
        id: 'merge-k-arrays',
        title: 'Merge K Sorted Arrays',
        description: 'Efficiently combining multiple sorted arrays.',
        contentPath: 'heaps/merge-k-arrays.md',
        visualizerId: 'merge-k-arrays-visualization'
      },
      {
        id: 'median-stream',
        title: 'Median from Stream',
        description: 'Finding the median from a stream of numbers.',
        contentPath: 'heaps/median-stream.md',
        visualizerId: 'median-stream-visualization'
      },
      {
        id: 'top-k-frequent',
        title: 'Top K Frequent Elements',
        description: 'Finding elements with highest frequency.',
        contentPath: 'heaps/top-k-frequent.md'
      }
    ],
    problems: [
      {
        id: 'kth-largest',
        title: 'Kth Largest Element in an Array',
        difficulty: 'medium',
        description: 'Find the kth largest element in an unsorted array.',
        externalUrl: 'https://leetcode.com/problems/kth-largest-element-in-an-array/'
      },
      {
        id: 'top-k-frequent',
        title: 'Top K Frequent Elements',
        difficulty: 'medium',
        description: 'Find the k most frequent elements in an array.',
        externalUrl: 'https://leetcode.com/problems/top-k-frequent-elements/'
      },
      {
        id: 'merge-k-sorted-lists',
        title: 'Merge k Sorted Lists',
        difficulty: 'hard',
        description: 'Merge k sorted linked lists into one sorted linked list.',
        externalUrl: 'https://leetcode.com/problems/merge-k-sorted-lists/'
      },
      {
        id: 'find-median-from-data-stream',
        title: 'Find Median from Data Stream',
        difficulty: 'hard',
        description: 'Design a data structure that supports adding integers and finding the median.',
        externalUrl: 'https://leetcode.com/problems/find-median-from-data-stream/'
      }
    ]
  },

  {
    id: 'hashing',
    title: 'Hashing',
    description: 'Efficiently map data to fixed-size values for quick retrieval.',
    icon: '🔑',
    color: '#0ea5e9',
    prerequisites: ['arrays'],
    estimatedHours: 7,
    subtopics: [
      {
        id: 'hash-basics',
        title: 'HashMap, HashSet',
        description: 'Understanding hash-based data structures.',
        contentPath: 'hashing/basics.md',
        visualizerId: 'hash-table-visualization'
      },
      {
        id: 'frequency-counting',
        title: 'Count Frequencies',
        description: 'Using hash maps to count occurrences.',
        contentPath: 'hashing/frequency.md'
      },
      {
        id: 'custom-hash',
        title: 'Custom Hash Functions',
        description: 'Creating effective hash functions for objects.',
        contentPath: 'hashing/custom-hash.md'
      },
      {
        id: 'subarray-sum',
        title: 'Subarray with Given Sum',
        description: 'Finding subarrays that sum to a target value.',
        contentPath: 'hashing/subarray-sum.md',
        visualizerId: 'subarray-sum-visualization'
      },
      {
        id: 'consecutive-sequence',
        title: 'Longest Consecutive Sequence',
        description: 'Finding the longest sequence of consecutive numbers.',
        contentPath: 'hashing/consecutive-sequence.md'
      }
    ],
    problems: [
      {
        id: 'two-sum',
        title: 'Two Sum',
        difficulty: 'easy',
        description: 'Find two numbers in the array that add up to a target.',
        externalUrl: 'https://leetcode.com/problems/two-sum/'
      },
      {
        id: 'lru-cache-hashing',
        title: 'LRU Cache',
        difficulty: 'medium',
        description: 'Design a data structure that follows the LRU cache policy.',
        externalUrl: 'https://leetcode.com/problems/lru-cache/'
      },
      {
        id: 'longest-consecutive',
        title: 'Longest Consecutive Sequence',
        difficulty: 'medium',
        description: 'Find the length of the longest consecutive elements sequence.',
        externalUrl: 'https://leetcode.com/problems/longest-consecutive-sequence/'
      },
      {
        id: 'subarray-sum-equals-k',
        title: 'Subarray Sum Equals K',
        difficulty: 'medium',
        description: 'Find the total number of continuous subarrays whose sum equals k.',
        externalUrl: 'https://leetcode.com/problems/subarray-sum-equals-k/'
      }
    ]
  },

  {
    id: 'graphs',
    title: 'Graphs',
    description: 'Master non-linear data structures consisting of vertices and edges.',
    icon: '🕸️',
    color: '#f43f5e',
    prerequisites: ['trees', 'hashing'],
    estimatedHours: 30,
    subtopics: [
      {
        id: 'graph-representation',
        title: 'Representation',
        description: 'Different ways to represent graph data.',
        contentPath: 'graphs/representation.md',
        children: [
          {
            id: 'adjacency-list-matrix',
            title: 'Adjacency List vs Matrix',
            description: 'Comparing different graph representations',
            contentPath: 'graphs/representation/adjacency.md',
            visualizerId: 'graph-representation-visualization'
          }
        ]
      },
      {
        id: 'graph-traversal',
        title: 'Traversal',
        description: 'Algorithms for visiting all vertices in a graph.',
        contentPath: 'graphs/traversal.md',
        children: [
          {
            id: 'dfs',
            title: 'DFS (Recursive + Iterative)',
            description: 'Depth-first search traversal algorithms',
            contentPath: 'graphs/traversal/dfs.md',
            visualizerId: 'dfs-visualization'
          },
          {
            id: 'bfs',
            title: 'BFS',
            description: 'Breadth-first search traversal algorithm',
            contentPath: 'graphs/traversal/bfs.md',
            visualizerId: 'bfs-visualization'
          }
        ]
      },
      {
        id: 'pathfinding',
        title: 'Pathfinding',
        description: 'Algorithms for finding paths between vertices.',
        contentPath: 'graphs/pathfinding.md',
        children: [
          {
            id: 'dijkstra',
            title: 'Dijkstra\'s Algo',
            description: 'Finding shortest paths from a source vertex',
            contentPath: 'graphs/pathfinding/dijkstra.md',
            visualizerId: 'dijkstra-visualization'
          },
          {
            id: 'bellman-ford',
            title: 'Bellman-Ford',
            description: 'Finding shortest paths with negative edges',
            contentPath: 'graphs/pathfinding/bellman-ford.md',
            visualizerId: 'bellman-ford-visualization'
          },
          {
            id: 'floyd-warshall',
            title: 'Floyd-Warshall',
            description: 'Finding all-pairs shortest paths',
            contentPath: 'graphs/pathfinding/floyd-warshall.md',
            visualizerId: 'floyd-warshall-visualization'
          }
        ]
      },
      {
        id: 'mst',
        title: 'MST (Minimum Spanning Tree)',
        description: 'Algorithms for finding minimum spanning trees.',
        contentPath: 'graphs/mst.md',
        children: [
          {
            id: 'kruskal',
            title: 'Kruskal\'s Algorithm',
            description: 'Finding MST using a greedy approach',
            contentPath: 'graphs/mst/kruskal.md',
            visualizerId: 'kruskal-visualization'
          },
          {
            id: 'prim',
            title: 'Prim\'s Algorithm',
            description: 'Another approach to find MST',
            contentPath: 'graphs/mst/prim.md',
            visualizerId: 'prim-visualization'
          }
        ]
      },
      {
        id: 'components',
        title: 'Components',
        description: 'Working with connected parts of a graph.',
        contentPath: 'graphs/components.md',
        children: [
          {
            id: 'union-find',
            title: 'Union Find (DSU)',
            description: 'Disjoint Set Union data structure',
            contentPath: 'graphs/components/union-find.md',
            visualizerId: 'union-find-visualization'
          },
          {
            id: 'connected-components',
            title: 'Connected Components',
            description: 'Finding connected regions in a graph',
            contentPath: 'graphs/components/connected.md'
          }
        ]
      },
      {
        id: 'topological-sort',
        title: 'Topological Sorting',
        description: 'Ordering vertices based on dependencies.',
        contentPath: 'graphs/topological-sort.md',
        children: [
          {
            id: 'kahn-algorithm',
            title: 'Kahn\'s Algorithm',
            description: 'BFS-based topological sorting',
            contentPath: 'graphs/topological-sort/kahn.md',
            visualizerId: 'kahn-visualization'
          },
          {
            id: 'dfs-topo',
            title: 'DFS Based',
            description: 'DFS-based topological sorting',
            contentPath: 'graphs/topological-sort/dfs.md'
          }
        ]
      },
      {
        id: 'cycle-detection',
        title: 'Cycle Detection',
        description: 'Identifying cycles in graphs.',
        contentPath: 'graphs/cycle-detection.md',
        children: [
          {
            id: 'directed-undirected',
            title: 'Directed vs Undirected',
            description: 'Different approaches for different graph types',
            contentPath: 'graphs/cycle-detection/directed-undirected.md',
            visualizerId: 'cycle-detection-graph-visualization'
          }
        ]
      },
      {
        id: 'bridges-articulation',
        title: 'Bridges & Articulation Points',
        description: 'Finding critical edges and vertices in a graph.',
        contentPath: 'graphs/bridges-articulation.md',
        visualizerId: 'bridges-articulation-visualization'
      },
      {
        id: 'grid-pathfinding',
        title: 'Shortest Path in Grid / Maze',
        description: 'Pathfinding algorithms for 2D grids.',
        contentPath: 'graphs/grid-pathfinding.md',
        visualizerId: 'grid-pathfinding-visualization'
      },
      {
        id: 'advanced-graphs',
        title: 'Advanced',
        description: 'Advanced graph algorithms.',
        contentPath: 'graphs/advanced.md',
        children: [
          {
            id: 'tarjan',
            title: 'Tarjan\'s Algorithm',
            description: 'Finding strongly connected components',
            contentPath: 'graphs/advanced/tarjan.md',
            visualizerId: 'tarjan-visualization'
          },
          {
            id: 'kosaraju',
            title: 'Kosaraju\'s (SCC)',
            description: 'Another algorithm for strongly connected components',
            contentPath: 'graphs/advanced/kosaraju.md',
            visualizerId: 'kosaraju-visualization'
          }
        ]
      }
    ],
    problems: [
      {
        id: 'course-schedule',
        title: 'Course Schedule',
        difficulty: 'medium',
        description: 'Determine if you can finish all courses given prerequisites.',
        externalUrl: 'https://leetcode.com/problems/course-schedule/'
      },
      {
        id: 'number-of-islands',
        title: 'Number of Islands',
        difficulty: 'medium',
        description: 'Count the number of islands in a 2D grid.',
        externalUrl: 'https://leetcode.com/problems/number-of-islands/'
      },
      {
        id: 'network-delay-time',
        title: 'Network Delay Time',
        difficulty: 'medium',
        description: 'Find the time it takes for all nodes to receive a signal.',
        externalUrl: 'https://leetcode.com/problems/network-delay-time/'
      },
      {
        id: 'redundant-connection',
        title: 'Redundant Connection',
        difficulty: 'medium',
        description: 'Find an edge that can be removed to make a graph a tree.',
        externalUrl: 'https://leetcode.com/problems/redundant-connection/'
      },
      {
        id: 'alien-dictionary',
        title: 'Alien Dictionary',
        difficulty: 'hard',
        description: 'Determine the order of characters in an alien language.',
        externalUrl: 'https://leetcode.com/problems/alien-dictionary/'
      }
    ]
  },

  {
    id: 'dynamic-programming',
    title: 'Dynamic Programming',
    description: 'Master optimizing recursive algorithms by storing subproblem solutions.',
    icon: '🧩',
    color: '#14b8a6',
    prerequisites: ['recursion', 'arrays'],
    estimatedHours: 35,
    subtopics: [
      {
        id: 'dp-intro',
        title: 'Introduction',
        description: 'Fundamentals of dynamic programming approach.',
        contentPath: 'dp/intro.md',
        children: [
          {
            id: 'memoization-tabulation',
            title: 'Memoization vs Tabulation',
            description: 'Top-down and bottom-up approaches to DP',
            contentPath: 'dp/intro/approaches.md',
            visualizerId: 'dp-approaches-visualization'
          },
          {
            id: 'state-representation',
            title: 'State Representation',
            description: 'Defining and managing states in DP problems',
            contentPath: 'dp/intro/state.md'
          }
        ]
      },
      {
        id: 'dp-1d',
        title: '1D DP',
        description: 'Dynamic programming with one-dimensional state.',
        contentPath: 'dp/1d.md',
        children: [
          {
            id: 'climb-stairs',
            title: 'Climb Stairs',
            description: 'Counting ways to reach the top of stairs',
            contentPath: 'dp/1d/climb-stairs.md',
            visualizerId: 'climb-stairs-visualization'
          },
          {
            id: 'fibonacci-variants',
            title: 'Fibonacci Variants',
            description: 'Problems that follow the Fibonacci pattern',
            contentPath: 'dp/1d/fibonacci.md'
          },
          {
            id: 'jump-game-ii',
            title: 'Jump Game II',
            description: 'Finding minimum jumps to reach the end',
            contentPath: 'dp/1d/jump-game.md',
            visualizerId: 'jump-game-dp-visualization'
          }
        ]
      },
      {
        id: 'dp-2d',
        title: '2D DP',
        description: 'Dynamic programming with two-dimensional state.',
        contentPath: 'dp/2d.md',
        children: [
          {
            id: 'grid-paths',
            title: 'Grid Paths',
            description: 'Counting paths in a grid',
            contentPath: 'dp/2d/grid-paths.md',
            visualizerId: 'grid-paths-visualization'
          },
          {
            id: 'unique-paths-obstacles',
            title: 'Unique Paths with Obstacles',
            description: 'Path counting with obstacles',
            contentPath: 'dp/2d/obstacles.md'
          },
          {
            id: 'min-path-sum',
            title: 'Minimum Path Sum',
            description: 'Finding path with minimum sum in a grid',
            contentPath: 'dp/2d/min-path-sum.md',
            visualizerId: 'min-path-sum-visualization'
          }
        ]
      },
      {
        id: 'knapsack',
        title: 'Knapsack Variants',
        description: 'Resource allocation problems with constraints.',
        contentPath: 'dp/knapsack.md',
        children: [
          {
            id: 'knapsack-types',
            title: '0/1, Unbounded, Bounded',
            description: 'Different variations of the knapsack problem',
            contentPath: 'dp/knapsack/types.md',
            visualizerId: 'knapsack-visualization'
          },
          {
            id: 'subset-sum',
            title: 'Subset Sum, Equal Partition',
            description: 'Finding subsets with specific sum properties',
            contentPath: 'dp/knapsack/subset-sum.md',
            visualizerId: 'subset-sum-visualization'
          }
        ]
      },
      {
        id: 'strings-dp',
        title: 'Strings DP',
        description: 'Dynamic programming applied to string problems.',
        contentPath: 'dp/strings.md',
        children: [
          {
            id: 'string-comparison',
            title: 'LCS, LIS, Edit Distance',
            description: 'Common string comparison problems',
            contentPath: 'dp/strings/comparison.md',
            visualizerId: 'string-dp-visualization'
          },
          {
            id: 'palindromic-subsequence',
            title: 'Longest Palindromic Subsequence',
            description: 'Finding the longest subsequence that forms a palindrome',
            contentPath: 'dp/strings/palindromic.md'
          }
        ]
      },
      {
        id: 'tree-dp',
        title: 'DP on Trees',
        description: 'Dynamic programming applied to tree structures.',
        contentPath: 'dp/trees.md',
        children: [
          {
            id: 'tree-dp-examples',
            title: 'Tree DP (Robber, Diameter)',
            description: 'Common tree DP problems',
            contentPath: 'dp/trees/examples.md',
            visualizerId: 'tree-dp-visualization'
          }
        ]
      },
      {
        id: 'bitmask-dp',
        title: 'DP on Bitmask',
        description: 'Using bit manipulation for state representation.',
        contentPath: 'dp/bitmask.md',
        children: [
          {
            id: 'tsp',
            title: 'TSP',
            description: 'Solving the Traveling Salesman Problem',
            contentPath: 'dp/bitmask/tsp.md',
            visualizerId: 'tsp-visualization'
          }
        ]
      },
      {
        id: 'dp-sliding-window',
        title: 'DP with Sliding Window',
        description: 'Combining DP with sliding window technique.',
        contentPath: 'dp/sliding-window.md'
      },
      {
        id: 'interval-dp',
        title: 'Interval DP',
        description: 'Dynamic programming over intervals.',
        contentPath: 'dp/interval.md',
        visualizerId: 'interval-dp-visualization'
      },
      {
        id: 'mcm',
        title: 'MCM (Matrix Chain Multiplication)',
        description: 'Optimizing the order of matrix multiplications.',
        contentPath: 'dp/mcm.md',
        visualizerId: 'mcm-visualization'
      }
    ],
    problems: [
      {
        id: 'coin-change',
        title: 'Coin Change',
        difficulty: 'medium',
        description: 'Find the fewest coins needed to make up a given amount.',
        externalUrl: 'https://leetcode.com/problems/coin-change/'
      },
      {
        id: 'longest-increasing-subsequence',
        title: 'Longest Increasing Subsequence',
        difficulty: 'medium',
        description: 'Find the length of the longest subsequence that is strictly increasing.',
        externalUrl: 'https://leetcode.com/problems/longest-increasing-subsequence/'
      },
      {
        id: 'edit-distance',
        title: 'Edit Distance',
        difficulty: 'hard',
        description: 'Find the minimum operations required to convert one string to another.',
        externalUrl: 'https://leetcode.com/problems/edit-distance/'
      },
      {
        id: 'unique-paths',
        title: 'Unique Paths',
        difficulty: 'medium',
        description: 'Count all possible paths from top-left to bottom-right of a grid.',
        externalUrl: 'https://leetcode.com/problems/unique-paths/'
      },
      {
        id: 'partition-equal-subset-sum',
        title: 'Partition Equal Subset Sum',
        difficulty: 'medium',
        description: 'Determine if an array can be partitioned into two equal sum subsets.',
        externalUrl: 'https://leetcode.com/problems/partition-equal-subset-sum/'
      }
    ]
  },

  {
    id: 'backtracking',
    title: 'Backtracking',
    description: 'Systematically search for a solution by trying possibilities and backtracking when necessary.',
    icon: '🔄',
    color: '#fb7185',
    prerequisites: ['recursion'],
    estimatedHours: 15,
    subtopics: [
      {
        id: 'n-queens',
        title: 'N-Queens',
        description: 'Placing N queens on an N×N chessboard without conflicts.',
        contentPath: 'backtracking/n-queens.md',
        visualizerId: 'n-queens-visualization'
      },
      {
        id: 'sudoku-solver',
        title: 'Sudoku Solver',
        description: 'Solving a partially filled Sudoku puzzle.',
        contentPath: 'backtracking/sudoku.md',
        visualizerId: 'sudoku-visualization'
      },
      {
        id: 'word-search',
        title: 'Word Search',
        description: 'Finding a word in a 2D board of characters.',
        contentPath: 'backtracking/word-search.md',
        visualizerId: 'word-search-visualization'
      },
      {
        id: 'generate-parentheses',
        title: 'Generate Parentheses',
        description: 'Generating all valid combinations of parentheses.',
        contentPath: 'backtracking/parentheses.md',
        visualizerId: 'parentheses-generation-visualization'
      },
      {
        id: 'combinations',
        title: 'Subsets/Combinations/Permutations',
        description: 'Generating various combinatorial arrangements.',
        contentPath: 'backtracking/combinations.md',
        visualizerId: 'combinations-visualization'
      },
      {
        id: 'palindrome-partitioning',
        title: 'Palindrome Partitioning',
        description: 'Partitioning a string into palindromic substrings.',
        contentPath: 'backtracking/palindrome-partitioning.md'
      }
    ],
    problems: [
      {
        id: 'letter-combinations',
        title: 'Letter Combinations of a Phone Number',
        difficulty: 'medium',
        description: 'Find all possible letter combinations from a phone number.',
        externalUrl: 'https://leetcode.com/problems/letter-combinations-of-a-phone-number/'
      },
      {
        id: 'n-queens-problem',
        title: 'N-Queens',
        difficulty: 'hard',
        description: 'Place n queens on an n×n chessboard such that no two queens attack each other.',
        externalUrl: 'https://leetcode.com/problems/n-queens/'
      },
      {
        id: 'permutations',
        title: 'Permutations',
        difficulty: 'medium',
        description: 'Generate all possible permutations of an array of distinct integers.',
        externalUrl: 'https://leetcode.com/problems/permutations/'
      },
      {
        id: 'word-search-problem',
        title: 'Word Search',
        difficulty: 'medium',
        description: 'Find if a word exists in a 2D board of characters.',
        externalUrl: 'https://leetcode.com/problems/word-search/'
      }
    ]
  },

  {
    id: 'greedy',
    title: 'Greedy',
    description: 'Make locally optimal choices at each step to find a global optimum.',
    icon: '🪙',
    color: '#a3e635',
    prerequisites: ['sorting'],
    estimatedHours: 10,
    subtopics: [
      {
        id: 'activity-selection',
        title: 'Activity Selection',
        description: 'Selecting the maximum number of activities that don\'t overlap.',
        contentPath: 'greedy/activity-selection.md',
        visualizerId: 'activity-selection-visualization'
      },
      {
        id: 'fractional-knapsack',
        title: 'Fractional Knapsack',
        description: 'Optimizing value when items can be taken in fractions.',
        contentPath: 'greedy/fractional-knapsack.md',
        visualizerId: 'fractional-knapsack-visualization'
      },
      {
        id: 'job-sequencing',
        title: 'Job Sequencing',
        description: 'Scheduling jobs to maximize profit with deadlines.',
        contentPath: 'greedy/job-sequencing.md',
        visualizerId: 'job-sequencing-visualization'
      },
      {
        id: 'huffman-coding',
        title: 'Huffman Coding',
        description: 'Optimal prefix-free encoding of characters.',
        contentPath: 'greedy/huffman-coding.md',
        visualizerId: 'huffman-coding-visualization'
      },
      {
        id: 'gas-station-greedy',
        title: 'Gas Station',
        description: 'Finding a starting station to complete a circular route.',
        contentPath: 'greedy/gas-station.md'
      },
      {
        id: 'interval-scheduling',
        title: 'Interval Scheduling',
        description: 'Selecting non-overlapping intervals to maximize some metric.',
        contentPath: 'greedy/interval-scheduling.md',
        visualizerId: 'interval-scheduling-visualization'
      }
    ],
    problems: [
      {
        id: 'jump-game-greedy',
        title: 'Jump Game',
        difficulty: 'medium',
        description: 'Determine if you can reach the last index of an array.',
        externalUrl: 'https://leetcode.com/problems/jump-game/'
      },
      {
        id: 'gas-station-problem',
        title: 'Gas Station',
        difficulty: 'medium',
        description: 'Find a starting gas station to complete a circular route.',
        externalUrl: 'https://leetcode.com/problems/gas-station/'
      },
      {
        id: 'minimum-number-of-arrows',
        title: 'Minimum Number of Arrows to Burst Balloons',
        difficulty: 'medium',
        description: 'Find the minimum number of arrows needed to burst all balloons.',
        externalUrl: 'https://leetcode.com/problems/minimum-number-of-arrows-to-burst-balloons/'
      },
      {
        id: 'task-scheduler',
        title: 'Task Scheduler',
        difficulty: 'medium',
        description: 'Arrange tasks with cooldown periods to minimize idle time.',
        externalUrl: 'https://leetcode.com/problems/task-scheduler/'
      }
    ]
  },

  {
    id: 'math',
    title: 'Math',
    description: 'Apply mathematical concepts to solve algorithmic problems.',
    icon: '📐',
    color: '#facc15',
    prerequisites: ['basics-foundations'],
    estimatedHours: 15,
    subtopics: [
      {
        id: 'gcd-lcm',
        title: 'GCD, LCM',
        description: 'Finding greatest common divisor and least common multiple.',
        contentPath: 'math/gcd-lcm.md',
        visualizerId: 'gcd-lcm-visualization'
      },
      {
        id: 'sieve',
        title: 'Sieve of Eratosthenes',
        description: 'Efficiently finding all prime numbers up to a limit.',
        contentPath: 'math/sieve.md',
        visualizerId: 'sieve-visualization'
      },
      {
        id: 'prime-factorization',
        title: 'Prime Factorization',
        description: 'Breaking down numbers into their prime factors.',
        contentPath: 'math/prime-factorization.md',
        visualizerId: 'prime-factorization-visualization'
      },
      {
        id: 'modular-arithmetic',
        title: 'Modular Arithmetic',
        description: 'Performing arithmetic operations with modulo.',
        contentPath: 'math/modular-arithmetic.md'
      },
      {
        id: 'modular-inverse',
        title: 'Modular Inverse',
        description: 'Finding the multiplicative inverse in modular arithmetic.',
        contentPath: 'math/modular-inverse.md'
      },
      {
        id: 'combinatorics',
        title: 'Combinatorics',
        description: 'Counting and arrangement problems.',
        contentPath: 'math/combinatorics.md'
      },
      {
        id: 'fast-exponentiation',
        title: 'Fast Exponentiation',
        description: 'Computing large powers efficiently.',
        contentPath: 'math/fast-exponentiation.md',
        visualizerId: 'fast-exponentiation-visualization'
      },
      {
        id: 'matrix-exponentiation',
        title: 'Matrix Exponentiation',
        description: 'Using matrices to solve recurrence relations.',
        contentPath: 'math/matrix-exponentiation.md',
        visualizerId: 'matrix-exponentiation-visualization'
      }
    ],
    problems: [
      {
        id: 'count-primes',
        title: 'Count Primes',
        difficulty: 'medium',
        description: 'Count the number of prime numbers less than a non-negative number.',
        externalUrl: 'https://leetcode.com/problems/count-primes/'
      },
      {
        id: 'power-function',
        title: 'Pow(x, n)',
        difficulty: 'medium',
        description: 'Implement pow(x, n), which calculates x raised to the power n.',
        externalUrl: 'https://leetcode.com/problems/powx-n/'
      },
      {
        id: 'excel-column-number',
        title: 'Excel Sheet Column Number',
        difficulty: 'easy',
        description: 'Convert a column title as it appears in an Excel sheet to its corresponding column number.',
        externalUrl: 'https://leetcode.com/problems/excel-sheet-column-number/'
      },
      {
        id: 'factorial-trailing-zeroes',
        title: 'Factorial Trailing Zeroes',
        difficulty: 'medium',
        description: 'Find the number of trailing zeroes in n factorial.',
        externalUrl: 'https://leetcode.com/problems/factorial-trailing-zeroes/'
      }
    ]
  },

  {
    id: 'advanced-topics',
    title: 'Advanced Topics',
    description: 'Specialized algorithms and techniques for complex problems.',
    icon: '🚀',
    color: '#c026d3',
    prerequisites: ['dynamic-programming', 'graphs'],
    estimatedHours: 40,
    subtopics: [
      {
        id: 'mos-algorithm',
        title: 'Mo\'s Algorithm',
        description: 'Efficiently processing offline range queries.',
        contentPath: 'advanced/mos-algorithm.md',
        visualizerId: 'mos-algorithm-visualization'
      },
      {
        id: 'heavy-light-decomposition',
        title: 'Heavy-Light Decomposition',
        description: 'Breaking a tree into paths for efficient operations.',
        contentPath: 'advanced/heavy-light.md',
        visualizerId: 'heavy-light-visualization'
      },
      {
        id: 'centroid-decomposition',
        title: 'Centroid Decomposition',
        description: 'Recursive partitioning of a tree based on centroids.',
        contentPath: 'advanced/centroid.md',
        visualizerId: 'centroid-decomposition-visualization'
      },
      {
        id: 'sqrt-decomposition',
        title: 'Sqrt Decomposition',
        description: 'Breaking data into blocks for faster queries.',
        contentPath: 'advanced/sqrt-decomposition.md',
        visualizerId: 'sqrt-decomposition-visualization'
      },
      {
        id: 'segment-tree-lazy',
        title: 'Segment Tree with Lazy Prop',
        description: 'Efficient range updates and queries using lazy propagation.',
        contentPath: 'advanced/segment-tree-lazy.md',
        visualizerId: 'segment-tree-lazy-visualization'
      },
      {
        id: 'persistent-segment-tree',
        title: 'Persistent Segment Tree',
        description: 'Maintaining multiple versions of a segment tree.',
        contentPath: 'advanced/persistent-segment-tree.md',
        visualizerId: 'persistent-segment-tree-visualization'
      }
    ],
    problems: [
      {
        id: 'range-sum-query-mutable',
        title: 'Range Sum Query - Mutable',
        difficulty: 'medium',
        description: 'Find the sum of elements in a range with updates to the array.',
        externalUrl: 'https://leetcode.com/problems/range-sum-query-mutable/'
      },
      {
        id: 'lca-of-binary-tree',
        title: 'Lowest Common Ancestor of a Binary Tree',
        difficulty: 'medium',
        description: 'Find the lowest common ancestor of two nodes in a binary tree.',
        externalUrl: 'https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/'
      },
      {
        id: 'count-of-range-sum',
        title: 'Count of Range Sum',
        difficulty: 'hard',
        description: 'Count the number of range sums that lie in a given range.',
        externalUrl: 'https://leetcode.com/problems/count-of-range-sum/'
      },
      {
        id: 'sliding-window-median',
        title: 'Sliding Window Median',
        difficulty: 'hard',
        description: 'Find the median in a sliding window of integers.',
        externalUrl: 'https://leetcode.com/problems/sliding-window-median/'
      }
    ]
  },

  {
    id: 'concurrency',
    title: 'Concurrency / Locks',
    description: 'Handle multiple operations executing simultaneously.',
    icon: '🔒',
    color: '#64748b',
    prerequisites: ['basics-foundations'],
    estimatedHours: 10,
    subtopics: [
      {
        id: 'producer-consumer',
        title: 'Producer Consumer Problem',
        description: 'Synchronizing multiple processes sharing a common resource.',
        contentPath: 'concurrency/producer-consumer.md',
        visualizerId: 'producer-consumer-visualization'
      },
      {
        id: 'mutex-semaphore',
        title: 'Mutex vs Semaphore',
        description: 'Understanding different synchronization primitives.',
        contentPath: 'concurrency/mutex-semaphore.md'
      },
      {
        id: 'deadlock',
        title: 'Deadlock & Prevention',
        description: 'Identifying and preventing deadlock situations.',
        contentPath: 'concurrency/deadlock.md',
        visualizerId: 'deadlock-visualization'
      }
    ],
    problems: [
      {
        id: 'print-in-order',
        title: 'Print in Order',
        difficulty: 'easy',
        description: 'Print a sequence of strings in a specific order using concurrent functions.',
        externalUrl: 'https://leetcode.com/problems/print-in-order/'
      },
      {
        id: 'print-foobar-alternately',
        title: 'Print FooBar Alternately',
        difficulty: 'medium',
        description: 'Print FooBar alternatively using two threads.',
        externalUrl: 'https://leetcode.com/problems/print-foobar-alternately/'
      },
      {
        id: 'building-h2o',
        title: 'Building H2O',
        difficulty: 'medium',
        description: 'Build water molecules using hydrogen and oxygen atoms.',
        externalUrl: 'https://leetcode.com/problems/building-h2o/'
      },
      {
        id: 'fizz-buzz-multithreaded',
        title: 'Fizz Buzz Multithreaded',
        difficulty: 'medium',
        description: 'Implement the FizzBuzz problem with multiple threads.',
        externalUrl: 'https://leetcode.com/problems/fizz-buzz-multithreaded/'
      }
    ]
  }
];