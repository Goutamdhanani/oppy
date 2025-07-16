export interface Subtopic {
    id: string;
    title: string;
    description: string;
    contentPath: string;
    visualizerId?: string;
  }
  
  export interface Problem {
    id: string;
    title: string;
    difficulty: 'easy' | 'medium' | 'hard';
    description: string;
    externalUrl?: string;
  }
  
  export interface Topic {
    id: string;
    title: string;
    description: string;
    icon: string;
    color: string;
    prerequisites: string[];
    subtopics: Subtopic[];
    problems: Problem[];
    estimatedHours: number;
  }
  
  export const topicsData: Topic[] = [
    {
      id: 'arrays',
      title: 'Arrays',
      description: 'The foundation of data structures. Learn about array operations, traversal, and manipulation.',
      icon: '📊',
      color: '#4f46e5',
      prerequisites: [],
      estimatedHours: 4,
      subtopics: [
        {
          id: 'array-basics',
          title: 'Array Basics',
          description: 'Learn about array creation, access, and basic operations',
          contentPath: 'arrays/basics.md',
        },
        {
          id: 'array-traversal',
          title: 'Array Traversal',
          description: 'Different ways to iterate through arrays',
          contentPath: 'arrays/traversal.md',
          visualizerId: 'array-traversal',
        },
        {
          id: 'array-manipulation',
          title: 'Array Manipulation',
          description: 'Insertion, deletion, and updating array elements',
          contentPath: 'arrays/manipulation.md',
          visualizerId: 'array-manipulation',
        },
        {
          id: 'array-searching',
          title: 'Searching in Arrays',
          description: 'Linear and binary search algorithms',
          contentPath: 'arrays/searching.md',
          visualizerId: 'array-search',
        },
      ],
      problems: [
        {
          id: 'two-sum',
          title: 'Two Sum',
          difficulty: 'easy',
          description: 'Find two numbers in an array that add up to a target value.',
          externalUrl: 'https://leetcode.com/problems/two-sum/',
        },
        {
          id: 'max-subarray',
          title: 'Maximum Subarray',
          difficulty: 'medium',
          description: 'Find the contiguous subarray with the largest sum.',
          externalUrl: 'https://leetcode.com/problems/maximum-subarray/',
        },
        {
          id: 'merge-sorted-arrays',
          title: 'Merge Sorted Arrays',
          difficulty: 'easy',
          description: 'Merge two sorted arrays into one sorted array.',
          externalUrl: 'https://leetcode.com/problems/merge-sorted-array/',
        },
      ],
    },
    {
      id: 'linked-lists',
      title: 'Linked Lists',
      description: 'A linear data structure where elements are not stored in contiguous memory locations.',
      icon: '🔗',
      color: '#06b6d4',
      prerequisites: ['arrays'],
      estimatedHours: 5,
      subtopics: [
        {
          id: 'linked-list-basics',
          title: 'Linked List Basics',
          description: 'Introduction to linked lists and their structure',
          contentPath: 'linked-lists/basics.md',
        },
        {
          id: 'singly-linked-list',
          title: 'Singly Linked List',
          description: 'Implementation and operations on singly linked lists',
          contentPath: 'linked-lists/singly.md',
          visualizerId: 'singly-linked-list',
        },
        {
          id: 'doubly-linked-list',
          title: 'Doubly Linked List',
          description: 'Implementation and operations on doubly linked lists',
          contentPath: 'linked-lists/doubly.md',
          visualizerId: 'doubly-linked-list',
        },
        {
          id: 'circular-linked-list',
          title: 'Circular Linked List',
          description: 'Implementation and use cases of circular linked lists',
          contentPath: 'linked-lists/circular.md',
          visualizerId: 'circular-linked-list',
        },
      ],
      problems: [
        {
          id: 'reverse-linked-list',
          title: 'Reverse Linked List',
          difficulty: 'easy',
          description: 'Reverse a singly linked list.',
          externalUrl: 'https://leetcode.com/problems/reverse-linked-list/',
        },
        {
          id: 'detect-cycle',
          title: 'Linked List Cycle',
          difficulty: 'easy',
          description: 'Detect if a linked list has a cycle.',
          externalUrl: 'https://leetcode.com/problems/linked-list-cycle/',
        },
        {
          id: 'merge-sorted-lists',
          title: 'Merge Two Sorted Lists',
          difficulty: 'easy',
          description: 'Merge two sorted linked lists into one sorted list.',
          externalUrl: 'https://leetcode.com/problems/merge-two-sorted-lists/',
        },
      ],
    },
    {
      id: 'stacks',
      title: 'Stacks',
      description: 'A linear data structure that follows the Last In First Out (LIFO) principle.',
      icon: '📚',
      color: '#22c55e',
      prerequisites: ['arrays', 'linked-lists'],
      estimatedHours: 3,
      subtopics: [
        {
          id: 'stack-basics',
          title: 'Stack Basics',
          description: 'Introduction to stacks and their operations',
          contentPath: 'stacks/basics.md',
        },
        {
          id: 'stack-implementation',
          title: 'Stack Implementation',
          description: 'Implementing stacks using arrays and linked lists',
          contentPath: 'stacks/implementation.md',
          visualizerId: 'stack-operations',
        },
        {
          id: 'stack-applications',
          title: 'Stack Applications',
          description: 'Common applications of stacks in algorithms',
          contentPath: 'stacks/applications.md',
        },
      ],
      problems: [
        {
          id: 'valid-parentheses',
          title: 'Valid Parentheses',
          difficulty: 'easy',
          description: 'Determine if a string of parentheses is valid.',
          externalUrl: 'https://leetcode.com/problems/valid-parentheses/',
        },
        {
          id: 'min-stack',
          title: 'Min Stack',
          difficulty: 'medium',
          description: 'Design a stack that supports push, pop, top, and retrieving the minimum element.',
          externalUrl: 'https://leetcode.com/problems/min-stack/',
        },
        {
          id: 'evaluate-rpn',
          title: 'Evaluate Reverse Polish Notation',
          difficulty: 'medium',
          description: 'Evaluate the value of an arithmetic expression in Reverse Polish Notation.',
          externalUrl: 'https://leetcode.com/problems/evaluate-reverse-polish-notation/',
        },
      ],
    },
    {
      id: 'queues',
      title: 'Queues',
      description: 'A linear data structure that follows the First In First Out (FIFO) principle.',
      icon: '🎟️',
      color: '#f59e0b',
      prerequisites: ['arrays', 'linked-lists'],
      estimatedHours: 3,
      subtopics: [
        {
          id: 'queue-basics',
          title: 'Queue Basics',
          description: 'Introduction to queues and their operations',
          contentPath: 'queues/basics.md',
        },
        {
          id: 'queue-implementation',
          title: 'Queue Implementation',
          description: 'Implementing queues using arrays and linked lists',
          contentPath: 'queues/implementation.md',
          visualizerId: 'queue-operations',
        },
        {
          id: 'queue-applications',
          title: 'Queue Applications',
          description: 'Common applications of queues in algorithms',
          contentPath: 'queues/applications.md',
        },
      ],
      problems: [
        {
          id: 'implement-queue-with-stacks',
          title: 'Implement Queue using Stacks',
          difficulty: 'easy',
          description: 'Implement a queue using only two stacks.',
          externalUrl: 'https://leetcode.com/problems/implement-queue-using-stacks/',
        },
        {
          id: 'circular-queue',
          title: 'Design Circular Queue',
          difficulty: 'medium',
          description: 'Design your implementation of the circular queue.',
          externalUrl: 'https://leetcode.com/problems/design-circular-queue/',
        },
        {
          id: 'sliding-window-maximum',
          title: 'Sliding Window Maximum',
          difficulty: 'hard',
          description: 'Find the maximum element in each sliding window of size k.',
          externalUrl: 'https://leetcode.com/problems/sliding-window-maximum/',
        },
      ],
    },
    {
      id: 'trees',
      title: 'Trees',
      description: 'A hierarchical data structure consisting of nodes connected by edges.',
      icon: '🌳',
      color: '#ef4444',
      prerequisites: ['stacks', 'queues'],
      estimatedHours: 6,
      subtopics: [
        {
          id: 'tree-basics',
          title: 'Tree Basics',
          description: 'Introduction to trees and their terminology',
          contentPath: 'trees/basics.md',
        },
        {
          id: 'binary-trees',
          title: 'Binary Trees',
          description: 'Implementation and operations on binary trees',
          contentPath: 'trees/binary.md',
          visualizerId: 'binary-tree',
        },
        {
          id: 'tree-traversal',
          title: 'Tree Traversal',
          description: 'Different ways to traverse trees (pre-order, in-order, post-order)',
          contentPath: 'trees/traversal.md',
          visualizerId: 'tree-traversal',
        },
        {
          id: 'binary-search-trees',
          title: 'Binary Search Trees',
          description: 'Implementation and operations on binary search trees',
          contentPath: 'trees/bst.md',
          visualizerId: 'binary-search-tree',
        },
      ],
      problems: [
        {
          id: 'max-depth',
          title: 'Maximum Depth of Binary Tree',
          difficulty: 'easy',
          description: 'Find the maximum depth of a binary tree.',
          externalUrl: 'https://leetcode.com/problems/maximum-depth-of-binary-tree/',
        },
        {
          id: 'validate-bst',
          title: 'Validate Binary Search Tree',
          difficulty: 'medium',
          description: 'Determine if a binary tree is a valid binary search tree.',
          externalUrl: 'https://leetcode.com/problems/validate-binary-search-tree/',
        },
        {
          id: 'level-order-traversal',
          title: 'Binary Tree Level Order Traversal',
          difficulty: 'medium',
          description: 'Return the level order traversal of a binary trees values.',
          externalUrl: 'https://leetcode.com/problems/binary-tree-level-order-traversal/',
        },
      ],
    },
  ];