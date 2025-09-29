/* 

Q1: Iterator

👉 Create a function makeIterator(arr) that takes an array and returns a custom iterator object with a .next() method.

When called with ["x","y"], it should output:

{ value: "x", done: false }
{ value: "y", done: false }
{ value: undefined, done: true }

Q2: Iterable

👉 Create an object counter that is iterable but not an iterator.

It should use [Symbol.iterator]() to return a new iterator each time.

When used in for...of counter, it should print numbers 1,2,3 only once per loop.

Q3: Generator

👉 Write a generator function fibonacci(n) that yields the first n numbers of the Fibonacci sequence.

Example:

[...fibonacci(5)] // [0,1,1,2,3]

Q4: Iterable Iterator

👉 Make an object range(start, end) that is both iterable and an iterator (like a generator object).

It should have .next() and [Symbol.iterator]() returning this.

Example:

for (const x of range(3, 6)) {
  console.log(x); // 3,4,5
}

*/



////////////////////////////////////////// Answers //////////////////////////////////////////

// Q1 
function makeIterator(arr) {
  let index = 0;
  return {
    next() {
      if (index < arr.length) {
        return { value: arr[index++], done: false };
      } else {
        return { value: undefined, done: true };
      }
    },
  };
}


// Q2

const counter = {
  [Symbol.iterator]() {
    let current = 1;
    return {
      next: () => {
        if (current < 4) {
          return { value: current++, done: false };
        } else {
          return { value: undefined, done: true };
        }
      },
    };
  },
};

const counter2 = {
  current: 1,
  [Symbol.iterator]() {
    return {
      next: () => {
        if (this.current < 4) {
          return { value: this.current++, done: false };
        } else {
          this.current = 1;
          return { value: undefined, done: true };
        }
      },
    };
  },
};


// Q3

function* fibonacci(n) {
  let a = 0,
    b = 1;
  for (let i = 0; i < n; i++) {
    yield a;
    [a, b] = [b, a + b];
  }
}


// Q4

// not resetting 
function range(start, end) {
  return {
    next() {
      if (start < end) {
        return { value: start++, done: false };
      } else {
        return { value: undefined, done: true };
      }
    },
    [Symbol.iterator]() {
      return this;
    },
  };
}

// resetting

function range(start, end) {
  return {
    current: start,
    next() {
      if (this.current < end) {
        return { value: this.current++, done: false };
      } else {
        this.current = start;
        return { value: undefined, done: true };
      }
    },
    [Symbol.iterator]() {
      return this;
    },
  };
}