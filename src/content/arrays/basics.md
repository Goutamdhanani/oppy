# Array Basics

Arrays are the most fundamental data structure in computer science. They store elements in contiguous memory locations, allowing for efficient access using indices.

## Overview

An array is a collection of items stored at contiguous memory locations. The idea is to store multiple items of the same type together. This makes it easier to calculate the position of each element by simply adding an offset to a base value.

## Creating Arrays

### JavaScript

```javascript
// Creating an array
const numbers = [1, 2, 3, 4, 5];

// Creating an empty array and adding elements
const fruits = [];
fruits.push('Apple');
fruits.push('Banana');
fruits.push('Orange');

// Creating an array with a specified size
const grid = new Array(10).fill(0);
```

### Python

```python
# Creating an array
numbers = [1, 2, 3, 4, 5]

# Creating an empty array and adding elements
fruits = []
fruits.append('Apple')
fruits.append('Banana')
fruits.append('Orange')

# Creating an array with a specified size
grid = [0] * 10
```

## Accessing Elements

Elements in an array can be accessed using their index. Array indices typically start at 0.

### JavaScript

```javascript
const fruits = ['Apple', 'Banana', 'Orange'];

// Accessing elements
console.log(fruits[0]); // Output: Apple
console.log(fruits[1]); // Output: Banana
console.log(fruits[2]); // Output: Orange

// Accessing an element out of bounds
console.log(fruits[3]); // Output: undefined
```

### Python

```python
fruits = ['Apple', 'Banana', 'Orange']

# Accessing elements
print(fruits[0])  # Output: Apple
print(fruits[1])  # Output: Banana
print(fruits[2])  # Output: Orange

# Accessing an element out of bounds
# print(fruits[3])  # Raises IndexError: list index out of range
```

## Basic Operations

Arrays support several basic operations:

### 1. Insertion

Adding elements to an array.

```javascript
const numbers = [1, 2, 3];

// Insert at the end
numbers.push(4);  // [1, 2, 3, 4]

// Insert at the beginning
numbers.unshift(0);  // [0, 1, 2, 3, 4]

// Insert at a specific position
numbers.splice(2, 0, 1.5);  // [0, 1, 1.5, 2, 3, 4]
```

### 2. Deletion

Removing elements from an array.

```javascript
const numbers = [0, 1, 1.5, 2, 3, 4];

// Remove from the end
numbers.pop();  // [0, 1, 1.5, 2, 3]

// Remove from the beginning
numbers.shift();  // [1, 1.5, 2, 3]

// Remove from a specific position
numbers.splice(1, 1);  // [1, 2, 3]
```

### 3. Search

Finding elements in an array.

```javascript
const numbers = [1, 2, 3, 4, 5];

// Find the index of an element
const index = numbers.indexOf(3);  // 2

// Check if an element exists
const exists = numbers.includes(6);  // false

// Find elements that satisfy a condition
const evenNumbers = numbers.filter(num => num % 2 === 0);  // [2, 4]
```

## Time Complexity

Understanding the time complexity of array operations is crucial:

| Operation | Time Complexity |
|-----------|----------------|
| Access    | O(1)           |
| Search    | O(n)           |
| Insertion | O(n)           |
| Deletion  | O(n)           |

Access is constant time because arrays provide direct access to elements through indices. Other operations may require shifting elements, resulting in linear time complexity.

## Memory Usage

Arrays use contiguous memory blocks, which makes them memory-efficient for storing collections of the same data type. However, they require a fixed allocation of memory at creation time in many languages.

## Common Pitfalls

1. **Out of bounds access**: Attempting to access an index beyond the array's length can cause errors or undefined behavior.
2. **Fixed size in some languages**: In languages like Java and C, arrays have a fixed size once created.
3. **Inefficient insertion/deletion**: Adding or removing elements may require shifting many elements.

## Key Takeaways

- Arrays store elements in contiguous memory locations
- They provide constant-time access to elements using indices
- Basic operations include insertion, deletion, and search
- Arrays are fundamental to many algorithms and data structures

## Practice

Try creating arrays and performing basic operations in the code editor below. Experiment with different methods and see how they affect the array's content.