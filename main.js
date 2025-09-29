// creating objects

// 1. Object literal - most common way
const o1 = {};

// 2. Object constructor
const o2 = new Object();

// 3. Object.create() - creates object with specified prototype
const o3 = Object.create({}); // the arg is the prototype of the new object

// 4. Using a class (ES6+)
class MyClass {
  constructor() {
    this.prop = "value";
  }
}
const o4 = new MyClass();

// 5. Using a function constructor (pre-ES6)
function MyFunc() {
  this.prop = "value";
}
const o5 = new MyFunc();

// 6. Using Object.assign() to clone or merge objects
const o6 = Object.assign({}, { a: 1, b: 2 });

// 7. Using JSON.parse() for deep cloning (from JSON string)
const o7 = JSON.parse('{"x":10,"y":20}');

// 8. Using Object.fromEntries() (ES2019+)
const o8 = Object.fromEntries([
  ["key", "value"],
  ["foo", "bar"],
]);

console.log(o1, o2, o3, o4, o5, o6, o7, o8);

// key of object is always a string or a symbol

o1[30] = 30;
o1["30"] = 50;

console.log(o1); // { '30': 50 } - keys are always strings

//---------------------

/*

class
A blueprint for creating objects It groups data (properties) and behavior (methods) together Example

class Person {
  constructor(name) {
    this.name = name;
  }
}


constructor
A special method inside a class that runs when a new object is created with new It initializes the object’s properties

class Person {
  constructor(name) {
    this.name = name;
  }
}
const p = new Person("Ali"); // constructor is called


super
A keyword used to call the constructor or methods of a parent class

class Animal {
  constructor(type) {
    this.type = type;
  }
}
class Dog extends Animal {
  constructor(name) {
    super("dog"); // calls Animal constructor
    this.name = name;
  }
}


static methods and properties
are individual pieces of data and methods that belongs to the class itself and called on it, not on instances of the class.

class MathHelper {
  static pi = 3.14;             // static property
  static add(a, b) { return a + b; } // static method
}
console.log(MathHelper.pi);
console.log(MathHelper.add(2, 3));


instance methods
Functions defined inside a class that belong to the objects created from it

class Car {
  drive() {
    console.log("Driving...");
  }
}
const c = new Car();
c.drive(); // instance method call


inheritance
The mechanism that allows one class to extend another and reuse its properties and methods Done with the extends keyword

class Animal {
  speak() {
    console.log("Animal sound");
  }
}
class Cat extends Animal {
  speak() {
    console.log("Meow");
  }
}
const kitty = new Cat();
kitty.speak(); // Meow

*/

/*  instance methods are methods that belongs to the object (instance) created from the class
 static method methods belong to the class not the instances (objects) created from the class



 "this" in static refers to the class itself
 "this" in instance methods refers to the instance (object) created from the class */

/* 

getter
A special method that lets you access a property value like it were a normal field but the value is actually computed or returned from a function It is defined with the keyword get

class Person {
  constructor(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
  }

  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }
}

const p = new Person("Ali", "Saleh");
console.log(p.fullName); // Ali Saleh (getter is called like a property)


setter
A special method that lets you assign a property value like it were a normal field but behind the scenes the function runs and handles the assignment or validation It is defined with the keyword set

class Person {
  constructor(name) {
    this._name = name; // use _ to avoid recursion with the setter
  }

  get name() {
    return this._name;
  }

  set name(newName) {
    if (newName.length < 3) {
      throw new Error("Name too short");
    }
    this._name = newName;
  }
}

const p = new Person("Ali");
console.log(p.name); // Ali (getter called)
p.name = "Omar";     // setter called
console.log(p.name); // Omar

*/

/* 


Public fields and methods

Definition
Public fields and methods can be accessed from anywhere (inside the class, outside the class, or by instances).

Syntax
They are written normally without any special prefix.

Example

class Person {
  name; // public field

  constructor(name) {
    this.name = name;
  }

  greet() { // public method
    console.log(`Hello, I am ${this.name}`);
  }
}

const p = new Person("Ali");
console.log(p.name); // Ali (accessible)
p.greet();           // Hello, I am Ali

Private fields and methods

Definition
Private fields and methods are only accessible inside the class where they are defined. They cannot be accessed directly from outside.

Syntax
They are prefixed with #.

Example

class BankAccount {
  #balance = 0; // private field

  constructor(owner) {
    this.owner = owner;
  }

  deposit(amount) { // public method
    this.#increaseBalance(amount);
  }

  #increaseBalance(amount) { // private method
    this.#balance += amount;
  }

  getBalance() {
    return this.#balance;
  }
}

const account = new BankAccount("Omar");
account.deposit(100);
console.log(account.getBalance()); // 100
console.log(account.#balance);     // ❌ SyntaxError (cannot access private field)

*/

/* 

static initialization blocks 


class MyClass {
  static myStaticProperty;
  
  static {
    // This block runs once when the class is defined
    MyClass.myStaticProperty = "Initialized Value";
    console.log("Static block executed");
  }
}


the block runs once when the class is first evaluated, allowing you to set up static properties or perform one-time setup tasks for the class
it doesnt run when instances are created



a static block is a special block inside a class marked with static { ... }

it runs once when the class is evaluated (loaded)
it can initialize or compute values for static properties
it can contain any code (loops, if statements, function calls, etc)
it has access to this (refers to the class itself)

multiple blocks

you can declare more than one static block in the same class
they run in order of appearance



*/

/* 



 
 
 the left of the dot rule in JavaScript is a simple way to remember what this refers to

👉 rule:
whatever is left of the dot . when you call a function determines the value of this inside that function

examples
const person = {
  name: "Ali",
  greet() {
    console.log(this.name);
  }
};

person.greet(); // "Ali"
// left of the dot is `person` → so `this = person`

const greetFn = person.greet;
greetFn(); 
// left of the dot is nothing (just a normal function call) → `this = undefined` (in strict mode) or `window` (in sloppy mode)

const other = { name: "Omar", greet: person.greet };
other.greet(); // "Omar"
// left of the dot is `other` → so `this = other`

special cases

Arrow functions ignore the left of the dot rule
they don’t have their own this, instead they use the this of the surrounding scope

const obj = {
  name: "Ali",
  greet: () => {
    console.log(this.name);
  }
};

obj.greet(); // undefined (arrow uses outer scope `this`, not `obj`)


Call / Apply / Bind override the rule explicitly

person.greet.call({ name: "Sara" }); // "Sara"
 
 
 */

/* 

key difference
normal function → this is decided every time you call it (who is left of the dot)
arrow function → this is locked to whatever it was in the place the arrow was created

*/

/* 

function Outer() {
  this.value = "I am from Outer";

  // normal function
  this.normal = function () {
    console.log("normal:", this.value);
  };

  // arrow function
  this.arrow = () => {
    console.log("arrow:", this.value);
  };
}

const outer = new Outer();

// call both normally
outer.normal(); // normal: I am from Outer
outer.arrow();  // arrow: I am from Outer

// extract the methods into variables
const n = outer.normal;
const a = outer.arrow;

n(); // normal: undefined  (lost its "this")
a(); // arrow: I am from Outer (still remembers outer's this!)

*/

/* 
why the value of this of isolated(detached) method defined in class differ from isolated method defined in object?

Classes automatically run in strict mode, so this in a detached class method is always undefined
Objects are not strict by default, so in sloppy mode a detached object method will use the global object (window) instead of undefined
That’s why you might see a difference



*/

/* 

ways to force setting "this" in a method (call, apply, bind)

call → runs now, arguments listed normally
apply → runs now, arguments given in an array
bind → does not run now, makes a new function with this locked forever

function show() {
  console.log(this.name);
}

const obj1 = { name: "Ali" };
const obj2 = { name: "Sara" };

const bound1 = show.bind(obj1);
const bound2 = show.bind(obj2);

show.call(obj2);   // Sara   (original can still be rebound)
bound1.call(obj2); // Ali    (ignored, bound1 is locked to obj1)
bound2.call(obj1); // Sara   (ignored, bound2 is locked to obj2)

----------------------------

function show() {
  console.log(this.name);
}

const obj1 = { name: "Ali" };
const obj2 = { name: "Sara" };

const result = show.bind(obj1).bind(obj2);

result(); // ??? // Ali - still bound to obj1, second bind is ignored




*/

/* 

Event listeners handlers or callback and "this"
In event listeners, this refers to the element that received the event  

Timers and "this"
In timer callbacks (setTimeout, setInterval), this is undefined in strict mode or the global object in sloppy mode. To preserve this, use an arrow function or bind.

Callback (map, filter, etc) functions and "this"
When passing methods as callbacks, this can be lost. Use bind or arrow functions to maintain the correct this context.


*/

/* 

new Array()
new Object()
new Dog("kiki",1.5)


the new keyword
When you use new with a function, it does the following:

1.Creates a blank object in memory
2.Links the new object’s internal prototype (__proto__) to the constructor’s .prototype property
3.Binds "this" inside the constructor to that new object
4.Executes the constructor function (passing any arguments you supplied)
5.Returns the newly created object (unless the constructor explicitly returns another object)



constructor function => function is used to create object in JS
function Dog(name, age){
   this.name = name;
   this.age = age;
}

Dog("kiki",1.5) => gets undefined , this refers to window or global object
new Dog("kiki",1.5) => creates a new object with name and age properties {name: "kiki", age: 1.5} and this refers to the object 


then the keyword this 
create new blank object in the memory 
(create link to the object's prototype)
links the new objects __proto__ to the constructors .prototype property 
bind this to the new object 
execute the constructor function 
returns the newly created object 

*/

/* 

1 Method on the prototype
function Dog(name, age) {
  this.name = name
  this.age = age
}
Dog.prototype.bark = function() {
  return `${this.name} says woof`
}

const d1 = new Dog("kiki", 1.5)
const d2 = new Dog("koko", 2)


bark lives once on Dog.prototype

Every instance (d1, d2) shares the same single function object

More memory efficient, better for performance when many instances are created

Typical OOP pattern in JS

2 Method inside constructor
function Dog(name, age) {
  this.name = name
  this.age = age
  this.bark = function() {
    return `${this.name} says woof`
  }
}

const d1 = new Dog("kiki", 1.5)
const d2 = new Dog("koko", 2)


bark is recreated separately for each new instance

Each dog has its own copy of the function in memory

Less efficient if you create many objects

But lets you have per-instance variations (you could change one dog’s bark without affecting others)


---------------------------

When you write a class like this

class Dog {
  constructor(name, age) {
    this.name = name
    this.age = age
  }

  bark() {
    return `${this.name} says woof`
  }
}


What JavaScript does under the hood is very similar to this constructor-function style

function Dog(name, age) {
  this.name = name
  this.age = age
}
Dog.prototype.bark = function() {
  return `${this.name} says woof`
}

Key points

Class methods (like bark) are automatically placed on Dog.prototype, not copied into each instance

They are also non-enumerable by default (won’t show in for...in loops)

The constructor inside the class is just a special method that becomes the function body of the class constructor

So classes are really syntactic sugar over constructor functions plus prototype assignments

*/

/* 

In “old JS” (before class syntax in ES2015) you had to wire inheritance manually with constructor functions and prototypes

Here’s the common pattern

1 Base constructor
function Animal(name) {
  this.name = name
}

Animal.prototype.eat = function() {
  return `${this.name} is eating`
}

2 Child constructor
function Dog(name, breed) {
  // call parent constructor to initialize properties
  Animal.call(this, name) 
  this.breed = breed
}

3 Link prototypes
Dog.prototype = Object.create(Animal.prototype) // inherit methods
Dog.prototype.constructor = Dog // fix constructor reference

//////////////////////////

NOTE

If you do
Dog.prototype = Animal.prototype


Both Dog and Animal now share the exact same prototype object
Any change you make to Dog.prototype also changes Animal.prototype (because they’re the same reference)
That breaks the idea of inheritance — you don’t want the child class polluting the parent

Correct way
Dog.prototype = Object.create(Animal.prototype)


Creates a new empty object whose internal [[Prototype]] points to Animal.prototype
So Dog.prototype inherits from Animal.prototype instead of being the same object
You can safely add dog-specific methods without touching the parent




/////////////////////

4 Add child-specific methods
Dog.prototype.bark = function() {
  return `${this.name} says woof`
}

5 Usage
const d1 = new Dog("kiki", "husky")
console.log(d1.eat())  // kiki is eating  (from Animal)
console.log(d1.bark()) // kiki says woof  (from Dog)




*/

/* 

You can set the prototype of a plain object literal in a couple of ways

1 Using Object.setPrototypeOf
const animal = {
  eat() { return "eating" }
}

const dog = {
  bark() { return "woof" }
}

Object.setPrototypeOf(dog, animal)

console.log(dog.bark()) // woof
console.log(dog.eat())  // eating (inherited)

2 Using __proto__ inside an object literal (old but still works)
const animal = {
  eat() { return "eating" }
}

const dog = {
  __proto__: animal,
  bark() { return "woof" }
}

console.log(dog.eat()) // eating

3 Using Object.create directly
const animal = {
  eat() { return "eating" }
}

const dog = Object.create(animal, {
  bark: {
    value: function() { return "woof" }
  }
})

console.log(dog.eat()) // eating




*/

/* 

The prototype chain is how JavaScript resolves properties and methods when you access them on an object

How it works
When you try to read a property (obj.prop)
JS first looks for prop directly on obj
If not found, it looks at obj.__proto__ (same as Object.getPrototypeOf(obj))
If still not found, it keeps walking “up” the chain to the prototype’s prototype
This continues until it reaches Object.prototype
If not found there, result is undefined

*/

/* 

?? prototypes are just objects where shared functionality lives 


*/

/* 

prototype

A property that exists only on constructor functions / classes
It’s an object used as a template for new instances created with new
Any methods you want all instances to share should be placed on prototype

function Dog(name) {
  this.name = name
}

Dog.prototype.bark = function() {
  return `${this.name} says woof`
}

const d1 = new Dog("kiki")
console.log(d1.bark()) // woof


Here Dog.prototype is where bark lives

__proto__

A property that exists on every object instance
It’s a reference to the object’s internal prototype (i.e. the constructor’s prototype)
Used for lookup when you access properties

const d1 = new Dog("kiki")

console.log(d1.__proto__ === Dog.prototype) // true


So __proto__ connects an object to the prototype chain

Quick analogy
prototype = blueprint (defined on constructor)
__proto__ = actual link that each object carries to its blueprint


*/

/* 

useful methods handling prototypes 

Object.create(prototype1,initialObj1)
Object.getPrototypeOf(obj)
Object.setPrototypeOf(obj1,prototype1)
obj1.isPrototypeOf(obj2)


*/

/* 
callback is simply a function that you pass into another function 
so that it can be called later when some work is finished
- functional programming patterns (filter, map, reducer)
- event driven programming (events handlers)
- asynchronous programming (timers, promises, async/await)


*/

/* 
javascript itself is single threaded because it runs on the event loop model

but it achieves concurrency through
async callbacks / promises / async await → non blocking code on the same thread
web apis (like setTimeout fetch etc) handled by the browser or nodejs runtime
web workers → allow true multithreading by running code in separate background threads with message passing
*/

/* 
single thread concurrency
js has one call stack (the main thread)
when you do setTimeout, fetch, or async i/o the heavy work is passed to browser or node runtime apis (not js itself)
when that finishes it pushes the callback back into the event queue
the event loop checks if the call stack is free and executes the callback
so all js code still runs on the single main thread




real multithreading

this is when multiple threads of execution run truly in parallel on different cpu cores
js cannot do this with callbacks alone
only web workers (browser) or worker_threads (node) give real multithreading
each worker has its own isolated js engine instance and runs on another os thread

so

callbacks promises async/await → concurrency on one thread (non-blocking)
web workers / worker_threads → true multithreading


*/

/* 

Callback hell (also called the pyramid of doom) happens in JavaScript when you have many nested callbacks, 
making the code deeply indented, messy, and hard to maintain or debug.


Each async function depends on the result of the previous one.
The nesting creates a pyramid shape with many }) at the end.
Hard to read, test, and handle errors.

Callback hell = too many nested callbacks
Solutions: named functions, Promises, or best → async/await  

// NOTE>> await keyword pauses the surrounding async function, not the whole JS engine

*/

/* 
PROMISES

Promises are the modern way to handle asynchronous operations
a Promise in JavaScript is an object that represents the eventual result of an asynchronous operation

definition
it acts like a placeholder for a value that will be available later (success or failure)
[[one time guarantee for a future value]]
it can be in one of three states

pending → the async work has not finished yet
fulfilled → the work finished successfully, a value is available
rejected → the work failed, an error reason is available


*/

/* 

Promise chaining means linking multiple asynchronous operations one after the other using .then() 
so that the output of one promise becomes the input for the next.


each .then() returns a new promise
if you return a value → it is passed to the next .then()
if you return another promise → the next .then() waits for it to resolve

promise chaining = sequential async flow


*/

/* 

async/await is modern JavaScript syntax (introduced in ES2017) built on top of Promises.
It makes asynchronous code look and behave more like synchronous code, improving readability.

definition
async before a function means the function will always return a Promise
await pauses execution inside an async function until the awaited Promise resolves (or rejects)

pros
Code looks sequential and easier to read
Error handling uses normal try/catch
Still non-blocking (event loop runs while waiting)

async/await = syntactic sugar over Promises
async makes a function return a Promise
await pauses only the async function until the Promise settles

*/

/* 

if the function is marked async, it always returns a Promise
If you return a normal value, it gets wrapped in a resolved Promise
async function fetchData() {
  return "data"
} 
// equivalent to
async function fetchData() {
  return Promise.resolve("data")
}


*/

/* 
ways to return a Promise



async function → auto promise
new Promise → manual
Promise.resolve / Promise.reject → quick
return from built-in APIs like fetch, fs.promises, etc
combinators (Promise.all, race, etc)
.then() → always returns a promise
async generators


*/

/* 

what Promise.resolve(p) does
if p is already a promise → it returns the same promise untouched
if p is just a plain value → it wraps it in a resolved promise

*/

/* 

you can chain three fetches in two main styles async/await and promise chaining with .then().catch()


with async/await
async function fetchSequential() {
  try {
    const res1 = await fetch("https://api.example.com/step1");
    const data1 = await res1.json();
    console.log("first:", data1);

    const res2 = await fetch("https://api.example.com/step2");
    const data2 = await res2.json();
    console.log("second:", data2);

    const res3 = await fetch("https://api.example.com/step3");
    const data3 = await res3.json();
    console.log("third:", data3);

  } catch (err) {
    console.error("error:", err);
  }
}

fetchSequential();


the await keyword pauses each step until the fetch is done
the try/catch handles any error along the way



with .then().catch()
fetch("https://api.example.com/step1")
  .then(res => res.json())
  .then(data1 => {
    console.log("first:", data1);
    return fetch("https://api.example.com/step2");
  })
  .then(res => res.json())
  .then(data2 => {
    console.log("second:", data2);
    return fetch("https://api.example.com/step3");
  })
  .then(res => res.json())
  .then(data3 => {
    console.log("third:", data3);
  })
  .catch(err => {
    console.error("error:", err);
  });


each .then returns a new promise so the next .then waits for it
the .catch at the end will capture any error from the whole chain



by default a single .catch() at the end of the chain will handle errors from anywhere in the chain but you can also handle errors step by step if you want more control
add .catch() after each fetch


fetch("https://api.example.com/step1")
  .then(res => res.json())
  .then(data1 => {
    console.log("first:", data1);
    return fetch("https://api.example.com/step2");
  })
  .catch(err => {
    console.error("error in step1:", err);
    // rethrow if you want to stop further steps
    throw err;
  })
  .then(res => res.json())
  .then(data2 => {
    console.log("second:", data2);
    return fetch("https://api.example.com/step3");
  })
  .catch(err => {
    console.error("error in step2:", err);
    throw err;
  })
  .then(res => res.json())
  .then(data3 => {
    console.log("third:", data3);
  })
  .catch(err => {
    console.error("error in step3:", err);
  });
*/

/* 

Promise combinator methods





Promise.all()
Definition: runs multiple promises in parallel and waits for all to fulfill

Behavior:
if all succeed → resolves to an array of results in order
if any one fails → rejects immediately (fail-fast)

Example
Promise.all([
  fetch("/a"),
  fetch("/b"),
  fetch("/c"),
])
  .then(([resA, resB, resC]) => console.log("all done"))
  .catch(err => console.error("one failed:", err));





Promise.allSettled()
Definition: runs multiple promises in parallel and waits for all to settle

Behavior:
never fail fast
returns an array of objects { status: "fulfilled", value } or { status: "rejected", reason }

Example
Promise.allSettled([
  fetch("/a"),
  fetch("/b"),
  fetch("/bad-url"),
])
  .then(results => {
    results.forEach(r => {
      if (r.status === "fulfilled") {
        console.log("ok:", r.value);
      } else {
        console.error("error:", r.reason);
      }
    });
  });





Promise.any()
Definition: runs multiple promises in parallel and waits for the first one that fulfills

Behavior:
resolves with the value of the first fulfilled promise
ignores rejections unless all reject → then rejects with AggregateError

Example
Promise.any([
  fetch("/bad-url"),
  fetch("/another-bad-url"),
  fetch("/good"),
])
  .then(result => console.log("first success:", result))
  .catch(err => console.error("all failed:", err)); // AggregateError




Promise.race()
Definition: runs multiple promises in parallel and settles as soon as the first one settles
Behavior:
if the first to finish fulfills → resolves with that value
if the first to finish rejects → rejects with that error

Example
Promise.race([
  fetch("/slow"),
  fetch("/fast"),
])
  .then(result => console.log("winner:", result))
  .catch(err => console.error("failed fast:", err));




quick comparison
all → wait for all, fail fast if any rejects
allSettled → wait for all, always gives you all states
any → succeed fast, only needs one fulfillment (AggregateError if all fail)
race → first to settle wins, whether success or error */

const promiseAll = (promises) => {
  return new Promise((resolve, reject) => {
    let results = Array(promises.length);
    let completed = 0;

    promises.forEach((p, index) =>
      Promise.resolve(p)
        .then((result) => {
          results[index] = result;
          completed++;
          if (completed === promises.length) {
            resolve(results);
          }
        })
        .catch((err) => {
          reject(err);
        })
    );
  });
};

const promiseAllSetteled = (promises) => {
  return new Promise((resolve, reject) => {
    let results = Array(promises.length);
    let setteled = 0;

    const checkSettling = () => {
      setteled++;
      if (setteled === promises.length) {
        resolve(results);
      }
    };

    promises.forEach((p, index) =>
      Promise.resolve(p)
        .then((result) => {
          results[index] = { status: "fulilled", result };
          checkSettling();
        })
        .catch((reason) => {
          results[index] = { status: " rejected", reason };
          checkSettling();
        })
    );
  });
};

const promiseRace = (promises) => {
  return new Promise((resolve, reject) => {
    promises.forEach((p, index) =>
      Promise.resolve(p)
        .then((result) => {
          resolve(result);
        })
        .catch((reason) => {
          reject(reason);
        })
    );
  });
};

const promiseAny = (promises) => {
  return new Promise((resolve, reject) => {
    const len = promises.length;
    const errors = new Array(len);
    let rejectedCount = 0;

    promises.forEach((p, i) => {
      Promise.resolve(p).then(resolve, (err) => {
        errors[i] = err;
        rejectedCount += 1;
        if (rejectedCount === len) {
          reject(new AggregateError(errors, "All promises were rejected"));
        }
      });
    });
  });
};

/* 

isNaN → loose check, coerces values to number first (can mislead)
Number.isNaN → strict check, only true if the value is literally NaN

isNaN(NaN);        // true
isNaN("hello");    // true   (string → NaN)
isNaN(undefined);  // true   (undefined → NaN)
isNaN("123");      // false  ("123" → 123)
isNaN(true);       // false  (true → 1)

Number.isNaN(NaN);        // true
Number.isNaN("hello");    // false (no coercion, just a string)
Number.isNaN(undefined);  // false
Number.isNaN("123");      // false
Number.isNaN(true);       // false

*/



/* 

Generator in JavaScript is a special kind of function that can pause execution at yield expressions and resume later, 
allowing you to produce a sequence of values over time instead of computing them all at once

how to define

declared with an asterisk function*
use the yield keyword to return values one by one
calling a generator function does not run it immediately, it returns an iterator object
you call .next() on that iterator to step through execution

example
function* numberGen() {
  yield 1;
  yield 2;
  yield 3;
}

const gen = numberGen();

console.log(gen.next()); // { value: 1, done: false }
console.log(gen.next()); // { value: 2, done: false }
console.log(gen.next()); // { value: 3, done: false }
console.log(gen.next()); // { value: undefined, done: true }

key points

lazy evaluation: values are generated only when requested
pause/resume: execution “pauses” at yield and continues when .next() is called again
done flag: tells you when the generator is finished

use cases

creating custom iterators
managing infinite sequences (like Fibonacci numbers, streams)
simplifying async workflows (before async/await, people used generators with libraries like co)
controlling execution flow


example 1


function* fetchUserFlow() {
  const user = yield fetch("/api/user").then(res => res.json());
  console.log("user:", user);

  const posts = yield fetch(`/api/posts?user=${user.id}`).then(res => res.json());
  console.log("posts:", posts);
}

// simple runner
function run(gen) {
  const iterator = gen();

  function step(nextValue) {
    const result = iterator.next(nextValue);
    if (result.done) return;
    result.value.then(step);
  }

  step();
}

run(fetchUserFlow);


example 2

function* fibonacci(a = 0, b = 1) {
  while (true) {
    yield a;
    [a, b] = [b, a + b];
  }
}

// helper to consume only k values from an infinite generator
function take(iter, k) {
  const out = [];
  for (const v of iter) {
    out.push(v);
    if (out.length === k) break;
  }
  return out;
}

console.log(take(fibonacci(), 10)); // [0,1,1,2,3,5,8,13,21,34]


more Usage

spread into an array

console.log([...numbers()]); 
// [1, 2, 3]


destructuring

const [a, b] = numbers();
console.log(a, b); // 1 2


manual loop

const gen = numbers();
let result = gen.next();
while (!result.done) {
  console.log(result.value);
  result = gen.next();
}



*/



/* 


Iterator is an object that defines a sequence and allows you to step through it one item at a time.
An iterator must implement a method called next(), which returns an object with two properties:
value → the current item in the sequence
done → a boolean (false if there are more items, true if the sequence is finished)


Iterable is an object that implements the @@iterator method, available as [Symbol.iterator]().
Calling this method must return an iterator object. 
Iterables can be consumed by language constructs such as 
for...of, spread syntax (...), array destructuring, and other APIs expecting sequences.
Examples of built-in iterables: Array, String, Set, Map, TypedArray, and generator objects.



Example: Custom Iterator
function createIterator(arr) {
  let index = 0;
  return {
    next: function () {
      if (index < arr.length) {
        return { value: arr[index++], done: false };
      } else {
        return { value: undefined, done: true };
      }
    }
  };
}
--------------------------
just an iterator
the object returned has a .next() method → that makes it an iterator
but it does not implement [Symbol.iterator] → so it’s not iterable
you can call it.next() manually, but you cannot do for...of it
--------------------------


const it = createIterator(["a", "b", "c"]);

console.log(it.next()); // { value: "a", done: false }
console.log(it.next()); // { value: "b", done: false }
console.log(it.next()); // { value: "c", done: false }
console.log(it.next()); // { value: undefined, done: true }

Example: Using [Symbol.iterator]

Any object can be made iterable by implementing the [Symbol.iterator] method that returns an iterator.

const myIterable = {
  data: [10, 20, 30],
  [Symbol.iterator]() {
    let i = 0;
    return {
      next: () => {
        if (i < this.data.length) {
          return { value: this.data[i++], done: false };
        } else {
          return { value: undefined, done: true };
        }
      }
    };
  }
};


-----------------------------
an iterable (that produces iterators)
here the object defines [Symbol.iterator]
that means it’s an iterable → it can be used with for...of, spread syntax ([...myIterable]), destructuring, etc.
every time you call [Symbol.iterator]() you get a fresh iterator

myIterable is iterable (because it has [Symbol.iterator])
but it does not itself have a .next() method
instead, when you call myIterable[Symbol.iterator](), you get an iterator object that does have .next()
const iterator = myIterable[Symbol.iterator]();

console.log(iterator.next()); // { value: 10, done: false }
console.log(iterator.next()); // { value: 20, done: false }
console.log(iterator.next()); // { value: 30, done: false }
console.log(iterator.next()); // { value: undefined, done: true }
-----------------------------

for (const val of myIterable) {
  console.log(val); // 10, 20, 30
}

Key Points

An iterator is an object with a .next() method returning { value, done }.
An iterable is an object that implements [Symbol.iterator] to return an iterator.
All built-in collections (Array, String, Map, Set, arguments, TypedArrays) are iterable.
Generators (function*) automatically create iterators.
Iterators allow lazy evaluation (compute values only when needed).

Use Cases

Looping with for...of
for (const x of ["x", "y", "z"]) {
  console.log(x);
}

Spread syntax
console.log([...new Set([1, 2, 2, 3])]); // [1, 2, 3]

Custom data structures
Define your own iteration logic, like looping through a tree or graph.

Lazy sequences
Infinite sequences (like Fibonacci) or streams of data that aren’t computed until you ask for them.

Integration with Generators
Generators automatically return iterators, making them perfect for building complex sequences.

*/




/* 

An iterator is an object with .next() that produces a sequence.
An iterable is an object that can give you an iterator via [Symbol.iterator].
In JS, some objects (like generators) are both iterators and iterables.


*/



/* 

1. Iterable

an iterable is an object that has a method [Symbol.iterator].
calling [Symbol.iterator]() gives you an iterator.
examples: arrays, strings, sets, maps, generators.
const arr = [1, 2, 3];
console.log(typeof arr[Symbol.iterator]); // "function"

2. Iterator

an iterator is an object with a .next() method.
.next() returns { value, done }.
examples: arr[Symbol.iterator]() or a generator object.
const it = arr[Symbol.iterator]();
console.log(it.next()); // { value: 1, done: false }

3. Relationship

All iterables can produce iterators.
Not all iterators are iterables → because an iterator doesn’t have to implement [Symbol.iterator].
BUT in practice, most built-in iterators in JS are also iterables (they return themselves from [Symbol.iterator]).
Example: generator objects, array iterators.

*/


/* 

iterable is any object that implements the special method [Symbol.iterator].
examples of built-in iterables:

Arrays
Strings
Sets
Maps
Typed arrays
The arguments object in functions
Generator objects


----------------------------

special things about generator objects
why you can call .next() directly on a generator
when you call a generator function (function*) you get back a generator object
that object has:
a .next() method (so it’s an iterator)
a [Symbol.iterator]() method that returns this (so it’s also an iterable)


when you call a generator function like gen(), the object you get back is a generator object.
that object is both:

an iterator → because it has a .next() method (and also .return() and .throw()), so you can step manually through its sequence.
an iterable → because it has a [Symbol.iterator]() method that just returns itself. This is why you can use it in for...of, spread ([...gen()]), destructuring, etc.

*/



/* 

to make an object act like a generator object (both iterable and iterator at the same time), you need to give it:
a .next() method → so it can be used as an iterator.
a [Symbol.iterator]() method that returns this → so it can be used as an iterable.

example
const myIterableIterator = {
  data: [1, 2, 3],
  index: 0,

  next() {
    if (this.index < this.data.length) {
      return { value: this.data[this.index++], done: false };
    } else {
      return { value: undefined, done: true };
    }
  },

  [Symbol.iterator]() {
    return this; // returning itself makes it iterable
  }
};

// manual iteration (iterator style)
console.log(myIterableIterator.next()); // { value: 1, done: false }
console.log(myIterableIterator.next()); // { value: 2, done: false }

// reset index if you want to iterate again
myIterableIterator.index = 0;

// for...of (iterable style)
for (const val of myIterableIterator) {
  console.log(val); // 1, 2, 3
}


*/