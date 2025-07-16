export interface Algorithm {
    id: string;
    title: string;
    category: string;
    description: string;
    timeComplexity: string;
    spaceComplexity: string;
    pseudocode: string;
    implementation: string;
    animationSteps: any[];
    relatedTopicId: string;
  }
  
  export const algorithmsData: Algorithm[] = [
    {
      id: 'array-traversal',
      title: 'Array Traversal',
      category: 'arrays',
      description: 'Traverse through an array to access and process each element.',
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)',
      pseudocode: `function traverseArray(arr):
    for i from 0 to arr.length - 1:
      process(arr[i])
    end for
  end function`,
      implementation: `function traverseArray(arr) {
    for (let i = 0; i < arr.length; i++) {
      console.log(arr[i]);
    }
  }`,
      animationSteps: [], // Will be populated by the visualizer
      relatedTopicId: 'arrays',
    },
    {
      id: 'array-search',
      title: 'Binary Search',
      category: 'arrays',
      description: 'Search for an element in a sorted array using binary search algorithm.',
      timeComplexity: 'O(log n)',
      spaceComplexity: 'O(1)',
      pseudocode: `function binarySearch(arr, target):
    left = 0
    right = arr.length - 1
    
    while left <= right:
      mid = floor((left + right) / 2)
      
      if arr[mid] == target:
        return mid
      else if arr[mid] < target:
        left = mid + 1
      else:
        right = mid - 1
    
    return -1
  end function`,
      implementation: `function binarySearch(arr, target) {
    let left = 0;
    let right = arr.length - 1;
    
    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      
      if (arr[mid] === target) {
        return mid;
      } else if (arr[mid] < target) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
    
    return -1;
  }`,
      animationSteps: [], // Will be populated by the visualizer
      relatedTopicId: 'arrays',
    },
    {
      id: 'singly-linked-list',
      title: 'Singly Linked List Operations',
      category: 'linked-lists',
      description: 'Basic operations on a singly linked list including insertion, deletion, and traversal.',
      timeComplexity: 'O(n) for search, O(1) for insertion at head',
      spaceComplexity: 'O(1)',
      pseudocode: `class Node:
    value
    next
    
  function insert(head, value):
    newNode = new Node(value)
    newNode.next = head
    return newNode
    
  function delete(head, value):
    if head is null:
      return null
    
    if head.value == value:
      return head.next
    
    current = head
    while current.next is not null and current.next.value != value:
      current = current.next
    
    if current.next is not null:
      current.next = current.next.next
    
    return head
    
  function traverse(head):
    current = head
    while current is not null:
      process(current.value)
      current = current.next
  `,
      implementation: `class Node {
    constructor(value) {
      this.value = value;
      this.next = null;
    }
  }
  
  function insertAtHead(head, value) {
    const newNode = new Node(value);
    newNode.next = head;
    return newNode;
  }
  
  function deleteNode(head, value) {
    if (!head) return null;
    
    if (head.value === value) {
      return head.next;
    }
    
    let current = head;
    while (current.next && current.next.value !== value) {
      current = current.next;
    }
    
    if (current.next) {
      current.next = current.next.next;
    }
    
    return head;
  }
  
  function traverseList(head) {
    let current = head;
    while (current) {
      console.log(current.value);
      current = current.next;
    }
  }`,
      animationSteps: [], // Will be populated by the visualizer
      relatedTopicId: 'linked-lists',
    },
    {
      id: 'stack-operations',
      title: 'Stack Operations',
      category: 'stacks',
      description: 'Basic operations on a stack including push, pop, and peek.',
      timeComplexity: 'O(1) for all operations',
      spaceComplexity: 'O(n)',
      pseudocode: `class Stack:
    items = []
    
    function push(value):
      items.append(value)
    
    function pop():
      if items is empty:
        return null
      return items.removeLast()
    
    function peek():
      if items is empty:
        return null
      return items[items.length - 1]
    
    function isEmpty():
      return items.length == 0
  `,
      implementation: `class Stack {
    constructor() {
      this.items = [];
    }
    
    push(value) {
      this.items.push(value);
    }
    
    pop() {
      if (this.isEmpty()) {
        return null;
      }
      return this.items.pop();
    }
    
    peek() {
      if (this.isEmpty()) {
        return null;
      }
      return this.items[this.items.length - 1];
    }
    
    isEmpty() {
      return this.items.length === 0;
    }
  }`,
      animationSteps: [], // Will be populated by the visualizer
      relatedTopicId: 'stacks',
    },
    {
      id: 'queue-operations',
      title: 'Queue Operations',
      category: 'queues',
      description: 'Basic operations on a queue including enqueue, dequeue, and peek.',
      timeComplexity: 'O(1) for all operations',
      spaceComplexity: 'O(n)',
      pseudocode: `class Queue:
    items = []
    
    function enqueue(value):
      items.append(value)
    
    function dequeue():
      if items is empty:
        return null
      return items.removeFirst()
    
    function peek():
      if items is empty:
        return null
      return items[0]
    
    function isEmpty():
      return items.length == 0
  `,
      implementation: `class Queue {
    constructor() {
      this.items = [];
    }
    
    enqueue(value) {
      this.items.push(value);
    }
    
    dequeue() {
      if (this.isEmpty()) {
        return null;
      }
      return this.items.shift();
    }
    
    peek() {
      if (this.isEmpty()) {
        return null;
      }
      return this.items[0];
    }
    
    isEmpty() {
      return this.items.length === 0;
    }
  }`,
      animationSteps: [], // Will be populated by the visualizer
      relatedTopicId: 'queues',
    },
    {
      id: 'tree-traversal',
      title: 'Tree Traversal',
      category: 'trees',
      description: 'Different ways to traverse a binary tree: pre-order, in-order, and post-order.',
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(h) where h is the height of the tree',
      pseudocode: `function preOrderTraversal(node):
    if node is null:
      return
    
    process(node.value)
    preOrderTraversal(node.left)
    preOrderTraversal(node.right)
  
  function inOrderTraversal(node):
    if node is null:
      return
    
    inOrderTraversal(node.left)
    process(node.value)
    inOrderTraversal(node.right)
  
  function postOrderTraversal(node):
    if node is null:
      return
    
    postOrderTraversal(node.left)
    postOrderTraversal(node.right)
    process(node.value)
  `,
      implementation: `function preOrderTraversal(node) {
    if (!node) return;
    
    console.log(node.value);
    preOrderTraversal(node.left);
    preOrderTraversal(node.right);
  }
  
  function inOrderTraversal(node) {
    if (!node) return;
    
    inOrderTraversal(node.left);
    console.log(node.value);
    inOrderTraversal(node.right);
  }
  
  function postOrderTraversal(node) {
    if (!node) return;
    
    postOrderTraversal(node.left);
    postOrderTraversal(node.right);
    console.log(node.value);
  }`,
      animationSteps: [], // Will be populated by the visualizer
      relatedTopicId: 'trees',
    },
  ];