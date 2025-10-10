
/* Programming Paradigms
│
├── Imperative
│   ├─ Procedural
│   └─ Object-Oriented
│
└── Declarative
    ├─ Functional
    └─ Logic (e.g., Prolog, SQL)
*/


/* 

Imperative programming
a style of programming where you write explicit instructions that describe how the computer should perform tasks step by step and manage state

Declarative programming
a style of programming where you describe what outcome you want and the underlying system figures out how to achieve it





Imperative Programming

A programming style where you write explicit instructions that describe how the computer should perform tasks step by step, 
while managing and maipulating program state directly.

Procedural Programming (PP): Organizes code into procedures/functions that execute in sequence (e.g., C, Pascal).
Object-Oriented Programming (OOP): Encapsulates state and behavior into objects and uses concepts 
like encapsulation, inheritance, and polymorphism (e.g., Java, C#, Python classes).

👉 Imperative = How to do it (focus on control flow and state changes).



Declarative Programming

A programming style where you describe what outcome you want, and the underlying system determines how to achieve it.

Functional Programming (FP): Uses pure functions, immutability, and composition to express computations 
(e.g., Haskell, Elixir, JavaScript with map/filter/reduce).

Logic Programming: Uses facts and rules to let the system infer solutions via logical reasoning (e.g., Prolog, Datalog).
Other examples: SQL for querying data, HTML for describing structure.

👉 Declarative = What you want, not how to get it.

*/




/* 

OOP (Object-Oriented Programming)

OOP is an Imperative programming paradigm that structures software around objects—self-contained units
encapsulating both state (data/properties) and behavior (methods/functions).
It promotes modularity, reusability, and clarity by modeling programs closer to real-world entities.





Four Main Pillars of OOP
1. Encapsulation

Encapsulation is about bundling data and methods that operate on that data into one unit (the object), while restricting direct external access to the internal state. Only the necessary details are exposed through controlled interfaces.

JavaScript Example:

class BankAccount {
  #balance = 0; // private field

  deposit(amount) {
    this.#balance += amount;
  }

  getBalance() {
    return this.#balance;
  }
}

const account = new BankAccount();
account.deposit(100);
console.log(account.getBalance()); // 100






2. Inheritance

Inheritance allows new classes to reuse, extend, and specialize the behavior of existing classes. This promotes code reusability and logical hierarchy.

JavaScript Example:

class Animal {
  speak() {
    console.log("sound");
  }
}

class Dog extends Animal {
  speak() {
    console.log("woof");
  }
}

const a = new Animal();
const d = new Dog();
a.speak(); // sound
d.speak(); // woof






3. Polymorphism

Polymorphism enables the same method name to exhibit different behavior depending on the object invoking it. It makes code flexible and extensible.

Method Overriding (common in JS)

Method Overloading (not natively supported in JS but can be simulated)

JavaScript Example:

const a = new Animal();
const d = new Dog();

a.speak(); // sound
d.speak(); // woof






4. Abstraction

Abstraction focuses on hiding complex implementation details and exposing only essential functionality. It helps reduce complexity and increases clarity.

In JavaScript, true abstract classes don’t exist, but you can simulate them with base classes that enforce contracts.

JavaScript Example:

class Shape {
  area() {
    throw new Error("Subclass must implement area()");
  }
}

class Circle extends Shape {
  constructor(r) {
    super();
    this.r = r;
  }
  area() {
    return Math.PI * this.r * this.r;
  }
}

const c = new Circle(5);
console.log(c.area()); // 78.5398...


🔑 Key Points

👉 Objects are the core units (instances)
👉 Classes are blueprints for creating objects
👉 Inheritance allows one class/object to extend another
👉 Encapsulation hides implementation details and exposes only necessary parts
👉 Polymorphism lets objects share interfaces but provide different implementations
👉 Abstraction focuses on what an object does, not how it does it




💡 Use Cases

👉 Modeling real-world entities (Users, Orders, Products)
👉 Organizing large applications into manageable modules
👉 GUI components in frontend frameworks (React classes, though now hooks are common)
👉 Game development (Player, Enemy, Weapon objects)
👉 Backend services (Controllers, Models in MVC)

✅ Benefits

👉 Easier to model complex systems with real-world mapping
👉 Code reuse via inheritance and polymorphism
👉 Encapsulation improves maintainability and reduces bugs
👉 Abstraction makes APIs cleaner and easier to use

⚠️ Cons

👉 Can become overly complex (deep inheritance trees)
👉 Not always the most performant (indirection overhead)
👉 Sometimes less flexible than functional programming
👉 JavaScript OOP is prototype-based under the hood, which can confuse beginners

📝 Takeaways

👉 OOP = thinking in terms of objects, classes, and relationships
👉 Use encapsulation to hide details, inheritance to reuse, polymorphism to extend behavior, abstraction to design clean interfaces
👉 JavaScript gives you both prototype-based OOP and class-based OOP (ES6 syntax)








👉 Short Interview-Ready Definition

OOP is a declarative paradigm where programs are structured around objects that encapsulate state and behavior, 
following the four principles: encapsulation, inheritance, polymorphism, and abstraction.


*/



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


we use private fields and methods to encapsulate internal details of a class, hiding them from outside access. 
This helps prevent unintended interference and keeps the public interface clean and easy to use.
old days we used naming conventions like _privateField to indicate something is private 
but it was just a convention and not enforced by the language
also we used closures to create private variables but that made it hard to use inheritance and prototypes


const counter = (function () {
  let count = 0;
  return {
    increment: function () {
      return count++;
    },
    decrement: function () {
      return count--;
    },
    getCount: function () {
      return count;
    },
  };
})();

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

keyword this is a special identifier that refers to the context in which the current code is executed

this can refer to in js

global object
normal function in global scope (non-strict mode → window in browser, global in node)

undefined
normal function in strict mode

instance of a class
inside constructor
inside non-static methods

class itself
inside static methods this refers to the class constructor

any object you choose
using .call() .apply() .bind() you can fix this manually

dom element
in a normal event handler function this is the element that fired the event

lexical outer scope
in arrow functions this is inherited from where the arrow was defined

*/



/* 

👉 this is a special keyword in JavaScript that refers to the context in which a function is executed
👉 Its value is determined at runtime, not at definition time

🔑 Key Points

👉 In global scope, this refers to the global object (window in browsers, global in Node)
👉 Inside an object method, this refers to the object that called the method
👉 In a class, this refers to the instance
👉 In regular functions, this depends on how the function is called
👉 In arrow functions, this is lexically bound (it uses the surrounding scope’s this)
👉 this can be changed with call, apply, bind

🧩 Examples
1. Global context
console.log(this) 
// In browser → Window
// In Node → {}

2. Inside an object method
const user = {
  name: "Alice",
  greet() {
    console.log(`Hello, I’m ${this.name}`)
  }
}

user.greet() // Hello, I’m Alice

3. Standalone function
function show() {
  console.log(this)
}
show() 
// In strict mode → undefined
// Otherwise → global object

4. In a class
class Person {
  constructor(name) {
    this.name = name
  }
  greet() {
    console.log(`Hi, I’m ${this.name}`)
  }
}
const p = new Person("Bob")
p.greet() // Hi, I’m Bob

5. Arrow function (lexical this)
const obj = {
  name: "Carol",
  regular: function() { console.log(this.name) },
  arrow: () => console.log(this.name)
}

obj.regular() // "Carol"
obj.arrow()   // undefined (uses outer/global `this`)

6. In event listeners
document.getElementById("btn").addEventListener("click", function() {
  console.log(this) // the element itself
})

document.getElementById("btn").addEventListener("click", () => {
  console.log(this) // lexical scope (likely window)
})

7. call, apply, bind
function greet(msg) {
  console.log(`${msg}, I’m ${this.name}`)
}

const person = { name: "Dana" }

greet.call(person, "Hello")   // Hello, I’m Dana
greet.apply(person, ["Hi"])   // Hi, I’m Dana
const bound = greet.bind(person)
bound("Hey")                  // Hey, I’m Dana

💡 Use Cases

👉 Access object’s properties inside methods
👉 Maintain correct context in event handlers or callbacks
👉 Use .bind for passing functions with the right this
👉 Use arrow functions when you want to inherit parent scope’s this

✅ Benefits

👉 Makes methods naturally aware of their owning object
👉 Allows flexible function reuse with .call / .apply / .bind

⚠️ Cons

👉 Behavior of this can be confusing
👉 In callbacks and event handlers, this may not be what you expect
👉 Arrow functions don’t bind their own this, which can be helpful or harmful depending on context

📝 Takeaway

👉 this in JavaScript is dynamic and depends on how a function is called
👉 Use arrow functions to lock into the outer context
👉 Use bind/call/apply to explicitly control this


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

---------------------------
.bind() Does
Creates a new function with its this context fixed to the first argument.
Optionally, pre-fills (partially applies) arguments.
Does not call the function immediately (unlike .call and .apply).

NOTE bind cannot lock the second argument and leave the first one unlocked
to do this 
A custom partial function with placeholders (like lodash does with _).
Or rewrite a wrapper manually.




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


then the keyword new 
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

Memory Management in JavaScript 👇

📖 Definition

👉 Memory management is the process of allocating, using, and freeing memory resources during the lifecycle of a program
👉 In JavaScript, memory is managed automatically by the Garbage Collector (GC)

🔑 Key Points

👉 JavaScript uses automatic memory management (developers don’t manually allocate/free memory like in C/C++)
👉 Memory lifecycle: allocate → use → release
👉 Most memory leaks happen when objects remain referenced even if no longer needed
👉 Common areas of concern: closures, event listeners, global variables, caches

🧩 Examples
Allocation

👉 When you create variables, objects, arrays, functions, memory is allocated

let num = 42
let obj = { name: "Alice" }
let arr = [1, 2, 3]

Use

👉 Accessing and modifying values

console.log(obj.name) // "Alice"
arr.push(4)

Release (Garbage Collection)

👉 If there are no more references to a value, GC will clean it up

let user = { name: "Bob" }
user = null // old object becomes unreachable → GC can collect it

🧠 Garbage Collection

👉 JavaScript engines (like V8 in Chrome/Node.js) use reachability-based garbage collection
👉 If an object is reachable from root objects (like window in browsers or global in Node), it won’t be collected
👉 Algorithm: Mark-and-Sweep

Mark all reachable objects

Sweep unreachable ones → free memory

💡 Common Use Cases & Issues
1. Closures
function outer() {
  let bigArray = new Array(1000000).fill('*')
  return function inner() {
    console.log(bigArray.length) // still referenced!
  }
}
const leak = outer() // bigArray stays in memory


👉 Avoid keeping unnecessary references in closures

2. Event Listeners
const btn = document.getElementById("click")
btn.addEventListener("click", () => console.log("clicked"))

// if btn is removed from DOM but listener not removed → memory leak


👉 Always removeEventListener when cleaning up

3. Globals

👉 Variables defined globally stay in memory for entire app lifecycle

window.bigCache = new Array(1000000).fill('*') // stays forever

4. Timers & Intervals

👉 Unstopped timers hold references

setInterval(() => console.log("running"), 1000)
// if never cleared → memory leak


👉 Use clearInterval or clearTimeout

✅ Benefits of Automatic Memory Management

👉 Developer doesn’t worry about manual allocation/freeing
👉 Safer than low-level languages (avoids dangling pointers)
👉 Mark-and-Sweep GC reduces fragmentation

⚠️ Cons & Pitfalls

👉 GC is not predictable (you can’t force when it runs)
👉 Still possible to create memory leaks via references
👉 Large unused structures (arrays, objects) can clog memory
👉 Debugging leaks can be hard without tools

🛠️ Best Practices

👉 Use let/const with proper scope (avoid var)
👉 Nullify references if you no longer need them
👉 Clean up event listeners, DOM nodes, timers
👉 Prefer local variables over globals
👉 Use WeakMap / WeakSet for caches (they allow GC on keys)
👉 Monitor with Chrome DevTools → Memory tab

*/




/* 
callback is simply a function that you pass into another function 
so that it can be called later when some work is finished
- functional programming patterns (filter, map, reducer)
- event driven programming (events handlers)
- asynchronous programming (timers, promises, async/await)


*/




/* 

Concurrency in JavaScript refers to how JS can manage multiple tasks without running them all at the same exact time (since it has one main thread).


JS achieves this with the event loop, async callbacks, promises, and APIs.

While one task runs in the call stack, other tasks (I/O, timers, network requests) 
can progress in the background (handled by the browser or Node.js runtime).

*/


/* 

Example of Concurrency
function task1() {
  console.log("Task 1 done");
}
function task2() {
  setTimeout(() => console.log("Task 2 done"), 1000);
}
function task3() {
  console.log("Task 3 done");
}

task1();
task2();
task3();


Output:

Task 1 done
Task 3 done
Task 2 done   // after ~1 second


Even though JS is single-threaded, it looks concurrent because while waiting for task2’s timer, JS continues with task3.

Key Points

JS is single-threaded (one call stack).
The event loop enables non-blocking async behavior.
Concurrency is achieved by delegating tasks to the environment (Web APIs / Node.js libuv), then handling callbacks via the queue.
Promises and async/await use the microtask queue, which has higher priority than the normal task queue.

✅ memory trick:

Event loop = traffic controller 🚦
Concurrency = illusion of doing multiple things at once with async tasks.



Concurrency means the system is able to make progress on multiple tasks during the same period of time, even if not literally at the exact same instant.
In JavaScript:

The engine runs one piece of code at a time (single-threaded).
But while waiting for I/O (network, timers, events), other code can run.
Tasks interleave, so it looks like multiple things are happening at once.



Parallelism

Parallelism means code is literally executed at the exact same time (on different CPU cores or threads).
JS in the browser does not do parallel execution on the main thread.
But browsers/Node.js can use parallelism in background threads (e.g., Web Workers, libuv thread pool).



👉 memory trick:

Concurrency = dealing with many things at once (interleaving).
Parallelism = doing many things at the exact same time.

*/




/* 

Analogy

Interleaving (concurrency):
One chef cooking soup → stirs pot for 1 min, chops vegetables for 1 min, goes back to stirring, then chopping. Both tasks progress, 
but only one action at a time.

Parallelism:
Two chefs → one stirs soup continuously, the other chops vegetables at the same time.


In JavaScript

Because JS is single-threaded, async tasks are interleaved by the event loop:
It runs some synchronous code
Pauses when it hits an async operation (like setTimeout or fetch)
Picks up another task
When the async operation finishes, its callback is queued and run later
So tasks are not “parallel,” but interleaved in time slices.


*/




/* 


👉 The event loop is the mechanism in JavaScript that 
manages execution of code, handling of events, execution of queued tasks, 
and how asynchronous operations are executed and managed.
👉 It allows JavaScript (which is single-threaded) 
to perform asynchronous operations without blocking


***************************************************************
The JS engine starts with synchronous code → pushes functions into the call stack.
If it encounters asynchronous code (like setTimeout, fetch, events), those are handed off to Web APIs / Node.js APIs (the background).

When those async tasks finish, their callbacks are placed into queues:
  Microtask queue → promise callbacks, queueMicrotask, MutationObserver.
  Macrotask (task) queue → setTimeout, setInterval, DOM events, network callbacks.

The event loop continuously checks:

If the call stack is empty → process microtasks (until empty).
Then → take the next macrotask, put it on the stack.
Repeat.
👉 microtasks always have higher priority than macrotasks.
****************************************************************
🔑 Key Points

👉 JavaScript has one call stack (runs synchronous code)
👉 Asynchronous tasks are handled via callback queues / microtask queues
👉 The event loop constantly checks:

Is the call stack empty?

If yes → take the next task from the queue and push it to the stack
👉 Ensures non-blocking execution of code like setTimeout, Promises, async/await, DOM events

⚙️ How It Works
1. Call Stack

👉 Holds synchronous function calls
👉 Executes top to bottom

2. Web APIs (Browser / Node APIs)

👉 Timers (setTimeout, setInterval)
👉 DOM events
👉 HTTP requests (fetch, AJAX)

3. Callback Queue (Task Queue / Macrotask Queue)

👉 Stores callbacks from Web APIs waiting to run
👉 Examples: setTimeout, setInterval, DOM events

4. Microtask Queue

👉 Higher priority than the callback queue
👉 Stores microtasks like Promises, queueMicrotask, MutationObserver
👉 Always cleared before moving back to the callback queue


🧩 Example 1: setTimeout vs Promise
console.log("Start")

setTimeout(() => console.log("Timeout"), 0)

Promise.resolve().then(() => console.log("Promise"))

console.log("End")


Output order:

Start
End
Promise   // microtask runs before macrotask
Timeout

🧩 Example 2: Call Stack Order
function first() {
  console.log("First")
  second()
}
function second() {
  console.log("Second")
}
first()
console.log("Done")


Output:

First
Second
Done


👉 Purely synchronous → stack executes line by line

🧩 Example 3: Async/Await (Promise-based)
async function demo() {
  console.log("A")
  await Promise.resolve()
  console.log("B")
}
demo()
console.log("C")


Output:

A
C
B


👉 await pauses inside async → remainder goes into microtask queue


💡 Use Cases

👉 Handle asynchronous tasks like API calls, timers, events
👉 Enable responsive UIs without blocking
👉 Foundation for async/await, Promises, callbacks

✅ Benefits

👉 Allows JavaScript to stay single-threaded but still handle async tasks
👉 Efficiently manages I/O without blocking
👉 Predictable execution order with event loop rules

⚠️ Cons

👉 Can cause callback hell if misused
👉 Understanding microtask vs macrotask priority is tricky
👉 Blocking the event loop (e.g., long loops) freezes the entire app

📝 Takeaway

👉 The event loop = JavaScript’s “traffic controller” for sync + async tasks
👉 Execution order:
      Run synchronous code (call stack)
      Process microtasks (Promises, queueMicrotask)
      Process macrotasks (setTimeout, setInterval, I/O callbacks)
👉 Repeat forever


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

📖 Definition
👉 Promises are the modern way to handle asynchronous operations
👉 A Promise is an object that represents the eventual result of an asynchronous operation
👉 it acts like a placeholder for a value that will be available later (success or failure)
👉 [[one time guarantee for a future value]]
👉 it can be in one of three states
    pending → the async work has not finished yet
    fulfilled → the work finished successfully, a value is available
    rejected → the work failed, an error reason is available




🔑 Key Points

👉 Promise has 3 states:
    pending → initial state, neither fulfilled nor rejected
    fulfilled → operation completed successfully, returns a value
    rejected → operation failed, returns a reason (error)

👉 Methods:
    .then(onFulfilled) → handle success
    .catch(onRejected) → handle failure
    .finally(callback) → run regardless of success/failure

👉 Promises are eager → start running immediately when created



🧩 Examples
1. Basic Promise
const myPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("Success!")
    // reject("Error!")
  }, 1000)
})

myPromise
  .then(result => console.log(result))   // "Success!"
  .catch(err => console.error(err))
  .finally(() => console.log("Done"))

2. Chaining Promises
Promise.resolve(10)
  .then(n => n * 2)
  .then(n => n + 5)
  .then(n => console.log(n)) // 25

3. Error Handling
Promise.reject("Something went wrong")
  .then(() => console.log("This won’t run"))
  .catch(err => console.error(err)) // Something went wrong

4. Async/Await (built on Promises)
async function fetchData() {
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/todos/1")
    const data = await res.json()
    console.log(data)
  } catch (err) {
    console.error("Error:", err)
  } finally {
    console.log("Done")
  }
}
fetchData()

5. Promise Combinators
Promise.all → waits for all to succeed (or rejects fast if one fails)
Promise.all([
  Promise.resolve("A"),
  Promise.resolve("B"),
  Promise.resolve("C")
]).then(values => console.log(values)) // ["A","B","C"]

Promise.allSettled → waits for all, regardless of success/failure
Promise.allSettled([
  Promise.resolve("A"),
  Promise.reject("B failed"),
])
.then(results => console.log(results))

Promise.race → returns the first settled promise
Promise.race([
  new Promise(r => setTimeout(() => r("fast"), 100)),
  new Promise(r => setTimeout(() => r("slow"), 1000))
]).then(val => console.log(val)) // "fast"

Promise.any → first fulfilled (ignores rejections unless all fail)
Promise.any([
  Promise.reject("fail1"),
  Promise.resolve("success"),
  Promise.reject("fail2")
]).then(val => console.log(val)) // "success"

💡 Use Cases

👉 Fetching data from APIs
👉 Reading files (Node.js fs.promises)
👉 Handling asynchronous workflows without callback hell
👉 Parallel execution of async tasks

✅ Benefits

👉 Avoids callback hell
👉 Easier chaining of async operations
👉 Works seamlessly with async/await
👉 Powerful combinators for concurrency

⚠️ Cons

👉 Still requires careful error handling
👉 Debugging async chains can be tricky
👉 Promises are eager (start immediately) — not lazy

📝 Takeaway

👉 A Promise is an object representing a value that may not be available yet
👉 States: pending → fulfilled / rejected
👉 Use .then, .catch, .finally or modern async/await
👉 Use combinators (all, allSettled, race, any) for concurrency patterns



*/

/* 
📖 Definition

👉 Promise chaining means linking multiple asynchronous operations one after the other using .then() 
so that the output of one promise becomes the input for the next.
👉 It allows writing asynchronous code in a step-by-step sequence without nesting (avoiding callback hell)

each .then() returns a new promise
if you return a value → it is passed to the next .then()
if you return another promise → the next .then() waits for it to resolve

🔑 Key Points

👉 Each .then() returns a new promise
👉 Values returned inside .then() are automatically wrapped in a promise
👉 Errors “bubble” down the chain until caught by .catch()
👉 .finally() always runs at the end regardless of success/failure

🧩 Examples
1. Basic Chaining
Promise.resolve(2)
  .then(n => n * 2)     // 4
  .then(n => n + 3)     // 7
  .then(n => console.log(n)) // 7

2. Returning Promises Inside .then()
function fetchNumber(num) {
  return new Promise(resolve => setTimeout(() => resolve(num), 500))
}

fetchNumber(5)
  .then(n => {
    console.log("Step 1:", n)
    return fetchNumber(n * 2)  // return new promise
  })
  .then(n => {
    console.log("Step 2:", n)
    return fetchNumber(n + 3)
  })
  .then(n => console.log("Final:", n))

3. Error Handling in a Chain
Promise.resolve(10)
  .then(n => {
    if (n === 10) throw new Error("Something went wrong")
    return n
  })
  .then(n => console.log("This will be skipped"))
  .catch(err => console.error("Caught:", err.message))
  .finally(() => console.log("Done"))

4. Mixing Sync + Async
Promise.resolve("hello")
  .then(str => str.toUpperCase())       // synchronous
  .then(str => fetch(`/api?q=${str}`))  // asynchronous
  .then(res => res.json())
  .then(data => console.log(data))

💡 Use Cases

👉 Sequential API calls (fetch data → process → save → notify)
👉 Transforming values step by step
👉 Handling errors gracefully at one place in the chain
👉 Keeping async workflows clean and readable

✅ Benefits

👉 Avoids callback hell (flat structure instead of nesting)
👉 Easier to read sequential async logic
👉 Built-in error propagation with .catch()

⚠️ Cons

👉 Long chains can still become hard to follow
👉 Must remember to return inside .then() or the next step gets undefined
👉 Parallel tasks are better handled with Promise.all instead of chaining

📝 Takeaway

👉 Promise chaining = sequential async flow
👉 Each .then() transforms the result and passes it to the next
👉 Always return inside .then() if you want the next step to use that value
👉 Use .catch() at the end for centralized error handling


===== promise chaining = sequential async flow =====


*/

/* 
📖 Definition
👉 async/await is syntactic sugar (introduced in ES2017) built on top of Promises.
👉 It makes asynchronous code look and behave more like synchronous code, improving readability.


🔑 Key Points

👉 async keyword before a function → makes it return a Promise
👉 await pauses execution inside an async function until the Promise is settled
👉 Can only use await inside an async function (or at top-level in modern JS environments)
👉 Error handling is done with try/catch

🧩 Examples
1. Basic async function
async function greet() {
  return "Hello"
}
greet().then(console.log) // Hello


👉 Even though return "Hello" is synchronous, the function automatically returns a Promise

2. Using await
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

async function run() {
  console.log("Start")
  await delay(1000)       // pause here
  console.log("After 1s")
}

run()

3. Sequential Async Operations
async function fetchData() {
  const res = await fetch("https://jsonplaceholder.typicode.com/todos/1")
  const data = await res.json()
  console.log(data)
}
fetchData()

4. Error Handling
async function getUser() {
  try {
    const res = await fetch("https://invalid-url")
    const data = await res.json()
    console.log(data)
  } catch (err) {
    console.error("Error:", err.message)
  } finally {
    console.log("Done")
  }
}
getUser()

5. Running in Parallel (with Promise.all)
async function loadData() {
  const [posts, users] = await Promise.all([
    fetch("https://jsonplaceholder.typicode.com/posts").then(r => r.json()),
    fetch("https://jsonplaceholder.typicode.com/users").then(r => r.json())
  ])
  console.log("Posts:", posts.length, "Users:", users.length)
}
loadData()

💡 Use Cases

👉 Replacing long Promise chains with cleaner code
👉 Sequential tasks (await one before moving to the next)
👉 API requests with error handling
👉 Parallel execution with Promise.all inside await

✅ Benefits

👉 Reads like synchronous code → easier to understand
👉 Built-in error handling via try/catch
👉 Works with existing Promises
👉 Cleaner than nested .then() chains
👉 Still non-blocking (event loop runs while waiting)

⚠️ Cons

👉 await inside loops = serial execution (may be slower if parallel possible)
👉 Still need to understand Promises under the hood
👉 Must wrap in try/catch for errors (or use .catch)

📝 Takeaway

👉 async/await is just a cleaner way to work with Promises
👉 async = function returns a Promise
👉 await = pause until Promise settles
👉 Use try/catch for errors and Promise.all for parallel async work




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

📖 Definition

👉 Promise combinators are utility methods provided by JavaScript that help coordinate multiple promises at once
👉 They return a new Promise that depends on how the group of promises settle (resolve/reject)

🔑 Key Points

👉 Useful for parallel async tasks
👉 Provide different strategies for handling multiple promises
👉 Main combinators:
    Promise.all
    Promise.allSettled
    Promise.race
    Promise.any





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

💡 Use Cases

👉 Promise.all → Fetch multiple APIs and wait for all results
👉 Promise.allSettled → Run tasks where failures are acceptable (logging, background jobs)
👉 Promise.race → Timeout logic (whichever finishes first wins)
👉 Promise.any → Try multiple sources and use the first success

✅ Benefits

👉 Handle concurrency cleanly
👉 Simplify parallel async workflows
👉 Flexible strategies depending on needs

⚠️ Cons

👉 Promise.all fails fast (one rejection cancels all)
👉 Promise.race may resolve with an unwanted rejection if that happens first
👉 Promise.any throws AggregateError when all reject

📝 Takeaway

👉 Promise combinators = helpers for managing multiple async tasks
👉 Choose based on need:
    ✅ all → need all to succeed
    ✅ allSettled → need all results (success + failure)
    ✅ race → need first one to finish
    ✅ any → need first successful result


*/


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


👉 A generator is a special type of function that can be paused at yield expressions and resumed
    allowing you to produce a sequence of values over time instead of computing them all at once
👉 Declared with function* (asterisk after function)
👉 Uses the yield keyword to pause execution and return values one by one

🔑 Key Points

👉 Generator functions return an iterator object
👉 lazy evaluation: values are generated only when requested
👉 pause/resume: execution “pauses” at yield and continues when .next() is called again
👉 Calling .next() resumes execution until the next yield
👉 Each .next() call returns an object { value, done }
👉 done flag: tells you when the generator is finished
👉 Generators make it easy to create iterators, infinite sequences, and handle asynchronous flows
👉 Different from normal functions (which run top-to-bottom and can’t pause)

🧩 Examples
1. Basic Generator
function* simpleGen() {
  yield 1
  yield 2
  yield 3
}

const gen = simpleGen()
console.log(gen.next()) // { value: 1, done: false }
console.log(gen.next()) // { value: 2, done: false }
console.log(gen.next()) // { value: 3, done: false }
console.log(gen.next()) // { value: undefined, done: true }

2. Iterating with for...of
function* fruits() {
  yield "🍎"
  yield "🍌"
  yield "🍇"
}

for (const f of fruits()) {
  console.log(f)
}
// 🍎
// 🍌
// 🍇

3. Infinite Generator
function* naturalNumbers() {
  let n = 1
  while (true) {
    yield n++
  }
}

const nums = naturalNumbers()
console.log(nums.next().value) // 1
console.log(nums.next().value) // 2
console.log(nums.next().value) // 3


👉 Useful for streams or endless sequences

4. Passing values into Generators
function* conversation() {
  const name = yield "What is your name?"
  yield `Hello, ${name}!`
}

const chat = conversation()
console.log(chat.next())           // { value: "What is your name?", done: false }
console.log(chat.next("Alice"))    // { value: "Hello, Alice!", done: false }

5. Delegating with yield*
function* genA() {
  yield 1
  yield 2
}
function* genB() {
  yield* genA()
  yield 3
}

for (const v of genB()) {
  console.log(v)
}
// 1, 2, 3

6. Async with Generators (before async/await)

👉 Generators were often used with Promises for async flow control (libraries like co)

function* asyncFlow() {
  const data = yield fetch('/api/data').then(res => res.json())
  console.log(data)
}

7. Throwing Errors into Generators
function* errorGen() {
  try {
    yield "Start"
    yield "Middle"
  } catch (e) {
    console.log("Caught inside generator:", e)
  }
  yield "End"
}
const eg = errorGen()
console.log(eg.next()) // { value: "Start", done: false }
console.log(eg.next()) // { value: "Middle", done: false }
console.log(eg.throw(new Error("Oops"))) // Caught inside generator: Error: Oops

8. Returning from Generators
function* returnGen() {
  yield 1
  return 42
  yield 3 // never reached
}
const rg = returnGen()  

console.log(rg.next()) // { value: 1, done: false }
console.log(rg.next()) // { value: 42, done: true }
console.log(rg.next()) // { value: undefined, done: true }

9. Using Generators with Arrays
function* arrayGen(arr) {
  for (const item of arr) {
    yield item
  }
}

const ag = arrayGen(["a", "b", "c"])
console.log(ag.next()) // { value: "a", done: false }
console.log(ag.next()) // { value: "b", done: false }
console.log(ag.next()) // { value: "c", done: false }
console.log(ag.next()) // { value: undefined, done: true }

10. Spread into an Array
console.log([...arrayGen([1, 2, 3])]) // [1, 2, 3]
// Uses the iterator protocol to expand all yielded values into an array

11. Destructuring
const [first, second] = arrayGen(["x", "y", "z"])
console.log(first, second) // x y
// Destructures the first two yielded values from the generator

12. Manual Loop
const it = arrayGen([10, 20, 30])
let result = it.next()
while (!result.done) {
  console.log(result.value)
  result = it.next()
} 
// Manually iterates through the generator using .next()  
// Outputs: 10, 20, 30




💡 Use Cases

👉 Creating custom iterators
👉 Generating infinite sequences lazily
👉 Handling async flows (pre-async/await)
👉 Pausing/resuming logic in games or simulations
👉 Streaming or chunk processing

✅ Benefits

👉 Lazily compute values on demand
👉 Memory efficient (don’t need to store huge arrays)
👉 More control over function execution
👉 Good for async workflows

⚠️ Cons

👉 Syntax can be confusing for beginners (function*, yield)
👉 Less common in modern code since async/await
👉 Misuse can lead to hard-to-debug state machines

📝 Takeaway

👉 Generator functions (function*) let you pause with yield and resume with .next()
👉 Perfect for lazy sequences, custom iterators, and certain async flows
👉 Modern JS uses async/await, but generators are still powerful for iterables and advanced control flows



💡  More Examples
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




*/

/* 

📖 Definition

👉 An Iterator is an object that defines a sequence and allows you to step through it one item at a time.
👉 Iterator must implement a method called next(), 
which returns an object with two properties: { value: <any>, done: <boolean> }
value → the current item in the sequence
done → a boolean (false if there are more items, true if the sequence is finished)
👉 Iterators are the foundation for for...of, spread ..., and many built-ins in JS

🔑 Key Points

👉 Iterators implement the Iterator Protocol
👉 Iterables (like arrays, strings, maps, sets) implement the Iterable Protocol → they must have a [Symbol.iterator]() method that returns an iterator
👉 You can create custom iterators manually or via generator functions

🧩 Examples
1. Manual Iterator
function makeIterator(arr) {
  let i = 0
  return {
    next: () => {
      if (i < arr.length) {
        return { value: arr[i++], done: false }
      }
      return { value: undefined, done: true }
    }
  }
}

const it = makeIterator([10, 20, 30])
console.log(it.next()) // { value: 10, done: false }
console.log(it.next()) // { value: 20, done: false }
console.log(it.next()) // { value: 30, done: false }
console.log(it.next()) // { value: undefined, done: true }

2. Iterables (built-in)
const arr = [1, 2, 3]
const it = arr[Symbol.iterator]()

👉 When you call [Symbol.iterator](), you get back a new iterator object each time.

console.log(it.next()) // { value: 1, done: false }
console.log(it.next()) // { value: 2, done: false }
console.log(it.next()) // { value: 3, done: false }
console.log(it.next()) // { value: undefined, done: true }

3. Using for...of (iterator under the hood)
for (const n of [1, 2, 3]) {
  console.log(n)
}
// 1
// 2
// 3

4. Custom Iterable Object
const range = {
  start: 1,
  end: 5,
  [Symbol.iterator]() {
    let current = this.start
    const end = this.end
    return {
      next() {
        if (current <= end) {
          return { value: current++, done: false }
        }
        return { done: true }
      }
    }
  }
}

for (const num of range) {
  console.log(num)
}
// 1 2 3 4 5

5. Generators (easy iterators)
function* gen() {
  yield 1
  yield 2
  yield 3
}

for (const v of gen()) {
  console.log(v)
}
// 1 2 3


********************************************************
👍 both [1,2,3][Symbol.iterator]() and [1,2,3].values() give you an iterator over the array values

const arr = [1, 2, 3]

console.log(arr[Symbol.iterator]().next()) // { value: 1, done: false }
console.log(arr.values().next())           // { value: 1, done: false }


👉 the only difference is that:

[Symbol.iterator]() is the protocol method (low-level, every iterable has it)

.values() is a convenience method that for arrays just calls the same iterator internally

So for arrays, they behave the same ✅

⚡ but note: arrays also have .keys() and .entries() which give different iterators:

const arr = ["a", "b", "c"]

for (const k of arr.keys()) {
  console.log(k) // 0, 1, 2
}

for (const v of arr.values()) {
  console.log(v) // "a", "b", "c"
}

for (const [k, v] of arr.entries()) {
  console.log(k, v) // 0 "a", 1 "b", 2 "c"
}


👉 so:
    [Symbol.iterator]() → same as .values() for arrays
    .values() → nicer to read, same as above
    .keys() → iterator over indexes
    .entries() → iterator over [index, value] pairs
********************************************************

💡 Use Cases

👉 Sequentially consuming data structures (arrays, sets, maps, strings)
👉 Creating infinite sequences (via generators)
👉 Lazy evaluation (don’t load everything in memory at once)
👉 Powering constructs like for...of, spread ..., destructuring

✅ Benefits

👉 Unified interface to iterate over any collection
👉 Works with custom data sources
👉 Efficient (lazy evaluation possible)
👉 Foundation for async iteration (for await...of)

⚠️ Cons

👉 More verbose than array methods (map, filter) for simple cases
👉 Must carefully handle done flag for correctness
👉 Beginners often confuse iterable vs iterator

📝 Takeaway

👉 An iterator is an object with a next() method that returns { value, done }
👉 An iterable is an object that implements [Symbol.iterator]() returning an iterator
👉 Arrays, Sets, Maps, Strings are iterable by default
👉 Generators are the easiest way to build custom iterators


📖 Definition
👉 Iterable is an object that implements the @@iterator method, available as [Symbol.iterator]().
👉 Calling this method must return an iterator object. 
👉 Iterables can be consumed by language constructs such as 
👉 for...of, spread syntax (...), array destructuring, and other APIs expecting sequences.
👉 Examples of built-in iterables: Array, String, Set, Map, TypedArray, and generator objects.



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

/* 

📖 Definition

👉 Iterator helpers are new utility methods (added in ES2023 / Stage 4) that extend the iterator protocol with functional-style methods similar to Array.prototype.map, filter, take, etc.
👉 They allow working directly with iterators in a chainable way without converting them into arrays first.

🔑 Key Points

👉 Built on top of iterators (not arrays)
👉 Methods are lazy → they don’t compute everything at once, only as you consume the iterator
👉 Similar to how map, filter, reduce work on arrays, but now for any iterable/iterator
👉 Reduce memory usage for large/infinite sequences

🧩 Iterator Helper Methods
1. map

👉 Transform each value

const it = [1, 2, 3].values() // get an iterator
const mapped = it.map(x => x * 2)

console.log([...mapped]) // [2, 4, 6]

2. filter

👉 Keep only matching values

const it = [1, 2, 3, 4, 5].values()
const evens = it.filter(x => x % 2 === 0)

console.log([...evens]) // [2, 4]

3. take

👉 Take the first n values

const it = [1, 2, 3, 4, 5].values()
console.log([...it.take(3)]) // [1, 2, 3]

4. drop

👉 Skip the first n values

const it = [1, 2, 3, 4, 5].values()
console.log([...it.drop(2)]) // [3, 4, 5]

5. flatMap

👉 Map and flatten one level

const it = [1, 2, 3].values()
const expanded = it.flatMap(x => [x, x * 10])

console.log([...expanded]) // [1, 10, 2, 20, 3, 30]

6. reduce

👉 Fold values into a single result

const it = [1, 2, 3, 4].values()
const sum = it.reduce((acc, x) => acc + x, 0)

console.log(sum) // 10

7. toArray

👉 Collect values into an array

const it = [1, 2, 3].values()
console.log(it.map(x => x * 2).toArray()) // [2, 4, 6]

💡 Use Cases

👉 Processing large/infinite sequences lazily
👉 Stream-like pipelines (similar to RxJS but native)
👉 More memory-efficient than converting to arrays
👉 Cleaner FP-style code without writing manual iterators

✅ Benefits

👉 Native functional methods for iterators
👉 Lazy evaluation = efficiency
👉 Works with any iterable, not just arrays

⚠️ Cons

👉 Still relatively new (not all environments fully support yet — Node 20+ and modern browsers do)
👉 Some developers may confuse iterator helpers with array helpers

📝 Takeaway

👉 Iterator Helpers bring functional array-style methods (map, filter, reduce, take, etc.) directly to iterators
👉 They are lazy and memory-efficient, making them perfect for working with streams, infinite sequences, or very large data


*/


/* 

          Iterable (e.g., Array, String, Set, Map, custom object)
          ┌──────────────────────────┐
          │ [Symbol.iterator]()      │
          │   returns an Iterator    │
          └───────────┬─────────────┘
                      │
                      ▼
              Iterator Object
          ┌──────────────────────────┐
          │ next() {                 │
          │   return {               │
          │     value: <any>,        │
          │     done: <true|false>   │
          │   }                      │
          │ }                        │
          └───────────┬─────────────┘
                      │
                      ▼
         { value: item, done: false }   ← first call
         { value: item, done: false }   ← second call
         ...
         { value: undefined, done: true } ← iteration ends


*/


/*

VAR, LET, CONST


var 

scope: function & global scope 
initialization: not required 
hoisting: yes (initialized with undefined)
redeclaration: yes
reassignment: yes

let 
scope: block scope
initialization: required 
hoisting: yes (not initialized, temporal dead zone TDZ)
redeclaration: no
reassignment: yes

const 

scope: block scope
initialization: required 
hoisting: yes (not initialized, temporal dead zone TDZ)
redeclaration: no
reassignment: no (but object properties can be changed)

*/

/* 

The Temporal Dead Zone (TDZ) means the time between when a variable is hoisted and when it is actually declared/initialized in your code
Variables declared with let and const are hoisted (JavaScript knows they exist before execution)
But unlike var, they are not automatically initialized with undefined
So if you try to access them before the actual line of declaration, you get a ReferenceError 

TDZ = the "forbidden time window" where a variable exists in memory but you cannot use it yet


console.log(a)   var a = 10
console.log(b)   let b = 20
console.log(c)   const c = 30

|---------- Hoisting ----------|
|   a = undefined              |
|   b = (TDZ)                  |
|   c = (TDZ)                  |
|------------------------------- Execution ----------------------------|
| console.log(a) → undefined    |
| console.log(b) → ReferenceErr |
| console.log(c) → ReferenceErr |
| a = 10   | b = 20   | c = 30  |




*/

/* 
📖 Definition

👉 Closures is an ability of a function to remember the variables and functions that are declared in its outer scope 
— even after that outer scope has finished executing.
👉 A closure is created when a function “remembers” the variables from its lexical scope even after that function is executed outside of its original scope.
👉 In other words, a function bundled with its surrounding state (the lexical environment).


🔑 Key Points

👉 Functions carry scope with them
Inner functions have access to variables of their outer functions.
👉 Every function in JS creates a closure automatically

👉 Persistent state
Even if the outer function has returned, the inner function keeps a reference to the outer variables, not a copy.

👉 Useful for data privacy, function factories, and callbacks
You can use closures to emulate private state because outside code cannot directly access the enclosed variables.

👉 Because closures keep variables “alive,” they can sometimes cause memory leaks if not managed carefully.
👉 Common in async code, event handlers, and functional programming


Examples



🧩 Examples
1. Basic Closure
function outer() {
  let count = 0
  function inner() {
    count++
    return count
  }
  return inner
}

const counter = outer()
console.log(counter()) // 1
console.log(counter()) // 2
console.log(counter()) // 3


👉 counter still remembers count even though outer has finished

2. Function Factory
function multiplier(factor) {
  return function(x) {
    return x * factor
  }
}

const double = multiplier(2)
const triple = multiplier(3)

console.log(double(5)) // 10
console.log(triple(5)) // 15

3. Data Privacy (Encapsulation)
function createBankAccount() {
  let balance = 0
  return {
    deposit(amount) { balance += amount },
    getBalance() { return balance }
  }
}

const account = createBankAccount()
account.deposit(100)
console.log(account.getBalance()) // 100


👉 balance is private, can’t be accessed directly

4. Closures with Event Listeners
function setupButton(id) {
  let clicks = 0
  document.getElementById(id).addEventListener("click", () => {
    clicks++
    console.log(`Button clicked ${clicks} times`)
  })
}
setupButton("myBtn")


👉 Each button gets its own private clicks counter

5. Closure in Async Code
function delayedMessage(msg, delay) {
  setTimeout(() => {
    console.log("Message:", msg)
  }, delay)
}

delayedMessage("Hello after 1s", 1000)


👉 The callback remembers msg even after delayedMessage finished





💡 Use Cases

👉 Data privacy (simulate private variables)
👉 Creating factories (specialized functions) → generate functions with preconfigured behavior.
👉 Maintaining state in async code
👉 Event handlers and callbacks  → closures capture variables from the environment.
👉 Functional utilities (once, debounce, throttle use closures)
👉 Memoization → store computed values across calls.
👉 Module pattern → organize code with encapsulated state.


✅ Benefits

👉 Encapsulation without needing classes
👉 Helps avoid polluting global scope
👉 Very powerful in async/event-driven code

⚠️ Cons

👉 Can cause memory leaks if references are held too long (e.g., big objects in closures not released)
👉 Sometimes harder to debug because values are “hidden” in closures

📝 Takeaway

👉 A closure = function + its surrounding lexical environment
👉 They give you access to outer variables even after the outer function is gone
👉 Extremely useful for state, privacy, async, and functional patterns

*/

/* 


Hoisting in JavaScript is the behavior where variable and function declarations are moved (“hoisted”) to the top of their scope
(either global scope or function scope) during the compilation phase, before the code is executed.

Key Points

Only declarations are hoisted
Initializations/assignments are not hoisted.
Function declarations are fully hoisted
You can call a function declared with function before it appears in the code.

var is hoisted
Variables declared with var are hoisted to the top and initialized with undefined.

let and const are hoisted too
But they are put into the temporal dead zone (TDZ) until the declaration is executed → accessing them before declaration causes a ReferenceError.

Scope matters
Hoisting works within each function scope and block scope, not across everything globally.

Examples
1. Function Declaration Hoisting
sayHi(); // works, prints "Hi!"

function sayHi() {
  console.log("Hi!");
}

2. var Hoisting
console.log(x); // undefined (declaration hoisted, not assignment)
var x = 5;

3. let / const Hoisting
console.log(y); // ReferenceError (TDZ)
let y = 10;

console.log(z); // ReferenceError (TDZ)
const z = 20;

4. Function Expressions (not hoisted fully)
greet(); // TypeError: greet is not a function
var greet = function() {
  console.log("Hello");
};


*/

/* 

Special Add Exercise
Write a function called specialAdd. If you give this function a number, it
returns a new function to you. If you give this function no arguments, it
returns the total of all the numbers you've passed to it so far.

Examples:
specialAdd(); // 0
specialAdd(1)(2)(); // 3
specialAdd(2)(8)(5)(1)(); // 16

*/

function specialAdd(init) {
  if (init === undefined) return 0;
  return function innerSum(num) {
    if (num === undefined) return init;
    init += num;
    return innerSum;
  };
}

/* 
 
👉 Debouncing is a programming technique used to limit how often a function is executed.
It ensures that a function runs only after a certain period of time has passed since the last time it was invoked.
👉 It’s commonly used to limit high-frequency events (scrolling, resizing, typing)

🔑 Key Points

👉 Prevents a function from running too often
👉 Delays execution until user “stops” doing the action
👉 Helps improve performance and resource usage
👉 Often confused with throttling (but throttling runs at intervals, debouncing runs once after inactivity)

🧩 Example: Basic Debounce
function debounce(func, delay) {
  let timeout
  return function(...args) {
    clearTimeout(timeout)                // reset timer
    timeout = setTimeout(() => {
      func.apply(this, args)             // run after delay
    }, delay)
  }
}


Usage:

window.addEventListener("resize", debounce(() => {
  console.log("Resize event after user stopped resizing")
}, 500))


👉 Here, the function runs only once after resizing stops for 500ms

🧩 Example: Input Search
const search = debounce((query) => {
  console.log("Searching for:", query)
}, 300)

document.getElementById("input").addEventListener("input", e => {
  search(e.target.value)
})


👉 Even if the user types quickly, the search function only fires 300ms after typing stops

💡 Use Cases

👉 Search boxes with API calls (prevent spamming the server)
👉 Window resize/scroll handlers (prevent constant re-rendering)
👉 Button clicks (avoid double submissions)
👉 Form validations while typing

✅ Benefits

👉 Improves performance for high-frequency events
👉 Reduces unnecessary API calls or DOM updates
👉 Enhances user experience by avoiding laggy behavior

⚠️ Cons

👉 Adds slight delay in response (user must stop interacting before function runs)
👉 If delay is too long, UI may feel unresponsive
👉 Requires careful tuning of the debounce interval

📝 Takeaway

👉 Debounce = wait until the user stops doing something, then run the function once
👉 Use it when you want to reduce the number of executions of a function caused by repetitive events
*/


/* 

A Higher-Order Function (HOF) in JavaScript is a function that either 
Takes one or more functions as arguments, or Returns a function as its result, or both.



Key Points

Functions are first-class citizens in JavaScript → they can be passed around just like values.
HOFs allow more abstraction and reusability.
Very common in functional programming style.
Built-in methods like map, filter, reduce, forEach are HOFs.




Examples



1. Function passed as an argument
function greet(name) {
  return "Hello, " + name;
}

function processUserInput(fn) {
  const name = "Hesham";
  return fn(name);
}

console.log(processUserInput(greet)); 
// "Hello, Hesham"




2. Function returning another function
function multiplier(factor) {
  return function (x) {
    return x * factor;
  };
}

const double = multiplier(2);
console.log(double(5)); // 10



3. Built-in Array HOFs
const numbers = [1, 2, 3, 4, 5];

const doubled = numbers.map(n => n * 2); 
console.log(doubled); // [2, 4, 6, 8, 10]

const evens = numbers.filter(n => n % 2 === 0);
console.log(evens); // [2, 4]

const sum = numbers.reduce((acc, n) => acc + n, 0);
console.log(sum); // 15




Use Cases

Code reusability (abstracting repetitive logic).
Function composition (building bigger logic from small pieces).
Asynchronous control (e.g., passing callbacks to setTimeout, promises).
Event handling (pass handler functions).
Currying/partial application.
Callbacks: e.g. setTimeout(() => {...}, 1000)
Event listeners: button.addEventListener("click", () => {...})
Function factories: returning functions preconfigured with certain behavior
Data transformations: arrays and streams
Middleware & pipelines: composing many functions together

*/

/* 

🔥 closures and higher-order functions (HOFs) are deeply connected in JavaScript

Relation

A higher-order function either takes a function as an argument or returns a function.
When a higher-order function returns a function, that returned function usually closes over (remembers) variables from the outer scope.
That’s where closures come in — they give the returned function access to the outer function’s variables even after the outer function has finished running.

So:
👉 Closures are the mechanism.
👉 Higher-order functions are the design pattern that often relies on closures.

*/

function debounce(func, delay) {
  let timeoutid = null;
  return function (...args) {
    clearTimeout(timeoutid);
    timeoutid = setTimeout(function () {
      func.apply(this, args);
    }, delay);
  };
}








/* 


👉 Throttling is a technique used to control how often a function is executed.
    It ensures that a function runs at most once within a specified time interval, no matter how many times it’s triggered.
👉 Unlike debouncing (which waits for inactivity), throttling guarantees regular execution at fixed intervals


👉 memory trick:
Debounce = run after calm.
Throttle = run at intervals.



🔑 Key Points

👉 Opposite of debounce:
    Debounce → wait until the activity stops.
    Throttle → run regularly at fixed intervals.
👉 Controls function execution frequency
👉 Useful for events that fire very often (scroll, resize, mousemove)
👉 Keeps performance smooth by limiting workload
👉 Common implementation uses timestamps or setTimeout



🧩 Example: Basic Throttle
function throttle(func, limit) {
  let inThrottle
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args)
      inThrottle = true
      setTimeout(() => inThrottle = false, limit)
    }
  }
}


Usage:

window.addEventListener("scroll", throttle(() => {
  console.log("Scroll event fired")
}, 1000))


👉 Here, the function will run at most once every 1000ms, even if the user keeps scrolling

🧩 Example: Using Timestamps
function throttle(func, limit) {
  let lastCall = 0
  return function(...args) {
    const now = Date.now()
    if (now - lastCall >= limit) {
      func.apply(this, args)
      lastCall = now
    }
  }
}

💡 Use Cases

👉 Handling scroll or resize events
👉 Tracking mouse movement without flooding updates
👉 Limiting button clicks to prevent spam actions
👉 APIs that should not be called too frequently (e.g., rate limits)

✅ Benefits

👉 Ensures function executes at consistent intervals
👉 Prevents performance bottlenecks on high-frequency events
👉 Keeps UI responsive while controlling workload

⚠️ Cons

👉 May skip some events between intervals
👉 Less precise than debouncing for “run after stop” scenarios
👉 Needs careful tuning of interval (too short = heavy load, too long = laggy)

📝 Takeaway

👉 Throttle = run the function at regular intervals, no matter how many times the event fires
👉 Use it when you want steady, periodic execution (e.g., scroll, resize, mousemove)
👉 Use debounce when you want only the final action after a pause (e.g., search input)



*/





/* 

throtlling issue with scroll 

pick a small enough throttle interval

if you throttle to ~100–200 ms, the UI is still responsive (5–10 updates per second)
the user doesn’t perceive lag, because the eye can’t catch gaps shorter than ~100 ms

combine throttle with a final call (trailing edge)

many implementations allow “leading” (run immediately) and “trailing” (run after the last event)
so when the user finishes scrolling, your function fires one last time and fills the screen



example using lodash:
window.addEventListener("scroll", _.throttle(loadMore, 200, { leading: true, trailing: true }));


*/





function throttle(func, delay, { leading = false, trailing = false } = {}) {
  let timer = null;
  let lastArgs = null;

  return function (...args) {
    const context = this;

    if (!timer) {
      if (leading) func.apply(context, args);

      timer = setTimeout(() => {
        if (trailing && lastArgs) {
          func.apply(context, lastArgs);
          lastArgs = null;
        }
        timer = null;
      }, delay);
    } else {
      // save latest args for trailing call
      lastArgs = args;
    }
  };
}







/* 
Functional Programming (FP)

Functional Programming is a declarative programming paradigm where software is built by composing pure functions 
and avoiding shared state, mutable data, and side effects.
It emphasizes what to do rather than how to do it—in contrast with imperative programming, which describes step-by-step instructions.





🔑 Key Principles
1. Pure Functions

Always return the same output for the same input.

Have no side effects (do not modify external state).

function add(a, b) {
  return a + b; // pure, no side effects
}





2. Immutability

Data is never modified in place.

Instead, new copies are created when changes are needed.

const arr = [1, 2, 3];

// ❌ Imperative (mutates original)
arr.push(4);

// ✅ Functional (returns new array)
const newArr = [...arr, 4];





3. First-Class & Higher-Order Functions

Functions are treated like values.

They can be stored in variables, passed as arguments, or returned from other functions.

const numbers = [1, 2, 3, 4];

const doubled = numbers.map(n => n * 2);         // [2, 4, 6, 8]
const evens   = numbers.filter(n => n % 2 === 0); // [2, 4]
const sum     = numbers.reduce((a, b) => a + b, 0); // 10





4. Function Composition

Combine small, reusable functions to build more complex behavior.

const multiplyBy2 = x => x * 2;
const add3 = x => x + 3;

const composed = x => add3(multiplyBy2(x));
console.log(composed(5)); // 13





5. Declarative Style

Express what you want instead of how to achieve it.

Example: using map, filter, reduce instead of explicit for loops.





📌 Use Cases

Data transformations (filtering, mapping, reducing lists).
UI frameworks (e.g., React) use FP concepts (pure components, immutability).
Concurrency and parallelism (no shared mutable state = fewer bugs).
Writing safer, more predictable, and testable code.

✅ Pros

Predictable: same input → same output.
Easier testing and debugging.
Safer with async/parallel code.
Encourages modular, reusable design.


❌ Cons

Potentially less performant (extra object/array copies).
Can feel abstract and harder for those used to imperative loops.

👉 Short Interview-Ready Definition

Functional Programming is a declarative paradigm that builds software 
by composing pure, immutable functions and avoiding side effects, focusing on what to do rather than how to do it.


*/







/* 

Functional Programming (FP) vs Object-Oriented Programming (OOP):

🔹 Functional Programming (FP)
Core Idea: Build programs by composing pure functions.
Focus: What to do (declarative).
State/Data: Immutable (never changes).
Behavior: Functions transform data and return new values.
Reusability: Achieved through function composition.
Examples in JS: map, filter, reduce, pure helper functions.

// FP example: double all numbers
const nums = [1, 2, 3];
const doubled = nums.map(n => n * 2); // [2, 4, 6]




🔹 Object-Oriented Programming (OOP)
Core Idea: Build programs by modeling objects with state + behavior.
Focus: How to do it (imperative).
State/Data: Mutable (objects hold state that can change).
Behavior: Methods act on the object’s internal state.
Reusability: Achieved through inheritance and polymorphism.
Examples in JS: Classes, objects with methods.




// OOP example: double all numbers
class Doubler {
  constructor(nums) {
    this.nums = nums;
  }
  double() {
    return this.nums.map(n => n * 2);
  }
}

const d = new Doubler([1, 2, 3]);
console.log(d.double()); // [2, 4, 6]


*/



/* 

| Aspect          | Functional Programming (FP) | Object-Oriented Programming (OOP) |
| --------------- | --------------------------- | --------------------------------- |
| Building blocks | Pure functions              | Classes & objects                 |
| Data            | Immutable                   | Mutable state inside objects      |
| Style           | Declarative (“what”)        | Imperative (“how”)                |
| Reuse           | Function composition        | Inheritance & polymorphism        |
| Side effects    | Avoided                     | Common (methods can mutate state) |



*/



/* 

🔹 React with OOP (Class Components)

Before React 16.8, the main way to handle state & lifecycle was with classes.
Fits OOP → each component is an object with state (mutable) and methods (lifecycle functions).


OOP traits:

Encapsulation (this.state is internal).
Methods (render, increment).
Mutable state (this.setState changes it).



🔹 React with FP (Functional Components + Hooks)

Modern React favors functions.
Functions + hooks make components stateless by default, adding state via closures (useState).
functional programming style → pure functions, immutable updates.


FP traits:

Counter is just a pure function of props → UI.
useState uses closures to manage state.
Updates are immutable (setCount(c => c + 1)).
Hooks (useEffect, useMemo) encourage composition, not inheritance.





| Aspect       | Class Components (OOP) | Functional Components (FP)     |
| ------------ | ---------------------- | ------------------------------ |
| Style        | Imperative (methods)   | Declarative (functions)        |
| State        | `this.state` (mutable) | `useState` (immutable updates) |
| Reuse        | Inheritance, HOCs      | Hooks (composition)            |
| Readability  | Verbose                | Concise                        |
| Modern Trend | Legacy support         | Standard way since React 16.8  |


*/






/* 


⚔️ OOP vs FP


| Aspect                | Object-Oriented Programming (OOP)                                                 | Functional Programming (FP)                                                      |
| --------------------- | --------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| **Paradigm Type**     | **Imperative**                                                                    | **Declarative**                                                                  |
| **Core Idea**         | Model real-world entities as **objects** (data + behavior together)               | Model problems using **pure functions** and immutable data                       |
| **State Handling**    | Encapsulates and mutates state inside objects                                     | Avoids shared state; uses immutable values                                       |
| **Code Reuse**        | Inheritance and polymorphism                                                      | Function composition and higher-order functions                                  |
| **Ease of Reasoning** | Sometimes harder due to hidden state mutations                                    | Easier (same input → same output)                                                |
| **Side Effects**      | Common and allowed (but ideally encapsulated in objects)                          | Avoided or explicitly handled                                                    |
| **Common Use Cases**  | Large systems with interacting entities (banking, ERP, simulations, game engines) | Data transformations, analytics, concurrent/async systems, UI frameworks (React) |
| **Strengths**         | Clear modeling of real-world entities, widely taught, common in enterprise        | Predictable, testable, cleaner async logic, modular                              |
| **Weaknesses**        | State mutations can cause bugs, inheritance trees can get complex                 | Performance overhead (extra copies), can feel abstract at first                  |





⚡ Quick Rule of Thumb

Use OOP when:

Modeling domains with clear entities (Users, Accounts, Products).
Working in OOP-heavy ecosystems (Java, C#, C++).
You need extensible hierarchies and polymorphism.

Use FP when:

Transforming and processing data (streams, lists, analytics).
You need predictable, testable logic.
You’re dealing with concurrency/async-heavy systems.
Working in FP-friendly environments (JavaScript, Scala, Haskell, Elixir, F#).

*/



/* 


Imperative Programming

is all about discribing how programs operate step by step using statements
that change a program's state


*/


let sum = 0 // state

for (let i = 1; i <= 5; i++) {
  sum += i // step by step instructions that change state
  // mutated & updated 
}


// functional programming
// its all about focusing wat need to be solved rather than how to solve it
// using expressions that evaluate to values
// avoiding shared state, mutable data, and side effects


[1, 2, 3, 4, 5].reduce((acc, n) => acc + n, 0) 
// no state mutation, no side effects


// ANOTHER EXAMPLE


// imperative programming
const nums = [1, 2, 3, 4, 5]
const evens = [];

for (let i = 0; i < nums.length; i++) {
  if (nums[i] % 2 === 0) {
    evens.push(nums[i])
  } 
}// imperative, step by step instructions, mutable state (evens array is changed)

// functional programming
const evensFP = nums.filter(n => n % 2 === 0) 
// declarative, what to do, no state mutation, no side effects


// pure vs impure functions

// pure functions

/* 


Pure Functions

A pure function is a function that:
Given the same input, always produces the same output
Has no side effects (doesn’t modify external state, doesn’t depend on external mutable state)

Key Properties
Deterministic → same input → same output
No side effects → doesn’t change variables outside its scope, 
doesn’t do I/O like writing to a file or updating the DOM
Testable → easy to test because output only depends on input
Composable → can be combined with other pure functions safely




Examples


✅ Pure
function add(a, b) {
  return a + b;
}

console.log(add(2, 3)); // 5
console.log(add(2, 3)); // always 5



❌ Impure (side effect: changing external variable)
let counter = 0;

function increment() {
  counter++;   // modifies external state
  return counter;
}

console.log(increment()); // depends on external state

❌ Impure (non-deterministic: uses Date)
function getCurrentTime() {
  return new Date().toISOString(); // depends on system time
}

Use Cases

Functional programming (building blocks are pure functions)
Predictable state updates (e.g., Redux reducers in React must be pure)
Easier testing (just check inputs/outputs)
Safer concurrency (no shared state mutation)


*/
// additional pure vs impure function example
const baselineCart = Object.freeze([
  { id: 1, qty: 1 },
  { id: 2, qty: 2 }
])

function addItemPure(cart, item) {
  return [...cart, item] // pure: returns new array, leaves input untouched
}

let sharedCart = [...baselineCart]

function addItemImpure(item) {
  sharedCart.push(item) // impure: mutates external state
  return sharedCart
}

const newCart = addItemPure(baselineCart, { id: 3, qty: 1 })
console.log(newCart)
console.log(baselineCart) // unchanged

console.log(addItemImpure({ id: 3, qty: 1 }))
console.log(addItemImpure({ id: 4, qty: 1 })) // result depends on sharedCart


/* 

✅ When to Use Pure Functions

Use pure functions when you want:

Predictability
Pure functions always return the same result for the same inputs.
Example: sum(a,b) → easy to reason about.

Testability
Since they don’t depend on external state, they’re easy to test in isolation.

Reusability & Composition
Pure functions can be combined to form more complex logic without side effects.

Immutability / Functional style
In state management (e.g., React reducers, Redux), pure functions ensure predictable state updates




✅ When to Use Impure Functions

Sometimes impure functions are necessary because programs must interact with the outside world:


I/O Operations
Reading from/writing to a database, file, or network.
Logging to console.

User Interaction
Updating the DOM in a browser.
Handling clicks, keypresses, etc.

Randomness / Time
Math.random() or Date.now() are inherently impure because they depend on external state (system clock, RNG).

Side Effects by Design
If your program must cause a visible effect (UI update, API call), you have to use impure functions

*/




/* 

Referential Transparency means: an expression can be replaced by its value (or result)
 without changing the behavior of the program.

If a function is pure, then calling it with the same arguments always gives the same result.
Therefore, any call to that function can be swapped with its result → that’s referential transparency.

Key Points

Depends on purity
Only pure functions are referentially transparent.
Impure functions (with side effects) are not referentially transparent.

Substitutability
If f(2,3) always returns 5, you can replace f(2,3) with 5 anywhere in your program, and nothing breaks.

Predictability
Code is easier to reason about because expressions are consistent and interchangeable with their values.





Use Cases / Why Important

Makes code easier to test → replace function calls with expected values.
Helps in reasoning about correctness of programs.
Enables compiler optimizations (e.g., memoization, lazy evaluation).
Foundation of functional programming languages like Haskell.

✅ Quick Memory Trick

Pure functions ⇒ Referential Transparency.
Impure functions ⇒ No Referential Transparency.
If you can “replace with the result” safely, you have referential transparency.

*/



// first class functions
// functions are treated like any other value
// can be assigned to variables, passed as arguments, returned from other functions


/* 
// First-Class Functions
functions are treated like any other value.
That means in JavaScript:

Functions can be assigned to variables
Functions can be passed as arguments
Functions can be returned from other functions
Functions can be stored in data structures (arrays, objects)


>> This is why higher-order functions, closures, and functional programming are natural in JS.

Key Points

Functions are objects in JS → they can have properties, be referenced, and manipulated.
This makes higher-order functions possible (functions that take/return functions).
Enables powerful patterns like callbacks, closures, currying, and functional programming.




Examples
1. Assigning to variables
const greet = function(name) {
  return "Hello, " + name;
};

console.log(greet("Hesham")); // "Hello, Hesham"

2. Passing as arguments
function processUserInput(fn) {
  const name = "Hesham";
  console.log(fn(name));
}

processUserInput(greet); // "Hello, Hesham"

3. Returning functions
function multiplier(factor) {
  return function(num) {
    return num * factor;
  };
}

const double = multiplier(2);
console.log(double(5)); // 10

4. Storing in data structures
const operations = [
  x => x + 1,
  x => x * 2,
  x => x - 3
];

let value = 5;
for (const op of operations) {
  value = op(value);
}
console.log(value); // ((5+1)*2)-3 = 9

*/



const greet = function (name) {
  return "Hello, " + name;
}

console.log(greet("Hesham")); // "Hello, Hesham"

function processUserInput(fn) {
  const name = "Hesham";
  return fn(name);
} 
console.log(processUserInput(greet)); // "Hello, Hesham"


/* 

👉 A Higher-Order Function (HOF) in JavaScript is a function that either 
Takes one or more functions as arguments, or Returns a function as its result, or both.
👉 They are a core feature of functional programming and make code more composable, reusable, and expressive


🔑 Key Points

👉 Treat functions as first-class citizens (functions can be passed around like variables)
👉 Enable callbacks, function factories, and composition
👉 Common in array methods (map, filter, reduce)
👉 Can wrap, decorate, or enhance other functions

🧩 Examples
1. Function as Argument (Callback)
function repeat(n, action) {
  for (let i = 0; i < n; i++) {
    action(i)
  }
}

repeat(3, console.log)
// 0
// 1
// 2

2. Function Returning Another Function
function multiplier(factor) {
  return function(x) {
    return x * factor
  }
}

const double = multiplier(2)
console.log(double(5)) // 10

3. Array Methods (map, filter, reduce)
const numbers = [1, 2, 3, 4]

const squares = numbers.map(n => n * n)   // [1,4,9,16]
const evens   = numbers.filter(n => n % 2 === 0) // [2,4]
const sum     = numbers.reduce((a, b) => a + b, 0) // 10

4. Custom Higher-Order Function (Decorator)
function once(fn) {
  let called = false
  return (...args) => {
    if (!called) {
      called = true
      return fn(...args)
    }
  }
}

const sayHiOnce = once(() => console.log("Hi"))
sayHiOnce() // "Hi"
sayHiOnce() // nothing

5. Composition Helper (HOF creating new function)
const compose = (f, g) => x => f(g(x))

const toUpper = s => s.toUpperCase()
const exclaim = s => s + "!"

const shout = compose(exclaim, toUpper)
console.log(shout("hello")) // "HELLO!"

💡 Use Cases

👉 Event handlers and callbacks (e.g., DOM events)
👉 Function decorators (once, debounce, throttle)
👉 Array transformations (map, filter, reduce)
👉 Middleware systems (Express, Redux)
👉 Function composition and pipelines

✅ Benefits

👉 More reusable and abstract code
👉 Cleaner, declarative style
👉 Great for handling async tasks and events
👉 Encourages functional programming practices

⚠️ Cons

👉 May confuse beginners (functions returning functions)
👉 Debugging is harder inside deep chains
👉 Over-abstracting can reduce readability

📝 Takeaway

👉 A higher-order function is simply a function that accepts or returns another function
👉 They’re everywhere in JS: array methods, event listeners, decorators, middleware, composition helpers
👉 They are the foundation of functional programming in JavaScript

*/

function multiplier(factor) {
  return function (x) {
    return x * factor;
  };  
}
const double = multiplier(2);
console.log(double(5)); // 10
const triple = multiplier(3);
console.log(triple(5)); // 15 





/* 

👉 A combinator is a higher-order function that takes one or more functions as input and returns a new function
👉 In JavaScript, combinators are often used for function composition and data transformation
👉 They come from lambda calculus and functional programming

🔑 Key Points

👉 Combinators = “glue” functions
👉 No external state → everything comes from arguments
👉 Useful for composition, transformation pipelines, FP utilities
👉 Common in Ramda, Lodash/fp, Redux, RxJS


🧩 Combinator Examples
1. Identity (I)
const I = x => x
console.log(I(42)) // 42

2. Constant (K)
const K = x => _ => x
console.log(K("hello")("ignored")) // hello

3. Compose (right → left)
const compose = (...fns) => x => fns.reduceRight((v, f) => f(v), x)

const trim = s => s.trim()
const upper = s => s.toUpperCase()
const exclaim = s => s + '!'

const shout = compose(exclaim, upper, trim)
console.log(shout("  hi  ")) // HI!

4. Pipe (left → right)
const pipe = (...fns) => x => fns.reduce((v, f) => f(v), x)

const shout2 = pipe(trim, upper, exclaim)
console.log(shout2("  hi  ")) // HI!

5. Flip

👉 Reverses the order of arguments for a function

const flip = f => (a, b, ...rest) => f(b, a, ...rest)

const subtract = (a, b) => a - b
console.log(subtract(10, 5))     // 5
console.log(flip(subtract)(10, 5)) // -5

6. On

👉 Runs a projection on inputs before applying a binary function

const on = (op, proj) => (a, b) => op(proj(a), proj(b))

const compareLength = on((a, b) => a - b, s => s.length)
console.log(compareLength("cat", "horse")) // -2 (3 - 5)

7. Sort by Length (using on)
const sortByLength = arr =>
  [...arr].sort(on((a, b) => a - b, s => s.length))

console.log(sortByLength(["banana", "fig", "apple"])) 
// [ 'fig', 'apple', 'banana' ]

8. Fork / Converge

👉 Apply two functions to the same input, then combine the results

const fork = (join, f, g) => x => join(f(x), g(x))

const average = fork((a, b) => a / b, arr => arr.reduce((s, n) => s + n, 0), arr => arr.length)

console.log(average([10, 20, 30, 40])) // 25

9. Until

👉 Repeatedly apply a function until a condition is met

const until = (pred, fn) => x => {
  let v = x
  while (!pred(v)) {
    v = fn(v)
  }
  return v
}

const doubleUntil100 = until(x => x > 100, x => x * 2)
console.log(doubleUntil100(3)) // 192

10. Once

👉 Wraps a function so it can only run once

const once = fn => {
  let done = false, result
  return (...args) => {
    if (!done) {
      result = fn(...args)
      done = true
    }
    return result
  }
}

const init = once(() => console.log("Init only once"))
init() // "Init only once"
init() // nothing

11. Tap

👉 Run a side effect without breaking the chain

const tap = f => x => (f(x), x)

pipe(
  x => x * 2,
  tap(v => console.log("after double:", v)),
  x => x + 1
)(5) // logs 10 → returns 11

💡 Use Cases

👉 Function pipelines (compose, pipe)
👉 Reordering / transforming arguments (flip, on)
👉 Sorting & comparison helpers (sortByLength)
👉 Combining results (fork / converge)
👉 Controlled execution (until, once)
👉 Debugging inside chains (tap)

✅ Benefits

👉 Encourages small, composable functions
👉 Clear declarative data flow
👉 Reusable across projects

⚠️ Cons

👉 Can be abstract for beginners
👉 Too much functional jargon (I, K, S, etc.) may reduce readability
👉 Debugging inside deep combinator chains can be harder

📝 Takeaway

👉 Combinators = higher-order functions for combining and controlling other functions
👉 Core ones: compose, pipe, flip, on, fork/converge, until, once, tap, map
👉 They provide the building blocks for functional programming in JavaScript



*/

/* 

Immutability means that once a data structure (object, array, variable) is created, it cannot be changed.
If you want to “modify” it, you create a new copy with the updated values, leaving the original unchanged.


Key Points

Primitives are immutable
Numbers, strings, booleans → cannot be changed.
Example: "hello"[0] = "H" does nothing; string stays "hello".

Objects and arrays are mutable by default in JS
But you can choose to treat them immutably by creating copies.

Functional programming prefers immutability
Easier to reason about (no hidden changes).
Prevents bugs caused by shared mutable state.

React & Redux rely on immutability
State updates must create new objects, not mutate old ones.




Examples

✅ Immutable Update
const arr = [1, 2, 3];

// Instead of mutating with push
const newArr = [...arr, 4];

console.log(arr);    // [1, 2, 3]
console.log(newArr); // [1, 2, 3, 4]

❌ Mutable Update
const arr = [1, 2, 3];
arr.push(4); // modifies the original
console.log(arr); // [1, 2, 3, 4]



Objects
const person = { name: "Hesham", age: 25 };

// immutable update with spread
const updated = { ...person, age: 26 };

console.log(person); // { name: "Hesham", age: 25 }
console.log(updated); // { name: "Hesham", age: 26 }






Why Immutability Matters

Predictability → no hidden changes to objects.
Debugging → easier to track where data changes.
Concurrency → safe when multiple parts of a program access the same data.
React → detects changes via shallow comparison of old vs new state.



Tools for Immutability
Spread operator (...)
Array methods that return new arrays (map, filter, slice, concat)
Libraries: Immer.js, Immutable.js



✅ Memory trick:
Immutability = “don’t change the thing, make a new thing.”

*/




/* 

Recursion is when a function calls itself (directly or indirectly) in order to solve a problem by breaking it into smaller subproblems.

Key Points


Base Case
A condition that stops the recursion, preventing infinite calls.

Recursive Case
The part of the function where it calls itself with a smaller/simpler input.

Stack
Each recursive call is pushed onto the call stack.
Too many recursive calls without a base case → stack overflow error.




Examples
1. Factorial (classic recursion)
function factorial(n) {
  if (n === 0) return 1;   // base case
  return n * factorial(n - 1); // recursive case
}

console.log(factorial(5)); // 120

2. Fibonacci Sequence
function fibonacci(n) {
  if (n <= 1) return n;   // base cases: 0 or 1
  return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log(fibonacci(5)); // 5

3. Recursion vs Iteration
// iteration
function sumIterative(n) {
  let sum = 0;
  for (let i = 1; i <= n; i++) sum += i;
  return sum;
}

// recursion
function sumRecursive(n) {
  if (n === 0) return 0; // base case
  return n + sumRecursive(n - 1); // recursive case
}

console.log(sumIterative(5)); // 15
console.log(sumRecursive(5)); // 15






Use Cases

Tree and graph traversal (DOM tree, file systems).
Divide and conquer algorithms (merge sort, quicksort).
Problems naturally defined in recursive terms (factorials, Fibonacci).
Backtracking (solving mazes, Sudoku).




✅ Memory Trick

Recursion =

Base case → when to stop
Recursive case → keep breaking problem down
Think: “solve small piece + delegate the rest to myself”

*/



/* 


Recursion is considered a functional programming (FP) approach because:

Functional programming avoids loops
Many functional languages (like Haskell) don’t even have traditional for or while loops.
They use recursion as the main way to repeat actions.

Immutability fits recursion
Loops often mutate counters (i++) or accumulators.
Recursion can work without mutating variables → it just returns new values.

Declarative style
Recursion expresses what the solution looks like, not how to iterate step by step.
That matches FP’s declarative mindset.

*/




/* 

🔹 Recursion (normal)

Recursion = a function calls itself.
Example → factorial:

function factorial(n) {
  if (n === 0) return 1;
  return n * factorial(n - 1);  // recursive call
}


Problem: after the recursive call factorial(n - 1) finishes, the function still has to multiply by n.
This means the current function frame must stay alive in memory → stack grows.
For very large n, you’ll get a stack overflow error.



🔹 Tail Recursion

A function is tail-recursive if the recursive call is the last thing the function does.
Nothing is left to do after the recursive call returns.

Example → factorial rewritten as tail-recursive
function factorial(n, acc = 1) {
  if (n === 0) return acc;
  return factorial(n - 1, acc * n); // recursive call is the last operation
}


Notice: no extra multiplication after the recursive call returns.
All the work is passed into the acc (accumulator).
This makes it eligible for tail-call optimization (TCO), if the engine supports it.




🔹 Why Tail Recursion is Better

In languages with TCO (like Scheme, Haskell), the engine reuses the current stack frame → no stack growth.
That means you can recurse millions of times without stack overflow.

In JavaScript (except Safari):
Tail recursion works logically, but still grows the stack → still unsafe for very deep recursion.


*/



/* 

Why Tail Recursion Can Be Worse in JS

A tail-recursive function carries an extra accumulator parameter, which means each recursive call adds more data onto the stack.
Since JS doesn’t optimize tail calls, every call still consumes stack space.
For very large inputs, the tail-recursive version can blow the stack faster than a compact normal recursive version.



Example:

Normal factorial

function factorial(n) {
  if (n === 0) return 1;
  return n * factorial(n - 1);
}


Tail-recursive factorial

function factorial(n, acc = 1) {
  if (n === 0) return acc;
  return factorial(n - 1, acc * n);
}

#####################################
Try with a large n (e.g., 100000):
Both will crash with RangeError: Maximum call stack size exceeded
But the tail-recursive one often crashes sooner, because each frame has a bit more work (extra parameter passing).
#####################################



4. Best practice in JS
For large numbers or deep recursion → don’t rely on recursion in JS
Use iteration (for, while) or simulate TCO manually with a trampoline

✅ Summary

Tail recursion is only better if the engine supports TCO (not true in JS, except Safari).
In JS, both normal recursion and tail recursion will overflow the stack for large inputs.
Tail recursion can even be worse because of the extra accumulator parameter overhead.

*/




/* 

Trampolining is a technique to convert recursive function calls into an iterative process so you can avoid stack overflow.

Instead of recursion going deeper and deeper on the call stack, each recursive step returns a thunk (a function describing the next step).
A special function (the “trampoline”) repeatedly executes those thunks in a loop until a final value is produced.


🔹 Why Do We Need It?

In most languages with tail-call optimization (TCO) → tail recursion is safe.
In JavaScript → most engines (V8, SpiderMonkey) don’t support TCO → recursion still overflows for large inputs.
Trampolining is a workaround: you implement your own stack using thunks and a loop.

🔹 How It Works

Write your recursive function so it returns a function (thunk) instead of calling itself directly.
A trampoline function takes that initial function and keeps evaluating until the result is a value, not a function.

🔹 Trampoline Utility
function trampoline(fn) {
  return function (...args) {
    let result = fn(...args);
    while (typeof result === "function") {
      result = result();  // call the thunk
    }
    return result;
  };
}

🔹 Example 1: Factorial
function factorial(n, acc = 1) {
  if (n === 0) return acc;
  return () => factorial(n - 1, acc * n); // return thunk
}

const safeFactorial = trampoline(factorial);

console.log(safeFactorial(5));       // 120
console.log(safeFactorial(100000));  // ✅ works, no stack overflow

🔹 Example 2: Fibonacci (Tail Recursive)
function fibonacci(n, a = 0, b = 1) {
  if (n === 0) return a;
  if (n === 1) return b;
  return () => fibonacci(n - 1, b, a + b);
}

const safeFibonacci = trampoline(fibonacci);

console.log(safeFibonacci(10));     // 55
console.log(safeFibonacci(100000)); // ✅ no stack overflow

🔹 When Trampolining is Best

Works best with tail-recursive functions → each step is easy to turn into a thunk.
Can be applied to non-tail recursion, but it’s messy.



Benefits

Prevents stack overflow in deep recursion.
Lets you keep the elegance of recursion in JavaScript (where TCO isn’t available).
Keeps function logic clean (no manual loop writing).

🔹 Limitations

Overhead: each step creates a thunk (extra function). Slightly slower than a simple loop.
Not built-in: you must implement trampoline logic yourself.
Messy with non-tail recursion: not as clean as tail recursion.

✅ Summary

Trampolining = “bounce” recursive calls into a loop.
Use it in JavaScript when recursion is natural but risks stack overflow.
Best with tail recursion, possible (but messy) with normal recursion.
It simulates tail-call optimization (TCO) manually.

*/


/* 

Two separate recursion problems:

Stack overflow → solved by Tail Call Optimization (in some langs) or Trampolining (in JS manually)
Overlapping subproblems (repeated branches) → solved by Memoization / Dynamic Programming

*/



/* 


🔹 Trampolining vs Overlapping Subproblems

Trampolining only fixes the stack overflow problem (space complexity).
Overlapping subproblems is about time complexity (too many duplicate calls).
They’re independent problems:
Trampolining makes recursion safe for large depths.
Memoization/dynamic programming makes recursion efficient for overlapping calls.

✅ Summary

Overlapping subproblems = time complexity issue (too slow).
Stack overflow = space complexity issue (too deep recursion).
Memoization fixes time.
Trampolining (or TCO) fixes space.



Trampolining only affects space complexity (stack usage), not time complexity

Before trampolining:

Every recursive call consumes a new stack frame.
For n recursive calls, stack depth = O(n)
Deep recursion → stack overflow

After trampolining:

Recursion is converted into iteration using thunks + loop.
Stack depth = O(1), constant space.
No stack overflow.


*/





/* 

📖 Definition

👉 Partial Application — one of the key techniques in functional programming
👉 Partial application is the process of taking a function with multiple arguments and fixing (pre-filling) (locking) some of its arguments, 
returning a new function that takes the remaining arguments.
👉 It’s like “pre-filling” a function’s parameters
👉 It’s like saying: “I’ll give you some inputs now, and I’ll finish the rest later.”


🔑 Key Points

👉 Partial application ≠ currying (though they are related)
👉 Currying transforms a function of many args into a sequence of unary functions
👉 Partial application just fixes some args now and lets you supply the rest later
👉 Turns a function of n arguments → into a function of m arguments (m < n).
👉 Makes functions more reusable and composable.
👉 Often used to create specialized versions of generic functions





1. Simple Partial Application
1. Normal Function
function multiply(a, b, c) {
  return a * b * c;
}

2. Partial Application
function partialMultiply(a) {
  return function(b, c) {
    return multiply(a, b, c);
  };
}

const doubleAndX = partialMultiply(2);
console.log(doubleAndX(3, 4)); // 24  (2 * 3 * 4)


Here we fixed a = 2 and created a new function.


2. Using bind for Partial Application

JS already supports partial application with bind:

function multiply(a, b, c) {
  return a * b * c;
}

const doubleAndX = multiply.bind(null, 2);
console.log(doubleAndX(3, 4)); // 24


3. Real-World Example (DOM Event)
function addEvent(el, event, handler) {
  el.addEventListener(event, handler)
}

const onClick = partial(addEvent, document.getElementById("btn"), "click")
onClick(() => console.log("Button clicked!"))


# More Realistic Example

Suppose you have a logging function:

function log(level, message) {
  console.log(`[${level}] ${message}`);
}


You can create partials:

const info = log.bind(null, "INFO");
const error = log.bind(null, "ERROR");

info("App started");   // [INFO] App started
error("Something failed"); // [ERROR] Something failed



💡 Use Cases

👉 Creating specialized functions from generic ones
👉 Reusing utility functions with preconfigured arguments
👉 Configuring event handlers
👉 Building APIs and middleware (e.g., Express route handlers)
👉 Readability (clearer intent with fixed parameters)

✅ Benefits

👉 Reduces repetition by “preloading” common args
👉 Improves readability with more descriptive functions
👉 Encourages reusability and modularity

⚠️ Cons

👉 Can be confused with currying
👉 Overuse may make code harder to follow
👉 Native bind is limited (only fixes leading args)

📝 Takeaway

👉 Partial application = pre-filling some arguments of a function
👉 It returns a new function waiting for the rest of the args
👉 You can implement it manually, use bind, or libraries like Lodash (_.partial)

*/




/* 

// Simple Partial Application

function partial(func, ...fixedArgs) {
  return function (...remainingArgs) {
    return func(...fixedArgs, ...remainingArgs);
  };
}




// Custom Partial Application with Placeholders

const _ = Symbol("placeholder");

function partial(func, ...presetArgs) {
  return function(...laterArgs) {
    let position = 0;
    const finalArgs = presetArgs.map(arg =>
      arg === _ ? laterArgs[position++] : arg
    );
    return func(...finalArgs, ...laterArgs.slice(position));
  };
}

// Example
function sum(a, b, c) {
  return a + b + c;
}

const bindSecond = partial(sum, _, 2, _);
console.log(bindSecond(5, 10)); // 17 (5 + 2 + 10)






*/


/* 

Partial Application relies on three FP fundamentals:

1. First-Class Functions

Functions can be passed around like data.

Without this, you couldn’t return a new function after fixing some arguments.

Example:

function partialMultiply(a) {
  return function(b, c) {   // returning a new function
    return a * b * c;
  };
}


Here, partialMultiply returns a function — possible only because functions are first-class citizens in JS.

2. Higher-Order Functions (HOFs)

A HOF is a function that takes or returns another function.

Partial application is implemented as a HOF because it returns a new function with some arguments pre-filled.

function partial(fn, fixedA) {
  return function(b, c) {    // HOF returns another function
    return fn(fixedA, b, c);
  };
}

3. Closures

A closure lets the inner function “remember” the fixed arguments even after the outer function has finished executing.

This is what makes the pre-filled values stay alive.

function partial(fn, fixedA) {
  return function(b, c) {
    // inner function "remembers" fixedA via closure
    return fn(fixedA, b, c);
  };
}

const doubleAndX = partial((a,b,c) => a*b*c, 2);
console.log(doubleAndX(3, 4)); // 24


Even though partial has finished, the inner function still has access to fixedA.

✅ Summary

First-class functions → functions can be treated as data (return, pass, assign).
HOFs → partial application is a higher-order function.
Closures → preserve the fixed arguments for later calls.

*/





/* 


📖 Definition

👉 Currying is the process of transforming a function that takes multiple arguments into a sequence of functions, 
each taking exactly one argument, and returning another function until all arguments are provided.
👉 Instead of calling f(a, b, c), you call f(a)(b)(c)



🔑 Key Points


👉 Always returns a new function until all arguments are supplied
Always unary functions
Each function takes only one argument and returns another function.

👉 Makes functions more reusable & composable

👉 Enables partial application naturally
Because you can stop after supplying some arguments.
currying is one of the ways to get partial application

👉 Pure FP technique
Originated in functional languages like Haskell, but usable in JavaScript.

👉 Different from partial application:
Partial Application → fix some arguments now, pass the rest later
Currying → transform a multi-arg function into chained single-arg calls
👉 Common in functional programming libraries (Ramda, Lodash/fp)



Currying: forces you to provide args one at a time.

🔹 Examples
1. Normal function
function add(a, b, c) {
  return a + b + c;
}

console.log(add(1, 2, 3)); // 6

2. Curried version
function curriedAdd(a) {
  return function(b) {
    return function(c) {
      return a + b + c;
    };
  };
}

console.log(curriedAdd(1)(2)(3)); // 6

3. With Arrow Functions
const curriedAdd = a => b => c => a + b + c;
console.log(curriedAdd(1)(2)(3)); // 6

4. Use Case: Specializing Functions
const multiply = a => b => a * b;

const double = multiply(2);  // function that multiplies by 2
console.log(double(5)); // 10

const triple = multiply(3);
console.log(triple(5)); // 15

5. Functional Programming Example (Filtering)
const greaterThan = x => y => y > x;

const greaterThan10 = greaterThan(10);
console.log([5, 12, 20].filter(greaterThan10)); // [12, 20]


💡 Use Cases

👉 Creating reusable, specialized functions (like pre-filled config)
👉 Function composition (compose/pipe works best with curried functions)
👉 Point-free style → writing code without explicitly passing args everywhere.
👉 React/Redux → often used in middleware, selectors, and hooks.
👉 Declarative code style in functional programming
👉 Partially applying arguments step by step

✅ Benefits

👉 Cleaner code when reusing functions with fewer arguments
👉 Works naturally with compose/pipe pipelines
👉 Encourages declarative, functional style
👉 Enables powerful abstractions in libraries (Ramda, Redux, RxJS)

⚠️ Cons

👉 Can confuse beginners (f(a)(b)(c) vs f(a, b, c))
👉 Extra function calls may slightly impact performance in hot paths
👉 Not always needed in simpler imperative code

📝 Takeaway

👉 Currying = breaking a multi-arg function into a chain of single-arg functions
👉 Example: sum(1, 2, 3) → sum(1)(2)(3)
👉 Works great with function composition and FP libraries


*/




/* 

1. Basic Currying
const add = a => b => c => a + b + c;

console.log(add(1)(2)(3)); // 6


2.enhanced currying
function add3(x, y, z) {
  return x + y + z;
}

function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    } else {
      return function (...args2) {
        return curried.apply(this, args.concat(args2));
      };
    }
  };
}

const curriedAdd = curry(add3);


3. Enhanced Currying with Placeholders
// Allows skipping arguments and filling them later (like lodash curry)
const _ = Symbol("placeholder");

function curryWithPlaceholder(fn) {
  return function curried(...args) {
    const complete = args.length >= fn.length && !args.includes(_);
    if (complete) {
      return fn.apply(this, args);
    } else {
      return function (...args2) {
        // Replace placeholders with new arguments
        const mergedArgs = args.map(arg => (arg === _ && args2.length ? args2.shift() : arg)).concat(args2);
        return curried.apply(this, mergedArgs);
      };
    } 
  };
}

const curriedAddPH = curryWithPlaceholder(add3);
console.log(curriedAddPH(_, 2, 3)(1)); // 6
console.log(curriedAddPH(1, _, 3)(2)); // 6
console.log(curriedAddPH(1, 2, _)(3)); // 6

// Pros: Very flexible, supports out-of-order argument application



3. Dynamic Currying (variadic style)

Here’s the pattern you asked about:

function add(a) {
  let sum = a;

  function inner(b) {
    if (b === undefined) return sum; // stop when no args
    sum += b;
    return inner; // return itself for chaining
  }

  return inner;
}

console.log(add(1)(5)(5)()); // 11
console.log(add(5)(3)());    // 8


👉 This works because of closures:

sum is remembered inside inner.
Each call updates sum.
Calling with () and no argument ends the chain and returns the accumulated result.

3. Use Cases

Create fluent APIs (like jQuery’s chainable syntax).
Handle unknown number of inputs elegantly.
Useful in FP libraries for building reusable data pipelines.

🔹 Summary

Currying: break a multi-arg function into a chain of 1-arg functions (f(a)(b)(c)).
Partial application: fix some args, call later with the rest (f(a, _, c)).
Dynamic/variadic currying (what you showed): keep chaining until a stop condition (like empty ()) → then return the accumulated result.


*/




/* 

Both currying and partial application involve “supplying fewer arguments than the original function expects.”
Both produce a new function that remembers some arguments.
In everyday JavaScript, the syntax can look very similar → so people mix them up.



🔹 The Actual Difference


Currying

Always transforms a function of n arguments into a chain of n unary (1-arg) functions.
Forces you to call functions one argument at a time.

Example:

const add = a => b => c => a + b + c;
console.log(add(1)(2)(3)); // 6



Partial Application

Takes a function of n arguments and pre-fills some of them, returning a function that takes the rest.
You can pass the remaining arguments all at once.

Example:

function add(a, b, c) {
  return a + b + c;
}

const add1 = add.bind(null, 1);  // fix first arg = 1
console.log(add1(2, 3)); // 6


| Aspect         | Currying                          | Partial Application                            |
| -------------- | --------------------------------- | ---------------------------------------------- |
| Function arity | Always split into unary functions | Keeps arity flexible                           |
| Calling style  | `f(a)(b)(c)`                      | `f(a)(b, c)`                                   |
| Purpose        | Formal FP transformation          | Practical reusability (specializing functions) |
| Implementation | Usually by hand or FP libs        | Often uses `.bind()` in JS                     |


🔹 Why the Confusion?

Syntax overlap

curriedAdd(1)(2)(3) looks a lot like partial(add, 1)(2, 3).
Both rely on closures
Both use closures to “remember” arguments already given.
Both allow “delayed argument supply”
Which makes them feel the same until you look closely at arity.

✅ Memory Trick

Currying = break into a chain of one-arg functions.
Partial application = pre-fill some args, call later with the rest.
👉 “Currying is a transformation; partial application is a use case.”


*/




/* 

Function Composition

👉 Function composition is the process of combining multiple functions into a single function, 
where the output of one function becomes the input of the next
👉 It enables building complex logic from small, reusable functions



🔑 Key Points

👉 Small pure functions compose best
👉 Order matters (compose = right-to-left, pipe = left-to-right)
👉 Works best with unary (single argument) functions
👉 Encourages immutability and declarative style
👉 Needs different helpers for sync vs async
👉 Contracts or types reduce runtime bugs

🧩 Examples
⚙️ Compose & Pipe Helpers
const compose = (...fns) => x => fns.reduceRight((v, f) => f(v), x)
const pipe = (...fns) => x => fns.reduce((v, f) => f(v), x)

same as above
// or more verbosely

function pipe(...fns) {
  return function (x) {
    return fns.reduce(function (v, f) {
      return f(v)
    }, x)
  }
}

✂️ Basic String Transformation
const trim = s => s.trim()
const toLower = s => s.toLowerCase()
const slug = s => s.replace(/\s+/g, '-')

const makeSlug1 = compose(slug, toLower, trim)
const makeSlug2 = pipe(trim, toLower, slug)

makeSlug1("  Hello World  ") // "hello-world"

📦 Object Example
const pick = key => obj => obj[key]
const toPercent = n => `${Math.round(n * 100)}%`

const ratingToPercent = pipe(
  pick('rating'),
  n => Math.max(0, Math.min(1, n)),
  toPercent
)

ratingToPercent({ rating: 0.87 }) // "87%"

🔢 Arrays Point-Free
const map = f => xs => xs.map(f)
const filter = p => xs => xs.filter(p)

const isEven = n => n % 2 === 0
const square = n => n * n

const evenSquares = pipe(
  filter(isEven),
  map(square)
)

evenSquares([1, 2, 3, 4]) // [4, 16]

🌐 Async Composition
const pipeAsync = (...fns) => x =>
  fns.reduce((p, f) => p.then(f), Promise.resolve(x))

const fetchUser = id => fetch(`/api/users/${id}`).then(r => r.json())
const pickName = u => u.name
const shout = s => s.toUpperCase()

const getUserNameShout = pipeAsync(fetchUser, pickName, shout)

💡 Use Cases

👉 Input validation & sanitization
👉 Data transformation pipelines
👉 UI state mapping (e.g., Redux selectors)
👉 Middleware chains (Express, Koa)
👉 Business rule checks (auth, logging)
👉 Reusable array/object utilities

✅ Benefits

👉 Reuse of small functions
👉 Readable left-to-right flow with pipe
👉 Easy unit testing of small pieces
👉 Encourages immutability & purity
👉 Declarative style (focus on what not how)

⚠️ Cons

👉 Too many tiny functions reduce clarity
👉 Harder to debug in long chains
👉 Slight performance overhead in hot paths
👉 Type mismatches only caught at runtime
👉 Async error handling can be tricky

📝 Takeaways

👉 Prefer pipe for readability
👉 Keep functions unary and pure
👉 Use tap for logging without breaking flow
👉 Guard with contracts or TypeScript
👉 Separate sync vs async composition helpers



*/



/* 

📖 Definition

👉 In functional programming, a functor is a container type that implements a map method, allowing you to apply a function to the values inside the container without changing the container’s structure.

👉 In JavaScript → any object (often arrays, Maybe, Either, etc.) that implements map and obeys the functor laws is considered a functor.

🔑 Key Points

👉 A functor must implement map(fn)
👉 The map applies a function to the inner value(s) and returns a new functor
👉 Functors follow two laws:

Identity law → F.map(x => x) ≡ F

Composition law → F.map(x => f(g(x))) ≡ F.map(g).map(f)
👉 Arrays in JS are the simplest functor ([].map)

🧩 Examples
1. Array as a Functor
const arr = [1, 2, 3]
const result = arr.map(x => x * 2)
console.log(result) // [2, 4, 6]

2. Custom Functor (Box)
const Box = x => ({
  map: f => Box(f(x)),
  value: () => x
})

const result = Box(10)
  .map(x => x + 5)
  .map(x => x * 2)
  .value()

console.log(result) // 30


👉 The Box functor lets us transform values while keeping them inside the container.

3. Maybe Functor (handles null/undefined safely)
const Maybe = x => ({
  map: f => (x == null ? Maybe(null) : Maybe(f(x))),
  value: () => x
})

const safeValue = Maybe("Hello")
  .map(str => str.toUpperCase())
  .map(str => str + " World")
  .value()

console.log(safeValue) // "HELLO WORLD"

const nothing = Maybe(null).map(str => str.toUpperCase()).value()
console.log(nothing) // null


👉 Avoids errors when mapping over null or undefined.

4. Identity Functor
const Identity = x => ({
  map: f => Identity(f(x)),
  value: () => x
})

const id = Identity(5).map(x => x + 1).value()
console.log(id) // 6

💡 Use Cases

👉 Array transformations (map)
👉 Safe computations (Maybe functor avoids null checks)
👉 Wrapping values into computation contexts (Box, Identity)
👉 Abstracting pipelines of transformations

✅ Benefits

👉 Provides a consistent way to apply functions to wrapped values
👉 Encourages pure functional style
👉 Helps avoid null/undefined errors when using functors like Maybe
👉 Works well with composition

⚠️ Cons

👉 Abstract concept → may feel “too mathematical” for JS beginners
👉 Requires extra layers of wrapping/unwrapping (.value())
👉 Without TypeScript/Flow, no static guarantees that laws hold

📝 Takeaway

👉 A functor is any type that implements .map and obeys identity & composition laws
👉 Arrays are functors in JS
👉 Custom functors like Box, Maybe, Identity allow safe and composable transformations

*/

/* 

📖 Definition

👉 A monad is an advanced functional programming concept that builds on functors
👉 A monad is a container type that:
    Implements map (like a functor)
    Implements flatMap (aka chain or bind) → unwraps nested containers after applying a function
    Provides a way to wrap values (of or return)
👉 In plain terms → monads let you sequence computations while keeping values inside a context (e.g., Maybe, Promise, Array)

🔑 Key Points

👉 Every monad is a functor, but not every functor is a monad
👉 map applies a function and keeps nesting (Box(Box(x)))
👉 flatMap prevents nesting (Box(x))
👉 Laws: left identity, right identity, associativity

🧩 Examples
1. Box Monad
const Box = x => ({
  map: f => Box(f(x)),         // functor
  flatMap: f => f(x),          // monad: flattens one level
  value: () => x
})

const result = Box(10)
  .map(x => x + 5)             // Box(15)
  .flatMap(x => Box(x * 2))    // Box(30)
  .value()

console.log(result) // 30

2. Maybe Monad (safe null handling)
const Maybe = x => ({
  map: f => (x == null ? Maybe(null) : Maybe(f(x))),
  flatMap: f => (x == null ? Maybe(null) : f(x)),
  value: () => x
})

const safe = Maybe("hello")
  .map(str => str.toUpperCase())
  .flatMap(str => Maybe(str + " world"))
  .value()

console.log(safe) // HELLO WORLD

const nothing = Maybe(null).map(str => str.toUpperCase()).value()
console.log(nothing) // null


👉 Without monads, this would throw an error.

3. Promise as a Monad

👉 Promises in JS already behave like monads

Promise.resolve(5)
  .then(x => x + 2)       // map
  .then(x => Promise.resolve(x * 3)) // flatMap
  .then(console.log) // 21

4. Array Monad

👉 Arrays are also monads (flatMap is built in)

const result = [1, 2, 3]
  .flatMap(x => [x, x * 2])

console.log(result) // [1, 2, 2, 4, 3, 6]

💡 Use Cases

👉 Handling null/undefined safely (Maybe)
👉 Sequencing async operations (Promise)
👉 Managing multiple results (Array)
👉 Building pipelines without deeply nested callbacks
👉 Functional error handling (like Either monad)

✅ Benefits

👉 Eliminates boilerplate null or error checks
👉 Prevents “callback hell” (Promises are monads!)
👉 Provides a consistent way to chain computations
👉 Encourages declarative, composable code

⚠️ Cons

👉 Abstract / mathematical → hard for beginners
👉 Adds complexity for small projects
👉 Without TypeScript/FP libraries, code can feel verbose

📝 Takeaway

👉 Monad = Functor + flatMap (chain)
👉 Gives you a consistent way to work with values inside a context (safe, async, multiple values)
👉 Common monads in JS:
    Maybe → null safety
    Promise → async
    Array → multiple results
    Either → error handling


*/

/* 


VERY IMPORTANT RESOURCES 


Professor Fisby's Mostly Adequate Guide to Functional Programming
https://drboolean.gitbooks.io/mostly-adequate-guide-old/content/


medium article on functional programming
https://medium.com/javascript-scene/master-the-javascript-interview-what-is-functional-programming-7f218c68b3a0

*/

/*
  Functional Programming = 
  declarative programming 
  + immutability 
  + pure functions 
  + first class functions 
  + higher order functions 
  + recursion
  + function composition 
  + currying 
  + partial application 
  + closures 
  + referential transparency 
  + avoiding side effects 
  + avoiding shared mutable state
  + using expressions instead of statements 
  + using functions as the main building blocks
  + avoiding loops 
  + using built-in FP methods (map, filter, reduce) 
  + using libraries (Ramda, Lodash FP) 
  + understanding monads and functors (advanced)
  + using lazy evaluation (e.g., generators) 
  + using tail call optimization (TCO) or trampolining for deep recursion 
  + using memoization for performance 
  + using point-free style (tacit programming) 
  + using algebraic data types (ADTs) like Maybe, Either (advanced) 
  + using lenses for immutable data access and updates (advanced)
  + using type systems (TypeScript, Flow) for safer code 
  + using functional reactive programming (FRP) for async data streams (advanced)
  + using category theory concepts (functors, monads, applicatives) for advanced abstractions (very advanced)
  + using combinators for building complex functions from simpler ones 
  + using zippers for navigating and updating immutable data structures (advanced) 
  + using optics for composable data access and manipulation (advanced) 
  + using algebraic effects for handling side effects in a controlled manner (very advanced) 
  + using dependent types for more expressive type systems (very advanced) 
  + using homotopy type theory (HoTT) concepts for reasoning about programs (very advanced) 
  + using functional design patterns (e.g., functor pattern, monad pattern) 
  + using functional programming paradigms in different languages (Haskell, Scala, F#, Elm, Clojure, etc.) 
  + understanding the trade-offs of functional programming vs other paradigms (OOP, procedural) 
  + applying functional programming principles in real-world applications and projects
  + continuously learning and exploring new FP concepts and techniques
*/




/* 

📖 Definition

👉 These are client-side storage mechanisms in the browser to persist data
👉 Each has different scope, size limits, expiration, and use cases

🔑 Key Points
1. localStorage

👉 Key–value storage in the browser
👉 Data persists even after browser/tab is closed (until explicitly cleared)
👉 API: setItem, getItem, removeItem, clear
👉 Synchronous, string-only storage (~5–10MB)

localStorage.setItem("username", "Alice")
console.log(localStorage.getItem("username")) // "Alice"
localStorage.removeItem("username")
localStorage.clear()

2. sessionStorage

👉 Almost identical to localStorage, but tied to the current browser tab/session
👉 Data is cleared when the tab or browser is closed
👉 Useful for temporary data like form drafts or per-tab state

sessionStorage.setItem("theme", "dark")
console.log(sessionStorage.getItem("theme")) // "dark"
sessionStorage.removeItem("theme")

3. Cookies

👉 Key–value pairs stored in the browser, but sent with every HTTP request to the server
👉 Can have an expiration date (or be session-only)
👉 Much smaller (~4KB)
👉 Useful for authentication (session tokens, CSRF tokens)

// Set cookie
document.cookie = "user=Alice; path=/; max-age=3600"

// Read cookies
console.log(document.cookie) 
// "user=Alice"

// Delete cookie
document.cookie = "user=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC"



| Feature             | localStorage             | sessionStorage   | Cookies                   |
| ------------------- | ------------------------ | ---------------- | ------------------------- |
| **Capacity**        | ~5–10MB                  | ~5–10MB          | ~4KB                      |
| **Persistence**     | Until cleared            | Until tab closed | Configurable (expiry)     |
| **Scope**           | Domain                   | Domain + tab     | Domain + path             |
| **Sent to server?** | ❌ No                     | ❌ No             | ✅ Yes (with each request) |
| **Data type**       | Strings only             | Strings only     | Strings only              |
| **Use cases**       | Long-term prefs, caching | Per-tab data     | Auth, session IDs, tokens |



💡 Use Cases

👉 localStorage
Save user settings (theme, language)
Cache static data (e.g., API responses)
Keep shopping cart across visits

👉 sessionStorage
Form data drafts in a single session
Temporary UI state for a tab
Prevents leakage across tabs

👉 cookies
Authentication tokens (JWT, session ID)
CSRF protection
Server-side session management

✅ Benefits

👉 All three give client-side persistence
👉 localStorage and sessionStorage are simple APIs
👉 Cookies can be read by server (for auth/session mgmt)

⚠️ Cons

👉 localStorage and sessionStorage:
Only store strings (need JSON for objects)
Block main thread (synchronous)
Not sent to server automatically

👉 Cookies:
Small storage limit
Sent with every request → bandwidth overhead
Need extra security flags (HttpOnly, Secure, SameSite)

📝 Takeaway

👉 localStorage → large, persistent, client-only data
👉 sessionStorage → per-tab/session, auto-clears on close
👉 cookies → small, can be sent to server, used mainly for auth/session


*/




/* 

TOKENS

👉 If backend requires Authorization header → Hybrid (refresh in cookie, access in memory) is best.
👉 If backend is changed to accept cookies for auth → Best practice = both access & refresh tokens in


---------------------------------------
👉 If backend requires Authorization header → Hybrid (refresh in cookie, access in memory) is best.
👉 This is how many modern apps solve the problem: 
Store Refresh Token in HttpOnly cookie (server auto-sends it, safe from XSS) 
Store Access Token in memory (not localStorage) → short-lived (like 5–15 minutes) 
When access token expires → use refresh token (cookie) to get a new one

---------------------------------------
👉 If backend is changed to accept cookies for auth → Best practice = both access & refresh tokens in

🔄 Flow
Login
Server sets both access and refresh cookies (HttpOnly, Secure, SameSite).

Normal API calls
Browser automatically sends access cookie → backend validates it.

Access token expires
Frontend makes a /refresh request.
Browser automatically includes the refresh cookie.
Server issues a new access cookie.

Logout
Server clears both cookies by setting them with expired dates.


*/





/* 

📖 Definition

👉 IndexedDB is a low-level client-side database built into browsers.
👉 It stores large amounts of structured data, including files/blobs, and lets you perform transactions and queries with indexes.
👉 Unlike localStorage (simple key–value), IndexedDB is like a NoSQL object store in the browser.

🔑 Key Points

👉 Asynchronous API (uses events or Promises with wrappers like idb)
👉 Stores objects instead of just strings
👉 Supports indexes for efficient lookups
👉 Can store much more data than localStorage (hundreds of MBs depending on browser)
👉 Data persists even after browser is closed

🧩 Basic Example (Vanilla IndexedDB API)
// Open (or create) a DB
const request = indexedDB.open("MyDB", 1)

request.onupgradeneeded = function(event) {
  const db = event.target.result
  // create an object store (like a table)
  if (!db.objectStoreNames.contains("users")) {
    db.createObjectStore("users", { keyPath: "id" })
  }
}

request.onsuccess = function(event) {
  const db = event.target.result

  // Add data
  const tx = db.transaction("users", "readwrite")
  const store = tx.objectStore("users")
  store.add({ id: 1, name: "Alice", age: 25 })
  store.add({ id: 2, name: "Bob", age: 30 })

  tx.oncomplete = () => console.log("Users added")

  // Read data
  const readTx = db.transaction("users", "readonly")
  const readStore = readTx.objectStore("users")
  const getReq = readStore.get(1)
  getReq.onsuccess = () => console.log("User 1:", getReq.result)
}

🧩 Using Promises with idb (easier)

Install helper lib:

npm install idb


Usage:

import { openDB } from "idb"

async function setupDB() {
  const db = await openDB("MyDB", 1, {
    upgrade(db) {
      db.createObjectStore("users", { keyPath: "id" })
    }
  })

  // Insert
  await db.put("users", { id: 1, name: "Alice" })
  await db.put("users", { id: 2, name: "Bob" })

  // Get
  const user = await db.get("users", 1)
  console.log("User:", user)

  // Get all
  const allUsers = await db.getAll("users")
  console.log("All users:", allUsers)
}

setupDB()


👉 With idb, the code is much cleaner (async/await instead of events).

💡 Use Cases

👉 Offline-first apps (PWA)
👉 Large data storage (caching API responses, images, files)
👉 Complex queries with indexes (search, filtering)
👉 Apps like email clients, notes apps, to-do apps

✅ Benefits

👉 Much larger storage than localStorage
👉 Can handle structured objects
👉 Supports transactions → data integrity
👉 Async → doesn’t block the main thread

⚠️ Cons

👉 Native API is verbose and event-driven (use idb for simpler code)
👉 No SQL-like queries (you use key/value lookups and indexes)
👉 Browser support is good, but behavior can differ slightly

📝 Takeaway

👉 IndexedDB = client-side NoSQL database
👉 Great for large/structured data & offline apps
👉 Use libraries like idb to simplify


*/



/* 

🔎 MutationObserver
📖 Definition

👉 A MutationObserver lets you watch for changes in the DOM (attributes, child nodes, text, etc.)
👉 More efficient than setInterval polling because it runs only when mutations happen

🔑 Key Points

👉 Listens for changes like:
Node added/removed
Attribute changes
Text content changes

👉 Uses a callback that receives a list of mutations

🧩 Example – Watching DOM Changes
// Target node
const target = document.getElementById("app")

// Callback when mutations happen
const observer = new MutationObserver(mutations => {
  for (let mutation of mutations) {
    console.log("Mutation type:", mutation.type)
    if (mutation.type === "childList") {
      console.log("Added nodes:", mutation.addedNodes)
      console.log("Removed nodes:", mutation.removedNodes)
    }
    if (mutation.type === "attributes") {
      console.log("Attribute changed:", mutation.attributeName)
    }
  }
})

// Start observing
observer.observe(target, {
  childList: true,       // listen for added/removed children
  attributes: true,      // listen for attribute changes
  subtree: true          // also observe descendants
})

// Example DOM mutation
setTimeout(() => {
  target.setAttribute("data-status", "active")
  target.appendChild(document.createElement("div"))
}, 1000)


👉 Use cases:
Detect when elements are added/removed
Observe attribute changes (e.g., class, style)
React to live content updates

👁 IntersectionObserver
📖 Definition

👉 An IntersectionObserver lets you watch when an element enters or leaves the viewport (or a parent element)
👉 Used for lazy loading, infinite scroll, and animations

🔑 Key Points

👉 Triggers callback when an element’s visibility changes relative to a root
👉 Configurable with:

root → viewport or container

rootMargin → margin around root (like CSS margin)

threshold → percentage of visibility required

🧩 Example – Lazy Loading Images
const images = document.querySelectorAll("img[data-src]")

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target
      img.src = img.dataset.src
      observer.unobserve(img) // stop watching once loaded
    }
  })
}, {
  root: null,            // viewport
  rootMargin: "0px",
  threshold: 0.1         // 10% visible
})

images.forEach(img => observer.observe(img))


👉 Use cases:

Lazy load images/videos
Trigger animations when elements come into view
Infinite scroll (load more when user nears bottom)

*/


/* 

| Feature       | MutationObserver                | IntersectionObserver              |
| ------------- | ------------------------------- | --------------------------------- |
| Watches what? | DOM structure/attribute changes | Visibility/viewport intersections |
| Triggered by  | DOM mutations                   | Scrolling/viewport changes        |
| Common uses   | Reacting to dynamic DOM updates | Lazy loading, infinite scroll     |
| Efficiency    | Efficient vs polling            | Efficient vs scroll events        |


Microtasks → run immediately after the current synchronous code, before rendering (examples: Promise.then, queueMicrotask, MutationObserver)
Macrotasks → run in the task queue, after rendering (examples: setTimeout, setInterval, setImmediate, some events, IntersectionObserver)

*/



/* 

Virtualization (a.k.a Windowing or Virtual Scrolling)

👉 Instead of rendering all items in a big list/grid (which can kill performance if you have thousands), you only render the visible ones + a small buffer.

👉 The DOM stays small → browser paints faster → smooth scrolling.

🔑 Key Points

Called Virtualization or Windowing

Sometimes called Infinite Scrolling if items are loaded dynamically as you scroll

IntersectionObserver can help detect when items enter/leave the viewport, but virtualization usually needs more control

🧩 Ways to Implement
1. Manual with IntersectionObserver

👉 Observe when an element (like a sentinel div at the bottom) enters the viewport → then render more items or fetch more data.

const sentinel = document.querySelector("#sentinel")

const observer = new IntersectionObserver(entries => {
  if (entries[0].isIntersecting) {
    loadMoreItems()
  }
})

observer.observe(sentinel)


✅ Good for infinite scroll / lazy loading
❌ Still creates many DOM nodes if you don’t “unrender” old ones

2. Virtualization / Windowing (Best)

👉 Render only a "window" (slice) of items that fit in viewport + small buffer
👉 As user scrolls → update rendered slice

React libraries that do this:

react-window

react-virtualized

react-virtual
 (from TanStack)

Example with react-window:

import { FixedSizeList as List } from "react-window"

const MyList = () => (
  <List
    height={400}   // viewport height
    itemCount={10000} // total items
    itemSize={35}  // each row height
    width={300}
  >
    {({ index, style }) => (
      <div style={style}>Row {index}</div>
    )}
  </List>
)


✅ Only renders ~20 rows at a time even if you have 10,000

3. Pagination + Lazy Rendering

👉 Load/render items in pages (e.g., 50 at a time)
👉 Combine with IntersectionObserver on a “load more” trigger at bottom

✅ Simpler than full virtualization
❌ Still grows DOM as you scroll



| Technique                    | What it does                                  | Pros                     | Cons                    |
| ---------------------------- | --------------------------------------------- | ------------------------ | ----------------------- |
| **IntersectionObserver**     | Lazy-load items/images as they come into view | Simple, great for images | Doesn’t reduce DOM size |
| **Infinite Scroll**          | Load data dynamically on scroll               | Feels smooth             | DOM can still bloat     |
| **Virtualization/Windowing** | Only render visible items                     | Best performance         | More setup, complex     |
| **Pagination**               | Render in chunks (pages)                      | Simple UX                | Manual “load more” UX   |


*/





// 📖 Definition

// 👉 SOLID is a set of five design principles in object-oriented programming (OOP) that help developers create software that is maintainable, extensible, and scalable.
// 👉 Introduced by Robert C. Martin (Uncle Bob).

// 🔑 The Five Principles
// 1. S – Single Responsibility Principle (SRP)

// 👉 A class should have only one reason to change
// 👉 Each class/module should do one thing well

// Example (bad):

// class User {
//   saveToDB() { /* ... */ }
//   sendEmail() { /* ... */ }
// }


// Example (good):

// class UserRepository {
//   save(user) { /* ... */ }
// }

// class EmailService {
//   sendEmail(user) { /* ... */ }
// }

// 2. O – Open/Closed Principle (OCP)

// 👉 Classes should be open for extension but closed for modification
// 👉 Add new behavior without modifying existing code

// Example (bad):

// class Payment {
//   pay(type) {
//     if (type === "credit") { /* credit logic */ }
//     if (type === "paypal") { /* paypal logic */ }
//   }
// }


// Example (good – using polymorphism):

// class Payment {
//   pay() {}
// }

// class CreditPayment extends Payment {
//   pay() { /* credit logic */ }
// }

// class PaypalPayment extends Payment {
//   pay() { /* paypal logic */ }
// }

// 3. L – Liskov Substitution Principle (LSP)

// 👉 Objects of a superclass should be replaceable with objects of a subclass without breaking the program.

// Example (bad):

// class Bird {
//   fly() {}
// }

// class Penguin extends Bird {
//   fly() { throw new Error("Penguins can't fly") }
// }


// Example (good):

// class Bird { }
// class FlyingBird extends Bird { fly() {} }
// class Penguin extends Bird { swim() {} }

// 4. I – Interface Segregation Principle (ISP)

// 👉 Clients shouldn’t be forced to depend on interfaces they don’t use.
// 👉 Prefer small, specific interfaces over large, general ones.

// Example (bad):

// class Machine {
//   print() {}
//   scan() {}
//   fax() {}
// }


// Example (good):

// class Printer { print() {} }
// class Scanner { scan() {} }
// class Fax { fax() {} }

// 5. D – Dependency Inversion Principle (DIP)

// 👉 High-level modules shouldn’t depend on low-level modules.
// 👉 Both should depend on abstractions (interfaces).

// Example (bad):

// class MySQLDatabase {
//   connect() {}
// }

// class UserService {
//   constructor() {
//     this.db = new MySQLDatabase() // tightly coupled
//   }
// }


// Example (good):

// class Database {
//   connect() {}
// }

// class MySQLDatabase extends Database {
//   connect() {}
// }

// class UserService {
//   constructor(db) {
//     this.db = db // depends on abstraction
//   }
// }

// 💡 Benefits of SOLID

// Easier to maintain & scale
// Encourages loose coupling
// Increases testability
// Reduces bugs when extending features

// ⚠️ Cons of SOLID
// May increase initial complexity
// Can lead to over-engineering if applied blindly
// Requires good understanding of OOP

// 📝 Takeaway

// 👉 SOLID = SRP, OCP, LSP, ISP, DIP
// 👉 Following these principles makes your codebase cleaner, modular, and easier to evolve





/* 

SRP – Single Responsibility Principle from SOLID.

📖 Definition

👉 Single Responsibility Principle (SRP) states that:
A class/module/function should have only one reason to change.
In other words → each unit of code should focus on one job.

🔑 Key Ideas

A “responsibility” = a reason to change (not just a single action)
Reduces coupling → changes in one area don’t break unrelated logic
Makes testing easier (small, focused units)
Easier to extend and maintain

🧩 Examples
❌ Bad (violates SRP)

One class handles both data persistence and business logic:

class User {
  constructor(name, email) {
    this.name = name
    this.email = email
  }

  saveToDatabase() { }
  sendWelcomeEmail() {  }
}


👉 If database logic changes OR email logic changes → this class must change.

✅ Good (applies SRP)

Split into separate responsibilities:

class User {
  constructor(name, email) {
    this.name = name
    this.email = email
  }
}

class UserRepository {
  save(user) {  }
}

class EmailService {
  sendWelcome(user) { }
}


👉 Now:

If email changes → only EmailService changes
If DB changes → only UserRepository changes
In Functions (JavaScript example)

❌ Bad: one function does multiple things

function registerUser(user) {
  validate(user)
  saveToDatabase(user)
  sendEmail(user)
}


✅ Good: separate responsibilities

function registerUser(user) {
  validateUser(user)
  createUser(user)
  notifyUser(user)
}

React Example (Frontend)

❌ Bad: one component handles fetching + UI + state

function UserList() {
  const [users, setUsers] = useState([])

  useEffect(() => {
    fetch("/api/users")
      .then(res => res.json())
      .then(setUsers)
  }, [])

  return (
    <ul>
      {users.map(u => <li key={u.id}>{u.name}</li>)}
    </ul>
  )
}


✅ Good: break down by responsibility

function useUsers() {
  const [users, setUsers] = useState([])
  useEffect(() => {
    fetch("/api/users")
      .then(res => res.json())
      .then(setUsers)
  }, [])
  return users
}

function UserList() {
  const users = useUsers()
  return (
    <ul>
      {users.map(u => <li key={u.id}>{u.name}</li>)}
    </ul>
  )
}


👉 useUsers handles data fetching, UserList handles rendering.

💡 Benefits of SRP

Clearer, smaller, easier-to-read code
Easy unit testing (test one job at a time)
Lower chance of side-effects when changing code
More reusability (components/services can be reused elsewhere)

⚠️ Cons

Can lead to more files/classes (boilerplate)
Requires discipline to avoid over-engineering
Sometimes tricky to define what “one responsibility” means (depends on context)

📝 Takeaway

👉 SRP = one reason to change
👉 A class/module/function should do one job well
👉 Makes your system flexible, testable, and maintainable



*/



/* 

OCP – Open/Closed Principle 👇

📖 Definition

👉 Open/Closed Principle (OCP) says:
A software entity (class, function, module) should be open for extension but closed for modification

Meaning:
You should be able to add new behavior without changing existing code.
Avoid breaking tested/stable code when adding features.

🔑 Key Ideas

👉 Encourage abstraction and polymorphism
👉 Helps reduce bugs when new features are added
👉 Works well with design patterns like Strategy, Factory, Decorator

🧩 Examples
❌ Bad (violates OCP)

Adding new payment types by editing the same class:

class Payment {
  pay(type) {
    if (type === "credit") {
      console.log("Paying with credit card")
    } else if (type === "paypal") {
      console.log("Paying with PayPal")
    }
  }
}


👉 Every new payment method forces modification of Payment

✅ Good (applies OCP with polymorphism)
class Payment {
  pay() {}
}

class CreditPayment extends Payment {
  pay() { console.log("Paying with credit card") }
}

class PaypalPayment extends Payment {
  pay() { console.log("Paying with PayPal") }
}

// Extend without touching existing code
class CryptoPayment extends Payment {
  pay() { console.log("Paying with crypto") }
}


👉 New behavior (CryptoPayment) added without modifying old code

With Strategy Pattern
class PaymentProcessor {
  constructor(strategy) {
    this.strategy = strategy
  }
  pay() {
    this.strategy.pay()
  }
}

const processor = new PaymentProcessor(new PaypalPayment())
processor.pay() // Paying with PayPal


👉 Easy to swap or extend strategies

React Example

❌ Bad: conditional rendering grows with new types

function Notification({ type, message }) {
  if (type === "success") return <div style={{ color: "green" }}>{message}</div>
  if (type === "error") return <div style={{ color: "red" }}>{message}</div>
}


✅ Good: open for extension

const notificationMap = {
  success: ({ message }) => <div style={{ color: "green" }}>{message}</div>,
  error: ({ message }) => <div style={{ color: "red" }}>{message}</div>,
}

function Notification({ type, message }) {
  const Component = notificationMap[type]
  return Component ? <Component message={message} /> : null
}


👉 Add a new notification type by extending notificationMap instead of modifying logic

💡 Use Cases

Payment systems (credit, PayPal, crypto…)
Notification systems (email, SMS, push…)
UI components (theme-based extension)
Logging frameworks (extend output channels)

✅ Benefits

Stable tested code stays untouched
Extensible system → easier to add features
Encourages clean abstractions and design patterns

⚠️ Cons

Can introduce complexity (more classes/interfaces)
Over-abstraction can lead to hard-to-read code
May feel like “over-engineering” for small projects

📝 Takeaway

👉 OCP = don’t change old code when adding new behavior
👉 Achieve it via abstraction (interfaces, base classes) and composition (patterns like strategy)
👉 Keeps systems extensible + stable


*/



/* 


Abstraction in programming (with examples in JavaScript/TypeScript and OOP in general) 👇

📖 Definition

👉 Abstraction means hiding implementation details and showing only the essential features of an object or system.
👉 It lets you focus on what something does instead of how it does it.

🔑 Key Ideas

👉 Encapsulates complex logic behind a simple interface
👉 Used via abstract classes, interfaces, or higher-level functions
👉 Separates behavior (what) from implementation (how)
👉 Helps apply OCP (Open/Closed Principle) and DIP (Dependency Inversion Principle)

🧩 Examples
1. Abstraction with Classes (OOP)
abstract class Database {
  abstract connect(): void
  abstract query(sql: string): any
}

class MySQLDatabase extends Database {
  connect() { console.log("Connected to MySQL") }
  query(sql: string) { console.log(`MySQL query: ${sql}`) }
}

class MongoDatabase extends Database {
  connect() { console.log("Connected to MongoDB") }
  query(sql: string) { console.log(`Mongo query: ${sql}`) }
}

// Client code depends only on abstraction
function initApp(db: Database) {
  db.connect()
  db.query("SELECT * FROM users")
}

initApp(new MySQLDatabase())
initApp(new MongoDatabase())


👉 Database defines what must be done, subclasses define how.

2. Abstraction in JavaScript (using functions)
function fetchData(apiClient) {
  return apiClient.get("/users")
}

// Different implementations, same abstraction
const axiosClient = { get: url => fetch(url).then(res => res.json()) }
const mockClient = { get: url => Promise.resolve([{ id: 1, name: "Test" }]) }

fetchData(axiosClient).then(console.log)
fetchData(mockClient).then(console.log)


👉 The function fetchData doesn’t care how get is implemented.

3. Abstraction in React

❌ Bad: component knows data source details

function UserList() {
  const [users, setUsers] = useState([])
  useEffect(() => {
    fetch("/api/users")
      .then(res => res.json())
      .then(setUsers)
  }, [])
  return <ul>{users.map(u => <li key={u.id}>{u.name}</li>)}</ul>
}


✅ Good: data-fetching abstracted into a hook

function useUsers() {
  const [users, setUsers] = useState([])
  useEffect(() => {
    fetch("/api/users").then(res => res.json()).then(setUsers)
  }, [])
  return users
}

function UserList() {
  const users = useUsers()
  return <ul>{users.map(u => <li key={u.id}>{u.name}</li>)}</ul>
}


👉 UserList only cares what it gets (users), not how.

💡 Use Cases

Abstract database access (switch SQL ↔ NoSQL easily)
Abstract UI components (e.g., Button API same across themes)
Abstract external APIs for testing (mock implementations)
Abstract OS/hardware details in cross-platform apps

✅ Benefits

Simplifies complex systems
Reduces coupling
Easier to test (mock implementations)
Increases flexibility and scalability

⚠️ Cons

Over-abstraction → too many layers, harder to read
Adds boilerplate (abstract classes, interfaces)
May be unnecessary for small/simple projects

📝 Takeaway

👉 Abstraction = hiding implementation, exposing only essentials
👉 Lets you focus on what, not how
👉 Achieved via interfaces, abstract classes, or functional contracts



🔑 Abstraction vs Polymorphism

👉 They’re related but not the same:

Abstraction
👉 Focuses on hiding implementation details and exposing only essential behavior
👉 Example: You define a Database interface with connect() and query(). The client doesn’t care how it’s implemented.

Polymorphism
👉 Focuses on many forms of behavior for the same interface
👉 Example: Both MySQLDatabase and MongoDatabase implement query(), but each does it differently. You can call query() on either.

➡️ In practice:

Abstraction says: “This is what you can do”
Polymorphism says: “Different classes will do it differently”
So abstraction gives the contract, and polymorphism gives the flexibility to implement it.




🔑 Is there an abstract keyword in JavaScript?
👉 No, JavaScript does not have the abstract keyword like Java or C#.
👉 But you can simulate abstraction in several ways:

Using ES6 classes + throwing errors in base methods

class Database {
  connect() {
    throw new Error("connect() must be implemented")
  }
  query(sql) {
    throw new Error("query() must be implemented")
  }
}

class MySQLDatabase extends Database {
  connect() { console.log("Connected to MySQL") }
  query(sql) { console.log("Query MySQL:", sql) }
}


Using Interfaces in TypeScript (recommended)
👉 With TypeScript you can enforce abstraction:

interface Database {
  connect(): void
  query(sql: string): any
}

class MySQLDatabase implements Database {
  connect() { console.log("Connected to MySQL") }
  query(sql: string) { console.log("Query MySQL:", sql) }
}

📝 Takeaway

👉 In JavaScript:

There’s no abstract keyword

You can still build abstraction using base classes, interfaces (in TypeScript), or function contracts
👉 Abstraction = hiding details, defining contracts
👉 Polymorphism = multiple implementations of that contract

######################################################

abstract class Database {
  abstract connect(): void
  abstract query(sql: string): any
}
that’s TypeScript syntax, not plain JavaScript.

⚡ Clarification
JavaScript (ES6+) → does not have the abstract keyword
👉 if you try it in raw JS, you’ll get a syntax error

TypeScript → does have abstract classes and methods (transpiles down to JS), and that’s what I showed before

So:

in JavaScript you simulate abstraction by:
creating base classes that throw errors in methods meant to be overridden
or by using doc conventions
in TypeScript you can enforce abstraction properly with abstract and interface

📊 Example Contrast
JavaScript (simulated)

js
Copy code
class Database {
  connect() { throw new Error("Must implement connect()") }
  query(sql) { throw new Error("Must implement query()") }
}

class MySQLDatabase extends Database {
  connect() { console.log("Connected to MySQL") }
  query(sql) { console.log("Query:", sql) }
}
TypeScript (real abstract)

ts
Copy code
abstract class Database {
  abstract connect(): void
  abstract query(sql: string): any
}

class MySQLDatabase extends Database {
  connect() { console.log("Connected to MySQL") }
  query(sql: string) { console.log("Query:", sql) }
}
📝 Takeaway
👉 What I showed with abstract was TypeScript, not raw JavaScript
👉 Pure JavaScript doesn’t support abstract but you can simulate it
👉 TypeScript adds true abstraction features (enforced by compiler)

*/

/* 

Polymorphism 👇

📖 Definition

👉 Polymorphism comes from Greek: poly (many) + morph (forms).
👉 In OOP, it means the same interface or method name can take many forms depending on the object that implements it.
👉 In plain terms: different classes can be used through the same interface, and they respond differently.

🔑 Key Points
👉 Two types of polymorphism in OOP:

Compile-time (overloading) → not natively in JS, but in other languages like Java.
Runtime (overriding) → supported in JS via inheritance or duck typing.

👉 Makes code flexible and extensible → you don’t need to know which exact class you’re using, just that it implements the same contract.

🧩 Examples
1. Classic Polymorphism with Classes
class Shape {
  area() {
    throw new Error("area() must be implemented")
  }
}

class Circle extends Shape {
  constructor(radius) {
    super()
    this.radius = radius
  }
  area() {
    return Math.PI * this.radius ** 2
  }
}

class Rectangle extends Shape {
  constructor(width, height) {
    super()
    this.width = width
    this.height = height
  }
  area() {
    return this.width * this.height
  }
}

// Polymorphic usage
const shapes = [new Circle(3), new Rectangle(4, 5)]
shapes.forEach(s => console.log(s.area()))


👉 Both Circle and Rectangle share the same interface (area), but each implements it differently.

2. Polymorphism in JavaScript via Duck Typing

👉 JS is dynamic → doesn’t require inheritance, just method names.

function makeItSpeak(obj) {
  obj.speak()
}

const dog = { speak: () => console.log("Woof!") }
const cat = { speak: () => console.log("Meow!") }

makeItSpeak(dog) // Woof!
makeItSpeak(cat) // Meow!


👉 As long as the object has a speak() method, it works (duck typing: if it walks like a duck and quacks like a duck…).

3. Polymorphism in Functions (same interface, different data)
function print(value) {
  console.log(value.toString())
}

print(42)         // "42"
print([1,2,3])    // "1,2,3"
print({a: 1})     // "[object Object]"


👉 Same function name (print), but behavior depends on the object’s type.

4. Polymorphism in React Components
function Button({ variant, children }) {
  if (variant === "primary") return <button className="btn-primary">{children}</button>
  if (variant === "secondary") return <button className="btn-secondary">{children}</button>
  return <button>{children}</button>
}


👉 Same Button interface → different UI depending on variant.

💡 Use Cases

Shape drawing (circle, square, triangle all draw())
Payment processors (credit, PayPal, crypto all pay())
UI components (different styles under one API)
Strategy patterns (e.g., different sorting or logging strategies)

✅ Benefits

Flexible & extensible code
Reduces need for conditionals (if/else)
Makes code work with abstractions, not implementations
Encourages OCP (Open/Closed Principle)

⚠️ Cons

Can confuse beginners (which implementation will run?)
Requires well-defined interfaces/contracts
Overuse can lead to abstraction bloat

📝 Takeaway

👉 Polymorphism = same method, many forms
👉 Achieved in JS via inheritance (OOP) or duck typing (dynamic)
👉 Key to writing clean, extensible, maintainable code


*/